import { jsxs as e, jsx as o } from "react/jsx-runtime";
import * as m from "react";
import { Root as d, Indicator as l } from "./index72.js";
import { cn as c } from "./index2.js";
const f = m.forwardRef(
  ({
    className: i,
    value: s = 0,
    segments: p = 20,
    showPercentage: t = !1,
    label: r,
    ...a
  }, n) => /* @__PURE__ */ e("div", { className: "w-full min-w-[200px]", children: [
    (r || t) && /* @__PURE__ */ e("div", { className: "flex justify-center items-center gap-2 mb-2 font-mono text-sm font-bold text-primary", children: [
      r && /* @__PURE__ */ o("span", { children: r }),
      t && /* @__PURE__ */ e("span", { children: [
        Math.round(s),
        "%"
      ] })
    ] }),
    /* @__PURE__ */ o(
      d,
      {
        ref: n,
        className: c("relative h-6 w-full overflow-hidden bg-background border-2 border-primary", i),
        ...a,
        children: /* @__PURE__ */ o(
          l,
          {
            className: "h-full bg-primary transition-all duration-200",
            style: { width: `${s}%` }
          }
        )
      }
    )
  ] })
);
f.displayName = "Progress";
export {
  f as Progress
};
