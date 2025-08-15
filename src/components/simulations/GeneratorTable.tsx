import React from 'react';
import { Generator } from '@/lib/simulations/types';
import { FeatureCard } from '@/components/ui/FeatureCard';

interface GeneratorTableProps {
  generators: Generator[];
  onUpdateGenerator?: (id: string, updates: Partial<Generator>) => void;
  dispatchResults?: Array<{ generator: Generator; output: number; revenue: number }>;
  editable?: boolean;
}

const FUEL_TYPE_COLORS = {
  nuclear: 'bg-purple-100 text-purple-800',
  coal: 'bg-gray-600 text-white',
  gas: 'bg-blue-100 text-blue-800',
  solar: 'bg-yellow-100 text-yellow-800',
  wind: 'bg-green-100 text-green-800',
  hydro: 'bg-cyan-100 text-cyan-800'
};

const FUEL_TYPE_ICONS = {
  nuclear: '⚛️',
  coal: '🏭',
  gas: '🔥',
  solar: '☀️',
  wind: '💨',
  hydro: '💧'
};

export function GeneratorTable({ 
  generators, 
  onUpdateGenerator,
  dispatchResults = [],
  editable = false 
}: GeneratorTableProps) {
  const getDispatchInfo = (genId: string) => {
    return dispatchResults.find(d => d.generator.id === genId);
  };

  return (
    <FeatureCard>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 px-4 font-semibold text-white">Generator</th>
              <th className="text-left py-3 px-4 font-semibold text-white">Fuel Type</th>
              <th className="text-right py-3 px-4 font-semibold text-white">Capacity (MW)</th>
              <th className="text-right py-3 px-4 font-semibold text-white">Cost ($/MWh)</th>
              <th className="text-right py-3 px-4 font-semibold text-white">Availability</th>
              {dispatchResults.length > 0 && (
                <>
                  <th className="text-right py-3 px-4 font-semibold text-white">Output (MW)</th>
                  <th className="text-right py-3 px-4 font-semibold text-white">Revenue ($)</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {generators.map((generator) => {
              const dispatch = getDispatchInfo(generator.id);
              const isDispatched = dispatch && dispatch.output > 0;
              
              return (
                <tr 
                  key={generator.id} 
                  className={`border-b border-slate-800 ${isDispatched ? 'bg-electric-900/20' : ''}`}
                >
                  <td className="py-3 px-4">
                    <div className="font-medium text-white">{generator.name}</div>
                    <div className="text-sm text-slate-400">{generator.id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${FUEL_TYPE_COLORS[generator.fuelType]}`}>
                      {FUEL_TYPE_ICONS[generator.fuelType]} {generator.fuelType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-slate-200">
                    {editable ? (
                      <input
                        type="number"
                        value={generator.capacity}
                        onChange={(e) => onUpdateGenerator?.(generator.id, { capacity: Number(e.target.value) })}
                        className="w-20 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-right text-white"
                      />
                    ) : (
                      generator.capacity
                    )}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-200">
                    {editable ? (
                      <input
                        type="number"
                        value={generator.marginalCost}
                        onChange={(e) => onUpdateGenerator?.(generator.id, { marginalCost: Number(e.target.value) })}
                        className="w-20 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-right text-white"
                        step="0.5"
                      />
                    ) : (
                      `$${generator.marginalCost}`
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`px-2 py-1 rounded text-sm ${
                      generator.availability > 0.9 ? 'bg-green-900/50 text-green-300' :
                      generator.availability > 0.7 ? 'bg-yellow-900/50 text-yellow-300' :
                      'bg-red-900/50 text-red-300'
                    }`}>
                      {Math.round(generator.availability * 100)}%
                    </span>
                  </td>
                  {dispatchResults.length > 0 && (
                    <>
                      <td className="py-3 px-4 text-right text-slate-200">
                        {dispatch ? Math.round(dispatch.output) : '—'}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-200">
                        {dispatch ? `$${Math.round(dispatch.revenue).toLocaleString()}` : '—'}
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {editable && (
        <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
          <p className="text-sm text-slate-400">
            💡 <strong>Tip:</strong> Modify generator capacity and marginal costs to see how they affect market clearing.
            Lower costs get dispatched first (merit order).
          </p>
        </div>
      )}
    </FeatureCard>
  );
}