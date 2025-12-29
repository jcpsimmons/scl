import { jsx as n } from "react/jsx-runtime";
import * as s from "react";
import { Root as t } from "./index68.js";
import { cva as m } from "./index48.js";
import { cn as p } from "./index2.js";
const f = m(
  "inline-flex items-center justify-center text-sm font-medium transition-colors hover:bg-primary/20 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 border-2 border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=off]:bg-transparent data-[state=off]:text-primary [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2",
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
), d = s.forwardRef(({ className: e, variant: r, size: a, ...i }, o) => /* @__PURE__ */ n(
  t,
  {
    ref: o,
    className: p(f({ variant: r, size: a, className: e })),
    ...i
  }
));
d.displayName = t.displayName;
export {
  d as Toggle,
  f as toggleVariants
};
