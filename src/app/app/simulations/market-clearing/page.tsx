"use client";

import React, { useState } from 'react';
import { AppLayout } from '@/components/app/AppLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { GeneratorTable } from '@/components/simulations/GeneratorTable';
import { DemandBidTable } from '@/components/simulations/DemandBidTable';
import { MeritOrderWidget } from '@/components/widgets/components/MeritOrderWidget';
import { SupplyCurveWidget } from '@/components/widgets/components/SupplyCurveWidget';
import { ShareSimulation } from '@/components/simulations/ShareSimulation';
import { ScenarioManager } from '@/components/simulations/ScenarioManager';
import { useSimulationState } from '@/lib/simulation-state';
import { MarketClearingEngine } from '@/lib/simulations/market-clearing';
import { MARKET_CLEARING_SCENARIOS } from '@/lib/simulations/scenarios';
import { Generator, DemandBid, MarketResult } from '@/lib/simulations/types';
import { 
  Settings, 
  RotateCcw, 
  Share, 
  BookOpen, 
  ArrowLeft,
  Play,
  Pause,
  BarChart3,
  TrendingUp,
  Zap,
  DollarSign,
  Activity,
  FolderOpen,
  Eye,
  Calculator,
  Table
} from 'lucide-react';

export default function AppMarketClearingPage() {
  const scenarioConfig = MARKET_CLEARING_SCENARIOS['peak-demand-pricing'];
  
  const {
    state,
    updateGenerators,
    updateDemandBids,
    resetState,
    generateShareUrl,
    shareToClipboard,
    downloadState
  } = useSimulationState({
    generators: scenarioConfig.data.generators,
    demandBids: scenarioConfig.data.demandBids,
    scenario: 'peak-demand-pricing'
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'data'>('overview');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isScenarioManagerOpen, setIsScenarioManagerOpen] = useState(false);
  const [marketResult, setMarketResult] = useState<MarketResult | null>(null);

  // Run market clearing when data changes
  React.useEffect(() => {
    const result = MarketClearingEngine.clearMarket(state.generators, state.demandBids);
    setMarketResult(result);
  }, [state.generators, state.demandBids]);

  const updateGenerator = (id: string, updates: Partial<Generator>) => {
    const newGenerators = state.generators.map(g => 
      g.id === id ? { ...g, ...updates } : g
    );
    updateGenerators(newGenerators);
  };

  const updateDemandBid = (id: string, updates: Partial<DemandBid>) => {
    const newDemandBids = state.demandBids.map(d => 
      d.id === id ? { ...d, ...updates } : d
    );
    updateDemandBids(newDemandBids);
  };

  const generateDemandCurve = () => {
    const sortedDemand = [...state.demandBids].sort((a, b) => b.maxPrice - a.maxPrice);
    const data = [];
    let cumulativeQuantity = 0;

    data.push({ quantity: 0, price: sortedDemand[0]?.maxPrice || 0 });
    
    for (const bid of sortedDemand) {
      data.push({ quantity: cumulativeQuantity, price: bid.maxPrice });
      cumulativeQuantity += bid.quantity;
      data.push({ quantity: cumulativeQuantity, price: bid.maxPrice });
    }

    data.push({ quantity: cumulativeQuantity + 500, price: 0 });
    return data;
  };

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: Eye },
    { id: 'analysis' as const, label: 'Analysis', icon: Calculator },
    { id: 'data' as const, label: 'Data Tables', icon: Table },
  ];

  return (
    <AppLayout
      title="Market Clearing Engine"
      subtitle="Interactive simulation for understanding electricity price formation"
      headerActions={
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" icon={ArrowLeft}>
            Back to Simulations
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            icon={FolderOpen}
            onClick={() => setIsScenarioManagerOpen(true)}
          >
            Scenarios
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            icon={Share}
            onClick={() => setIsShareOpen(true)}
          >
            Share
          </Button>
        </div>
      }
    >
      <div className="h-full flex flex-col">
        {/* Key Metrics - Always Visible */}
        {marketResult && (
          <div className="grid grid-cols-4 gap-4 mb-6">
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 mb-6 bg-slate-900 rounded-lg p-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-electric-500 text-dark-900'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
          
          <div className="flex-1" />
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              icon={RotateCcw}
              onClick={resetState}
            >
              Reset
            </Button>
            <Badge variant="neutral" size="sm">{state.scenario}</Badge>
            <Badge className="bg-green-900/50 text-green-300" size="sm">Running</Badge>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-2 gap-6 h-full">
              {/* Left Panel - Merit Order */}
              <div className="space-y-6">
                <FeatureCard className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-electric-400" />
                    Merit Order
                  </h3>
                  <MeritOrderWidget
                    generators={state.generators}
                    dispatchedGenerators={marketResult?.dispatchedGenerators}
                    showHighlight={true}
                    size="compact"
                  />
                </FeatureCard>

                {/* Quick Controls */}
                <FeatureCard className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" icon={Play}>
                      Run Market
                    </Button>
                    <Button variant="outline" size="sm" icon={Pause}>
                      Pause
                    </Button>
                    <Button variant="outline" size="sm" icon={BookOpen}>
                      Guide
                    </Button>
                    <Button variant="outline" size="sm" icon={Settings}>
                      Settings
                    </Button>
                  </div>
                </FeatureCard>
              </div>

              {/* Right Panel - Supply/Demand */}
              <div>
                <FeatureCard className="p-6 h-full">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-power-400" />
                    Supply & Demand
                  </h3>
                  <SupplyCurveWidget
                    generators={state.generators}
                    marketResult={marketResult}
                    showDemandCurve={true}
                    demandCurveData={generateDemandCurve()}
                    showHighlight={true}
                    size="full"
                  />
                </FeatureCard>
              </div>
            </div>
          )}

          {activeTab === 'analysis' && marketResult && (
            <div className="grid grid-cols-2 gap-6 h-full">
              {/* Economic Analysis */}
              <FeatureCard className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Economic Analysis</h3>
                <div className="space-y-4">
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

              {/* Dispatch Results */}
              <FeatureCard className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Dispatch Results</h3>
                <div className="overflow-y-auto max-h-96">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-2 px-3 text-white text-sm">Generator</th>
                        <th className="text-right py-2 px-3 text-white text-sm">Output (MW)</th>
                        <th className="text-right py-2 px-3 text-white text-sm">Revenue ($)</th>
                        <th className="text-right py-2 px-3 text-white text-sm">Profit ($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketResult.dispatchedGenerators.map(({ generator, output, revenue }) => (
                        <tr key={generator.id} className="border-b border-slate-800">
                          <td className="py-2 px-3 text-slate-200">{generator.name}</td>
                          <td className="py-2 px-3 text-right text-slate-200">{Math.round(output)}</td>
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
            </div>
          )}

          {activeTab === 'data' && (
            <div className="grid grid-cols-2 gap-6 h-full">
              {/* Generator Table */}
              <FeatureCard className="p-6 overflow-hidden">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-electric-400" />
                  Generator Fleet
                </h3>
                <div className="overflow-y-auto max-h-96">
                  <GeneratorTable 
                    generators={state.generators}
                    onUpdateGenerator={updateGenerator}
                    dispatchResults={marketResult?.dispatchedGenerators}
                    editable={true}
                  />
                </div>
              </FeatureCard>

              {/* Demand Table */}
              <FeatureCard className="p-6 overflow-hidden">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-power-400" />
                  Demand Bids
                </h3>
                <div className="overflow-y-auto max-h-96">
                  <DemandBidTable 
                    demandBids={state.demandBids}
                    onUpdateDemand={updateDemandBid}
                    clearingResults={marketResult?.clearedDemand}
                    editable={true}
                  />
                </div>
              </FeatureCard>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareSimulation
        state={state}
        onGenerateShareUrl={generateShareUrl}
        onShareToClipboard={shareToClipboard}
        onDownloadState={downloadState}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        simulationName="Market Clearing Engine"
      />

      {/* Scenario Manager */}
      <ScenarioManager
        currentState={state}
        onLoadScenario={(newState) => {
          updateGenerators(newState.generators);
          updateDemandBids(newState.demandBids);
        }}
        isOpen={isScenarioManagerOpen}
        onClose={() => setIsScenarioManagerOpen(false)}
        simulationType="market-clearing"
      />
    </AppLayout>
  );
}