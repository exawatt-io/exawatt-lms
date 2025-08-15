"use client";

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Badge } from '@/components/ui/Badge';
import {
  FolderOpen,
  Save,
  Upload,
  Download,
  Trash2,
  X,
  Plus,
  FileText,
  Zap,
  TrendingUp,
  Check,
  AlertCircle
} from 'lucide-react';
import { SimulationState } from '@/lib/simulation-state';
import { MARKET_CLEARING_SCENARIOS } from '@/lib/simulations/scenarios';

interface SavedScenario {
  id: string;
  name: string;
  description: string;
  state: SimulationState;
  createdAt: string;
  tags: string[];
}

interface ScenarioManagerProps {
  currentState: SimulationState;
  onLoadScenario: (state: SimulationState) => void;
  isOpen: boolean;
  onClose: () => void;
  simulationType: string;
}

export function ScenarioManager({
  currentState,
  onLoadScenario,
  isOpen,
  onClose,
  simulationType
}: ScenarioManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(`exawatt-scenarios-${simulationType}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [isCreatingPreset, setIsCreatingPreset] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [presetDescription, setPresetDescription] = useState('');
  const [presetTags, setPresetTags] = useState('');
  const [importError, setImportError] = useState('');

  // Save scenarios to localStorage whenever they change
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`exawatt-scenarios-${simulationType}`, JSON.stringify(savedScenarios));
    }
  }, [savedScenarios, simulationType]);

  const handleSaveCurrentState = () => {
    if (!presetName.trim()) return;

    const newScenario: SavedScenario = {
      id: `custom-${Date.now()}`,
      name: presetName.trim(),
      description: presetDescription.trim(),
      state: currentState,
      createdAt: new Date().toISOString(),
      tags: presetTags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    setSavedScenarios(prev => [newScenario, ...prev]);
    setPresetName('');
    setPresetDescription('');
    setPresetTags('');
    setIsCreatingPreset(false);
  };

  const handleDeleteScenario = (id: string) => {
    setSavedScenarios(prev => prev.filter(scenario => scenario.id !== id));
  };

  const handleImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedState = JSON.parse(content) as SimulationState;
        
        // Validate the imported state
        if (!importedState.generators || !importedState.demandBids) {
          throw new Error('Invalid scenario file: missing required fields');
        }

        onLoadScenario(importedState);
        setImportError('');
        onClose();
      } catch (error) {
        setImportError(error instanceof Error ? error.message : 'Failed to import scenario');
      }
    };
    reader.readAsText(file);
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExportScenario = (scenario: SavedScenario) => {
    const dataStr = JSON.stringify(scenario.state, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${scenario.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  const builtInScenarios = Object.entries(MARKET_CLEARING_SCENARIOS).map(([key, scenario]) => ({
    id: key,
    name: scenario.name,
    description: scenario.description,
    isBuiltIn: true,
    data: scenario.data
  }));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <FeatureCard className="w-full max-w-4xl relative max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FolderOpen className="h-6 w-6 text-electric-400" />
            <div>
              <h2 className="text-xl font-semibold text-white">Scenario Manager</h2>
              <p className="text-sm text-slate-400">Load, save, and manage simulation scenarios</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            icon={X}
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          />
        </div>

        <div className="flex gap-6 h-[calc(90vh-200px)]">
          {/* Actions Panel */}
          <div className="w-80 space-y-4">
            {/* Save Current State */}
            <div className="space-y-3">
              <h3 className="font-medium text-white">Save Current Scenario</h3>
              {!isCreatingPreset ? (
                <Button
                  variant="primary"
                  icon={Save}
                  onClick={() => setIsCreatingPreset(true)}
                  className="w-full"
                >
                  Create Preset
                </Button>
              ) : (
                <div className="space-y-3 p-4 bg-slate-800 rounded-lg">
                  <input
                    type="text"
                    placeholder="Scenario name"
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                  />
                  <textarea
                    placeholder="Description (optional)"
                    value={presetDescription}
                    onChange={(e) => setPresetDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm h-20 resize-none"
                  />
                  <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={presetTags}
                    onChange={(e) => setPresetTags(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={Check}
                      onClick={handleSaveCurrentState}
                      disabled={!presetName.trim()}
                      className="flex-1"
                    >
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsCreatingPreset(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Import/Export */}
            <div className="space-y-3">
              <h3 className="font-medium text-white">Import/Export</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  icon={Upload}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full justify-start"
                >
                  Import from File
                </Button>
                <Button
                  variant="outline"
                  icon={Download}
                  onClick={() => {
                    const dataStr = JSON.stringify(currentState, null, 2);
                    const blob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'current-scenario.json';
                    link.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="w-full justify-start"
                >
                  Export Current
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
              {importError && (
                <div className="text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {importError}
                </div>
              )}
            </div>
          </div>

          {/* Scenarios List */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-6">
              {/* Built-in Scenarios */}
              <div>
                <h3 className="font-medium text-white mb-3">Built-in Scenarios</h3>
                <div className="grid gap-3">
                  {builtInScenarios.map((scenario) => (
                    <div
                      key={scenario.id}
                      className="p-4 bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-white truncate">{scenario.name}</h4>
                            <Badge variant="neutral" size="sm">Built-in</Badge>
                          </div>
                          <p className="text-sm text-slate-400 mb-3">{scenario.description}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Zap className="h-3 w-3" />
                              {scenario.data.generators.length} generators
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              {scenario.data.demandBids.length} demand bids
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            onLoadScenario({
                              generators: scenario.data.generators,
                              demandBids: scenario.data.demandBids,
                              scenario: scenario.id
                            });
                            onClose();
                          }}
                        >
                          Load
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Saved Scenarios */}
              {savedScenarios.length > 0 && (
                <div>
                  <h3 className="font-medium text-white mb-3">Your Scenarios</h3>
                  <div className="grid gap-3">
                    {savedScenarios.map((scenario) => (
                      <div
                        key={scenario.id}
                        className="p-4 bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium text-white truncate">{scenario.name}</h4>
                              {scenario.tags.map(tag => (
                                <Badge key={tag} variant="neutral" size="sm">{tag}</Badge>
                              ))}
                            </div>
                            {scenario.description && (
                              <p className="text-sm text-slate-400 mb-3">{scenario.description}</p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Zap className="h-3 w-3" />
                                {scenario.state.generators.length} generators
                              </span>
                              <span className="flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />
                                {scenario.state.demandBids.length} demand bids
                              </span>
                              <span>
                                {new Date(scenario.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={Download}
                              onClick={() => handleExportScenario(scenario)}
                              title="Export"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={Trash2}
                              onClick={() => handleDeleteScenario(scenario.id)}
                              className="text-red-400 hover:text-red-300"
                              title="Delete"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                onLoadScenario(scenario.state);
                                onClose();
                              }}
                            >
                              Load
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </FeatureCard>
    </div>
  );
}