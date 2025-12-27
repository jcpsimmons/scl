import { jsxs as o, jsx as r } from "react/jsx-runtime";
import * as p from "react";
import { Root as h } from "./index78.js";
import { cn as l } from "./index2.js";
const x = p.forwardRef(
  ({
    className: m,
    value: s = 0,
    segments: i = 20,
    showPercentage: a = !1,
    label: e,
    ...n
  }, d) => {
    const f = Math.floor(s / 100 * i);
    return /* @__PURE__ */ o("div", { className: "w-full", children: [
      (e || a) && /* @__PURE__ */ o("div", { className: "flex justify-between items-center mb-2 font-mono text-xs text-primary", children: [
        e && /* @__PURE__ */ r("span", { children: e }),
        a && /* @__PURE__ */ o("span", { children: [
          Math.round(s),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ r(
        h,
        {
          ref: d,
          className: l("relative h-6 w-full overflow-hidden bg-background border-2 border-primary", m),
          ...n,
          children: /* @__PURE__ */ r("div", { className: "flex h-full gap-[2px] p-[2px]", children: Array.from({ length: i }).map((u, t) => {
            const c = t < f;
            return /* @__PURE__ */ r(
              "div",
              {
                className: l(
                  "flex-1 transition-colors duration-200",
                  c ? "bg-primary" : "bg-primary/10"
                )
              },
              t
            );
          }) })
        }
      )
    ] });
  }
);
x.displayName = "Progress";
export {
  x as Progress
};
