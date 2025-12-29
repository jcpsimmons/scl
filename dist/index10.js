import { jsx as d } from "react/jsx-runtime";
import * as t from "react";
import { cn as o } from "./index2.js";
const s = t.forwardRef(({ className: a, ...r }, e) => /* @__PURE__ */ d(
  "div",
  {
    ref: e,
    className: o(
      "border-2 bg-card text-card-foreground",
      a
    ),
    ...r
  }
));
s.displayName = "Card";
const i = t.forwardRef(({ className: a, ...r }, e) => /* @__PURE__ */ d(
  "div",
  {
    ref: e,
    className: o("flex flex-col space-y-1.5", a),
    ...r
  }
));
i.displayName = "CardHeader";
const m = t.forwardRef(({ className: a, ...r }, e) => /* @__PURE__ */ d(
  "div",
  {
    ref: e,
    className: o("bg-primary text-primary-foreground px-2 py-1 text-sm font-semibold leading-none tracking-tight w-full", a),
    ...r
  }
));
m.displayName = "CardTitle";
const f = t.forwardRef(({ className: a, ...r }, e) => /* @__PURE__ */ d(
  "div",
  {
    ref: e,
    className: o("px-6 pt-2 text-sm text-muted-foreground", a),
    ...r
  }
));
f.displayName = "CardDescription";
const c = t.forwardRef(({ className: a, ...r }, e) => /* @__PURE__ */ d("div", { ref: e, className: o("p-6", a), ...r }));
c.displayName = "CardContent";
const l = t.forwardRef(({ className: a, ...r }, e) => /* @__PURE__ */ d(
  "div",
  {
    ref: e,
    className: o("flex items-center p-6 pt-0", a),
    ...r
  }
));
l.displayName = "CardFooter";
export {
  s as Card,
  c as CardContent,
  f as CardDescription,
  l as CardFooter,
  i as CardHeader,
  m as CardTitle
};
