import { SimulationLayout } from '@/components/simulations/SimulationLayout';
import { MarketClearingWidget } from '@/components/widgets/MarketClearingWidget';

export default function MarketClearingPage() {
  return (
    <SimulationLayout
      title="Market Clearing Engine"
      description="Explore how electricity markets determine prices through realistic supply and demand interactions. Choose different scenarios to understand price formation mechanisms."
    >
      {/* Widget-Based Simulation */}
      <MarketClearingWidget
        scenario="peak-demand-pricing"
        mode="sandbox"
        size="full"
        showComponents={['all']}
        editable={['generators', 'demand-bids']}
      />
    </SimulationLayout>
  );
}