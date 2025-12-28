import { jsx as e } from "react/jsx-runtime";
import * as i from "react";
import { Root as t, Thumb as c } from "./index84.js";
import { cn as r } from "./index2.js";
const n = i.forwardRef(({ className: a, ...o }, s) => /* @__PURE__ */ e(
  t,
  {
    className: r(
      "peer inline-flex h-6 w-12 shrink-0 cursor-pointer items-center border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=unchecked]:bg-background data-[state=unchecked]:border-muted-foreground",
      a
    ),
    ...o,
    ref: s,
    children: /* @__PURE__ */ e(
      c,
      {
        className: r(
          "pointer-events-none block h-4 w-4 transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 data-[state=checked]:bg-primary-foreground data-[state=unchecked]:bg-muted-foreground"
        )
      }
    )
  }
));
n.displayName = t.displayName;
export {
  n as Switch
};
