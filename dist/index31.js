import { jsx as r } from "react/jsx-runtime";
import * as a from "react";
import { Root as o, Thumb as n } from "./index62.js";
import { cn as e } from "./index2.js";
const c = a.forwardRef(({ className: i, ...s }, t) => /* @__PURE__ */ r(
  o,
  {
    className: e(
      "peer inline-flex h-6 w-12 shrink-0 cursor-pointer items-center border-2 border-primary bg-background px-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      i
    ),
    ...s,
    ref: t,
    children: /* @__PURE__ */ r(
      n,
      {
        className: e(
          "pointer-events-none block h-4 w-5 bg-primary transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
c.displayName = o.displayName;
export {
  c as Switch
};
