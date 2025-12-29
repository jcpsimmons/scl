/**
 * Design tokens for the @drj/ui component library.
 * Export all tokens and theme configuration.
 */

export * from './animations';
export * from './colors';
export * from './shadows';
export * from './spacing';
export * from './typography';

import { animations } from './animations';
import { colors } from './colors';
import { shadows } from './shadows';
import { borderRadius, spacing } from './spacing';
import { typography } from './typography';

/**
 * Complete theme configuration object.
 * Use this to access all design tokens programmatically.
 */
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  animations,
  shadows,
} as const;

export type Theme = typeof theme;
