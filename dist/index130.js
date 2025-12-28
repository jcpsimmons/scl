import { Annotation as $, Transaction as P, Text as A, StateEffect as x, StateField as C, Prec as O, EditorSelection as k, Facet as D, MapMode as S, RangeValue as L } from "./index63.js";
import { EditorView as w, Decoration as g, keymap as M, WidgetType as j } from "./index62.js";
import { syntaxTree as R, indentUnit as V } from "./index71.js";
function v(o) {
  let t = Object.keys(o).join(""), e = /\w/.test(t);
  return e && (t = t.replace(/\w/g, "")), `[${e ? "\\w" : ""}${t.replace(/[^\w\s]/g, "\\$&")}]`;
}
function W(o) {
  let t = /* @__PURE__ */ Object.create(null), e = /* @__PURE__ */ Object.create(null);
  for (let { label: i } of o) {
    t[i[0]] = !0;
    for (let l = 1; l < i.length; l++)
      e[i[l]] = !0;
  }
  let n = v(t) + v(e) + "*$";
  return [new RegExp("^" + n), new RegExp(n)];
}
function ne(o) {
  let t = o.map((i) => typeof i == "string" ? { label: i } : i), [e, n] = t.every((i) => /^\w+$/.test(i.label)) ? [/\w*$/, /\w+$/] : W(t);
  return (i) => {
    let l = i.matchBefore(n);
    return l || i.explicit ? { from: l ? l.from : i.pos, options: t, validFor: e } : null;
  };
}
function oe(o, t) {
  return (e) => {
    for (let n = R(e.state).resolveInner(e.pos, -1); n; n = n.parent) {
      if (o.indexOf(n.name) > -1)
        return null;
      if (n.type.isTop)
        break;
    }
    return t(e);
  };
}
const q = /* @__PURE__ */ $.define(), z = /* @__PURE__ */ w.baseTheme({
  ".cm-tooltip.cm-tooltip-autocomplete": {
    "& > ul": {
      fontFamily: "monospace",
      whiteSpace: "nowrap",
      overflow: "hidden auto",
      maxWidth_fallback: "700px",
      maxWidth: "min(700px, 95vw)",
      minWidth: "250px",
      maxHeight: "10em",
      height: "100%",
      listStyle: "none",
      margin: 0,
      padding: 0,
      "& > li, & > completion-section": {
        padding: "1px 3px",
        lineHeight: 1.2
      },
      "& > li": {
        overflowX: "hidden",
        textOverflow: "ellipsis",
        cursor: "pointer"
      },
      "& > completion-section": {
        display: "list-item",
        borderBottom: "1px solid silver",
        paddingLeft: "0.5em",
        opacity: 0.7
      }
    }
  },
  "&light .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#17c",
    color: "white"
  },
  "&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#777"
  },
  "&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#347",
    color: "white"
  },
  "&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#444"
  },
  ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
    content: '"···"',
    opacity: 0.5,
    display: "block",
    textAlign: "center"
  },
  ".cm-tooltip.cm-completionInfo": {
    position: "absolute",
    padding: "3px 9px",
    width: "max-content",
    maxWidth: "400px",
    boxSizing: "border-box",
    whiteSpace: "pre-line"
  },
  ".cm-completionInfo.cm-completionInfo-left": { right: "100%" },
  ".cm-completionInfo.cm-completionInfo-right": { left: "100%" },
  ".cm-completionInfo.cm-completionInfo-left-narrow": { right: "30px" },
  ".cm-completionInfo.cm-completionInfo-right-narrow": { left: "30px" },
  "&light .cm-snippetField": { backgroundColor: "#00000022" },
  "&dark .cm-snippetField": { backgroundColor: "#ffffff22" },
  ".cm-snippetFieldPosition": {
    verticalAlign: "text-top",
    width: 0,
    height: "1.15em",
    display: "inline-block",
    margin: "0 -0.7px -.7em",
    borderLeft: "1.4px dotted #888"
  },
  ".cm-completionMatchedText": {
    textDecoration: "underline"
  },
  ".cm-completionDetail": {
    marginLeft: "0.5em",
    fontStyle: "italic"
  },
  ".cm-completionIcon": {
    fontSize: "90%",
    width: ".8em",
    display: "inline-block",
    textAlign: "center",
    paddingRight: ".6em",
    opacity: "0.6",
    boxSizing: "content-box"
  },
  ".cm-completionIcon-function, .cm-completionIcon-method": {
    "&:after": { content: "'ƒ'" }
  },
  ".cm-completionIcon-class": {
    "&:after": { content: "'○'" }
  },
  ".cm-completionIcon-interface": {
    "&:after": { content: "'◌'" }
  },
  ".cm-completionIcon-variable": {
    "&:after": { content: "'𝑥'" }
  },
  ".cm-completionIcon-constant": {
    "&:after": { content: "'𝐶'" }
  },
  ".cm-completionIcon-type": {
    "&:after": { content: "'𝑡'" }
  },
  ".cm-completionIcon-enum": {
    "&:after": { content: "'∪'" }
  },
  ".cm-completionIcon-property": {
    "&:after": { content: "'□'" }
  },
  ".cm-completionIcon-keyword": {
    "&:after": { content: "'🔑︎'" }
    // Disable emoji rendering
  },
  ".cm-completionIcon-namespace": {
    "&:after": { content: "'▢'" }
  },
  ".cm-completionIcon-text": {
    "&:after": { content: "'abc'", fontSize: "50%", verticalAlign: "middle" }
  }
});
class B {
  constructor(t, e, n, i) {
    this.field = t, this.line = e, this.from = n, this.to = i;
  }
}
class b {
  constructor(t, e, n) {
    this.field = t, this.from = e, this.to = n;
  }
  map(t) {
    let e = t.mapPos(this.from, -1, S.TrackDel), n = t.mapPos(this.to, 1, S.TrackDel);
    return e == null || n == null ? null : new b(this.field, e, n);
  }
}
class I {
  constructor(t, e) {
    this.lines = t, this.fieldPositions = e;
  }
  instantiate(t, e) {
    let n = [], i = [e], l = t.doc.lineAt(e), f = /^\s*/.exec(l.text)[0];
    for (let r of this.lines) {
      if (n.length) {
        let a = f, s = /^\t*/.exec(r)[0].length;
        for (let c = 0; c < s; c++)
          a += t.facet(V);
        i.push(e + a.length - s), r = a + r.slice(s);
      }
      n.push(r), e += r.length + 1;
    }
    let p = this.fieldPositions.map((r) => new b(r.field, i[r.line] + r.from, i[r.line] + r.to));
    return { text: n, ranges: p };
  }
  static parse(t) {
    let e = [], n = [], i = [], l;
    for (let f of t.split(/\r\n?|\n/)) {
      for (; l = /[#$]\{(?:(\d+)(?::([^{}]*))?|((?:\\[{}]|[^{}])*))\}/.exec(f); ) {
        let p = l[1] ? +l[1] : null, r = l[2] || l[3] || "", a = -1, s = r.replace(/\\[{}]/g, (c) => c[1]);
        for (let c = 0; c < e.length; c++)
          (p != null ? e[c].seq == p : s && e[c].name == s) && (a = c);
        if (a < 0) {
          let c = 0;
          for (; c < e.length && (p == null || e[c].seq != null && e[c].seq < p); )
            c++;
          e.splice(c, 0, { seq: p, name: s }), a = c;
          for (let d of i)
            d.field >= a && d.field++;
        }
        for (let c of i)
          if (c.line == n.length && c.from > l.index) {
            let d = l[2] ? 3 + (l[1] || "").length : 2;
            c.from -= d, c.to -= d;
          }
        i.push(new B(a, n.length, l.index, l.index + s.length)), f = f.slice(0, l.index) + r + f.slice(l.index + l[0].length);
      }
      f = f.replace(/\\([{}])/g, (p, r, a) => {
        for (let s of i)
          s.line == n.length && s.from > a && (s.from--, s.to--);
        return r;
      }), n.push(f);
    }
    return new I(n, i);
  }
}
let H = /* @__PURE__ */ g.widget({ widget: /* @__PURE__ */ new class extends j {
  toDOM() {
    let o = document.createElement("span");
    return o.className = "cm-snippetFieldPosition", o;
  }
  ignoreEvent() {
    return !1;
  }
}() }), K = /* @__PURE__ */ g.mark({ class: "cm-snippetField" });
class m {
  constructor(t, e) {
    this.ranges = t, this.active = e, this.deco = g.set(t.map((n) => (n.from == n.to ? H : K).range(n.from, n.to)), !0);
  }
  map(t) {
    let e = [];
    for (let n of this.ranges) {
      let i = n.map(t);
      if (!i)
        return null;
      e.push(i);
    }
    return new m(e, this.active);
  }
  selectionInsideField(t) {
    return t.ranges.every((e) => this.ranges.some((n) => n.field == this.active && n.from <= e.from && n.to >= e.to));
  }
}
const h = /* @__PURE__ */ x.define({
  map(o, t) {
    return o && o.map(t);
  }
}), N = /* @__PURE__ */ x.define(), u = /* @__PURE__ */ C.define({
  create() {
    return null;
  },
  update(o, t) {
    for (let e of t.effects) {
      if (e.is(h))
        return e.value;
      if (e.is(N) && o)
        return new m(o.ranges, e.value);
    }
    return o && t.docChanged && (o = o.map(t.changes)), o && t.selection && !o.selectionInsideField(t.selection) && (o = null), o;
  },
  provide: (o) => w.decorations.from(o, (t) => t ? t.deco : g.none)
});
function y(o, t) {
  return k.create(o.filter((e) => e.field == t).map((e) => k.range(e.from, e.to)));
}
function X(o) {
  let t = I.parse(o);
  return (e, n, i, l) => {
    let { text: f, ranges: p } = t.instantiate(e.state, i), { main: r } = e.state.selection, a = {
      changes: { from: i, to: l == r.from ? r.to : l, insert: A.of(f) },
      scrollIntoView: !0,
      annotations: n ? [q.of(n), P.userEvent.of("input.complete")] : void 0
    };
    if (p.length && (a.selection = y(p, 0)), p.some((s) => s.field > 0)) {
      let s = new m(p, 0), c = a.effects = [h.of(s)];
      e.state.field(u, !1) === void 0 && c.push(x.appendConfig.of([u, Q, Z, z]));
    }
    e.dispatch(e.state.update(a));
  };
}
function T(o) {
  return ({ state: t, dispatch: e }) => {
    let n = t.field(u, !1);
    if (!n || o < 0 && n.active == 0)
      return !1;
    let i = n.active + o, l = o > 0 && !n.ranges.some((f) => f.field == i + o);
    return e(t.update({
      selection: y(n.ranges, i),
      effects: h.of(l ? null : new m(n.ranges, i)),
      scrollIntoView: !0
    })), !0;
  };
}
const U = ({ state: o, dispatch: t }) => o.field(u, !1) ? (t(o.update({ effects: h.of(null) })), !0) : !1, Y = /* @__PURE__ */ T(1), G = /* @__PURE__ */ T(-1), J = [
  { key: "Tab", run: Y, shift: G },
  { key: "Escape", run: U }
], F = /* @__PURE__ */ D.define({
  combine(o) {
    return o.length ? o[0] : J;
  }
}), Q = /* @__PURE__ */ O.highest(/* @__PURE__ */ M.compute([F], (o) => o.facet(F)));
function ie(o, t) {
  return { ...t, apply: X(o) };
}
const Z = /* @__PURE__ */ w.domEventHandlers({
  mousedown(o, t) {
    let e = t.state.field(u, !1), n;
    if (!e || (n = t.posAtCoords({ x: o.clientX, y: o.clientY })) == null)
      return !1;
    let i = e.ranges.find((l) => l.from <= n && l.to >= n);
    return !i || i.field == e.active ? !1 : (t.dispatch({
      selection: y(e.ranges, i.field),
      effects: h.of(e.ranges.some((l) => l.field > i.field) ? new m(e.ranges, i.field) : null),
      scrollIntoView: !0
    }), !0);
  }
}), E = /* @__PURE__ */ new class extends L {
}();
E.startSide = 1;
E.endSide = -1;
export {
  U as clearSnippet,
  ne as completeFromList,
  oe as ifNotIn,
  Y as nextSnippetField,
  q as pickedCompletion,
  G as prevSnippetField,
  X as snippet,
  ie as snippetCompletion,
  F as snippetKeymap
};
