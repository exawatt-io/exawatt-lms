"use client";

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, AreaChart, Area } from 'recharts';
import { Play, RefreshCw, Settings, TrendingUp, Zap } from 'lucide-react';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GeneratorTable } from './GeneratorTable';
import { DemandBidTable } from './DemandBidTable';
import { MarketClearingEngine, DEFAULT_SCENARIOS } from '@/lib/simulations/market-clearing';
import { Generator, DemandBid, MarketResult, SimulationScenario } from '@/lib/simulations/types';

export function EnhancedMarketClearing() {
  const [currentScenario, setCurrentScenario] = useState<string>('normal');
  const [generators, setGenerators] = useState<Generator[]>(DEFAULT_SCENARIOS.normal.generators);
  const [demandBids, setDemandBids] = useState<DemandBid[]>(DEFAULT_SCENARIOS.normal.demandBids);
  const [marketResult, setMarketResult] = useState<MarketResult | null>(null);
  const [showTables, setShowTables] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    runMarketClearing();
  }, [generators, demandBids]);

  const runMarketClearing = async () => {
    setIsAnimating(true);
    
    // Add small delay for animation effect
    setTimeout(() => {
      const result = MarketClearingEngine.clearMarket(generators, demandBids);
      setMarketResult(result);
      setIsAnimating(false);
    }, 500);
  };

  const loadScenario = (scenarioId: string) => {
    const scenario = DEFAULT_SCENARIOS[scenarioId];
    if (scenario) {
      setCurrentScenario(scenarioId);
      setGenerators([...scenario.generators]);
      setDemandBids([...scenario.demandBids]);
    }
  };

  const updateGenerator = (id: string, updates: Partial<Generator>) => {
    setGenerators(prev => prev.map(g => 
      g.id === id ? { ...g, ...updates } : g
    ));
  };

  const updateDemandBid = (id: string, updates: Partial<DemandBid>) => {
    setDemandBids(prev => prev.map(d => 
      d.id === id ? { ...d, ...updates } : d
    ));
  };

  // Generate supply and demand curves for visualization
  const generateCurveData = () => {
    if (!marketResult) return [];

    const data = [];
    
    // Sort generators by marginal cost
    const sortedGenerators = [...generators]
      .filter(g => g.availability > 0)
      .sort((a, b) => a.marginalCost - b.marginalCost);
    
    // Sort demand by max price (descending)
    const sortedDemand = [...demandBids]
      .sort((a, b) => b.maxPrice - a.maxPrice);

    let supplyQuantity = 0;
    let demandQuantity = 0;
    const maxPoints = 50;

    // Build supply curve
    for (let i = 0; i <= maxPoints; i++) {
      const quantity = i * (4000 / maxPoints);
      
      // Find supply price at this quantity
      let supplyPrice = 0;
      let currentQuantity = 0;
      
      for (const gen of sortedGenerators) {
        const availableCapacity = gen.capacity * gen.availability;
        if (currentQuantity + availableCapacity >= quantity) {
          supplyPrice = gen.marginalCost;
          break;
        }
        currentQuantity += availableCapacity;
        supplyPrice = gen.marginalCost;
      }

      // Find demand price at this quantity
      let demandPrice = 0;
      currentQuantity = 0;
      
      for (const bid of sortedDemand) {
        if (currentQuantity + bid.quantity >= quantity) {
          demandPrice = bid.maxPrice;
          break;
        }
        currentQuantity += bid.quantity;
        demandPrice = 0; // No willingness to pay beyond this point
      }

      data.push({
        quantity: Math.round(quantity),
        supply: Math.round(supplyPrice * 100) / 100,
        demand: Math.round(demandPrice * 100) / 100
      });
    }

    return data;
  };

  const curveData = generateCurveData();

  return (
    <div className="space-y-8">
      {/* Scenario Selection */}
      <FeatureCard>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Market Scenarios</h3>
            <p className="text-slate-300">Choose a predefined scenario or modify parameters manually</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={showTables ? 'primary' : 'outline'}
              size="sm"
              icon={Settings}
              onClick={() => setShowTables(!showTables)}
            >
              {showTables ? 'Hide' : 'Show'} Tables
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={isAnimating ? RefreshCw : Play}
              onClick={runMarketClearing}
              disabled={isAnimating}
            >
              {isAnimating ? 'Running...' : 'Run Market'}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {Object.entries(DEFAULT_SCENARIOS).map(([key, scenario]) => (
            <button
              key={key}
              onClick={() => loadScenario(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentScenario === key
                  ? 'bg-electric-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {scenario.name}
            </button>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
          <p className="text-sm text-slate-400">
            <strong>{DEFAULT_SCENARIOS[currentScenario]?.name}:</strong> {DEFAULT_SCENARIOS[currentScenario]?.description}
          </p>
        </div>
      </FeatureCard>

      {/* Market Results */}
      {marketResult && (
        <div className="grid md:grid-cols-4 gap-6">
          <FeatureCard className="text-center">
            <div className="text-3xl font-bold text-electric-400 mb-2">
              ${marketResult.clearingPrice.toFixed(2)}
            </div>
            <div className="text-slate-300">Clearing Price</div>
            <div className="text-xs text-slate-500 mt-1">$/MWh</div>
          </FeatureCard>
          
          <FeatureCard className="text-center">
            <div className="text-3xl font-bold text-power-400 mb-2">
              {Math.round(marketResult.clearedQuantity).toLocaleString()}
            </div>
            <div className="text-slate-300">Cleared Quantity</div>
            <div className="text-xs text-slate-500 mt-1">MW</div>
          </FeatureCard>
          
          <FeatureCard className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              ${Math.round(marketResult.producerSurplus).toLocaleString()}
            </div>
            <div className="text-slate-300">Producer Surplus</div>
            <div className="text-xs text-slate-500 mt-1">Generator Profits</div>
          </FeatureCard>
          
          <FeatureCard className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              ${Math.round(marketResult.consumerSurplus).toLocaleString()}
            </div>
            <div className="text-slate-300">Consumer Surplus</div>
            <div className="text-xs text-slate-500 mt-1">Load Savings</div>
          </FeatureCard>
        </div>
      )}

      {/* Supply and Demand Curve */}
      <FeatureCard>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Supply & Demand Curves</h3>
            <p className="text-slate-300">Market clearing occurs where supply meets demand</p>
          </div>
          {marketResult && (
            <div className="flex items-center gap-4">
              <Badge variant="neutral" size="sm">
                <TrendingUp className="h-3 w-3 mr-1" />
                Equilibrium: {Math.round(marketResult.clearedQuantity)} MW @ ${marketResult.clearingPrice.toFixed(2)}
              </Badge>
            </div>
          )}
        </div>
        
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={curveData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="quantity" 
                stroke="#9CA3AF"
                label={{ value: 'Quantity (MW)', position: 'insideBottom', offset: -10, fill: '#9CA3AF' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                label={{ value: 'Price ($/MWh)', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
                formatter={(value: number, name: string) => [
                  `$${value.toFixed(2)}`,
                  name === 'supply' ? 'Supply Price' : 'Demand Price'
                ]}
                labelFormatter={(value: number) => `Quantity: ${value} MW`}
              />
              <Line 
                type="stepAfter"
                dataKey="supply" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Supply"
                dot={false}
                connectNulls={false}
              />
              <Line 
                type="stepBefore"
                dataKey="demand" 
                stroke="#3B82F6" 
                strokeWidth={3}
                name="Demand"
                dot={false}
                connectNulls={false}
              />
              {marketResult && marketResult.clearedQuantity > 0 && (
                <>
                  <ReferenceLine 
                    x={marketResult.clearedQuantity} 
                    stroke="#DC2626" 
                    strokeDasharray="5 5"
                    label={{ value: "Cleared Qty", position: "top" }}
                  />
                  <ReferenceLine 
                    y={marketResult.clearingPrice} 
                    stroke="#DC2626" 
                    strokeDasharray="5 5"
                    label={{ value: "Clearing Price", position: "right" }}
                  />
                </>
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </FeatureCard>

      {/* Interactive Tables */}
      {showTables && (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-electric-400" />
              Generator Fleet
            </h3>
            <GeneratorTable 
              generators={generators}
              onUpdateGenerator={updateGenerator}
              dispatchResults={marketResult?.dispatchedGenerators}
              editable={true}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-power-400" />
              Demand Bids
            </h3>
            <DemandBidTable 
              demandBids={demandBids}
              onUpdateDemand={updateDemandBid}
              clearingResults={marketResult?.clearedDemand}
              editable={true}
            />
          </div>
        </div>
      )}

      {/* Educational Insights */}
      <FeatureCard>
        <h3 className="text-xl font-semibold text-white mb-4">Market Insights</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-slate-200 mb-3">Merit Order Dispatch</h4>
            <p className="text-slate-300 text-sm mb-3">
              Generators are dispatched in order of increasing marginal cost (merit order). 
              The most expensive generator needed to meet demand sets the market clearing price.
            </p>
            {marketResult && marketResult.dispatchedGenerators.length > 0 && (
              <div className="bg-slate-800/50 p-3 rounded">
                <p className="text-xs text-slate-400">
                  <strong>Marginal Generator:</strong> {marketResult.dispatchedGenerators[marketResult.dispatchedGenerators.length - 1]?.generator.name} 
                  @ ${marketResult.clearingPrice.toFixed(2)}/MWh
                </p>
              </div>
            )}
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-200 mb-3">Economic Efficiency</h4>
            <p className="text-slate-300 text-sm mb-3">
              The market maximizes total welfare by finding the equilibrium where marginal benefit 
              (demand curve) equals marginal cost (supply curve).
            </p>
            {marketResult && (
              <div className="bg-slate-800/50 p-3 rounded">
                <p className="text-xs text-slate-400">
                  <strong>Total Surplus:</strong> ${Math.round(marketResult.producerSurplus + marketResult.consumerSurplus).toLocaleString()}
                  (Producer: ${Math.round(marketResult.producerSurplus).toLocaleString()} + Consumer: ${Math.round(marketResult.consumerSurplus).toLocaleString()})
                </p>
              </div>
            )}
          </div>
        </div>
      </FeatureCard>
    </div>
  );
}