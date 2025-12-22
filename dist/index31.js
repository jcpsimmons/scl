var D = Object.defineProperty;
var V = (t, e, r) => e in t ? D(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var F = (t, e, r) => V(t, typeof e != "symbol" ? e + "" : e, r);
import { jsxs as A, jsx as w } from "react/jsx-runtime";
import * as a from "react";
import { cn as C } from "./index2.js";
import { EditorView as u, ViewPlugin as H, keymap as K, lineNumbers as P, Decoration as v } from "./index64.js";
import { EditorState as N } from "./index65.js";
import { javascript as W } from "./index66.js";
import { html as z } from "./index67.js";
import { css as I } from "./index68.js";
import { json as O } from "./index69.js";
import { markdown as $ } from "./index70.js";
import { vim as q } from "./index71.js";
import { defaultKeymap as G, historyKeymap as J } from "./index72.js";
import { HighlightStyle as M, syntaxHighlighting as Q } from "./index73.js";
import { tags as o } from "./index74.js";
const U = v.line({
  attributes: { class: "cm-vim-empty-line" }
}), X = H.fromClass(
  class {
    constructor(t) {
      F(this, "decorations");
      this.decorations = this.buildDecorations(t);
    }
    update(t) {
      (t.docChanged || t.viewportChanged) && (this.decorations = this.buildDecorations(t.view));
    }
    buildDecorations(t) {
      const e = [], r = t.state.doc.lines;
      for (let i = r + 1; i <= r + 20; i++) {
        const m = t.state.doc.length;
        e.push(U.range(m));
      }
      return v.set(e, !0);
    }
  },
  {
    decorations: (t) => t.decorations
  }
), Y = a.forwardRef(
  ({
    className: t,
    visibleLines: e = 10,
    showLineNumbers: r = !0,
    value: i = "",
    onChange: m,
    onCursorChange: g,
    vimMode: l = !1,
    language: s = "none",
    placeholder: d,
    readOnly: b = !1
  }, E) => {
    const y = a.useRef(null), c = a.useRef(null), B = a.useCallback(() => {
      switch (s) {
        case "javascript":
        case "typescript":
          return W({ typescript: s === "typescript" });
        case "html":
          return z();
        case "css":
          return I();
        case "json":
          return O();
        case "markdown":
          return $();
        default:
          return null;
      }
    }, [s]), h = u.theme({
      "&": {
        backgroundColor: "#000000",
        color: "#00ff00",
        fontSize: "14px",
        fontFamily: "BigBlueTerm437, monospace !important",
        height: `${e * 1.5}rem`
      },
      ".cm-scroller": {
        fontFamily: "BigBlueTerm437, monospace !important"
      },
      ".cm-content": {
        caretColor: "#00ff00",
        padding: "0.5rem",
        fontFamily: "BigBlueTerm437, monospace !important"
      },
      ".cm-line": {
        fontFamily: "BigBlueTerm437, monospace !important"
      },
      ".cm-cursor": {
        borderLeftColor: "#00ff00",
        borderLeftWidth: "2px"
      },
      ".cm-activeLine": {
        backgroundColor: "rgba(0, 255, 0, 0.05)"
      },
      ".cm-selectionBackground": {
        backgroundColor: "rgba(0, 255, 0, 0.2) !important"
      },
      "&.cm-focused .cm-selectionBackground": {
        backgroundColor: "rgba(0, 255, 0, 0.3) !important"
      },
      ".cm-gutters": {
        backgroundColor: "#000000",
        color: "#ffff00",
        border: "none",
        borderRight: "1px solid #00ff00",
        fontFamily: "BigBlueTerm437, monospace !important"
      },
      ".cm-lineNumbers .cm-gutterElement": {
        padding: "0 0.5rem",
        minWidth: "3rem",
        textAlign: "right",
        fontFamily: "BigBlueTerm437, monospace !important"
      },
      ".cm-vim-empty-line::before": {
        content: '"~"',
        color: "#ff00ff",
        position: "absolute",
        left: "0.5rem",
        fontFamily: "BigBlueTerm437, monospace !important"
      },
      // Syntax highlighting colors (terminal palette)
      ".cm-keyword": { color: "#ff00ff", fontFamily: "BigBlueTerm437, monospace !important" },
      // magenta
      ".cm-string": { color: "#ffff00", fontFamily: "BigBlueTerm437, monospace !important" },
      // yellow
      ".cm-comment": { color: "#00ff00", opacity: "0.6", fontFamily: "BigBlueTerm437, monospace !important" },
      // dim green
      ".cm-number": { color: "#ff00ff", fontFamily: "BigBlueTerm437, monospace !important" },
      // magenta
      ".cm-variable": { color: "#00ff00", fontFamily: "BigBlueTerm437, monospace !important" },
      // green
      ".cm-operator": { color: "#ff0000", fontFamily: "BigBlueTerm437, monospace !important" },
      // red
      ".cm-propertyName": { color: "#00ffff", fontFamily: "BigBlueTerm437, monospace !important" },
      // cyan
      ".cm-typeName": { color: "#0000ff", fontFamily: "BigBlueTerm437, monospace !important" },
      // blue
      ".cm-function": { color: "#ffff00", fontFamily: "BigBlueTerm437, monospace !important" },
      // yellow
      ".cm-bracket": { color: "#00ff00", fontFamily: "BigBlueTerm437, monospace !important" }
      // green
    }), S = M.define([
      { tag: o.keyword, color: "#ff00ff" },
      { tag: o.string, color: "#ffff00" },
      { tag: o.comment, color: "#00ff00", opacity: "0.6" },
      { tag: o.number, color: "#ff00ff" },
      { tag: o.variableName, color: "#00ff00" },
      { tag: o.operator, color: "#ff0000" },
      { tag: o.propertyName, color: "#00ffff" },
      { tag: o.typeName, color: "#0000ff" },
      { tag: o.function(o.variableName), color: "#ffff00" },
      { tag: o.bracket, color: "#00ff00" },
      { tag: o.tagName, color: "#ff00ff" },
      { tag: o.attributeName, color: "#00ffff" },
      { tag: o.attributeValue, color: "#ffff00" }
    ]);
    return a.useEffect(() => {
      if (!y.current) return;
      const n = [
        h,
        Q(S),
        X,
        K.of([...G, ...J]),
        u.updateListener.of((f) => {
          if (f.docChanged) {
            const p = f.state.doc.toString();
            m == null || m(p);
          }
          if (f.selectionSet && g) {
            const p = f.state.selection.main, x = f.state.doc.lineAt(p.head), R = x.number, j = p.head - x.from + 1;
            g(R, j);
          }
        }),
        N.readOnly.of(b)
      ];
      r && n.push(P()), l && n.push(q());
      const T = B();
      T && n.push(T), d && n.push(
        u.contentAttributes.of({ "data-placeholder": d })
      );
      const L = N.create({
        doc: i,
        extensions: n
      }), k = new u({
        state: L,
        parent: y.current
      });
      return c.current = k, () => {
        k.destroy(), c.current = null;
      };
    }, [
      l,
      s,
      r,
      d,
      b,
      e,
      B,
      h,
      m,
      g
    ]), a.useEffect(() => {
      if (c.current) {
        const n = c.current.state.doc.toString();
        n !== i && c.current.dispatch({
          changes: {
            from: 0,
            to: n.length,
            insert: i
          }
        });
      }
    }, [i]), /* @__PURE__ */ A(
      "div",
      {
        ref: E,
        className: C(
          "font-mono text-sm bg-black border-2 border-terminal-green overflow-hidden",
          l && "vim-mode",
          t
        ),
        children: [
          /* @__PURE__ */ w("div", { ref: y }),
          l && /* @__PURE__ */ w("div", { className: "text-xs text-terminal-yellow px-2 py-1 border-t border-terminal-green bg-black", children: "VIM MODE ENABLED" })
        ]
      }
    );
  }
);
Y.displayName = "TerminalTextarea";
export {
  Y as TerminalTextarea
};
