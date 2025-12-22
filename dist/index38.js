const t = {
  keyframes: {
    "accordion-down": {
      from: { height: "0" },
      to: { height: "var(--radix-accordion-content-height)" }
    },
    "accordion-up": {
      from: { height: "var(--radix-accordion-content-height)" },
      to: { height: "0" }
    },
    "collapsible-down": {
      from: { height: "0" },
      to: { height: "var(--radix-collapsible-content-height)" }
    },
    "collapsible-up": {
      from: { height: "var(--radix-collapsible-content-height)" },
      to: { height: "0" }
    },
    "fade-in": {
      from: { opacity: "0" },
      to: { opacity: "1" }
    },
    "fade-out": {
      from: { opacity: "1" },
      to: { opacity: "0" }
    },
    "slide-in-from-top": {
      from: { transform: "translateY(-100%)" },
      to: { transform: "translateY(0)" }
    },
    "slide-in-from-bottom": {
      from: { transform: "translateY(100%)" },
      to: { transform: "translateY(0)" }
    },
    "slide-in-from-left": {
      from: { transform: "translateX(-100%)" },
      to: { transform: "translateX(0)" }
    },
    "slide-in-from-right": {
      from: { transform: "translateX(100%)" },
      to: { transform: "translateX(0)" }
    },
    "zoom-in": {
      from: { opacity: "0", transform: "scale(0.95)" },
      to: { opacity: "1", transform: "scale(1)" }
    },
    "zoom-out": {
      from: { opacity: "1", transform: "scale(1)" },
      to: { opacity: "0", transform: "scale(0.95)" }
    },
    spin: {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(360deg)" }
    },
    ping: {
      "75%, 100%": { transform: "scale(2)", opacity: "0" }
    },
    pulse: {
      "0%, 100%": { opacity: "1" },
      "50%": { opacity: "0.5" }
    },
    bounce: {
      "0%, 100%": {
        transform: "translateY(-25%)",
        animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)"
      },
      "50%": {
        transform: "translateY(0)",
        animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)"
      }
    },
    // Terminal-style animations from source app
    flash: {
      "0%, 100%": { opacity: "1" },
      "50%": { opacity: "0" }
    },
    marquee: {
      "0%": { transform: "translateX(100%)" },
      "100%": { transform: "translateX(-100%)" }
    }
  },
  durations: {
    fastest: "50ms",
    faster: "100ms",
    fast: "150ms",
    normal: "200ms",
    slow: "300ms",
    slower: "400ms",
    slowest: "500ms"
  },
  easings: {
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    // Custom easing from source app
    smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
  }
};
export {
  t as animations
};
