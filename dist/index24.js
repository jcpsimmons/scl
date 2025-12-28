import { jsxs as n, jsx as l } from "react/jsx-runtime";
import * as s from "react";
import { Root as t, Viewport as p, Corner as d, ScrollAreaScrollbar as c, ScrollAreaThumb as f } from "./index49.js";
import { cn as i } from "./index2.js";
const h = s.forwardRef(({ className: e, children: r, ...a }, o) => /* @__PURE__ */ n(
  t,
  {
    ref: o,
    className: i("relative overflow-hidden", e),
    ...a,
    children: [
      /* @__PURE__ */ l(p, { className: "h-full w-full rounded-[inherit]", children: r }),
      /* @__PURE__ */ l(m, {}),
      /* @__PURE__ */ l(d, {})
    ]
  }
));
h.displayName = t.displayName;
const m = s.forwardRef(({ className: e, orientation: r = "vertical", ...a }, o) => /* @__PURE__ */ l(
  c,
  {
    ref: o,
    orientation: r,
    className: i(
      "flex touch-none select-none transition-colors",
      r === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      r === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      e
    ),
    ...a,
    children: /* @__PURE__ */ l(f, { className: "relative flex-1 bg-primary terminal-glow" })
  }
));
m.displayName = c.displayName;
export {
  h as ScrollArea,
  m as ScrollBar
};
