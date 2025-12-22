import { jsx as f } from "react/jsx-runtime";
import * as b from "react";
import { Root as i } from "./index47.js";
import { cva as l } from "./index46.js";
import { cn as g } from "./index2.js";
const s = l(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-30 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-terminal-green text-black border-2 border-terminal-green hover:bg-terminal-green/90 active:bg-terminal-green/80",
        secondary: "bg-transparent text-terminal-magenta border-2 border-terminal-magenta hover:bg-terminal-magenta/10 active:bg-terminal-magenta/20",
        destructive: "bg-transparent text-terminal-red border-2 border-terminal-red hover:bg-terminal-red/10 active:bg-terminal-red/20",
        outline: "bg-transparent text-terminal-green border-2 border-terminal-green hover:bg-terminal-green/10 active:bg-terminal-green/20",
        ghost: "bg-transparent text-terminal-green border-2 border-transparent hover:border-terminal-green/50 active:bg-terminal-green/10",
        link: "bg-transparent text-terminal-green underline-offset-4 hover:underline border-none",
        green: "bg-[#00ff00] text-black border-2 border-[#00ff00] hover:bg-black hover:text-[#00ff00]",
        "green-outline": "bg-transparent text-[#00ff00] border-2 border-[#00ff00] hover:bg-[#00ff00] hover:text-black",
        white: "bg-white text-black border-2 border-white hover:bg-black hover:text-white",
        "white-outline": "bg-transparent text-white border-2 border-white hover:bg-white hover:text-black",
        yellow: "bg-[#ffff00] text-black border-2 border-[#ffff00] hover:bg-black hover:text-[#ffff00]",
        "yellow-outline": "bg-transparent text-[#ffff00] border-2 border-[#ffff00] hover:bg-[#ffff00] hover:text-black",
        hotpink: "bg-[#ff00ff] text-black border-2 border-[#ff00ff] hover:bg-black hover:text-[#ff00ff]",
        "hotpink-outline": "bg-transparent text-[#ff00ff] border-2 border-[#ff00ff] hover:bg-[#ff00ff] hover:text-black",
        blue: "bg-[#0000ff] text-white border-2 border-[#0000ff] hover:bg-black hover:text-[#0000ff]",
        "blue-outline": "bg-transparent text-[#0000ff] border-2 border-[#0000ff] hover:bg-[#0000ff] hover:text-white"
      },
      size: {
        default: "h-11 px-6 py-3 text-sm",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-14 px-10 py-4 text-base",
        icon: "h-11 w-11"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), d = b.forwardRef(
  ({ className: e, variant: r, size: t, asChild: n = !1, ...o }, a) => /* @__PURE__ */ f(
    n ? i : "button",
    {
      className: g(s({ variant: r, size: t, className: e })),
      ref: a,
      ...o
    }
  )
);
d.displayName = "Button";
export {
  d as Button,
  s as buttonVariants
};
