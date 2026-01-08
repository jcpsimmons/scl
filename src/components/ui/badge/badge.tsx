import type * as React from 'react';
import { cx } from '@/lib/utils';
import './badge.css';

export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'secondary-outline'
  | 'destructive-outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return <div className={cx('scl-badge', `scl-badge--${variant}`, className)} {...props} />;
}

export { Badge };
