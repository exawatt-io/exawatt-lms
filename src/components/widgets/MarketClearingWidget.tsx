"use client";

import React, { useState, useEffect } from 'react';
import { BaseWidget } from './BaseWidget';
import { MeritOrderWidget } from './components/MeritOrderWidget';
import { SupplyCurveWidget } from './components/SupplyCurveWidget';
import { GeneratorTable } from '../simulations/GeneratorTable';
import { DemandBidTable } from '../simulations/DemandBidTable';
import { MarketClearingEngine } from '@/lib/simulations/market-clearing';
import { MARKET_CLEARING_SCENARIOS } from '@/lib/simulations/scenarios';
import { BaseWidgetProps } from '@/lib/simulations/widget-types';
import { Generator, DemandBid, MarketResult } from '@/lib/simulations/types';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Badge } from '@/components/ui/Badge';
import { TrendingUp, Zap, DollarSign, Activity } from 'lucide-react';

interface MarketClearingWidgetProps extends BaseWidgetProps {
  // Allow override of scenario data
  generators?: Generator[];
  demandBids?: DemandBid[];
}

export function MarketClearingWidget({
  scenario = 'intro-merit-order',
  mode = 'interactive',
  size = 'medium',
  showComponents = ['all'],
  locked = [],
  editable = [],
  generators: overrideGenerators,
  demandBids: overrideDemandBids,
  ...props
}: MarketClearingWidgetProps) {
  const scenarioConfig = MARKET_CLEARING_SCENARIOS[scenario];
  
  if (!scenarioConfig) {
    return <div className="text-red-400">Scenario "{scenario}" not found</div>;
  }

  // Initialize state with scenario data or overrides
  const [generators, setGenerators] = useState<Generator[]>(
    overrideGenerators || scenarioConfig.data.generators
  );
  const [demandBids, setDemandBids] = useState<DemandBid[]>(
    overrideDemandBids || scenarioConfig.data.demandBids
  );
  const [marketResult, setMarketResult] = useState<MarketResult | null>(null);

  // Run market clearing when data changes
  useEffect(() => {
    const result = MarketClearingEngine.clearMarket(generators, demandBids);
    setMarketResult(result);
  }, [generators, demandBids]);

  // Handle resets
  const handleReset = () => {
    setGenerators(overrideGenerators || scenarioConfig.data.generators);
    setDemandBids(overrideDemandBids || scenarioConfig.data.demandBids);
  };

  // Handle parameter updates
  const updateGenerator = (id: string, updates: Partial<Generator>) => {
    if (locked.includes('generators') || locked.includes(`generator-${id}`)) return;
    
    setGenerators(prev => prev.map(g => 
      g.id === id ? { ...g, ...updates } : g
    ));
  };

  const updateDemandBid = (id: string, updates: Partial<DemandBid>) => {
    if (locked.includes('demand-bids') || locked.includes(`demand-${id}`)) return;
    
    setDemandBids(prev => prev.map(d => 
      d.id === id ? { ...d, ...updates } : d
    ));
  };

  // Determine what components to show
  const shouldShowComponent = (componentName: string) => {
    if (showComponents.includes('all')) return true;
    return showComponents.includes(componentName);
  };

  // Generate demand curve data for supply/demand visualization
  const generateDemandCurve = () => {
    const sortedDemand = [...demandBids].sort((a, b) => b.maxPrice - a.maxPrice);
    const data = [];
    let cumulativeQuantity = 0;

    data.push({ quantity: 0, price: sortedDemand[0]?.maxPrice || 0 });
    
    for (const bid of sortedDemand) {
      data.push({ quantity: cumulativeQuantity, price: bid.maxPrice });
      cumulativeQuantity += bid.quantity;
      data.push({ quantity: cumulativeQuantity, price: bid.maxPrice });
    }

    // End at zero price for remaining quantity
    data.push({ quantity: cumulativeQuantity + 500, price: 0 });
    return data;
  };

  const isCompact = size === 'compact';
  const isGuided = mode === 'guided';

  return (
    <BaseWidget 
      scenario={scenarioConfig} 
      mode={mode} 
      size={size} 
      onReset={handleReset}
      {...props}
    >
      <div className="space-y-6">
        {/* Market Results Summary - Always show for context */}
        {marketResult && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FeatureCard className="text-center p-4">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="h-5 w-5 text-electric-400" />
              </div>
              <div className="text-2xl font-bold text-electric-400 mb-1">
                ${marketResult.clearingPrice.toFixed(2)}
              </div>
              <div className="text-xs text-slate-300">Clearing Price</div>
            </FeatureCard>
            
            <FeatureCard className="text-center p-4">
              <div className="flex items-center justify-center mb-2">
                <Activity className="h-5 w-5 text-power-400" />
              </div>
              <div className="text-2xl font-bold text-power-400 mb-1">
                {Math.round(marketResult.clearedQuantity)}
              </div>
              <div className="text-xs text-slate-300">MW Cleared</div>
            </FeatureCard>
            
            <FeatureCard className="text-center p-4">
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-5 w-5 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-green-400 mb-1">
                {marketResult.dispatchedGenerators.length}
              </div>
              <div className="text-xs text-slate-300">Dispatched</div>
            </FeatureCard>
            
            <FeatureCard className="text-center p-4">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-blue-400 mb-1">
                ${Math.round(marketResult.totalRevenue / 1000)}k
              </div>
              <div className="text-xs text-slate-300">Total Revenue</div>
            </FeatureCard>
          </div>
        )}

        {/* Merit Order - Great for beginners */}
        {shouldShowComponent('merit-order') && (
          <MeritOrderWidget
            generators={generators}
            dispatchedGenerators={marketResult?.dispatchedGenerators}
            showHighlight={isGuided}
            size={size}
          />
        )}

        {/* Supply Curve or Supply & Demand */}
        {(shouldShowComponent('supply-curve') || shouldShowComponent('demand-curve')) && (
          <SupplyCurveWidget
            generators={generators}
            marketResult={marketResult}
            showDemandCurve={shouldShowComponent('demand-curve')}
            demandCurveData={generateDemandCurve()}
            showHighlight={isGuided}
            size={size}
          />
        )}

        {/* Interactive Tables - For deeper exploration */}
        {shouldShowComponent('generator-table') && (
          <div>
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Zap className="h-5 w-5 text-electric-400" />
              Generator Fleet
            </h4>
            <GeneratorTable 
              generators={generators}
              onUpdateGenerator={editable.includes('generators') ? updateGenerator : undefined}
              dispatchResults={marketResult?.dispatchedGenerators}
              editable={editable.includes('generators') && !locked.includes('generators')}
            />
          </div>
        )}

        {shouldShowComponent('demand-table') && (
          <div>
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-power-400" />
              Demand Bids
            </h4>
            <DemandBidTable 
              demandBids={demandBids}
              onUpdateDemand={editable.includes('demand-bids') ? updateDemandBid : undefined}
              clearingResults={marketResult?.clearedDemand}
              editable={editable.includes('demand-bids') && !locked.includes('demand-bids')}
            />
          </div>
        )}

        {/* Economic Analysis - Advanced feature */}
        {shouldShowComponent('economic-surplus') && marketResult && (
          <FeatureCard>
            <h4 className="text-lg font-semibold text-white mb-4">Economic Analysis</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-900/20 rounded-lg">
                <div className="text-xl font-bold text-green-400 mb-1">
                  ${Math.round(marketResult.producerSurplus).toLocaleString()}
                </div>
                <div className="text-sm text-slate-300">Producer Surplus</div>
                <div className="text-xs text-slate-400 mt-1">Generator profits</div>
              </div>
              
              <div className="text-center p-4 bg-blue-900/20 rounded-lg">
                <div className="text-xl font-bold text-blue-400 mb-1">
                  ${Math.round(marketResult.consumerSurplus).toLocaleString()}
                </div>
                <div className="text-sm text-slate-300">Consumer Surplus</div>
                <div className="text-xs text-slate-400 mt-1">Load savings</div>
              </div>
              
              <div className="text-center p-4 bg-purple-900/20 rounded-lg">
                <div className="text-xl font-bold text-purple-400 mb-1">
                  ${Math.round(marketResult.producerSurplus + marketResult.consumerSurplus).toLocaleString()}
                </div>
                <div className="text-sm text-slate-300">Total Surplus</div>
                <div className="text-xs text-slate-400 mt-1">Economic welfare</div>
              </div>
            </div>
          </FeatureCard>
        )}

        {/* Dispatch Table - Shows clearing results */}
        {shouldShowComponent('dispatch-table') && marketResult && (
          <FeatureCard>
            <h4 className="text-lg font-semibold text-white mb-4">Dispatch Results</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 px-3 text-white text-sm">Generator</th>
                    <th className="text-right py-2 px-3 text-white text-sm">Output (MW)</th>
                    <th className="text-right py-2 px-3 text-white text-sm">Cost ($/MWh)</th>
                    <th className="text-right py-2 px-3 text-white text-sm">Revenue ($)</th>
                    <th className="text-right py-2 px-3 text-white text-sm">Profit ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {marketResult.dispatchedGenerators.map(({ generator, output, revenue }) => (
                    <tr key={generator.id} className="border-b border-slate-800">
                      <td className="py-2 px-3 text-slate-200">{generator.name}</td>
                      <td className="py-2 px-3 text-right text-slate-200">{Math.round(output)}</td>
                      <td className="py-2 px-3 text-right text-slate-200">${generator.marginalCost}</td>
                      <td className="py-2 px-3 text-right text-slate-200">${Math.round(revenue).toLocaleString()}</td>
                      <td className="py-2 px-3 text-right text-green-400">
                        ${Math.round((marketResult.clearingPrice - generator.marginalCost) * output).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FeatureCard>
        )}
      </div>
    </BaseWidget>
  );
}