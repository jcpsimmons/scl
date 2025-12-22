import { jsx as e } from "react/jsx-runtime";
import * as d from "react";
import { Root as s, Trigger as n, Portal as m, Content as a, Provider as l } from "./index62.js";
import { cn as p } from "./index2.js";
const f = ({ children: o, ...t }) => /* @__PURE__ */ e(l, { delayDuration: 100, skipDelayDuration: 300, ...t, children: o });
f.displayName = "TooltipProvider";
const T = s, x = n, c = d.forwardRef(({ className: o, sideOffset: t = 4, ...i }, r) => /* @__PURE__ */ e(m, { children: /* @__PURE__ */ e(
  a,
  {
    ref: r,
    sideOffset: t,
    className: p(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      o
    ),
    ...i
  }
) }));
c.displayName = a.displayName;
export {
  T as Tooltip,
  c as TooltipContent,
  f as TooltipProvider,
  x as TooltipTrigger
};
