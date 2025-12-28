import { jsx as r } from "react/jsx-runtime";
import * as i from "react";
import { Root as t, Item as s, Indicator as d } from "./index84.js";
import { cn as m } from "./index2.js";
import l from "./index79.js";
const c = i.forwardRef(({ className: e, ...o }, a) => /* @__PURE__ */ r(
  t,
  {
    className: m("grid gap-2", e),
    ...o,
    ref: a
  }
));
c.displayName = t.displayName;
const n = i.forwardRef(({ className: e, ...o }, a) => /* @__PURE__ */ r(
  s,
  {
    ref: a,
    className: m(
      "h-6 w-6 rounded-full border-2 border-primary bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary flex items-center justify-center",
      e
    ),
    ...o,
    children: /* @__PURE__ */ r(d, { className: "flex items-center justify-center", children: /* @__PURE__ */ r(l, { className: "h-3 w-3 fill-primary-foreground text-primary-foreground" }) })
  }
));
n.displayName = s.displayName;
export {
  c as RadioGroup,
  n as RadioGroupItem
};
