import { jsx as o, jsxs as g } from "react/jsx-runtime";
import * as l from "react";
import { Root as N, Portal as y, Trigger as x, Overlay as i, Content as r, Title as d, Description as n, Action as m, Cancel as c } from "./index74.js";
import { cn as s } from "./index2.js";
import { buttonVariants as f } from "./index9.js";
const P = N, h = x, u = y, p = l.forwardRef(({ className: a, ...t }, e) => /* @__PURE__ */ o(
  i,
  {
    className: s("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", a),
    ...t,
    ref: e
  }
));
p.displayName = i.displayName;
const D = l.forwardRef(({ className: a, ...t }, e) => /* @__PURE__ */ g(u, { children: [
  /* @__PURE__ */ o(p, {}),
  /* @__PURE__ */ o(
    r,
    {
      ref: e,
      className: s("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", a),
      ...t
    }
  )
] }));
D.displayName = r.displayName;
const A = ({ className: a, ...t }) => /* @__PURE__ */ o("div", { className: s("flex flex-col space-y-2 text-center sm:text-left", a), ...t });
A.displayName = "AlertDialogHeader";
const w = ({ className: a, ...t }) => /* @__PURE__ */ o("div", { className: s("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", a), ...t });
w.displayName = "AlertDialogFooter";
const R = l.forwardRef(({ className: a, ...t }, e) => /* @__PURE__ */ o(d, { ref: e, className: s("text-lg font-semibold", a), ...t }));
R.displayName = d.displayName;
const b = l.forwardRef(({ className: a, ...t }, e) => /* @__PURE__ */ o(n, { ref: e, className: s("text-sm text-muted-foreground", a), ...t }));
b.displayName = n.displayName;
const v = l.forwardRef(({ className: a, ...t }, e) => /* @__PURE__ */ o(m, { ref: e, className: s(f(), a), ...t }));
v.displayName = m.displayName;
const T = l.forwardRef(({ className: a, ...t }, e) => /* @__PURE__ */ o(c, { ref: e, className: s(f({ variant: "outline" }), "mt-2 sm:mt-0", a), ...t }));
T.displayName = c.displayName;
export {
  P as AlertDialog,
  v as AlertDialogAction,
  T as AlertDialogCancel,
  D as AlertDialogContent,
  b as AlertDialogDescription,
  w as AlertDialogFooter,
  A as AlertDialogHeader,
  p as AlertDialogOverlay,
  u as AlertDialogPortal,
  R as AlertDialogTitle,
  h as AlertDialogTrigger
};
