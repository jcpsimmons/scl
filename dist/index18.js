import { jsx as o } from "react/jsx-runtime";
import * as i from "react";
import { Root as s, Trigger as m, Anchor as l, Portal as p, Content as t } from "./index61.js";
import { cn as c } from "./index2.js";
const u = s, P = m, v = l, f = i.forwardRef(({ className: e, align: a = "center", sideOffset: r = 4, ...n }, d) => /* @__PURE__ */ o(p, { children: /* @__PURE__ */ o(
  t,
  {
    ref: d,
    align: a,
    sideOffset: r,
    className: c(
      "z-50 w-72 rounded-md border border-terminal-green bg-black p-4 text-terminal-green shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
f.displayName = t.displayName;
export {
  u as Popover,
  v as PopoverAnchor,
  f as PopoverContent,
  P as PopoverTrigger
};
