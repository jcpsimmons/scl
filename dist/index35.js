import { jsx as t } from "react/jsx-runtime";
import * as i from "react";
import { cn as o } from "./index2.js";
const s = i.forwardRef(
  ({ className: r, ...e }, a) => /* @__PURE__ */ t(
    "textarea",
    {
      className: o(
        "flex min-h-[60px] w-full border-2 border-primary bg-black text-primary px-3 py-2 text-base placeholder:text-primary/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        r
      ),
      ref: a,
      ...e
    }
  )
);
s.displayName = "Textarea";
export {
  s as Textarea
};
