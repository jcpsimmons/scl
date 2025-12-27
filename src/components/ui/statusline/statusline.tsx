import * as React from 'react'
import { cn } from '@/lib/utils'

export interface StatuslineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current mode (e.g., NORMAL, INSERT, VISUAL) */
  mode?: string
  /** Mode variant color: 'default' | 'insert' | 'visual' | 'command' */
  modeVariant?: 'default' | 'insert' | 'visual' | 'command'
  /** File path or buffer name */
  filename?: string
  /** File type indicator */
  filetype?: string
  /** File type abbreviation (e.g., 'TS' for TypeScript) */
  filetypeAbbr?: string
  /** Encoding (e.g., utf-8) */
  encoding?: string
  /** Current line number */
  line?: number
  /** Current column number */
  column?: number
  /** Total lines in document */
  totalLines?: number
  /** Percentage through file */
  percentage?: string | number
  /** Git branch name */
  branch?: string
  /** Git diff indicator (e.g., '+2' for additions) */
  diffStat?: string
  /** Whether file is modified */
  modified?: boolean
  /** Whether file is readonly */
  readonly?: boolean
  /** Custom left section content */
  leftContent?: React.ReactNode
  /** Custom center section content */
  centerContent?: React.ReactNode
  /** Custom right section content */
  rightContent?: React.ReactNode
}

const modeStyles = {
  default: 'bg-primary text-primary-foreground',
  insert: 'bg-secondary text-secondary-foreground',
  visual: 'bg-accent text-accent-foreground',
  command: 'bg-destructive text-destructive-foreground',
}

const Statusline = React.forwardRef<HTMLDivElement, StatuslineProps>(
  (
    {
      className,
      mode = 'NORMAL',
      modeVariant = 'default',
      filename,
      filetype,
      filetypeAbbr,
      encoding = 'utf-8',
      line,
      column,
      totalLines,
      percentage,
      branch,
      diffStat,
      modified = false,
      readonly = false,
      leftContent,
      centerContent,
      rightContent,
      ...props
    },
    ref
  ) => {
    // Calculate percentage if line and totalLines provided
    const displayPercentage = React.useMemo(() => {
      if (percentage !== undefined) return percentage
      if (line !== undefined && totalLines !== undefined && totalLines > 0) {
        if (line <= 1) return 'Top'
        if (line >= totalLines) return 'Bot'
        return `${Math.round((line / totalLines) * 100)}%`
      }
      return undefined
    }, [percentage, line, totalLines])

    return (
      <div
        ref={ref}
        className={cn(
          'flex h-6 w-full items-stretch font-mono text-sm bg-background text-primary',
          className
        )}
        {...props}
      >
        {/* Left section */}
        <div className="flex items-stretch">
          {/* Mode indicator */}
          <div
            className={cn(
              'flex items-center px-3 font-bold',
              modeStyles[modeVariant]
            )}
          >
            {mode}
          </div>

          {leftContent}

          {/* Branch */}
          {branch && (
            <div className="flex items-center px-2 text-primary">
              <span className="mr-1">⎇</span>
              {branch}
            </div>
          )}
        </div>

        {/* Center section - filename */}
        <div className="flex flex-1 items-center px-3 bg-muted mx-2">
          {centerContent || (
            <>
              {filename && (
                <span className="text-primary truncate">
                  {filename}
                  {modified && <span className="text-secondary ml-1">[+]</span>}
                  {readonly && <span className="text-destructive ml-1">[RO]</span>}
                </span>
              )}
            </>
          )}
        </div>

        {/* Right section */}
        <div className="flex items-stretch gap-2">
          {rightContent}

          {/* Percentage */}
          {displayPercentage !== undefined && (
            <div className="flex items-center px-3 text-primary">
              {displayPercentage}
            </div>
          )}

          {/* Position indicator */}
          {(line !== undefined || column !== undefined) && (
            <div className="flex items-center px-3 bg-primary text-primary-foreground font-bold">
              {line !== undefined && column !== undefined
                ? `${line}:${column}`
                : line !== undefined
                  ? `Ln ${line}`
                  : `Col ${column}`}
            </div>
          )}
        </div>
      </div>
    )
  }
)
Statusline.displayName = 'Statusline'

export { Statusline }
