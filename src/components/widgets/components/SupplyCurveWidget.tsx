"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Generator, MarketResult } from '@/lib/simulations/types';
import { FeatureCard } from '@/components/ui/FeatureCard';

interface SupplyCurveWidgetProps {
  generators: Generator[];
  marketResult?: MarketResult;
  showHighlight?: boolean;
  showDemandCurve?: boolean;
  demandCurveData?: Array<{ quantity: number; price: number }>;
  size?: 'compact' | 'medium' | 'full';
}

export function SupplyCurveWidget({ 
  generators, 
  marketResult, 
  showHighlight = false,
  showDemandCurve = false,
  demandCurveData = [],
  size = 'medium'
}: SupplyCurveWidgetProps) {
  
  // Generate supply curve data
  const generateSupplyCurve = () => {
    const sortedGenerators = [...generators]
      .filter(g => g.availability > 0)
      .sort((a, b) => a.marginalCost - b.marginalCost);

    const data = [];
    let cumulativeQuantity = 0;

    // Add starting point at zero
    data.push({ quantity: 0, price: sortedGenerators[0]?.marginalCost || 0 });

    for (const generator of sortedGenerators) {
      const availableCapacity = generator.capacity * generator.availability;
      
      // Add step for this generator
      data.push({
        quantity: cumulativeQuantity,
        price: generator.marginalCost
      });
      
      cumulativeQuantity += availableCapacity;
      
      data.push({
        quantity: cumulativeQuantity,
        price: generator.marginalCost
      });
    }

    // Extend curve beyond last generator
    const lastPrice = sortedGenerators[sortedGenerators.length - 1]?.marginalCost || 0;
    data.push({
      quantity: cumulativeQuantity + 500,
      price: lastPrice + 50 // Price spike when capacity is exceeded
    });

    return data;
  };

  const supplyData = generateSupplyCurve();
  const isCompact = size === 'compact';
  const chartHeight = isCompact ? 200 : size === 'full' ? 400 : 300;

  const combinedData = supplyData.map((point, index) => ({
    ...point,
    demand: demandCurveData[index]?.price || null
  }));

  return (
    <FeatureCard className={showHighlight ? 'ring-2 ring-electric-500' : ''}>
      <div className="flex items-center justify-between mb-4">
        <h4 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-base'}`}>
          {showDemandCurve ? 'Supply & Demand Curves' : 'Supply Curve'}
        </h4>
        {!isCompact && (
          <div className="text-xs text-slate-400">
            Price ($/MWh) vs Quantity (MW)
          </div>
        )}
      </div>

      <div style={{ height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={combinedData} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="quantity" 
              stroke="#9CA3AF"
              fontSize={isCompact ? 10 : 12}
              label={!isCompact ? { value: 'Quantity (MW)', position: 'insideBottom', offset: -10, fill: '#9CA3AF' } : undefined}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={isCompact ? 10 : 12}
              label={!isCompact ? { value: 'Price ($/MWh)', angle: -90, position: 'insideLeft', fill: '#9CA3AF' } : undefined}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F3F4F6',
                fontSize: '12px'
              }}
              formatter={(value: number, name: string) => [
                `$${value.toFixed(2)}`,
                name === 'price' ? 'Supply Price' : name === 'demand' ? 'Demand Price' : name
              ]}
              labelFormatter={(value: number) => `Quantity: ${value} MW`}
            />
            
            <Line 
              type="linear"
              dataKey="price" 
              stroke="#10B981" 
              strokeWidth={isCompact ? 2 : 3}
              name="Supply"
              dot={false}
              connectNulls={false}
            />
            
            {showDemandCurve && (
              <Line 
                type="linear"
                dataKey="demand" 
                stroke="#3B82F6" 
                strokeWidth={isCompact ? 2 : 3}
                name="Demand"
                dot={false}
                connectNulls={false}
              />
            )}

            {marketResult && marketResult.clearingPrice > 0 && (
              <>
                <ReferenceLine 
                  x={marketResult.clearedQuantity} 
                  stroke="#DC2626" 
                  strokeDasharray="5 5"
                  label={!isCompact ? { value: "Cleared Qty", position: "top", fontSize: 10 } : undefined}
                />
                <ReferenceLine 
                  y={marketResult.clearingPrice} 
                  stroke="#DC2626" 
                  strokeDasharray="5 5"
                  label={!isCompact ? { value: "Clearing Price", position: "right", fontSize: 10 } : undefined}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {!isCompact && (
        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-green-500"></div>
              <span>Supply Curve</span>
            </div>
            {showDemandCurve && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-blue-500"></div>
                <span>Demand Curve</span>
              </div>
            )}
            {marketResult && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-red-500 border-dashed"></div>
                <span>Market Clearing</span>
              </div>
            )}
          </div>
          
          {marketResult && (
            <div className="text-electric-400 font-medium">
              Clearing: {Math.round(marketResult.clearedQuantity)} MW @ ${marketResult.clearingPrice.toFixed(2)}
            </div>
          )}
        </div>
      )}

      {!isCompact && !showDemandCurve && (
        <div className="mt-4 p-3 bg-slate-800/30 rounded-lg">
          <p className="text-xs text-slate-400">
            💡 <strong>Supply Curve:</strong> Each step represents a generator. The curve rises as more expensive generators are needed to meet higher demand levels.
          </p>
        </div>
      )}
    </FeatureCard>
  );
}