import { jsxs as l, jsx as e, Fragment as h } from "react/jsx-runtime";
import * as u from "react";
import { cn as r } from "./index2.js";
const B = {
  default: {
    bg: "bg-blue-600",
    fg: "text-yellow-300",
    label: "NORMAL"
  },
  insert: {
    bg: "bg-green-600",
    fg: "text-black",
    label: "INSERT"
  },
  visual: {
    bg: "bg-fuchsia-500",
    fg: "text-black",
    label: "VISUAL"
  },
  command: {
    bg: "bg-red-600",
    fg: "text-white",
    label: "COMMAND"
  }
}, p = ({
  direction: m = "right",
  fromBg: i,
  toBg: d
}) => m === "right" ? /* @__PURE__ */ e(
  "span",
  {
    className: r("inline-flex items-center", d),
    style: { fontSize: "1.5rem", lineHeight: 1 },
    children: /* @__PURE__ */ e("span", { className: i.replace("bg-", "text-") })
  }
) : /* @__PURE__ */ e(
  "span",
  {
    className: r("inline-flex items-center", i),
    style: { fontSize: "1.5rem", lineHeight: 1 },
    children: /* @__PURE__ */ e("span", { className: d.replace("bg-", "text-") })
  }
), C = u.forwardRef(
  ({
    className: m,
    mode: i,
    modeVariant: d = "default",
    filename: o,
    filetype: f,
    filetypeAbbr: g,
    encoding: N = "utf-8",
    line: t,
    column: c,
    totalLines: a,
    percentage: n,
    branch: x,
    diffStat: O,
    modified: v = !1,
    readonly: y = !1,
    leftContent: w,
    centerContent: S,
    rightContent: M,
    ...R
  }, $) => {
    const s = B[d], A = i || s.label, b = u.useMemo(() => {
      if (n !== void 0) return n;
      if (t !== void 0 && a !== void 0 && a > 0)
        return t <= 1 ? "Top" : t >= a ? "Bot" : `${Math.round(t / a * 100)}%`;
    }, [n, t, a]);
    return /* @__PURE__ */ l(
      "div",
      {
        ref: $,
        className: r(
          "flex h-6 w-full items-stretch font-mono text-sm",
          m
        ),
        ...R,
        children: [
          /* @__PURE__ */ l("div", { className: "flex items-stretch", children: [
            /* @__PURE__ */ e(
              "div",
              {
                className: r(
                  "flex items-center px-2 font-bold",
                  s.bg,
                  s.fg
                ),
                children: A
              }
            ),
            /* @__PURE__ */ e(p, { fromBg: s.bg, toBg: "bg-muted" }),
            w,
            x && /* @__PURE__ */ e(h, { children: /* @__PURE__ */ l("div", { className: "flex items-center px-2 bg-muted text-yellow-400", children: [
              /* @__PURE__ */ e("span", { className: "mr-1" }),
              x
            ] }) })
          ] }),
          /* @__PURE__ */ e("div", { className: "flex flex-1 items-center px-3 bg-muted", children: S || /* @__PURE__ */ l(h, { children: [
            /* @__PURE__ */ e("span", { className: "mr-1 text-muted-foreground" }),
            o && /* @__PURE__ */ l("span", { className: "text-primary truncate", children: [
              o,
              v && /* @__PURE__ */ e("span", { className: "text-yellow-400 ml-1", children: "[+]" }),
              y && /* @__PURE__ */ e("span", { className: "text-red-500 ml-1", children: "[RO]" })
            ] })
          ] }) }),
          /* @__PURE__ */ l("div", { className: "flex items-stretch", children: [
            M,
            (f || g) && /* @__PURE__ */ l("div", { className: "flex items-center px-2 bg-muted text-cyan-400", children: [
              /* @__PURE__ */ e("span", { className: "mr-1" }),
              g || f
            ] }),
            /* @__PURE__ */ e("div", { className: "flex items-center px-2 bg-muted text-muted-foreground", children: N }),
            /* @__PURE__ */ e(p, { direction: "left", fromBg: s.bg, toBg: "bg-muted" }),
            b !== void 0 && /* @__PURE__ */ e(
              "div",
              {
                className: r(
                  "flex items-center px-2 font-bold",
                  s.bg,
                  s.fg
                ),
                children: b
              }
            ),
            (t !== void 0 || c !== void 0) && /* @__PURE__ */ e(
              "div",
              {
                className: r(
                  "flex items-center px-2 font-bold",
                  s.bg,
                  s.fg
                ),
                children: t !== void 0 && c !== void 0 ? `${t}:${c}` : t !== void 0 ? `Ln ${t}` : `Col ${c}`
              }
            )
          ] })
        ]
      }
    );
  }
);
C.displayName = "Statusline";
export {
  C as Statusline
};
