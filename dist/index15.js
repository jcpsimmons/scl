import { jsx as a, jsxs as i } from "react/jsx-runtime";
import * as r from "react";
import { Root as x, Trigger as N, Group as y, Portal as l, Sub as v, RadioGroup as R, Content as m, Item as f, CheckboxItem as p, ItemIndicator as c, RadioItem as u, Label as b, Separator as g, SubContent as h, SubTrigger as w } from "./index55.js";
import { cn as n } from "./index2.js";
import D from "./index48.js";
import M from "./index56.js";
import S from "./index57.js";
const H = x, J = N, K = y, O = l, Q = v, U = R, I = r.forwardRef(({ className: e, inset: t, children: o, ...s }, d) => /* @__PURE__ */ i(
  w,
  {
    ref: d,
    className: n(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-[#00ff00]/20 focus:bg-[#00ff00]/20 data-[state=open]:bg-[#00ff00]/20 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      t && "pl-8",
      e
    ),
    ...s,
    children: [
      o,
      /* @__PURE__ */ a(S, { className: "ml-auto" })
    ]
  }
));
I.displayName = w.displayName;
const C = r.forwardRef(({ className: e, ...t }, o) => /* @__PURE__ */ a(
  h,
  {
    ref: o,
    className: n(
      "z-[60] min-w-[8rem] overflow-hidden border border-[#00ff00] bg-black p-1 text-[#00ff00] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
C.displayName = h.displayName;
const k = r.forwardRef(({ className: e, sideOffset: t = 4, ...o }, s) => /* @__PURE__ */ a(l, { children: /* @__PURE__ */ a(
  m,
  {
    ref: s,
    sideOffset: t,
    className: n(
      "z-[60] min-w-[8rem] overflow-hidden border border-[#00ff00] bg-black p-1 text-[#00ff00]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...o
  }
) }));
k.displayName = m.displayName;
const z = r.forwardRef(({ className: e, inset: t, ...o }, s) => /* @__PURE__ */ a(
  f,
  {
    ref: s,
    className: n(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-[#00ff00]/20 focus:bg-[#00ff00]/20 focus:text-[#00ff00] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      t && "pl-8",
      e
    ),
    ...o
  }
));
z.displayName = f.displayName;
const G = r.forwardRef(({ className: e, children: t, checked: o, ...s }, d) => /* @__PURE__ */ i(
  p,
  {
    ref: d,
    className: n(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-[#00ff00]/20 focus:bg-[#00ff00]/20 focus:text-[#00ff00] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    checked: o,
    ...s,
    children: [
      /* @__PURE__ */ a("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ a(c, { children: /* @__PURE__ */ a(D, { className: "h-4 w-4" }) }) }),
      t
    ]
  }
));
G.displayName = p.displayName;
const T = r.forwardRef(({ className: e, children: t, ...o }, s) => /* @__PURE__ */ i(
  u,
  {
    ref: s,
    className: n(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-[#00ff00]/20 focus:bg-[#00ff00]/20 focus:text-[#00ff00] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    ...o,
    children: [
      /* @__PURE__ */ a("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ a(c, { children: /* @__PURE__ */ a(M, { className: "h-4 w-4 fill-current" }) }) }),
      t
    ]
  }
));
T.displayName = u.displayName;
const j = r.forwardRef(({ className: e, inset: t, ...o }, s) => /* @__PURE__ */ a(
  b,
  {
    ref: s,
    className: n(
      "px-2 py-1.5 text-sm font-semibold",
      t && "pl-8",
      e
    ),
    ...o
  }
));
j.displayName = b.displayName;
const L = r.forwardRef(({ className: e, ...t }, o) => /* @__PURE__ */ a(
  g,
  {
    ref: o,
    className: n("-mx-1 my-1 h-px bg-muted", e),
    ...t
  }
));
L.displayName = g.displayName;
const P = ({
  className: e,
  ...t
}) => /* @__PURE__ */ a(
  "span",
  {
    className: n("ml-auto text-xs tracking-widest text-[#00ff00] border border-[#00ff00] px-1", e),
    ...t
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
