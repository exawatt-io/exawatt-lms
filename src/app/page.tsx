import Link from 'next/link';
import { ArrowRight, BookOpen, Play, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FeatureCard } from '@/components/ui/FeatureCard';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Master the{' '}
            <span className="bg-gradient-to-r from-electric-400 to-power-400 bg-clip-text text-transparent">
              Electric Grid
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Learn electricity markets, grid operations, and trading strategies through interactive simulations and real-world scenarios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app/courses">
              <Button variant="primary" size="lg" icon={BookOpen}>
                Start Learning
              </Button>
            </Link>
            <Link href="/app/simulations">
              <Button variant="outline" size="lg" icon={Play}>
                Try Simulations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose ExaWatt?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Bridge the gap between theory and practice with our comprehensive learning platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard className="text-center">
              <div className="bg-gradient-to-br from-electric-500 to-electric-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Interactive Courses</h3>
              <p className="text-slate-300">
                Structured curriculum covering grid fundamentals through advanced trading strategies with real-world examples.
              </p>
            </FeatureCard>

            <FeatureCard className="text-center">
              <div className="bg-gradient-to-br from-power-500 to-power-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Play className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Market Simulations</h3>
              <p className="text-slate-300">
                Real-time market clearing, dispatch optimization, and LMP formation tools with live data integration.
              </p>
            </FeatureCard>

            <FeatureCard className="text-center">
              <div className="bg-gradient-to-br from-electric-500 to-power-500 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">AI-Powered Learning</h3>
              <p className="text-slate-300">
                Personalized tutoring, adaptive assessments, and intelligent scenario generation tailored to your progress.
              </p>
            </FeatureCard>
          </div>
        </div>
      </section>
    </div>
  );
}