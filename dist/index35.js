import { jsx as o } from "react/jsx-runtime";
import * as t from "react";
import { cn as i } from "./index2.js";
const s = t.forwardRef(
  ({ className: r, ...e }, a) => /* @__PURE__ */ o(
    "textarea",
    {
      className: i(
        "flex min-h-[60px] w-full border border-primary bg-background text-primary px-3 py-2 text-base placeholder:text-primary/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
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
