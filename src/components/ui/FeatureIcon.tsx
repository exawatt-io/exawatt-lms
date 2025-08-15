import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureIconProps {
  icon: LucideIcon;
  variant?: 'electric' | 'power' | 'mixed';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function FeatureIcon({ 
  icon: IconComponent, 
  variant = 'electric', 
  size = 'md',
  className 
}: FeatureIconProps) {
  const sizeStyles = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const iconSizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8', 
    lg: 'h-10 w-10'
  };

  const gradients = {
    electric: 'from-electric-500 to-electric-600',
    power: 'from-power-500 to-power-600',
    mixed: 'from-electric-500 to-power-500'
  };

  return (
    <div className={cn(
      'rounded-lg flex items-center justify-center bg-gradient-to-br',
      sizeStyles[size],
      gradients[variant],
      className
    )}>
      <IconComponent className={cn(iconSizes[size], 'text-white')} />
    </div>
  );
}