import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';
import { cx } from '@/lib/utils';
import './progress.css';

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  showPercentage?: boolean;
  label?: string;
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value = 0, showPercentage = false, label, ...props }, ref) => {
    return (
      <div className="scl-progress-wrapper">
        {(label || showPercentage) && (
          <div className="scl-progress-label">
            {label && <span>{label}</span>}
            {showPercentage && <span>{Math.round(value)}%</span>}
          </div>
        )}
        <ProgressPrimitive.Root
          ref={ref}
          className={cx('scl-progress', className)}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className="scl-progress__indicator"
            style={{ width: `${value}%` }}
          />
        </ProgressPrimitive.Root>
      </div>
    );
  }
);
Progress.displayName = 'Progress';

export { Progress };
