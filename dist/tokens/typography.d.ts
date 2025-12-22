/**
 * Typography tokens for the component library.
 * Includes font families, sizes, weights, and line heights.
 */
export declare const typography: {
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
export type TypographyTokens = typeof typography;
//# sourceMappingURL=typography.d.ts.map