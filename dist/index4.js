import { jsx as a, jsxs as m } from "react/jsx-runtime";
import * as n from "react";
import { Root as c, Item as l, Header as f, Trigger as i, Content as d } from "./index59.js";
import { cn as s } from "./index2.js";
import p from "./index60.js";
const R = c, N = n.forwardRef(({ className: e, ...o }, t) => /* @__PURE__ */ a(
  l,
  {
    ref: t,
    className: s("border-b", e),
    ...o
  }
));
N.displayName = "AccordionItem";
const x = n.forwardRef(({ className: e, children: o, ...t }, r) => /* @__PURE__ */ a(f, { className: "flex", children: /* @__PURE__ */ m(
  i,
  {
    ref: r,
    className: s(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      e
    ),
    ...t,
    children: [
      o,
      /* @__PURE__ */ a(p, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
x.displayName = i.displayName;
const g = n.forwardRef(({ className: e, children: o, ...t }, r) => /* @__PURE__ */ a(
  d,
  {
    ref: r,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...t,
    children: /* @__PURE__ */ a("div", { className: s("pb-4 pt-0", e), children: o })
  }
));
g.displayName = d.displayName;
export {
  R as Accordion,
  g as AccordionContent,
  N as AccordionItem,
  x as AccordionTrigger
};
