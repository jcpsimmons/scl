/**
 * Animation tokens including keyframes and timing functions.
 * Extracted and extended from the source application.
 */
export declare const animations: {
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
export type AnimationTokens = typeof animations;
//# sourceMappingURL=animations.d.ts.map