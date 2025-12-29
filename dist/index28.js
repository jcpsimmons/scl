import { jsx as i } from "react/jsx-runtime";
import { cn as m } from "./index2.js";
function a({
  className: r,
  blink: e = !0,
  ...o
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: m(
        "border border-primary/30 bg-primary/10",
        e && "animate-blink",
        r
      ),
      ...o
    }
  );
}
export {
  a as Skeleton
};
