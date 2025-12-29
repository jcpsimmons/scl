import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TerminalTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  /** Number of visible lines (rows) */
  visibleLines?: number;
  /** Show line numbers */
  showLineNumbers?: boolean;
  /** Value of the textarea */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Callback when cursor position changes */
  onCursorChange?: (line: number, column: number) => void;
}

const TerminalTextarea = React.forwardRef<HTMLDivElement, TerminalTextareaProps>(
  (
    {
      className,
      visibleLines = 10,
      showLineNumbers = true,
      value = '',
      onChange,
      onCursorChange,
      placeholder,
      readOnly = false,
      ...textareaProps
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const lineNumbersRef = React.useRef<HTMLDivElement>(null);

    const lines = value.split('\n');
    const lineCount = lines.length;

    // Sync scroll between textarea and line numbers
    const handleScroll = () => {
      if (textareaRef.current && lineNumbersRef.current) {
        lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
      }
    };

    // Handle cursor position changes
    const handleSelect = () => {
      if (textareaRef.current && onCursorChange) {
        const textarea = textareaRef.current;
        const textBeforeCursor = textarea.value.substring(0, textarea.selectionStart);
        const linesBeforeCursor = textBeforeCursor.split('\n');
        const line = linesBeforeCursor.length;
        const column = linesBeforeCursor[linesBeforeCursor.length - 1].length + 1;
        onCursorChange(line, column);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e.target.value);
    };

    const lineHeight = 1.5; // rem
    const height = visibleLines * lineHeight;

    return (
      <div
        ref={ref}
        className={cn(
          'flex font-mono text-sm bg-black border-2 border-primary overflow-hidden',
          className
        )}
        style={{ height: `${height}rem` }}
      >
        {showLineNumbers && (
          <div
            ref={lineNumbersRef}
            className="flex-shrink-0 overflow-hidden select-none bg-black border-r border-primary text-yellow-400 text-right"
            style={{ width: '3rem' }}
          >
            {Array.from({ length: Math.max(lineCount, visibleLines) }, (_, i) => (
              <div
                key={i}
                className={cn('px-2 leading-6', i >= lineCount && 'text-blue-500')}
                style={{ height: `${lineHeight}rem` }}
              >
                {i < lineCount ? i + 1 : '~'}
              </div>
            ))}
          </div>
        )}
        <textarea
          {...textareaProps}
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onScroll={handleScroll}
          onSelect={handleSelect}
          onKeyUp={handleSelect}
          onClick={handleSelect}
          placeholder={placeholder}
          readOnly={readOnly}
          spellCheck={false}
          className={cn(
            'flex-1 bg-black text-primary resize-none outline-none p-2 leading-6',
            'placeholder:text-primary/50',
            readOnly && 'cursor-default'
          )}
          style={{
            lineHeight: `${lineHeight}rem`,
            fontFamily: 'inherit',
          }}
        />
      </div>
    );
  }
);
TerminalTextarea.displayName = 'TerminalTextarea';

export { TerminalTextarea };
