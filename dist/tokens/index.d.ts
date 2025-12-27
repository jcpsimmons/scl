/**
 * Design tokens for the @drj/ui component library.
 * Export all tokens and theme configuration.
 */
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './animations';
export * from './shadows';
/**
 * Complete theme configuration object.
 * Use this to access all design tokens programmatically.
 */
export declare const theme: {
    readonly colors: {
        readonly primary: "120 100% 50%";
        readonly primaryForeground: "0 0% 0%";
        readonly secondary: "300 100% 50%";
        readonly secondaryForeground: "0 0% 0%";
        readonly background: "0 0% 0%";
        readonly foreground: "120 100% 50%";
        readonly border: "120 100% 50%";
        readonly ring: "120 100% 50%";
        readonly destructive: "0 100% 50%";
        readonly destructiveForeground: "0 0% 0%";
        readonly muted: "0 0% 8%";
        readonly mutedForeground: "120 100% 50%";
    };
    readonly typography: {
        readonly fontFamily: {
            readonly sans: readonly ["ui-sans-serif", "system-ui", "sans-serif", "\"Apple Color Emoji\"", "\"Segoe UI Emoji\"", "\"Segoe UI Symbol\"", "\"Noto Color Emoji\""];
            readonly mono: readonly ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "\"Liberation Mono\"", "\"Courier New\"", "monospace"];
        };
        readonly fontSize: {
            readonly xs: readonly ["0.75rem", {
                readonly lineHeight: "1rem";
            }];
            readonly sm: readonly ["0.875rem", {
                readonly lineHeight: "1.25rem";
            }];
            readonly base: readonly ["1rem", {
                readonly lineHeight: "1.5rem";
            }];
            readonly lg: readonly ["1.125rem", {
                readonly lineHeight: "1.75rem";
            }];
            readonly xl: readonly ["1.25rem", {
                readonly lineHeight: "1.75rem";
            }];
            readonly '2xl': readonly ["1.5rem", {
                readonly lineHeight: "2rem";
            }];
            readonly '3xl': readonly ["1.875rem", {
                readonly lineHeight: "2.25rem";
            }];
            readonly '4xl': readonly ["2.25rem", {
                readonly lineHeight: "2.5rem";
            }];
            readonly '5xl': readonly ["3rem", {
                readonly lineHeight: "1";
            }];
            readonly '6xl': readonly ["3.75rem", {
                readonly lineHeight: "1";
            }];
            readonly '7xl': readonly ["4.5rem", {
                readonly lineHeight: "1";
            }];
            readonly '8xl': readonly ["6rem", {
                readonly lineHeight: "1";
            }];
            readonly '9xl': readonly ["8rem", {
                readonly lineHeight: "1";
            }];
        };
        readonly fontWeight: {
            readonly thin: "100";
            readonly extralight: "200";
            readonly light: "300";
            readonly normal: "400";
            readonly medium: "500";
            readonly semibold: "600";
            readonly bold: "700";
            readonly extrabold: "800";
            readonly black: "900";
        };
        readonly letterSpacing: {
            readonly tighter: "-0.05em";
            readonly tight: "-0.025em";
            readonly normal: "0em";
            readonly wide: "0.025em";
            readonly wider: "0.05em";
            readonly widest: "0.1em";
        };
        readonly lineHeight: {
            readonly none: "1";
            readonly tight: "1.25";
            readonly snug: "1.375";
            readonly normal: "1.5";
            readonly relaxed: "1.625";
            readonly loose: "2";
        };
    };
    readonly spacing: {
        readonly px: "1px";
        readonly 0: "0px";
        readonly 0.5: "0.125rem";
        readonly 1: "0.25rem";
        readonly 1.5: "0.375rem";
        readonly 2: "0.5rem";
        readonly 2.5: "0.625rem";
        readonly 3: "0.75rem";
        readonly 3.5: "0.875rem";
        readonly 4: "1rem";
        readonly 5: "1.25rem";
        readonly 6: "1.5rem";
        readonly 7: "1.75rem";
        readonly 8: "2rem";
        readonly 9: "2.25rem";
        readonly 10: "2.5rem";
        readonly 11: "2.75rem";
        readonly 12: "3rem";
        readonly 14: "3.5rem";
        readonly 16: "4rem";
        readonly 20: "5rem";
        readonly 24: "6rem";
        readonly 28: "7rem";
        readonly 32: "8rem";
        readonly 36: "9rem";
        readonly 40: "10rem";
        readonly 44: "11rem";
        readonly 48: "12rem";
        readonly 52: "13rem";
        readonly 56: "14rem";
        readonly 60: "15rem";
        readonly 64: "16rem";
        readonly 72: "18rem";
        readonly 80: "20rem";
        readonly 96: "24rem";
    };
    readonly borderRadius: {
        readonly none: "0px";
        readonly sm: "calc(var(--radius) - 4px)";
        readonly md: "calc(var(--radius) - 2px)";
        readonly DEFAULT: "var(--radius)";
        readonly lg: "var(--radius)";
        readonly xl: "calc(var(--radius) + 4px)";
        readonly '2xl': "calc(var(--radius) + 8px)";
        readonly '3xl': "calc(var(--radius) + 16px)";
        readonly full: "9999px";
    };
    readonly animations: {
        readonly keyframes: {
            readonly 'accordion-down': {
                readonly from: {
                    readonly height: "0";
                };
                readonly to: {
                    readonly height: "var(--radix-accordion-content-height)";
                };
            };
            readonly 'accordion-up': {
                readonly from: {
                    readonly height: "var(--radix-accordion-content-height)";
                };
                readonly to: {
                    readonly height: "0";
                };
            };
            readonly 'collapsible-down': {
                readonly from: {
                    readonly height: "0";
                };
                readonly to: {
                    readonly height: "var(--radix-collapsible-content-height)";
                };
            };
            readonly 'collapsible-up': {
                readonly from: {
                    readonly height: "var(--radix-collapsible-content-height)";
                };
                readonly to: {
                    readonly height: "0";
                };
            };
            readonly 'fade-in': {
                readonly from: {
                    readonly opacity: "0";
                };
                readonly to: {
                    readonly opacity: "1";
                };
            };
            readonly 'fade-out': {
                readonly from: {
                    readonly opacity: "1";
                };
                readonly to: {
                    readonly opacity: "0";
                };
            };
            readonly 'slide-in-from-top': {
                readonly from: {
                    readonly transform: "translateY(-100%)";
                };
                readonly to: {
                    readonly transform: "translateY(0)";
                };
            };
            readonly 'slide-in-from-bottom': {
                readonly from: {
                    readonly transform: "translateY(100%)";
                };
                readonly to: {
                    readonly transform: "translateY(0)";
                };
            };
            readonly 'slide-in-from-left': {
                readonly from: {
                    readonly transform: "translateX(-100%)";
                };
                readonly to: {
                    readonly transform: "translateX(0)";
                };
            };
            readonly 'slide-in-from-right': {
                readonly from: {
                    readonly transform: "translateX(100%)";
                };
                readonly to: {
                    readonly transform: "translateX(0)";
                };
            };
            readonly 'zoom-in': {
                readonly from: {
                    readonly opacity: "0";
                    readonly transform: "scale(0.95)";
                };
                readonly to: {
                    readonly opacity: "1";
                    readonly transform: "scale(1)";
                };
            };
            readonly 'zoom-out': {
                readonly from: {
                    readonly opacity: "1";
                    readonly transform: "scale(1)";
                };
                readonly to: {
                    readonly opacity: "0";
                    readonly transform: "scale(0.95)";
                };
            };
            readonly spin: {
                readonly from: {
                    readonly transform: "rotate(0deg)";
                };
                readonly to: {
                    readonly transform: "rotate(360deg)";
                };
            };
            readonly ping: {
                readonly '75%, 100%': {
                    readonly transform: "scale(2)";
                    readonly opacity: "0";
                };
            };
            readonly pulse: {
                readonly '0%, 100%': {
                    readonly opacity: "1";
                };
                readonly '50%': {
                    readonly opacity: "0.5";
                };
            };
            readonly bounce: {
                readonly '0%, 100%': {
                    readonly transform: "translateY(-25%)";
                    readonly animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)";
                };
                readonly '50%': {
                    readonly transform: "translateY(0)";
                    readonly animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)";
                };
            };
            readonly flash: {
                readonly '0%, 100%': {
                    readonly opacity: "1";
                };
                readonly '50%': {
                    readonly opacity: "0";
                };
            };
            readonly marquee: {
                readonly '0%': {
                    readonly transform: "translateX(100%)";
                };
                readonly '100%': {
                    readonly transform: "translateX(-100%)";
                };
            };
        };
        readonly durations: {
            readonly fastest: "50ms";
            readonly faster: "100ms";
            readonly fast: "150ms";
            readonly normal: "200ms";
            readonly slow: "300ms";
            readonly slower: "400ms";
            readonly slowest: "500ms";
        };
        readonly easings: {
            readonly linear: "linear";
            readonly in: "cubic-bezier(0.4, 0, 1, 1)";
            readonly out: "cubic-bezier(0, 0, 0.2, 1)";
            readonly inOut: "cubic-bezier(0.4, 0, 0.2, 1)";
            readonly smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        };
    };
    readonly shadows: {
        readonly none: "none";
        readonly sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)";
        readonly DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)";
        readonly md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
        readonly lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
        readonly xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
        readonly '2xl': "0 25px 50px -12px rgb(0 0 0 / 0.25)";
        readonly inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)";
    };
};
export type Theme = typeof theme;
//# sourceMappingURL=index.d.ts.map