'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-xs font-medium rounded-lg gap-1.5',
      md: 'px-4 py-2.5 text-sm font-medium rounded-xl gap-2',
      lg: 'px-6 py-3.5 text-base font-semibold rounded-2xl gap-2.5',
    };

    const variantClasses = {
      primary:
        'bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-150',
      secondary:
        'bg-primary-light text-primary hover:bg-blue-100 hover:text-primary-hover active:scale-[0.98] transition-all duration-150',
      outline:
        'border border-surface-border text-navy bg-white hover:bg-surface-subtle hover:border-primary/40 active:scale-[0.98] transition-all duration-150',
      ghost:
        'text-text-secondary hover:text-navy hover:bg-surface-subtle active:scale-[0.98] transition-all duration-150',
      danger:
        'bg-status-danger text-white hover:bg-red-600 shadow-sm active:scale-[0.98] transition-all duration-150',
      glow:
        'bg-gradient-to-r from-primary to-bright text-white shadow-glow hover:brightness-105 active:scale-[0.98] transition-all duration-150',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center select-none font-sans outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
