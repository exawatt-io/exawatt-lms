import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral' | 'simulation' | 'lesson';
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
    primary: 'bg-[var(--charcoal-900)]/50 text-[var(--charcoal-400)] border-[var(--charcoal-700)]/50',
    secondary: 'bg-[var(--emerald-900)]/50 text-[var(--emerald-400)] border-[var(--emerald-700)]/50',
    accent: 'bg-[var(--amber-900)]/50 text-[var(--amber-400)] border-[var(--amber-700)]/50',
    success: 'bg-[var(--emerald-900)]/50 text-[var(--emerald-400)] border-[var(--emerald-700)]/50',
    warning: 'bg-[var(--amber-900)]/50 text-[var(--amber-400)] border-[var(--amber-700)]/50',
    error: 'bg-red-900/50 text-red-400 border-red-700/50',
    neutral: 'bg-slate-800 text-slate-300 border-slate-600',
    simulation: 'bg-[var(--amber-900)]/50 text-[var(--amber-400)] border-[var(--amber-700)]/50',
    lesson: 'bg-[var(--charcoal-900)]/50 text-[var(--charcoal-400)] border-[var(--charcoal-700)]/50'
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