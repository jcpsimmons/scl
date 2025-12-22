import { jsx as d } from "react/jsx-runtime";
import * as o from "react";
import { cn as t } from "./index2.js";
const s = o.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d(
  "div",
  {
    ref: r,
    className: t(
      "rounded-xl border bg-card text-card-foreground shadow",
      a
    ),
    ...e
  }
));
s.displayName = "Card";
const i = o.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d(
  "div",
  {
    ref: r,
    className: t("flex flex-col space-y-1.5", a),
    ...e
  }
));
i.displayName = "CardHeader";
const f = o.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d(
  "div",
  {
    ref: r,
    className: t("bg-[#00ff00] text-black px-4 py-2 font-semibold leading-none tracking-tight w-full", a),
    ...e
  }
));
f.displayName = "CardTitle";
const l = o.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d(
  "div",
  {
    ref: r,
    className: t("text-sm text-muted-foreground", a),
    ...e
  }
));
l.displayName = "CardDescription";
const c = o.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d("div", { ref: r, className: t("p-6", a), ...e }));
c.displayName = "CardContent";
const m = o.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d(
  "div",
  {
    ref: r,
    className: t("flex items-center p-6 pt-0", a),
    ...e
  }
));
m.displayName = "CardFooter";
export {
  s as Card,
  c as CardContent,
  l as CardDescription,
  m as CardFooter,
  i as CardHeader,
  f as CardTitle
};
