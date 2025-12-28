import { jsx as t } from "react/jsx-runtime";
import { cn as a } from "./index2.js";
function i({
  className: r,
  ...e
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: a(
        "relative overflow-hidden border border-primary/30 bg-primary/10",
        // Scanline animation effect
        "after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:via-primary/20 after:to-transparent after:animate-scanline",
        r
      ),
      ...e
    }
  );
}
export {
  i as Skeleton
};
