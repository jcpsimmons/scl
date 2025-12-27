import { jsx as t } from "react/jsx-runtime";
import * as l from "react";
import { cn as r } from "./index2.js";
const d = l.forwardRef(({ className: e, ...a }, o) => /* @__PURE__ */ t("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ t(
  "table",
  {
    ref: o,
    className: r("w-full caption-bottom text-sm", e),
    ...a
  }
) }));
d.displayName = "Table";
const s = l.forwardRef(({ className: e, ...a }, o) => /* @__PURE__ */ t("thead", { ref: o, className: r("[&_tr]:border-b", e), ...a }));
s.displayName = "TableHeader";
const m = l.forwardRef(({ className: e, ...a }, o) => /* @__PURE__ */ t(
  "tbody",
  {
    ref: o,
    className: r("[&_tr:last-child]:border-0", e),
    ...a
  }
));
m.displayName = "TableBody";
const b = l.forwardRef(({ className: e, ...a }, o) => /* @__PURE__ */ t(
  "tfoot",
  {
    ref: o,
    className: r(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      e
    ),
    ...a
  }
));
b.displayName = "TableFooter";
const c = l.forwardRef(({ className: e, ...a }, o) => /* @__PURE__ */ t(
  "tr",
  {
    ref: o,
    className: r(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      e
    ),
    ...a
  }
));
c.displayName = "TableRow";
const f = l.forwardRef(({ className: e, ...a }, o) => /* @__PURE__ */ t(
  "th",
  {
    ref: o,
    className: r(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      e
    ),
    ...a
  }
));
f.displayName = "TableHead";
const i = l.forwardRef(({ className: e, ...a }, o) => /* @__PURE__ */ t(
  "td",
  {
    ref: o,
    className: r(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      e
    ),
    ...a
  }
));
i.displayName = "TableCell";
const n = l.forwardRef(({ className: e, ...a }, o) => /* @__PURE__ */ t(
  "caption",
  {
    ref: o,
    className: r("mt-4 text-sm text-muted-foreground", e),
    ...a
  }
));
n.displayName = "TableCaption";
export {
  d as Table,
  m as TableBody,
  n as TableCaption,
  i as TableCell,
  b as TableFooter,
  f as TableHead,
  s as TableHeader,
  c as TableRow
};
