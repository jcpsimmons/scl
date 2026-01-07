import * as React from 'react';
import { cx } from '@/lib/utils';
import './skeleton.css';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  blink?: boolean;
}

function Skeleton({ className, blink = true, ...props }: SkeletonProps) {
  return (
    <div
      className={cx('scl-skeleton', blink && 'scl-skeleton--blink', className)}
      {...props}
    />
  );
}

export { Skeleton };
