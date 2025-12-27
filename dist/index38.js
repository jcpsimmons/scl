const e = {
  green: "120 100% 50%",
  // #00ff00
  hotpink: "300 100% 50%",
  // #ff00ff
  yellow: "60 100% 50%",
  // #ffff00
  blue: "240 100% 50%",
  // #0000ff
  cyan: "180 100% 50%",
  // #00ffff
  white: "0 0% 100%",
  // #ffffff
  amber: "45 100% 50%",
  // #ffbf00
  red: "0 100% 50%",
  // #ff0000
  black: "0 0% 0%"
  // #000000
}, r = {
  // Default semantic mappings
  primary: e.green,
  primaryForeground: e.black,
  secondary: e.hotpink,
  secondaryForeground: e.black,
  // Core UI
  background: e.black,
  foreground: e.green,
  border: e.green,
  ring: e.green,
  // Destructive (always red)
  destructive: e.red,
  destructiveForeground: e.black,
  // Muted
  muted: "0 0% 8%",
  mutedForeground: e.green
};
export {
  r as colors,
  e as palette
};
