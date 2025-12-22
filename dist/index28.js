import { jsx as e } from "react/jsx-runtime";
import * as n from "react";
import { Root as a, Thumb as o } from "./index78.js";
import { cn as t } from "./index2.js";
const c = n.forwardRef(({ className: r, ...s }, i) => /* @__PURE__ */ e(
  a,
  {
    className: t(
      "peer inline-flex h-6 w-12 shrink-0 cursor-pointer items-center border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-terminal-green data-[state=checked]:border-terminal-green data-[state=unchecked]:bg-black data-[state=unchecked]:border-terminal-red",
      r
    ),
    ...s,
    ref: i,
    children: /* @__PURE__ */ e(
      o,
      {
        className: t(
          "pointer-events-none block h-4 w-4 transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 data-[state=checked]:bg-black data-[state=unchecked]:bg-terminal-red"
        )
      }
    )
  }
));
c.displayName = a.displayName;
export {
  c as Switch
};
