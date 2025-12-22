import { jsxs as a, jsx as t, Fragment as w } from "react/jsx-runtime";
import * as m from "react";
import { cn as n } from "./index2.js";
const y = {
  default: "bg-terminal-yellow text-black",
  insert: "bg-terminal-blue text-black",
  visual: "bg-terminal-magenta text-black",
  command: "bg-terminal-red text-black"
}, k = m.forwardRef(
  ({
    className: o,
    mode: f = "NORMAL",
    modeVariant: x = "default",
    filename: s,
    filetype: $,
    filetypeAbbr: R,
    encoding: S = "utf-8",
    line: e,
    column: r,
    totalLines: l,
    percentage: i,
    branch: d,
    diffStat: M,
    modified: h = !1,
    readonly: v = !1,
    leftContent: b,
    centerContent: p,
    rightContent: u,
    ...N
  }, g) => {
    const c = m.useMemo(() => {
      if (i !== void 0) return i;
      if (e !== void 0 && l !== void 0 && l > 0)
        return e <= 1 ? "Top" : e >= l ? "Bot" : `${Math.round(e / l * 100)}%`;
    }, [i, e, l]);
    return /* @__PURE__ */ a(
      "div",
      {
        ref: g,
        className: n(
          "flex h-6 w-full items-stretch font-mono text-sm bg-black text-white",
          o
        ),
        ...N,
        children: [
          /* @__PURE__ */ a("div", { className: "flex items-stretch", children: [
            /* @__PURE__ */ t(
              "div",
              {
                className: n(
                  "flex items-center px-3 font-bold",
                  y[x]
                ),
                children: f
              }
            ),
            b,
            d && /* @__PURE__ */ a("div", { className: "flex items-center px-2 text-white", children: [
              /* @__PURE__ */ t("span", { className: "mr-1", children: "⎇" }),
              d
            ] })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex flex-1 items-center px-3 bg-blue-800 mx-2", children: p || /* @__PURE__ */ t(w, { children: s && /* @__PURE__ */ a("span", { className: "text-white truncate", children: [
            s,
            h && /* @__PURE__ */ t("span", { className: "text-terminal-yellow ml-1", children: "[+]" }),
            v && /* @__PURE__ */ t("span", { className: "text-terminal-orange ml-1", children: "[RO]" })
          ] }) }) }),
          /* @__PURE__ */ a("div", { className: "flex items-stretch gap-2", children: [
            u,
            c !== void 0 && /* @__PURE__ */ t("div", { className: "flex items-center px-3 text-white", children: c }),
            (e !== void 0 || r !== void 0) && /* @__PURE__ */ t("div", { className: "flex items-center px-3 bg-terminal-yellow text-black font-bold", children: e !== void 0 && r !== void 0 ? `${e}:${r}` : e !== void 0 ? `Ln ${e}` : `Col ${r}` })
          ] })
        ]
      }
    );
  }
);
k.displayName = "Statusline";
export {
  k as Statusline
};
