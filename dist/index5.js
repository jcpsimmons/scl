import { jsx as a } from "react/jsx-runtime";
import * as o from "react";
import { cva as i } from "./index46.js";
import { cn as s } from "./index2.js";
const n = i(
  "relative w-full px-4 py-3 text-sm font-medium [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-2 border-primary [&>svg]:text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground border-2 border-secondary [&>svg]:text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground border-2 border-destructive [&>svg]:text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), l = o.forwardRef(({ className: r, variant: e, ...t }, d) => /* @__PURE__ */ a(
  "div",
  {
    ref: d,
    role: "alert",
    className: s(n({ variant: e }), r),
    ...t
  }
));
l.displayName = "Alert";
const m = o.forwardRef(({ className: r, ...e }, t) => /* @__PURE__ */ a(
  "h5",
  {
    ref: t,
    className: s("mb-1 font-medium leading-none tracking-tight", r),
    ...e
  }
));
m.displayName = "AlertTitle";
const c = o.forwardRef(({ className: r, ...e }, t) => /* @__PURE__ */ a(
  "div",
  {
    ref: t,
    className: s("text-sm [&_p]:leading-relaxed", r),
    ...e
  }
));
c.displayName = "AlertDescription";
export {
  l as Alert,
  c as AlertDescription,
  m as AlertTitle
};
