import { jsx as o } from "react/jsx-runtime";
import { cva as n } from "./index47.js";
import { cn as a } from "./index2.js";
const i = n(
  "inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground hover:bg-background hover:text-primary",
        secondary: "border-secondary bg-secondary text-secondary-foreground hover:bg-background hover:text-secondary",
        destructive: "border-destructive bg-destructive text-destructive-foreground hover:bg-background hover:text-destructive",
        outline: "border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function u({ className: r, variant: e, ...t }) {
  return /* @__PURE__ */ o("div", { className: a(i({ variant: e }), r), ...t });
}
export {
  u as Badge,
  i as badgeVariants
};
