import { jsx as n } from "react/jsx-runtime";
import { cn as t } from "./index2.js";
function i({
  className: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      className: t("animate-pulse bg-terminal-green/25", e),
      ...r
    }
  );
}
export {
  i as Skeleton
};
