import { jsx as l } from "react/jsx-runtime";
import * as f from "react";
import { Root as s, Image as t, Fallback as m } from "./index58.js";
import { cn as o } from "./index2.js";
const d = f.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ l(
  s,
  {
    ref: r,
    className: o(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#00ff00]",
      a
    ),
    ...e
  }
));
d.displayName = s.displayName;
const i = f.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ l(
  t,
  {
    ref: r,
    className: o("aspect-square h-full w-full", a),
    ...e
  }
));
i.displayName = t.displayName;
const c = f.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ l(
  m,
  {
    ref: r,
    className: o(
      "flex h-full w-full items-center justify-center rounded-full bg-black border border-[#00ff00] text-[#00ff00]",
      a
    ),
    ...e
  }
));
c.displayName = m.displayName;
export {
  d as Avatar,
  c as AvatarFallback,
  i as AvatarImage
};
