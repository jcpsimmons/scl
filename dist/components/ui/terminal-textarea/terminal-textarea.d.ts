import * as React from 'react';
export interface TerminalTextareaProps {
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
    /** Placeholder text */
    placeholder?: string;
    /** Read-only mode */
    readOnly?: boolean;
    /** Additional CSS classes */
    className?: string;
}
declare const TerminalTextarea: React.ForwardRefExoticComponent<TerminalTextareaProps & React.RefAttributes<HTMLDivElement>>;
export { TerminalTextarea };
//# sourceMappingURL=terminal-textarea.d.ts.map