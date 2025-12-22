import { jsx as o } from "react/jsx-runtime";
import * as a from "react";
import { cn as f } from "./index2.js";
const i = a.forwardRef(
  ({ className: e, ...r }, t) => /* @__PURE__ */ o(
    "textarea",
    {
      className: f(
        "flex min-h-[60px] w-full border border-[#00ff00] bg-black text-[#00ff00] px-3 py-2 text-base placeholder:text-[#00ff00]/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00ff00] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        e
      ),
      ref: t,
      ...r
    }
  )
);
i.displayName = "Textarea";
export {
  i as Textarea
};
