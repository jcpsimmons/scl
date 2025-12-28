import { jsxs as m, jsx as r } from "react/jsx-runtime";
import * as i from "react";
import { Root as s, Viewport as p, Corner as d, ScrollAreaScrollbar as c, ScrollAreaThumb as f } from "./index64.js";
import { cn as n } from "./index2.js";
const h = i.forwardRef(({ className: l, children: e, ...o }, a) => /* @__PURE__ */ m(
  s,
  {
    ref: a,
    className: n("relative overflow-hidden", l),
    ...o,
    children: [
      /* @__PURE__ */ r(p, { className: "h-full w-full rounded-[inherit]", children: e }),
      /* @__PURE__ */ r(t, { orientation: "vertical" }),
      /* @__PURE__ */ r(t, { orientation: "horizontal" }),
      /* @__PURE__ */ r(d, {})
    ]
  }
));
h.displayName = s.displayName;
const t = i.forwardRef(({ className: l, orientation: e = "vertical", ...o }, a) => /* @__PURE__ */ r(
  c,
  {
    ref: a,
    orientation: e,
    className: n(
      "flex touch-none select-none transition-colors",
      e === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      e === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      l
    ),
    ...o,
    children: /* @__PURE__ */ r(f, { className: "relative flex-1 bg-primary terminal-glow" })
  }
));
t.displayName = c.displayName;
export {
  h as ScrollArea,
  t as ScrollBar
};
