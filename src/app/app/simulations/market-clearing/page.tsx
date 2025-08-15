import React from 'react';
import { AppLayout } from '@/components/app/AppLayout';
import { MarketClearingWidget } from '@/components/widgets/MarketClearingWidget';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Settings, 
  RotateCcw, 
  Share, 
  BookOpen, 
  ArrowLeft,
  Play,
  Pause,
  BarChart3
} from 'lucide-react';

export default function AppMarketClearingPage() {
  return (
    <AppLayout
      title="Market Clearing Engine"
      subtitle="Interactive simulation for understanding electricity price formation"
      headerActions={
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" icon={ArrowLeft}>
            Back to Simulations
          </Button>
          <Button variant="outline" size="sm" icon={BookOpen}>
            Guide
          </Button>
          <Button variant="outline" size="sm" icon={Settings}>
            Settings
          </Button>
          <Button variant="outline" size="sm" icon={Share}>
            Share
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Simulation Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-electric-400" />
                <span className="font-medium text-white">Simulation Controls</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="neutral" size="sm">Peak Demand Scenario</Badge>
                <Badge className="bg-green-900/50 text-green-300" size="sm">Running</Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" icon={RotateCcw}>
                Reset
              </Button>
              <Button variant="outline" size="sm" icon={Pause}>
                Pause
              </Button>
              <Button variant="primary" size="sm" icon={Play}>
                Run Market
              </Button>
            </div>
          </div>
        </div>

        {/* Widget */}
        <MarketClearingWidget
          scenario="peak-demand-pricing"
          mode="sandbox"
          size="full"
          showComponents={['all']}
          editable={['generators', 'demand-bids']}
        />
      </div>
    </AppLayout>
  );
}