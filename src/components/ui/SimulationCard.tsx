import React from 'react';
import Link from 'next/link';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { FeatureIcon } from './FeatureIcon';
import { Badge } from './Badge';
import { Button } from './Button';

interface SimulationCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  difficulty: string;
  duration: string;
  color: string;
  features: string[];
}

export function SimulationCard({
  id,
  title,
  description,
  icon,
  difficulty,
  duration,
  color,
  features
}: SimulationCardProps) {
  const getColorVariant = (colorClass: string) => {
    if (colorClass.includes('blue') || colorClass.includes('cyan')) return 'electric';
    if (colorClass.includes('green') || colorClass.includes('emerald')) return 'power';
    return 'mixed';
  };

  return (
    <FeatureCard variant="interactive" size="lg" className="overflow-hidden">
      <div className={`bg-gradient-to-r ${color} p-6`}>
        <div className="flex items-center justify-between">
          <FeatureIcon icon={icon} variant={getColorVariant(color)} size="md" />
          <Badge variant="neutral" size="sm">
            {difficulty}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3">
          {title}
        </h3>
        <p className="text-slate-300 mb-4 leading-relaxed">
          {description}
        </p>

        <div className="mb-6">
          <h4 className="font-semibold text-slate-200 mb-3">Key Features:</h4>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-electric-500 to-power-400 rounded-full"></div>
                <span className="text-sm text-slate-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-slate-400">
            Duration: {duration}
          </span>
        </div>

        <Link href={`/simulations/${id}`}>
          <Button variant="accent" className="w-full" icon={ArrowRight}>
            Launch Simulation
          </Button>
        </Link>
      </div>
    </FeatureCard>
  );
}