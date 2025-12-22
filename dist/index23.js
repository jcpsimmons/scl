import { jsx as t } from "react/jsx-runtime";
import * as l from "react";
import { Root as r } from "./index61.js";
import { cn as s } from "./index2.js";
const e = l.forwardRef(
  ({ className: a, orientation: o = "horizontal", decorative: m = !0, ...f }, p) => /* @__PURE__ */ t(
    r,
    {
      ref: p,
      decorative: m,
      orientation: o,
      className: s(
        "shrink-0 bg-[#00ff00]",
        o === "horizontal" ? "h-[2px] w-full" : "h-full w-[3px]",
        a
      ),
      ...f
    }
  )
);
e.displayName = r.displayName;
export {
  e as Separator
};
