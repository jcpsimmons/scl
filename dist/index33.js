import { jsx as i } from "react/jsx-runtime";
import * as s from "react";
import { Root as e } from "./index56.js";
import { cva as l } from "./index46.js";
import { cn as m } from "./index2.js";
const f = l(
  "inline-flex items-center justify-center text-sm font-medium transition-colors hover:bg-terminal-green/20 hover:text-terminal-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-terminal-green data-[state=on]:text-black data-[state=off]:bg-black data-[state=off]:text-terminal-green data-[state=off]:border-2 data-[state=off]:border-terminal-green [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), d = s.forwardRef(({ className: t, variant: a, size: r, ...n }, o) => /* @__PURE__ */ i(
  e,
  {
    ref: o,
    className: m(f({ variant: a, size: r, className: t })),
    ...n
  }
));
d.displayName = e.displayName;
export {
  d as Toggle,
  f as toggleVariants
};
