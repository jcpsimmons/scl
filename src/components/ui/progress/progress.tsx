import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/lib/utils'

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  /** Progress value from 0 to 100 */
  value?: number
  /** Number of segments/blocks to display */
  segments?: number
  /** Show percentage text */
  showPercentage?: boolean
  /** Custom label text */
  label?: string
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value = 0,
      showPercentage = false,
      label,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full min-w-[200px]">
        {(label || showPercentage) && (
          <div className="flex justify-center items-center gap-2 mb-2 font-mono text-sm font-bold text-primary">
            {label && <span>{label}</span>}
            {showPercentage && <span>{Math.round(value)}%</span>}
          </div>
        )}
        <ProgressPrimitive.Root
          ref={ref}
          className={cn('relative h-6 w-full overflow-hidden bg-background border-2 border-primary', className)}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className="h-full bg-primary transition-all duration-200"
            style={{ width: `${value}%` }}
          />
        </ProgressPrimitive.Root>
      </div>
    )
  }
)
Progress.displayName = 'Progress'

export { Progress }
