import { jsxs as t, jsx as r } from "react/jsx-runtime";
import * as m from "react";
import { Root as h } from "./index79.js";
import { cn as d } from "./index2.js";
const u = {
  red: "bg-terminal-red",
  yellow: "bg-terminal-yellow",
  green: "bg-terminal-green",
  magenta: "bg-terminal-magenta",
  blue: "bg-terminal-blue"
}, w = m.forwardRef(
  ({
    className: f,
    value: e = 0,
    segments: l = 20,
    colorRange: a = !1,
    color: i = "yellow",
    showPercentage: o = !1,
    label: n,
    ...g
  }, c) => {
    const p = m.useMemo(() => a ? e < 34 ? "red" : e < 67 ? "yellow" : "green" : i, [e, a, i]), b = Math.floor(e / 100 * l);
    return /* @__PURE__ */ t("div", { className: "w-full", children: [
      (n || o) && /* @__PURE__ */ t("div", { className: "flex justify-between items-center mb-2 font-mono text-xs text-terminal-green", children: [
        n && /* @__PURE__ */ r("span", { children: n }),
        o && /* @__PURE__ */ t("span", { children: [
          Math.round(e),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ r(
        h,
        {
          ref: c,
          className: d("relative h-6 w-full overflow-hidden bg-black border-2 border-terminal-green", f),
          ...g,
          children: /* @__PURE__ */ r("div", { className: "flex h-full gap-[2px] p-[2px]", children: Array.from({ length: l }).map((y, s) => {
            const x = s < b;
            return /* @__PURE__ */ r(
              "div",
              {
                className: d(
                  "flex-1 transition-colors duration-200",
                  x ? u[p] : "bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(0,255,0,0.1)_2px,rgba(0,255,0,0.1)_4px)]"
                )
              },
              s
            );
          }) })
        }
      )
    ] });
  }
);
w.displayName = "Progress";
export {
  w as Progress
};
