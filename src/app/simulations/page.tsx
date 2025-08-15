import Link from "next/link";
import { BarChart3, Zap, TrendingUp, Settings, Play } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Button } from "@/components/ui/Button";
import { SimulationCard } from "@/components/ui/SimulationCard";

const simulations = [
  {
    id: "market-clearing",
    title: "Market Clearing Engine",
    description: "Simulate the intersection of supply and demand curves to determine market-clearing prices and quantities.",
    icon: BarChart3,
    difficulty: "Beginner",
    duration: "15-30 min",
    color: "from-blue-500 to-cyan-500",
    features: ["Supply/demand curves", "Price discovery", "Market equilibrium"]
  },
  {
    id: "dispatch-optimization",
    title: "Economic Dispatch",
    description: "Optimize power generation dispatch considering transmission constraints and generator characteristics.",
    icon: Zap,
    difficulty: "Intermediate",
    duration: "20-45 min",
    color: "from-green-500 to-emerald-500",
    features: ["Generator merit order", "Transmission limits", "Cost optimization"]
  },
  {
    id: "lmp-formation",
    title: "LMP Price Formation",
    description: "Understand how Locational Marginal Prices form with energy, congestion, and loss components.",
    icon: TrendingUp,
    difficulty: "Advanced",
    duration: "30-60 min",
    color: "from-purple-500 to-violet-500",
    features: ["Energy component", "Congestion pricing", "Loss factors"]
  }
];

export default function SimulationsPage() {
  return (
    <div className="min-h-screen">
      <Section>
        {/* Header */}
        <SectionHeader 
          title="Market Simulations"
          description="Gain hands-on experience with interactive simulations that model real electricity market operations. Learn by doing with our industry-standard tools."
        />

        {/* Featured Simulation */}
        <FeatureCard variant="highlight" size="lg" className="bg-gradient-to-r from-electric-600 to-power-500 text-white mb-16">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">
              Try Our Most Popular Simulation
            </h2>
            <p className="text-slate-200 mb-6 text-lg">
              Start with our Market Clearing Engine to understand how electricity prices are set through supply and demand dynamics.
            </p>
            <Link href="/simulations/market-clearing">
              <Button variant="secondary" size="lg" icon={Play}>
                Launch Simulation
              </Button>
            </Link>
          </div>
        </FeatureCard>

        {/* Simulation Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {simulations.map((simulation) => (
            <SimulationCard key={simulation.id} {...simulation} />
          ))}
        </div>

        {/* Learning Approach */}
        <FeatureCard size="lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              How Our Simulations Work
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Our simulations are designed to bridge the gap between theoretical knowledge and practical application
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <FeatureIcon icon={Settings} variant="electric" className="mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Interactive Parameters</h3>
              <p className="text-slate-300 text-sm">
                Adjust market conditions, generator parameters, and demand patterns in real-time
              </p>
            </div>

            <div className="text-center">
              <FeatureIcon icon={BarChart3} variant="power" className="mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Real-Time Results</h3>
              <p className="text-slate-300 text-sm">
                See immediate impacts of your changes with dynamic charts and visualizations
              </p>
            </div>

            <div className="text-center">
              <FeatureIcon icon={TrendingUp} variant="mixed" className="mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Learning Insights</h3>
              <p className="text-slate-300 text-sm">
                Get AI-powered explanations and insights about market behavior and outcomes
              </p>
            </div>
          </div>
        </FeatureCard>
      </Section>
    </div>
  );
}