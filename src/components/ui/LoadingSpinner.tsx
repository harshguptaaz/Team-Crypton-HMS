import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  label = 'Loading MediCare ecosystem...',
  className,
}) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center p-8 gap-3 text-text-secondary', className)}>
      <Loader2 className={cn('animate-spin text-primary', sizeMap[size])} />
      {label && <p className="text-xs font-medium tracking-wide animate-pulse">{label}</p>}
    </div>
  );
};
