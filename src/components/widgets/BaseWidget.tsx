"use client";

import React, { useState, useEffect } from 'react';
import { BaseWidgetProps, WidgetState, WidgetScenario } from '@/lib/simulations/widget-types';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Play, RotateCcw, HelpCircle, CheckCircle, ArrowRight } from 'lucide-react';

interface BaseWidgetState extends WidgetState {
  startTime: number;
}

interface BaseWidgetWrapperProps extends BaseWidgetProps {
  scenario: WidgetScenario;
  children: React.ReactNode;
  onReset?: () => void;
}

export function BaseWidget({
  scenario,
  mode = 'interactive',
  size = 'medium',
  className = '',
  children,
  onComplete,
  onStepComplete,
  onReset
}: BaseWidgetWrapperProps) {
  const [widgetState, setWidgetState] = useState<BaseWidgetState>({
    currentStep: 0,
    completed: false,
    results: {},
    userInteractions: 0,
    timeSpent: 0,
    errors: [],
    startTime: Date.now()
  });

  const [showHints, setShowHints] = useState(false);
  const [showObjectives, setShowObjectives] = useState(mode === 'guided');

  useEffect(() => {
    const interval = setInterval(() => {
      setWidgetState(prev => ({
        ...prev,
        timeSpent: Math.floor((Date.now() - prev.startTime) / 1000)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleStepComplete = (stepId: string, data: any) => {
    const currentStep = widgetState.currentStep || 0;
    const nextStep = currentStep + 1;
    
    setWidgetState(prev => ({
      ...prev,
      currentStep: nextStep,
      completed: nextStep >= (scenario.guidance?.steps.length || 0),
      userInteractions: prev.userInteractions + 1
    }));

    onStepComplete?.(stepId, data);

    if (nextStep >= (scenario.guidance?.steps.length || 0)) {
      onComplete?.(widgetState);
    }
  };

  const handleReset = () => {
    setWidgetState({
      currentStep: 0,
      completed: false,
      results: {},
      userInteractions: 0,
      timeSpent: 0,
      errors: [],
      startTime: Date.now()
    });
    setShowHints(false);
    onReset?.();
  };

  const getCurrentStep = () => {
    if (!scenario.guidance?.steps || mode !== 'guided') return null;
    return scenario.guidance.steps[widgetState.currentStep || 0];
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'compact': return 'max-w-2xl';
      case 'medium': return 'max-w-4xl';
      case 'full': return 'max-w-7xl';
      default: return 'max-w-4xl';
    }
  };

  const currentStep = getCurrentStep();
  const isGuided = mode === 'guided';
  const canAdvance = currentStep && !widgetState.completed;

  return (
    <div className={`${getSizeClasses()} mx-auto ${className}`}>
      {/* Widget Header */}
      {size !== 'compact' && (
        <FeatureCard className="mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-white">{scenario.name}</h3>
                <Badge variant="neutral" size="sm">
                  {scenario.difficulty}
                </Badge>
                <Badge variant="neutral" size="sm">
                  ~{scenario.estimatedTime}min
                </Badge>
              </div>
              <p className="text-slate-300 text-sm mb-3">{scenario.description}</p>
              
              {showObjectives && (
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-slate-200 mb-2">Learning Objectives:</h4>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {scenario.learningObjectives.map((obj, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-electric-400 mt-0.5 flex-shrink-0" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {mode !== 'demo' && (
                <Button
                  variant="outline"
                  size="sm"
                  icon={RotateCcw}
                  onClick={handleReset}
                >
                  Reset
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                icon={HelpCircle}
                onClick={() => setShowHints(!showHints)}
              >
                Hints
              </Button>
              
              {size !== 'compact' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowObjectives(!showObjectives)}
                >
                  {showObjectives ? 'Hide' : 'Show'} Goals
                </Button>
              )}
            </div>
          </div>

          {/* Guided Mode Step Indicator */}
          {isGuided && currentStep && (
            <div className="mt-4 p-4 bg-electric-900/20 border border-electric-800/40 rounded-lg">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-medium text-electric-300 mb-1">
                    Step {(widgetState.currentStep || 0) + 1} of {scenario.guidance?.steps.length}: {currentStep.title}
                  </h4>
                  <p className="text-slate-300 text-sm">{currentStep.description}</p>
                </div>
                {canAdvance && currentStep.action === 'observe' && (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={ArrowRight}
                    onClick={() => handleStepComplete(currentStep.id, {})}
                  >
                    Continue
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Completion Status */}
          {widgetState.completed && (
            <div className="mt-4 p-4 bg-green-900/20 border border-green-800/40 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div>
                  <h4 className="font-medium text-green-300">Simulation Complete!</h4>
                  <p className="text-slate-300 text-sm">
                    Completed in {Math.floor(widgetState.timeSpent / 60)}m {widgetState.timeSpent % 60}s 
                    with {widgetState.userInteractions} interactions
                  </p>
                </div>
              </div>
            </div>
          )}
        </FeatureCard>
      )}

      {/* Hints Panel */}
      {showHints && scenario.guidance?.hints && (
        <FeatureCard className="mb-6">
          <h4 className="font-medium text-white mb-3">💡 Helpful Hints</h4>
          <div className="space-y-2">
            {Object.entries(scenario.guidance.hints).map(([key, hint]) => (
              <div key={key} className="text-sm text-slate-300 bg-slate-800/50 p-2 rounded">
                <strong className="text-slate-200">{key.replace('-', ' ')}:</strong> {hint}
              </div>
            ))}
          </div>
        </FeatureCard>
      )}

      {/* Widget Content */}
      {React.cloneElement(children as React.ReactElement, {
        scenario,
        widgetState,
        onStepComplete: handleStepComplete,
        mode,
        size,
        showHints: currentStep?.highlight || []
      })}
    </div>
  );
}