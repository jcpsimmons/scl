import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/lib/utils'

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  /** Progress value from 0 to 100 */
  value?: number
  /** Number of segments/blocks to display */
  segments?: number
  /** Enable color changing based on progress ranges (red/yellow/green) */
  colorRange?: boolean
  /** Single color to use (default: 'yellow') */
  color?: 'red' | 'yellow' | 'green' | 'magenta' | 'blue'
  /** Show percentage text */
  showPercentage?: boolean
  /** Custom label text */
  label?: string
}

const colorClasses = {
  red: 'bg-terminal-red',
  yellow: 'bg-terminal-yellow',
  green: 'bg-terminal-green',
  magenta: 'bg-terminal-magenta',
  blue: 'bg-terminal-blue',
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
      colorRange = false,
      color = 'yellow',
      showPercentage = false,
      label,
      ...props
    },
    ref
  ) => {
    // Determine color based on value if colorRange is enabled
    const fillColor = React.useMemo(() => {
      if (!colorRange) return color

      if (value < 34) return 'red'
      if (value < 67) return 'yellow'
      return 'green'
    }, [value, colorRange, color])

    // Calculate how many segments should be filled
    const filledSegments = Math.floor((value / 100) * segments)

    return (
      <div className="w-full">
        {(label || showPercentage) && (
          <div className="flex justify-between items-center mb-2 font-mono text-xs text-terminal-green">
            {label && <span>{label}</span>}
            {showPercentage && <span>{Math.round(value)}%</span>}
          </div>
        )}
        <ProgressPrimitive.Root
          ref={ref}
          className={cn('relative h-6 w-full overflow-hidden bg-black border-2 border-terminal-green', className)}
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
                      ? colorClasses[fillColor]
                      : 'bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(0,255,0,0.1)_2px,rgba(0,255,0,0.1)_4px)]'
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
