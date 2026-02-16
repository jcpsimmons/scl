import type * as React from 'react';
import { cx } from '@/lib/utils';
import './badge.css';

/** Available badge visual variants. */
export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'secondary-outline'
  | 'destructive-outline';

/** Props for the Badge component. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual style variant. */
  variant?: BadgeVariant;
}

/** An inline badge/label for status indicators, counts, or tags. */
function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return <span className={cx('scl-badge', `scl-badge--${variant}`, className)} {...props} />;
}

export { Badge };
