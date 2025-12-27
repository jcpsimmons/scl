import { jsxs as o, jsx as e } from "react/jsx-runtime";
import * as h from "react";
import { cn as f } from "./index2.js";
import { Popover as v, PopoverTrigger as C, PopoverContent as S } from "./index21.js";
import { Button as O } from "./index9.js";
import j from "./index86.js";
import { Command as k, CommandInput as P, CommandList as R, CommandEmpty as B, CommandGroup as I, CommandItem as L } from "./index14.js";
import M from "./index47.js";
const D = h.forwardRef(
  ({
    options: s,
    value: l,
    onValueChange: c,
    placeholder: b = "Select option...",
    searchPlaceholder: w = "Search...",
    emptyText: x = "No option found.",
    className: N,
    disabled: u = !1
  }, t) => {
    const [m, i] = h.useState(!1), d = s.find((a) => a.value === l);
    return /* @__PURE__ */ o(v, { open: m, onOpenChange: i, children: [
      /* @__PURE__ */ e(C, { asChild: !0, children: /* @__PURE__ */ o(
        O,
        {
          ref: t,
          variant: "outline",
          role: "combobox",
          "aria-expanded": m,
          className: f("w-[200px] justify-between", N),
          disabled: u,
          children: [
            d ? d.label : b,
            /* @__PURE__ */ e(j, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
          ]
        }
      ) }),
      /* @__PURE__ */ e(S, { className: "w-[200px] p-0", children: /* @__PURE__ */ o(k, { children: [
        /* @__PURE__ */ e(P, { placeholder: w }),
        /* @__PURE__ */ o(R, { children: [
          /* @__PURE__ */ e(B, { children: x }),
          /* @__PURE__ */ e(I, { children: s.map((a) => /* @__PURE__ */ o(
            L,
            {
              value: a.value,
              onSelect: (n) => {
                c == null || c(n === l ? "" : n), i(!1);
              },
              disabled: a.disabled,
              children: [
                /* @__PURE__ */ e(
                  M,
                  {
                    className: f(
                      "mr-2 h-4 w-4",
                      l === a.value ? "opacity-100" : "opacity-0"
                    )
                  }
                ),
                a.label
              ]
            },
            a.value
          )) })
        ] })
      ] }) })
    ] });
  }
);
D.displayName = "Combobox";
const E = h.forwardRef(
  ({
    options: s,
    value: l = [],
    onValueChange: c,
    placeholder: b = "Select options...",
    searchPlaceholder: w = "Search...",
    emptyText: x = "No option found.",
    className: N,
    disabled: u = !1,
    maxSelected: t
  }, m) => {
    const [i, d] = h.useState(!1), a = l.map((r) => {
      var p;
      return (p = s.find((y) => y.value === r)) == null ? void 0 : p.label;
    }).filter(Boolean).join(", "), n = (r) => {
      const p = l.includes(r) ? l.filter((y) => y !== r) : t && l.length >= t ? l : [...l, r];
      c == null || c(p);
    };
    return /* @__PURE__ */ o(v, { open: i, onOpenChange: d, children: [
      /* @__PURE__ */ e(C, { asChild: !0, children: /* @__PURE__ */ o(
        O,
        {
          ref: m,
          variant: "outline",
          role: "combobox",
          "aria-expanded": i,
          className: f("w-[200px] justify-between", N),
          disabled: u,
          children: [
            /* @__PURE__ */ e("span", { className: "truncate", children: a || b }),
            /* @__PURE__ */ e(j, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
          ]
        }
      ) }),
      /* @__PURE__ */ e(S, { className: "w-[200px] p-0", children: /* @__PURE__ */ o(k, { children: [
        /* @__PURE__ */ e(P, { placeholder: w }),
        /* @__PURE__ */ o(R, { children: [
          /* @__PURE__ */ e(B, { children: x }),
          /* @__PURE__ */ e(I, { children: s.map((r) => /* @__PURE__ */ o(
            L,
            {
              value: r.value,
              onSelect: () => n(r.value),
              disabled: r.disabled,
              children: [
                /* @__PURE__ */ e(
                  M,
                  {
                    className: f(
                      "mr-2 h-4 w-4",
                      l.includes(r.value) ? "opacity-100" : "opacity-0"
                    )
                  }
                ),
                r.label
              ]
            },
            r.value
          )) })
        ] })
      ] }) })
    ] });
  }
);
E.displayName = "ComboboxMulti";
export {
  D as Combobox,
  E as ComboboxMulti
};
