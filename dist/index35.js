const r = {
  // Terminal theme (default) - green on black CRT aesthetic
  light: {
    background: "0 0% 0%",
    // Black
    foreground: "120 100% 50%",
    // Terminal green (#00ff00)
    card: "0 0% 5%",
    // Slightly lighter black
    cardForeground: "120 100% 50%",
    popover: "0 0% 5%",
    popoverForeground: "120 100% 50%",
    primary: "60 100% 50%",
    // Yellow (#ffff00)
    primaryForeground: "0 0% 0%",
    secondary: "120 100% 25%",
    // Darker green
    secondaryForeground: "120 100% 50%",
    muted: "0 0% 10%",
    mutedForeground: "120 100% 35%",
    accent: "60 100% 50%",
    // Yellow
    accentForeground: "0 0% 0%",
    destructive: "0 100% 50%",
    // Red
    destructiveForeground: "0 0% 0%",
    border: "120 100% 25%",
    // Dark green border
    input: "0 0% 10%",
    ring: "120 100% 50%",
    chart1: "120 100% 50%",
    // Green
    chart2: "60 100% 50%",
    // Yellow
    chart3: "300 100% 50%",
    // Magenta
    chart4: "240 100% 50%",
    // Blue
    chart5: "30 100% 50%"
    // Orange
  },
  dark: {
    background: "0 0% 0%",
    foreground: "120 100% 50%",
    card: "0 0% 5%",
    cardForeground: "120 100% 50%",
    popover: "0 0% 5%",
    popoverForeground: "120 100% 50%",
    primary: "60 100% 50%",
    primaryForeground: "0 0% 0%",
    secondary: "120 100% 25%",
    secondaryForeground: "120 100% 50%",
    muted: "0 0% 10%",
    mutedForeground: "120 100% 35%",
    accent: "60 100% 50%",
    accentForeground: "0 0% 0%",
    destructive: "0 100% 50%",
    destructiveForeground: "0 0% 0%",
    border: "120 100% 25%",
    input: "0 0% 10%",
    ring: "120 100% 50%",
    chart1: "120 100% 50%",
    chart2: "60 100% 50%",
    chart3: "300 100% 50%",
    chart4: "240 100% 50%",
    chart5: "30 100% 50%"
  },
  // Extended palette from source application
  terminal: {
    green: "rgb(0 255 0)",
    blue: "rgb(0 0 255)",
    yellow: "rgb(255 255 0)",
    magenta: "rgb(255 0 255)",
    red: "rgb(255 0 0)",
    orange: "rgb(255 167 0)",
    deepblue: "rgb(0 0 152)",
    black: "rgb(0 0 0)"
  },
  // Sidebar specific colors (terminal themed)
  sidebar: {
    light: {
      background: "0 0% 0%",
      foreground: "120 100% 50%",
      primary: "60 100% 50%",
      primaryForeground: "0 0% 0%",
      accent: "120 100% 15%",
      accentForeground: "120 100% 50%",
      border: "120 100% 25%",
      ring: "120 100% 50%"
    },
    dark: {
      background: "0 0% 0%",
      foreground: "120 100% 50%",
      primary: "60 100% 50%",
      primaryForeground: "0 0% 0%",
      accent: "120 100% 15%",
      accentForeground: "120 100% 50%",
      border: "120 100% 25%",
      ring: "120 100% 50%"
    }
  }
};
export {
  r as colors
};
