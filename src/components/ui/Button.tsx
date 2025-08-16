import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
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
    primary: 'bg-gradient-primary hover:shadow-glow-primary active:scale-95 text-[var(--color-primary-foreground)] transition-all duration-200',
    secondary: 'bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] hover:shadow-glow-success active:scale-95 text-[var(--color-secondary-foreground)] transition-all duration-200',
    accent: 'bg-gradient-accent hover:shadow-glow-accent active:scale-95 text-[var(--color-accent-foreground)] transition-all duration-200',
    outline: 'border-2 border-[var(--color-accent)]/50 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 hover:border-[var(--color-accent)] hover:shadow-glow-accent',
    ghost: 'text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200'
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