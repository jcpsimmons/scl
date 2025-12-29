import { jsxs as a, jsx as e } from "react/jsx-runtime";
import * as h from "react";
import { cn as f } from "./index2.js";
import { Popover as v, PopoverTrigger as C, PopoverContent as S } from "./index21.js";
import { Button as O } from "./index9.js";
import j from "./index75.js";
import { Command as k, CommandInput as P, CommandList as R, CommandEmpty as B, CommandGroup as I, CommandItem as L } from "./index14.js";
import M from "./index59.js";
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
  }, i) => {
    const [n, t] = h.useState(!1), m = s.find((o) => o.value === l);
    return /* @__PURE__ */ a(v, { open: n, onOpenChange: t, children: [
      /* @__PURE__ */ e(C, { asChild: !0, children: /* @__PURE__ */ a(
        O,
        {
          ref: i,
          variant: "outline",
          role: "combobox",
          "aria-expanded": n,
          className: f("w-[200px] justify-between", N),
          disabled: u,
          children: [
            /* @__PURE__ */ e("span", { className: "truncate", children: m ? m.label : b }),
            /* @__PURE__ */ e(j, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
          ]
        }
      ) }),
      /* @__PURE__ */ e(S, { className: "w-[200px] p-0", children: /* @__PURE__ */ a(k, { children: [
        /* @__PURE__ */ e(P, { placeholder: w }),
        /* @__PURE__ */ a(R, { children: [
          /* @__PURE__ */ e(B, { children: x }),
          /* @__PURE__ */ e(I, { children: s.map((o) => /* @__PURE__ */ a(
            L,
            {
              value: o.value,
              onSelect: (d) => {
                c == null || c(d === l ? "" : d), t(!1);
              },
              disabled: o.disabled,
              children: [
                /* @__PURE__ */ e(
                  M,
                  {
                    className: f(
                      "mr-2 h-4 w-4",
                      l === o.value ? "opacity-100" : "opacity-0"
                    )
                  }
                ),
                o.label
              ]
            },
            o.value
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
    maxSelected: i
  }, n) => {
    const [t, m] = h.useState(!1), o = l.map((r) => {
      var p;
      return (p = s.find((y) => y.value === r)) == null ? void 0 : p.label;
    }).filter(Boolean).join(", "), d = (r) => {
      const p = l.includes(r) ? l.filter((y) => y !== r) : i && l.length >= i ? l : [...l, r];
      c == null || c(p);
    };
    return /* @__PURE__ */ a(v, { open: t, onOpenChange: m, children: [
      /* @__PURE__ */ e(C, { asChild: !0, children: /* @__PURE__ */ a(
        O,
        {
          ref: n,
          variant: "outline",
          role: "combobox",
          "aria-expanded": t,
          className: f("w-[200px] justify-between", N),
          disabled: u,
          children: [
            /* @__PURE__ */ e("span", { className: "truncate", children: o || b }),
            /* @__PURE__ */ e(j, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
          ]
        }
      ) }),
      /* @__PURE__ */ e(S, { className: "w-[200px] p-0", children: /* @__PURE__ */ a(k, { children: [
        /* @__PURE__ */ e(P, { placeholder: w }),
        /* @__PURE__ */ a(R, { children: [
          /* @__PURE__ */ e(B, { children: x }),
          /* @__PURE__ */ e(I, { children: s.map((r) => /* @__PURE__ */ a(
            L,
            {
              value: r.value,
              onSelect: () => d(r.value),
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
