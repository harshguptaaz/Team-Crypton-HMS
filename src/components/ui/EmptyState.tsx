import React from 'react';
import { cn } from '@/lib/utils';
import { FolderOpen } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-surface-border bg-surface-subtle/50',
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center text-primary mb-4 shadow-sm">
        {icon || <FolderOpen className="w-7 h-7" />}
      </div>
      <h4 className="text-base font-bold text-navy">{title}</h4>
      <p className="text-sm text-text-secondary max-w-sm mt-1 mb-5">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
