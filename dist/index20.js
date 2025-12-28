import { jsx as m } from "react/jsx-runtime";
import * as t from "react";
import { Root as o } from "./index81.js";
import { cva as i } from "./index45.js";
import { cn as s } from "./index2.js";
const l = i(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
), p = t.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ m(
  o,
  {
    ref: r,
    className: s(l(), a),
    ...e
  }
));
p.displayName = o.displayName;
export {
  p as Label
};
