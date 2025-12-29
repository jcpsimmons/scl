import { jsxs as w, jsx as i } from "react/jsx-runtime";
import * as m from "react";
import { cn as f } from "./index2.js";
const S = m.forwardRef(
  ({
    className: p,
    visibleLines: h = 10,
    showLineNumbers: g = !0,
    value: d = "",
    onChange: l,
    onCursorChange: u,
    placeholder: b,
    readOnly: x = !1
  }, y) => {
    const e = m.useRef(null), n = m.useRef(null), o = d.split(`
`).length, k = () => {
      e.current && n.current && (n.current.scrollTop = e.current.scrollTop);
    }, s = () => {
      if (e.current && u) {
        const t = e.current, a = t.value.substring(0, t.selectionStart).split(`
`), T = a.length, v = a[a.length - 1].length + 1;
        u(T, v);
      }
    }, N = (t) => {
      l == null || l(t.target.value);
    }, c = 1.5, R = h * c;
    return /* @__PURE__ */ w(
      "div",
      {
        ref: y,
        className: f(
          "flex font-mono text-sm bg-black border-2 border-primary overflow-hidden",
          p
        ),
        style: { height: `${R}rem` },
        children: [
          g && /* @__PURE__ */ i(
            "div",
            {
              ref: n,
              className: "flex-shrink-0 overflow-hidden select-none bg-black border-r border-primary text-yellow-400 text-right",
              style: { width: "3rem" },
              children: Array.from({ length: Math.max(o, h) }, (t, r) => /* @__PURE__ */ i(
                "div",
                {
                  className: f(
                    "px-2 leading-6",
                    r >= o && "text-blue-500"
                  ),
                  style: { height: `${c}rem` },
                  children: r < o ? r + 1 : "~"
                },
                r
              ))
            }
          ),
          /* @__PURE__ */ i(
            "textarea",
            {
              ref: e,
              value: d,
              onChange: N,
              onScroll: k,
              onSelect: s,
              onKeyUp: s,
              onClick: s,
              placeholder: b,
              readOnly: x,
              spellCheck: !1,
              className: f(
                "flex-1 bg-black text-primary resize-none outline-none p-2 leading-6",
                "placeholder:text-primary/50",
                x && "cursor-default"
              ),
              style: {
                lineHeight: `${c}rem`,
                fontFamily: "inherit"
              }
            }
          )
        ]
      }
    );
  }
);
S.displayName = "TerminalTextarea";
export {
  S as TerminalTextarea
};
