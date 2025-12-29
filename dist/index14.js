import { jsx as t, jsxs as i } from "react/jsx-runtime";
import * as o from "react";
import { Command as r } from "./index64.js";
import { cn as d } from "./index2.js";
import { Dialog as s, DialogContent as n } from "./index15.js";
import l from "./index65.js";
const p = o.forwardRef(({ className: e, ...a }, m) => /* @__PURE__ */ t(
  r,
  {
    ref: m,
    className: d(
      "flex h-full w-full flex-col overflow-hidden bg-black text-primary",
      e
    ),
    ...a
  }
));
p.displayName = r.displayName;
const v = ({ children: e, ...a }) => /* @__PURE__ */ t(s, { ...a, children: /* @__PURE__ */ t(n, { className: "overflow-hidden p-0", children: /* @__PURE__ */ t(p, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children: e }) }) }), c = o.forwardRef(({ className: e, ...a }, m) => /* @__PURE__ */ i("div", { className: "flex items-center border-b-2 border-primary bg-black px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ t(l, { className: "mr-2 h-4 w-4 shrink-0 text-primary opacity-50" }),
  /* @__PURE__ */ t(
    r.Input,
    {
      ref: m,
      className: d(
        "flex h-10 w-full bg-transparent py-3 text-sm text-primary outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ...a
    }
  )
] }));
c.displayName = r.Input.displayName;
const u = o.forwardRef(({ className: e, ...a }, m) => /* @__PURE__ */ t(
  r.List,
  {
    ref: m,
    className: d("max-h-[300px] overflow-y-auto overflow-x-hidden", e),
    ...a
  }
));
u.displayName = r.List.displayName;
const f = o.forwardRef((e, a) => /* @__PURE__ */ t(
  r.Empty,
  {
    ref: a,
    className: "py-6 text-center text-sm text-muted-foreground",
    ...e
  }
));
f.displayName = r.Empty.displayName;
const g = o.forwardRef(({ className: e, ...a }, m) => /* @__PURE__ */ t(
  r.Group,
  {
    ref: m,
    className: d(
      "overflow-hidden p-1 text-primary [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      e
    ),
    ...a
  }
));
g.displayName = r.Group.displayName;
const x = o.forwardRef(({ className: e, ...a }, m) => /* @__PURE__ */ t(
  r.Separator,
  {
    ref: m,
    className: d("-mx-1 h-px bg-primary", e),
    ...a
  }
));
x.displayName = r.Separator.displayName;
const y = o.forwardRef(({ className: e, ...a }, m) => /* @__PURE__ */ t(
  r.Item,
  {
    ref: m,
    className: d(
      "relative flex cursor-pointer select-none items-center px-2 py-1.5 text-sm text-primary outline-none",
      "data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      "aria-selected:bg-primary aria-selected:text-primary-foreground",
      e
    ),
    ...a
  }
));
y.displayName = r.Item.displayName;
const h = ({
  className: e,
  ...a
}) => /* @__PURE__ */ t(
  "span",
  {
    className: d(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      e
    ),
    ...a
  }
);
h.displayName = "CommandShortcut";
export {
  p as Command,
  v as CommandDialog,
  f as CommandEmpty,
  g as CommandGroup,
  c as CommandInput,
  y as CommandItem,
  u as CommandList,
  x as CommandSeparator,
  h as CommandShortcut
};
