import type * as React from 'react';
import { cx } from '@/lib/utils';
import './skeleton.css';

/** Props for the Skeleton loading placeholder. */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether to show the blink animation. */
  blink?: boolean;
}

/** A loading placeholder with terminal-style blink animation. */
function Skeleton({ className, blink = true, role = 'status', ...props }: SkeletonProps) {
  return (
    <div
      className={cx('scl-skeleton', blink && 'scl-skeleton--blink', className)}
      role={role}
      aria-busy="true"
      {...props}
    />
  );
}

export { Skeleton };
