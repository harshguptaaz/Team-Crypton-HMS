'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-text-primary mb-1.5">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-text-muted pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full rounded-xl border border-surface-border bg-white px-4 py-2.5 text-sm text-navy placeholder:text-text-muted transition-all duration-150 outline-none',
              'focus:border-primary focus:ring-2 focus:ring-primary/20',
              'disabled:bg-slate-50 disabled:text-text-muted disabled:cursor-not-allowed',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-status-danger focus:border-status-danger focus:ring-status-danger/20',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-text-muted pointer-events-none flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-status-danger font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
