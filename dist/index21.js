import { jsx as o } from "react/jsx-runtime";
import * as i from "react";
import { Root as s, Trigger as m, Anchor as p, Portal as c, Content as t } from "./index56.js";
import { cn as l } from "./index2.js";
const u = s, P = m, v = p, f = i.forwardRef(({ className: e, align: a = "center", sideOffset: r = 4, ...d }, n) => /* @__PURE__ */ o(c, { children: /* @__PURE__ */ o(
  t,
  {
    ref: n,
    align: a,
    sideOffset: r,
    className: l(
      "z-50 w-72 rounded-md border border-primary bg-background p-4 text-primary shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...d
  }
) }));
f.displayName = t.displayName;
export {
  u as Popover,
  v as PopoverAnchor,
  f as PopoverContent,
  P as PopoverTrigger
};
