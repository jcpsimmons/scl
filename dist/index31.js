import { jsx as e } from "react/jsx-runtime";
import * as s from "react";
import { Root as a, Thumb as n } from "./index78.js";
import { cn as r } from "./index2.js";
const c = s.forwardRef(({ className: t, ...o }, i) => /* @__PURE__ */ e(
  a,
  {
    className: r(
      "peer inline-flex h-6 w-12 shrink-0 cursor-pointer items-center border-2 border-primary px-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-background",
      t
    ),
    ...o,
    ref: i,
    children: /* @__PURE__ */ e(
      n,
      {
        className: r(
          "pointer-events-none block h-4 w-5 border-2 border-primary transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 data-[state=checked]:bg-primary-foreground data-[state=unchecked]:bg-primary"
        )
      }
    )
  }
));
c.displayName = a.displayName;
export {
  c as Switch
};
