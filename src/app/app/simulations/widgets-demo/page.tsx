import React from 'react';
import { SimulationLayout } from '@/components/simulations/SimulationLayout';
import { MarketClearingWidget } from '@/components/widgets/MarketClearingWidget';
import { FeatureCard } from '@/components/ui/FeatureCard';

export default function WidgetsDemoPage() {
  return (
    <SimulationLayout
      title="Widget System Demo"
      description="Demonstration of the new embeddable simulation widget system with different scenarios and configurations."
    >
      <div className="space-y-12">
        {/* Introduction */}
        <FeatureCard>
          <h2 className="text-2xl font-semibold text-white mb-4">Embeddable Simulation Widgets</h2>
          <p className="text-slate-300 mb-4">
            These widgets are designed to be embedded in courses with specific learning objectives, constraints, and interaction modes. 
            Each widget can be configured for different educational contexts.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-slate-800/50 p-3 rounded-lg">
              <strong className="text-electric-400">Guided Mode:</strong> Step-by-step instructions with learning objectives
            </div>
            <div className="bg-slate-800/50 p-3 rounded-lg">
              <strong className="text-power-400">Interactive Mode:</strong> Free exploration with configurable constraints
            </div>
            <div className="bg-slate-800/50 p-3 rounded-lg">
              <strong className="text-green-400">Sandbox Mode:</strong> Full control for experimentation
            </div>
          </div>
        </FeatureCard>

        {/* Beginner Scenario - Merit Order */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">1. Beginner: Introduction to Merit Order (Guided)</h3>
          <p className="text-slate-300 mb-4">Perfect for a course lesson introducing the concept of merit order dispatch.</p>
          <MarketClearingWidget
            scenario="intro-merit-order"
            mode="guided"
            size="medium"
          />
        </div>

        {/* Intermediate Scenario - Supply & Demand */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">2. Intermediate: Supply & Demand Intersection (Interactive)</h3>
          <p className="text-slate-300 mb-4">Students can explore how demand changes affect market clearing prices.</p>
          <MarketClearingWidget
            scenario="supply-demand-intersection"
            mode="interactive"
            size="medium"
            editable={['demand-quantities']}
          />
        </div>

        {/* Compact Widget Example */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">3. Compact Widget (For Course Inline)</h3>
          <p className="text-slate-300 mb-4">Small widget that can be embedded directly in lesson content.</p>
          <div className="max-w-2xl">
            <MarketClearingWidget
              scenario="intro-merit-order"
              mode="demo"
              size="compact"
              showComponents={['merit-order', 'supply-curve']}
            />
          </div>
        </div>

        {/* Peak Demand Scenario */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">4. Advanced: Peak Demand Crisis (Sandbox)</h3>
          <p className="text-slate-300 mb-4">Full sandbox mode for exploring complex market dynamics during peak demand.</p>
          <MarketClearingWidget
            scenario="peak-demand-pricing"
            mode="sandbox"
            size="full"
            showComponents={['all']}
            editable={['generators', 'demand-bids']}
          />
        </div>

        {/* Renewable Integration */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">5. Renewable Energy Integration (Interactive)</h3>
          <p className="text-slate-300 mb-4">Focus on how renewable energy affects market clearing and prices.</p>
          <MarketClearingWidget
            scenario="renewable-integration"
            mode="interactive"
            size="medium"
            showComponents={['merit-order', 'supply-curve', 'dispatch-table']}
            locked={['fossil-generators']}
            editable={['renewable-availability']}
          />
        </div>

        {/* Course Integration Example */}
        <FeatureCard>
          <h3 className="text-xl font-semibold text-white mb-4">Course Integration Example</h3>
          <p className="text-slate-300 mb-4">
            Here's how these widgets would be embedded in actual course content:
          </p>
          
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <code className="text-sm text-slate-300">
              {`# Lesson 3: Understanding Merit Order

When electricity demand needs to be met, power system operators dispatch generators in order of increasing cost. This is called "merit order dispatch" and ensures the lowest-cost electricity production.

<MarketClearingWidget 
  scenario="intro-merit-order"
  mode="guided"
  size="medium"
/>

Now that you understand merit order, let's see what happens when demand increases:

<MarketClearingWidget 
  scenario="supply-demand-intersection"
  mode="interactive"
  editable={["demand-quantities"]}
  challenge="Increase residential demand to 800 MW and observe the price change"
/>`}
            </code>
          </div>
          
          <div className="mt-4 p-3 bg-electric-900/20 rounded-lg">
            <p className="text-sm text-slate-300">
              💡 <strong>Benefits:</strong> Students learn progressively, interact with realistic market data, and can be assessed on their understanding through widget interactions.
            </p>
          </div>
        </FeatureCard>
      </div>
    </SimulationLayout>
  );
}