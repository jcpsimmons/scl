import { jsxs as n, jsx as e } from "react/jsx-runtime";
import * as t from "react";
import { Root as s, Viewport as d, Corner as p, ScrollAreaScrollbar as c, ScrollAreaThumb as f } from "./index62.js";
import { cn as i } from "./index2.js";
const h = t.forwardRef(({ className: l, children: r, ...a }, o) => /* @__PURE__ */ n(
  s,
  {
    ref: o,
    className: i("relative overflow-hidden", l),
    ...a,
    children: [
      /* @__PURE__ */ e(d, { className: "h-full w-full rounded-[inherit]", children: r }),
      /* @__PURE__ */ e(m, {}),
      /* @__PURE__ */ e(p, {})
    ]
  }
));
h.displayName = s.displayName;
const m = t.forwardRef(({ className: l, orientation: r = "vertical", ...a }, o) => /* @__PURE__ */ e(
  c,
  {
    ref: o,
    orientation: r,
    className: i(
      "flex touch-none select-none transition-colors",
      r === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      r === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      l
    ),
    ...a,
    children: /* @__PURE__ */ e(f, { className: "relative flex-1 bg-terminal-green terminal-glow" })
  }
));
m.displayName = c.displayName;
export {
  h as ScrollArea,
  m as ScrollBar
};
