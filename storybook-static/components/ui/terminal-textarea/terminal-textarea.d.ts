import * as React from 'react';
export type SyntaxLanguage = 'javascript' | 'typescript' | 'html' | 'css' | 'json' | 'markdown' | 'none';
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
    /** Enable Vim mode */
    vimMode?: boolean;
    /** Syntax highlighting language */
    language?: SyntaxLanguage;
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