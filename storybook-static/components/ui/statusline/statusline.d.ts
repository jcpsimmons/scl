import * as React from 'react';
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
declare const Statusline: React.ForwardRefExoticComponent<StatuslineProps & React.RefAttributes<HTMLDivElement>>;
export { Statusline };
//# sourceMappingURL=statusline.d.ts.map