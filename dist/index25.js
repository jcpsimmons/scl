import { jsxs as i, jsx as e } from "react/jsx-runtime";
import * as s from "react";
import { Root as N, Group as b, Value as g, Trigger as d, Icon as S, Portal as v, Content as m, Viewport as R, Label as n, Item as c, ItemIndicator as C, ItemText as j, Separator as p, ScrollUpButton as f, ScrollDownButton as y } from "./index52.js";
import { cn as o } from "./index2.js";
import u from "./index51.js";
import I from "./index48.js";
import B from "./index53.js";
const E = N, F = b, H = g, k = s.forwardRef(({ className: a, children: r, ...t }, l) => /* @__PURE__ */ i(
  d,
  {
    ref: l,
    className: o(
      "flex h-10 w-full items-center justify-between whitespace-nowrap border border-primary bg-background text-primary px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      a
    ),
    ...t,
    children: [
      r,
      /* @__PURE__ */ e(S, { asChild: !0, children: /* @__PURE__ */ e(u, { className: "h-4 w-4 text-primary" }) })
    ]
  }
));
k.displayName = d.displayName;
const h = s.forwardRef(({ className: a, ...r }, t) => /* @__PURE__ */ e(
  f,
  {
    ref: t,
    className: o(
      "flex cursor-default items-center justify-center py-1",
      a
    ),
    ...r,
    children: /* @__PURE__ */ e(B, { className: "h-4 w-4 text-primary" })
  }
));
h.displayName = f.displayName;
const x = s.forwardRef(({ className: a, ...r }, t) => /* @__PURE__ */ e(
  y,
  {
    ref: t,
    className: o(
      "flex cursor-default items-center justify-center py-1",
      a
    ),
    ...r,
    children: /* @__PURE__ */ e(u, { className: "h-4 w-4 text-primary" })
  }
));
x.displayName = y.displayName;
const z = s.forwardRef(({ className: a, children: r, position: t = "popper", ...l }, w) => /* @__PURE__ */ e(v, { children: /* @__PURE__ */ i(
  m,
  {
    ref: w,
    className: o(
      "relative z-[60] max-h-96 min-w-[8rem] overflow-hidden border border-primary bg-background text-primary data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      t === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      a
    ),
    position: t,
    ...l,
    children: [
      /* @__PURE__ */ e(h, {}),
      /* @__PURE__ */ e(
        R,
        {
          className: o(
            "p-1",
            t === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children: r
        }
      ),
      /* @__PURE__ */ e(x, {})
    ]
  }
) }));
z.displayName = m.displayName;
const D = s.forwardRef(({ className: a, ...r }, t) => /* @__PURE__ */ e(
  n,
  {
    ref: t,
    className: o("px-2 py-1.5 text-sm font-semibold", a),
    ...r
  }
));
D.displayName = n.displayName;
const T = s.forwardRef(({ className: a, children: r, ...t }, l) => /* @__PURE__ */ i(
  c,
  {
    ref: l,
    className: o(
      "relative flex w-full cursor-default select-none items-center py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-primary/20 hover:text-primary focus:bg-primary/20 focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      a
    ),
    ...t,
    children: [
      /* @__PURE__ */ e("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ e(C, { children: /* @__PURE__ */ e(I, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ e(j, { children: r })
    ]
  }
));
T.displayName = c.displayName;
const U = s.forwardRef(({ className: a, ...r }, t) => /* @__PURE__ */ e(
  p,
  {
    ref: t,
    className: o("-mx-1 my-1 h-px bg-muted", a),
    ...r
  }
));
U.displayName = p.displayName;
export {
  E as Select,
  z as SelectContent,
  F as SelectGroup,
  T as SelectItem,
  D as SelectLabel,
  x as SelectScrollDownButton,
  h as SelectScrollUpButton,
  U as SelectSeparator,
  k as SelectTrigger,
  H as SelectValue
};
