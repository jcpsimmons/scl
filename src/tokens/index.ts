/**
 * Design tokens for the @drj/ui component library.
 * Export all tokens and theme configuration.
 */

export * from './colors'
export * from './typography'
export * from './spacing'
export * from './animations'
export * from './shadows'

import { colors } from './colors'
import { typography } from './typography'
import { spacing, borderRadius } from './spacing'
import { animations } from './animations'
import { shadows } from './shadows'

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
} as const

export type Theme = typeof theme
