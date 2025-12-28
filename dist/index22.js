import { jsxs as o, jsx as e } from "react/jsx-runtime";
import * as m from "react";
import { Root as d, Indicator as l } from "./index85.js";
import { cn as c } from "./index2.js";
const f = m.forwardRef(
  ({
    className: s,
    value: t = 0,
    showPercentage: i = !1,
    label: r,
    ...a
  }, n) => /* @__PURE__ */ o("div", { className: "w-full min-w-[200px]", children: [
    (r || i) && /* @__PURE__ */ o("div", { className: "flex justify-center items-center gap-2 mb-2 font-mono text-sm font-bold text-primary", children: [
      r && /* @__PURE__ */ e("span", { children: r }),
      i && /* @__PURE__ */ o("span", { children: [
        Math.round(t),
        "%"
      ] })
    ] }),
    /* @__PURE__ */ e(
      d,
      {
        ref: n,
        className: c("relative h-6 w-full overflow-hidden bg-background border-2 border-primary", s),
        ...a,
        children: /* @__PURE__ */ e(
          l,
          {
            className: "h-full bg-primary transition-all duration-200",
            style: { width: `${t}%` }
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
