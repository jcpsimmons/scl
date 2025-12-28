import { jsx as a, jsxs as r } from "react/jsx-runtime";
import * as i from "react";
import { Root as g, Portal as u, Trigger as x, Close as n, Overlay as d, Content as l, Title as m, Description as c } from "./index54.js";
import { cva as y } from "./index45.js";
import { cn as s } from "./index2.js";
import N from "./index55.js";
const H = g, O = x, P = n, b = u, f = i.forwardRef(({ className: e, ...t }, o) => /* @__PURE__ */ a(
  d,
  {
    className: s(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      e
    ),
    ...t,
    ref: o
  }
));
f.displayName = d.displayName;
const S = y(
  "fixed z-[60] gap-4 bg-black p-6 transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
), w = i.forwardRef(({ side: e = "right", className: t, children: o, ...p }, h) => /* @__PURE__ */ r(b, { children: [
  /* @__PURE__ */ a(f, {}),
  /* @__PURE__ */ r(
    l,
    {
      ref: h,
      className: s(S({ side: e }), t),
      ...p,
      children: [
        /* @__PURE__ */ r(n, { className: "absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ a(N, { className: "h-4 w-4" }),
          /* @__PURE__ */ a("span", { className: "sr-only", children: "Close" })
        ] }),
        o
      ]
    }
  )
] }));
w.displayName = l.displayName;
const v = ({ className: e, ...t }) => /* @__PURE__ */ a("div", { className: s("flex flex-col space-y-2 text-center sm:text-left", e), ...t });
v.displayName = "SheetHeader";
const R = ({ className: e, ...t }) => /* @__PURE__ */ a("div", { className: s("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", e), ...t });
R.displayName = "SheetFooter";
const C = i.forwardRef(({ className: e, ...t }, o) => /* @__PURE__ */ a(m, { ref: o, className: s("text-lg font-semibold text-foreground", e), ...t }));
C.displayName = m.displayName;
const T = i.forwardRef(({ className: e, ...t }, o) => /* @__PURE__ */ a(c, { ref: o, className: s("text-sm text-muted-foreground", e), ...t }));
T.displayName = c.displayName;
export {
  H as Sheet,
  P as SheetClose,
  w as SheetContent,
  T as SheetDescription,
  R as SheetFooter,
  v as SheetHeader,
  f as SheetOverlay,
  b as SheetPortal,
  C as SheetTitle,
  O as SheetTrigger
};
