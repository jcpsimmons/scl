import * as React from 'react';
import { cn } from '@/lib/utils';

export interface StatuslineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current mode (e.g., NORMAL, INSERT, VISUAL) */
  mode?: string;
  /** Mode variant color: 'default' | 'insert' | 'visual' | 'command' */
  modeVariant?: 'default' | 'insert' | 'visual' | 'command';
  /** File path or buffer name */
  filename?: string;
  /** File type indicator */
  filetype?: string;
  /** File type abbreviation (e.g., 'TS' for TypeScript) */
  filetypeAbbr?: string;
  /** Encoding (e.g., utf-8) */
  encoding?: string;
  /** Current line number */
  line?: number;
  /** Current column number */
  column?: number;
  /** Total lines in document */
  totalLines?: number;
  /** Percentage through file */
  percentage?: string | number;
  /** Git branch name */
  branch?: string;
  /** Git diff indicator (e.g., '+2' for additions) */
  diffStat?: string;
  /** Whether file is modified */
  modified?: boolean;
  /** Whether file is readonly */
  readonly?: boolean;
  /** Custom left section content */
  leftContent?: React.ReactNode;
  /** Custom center section content */
  centerContent?: React.ReactNode;
  /** Custom right section content */
  rightContent?: React.ReactNode;
}

// Powerline-style vim mode colors
const modeConfig = {
  default: {
    bg: 'bg-blue-600',
    fg: 'text-yellow-300',
    label: 'NORMAL',
  },
  insert: {
    bg: 'bg-green-600',
    fg: 'text-black',
    label: 'INSERT',
  },
  visual: {
    bg: 'bg-fuchsia-500',
    fg: 'text-black',
    label: 'VISUAL',
  },
  command: {
    bg: 'bg-red-600',
    fg: 'text-white',
    label: 'COMMAND',
  },
};

// Powerline arrow separator
const PowerlineArrow = ({
  direction = 'right',
  fromBg,
  toBg,
}: {
  direction?: 'right' | 'left';
  fromBg: string;
  toBg: string;
}) => {
  if (direction === 'right') {
    return (
      <span
        className={cn('inline-flex items-center', toBg)}
        style={{ fontSize: '1.5rem', lineHeight: 1 }}
      >
        <span className={fromBg.replace('bg-', 'text-')}></span>
      </span>
    );
  }
  return (
    <span
      className={cn('inline-flex items-center', fromBg)}
      style={{ fontSize: '1.5rem', lineHeight: 1 }}
    >
      <span className={toBg.replace('bg-', 'text-')}></span>
    </span>
  );
};

const Statusline = React.forwardRef<HTMLDivElement, StatuslineProps>(
  (
    {
      className,
      mode,
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
    const modeStyle = modeConfig[modeVariant];
    const displayMode = mode || modeStyle.label;

    // Calculate percentage if line and totalLines provided
    const displayPercentage = React.useMemo(() => {
      if (percentage !== undefined) return percentage;
      if (line !== undefined && totalLines !== undefined && totalLines > 0) {
        if (line <= 1) return 'Top';
        if (line >= totalLines) return 'Bot';
        return `${Math.round((line / totalLines) * 100)}%`;
      }
      return undefined;
    }, [percentage, line, totalLines]);

    return (
      <div
        ref={ref}
        className={cn('flex h-6 w-full items-stretch font-mono text-sm', className)}
        {...props}
      >
        {/* Left section */}
        <div className="flex items-stretch">
          {/* Mode indicator with powerline arrow */}
          <div className={cn('flex items-center px-2 font-bold', modeStyle.bg, modeStyle.fg)}>
            {displayMode}
          </div>
          <PowerlineArrow fromBg={modeStyle.bg} toBg="bg-muted" />

          {leftContent}

          {/* Branch */}
          {branch && (
            <div className="flex items-center px-2 bg-muted text-yellow-400">
              <span className="mr-1"></span>
              {branch}
            </div>
          )}
        </div>

        {/* Center section - filename */}
        <div className="flex flex-1 items-center px-3 bg-muted">
          {centerContent || (
            <>
              <span className="mr-1 text-muted-foreground"></span>
              {filename && (
                <span className="text-primary truncate">
                  {filename}
                  {modified && <span className="text-yellow-400 ml-1">[+]</span>}
                  {readonly && <span className="text-red-500 ml-1">[RO]</span>}
                </span>
              )}
            </>
          )}
        </div>

        {/* Right section */}
        <div className="flex items-stretch">
          {rightContent}

          {/* Filetype */}
          {(filetype || filetypeAbbr) && (
            <div className="flex items-center px-2 bg-muted text-cyan-400">
              <span className="mr-1"></span>
              {filetypeAbbr || filetype}
            </div>
          )}

          {/* Encoding */}
          <div className="flex items-center px-2 bg-muted text-muted-foreground">{encoding}</div>

          <PowerlineArrow direction="left" fromBg={modeStyle.bg} toBg="bg-muted" />

          {/* Percentage */}
          {displayPercentage !== undefined && (
            <div className={cn('flex items-center px-2 font-bold', modeStyle.bg, modeStyle.fg)}>
              {displayPercentage}
            </div>
          )}

          {/* Position indicator */}
          {(line !== undefined || column !== undefined) && (
            <div className={cn('flex items-center px-2 font-bold', modeStyle.bg, modeStyle.fg)}>
              {line !== undefined && column !== undefined
                ? `${line}:${column}`
                : line !== undefined
                  ? `Ln ${line}`
                  : `Col ${column}`}
            </div>
          )}
        </div>
      </div>
    );
  }
);
Statusline.displayName = 'Statusline';

export { Statusline };
