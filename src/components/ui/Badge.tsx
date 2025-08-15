import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'electric' | 'power' | 'neutral' | 'simulation' | 'lesson';
  size?: 'sm' | 'md';
}

export function Badge({ 
  className, 
  children, 
  variant = 'neutral', 
  size = 'sm',
  ...props 
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full border';
  
  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm'
  };
  
  const variantStyles = {
    electric: 'bg-electric-900/50 text-electric-400 border-electric-700/50',
    power: 'bg-power-900/50 text-power-400 border-power-700/50',
    neutral: 'bg-slate-800 text-slate-300 border-slate-600',
    simulation: 'bg-power-900/50 text-power-400 border-power-700/50',
    lesson: 'bg-electric-900/50 text-electric-400 border-electric-700/50'
  };
  
  return (
    <span
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}