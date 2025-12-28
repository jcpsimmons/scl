import { jsx as d } from "react/jsx-runtime";
import * as o from "react";
import { cn as t } from "./index2.js";
const s = o.forwardRef(({ className: a, ...r }, e) => /* @__PURE__ */ d(
  "div",
  {
    ref: e,
    className: t(
      "border bg-card text-card-foreground",
      a
    ),
    ...r
  }
));
s.displayName = "Card";
const i = o.forwardRef(({ className: a, ...r }, e) => /* @__PURE__ */ d(
  "div",
  {
    ref: e,
    className: t("flex flex-col space-y-1.5 p-6 pb-0", a),
    ...r
  }
));
i.displayName = "CardHeader";
const m = o.forwardRef(({ className: a, ...r }, e) => /* @__PURE__ */ d(
  "div",
  {
    ref: e,
    className: t("bg-primary text-primary-foreground px-4 py-2 font-semibold leading-none tracking-tight w-full", a),
    ...r
  }
));
m.displayName = "CardTitle";
const f = o.forwardRef(({ className: a, ...r }, e) => /* @__PURE__ */ d(
  "div",
  {
    ref: e,
    className: t("text-sm text-muted-foreground", a),
    ...r
  }
));
f.displayName = "CardDescription";
const c = o.forwardRef(({ className: a, ...r }, e) => /* @__PURE__ */ d("div", { ref: e, className: t("p-6", a), ...r }));
c.displayName = "CardContent";
const l = o.forwardRef(({ className: a, ...r }, e) => /* @__PURE__ */ d(
  "div",
  {
    ref: e,
    className: t("flex items-center p-6 pt-0", a),
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
