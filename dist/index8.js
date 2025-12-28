import { jsx as o } from "react/jsx-runtime";
import { cva as n } from "./index45.js";
import { cn as a } from "./index2.js";
const i = n(
  "inline-flex items-center border-2 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Filled variants (color bg, black text)
        default: "border-primary bg-primary text-primary-foreground",
        secondary: "border-secondary bg-secondary text-secondary-foreground",
        destructive: "border-destructive bg-destructive text-destructive-foreground",
        // Outline variants (transparent bg, color text/border)
        outline: "border-primary bg-transparent text-primary",
        "secondary-outline": "border-secondary bg-transparent text-secondary",
        "destructive-outline": "border-destructive bg-transparent text-destructive"
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
