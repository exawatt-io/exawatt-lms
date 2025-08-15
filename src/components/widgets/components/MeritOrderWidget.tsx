"use client";

import React from 'react';
import { Generator } from '@/lib/simulations/types';
import { FeatureCard } from '@/components/ui/FeatureCard';

interface MeritOrderWidgetProps {
  generators: Generator[];
  dispatchedGenerators?: Array<{ generator: Generator; output: number }>;
  showHighlight?: boolean;
  size?: 'compact' | 'medium' | 'full';
}

const FUEL_TYPE_COLORS = {
  nuclear: 'bg-purple-500',
  coal: 'bg-gray-600',
  gas: 'bg-blue-500',
  solar: 'bg-yellow-500',
  wind: 'bg-green-500',
  hydro: 'bg-cyan-500'
};

export function MeritOrderWidget({ 
  generators, 
  dispatchedGenerators = [], 
  showHighlight = false,
  size = 'medium'
}: MeritOrderWidgetProps) {
  // Sort generators by marginal cost (merit order)
  const sortedGenerators = [...generators]
    .filter(g => g.availability > 0)
    .sort((a, b) => a.marginalCost - b.marginalCost);

  const getDispatchInfo = (genId: string) => {
    return dispatchedGenerators.find(d => d.generator.id === genId);
  };

  const isCompact = size === 'compact';

  return (
    <FeatureCard className={showHighlight ? 'ring-2 ring-electric-500' : ''}>
      <div className="flex items-center justify-between mb-4">
        <h4 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-base'}`}>
          Merit Order Stack
        </h4>
        {!isCompact && (
          <div className="text-xs text-slate-400">
            Dispatched in order of increasing cost →
          </div>
        )}
      </div>

      <div className="space-y-2">
        {sortedGenerators.map((generator, index) => {
          const dispatch = getDispatchInfo(generator.id);
          const isDispatched = dispatch && dispatch.output > 0;
          const availableCapacity = Math.round(generator.capacity * generator.availability);

          return (
            <div
              key={generator.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                isDispatched 
                  ? 'bg-electric-900/30 border-electric-700/50' 
                  : 'bg-slate-800/50 border-slate-700/50'
              }`}
            >
              {/* Dispatch Order */}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                isDispatched ? 'bg-electric-500 text-white' : 'bg-slate-600 text-slate-300'
              }`}>
                {index + 1}
              </div>

              {/* Fuel Type Indicator */}
              <div className={`w-3 h-3 rounded-full ${FUEL_TYPE_COLORS[generator.fuelType]}`} />

              {/* Generator Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`font-medium text-white ${isCompact ? 'text-sm' : ''}`}>
                    {isCompact ? generator.name.split(' ')[0] : generator.name}
                  </span>
                  <span className={`text-slate-300 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                    ${generator.marginalCost}/MWh
                  </span>
                </div>
                
                {!isCompact && (
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{availableCapacity} MW available</span>
                    {isDispatched && (
                      <span className="text-electric-400 font-medium">
                        Dispatched: {Math.round(dispatch.output)} MW
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Dispatch Status */}
              <div className={`w-2 h-8 rounded ${
                isDispatched ? 'bg-electric-500' : 'bg-slate-600'
              }`} />
            </div>
          );
        })}
      </div>

      {!isCompact && (
        <div className="mt-4 p-3 bg-slate-800/30 rounded-lg">
          <p className="text-xs text-slate-400">
            💡 <strong>Merit Order:</strong> Generators with lower marginal costs are dispatched first. 
            This ensures the lowest-cost electricity production to meet demand.
          </p>
        </div>
      )}
    </FeatureCard>
  );
}