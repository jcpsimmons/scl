import { jsx as e } from "react/jsx-runtime";
import * as c from "react";
import { Checkbox as o, CheckboxIndicator as s } from "./index86.js";
import { cn as r } from "./index2.js";
import m from "./index54.js";
const n = c.forwardRef(({ className: i, ...t }, a) => /* @__PURE__ */ e(
  o,
  {
    ref: a,
    className: r(
      "peer h-6 w-6 shrink-0 border-2 border-primary bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground flex items-center justify-center",
      i
    ),
    ...t,
    children: /* @__PURE__ */ e(
      s,
      {
        className: r("flex items-center justify-center text-current"),
        children: /* @__PURE__ */ e(m, { className: "h-5 w-5" })
      }
    )
  }
));
n.displayName = o.displayName;
export {
  n as Checkbox
};
