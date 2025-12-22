import { jsxs as l, jsx as e } from "react/jsx-runtime";
import * as b from "react";
import { Root as n, Track as f, Range as a, Thumb as h } from "./index48.js";
import { cn as d } from "./index2.js";
const p = b.forwardRef(({ className: s, defaultValue: o, value: r, ...t }, i) => {
  const c = (r == null ? void 0 : r.length) ?? (o == null ? void 0 : o.length) ?? 1;
  return /* @__PURE__ */ l(
    n,
    {
      ref: i,
      defaultValue: o,
      value: r,
      className: d(
        "relative flex w-full touch-none select-none items-center",
        s
      ),
      ...t,
      children: [
        /* @__PURE__ */ e(f, { className: "relative h-2 w-full grow overflow-hidden border border-[#00ff00] bg-black", children: /* @__PURE__ */ e(a, { className: "absolute h-full bg-[#00ff00]" }) }),
        Array.from({ length: c }).map((g, m) => /* @__PURE__ */ e(
          h,
          {
            className: "block h-5 w-3 border-2 border-[#00ff00] bg-[#00ff00] transition-all focus-visible:outline-none hover:bg-black disabled:pointer-events-none disabled:opacity-50"
          },
          m
        ))
      ]
    }
  );
});
p.displayName = n.displayName;
export {
  p as Slider
};
