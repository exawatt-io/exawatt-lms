"use client";

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Slider } from "@/components/ui/Slider";
import { Card } from "@/components/ui/Card";

interface DataPoint {
  quantity: number;
  supply: number;
  demand: number;
}

export function MarketClearingSimulation() {
  const [demandSlope, setDemandSlope] = useState(-2);
  const [demandIntercept, setDemandIntercept] = useState(100);
  const [supplySlope, setSupplySlope] = useState(1.5);
  const [supplyIntercept, setSupplyIntercept] = useState(20);
  
  const [data, setData] = useState<DataPoint[]>([]);
  const [equilibrium, setEquilibrium] = useState({ price: 0, quantity: 0 });

  useEffect(() => {
    // Generate data points
    const points: DataPoint[] = [];
    for (let q = 0; q <= 100; q += 2) {
      const supply = Math.max(0, supplyIntercept + supplySlope * q);
      const demand = Math.max(0, demandIntercept + demandSlope * q);
      points.push({ quantity: q, supply, demand });
    }
    setData(points);

    // Calculate equilibrium
    const eqQuantity = (demandIntercept - supplyIntercept) / (supplySlope - demandSlope);
    const eqPrice = supplyIntercept + supplySlope * eqQuantity;
    
    if (eqQuantity >= 0 && eqPrice >= 0) {
      setEquilibrium({ price: Math.round(eqPrice * 100) / 100, quantity: Math.round(eqQuantity * 100) / 100 });
    }
  }, [demandSlope, demandIntercept, supplySlope, supplyIntercept]);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Demand Curve</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Price Sensitivity: {Math.abs(demandSlope)}
                </label>
                <Slider
                  value={[Math.abs(demandSlope)]}
                  onValueChange={(value) => setDemandSlope(-value[0])}
                  max={5}
                  min={0.5}
                  step={0.1}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Max Price: ${demandIntercept}
                </label>
                <Slider
                  value={[demandIntercept]}
                  onValueChange={(value) => setDemandIntercept(value[0])}
                  max={150}
                  min={50}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Supply Curve</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Marginal Cost Slope: {supplySlope}
                </label>
                <Slider
                  value={[supplySlope]}
                  onValueChange={(value) => setSupplySlope(value[0])}
                  max={3}
                  min={0.5}
                  step={0.1}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Base Cost: ${supplyIntercept}
                </label>
                <Slider
                  value={[supplyIntercept]}
                  onValueChange={(value) => setSupplyIntercept(value[0])}
                  max={50}
                  min={0}
                  step={2}
                  className="w-full"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Market Clearing Visualization</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="quantity" 
                    label={{ value: 'Quantity (MWh)', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis 
                    label={{ value: 'Price ($/MWh)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      `$${value.toFixed(2)}`,
                      name === 'supply' ? 'Supply Price' : 'Demand Price'
                    ]}
                    labelFormatter={(value: number) => `Quantity: ${value} MWh`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="supply" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Supply"
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="demand" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="Demand"
                    dot={false}
                  />
                  {equilibrium.quantity > 0 && (
                    <>
                      <ReferenceLine 
                        x={equilibrium.quantity} 
                        stroke="#dc2626" 
                        strokeDasharray="5 5"
                      />
                      <ReferenceLine 
                        y={equilibrium.price} 
                        stroke="#dc2626" 
                        strokeDasharray="5 5"
                      />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      {/* Results */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Market Equilibrium</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
            <div className="text-2xl font-bold text-green-700">${equilibrium.price}</div>
            <div className="text-sm text-green-600">Clearing Price ($/MWh)</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">{equilibrium.quantity} MWh</div>
            <div className="text-sm text-blue-600">Cleared Quantity</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-700">
              ${Math.round(equilibrium.price * equilibrium.quantity).toLocaleString()}
            </div>
            <div className="text-sm text-purple-600">Total Market Value</div>
          </div>
        </div>
      </Card>

      {/* Learning Insights */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Key Insights</h3>
        <div className="space-y-3 text-slate-600">
          <p>
            <strong>Market Clearing:</strong> The intersection of supply and demand curves determines 
            the market-clearing price and quantity where all accepted bids are paid the same price.
          </p>
          <p>
            <strong>Price Formation:</strong> Higher demand or reduced supply capacity shifts curves 
            and typically increases the clearing price. Lower demand or increased supply has the opposite effect.
          </p>
          <p>
            <strong>Elasticity Impact:</strong> Steeper curves (less elastic) result in larger price 
            changes for the same shift in market conditions.
          </p>
        </div>
      </Card>
    </div>
  );
}