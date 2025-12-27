var D = Object.defineProperty;
var V = (o, e, r) => e in o ? D(o, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : o[e] = r;
var F = (o, e, r) => V(o, typeof e != "symbol" ? e + "" : e, r);
import { jsxs as A, jsx as N } from "react/jsx-runtime";
import * as c from "react";
import { cn as C } from "./index2.js";
import { EditorView as u, ViewPlugin as H, keymap as K, lineNumbers as P, Decoration as v } from "./index55.js";
import { EditorState as w } from "./index56.js";
import { javascript as W } from "./index57.js";
import { html as z } from "./index58.js";
import { css as I } from "./index59.js";
import { json as O } from "./index60.js";
import { markdown as $ } from "./index61.js";
import { vim as q } from "./index62.js";
import { defaultKeymap as G, historyKeymap as J } from "./index63.js";
import { HighlightStyle as M, syntaxHighlighting as Q } from "./index64.js";
import { tags as t } from "./index65.js";
const U = v.line({
  attributes: { class: "cm-vim-empty-line" }
}), X = H.fromClass(
  class {
    constructor(o) {
      F(this, "decorations");
      this.decorations = this.buildDecorations(o);
    }
    update(o) {
      (o.docChanged || o.viewportChanged) && (this.decorations = this.buildDecorations(o.view));
    }
    buildDecorations(o) {
      const e = [], r = o.state.doc.lines;
      for (let i = r + 1; i <= r + 20; i++) {
        const m = o.state.doc.length;
        e.push(U.range(m));
      }
      return v.set(e, !0);
    }
  },
  {
    decorations: (o) => o.decorations
  }
), Y = c.forwardRef(
  ({
    className: o,
    visibleLines: e = 10,
    showLineNumbers: r = !0,
    value: i = "",
    onChange: m,
    onCursorChange: g,
    vimMode: s = !1,
    language: l = "none",
    placeholder: d,
    readOnly: b = !1
  }, E) => {
    const y = c.useRef(null), a = c.useRef(null), B = c.useCallback(() => {
      switch (l) {
        case "javascript":
        case "typescript":
          return W({ typescript: l === "typescript" });
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
    }, [l]), h = u.theme({
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
      { tag: t.keyword, color: "#ff00ff" },
      { tag: t.string, color: "#ffff00" },
      { tag: t.comment, color: "#00ff00", opacity: "0.6" },
      { tag: t.number, color: "#ff00ff" },
      { tag: t.variableName, color: "#00ff00" },
      { tag: t.operator, color: "#ff0000" },
      { tag: t.propertyName, color: "#00ffff" },
      { tag: t.typeName, color: "#0000ff" },
      { tag: t.function(t.variableName), color: "#ffff00" },
      { tag: t.bracket, color: "#00ff00" },
      { tag: t.tagName, color: "#ff00ff" },
      { tag: t.attributeName, color: "#00ffff" },
      { tag: t.attributeValue, color: "#ffff00" }
    ]);
    return c.useEffect(() => {
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
        w.readOnly.of(b)
      ];
      r && n.push(P()), s && n.push(q());
      const T = B();
      T && n.push(T), d && n.push(
        u.contentAttributes.of({ "data-placeholder": d })
      );
      const L = w.create({
        doc: i,
        extensions: n
      }), k = new u({
        state: L,
        parent: y.current
      });
      return a.current = k, () => {
        k.destroy(), a.current = null;
      };
    }, [
      s,
      l,
      r,
      d,
      b,
      e,
      B,
      h,
      m,
      g
    ]), c.useEffect(() => {
      if (a.current) {
        const n = a.current.state.doc.toString();
        n !== i && a.current.dispatch({
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
          "font-mono text-sm bg-background border-2 border-primary overflow-hidden",
          s && "vim-mode",
          o
        ),
        children: [
          /* @__PURE__ */ N("div", { ref: y }),
          s && /* @__PURE__ */ N("div", { className: "text-xs text-secondary px-2 py-1 border-t border-primary bg-background", children: "VIM MODE ENABLED" })
        ]
      }
    );
  }
);
Y.displayName = "TerminalTextarea";
export {
  Y as TerminalTextarea
};
