import { jsx as o } from "react/jsx-runtime";
import * as t from "react";
import { cn as f } from "./index2.js";
const a = t.forwardRef(
  ({ className: r, type: e, ...i }, l) => /* @__PURE__ */ o(
    "input",
    {
      type: e,
      className: f(
        "flex h-10 w-full border-2 border-primary bg-black px-3 py-1 text-base text-primary transition-colors file:-ml-3 file:-my-1 file:mr-4 file:h-10 file:px-3 file:border-0 file:border-r file:border-primary file:bg-primary file:text-primary-foreground file:text-sm file:font-medium file:cursor-pointer hover:file:bg-black hover:file:text-primary placeholder:text-primary/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        r
      ),
      ref: l,
      ...i
    }
  )
);
a.displayName = "Input";
export {
  a as Input
};
