import React from 'react';
import { DemandBid } from '@/lib/simulations/types';
import { FeatureCard } from '@/components/ui/FeatureCard';

interface DemandBidTableProps {
  demandBids: DemandBid[];
  onUpdateDemand?: (id: string, updates: Partial<DemandBid>) => void;
  clearingResults?: Array<{ bid: DemandBid; cost: number }>;
  editable?: boolean;
}

const PRIORITY_COLORS = {
  critical: 'bg-red-900/50 text-red-300',
  high: 'bg-orange-900/50 text-orange-300',
  medium: 'bg-yellow-900/50 text-yellow-300',
  low: 'bg-green-900/50 text-green-300'
};

const PRIORITY_ICONS = {
  critical: '🚨',
  high: '⚡',
  medium: '🏢',
  low: '🔋'
};

export function DemandBidTable({ 
  demandBids, 
  onUpdateDemand,
  clearingResults = [],
  editable = false 
}: DemandBidTableProps) {
  const getClearingInfo = (bidId: string) => {
    return clearingResults.find(c => c.bid.id === bidId);
  };

  return (
    <FeatureCard>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 px-4 font-semibold text-white">Load Entity</th>
              <th className="text-left py-3 px-4 font-semibold text-white">Priority</th>
              <th className="text-right py-3 px-4 font-semibold text-white">Quantity (MW)</th>
              <th className="text-right py-3 px-4 font-semibold text-white">Max Price ($/MWh)</th>
              {clearingResults.length > 0 && (
                <>
                  <th className="text-center py-3 px-4 font-semibold text-white">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-white">Cost ($)</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {demandBids.map((bid) => {
              const clearing = getClearingInfo(bid.id);
              const isCleared = clearing !== undefined;
              
              return (
                <tr 
                  key={bid.id} 
                  className={`border-b border-slate-800 ${isCleared ? 'bg-power-900/20' : ''}`}
                >
                  <td className="py-3 px-4">
                    <div className="font-medium text-white">{bid.name}</div>
                    <div className="text-sm text-slate-400">{bid.id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${PRIORITY_COLORS[bid.priority]}`}>
                      {PRIORITY_ICONS[bid.priority]} {bid.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-slate-200">
                    {editable ? (
                      <input
                        type="number"
                        value={bid.quantity}
                        onChange={(e) => onUpdateDemand?.(bid.id, { quantity: Number(e.target.value) })}
                        className="w-20 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-right text-white"
                      />
                    ) : (
                      bid.quantity
                    )}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-200">
                    {editable ? (
                      <input
                        type="number"
                        value={bid.maxPrice}
                        onChange={(e) => onUpdateDemand?.(bid.id, { maxPrice: Number(e.target.value) })}
                        className="w-20 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-right text-white"
                      />
                    ) : (
                      `$${bid.maxPrice}`
                    )}
                  </td>
                  {clearingResults.length > 0 && (
                    <>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-sm ${
                          isCleared ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'
                        }`}>
                          {isCleared ? '✓ Cleared' : '✗ Not Cleared'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-slate-200">
                        {clearing ? `$${Math.round(clearing.cost).toLocaleString()}` : '—'}
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
            💡 <strong>Tip:</strong> Modify demand quantities and max prices to see market impacts. 
            Bids with higher max prices get cleared first when supply is limited.
          </p>
        </div>
      )}
    </FeatureCard>
  );
}