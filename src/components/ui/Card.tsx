import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glass?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = false, glass = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border border-surface-border bg-white p-6 shadow-soft transition-all duration-200',
          glass && 'bg-white/80 backdrop-blur-md border-white/60 shadow-glass',
          hoverEffect && 'hover:shadow-card hover:-translate-y-1 hover:border-primary/30',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
