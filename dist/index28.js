import { jsx as m } from "react/jsx-runtime";
import { cn as o } from "./index2.js";
function n({
  className: r,
  ...e
}) {
  return /* @__PURE__ */ m(
    "div",
    {
      className: o("animate-pulse bg-primary/25", r),
      ...e
    }
  );
}
export {
  n as Skeleton
};
