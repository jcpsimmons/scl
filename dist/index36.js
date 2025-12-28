import { jsx as n } from "react/jsx-runtime";
import * as s from "react";
import { Root as t } from "./index56.js";
import { cva as f } from "./index45.js";
import { cn as m } from "./index2.js";
const d = f(
  "inline-flex items-center justify-center text-sm font-medium transition-colors hover:bg-primary/20 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=off]:bg-background data-[state=off]:text-primary data-[state=off]:border-2 data-[state=off]:border-primary [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
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
), p = s.forwardRef(({ className: e, variant: a, size: r, ...o }, i) => /* @__PURE__ */ n(
  t,
  {
    ref: i,
    className: m(d({ variant: a, size: r, className: e })),
    ...o
  }
));
p.displayName = t.displayName;
export {
  p as Toggle,
  d as toggleVariants
};
