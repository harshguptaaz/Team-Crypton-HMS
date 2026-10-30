import React from 'react';
import { Card } from './Card';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
  };
  subtitle?: string;
  icon: React.ReactNode;
  iconBg?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  subtitle,
  icon,
  iconBg = 'bg-primary-light text-primary',
  className,
}) => {
  return (
    <Card hoverEffect className={cn('relative overflow-hidden', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">{title}</p>
          <h3 className="mt-2 text-2xl lg:text-3xl font-extrabold text-navy tracking-tight">{value}</h3>
          
          {(change || subtitle) && (
            <div className="mt-2 flex items-center gap-2">
              {change && (
                <span
                  className={cn(
                    'inline-flex items-center text-xs font-semibold rounded-md px-1.5 py-0.5',
                    change.trend === 'up' && 'text-emerald-700 bg-emerald-50',
                    change.trend === 'down' && 'text-rose-700 bg-rose-50',
                    change.trend === 'neutral' && 'text-slate-700 bg-slate-50'
                  )}
                >
                  {change.trend === 'up' && <ArrowUpRight className="w-3.5 h-3.5 mr-0.5 inline" />}
                  {change.trend === 'down' && <ArrowDownRight className="w-3.5 h-3.5 mr-0.5 inline" />}
                  {change.value}
                </span>
              )}
              {subtitle && <span className="text-xs text-text-muted">{subtitle}</span>}
            </div>
          )}
        </div>

        <div className={cn('p-3 rounded-2xl shrink-0 shadow-sm', iconBg)}>
          {icon}
        </div>
      </div>
    </Card>
  );
};
