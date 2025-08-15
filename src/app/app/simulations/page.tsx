import React from 'react';
import Link from 'next/link';
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
  Wind,
  Settings
} from 'lucide-react';
import { getSimulations, getCategories } from '@/sanity/lib/fetch';
import { getDifficultyColor, getStatusColor } from '@/sanity/lib/fetch';
import type { Simulation } from '@/sanity/lib/types';

// Icon mapping for simulations
const iconMap = {
  'BarChart3': BarChart3,
  'Zap': Zap,
  'TrendingUp': TrendingUp,
  'Activity': Activity,
  'Wind': Wind,
  'Settings': Settings,
} as const;

interface SimulationWithProgress extends Simulation {
  // Mock progress data - this would come from user progress tracking
  runs?: number;
  lastRun?: string;
}

function mockSimulationProgress(simulation: Simulation): SimulationWithProgress {
  // Mock data for demo - in real app this would come from user progress API
  const mockProgress = {
    'market-clearing': { runs: 47, lastRun: '2 days ago' },
    'economic-dispatch': { runs: 23, lastRun: '1 week ago' },
    'lmp-formation': { runs: 0, lastRun: undefined },
    'renewable-integration': { runs: 0, lastRun: undefined },
    'risk-analysis': { runs: 0, lastRun: undefined },
  };
  
  return {
    ...simulation,
    ...mockProgress[simulation.slug.current as keyof typeof mockProgress],
  };
}

export default async function AppSimulationsPage() {
  const [simulations, categories] = await Promise.all([
    getSimulations(),
    getCategories()
  ]);
  
  const simulationsWithProgress = simulations.map(mockSimulationProgress);
  const featuredSimulation = simulationsWithProgress.find(sim => sim.isFeatured);

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
          <button
            className="px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors bg-electric-600 text-white"
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              className="px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Featured Simulation */}
        {featuredSimulation && (
          <div className="bg-gradient-to-r from-electric-600 to-power-500 rounded-xl p-6 text-white">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="h-6 w-6" />
                <Badge variant="neutral" className="bg-white/20 text-white">Featured</Badge>
              </div>
              <h2 className="text-2xl font-bold mb-2">{featuredSimulation.title}</h2>
              <p className="text-electric-100 mb-4 text-lg">
                {featuredSimulation.description}
              </p>
              <div className="flex items-center gap-6 text-sm text-electric-100 mb-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {featuredSimulation.userCount.toLocaleString()} users
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-300" />
                  {featuredSimulation.rating} rating
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {featuredSimulation.estimatedDuration}
                </div>
              </div>
              <Link href={`/app/simulations/${featuredSimulation.slug.current}`}>
                <Button variant="secondary" size="lg" icon={Play}>
                  Launch Simulation
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Simulations Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {simulationsWithProgress.map((simulation) => {
            const IconComponent = iconMap[simulation.icon as keyof typeof iconMap] || BarChart3;
            const isLocked = simulation.status === 'locked';
            const isNew = simulation.status === 'new';
            
            return (
              <div
                key={simulation._id}
                className={`bg-slate-900 border border-slate-800 rounded-xl p-6 ${
                  isLocked ? 'opacity-60' : 'hover:border-slate-700'
                } transition-all`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${simulation.colorGradient} rounded-lg flex items-center justify-center`}>
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
                    Category: <span className="text-slate-300">{simulation.category.title}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-slate-200 mb-2">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {simulation.features.slice(0, 4).map((feature, index) => (
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
                    {simulation.estimatedDuration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {simulation.userCount.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400" />
                    {simulation.rating}
                  </div>
                </div>

                {/* User Progress */}
                {!isLocked && simulation.runs && simulation.runs > 0 && (
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
                      {simulation.prerequisites && simulation.prerequisites.length > 0 
                        ? `Requires: ${simulation.prerequisites[0].title}`
                        : 'Prerequisites required'
                      }
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400">
                      Ready to launch
                    </div>
                  )}
                  
                  {isLocked ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Lock}
                      disabled={true}
                    >
                      Locked
                    </Button>
                  ) : (
                    <Link href={`/app/simulations/${simulation.slug.current}`}>
                      <Button
                        variant="primary"
                        size="sm"
                        icon={Play}
                      >
                        Launch
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* No simulations message */}
        {simulationsWithProgress.length === 0 && (
          <div className="text-center py-12">
            <Play className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-300 mb-2">No simulations available</h3>
            <p className="text-slate-400">Check back soon for new simulations!</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}