import { jsx as e } from "react/jsx-runtime";
import * as s from "react";
import { Checkbox as t, CheckboxIndicator as a } from "./index76.js";
import { cn as r } from "./index2.js";
import l from "./index50.js";
const f = s.forwardRef(({ className: c, ...o }, i) => /* @__PURE__ */ e(
  t,
  {
    ref: i,
    className: r(
      "peer h-6 w-6 shrink-0 border-2 border-[#00ff00] bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#00ff00] data-[state=checked]:text-black flex items-center justify-center",
      c
    ),
    ...o,
    children: /* @__PURE__ */ e(
      a,
      {
        className: r("flex items-center justify-center text-current"),
        children: /* @__PURE__ */ e(l, { className: "h-5 w-5" })
      }
    )
  }
));
f.displayName = t.displayName;
export {
  f as Checkbox
};
