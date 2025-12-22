import { jsx as e } from "react/jsx-runtime";
import * as i from "react";
import { Root as t, Item as s, Indicator as c } from "./index53.js";
import { cn as l } from "./index2.js";
import f from "./index51.js";
const d = i.forwardRef(({ className: r, ...a }, o) => /* @__PURE__ */ e(
  t,
  {
    className: l("grid gap-2", r),
    ...a,
    ref: o
  }
));
d.displayName = t.displayName;
const m = i.forwardRef(({ className: r, ...a }, o) => /* @__PURE__ */ e(
  s,
  {
    ref: o,
    className: l(
      "h-6 w-6 rounded-full border-2 border-[#00ff00] bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00ff00] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#00ff00] flex items-center justify-center",
      r
    ),
    ...a,
    children: /* @__PURE__ */ e(c, { className: "flex items-center justify-center", children: /* @__PURE__ */ e(f, { className: "h-3 w-3 fill-black text-black" }) })
  }
));
m.displayName = s.displayName;
export {
  d as RadioGroup,
  m as RadioGroupItem
};
