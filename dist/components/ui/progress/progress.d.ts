import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
export interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
    /** Progress value from 0 to 100 */
    value?: number;
    /** Number of segments/blocks to display */
    segments?: number;
    /** Enable color changing based on progress ranges (red/yellow/green) */
    colorRange?: boolean;
    /** Single color to use (default: 'yellow') */
    color?: 'red' | 'yellow' | 'green' | 'magenta' | 'blue';
    /** Show percentage text */
    showPercentage?: boolean;
    /** Custom label text */
    label?: string;
}
declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;
export { Progress };
//# sourceMappingURL=progress.d.ts.map