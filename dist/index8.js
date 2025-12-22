import { jsx as r } from "react/jsx-runtime";
import { cva as o } from "./index46.js";
import { cn as b } from "./index2.js";
const a = o(
  "inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-[#00ff00] bg-[#00ff00] text-black shadow hover:bg-black hover:text-[#00ff00]",
        secondary: "border-[#ff00ff] bg-[#ff00ff] text-black hover:bg-black hover:text-[#ff00ff]",
        destructive: "border-[#ff0000] bg-[#ff0000] text-black shadow hover:bg-black hover:text-[#ff0000]",
        outline: "text-foreground",
        green: "border-[#00ff00] bg-[#00ff00] text-black hover:bg-black hover:text-[#00ff00]",
        white: "border-white bg-white text-black hover:bg-black hover:text-white",
        yellow: "border-[#ffff00] bg-[#ffff00] text-black hover:bg-black hover:text-[#ffff00]",
        hotpink: "border-[#ff00ff] bg-[#ff00ff] text-black hover:bg-black hover:text-[#ff00ff]",
        blue: "border-[#0000ff] bg-[#0000ff] text-white hover:bg-black hover:text-[#0000ff] hover:border-[#0000ff]"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function n({ className: f, variant: e, ...t }) {
  return /* @__PURE__ */ r("div", { className: b(a({ variant: e }), f), ...t });
}
export {
  n as Badge,
  a as badgeVariants
};
