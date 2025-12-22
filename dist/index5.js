import { jsx as a } from "react/jsx-runtime";
import * as l from "react";
import { cva as i } from "./index46.js";
import { cn as f } from "./index2.js";
const o = i(
  "relative w-full px-4 py-3 text-sm font-medium [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-[#00ff00] text-black border-2 border-[#00ff00] [&>svg]:text-black",
        warning: "bg-[#ffff00] text-black border-2 border-[#ffff00] [&>svg]:text-black",
        destructive: "bg-[#ff0000] text-black border-2 border-[#ff0000] [&>svg]:text-black"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), d = l.forwardRef(({ className: t, variant: e, ...r }, s) => /* @__PURE__ */ a(
  "div",
  {
    ref: s,
    role: "alert",
    className: f(o({ variant: e }), t),
    ...r
  }
));
d.displayName = "Alert";
const n = l.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  "h5",
  {
    ref: r,
    className: f("mb-1 font-medium leading-none tracking-tight", t),
    ...e
  }
));
n.displayName = "AlertTitle";
const m = l.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ a(
  "div",
  {
    ref: r,
    className: f("text-sm [&_p]:leading-relaxed", t),
    ...e
  }
));
m.displayName = "AlertDescription";
export {
  d as Alert,
  m as AlertDescription,
  n as AlertTitle
};
