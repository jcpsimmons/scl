import { jsx as l } from "react/jsx-runtime";
import * as f from "react";
import { Root as o } from "./index60.js";
import { cn as i } from "./index2.js";
const s = f.forwardRef(
  ({ className: a, orientation: r = "horizontal", decorative: m = !0, ...p }, t) => /* @__PURE__ */ l(
    o,
    {
      ref: t,
      decorative: m,
      orientation: r,
      className: i(
        "shrink-0 bg-primary",
        r === "horizontal" ? "h-[2px] w-full" : "h-full w-[3px]",
        a
      ),
      ...p
    }
  )
);
s.displayName = o.displayName;
export {
  s as Separator
};
