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
      segments = 20,
      showPercentage = false,
      label,
      ...props
    },
    ref
  ) => {
    // Calculate how many segments should be filled
    const filledSegments = Math.floor((value / 100) * segments)

    return (
      <div className="w-full">
        {(label || showPercentage) && (
          <div className="flex justify-between items-center mb-2 font-mono text-xs text-primary">
            {label && <span>{label}</span>}
            {showPercentage && <span>{Math.round(value)}%</span>}
          </div>
        )}
        <ProgressPrimitive.Root
          ref={ref}
          className={cn('relative h-6 w-full overflow-hidden bg-background border-2 border-primary', className)}
          {...props}
        >
          <div className="flex h-full gap-[2px] p-[2px]">
            {Array.from({ length: segments }).map((_, index) => {
              const isFilled = index < filledSegments
              return (
                <div
                  key={index}
                  className={cn(
                    'flex-1 transition-colors duration-200',
                    isFilled
                      ? 'bg-primary'
                      : 'bg-primary/10'
                  )}
                />
              )
            })}
          </div>
        </ProgressPrimitive.Root>
      </div>
    )
  }
)
Progress.displayName = 'Progress'

export { Progress }
