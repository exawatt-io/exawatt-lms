import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MarketClearingSimulation } from '@/components/MarketClearingSimulation';

export default function MarketClearingPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/simulations"
          className="inline-flex items-center space-x-2 text-slate-300 hover:text-white mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Simulations</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Market Clearing Engine
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Explore how electricity markets determine prices through the intersection of supply and demand.
            Adjust market parameters and see real-time impacts on clearing prices and quantities.
          </p>
        </div>

        {/* Simulation */}
        <MarketClearingSimulation />

        {/* Educational Content */}
        <div className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-lg border border-electric-800/40 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Understanding Market Clearing
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                How It Works
              </h3>
              <p className="text-slate-300 mb-4">
                In electricity markets, generators submit supply offers (how much they're willing to produce at different prices)
                and load-serving entities submit demand bids (how much they're willing to consume at different prices).
              </p>
              <p className="text-slate-300">
                The market operator stacks these offers and bids to create supply and demand curves. The intersection
                point determines the market-clearing price and quantity.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Key Concepts
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li>• <strong>Marginal Price:</strong> All cleared generators receive the same market-clearing price</li>
                <li>• <strong>Economic Dispatch:</strong> Lowest-cost generators are dispatched first</li>
                <li>• <strong>Price Discovery:</strong> Market forces determine the equilibrium price</li>
                <li>• <strong>Market Efficiency:</strong> Maximizes economic surplus for all participants</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}