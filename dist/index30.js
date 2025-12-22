import { jsx as i } from "react/jsx-runtime";
import * as s from "react";
import { Root as c, List as n, Trigger as o, Content as d } from "./index78.js";
import { cn as r } from "./index2.js";
const p = c, f = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ i(
  n,
  {
    ref: a,
    className: r(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      e
    ),
    ...t
  }
));
f.displayName = n.displayName;
const l = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ i(
  o,
  {
    ref: a,
    className: r(
      "inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-black data-[state=active]:text-terminal-green data-[state=active]:border-2 data-[state=active]:border-terminal-green data-[state=inactive]:border-2 data-[state=inactive]:border-transparent data-[state=inactive]:text-muted-foreground",
      e
    ),
    ...t
  }
));
l.displayName = o.displayName;
const m = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ i(
  d,
  {
    ref: a,
    className: r(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      e
    ),
    ...t
  }
));
m.displayName = d.displayName;
export {
  p as Tabs,
  m as TabsContent,
  f as TabsList,
  l as TabsTrigger
};
