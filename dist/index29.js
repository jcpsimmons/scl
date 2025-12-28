import { jsxs as a, jsx as e } from "react/jsx-runtime";
import * as b from "react";
import { Root as n, Track as l, Range as p, Thumb as d } from "./index80.js";
import { cn as h } from "./index2.js";
const g = b.forwardRef(({ className: i, defaultValue: r, value: o, ...s }, m) => {
  const t = (o == null ? void 0 : o.length) ?? (r == null ? void 0 : r.length) ?? 1;
  return /* @__PURE__ */ a(
    n,
    {
      ref: m,
      defaultValue: r,
      value: o,
      className: h(
        "relative flex w-full touch-none select-none items-center",
        i
      ),
      ...s,
      children: [
        /* @__PURE__ */ e(l, { className: "relative h-2 w-full grow overflow-hidden border border-primary bg-background", children: /* @__PURE__ */ e(p, { className: "absolute h-full bg-primary" }) }),
        Array.from({ length: t }).map((f, c) => /* @__PURE__ */ e(
          d,
          {
            className: "block h-5 w-3 border-2 border-primary bg-primary transition-all focus-visible:outline-none hover:bg-background disabled:pointer-events-none disabled:opacity-50"
          },
          c
        ))
      ]
    }
  );
});
g.displayName = n.displayName;
export {
  g as Slider
};
