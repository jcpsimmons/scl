import { ClassValue } from 'clsx';
/**
 * Combines class names with Tailwind CSS merge support.
 * This utility merges Tailwind classes intelligently, avoiding conflicts.
 *
 * @param inputs - Class values to combine
 * @returns Merged class string
 *
 * @example
 * cn('px-4 py-2', 'px-6') // Returns 'py-2 px-6'
 * cn('text-red-500', condition && 'text-blue-500')
 */
export declare function cn(...inputs: ClassValue[]): string;
//# sourceMappingURL=utils.d.ts.map