import { jsx as o, jsxs as i } from "react/jsx-runtime";
import * as n from "react";
import { Root as w, Trigger as x, Group as N, Portal as m, Sub as v, RadioGroup as R, Content as l, Item as p, CheckboxItem as c, ItemIndicator as u, RadioItem as f, Label as b, Separator as y, SubContent as g, SubTrigger as h } from "./index80.js";
import { cn as s } from "./index2.js";
import D from "./index54.js";
import M from "./index75.js";
import S from "./index81.js";
const H = w, J = x, K = N, O = m, Q = v, U = R, I = n.forwardRef(({ className: e, inset: a, children: t, ...r }, d) => /* @__PURE__ */ i(
  h,
  {
    ref: d,
    className: s(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-primary/20 focus:bg-primary/20 data-[state=open]:bg-primary/20 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      a && "pl-8",
      e
    ),
    ...r,
    children: [
      t,
      /* @__PURE__ */ o(S, { className: "ml-auto" })
    ]
  }
));
I.displayName = h.displayName;
const C = n.forwardRef(({ className: e, ...a }, t) => /* @__PURE__ */ o(
  g,
  {
    ref: t,
    className: s(
      "z-[60] min-w-[8rem] overflow-hidden border border-primary bg-background p-1 text-primary data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...a
  }
));
C.displayName = g.displayName;
const k = n.forwardRef(({ className: e, sideOffset: a = 4, ...t }, r) => /* @__PURE__ */ o(m, { children: /* @__PURE__ */ o(
  l,
  {
    ref: r,
    sideOffset: a,
    className: s(
      "z-[60] min-w-[8rem] overflow-hidden border border-primary bg-background p-1 text-primary",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...t
  }
) }));
k.displayName = l.displayName;
const z = n.forwardRef(({ className: e, inset: a, ...t }, r) => /* @__PURE__ */ o(
  p,
  {
    ref: r,
    className: s(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-primary/20 focus:bg-primary/20 focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      a && "pl-8",
      e
    ),
    ...t
  }
));
z.displayName = p.displayName;
const G = n.forwardRef(({ className: e, children: a, checked: t, ...r }, d) => /* @__PURE__ */ i(
  c,
  {
    ref: d,
    className: s(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-primary/20 focus:bg-primary/20 focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    checked: t,
    ...r,
    children: [
      /* @__PURE__ */ o("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ o(u, { children: /* @__PURE__ */ o(D, { className: "h-4 w-4" }) }) }),
      a
    ]
  }
));
G.displayName = c.displayName;
const T = n.forwardRef(({ className: e, children: a, ...t }, r) => /* @__PURE__ */ i(
  f,
  {
    ref: r,
    className: s(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-primary/20 focus:bg-primary/20 focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ o("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ o(u, { children: /* @__PURE__ */ o(M, { className: "h-4 w-4 fill-current" }) }) }),
      a
    ]
  }
));
T.displayName = f.displayName;
const j = n.forwardRef(({ className: e, inset: a, ...t }, r) => /* @__PURE__ */ o(
  b,
  {
    ref: r,
    className: s(
      "px-2 py-1.5 text-sm font-semibold",
      a && "pl-8",
      e
    ),
    ...t
  }
));
j.displayName = b.displayName;
const L = n.forwardRef(({ className: e, ...a }, t) => /* @__PURE__ */ o(
  y,
  {
    ref: t,
    className: s("-mx-1 my-1 h-px bg-muted", e),
    ...a
  }
));
L.displayName = y.displayName;
const P = ({
  className: e,
  ...a
}) => /* @__PURE__ */ o(
  "span",
  {
    className: s("ml-auto text-xs tracking-widest text-primary border border-primary px-1", e),
    ...a
  }
);
P.displayName = "DropdownMenuShortcut";
export {
  H as DropdownMenu,
  G as DropdownMenuCheckboxItem,
  k as DropdownMenuContent,
  K as DropdownMenuGroup,
  z as DropdownMenuItem,
  j as DropdownMenuLabel,
  O as DropdownMenuPortal,
  U as DropdownMenuRadioGroup,
  T as DropdownMenuRadioItem,
  L as DropdownMenuSeparator,
  P as DropdownMenuShortcut,
  Q as DropdownMenuSub,
  C as DropdownMenuSubContent,
  I as DropdownMenuSubTrigger,
  J as DropdownMenuTrigger
};
