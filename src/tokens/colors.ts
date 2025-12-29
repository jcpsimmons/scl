/**
 * Color tokens for the SCL component library.
 * Minimal, monochrome design with swappable primary/secondary colors.
 */

export const palette = {
  green: '120 100% 50%', // #00ff00
  hotpink: '300 100% 50%', // #ff00ff
  yellow: '60 100% 50%', // #ffff00
  blue: '240 100% 50%', // #0000ff
  cyan: '180 100% 50%', // #00ffff
  white: '0 0% 100%', // #ffffff
  amber: '45 100% 50%', // #ffbf00
  red: '0 100% 50%', // #ff0000
  black: '0 0% 0%', // #000000
} as const;

export const colors = {
  // Default semantic mappings
  primary: palette.green,
  primaryForeground: palette.black,
  secondary: palette.hotpink,
  secondaryForeground: palette.black,

  // Core UI
  background: palette.black,
  foreground: palette.green,
  border: palette.green,
  ring: palette.green,

  // Destructive (always red)
  destructive: palette.red,
  destructiveForeground: palette.black,

  // Muted
  muted: '0 0% 8%',
  mutedForeground: palette.green,
} as const;

export type Palette = typeof palette;
export type ColorTokens = typeof colors;
