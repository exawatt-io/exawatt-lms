import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Play, BarChart3, Zap, Users, ArrowRight } from 'lucide-react';
import { getFeaturedSimulations } from '@/sanity/lib/fetch';
import { getDifficultyColor } from '@/sanity/lib/fetch';

export default async function SimulationsMarketingPage() {
  const featuredSimulations = await getFeaturedSimulations();
  
  // If no featured simulations from Sanity, fall back to hardcoded examples
  const simulations = featuredSimulations.length > 0 ? featuredSimulations.map(sim => ({
    id: sim.slug.current,
    title: sim.title,
    description: sim.description,
    features: sim.features.slice(0, 4),
    difficulty: sim.difficulty,
    users: `${(sim.userCount / 1000).toFixed(1)}k+`
  })) : [
    {
      id: 'market-clearing',
      title: 'Market Clearing Simulation',
      description: 'Experience real-time electricity market operations with bid submission, demand forecasting, and price formation.',
      features: ['Real-time market data', 'Interactive bidding', 'LMP calculation', 'Grid visualization'],
      difficulty: 'Intermediate',
      users: '5,200+'
    },
    {
      id: 'grid-operations',
      title: 'Grid Operations Center',
      description: 'Manage grid stability, dispatch generation, and handle emergency scenarios in this comprehensive operations simulation.',
      features: ['Live grid monitoring', 'Emergency response', 'Load balancing', 'Contingency analysis'],
      difficulty: 'Advanced',
      users: '3,100+'
    },
    {
      id: 'trading-floor',
      title: 'Energy Trading Floor',
      description: 'Master energy trading strategies with portfolio management, risk assessment, and market analysis tools.',
      features: ['Portfolio tracking', 'Risk metrics', 'Market analysis', 'Strategy backtesting'],
      difficulty: 'Expert',
      users: '1,800+'
    }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Interactive{' '}
            <span className="bg-gradient-to-r from-electric-400 to-power-400 bg-clip-text text-transparent">
              Market Simulations
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Practice electricity market operations, grid management, and trading strategies in risk-free, realistic simulations.
          </p>
          <Link href="/app/simulations">
            <Button variant="primary" size="lg" icon={Play}>
              Launch Simulations
            </Button>
          </Link>
        </div>

        {/* Simulations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {simulations.map((simulation) => (
            <div key={simulation.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden hover:border-electric-500/50 transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-power-500/20 to-electric-500/20 flex items-center justify-center">
                <BarChart3 className="h-16 w-16 text-power-400" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(simulation.difficulty)}`}>
                    {simulation.difficulty}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Users className="h-3 w-3" />
                    {simulation.users}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">{simulation.title}</h3>
                <p className="text-slate-300 mb-4">{simulation.description}</p>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm font-medium text-slate-200">Key Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {simulation.features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-slate-700 text-slate-300 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Link href={`/app/simulations/${simulation.id}`}>
                  <Button variant="outline" size="sm" className="w-full" icon={Play}>
                    Try Simulation
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-gradient-to-br from-electric-500 to-electric-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Real-Time Data</h3>
            <p className="text-slate-300">Experience live market conditions with real electricity market data feeds.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-power-500 to-power-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Advanced Analytics</h3>
            <p className="text-slate-300">Deep insights with comprehensive analytics and performance metrics.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-electric-500 to-power-500 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Collaborative Learning</h3>
            <p className="text-slate-300">Compete and collaborate with professionals from around the world.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 py-16 border-t border-slate-700">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience the Market?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Start with our beginner-friendly simulations and progress to advanced trading scenarios.
          </p>
          <Link href="/app/simulations">
            <Button variant="primary" size="lg" icon={ArrowRight}>
              Start Simulating
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}