import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: 'default' | 'highlight' | 'gradient';
}

export function Section({ className, children, variant = 'default', ...props }: SectionProps) {
  const variantStyles = {
    default: 'py-24',
    highlight: 'py-24 bg-dark-900/50 backdrop-blur-sm',
    gradient: 'py-24 bg-gradient-to-r from-electric-600/20 to-power-600/20 backdrop-blur-sm'
  };

  return (
    <section className={cn(variantStyles[variant], className)} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({ title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-16", className)}>
      <h2 className="text-3xl font-bold text-white mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}