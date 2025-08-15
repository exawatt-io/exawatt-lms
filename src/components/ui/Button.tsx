import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

export function Button({ 
  className, 
  children, 
  variant = 'primary', 
  size = 'md',
  icon: IconComponent,
  iconPosition = 'right',
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 gap-2';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-electric-500 to-electric-600 text-white hover:shadow-lg hover:shadow-electric-500/25',
    secondary: 'bg-gradient-to-r from-electric-500 to-power-400 text-dark-900 hover:shadow-lg hover:shadow-electric-500/25',
    outline: 'border-2 border-power-400/50 text-power-400 hover:bg-power-400/10 hover:border-power-400',
    ghost: 'text-slate-300 hover:text-white hover:bg-slate-800'
  };
  
  const iconSize = size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';
  
  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {IconComponent && iconPosition === 'left' && (
        <IconComponent className={iconSize} />
      )}
      {children}
      {IconComponent && iconPosition === 'right' && (
        <IconComponent className={iconSize} />
      )}
    </button>
  );
}