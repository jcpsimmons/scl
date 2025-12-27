import { jsx as n } from "react/jsx-runtime";
import * as s from "react";
import { Root as d } from "./index67.js";
import { cva as b } from "./index54.js";
import { cn as c } from "./index2.js";
const p = b(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-30 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 active:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground border-2 border-secondary hover:bg-secondary/90 active:bg-secondary/80",
        outline: "bg-transparent text-primary border-2 border-primary hover:bg-primary/10 active:bg-primary/20",
        "secondary-outline": "bg-transparent text-secondary border-2 border-secondary hover:bg-secondary/10 active:bg-secondary/20",
        ghost: "bg-transparent text-primary border-2 border-transparent hover:border-primary/50 active:bg-primary/10",
        link: "bg-transparent text-primary underline-offset-4 hover:underline border-none",
        destructive: "bg-destructive text-destructive-foreground border-2 border-destructive hover:bg-destructive/90 active:bg-destructive/80",
        "destructive-outline": "bg-transparent text-destructive border-2 border-destructive hover:bg-destructive/10 active:bg-destructive/20"
      },
      size: {
        default: "h-11 px-6 py-3 text-sm",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-14 px-10 py-4 text-base",
        icon: "h-11 w-11"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), v = s.forwardRef(
  ({ className: r, variant: e, size: t, asChild: o = !1, ...i }, a) => /* @__PURE__ */ n(
    o ? d : "button",
    {
      className: c(p({ variant: e, size: t, className: r })),
      ref: a,
      ...i
    }
  )
);
v.displayName = "Button";
export {
  v as Button,
  p as buttonVariants
};
