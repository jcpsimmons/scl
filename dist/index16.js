import { jsx as r } from "react/jsx-runtime";
import * as o from "react";
import { cn as t } from "./index2.js";
const s = o.forwardRef(
  ({ className: e, type: f, ...i }, l) => /* @__PURE__ */ r(
    "input",
    {
      type: f,
      className: t(
        "flex h-10 w-full border border-[#00ff00] bg-black px-3 py-1 text-base text-[#00ff00] transition-colors file:-ml-3 file:-my-1 file:mr-4 file:h-10 file:px-3 file:border-0 file:border-r file:border-[#00ff00] file:bg-[#00ff00] file:text-black file:text-sm file:font-medium file:cursor-pointer hover:file:bg-black hover:file:text-[#00ff00] placeholder:text-[#00ff00]/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00ff00] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        e
      ),
      ref: l,
      ...i
    }
  )
);
s.displayName = "Input";
export {
  s as Input
};
