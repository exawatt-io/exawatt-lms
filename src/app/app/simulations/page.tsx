import React from 'react';
import { AppLayout } from '@/components/app/AppLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Play, 
  Clock, 
  Users, 
  BarChart3, 
  CheckCircle,
  Lock,
  Star,
  Filter,
  Search,
  ArrowRight,
  Zap,
  TrendingUp,
  Activity,
  Wind
} from 'lucide-react';

export default function AppSimulationsPage() {
  const simulations = [
    {
      id: 'market-clearing',
      title: 'Market Clearing Engine',
      description: 'Simulate the intersection of supply and demand curves to determine market-clearing prices and quantities.',
      category: 'Market Operations',
      difficulty: 'Beginner',
      duration: '15-30 min',
      users: 2100,
      rating: 4.9,
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      status: 'available',
      runs: 47,
      lastRun: '2 days ago',
      features: ['Supply/demand curves', 'Price discovery', 'Market equilibrium', 'Merit order dispatch'],
      tags: ['pricing', 'market', 'equilibrium']
    },
    {
      id: 'economic-dispatch',
      title: 'Economic Dispatch',
      description: 'Optimize power generation dispatch considering transmission constraints and generator characteristics.',
      category: 'Grid Operations',
      difficulty: 'Intermediate',
      duration: '20-45 min',
      users: 1800,
      rating: 4.8,
      icon: Zap,
      color: 'from-green-500 to-emerald-500',
      status: 'available',
      runs: 23,
      lastRun: '1 week ago',
      features: ['Generator merit order', 'Transmission limits', 'Cost optimization', 'Load flow analysis'],
      tags: ['dispatch', 'optimization', 'grid']
    },
    {
      id: 'lmp-formation',
      title: 'LMP Price Formation',
      description: 'Understand how Locational Marginal Prices form with energy, congestion, and loss components.',
      category: 'Advanced Markets',
      difficulty: 'Advanced',
      duration: '30-60 min',
      users: 950,
      rating: 4.7,
      icon: TrendingUp,
      color: 'from-purple-500 to-violet-500',
      status: 'locked',
      prerequisite: 'Market Clearing Engine',
      features: ['Energy component', 'Congestion pricing', 'Loss factors', 'Nodal pricing'],
      tags: ['lmp', 'congestion', 'losses']
    },
    {
      id: 'renewable-integration',
      title: 'Renewable Integration',
      description: 'Explore how variable renewable energy sources affect grid stability and market operations.',
      category: 'Renewable Energy',
      difficulty: 'Intermediate',
      duration: '25-40 min',
      users: 1200,
      rating: 4.6,
      icon: Wind,
      color: 'from-green-400 to-blue-500',
      status: 'new',
      runs: 0,
      features: ['Variable generation', 'Forecasting', 'Storage integration', 'Grid flexibility'],
      tags: ['renewable', 'variability', 'storage']
    },
    {
      id: 'risk-analysis',
      title: 'Portfolio Risk Analysis',
      description: 'Analyze financial risks in power trading portfolios using Monte Carlo simulations.',
      category: 'Risk Management',
      difficulty: 'Advanced',
      duration: '40-60 min',
      users: 650,
      rating: 4.8,
      icon: Activity,
      color: 'from-red-500 to-pink-500',
      status: 'locked',
      prerequisite: 'Risk Management Course',
      features: ['Monte Carlo', 'VaR calculations', 'Correlation analysis', 'Stress testing'],
      tags: ['risk', 'portfolio', 'finance']
    }
  ];

  const categories = ['All', 'Market Operations', 'Grid Operations', 'Advanced Markets', 'Renewable Energy', 'Risk Management'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-900/50 text-green-300';
      case 'Intermediate': return 'bg-yellow-900/50 text-yellow-300';
      case 'Advanced': return 'bg-red-900/50 text-red-300';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-electric-600 text-white';
      case 'available': return 'bg-green-900/50 text-green-300';
      case 'locked': return 'bg-slate-700 text-slate-400';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  return (
    <AppLayout
      title="Simulations"
      subtitle="Interactive market simulations for hands-on learning"
      headerActions={
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" icon={Filter}>
            Filter
          </Button>
          <Button variant="outline" size="sm" icon={Search}>
            Search
          </Button>
          <Button variant="primary" size="sm" icon={Play}>
            Quick Start
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                category === 'All'
                  ? 'bg-electric-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Simulation */}
        <div className="bg-gradient-to-r from-electric-600 to-power-500 rounded-xl p-6 text-white">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="h-6 w-6" />
              <Badge variant="neutral" className="bg-white/20 text-white">Featured</Badge>
            </div>
            <h2 className="text-2xl font-bold mb-2">Market Clearing Engine</h2>
            <p className="text-electric-100 mb-4 text-lg">
              Start with our most popular simulation to understand how electricity prices are set through supply and demand dynamics.
            </p>
            <div className="flex items-center gap-6 text-sm text-electric-100 mb-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                2,100 users
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-300" />
                4.9 rating
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                15-30 min
              </div>
            </div>
            <Button variant="secondary" size="lg" icon={Play}>
              Launch Simulation
            </Button>
          </div>
        </div>

        {/* Simulations Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {simulations.map((simulation) => {
            const IconComponent = simulation.icon;
            const isLocked = simulation.status === 'locked';
            const isNew = simulation.status === 'new';
            
            return (
              <div
                key={simulation.id}
                className={`bg-slate-900 border border-slate-800 rounded-xl p-6 ${
                  isLocked ? 'opacity-60' : 'hover:border-slate-700'
                } transition-all`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${simulation.color} rounded-lg flex items-center justify-center`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {isNew && <Badge className={getStatusColor(simulation.status)}>New</Badge>}
                    <Badge className={getDifficultyColor(simulation.difficulty)}>
                      {simulation.difficulty}
                    </Badge>
                    {isLocked && <Lock className="h-4 w-4 text-slate-400" />}
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">{simulation.title}</h3>
                  <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                    {simulation.description}
                  </p>
                  
                  <div className="text-xs text-slate-400 mb-3">
                    Category: <span className="text-slate-300">{simulation.category}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-slate-200 mb-2">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {simulation.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-1 text-xs text-slate-400">
                        <div className="w-1 h-1 bg-electric-500 rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {simulation.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {simulation.users.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400" />
                    {simulation.rating}
                  </div>
                </div>

                {/* User Progress */}
                {!isLocked && simulation.runs > 0 && (
                  <div className="mb-4 p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Your Progress</span>
                      <span className="text-slate-300">{simulation.runs} runs</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Last run: {simulation.lastRun}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {simulation.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  {isLocked ? (
                    <div className="text-xs text-slate-400">
                      Requires: {simulation.prerequisite}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400">
                      Ready to launch
                    </div>
                  )}
                  
                  <Button
                    variant={isLocked ? "ghost" : "primary"}
                    size="sm"
                    icon={isLocked ? Lock : Play}
                    disabled={isLocked}
                  >
                    {isLocked ? 'Locked' : 'Launch'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}