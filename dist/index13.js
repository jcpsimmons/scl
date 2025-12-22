import { jsx as t, jsxs as i } from "react/jsx-runtime";
import * as l from "react";
import { Root as g, Portal as u, Trigger as x, Close as n, Overlay as d, Content as r, Title as c, Description as m } from "./index59.js";
import { cn as s } from "./index2.js";
import y from "./index60.js";
const T = g, j = x, N = u, F = n, f = l.forwardRef(({ className: a, ...e }, o) => /* @__PURE__ */ t(
  d,
  {
    ref: o,
    className: s(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      a
    ),
    ...e
  }
));
f.displayName = d.displayName;
const D = l.forwardRef(({ className: a, children: e, ...o }, p) => /* @__PURE__ */ i(N, { children: [
  /* @__PURE__ */ t(f, {}),
  /* @__PURE__ */ i(
    r,
    {
      ref: p,
      className: s(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        a
      ),
      ...o,
      children: [
        e,
        /* @__PURE__ */ i(n, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ t(y, { className: "h-4 w-4" }),
          /* @__PURE__ */ t("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
D.displayName = r.displayName;
const b = ({
  className: a,
  ...e
}) => /* @__PURE__ */ t(
  "div",
  {
    className: s(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      a
    ),
    ...e
  }
);
b.displayName = "DialogHeader";
const h = ({
  className: a,
  ...e
}) => /* @__PURE__ */ t(
  "div",
  {
    className: s(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      a
    ),
    ...e
  }
);
h.displayName = "DialogFooter";
const w = l.forwardRef(({ className: a, ...e }, o) => /* @__PURE__ */ t(
  c,
  {
    ref: o,
    className: s(
      "text-lg font-semibold leading-none tracking-tight",
      a
    ),
    ...e
  }
));
w.displayName = c.displayName;
const v = l.forwardRef(({ className: a, ...e }, o) => /* @__PURE__ */ t(
  m,
  {
    ref: o,
    className: s("text-sm text-muted-foreground", a),
    ...e
  }
));
v.displayName = m.displayName;
export {
  T as Dialog,
  F as DialogClose,
  D as DialogContent,
  v as DialogDescription,
  h as DialogFooter,
  b as DialogHeader,
  f as DialogOverlay,
  N as DialogPortal,
  w as DialogTitle,
  j as DialogTrigger
};
