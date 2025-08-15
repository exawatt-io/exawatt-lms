import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'interactive' | 'highlight';
  size?: 'sm' | 'md' | 'lg';
}

export function FeatureCard({ 
  className, 
  children, 
  variant = 'default',
  size = 'md',
  ...props 
}: FeatureCardProps) {
  const baseStyles = 'rounded-xl shadow-lg border transition-all duration-200';
  
  const variantStyles = {
    default: 'bg-gradient-to-br from-slate-900 to-slate-800 border-electric-800/40',
    interactive: 'bg-gradient-to-br from-slate-900 to-slate-800 border-electric-800/40 hover:border-electric-600/60 hover:shadow-xl cursor-pointer',
    highlight: 'bg-gradient-to-br from-slate-800 to-slate-700 border-electric-700/50 hover:border-electric-500/70',
  };
  
  const sizeStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CourseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CourseCard({ className, children, ...props }: CourseCardProps) {
  return (
    <FeatureCard 
      variant="interactive" 
      size="lg" 
      className={cn("overflow-hidden", className)}
      {...props}
    >
      {children}
    </FeatureCard>
  );
}

interface LessonItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function LessonItem({ className, children, ...props }: LessonItemProps) {
  return (
    <FeatureCard 
      variant="highlight" 
      size="sm" 
      className={className}
      {...props}
    >
      {children}
    </FeatureCard>
  );
}