import React from 'react';
import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  status: 'online' | 'busy' | 'offline' | 'critical' | 'warning' | 'normal';
  label?: string;
  pulse?: boolean;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  pulse = true,
  className,
}) => {
  const colorMap = {
    online: 'bg-emerald-500',
    normal: 'bg-emerald-500',
    busy: 'bg-amber-500',
    warning: 'bg-amber-500',
    offline: 'bg-slate-400',
    critical: 'bg-rose-500',
  };

  const pingColorMap = {
    online: 'bg-emerald-400',
    normal: 'bg-emerald-400',
    busy: 'bg-amber-400',
    warning: 'bg-amber-400',
    offline: 'bg-slate-300',
    critical: 'bg-rose-400',
  };

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <span className="relative flex h-2.5 w-2.5">
        {pulse && (
          <span
            className={cn(
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
              pingColorMap[status]
            )}
          />
        )}
        <span className={cn('relative inline-flex rounded-full h-2.5 w-2.5', colorMap[status])} />
      </span>
      {label && <span className="text-xs font-medium text-text-primary capitalize">{label}</span>}
    </div>
  );
};
