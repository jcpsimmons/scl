import { jsx as l } from "react/jsx-runtime";
import * as o from "react";
import { Root as s, Image as t, Fallback as d } from "./index47.js";
import { cn as m } from "./index2.js";
const f = o.forwardRef(({ className: a, ...r }, e) => /* @__PURE__ */ l(
  s,
  {
    ref: e,
    className: m(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-primary",
      a
    ),
    ...r
  }
));
f.displayName = s.displayName;
const i = o.forwardRef(({ className: a, ...r }, e) => /* @__PURE__ */ l(
  t,
  {
    ref: e,
    className: m("aspect-square h-full w-full", a),
    ...r
  }
));
i.displayName = t.displayName;
const p = o.forwardRef(({ className: a, ...r }, e) => /* @__PURE__ */ l(
  d,
  {
    ref: e,
    className: m(
      "flex h-full w-full items-center justify-center rounded-full bg-background border border-primary text-primary",
      a
    ),
    ...r
  }
));
p.displayName = d.displayName;
export {
  f as Avatar,
  p as AvatarFallback,
  i as AvatarImage
};
