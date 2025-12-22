import { EditorSelection as a, countColumn as K, Text as le, StateField as Je, findClusterBreak as M, Facet as ce, Annotation as se, Transaction as U, StateEffect as ie, ChangeSet as Ge, ChangeDesc as Fe, combineConfig as ze } from "./index64.js";
import { EditorView as E, Direction as qe } from "./index63.js";
import { IndentContext as ue, getIndentation as fe, indentString as R, syntaxTree as $, matchBrackets as x, getIndentUnit as G, indentUnit as He } from "./index72.js";
import { NodeProp as F } from "./index113.js";
const Ke = (e) => {
  let { state: t } = e, r = t.doc.lineAt(t.selection.main.from), n = Q(e.state, r.from);
  return n.line ? $e(e) : n.block ? Qe(e) : !1;
};
function W(e, t) {
  return ({ state: r, dispatch: n }) => {
    if (r.readOnly)
      return !1;
    let l = e(t, r);
    return l ? (n(r.update(l)), !0) : !1;
  };
}
const $e = /* @__PURE__ */ W(
  Ze,
  0
  /* CommentOption.Toggle */
), We = /* @__PURE__ */ W(
  ae,
  0
  /* CommentOption.Toggle */
), Qe = /* @__PURE__ */ W(
  (e, t) => ae(e, t, Ye(t)),
  0
  /* CommentOption.Toggle */
);
function Q(e, t) {
  let r = e.languageDataAt("commentTokens", t, 1);
  return r.length ? r[0] : {};
}
const L = 50;
function Xe(e, { open: t, close: r }, n, l) {
  let o = e.sliceDoc(n - L, n), c = e.sliceDoc(l, l + L), s = /\s*$/.exec(o)[0].length, i = /^\s*/.exec(c)[0].length, f = o.length - s;
  if (o.slice(f - t.length, f) == t && c.slice(i, i + r.length) == r)
    return {
      open: { pos: n - s, margin: s && 1 },
      close: { pos: l + i, margin: i && 1 }
    };
  let u, h;
  l - n <= 2 * L ? u = h = e.sliceDoc(n, l) : (u = e.sliceDoc(n, n + L), h = e.sliceDoc(l - L, l));
  let p = /^\s*/.exec(u)[0].length, T = /\s*$/.exec(h)[0].length, C = h.length - T - r.length;
  return u.slice(p, p + t.length) == t && h.slice(C, C + r.length) == r ? {
    open: {
      pos: n + p + t.length,
      margin: /\s/.test(u.charAt(p + t.length)) ? 1 : 0
    },
    close: {
      pos: l - T - r.length,
      margin: /\s/.test(h.charAt(C - 1)) ? 1 : 0
    }
  } : null;
}
function Ye(e) {
  let t = [];
  for (let r of e.selection.ranges) {
    let n = e.doc.lineAt(r.from), l = r.to <= n.to ? n : e.doc.lineAt(r.to);
    l.from > n.from && l.from == r.to && (l = r.to == n.to + 1 ? n : e.doc.lineAt(r.to - 1));
    let o = t.length - 1;
    o >= 0 && t[o].to > n.from ? t[o].to = l.to : t.push({ from: n.from + /^\s*/.exec(n.text)[0].length, to: l.to });
  }
  return t;
}
function ae(e, t, r = t.selection.ranges) {
  let n = r.map((o) => Q(t, o.from).block);
  if (!n.every((o) => o))
    return null;
  let l = r.map((o, c) => Xe(t, n[c], o.from, o.to));
  if (e != 2 && !l.every((o) => o))
    return { changes: t.changes(r.map((o, c) => l[c] ? [] : [{ from: o.from, insert: n[c].open + " " }, { from: o.to, insert: " " + n[c].close }])) };
  if (e != 1 && l.some((o) => o)) {
    let o = [];
    for (let c = 0, s; c < l.length; c++)
      if (s = l[c]) {
        let i = n[c], { open: f, close: u } = s;
        o.push({ from: f.pos - i.open.length, to: f.pos + f.margin }, { from: u.pos - u.margin, to: u.pos + i.close.length });
      }
    return { changes: o };
  }
  return null;
}
function Ze(e, t, r = t.selection.ranges) {
  let n = [], l = -1;
  for (let { from: o, to: c } of r) {
    let s = n.length, i = 1e9, f = Q(t, o).line;
    if (f) {
      for (let u = o; u <= c; ) {
        let h = t.doc.lineAt(u);
        if (h.from > l && (o == c || c > h.from)) {
          l = h.from;
          let p = /^\s*/.exec(h.text)[0].length, T = p == h.length, C = h.text.slice(p, p + f.length) == f ? p : -1;
          p < h.text.length && p < i && (i = p), n.push({ line: h, comment: C, token: f, indent: p, empty: T, single: !1 });
        }
        u = h.to + 1;
      }
      if (i < 1e9)
        for (let u = s; u < n.length; u++)
          n[u].indent < n[u].line.text.length && (n[u].indent = i);
      n.length == s + 1 && (n[s].single = !0);
    }
  }
  if (e != 2 && n.some((o) => o.comment < 0 && (!o.empty || o.single))) {
    let o = [];
    for (let { line: s, token: i, indent: f, empty: u, single: h } of n)
      (h || !u) && o.push({ from: s.from + f, insert: i + " " });
    let c = t.changes(o);
    return { changes: c, selection: t.selection.map(c, 1) };
  } else if (e != 1 && n.some((o) => o.comment >= 0)) {
    let o = [];
    for (let { line: c, comment: s, token: i } of n)
      if (s >= 0) {
        let f = c.from + s, u = f + i.length;
        c.text[u - c.from] == " " && u++, o.push({ from: f, to: u });
      }
    return { changes: o };
  }
  return null;
}
const z = /* @__PURE__ */ se.define(), je = /* @__PURE__ */ se.define(), we = /* @__PURE__ */ ce.define(), _e = /* @__PURE__ */ ce.define({
  combine(e) {
    return ze(e, {
      minDepth: 100,
      newGroupDelay: 500,
      joinToEvent: (t, r) => r
    }, {
      minDepth: Math.max,
      newGroupDelay: Math.min,
      joinToEvent: (t, r) => (n, l) => t(n, l) || r(n, l)
    });
  }
}), et = /* @__PURE__ */ Je.define({
  create() {
    return B.empty;
  },
  update(e, t) {
    let r = t.state.facet(_e), n = t.annotation(z);
    if (n) {
      let i = m.fromTransaction(t, n.selection), f = n.side, u = f == 0 ? e.undone : e.done;
      return i ? u = I(u, u.length, r.minDepth, i) : u = de(u, t.startState.selection), new B(f == 0 ? n.rest : u, f == 0 ? u : n.rest);
    }
    let l = t.annotation(je);
    if ((l == "full" || l == "before") && (e = e.isolate()), t.annotation(U.addToHistory) === !1)
      return t.changes.empty ? e : e.addMapping(t.changes.desc);
    let o = m.fromTransaction(t), c = t.annotation(U.time), s = t.annotation(U.userEvent);
    return o ? e = e.addChanges(o, c, s, r, t) : t.selection && (e = e.addSelection(t.startState.selection, c, s, r.newGroupDelay)), (l == "full" || l == "after") && (e = e.isolate()), e;
  },
  toJSON(e) {
    return { done: e.done.map((t) => t.toJSON()), undone: e.undone.map((t) => t.toJSON()) };
  },
  fromJSON(e) {
    return new B(e.done.map(m.fromJSON), e.undone.map(m.fromJSON));
  }
});
function v(e, t) {
  return function({ state: r, dispatch: n }) {
    if (!t && r.readOnly)
      return !1;
    let l = r.field(et, !1);
    if (!l)
      return !1;
    let o = l.pop(e, r, t);
    return o ? (n(o), !0) : !1;
  };
}
const tt = /* @__PURE__ */ v(0, !1), Z = /* @__PURE__ */ v(1, !1), nt = /* @__PURE__ */ v(0, !0), rt = /* @__PURE__ */ v(1, !0);
class m {
  constructor(t, r, n, l, o) {
    this.changes = t, this.effects = r, this.mapped = n, this.startSelection = l, this.selectionsAfter = o;
  }
  setSelAfter(t) {
    return new m(this.changes, this.effects, this.mapped, this.startSelection, t);
  }
  toJSON() {
    var t, r, n;
    return {
      changes: (t = this.changes) === null || t === void 0 ? void 0 : t.toJSON(),
      mapped: (r = this.mapped) === null || r === void 0 ? void 0 : r.toJSON(),
      startSelection: (n = this.startSelection) === null || n === void 0 ? void 0 : n.toJSON(),
      selectionsAfter: this.selectionsAfter.map((l) => l.toJSON())
    };
  }
  static fromJSON(t) {
    return new m(t.changes && Ge.fromJSON(t.changes), [], t.mapped && Fe.fromJSON(t.mapped), t.startSelection && a.fromJSON(t.startSelection), t.selectionsAfter.map(a.fromJSON));
  }
  // This does not check `addToHistory` and such, it assumes the
  // transaction needs to be converted to an item. Returns null when
  // there are no changes or effects in the transaction.
  static fromTransaction(t, r) {
    let n = g;
    for (let l of t.startState.facet(we)) {
      let o = l(t);
      o.length && (n = n.concat(o));
    }
    return !n.length && t.changes.empty ? null : new m(t.changes.invert(t.startState.doc), n, void 0, r || t.startState.selection, g);
  }
  static selection(t) {
    return new m(void 0, g, void 0, void 0, t);
  }
}
function I(e, t, r, n) {
  let l = t + 1 > r + 20 ? t - r - 1 : 0, o = e.slice(l, t);
  return o.push(n), o;
}
function ot(e, t) {
  let r = [], n = !1;
  return e.iterChangedRanges((l, o) => r.push(l, o)), t.iterChangedRanges((l, o, c, s) => {
    for (let i = 0; i < r.length; ) {
      let f = r[i++], u = r[i++];
      s >= f && c <= u && (n = !0);
    }
  }), n;
}
function lt(e, t) {
  return e.ranges.length == t.ranges.length && e.ranges.filter((r, n) => r.empty != t.ranges[n].empty).length === 0;
}
function he(e, t) {
  return e.length ? t.length ? e.concat(t) : e : t;
}
const g = [], ct = 200;
function de(e, t) {
  if (e.length) {
    let r = e[e.length - 1], n = r.selectionsAfter.slice(Math.max(0, r.selectionsAfter.length - ct));
    return n.length && n[n.length - 1].eq(t) ? e : (n.push(t), I(e, e.length - 1, 1e9, r.setSelAfter(n)));
  } else
    return [m.selection([t])];
}
function st(e) {
  let t = e[e.length - 1], r = e.slice();
  return r[e.length - 1] = t.setSelAfter(t.selectionsAfter.slice(0, t.selectionsAfter.length - 1)), r;
}
function J(e, t) {
  if (!e.length)
    return e;
  let r = e.length, n = g;
  for (; r; ) {
    let l = it(e[r - 1], t, n);
    if (l.changes && !l.changes.empty || l.effects.length) {
      let o = e.slice(0, r);
      return o[r - 1] = l, o;
    } else
      t = l.mapped, r--, n = l.selectionsAfter;
  }
  return n.length ? [m.selection(n)] : g;
}
function it(e, t, r) {
  let n = he(e.selectionsAfter.length ? e.selectionsAfter.map((s) => s.map(t)) : g, r);
  if (!e.changes)
    return m.selection(n);
  let l = e.changes.map(t), o = t.mapDesc(e.changes, !0), c = e.mapped ? e.mapped.composeDesc(o) : o;
  return new m(l, ie.mapEffects(e.effects, t), c, e.startSelection.map(o), n);
}
const ut = /^(input\.type|delete)($|\.)/;
class B {
  constructor(t, r, n = 0, l = void 0) {
    this.done = t, this.undone = r, this.prevTime = n, this.prevUserEvent = l;
  }
  isolate() {
    return this.prevTime ? new B(this.done, this.undone) : this;
  }
  addChanges(t, r, n, l, o) {
    let c = this.done, s = c[c.length - 1];
    return s && s.changes && !s.changes.empty && t.changes && (!n || ut.test(n)) && (!s.selectionsAfter.length && r - this.prevTime < l.newGroupDelay && l.joinToEvent(o, ot(s.changes, t.changes)) || // For compose (but not compose.start) events, always join with previous event
    n == "input.type.compose") ? c = I(c, c.length - 1, l.minDepth, new m(t.changes.compose(s.changes), he(ie.mapEffects(t.effects, s.changes), s.effects), s.mapped, s.startSelection, g)) : c = I(c, c.length, l.minDepth, t), new B(c, g, r, n);
  }
  addSelection(t, r, n, l) {
    let o = this.done.length ? this.done[this.done.length - 1].selectionsAfter : g;
    return o.length > 0 && r - this.prevTime < l && n == this.prevUserEvent && n && /^select($|\.)/.test(n) && lt(o[o.length - 1], t) ? this : new B(de(this.done, t), this.undone, r, n);
  }
  addMapping(t) {
    return new B(J(this.done, t), J(this.undone, t), this.prevTime, this.prevUserEvent);
  }
  pop(t, r, n) {
    let l = t == 0 ? this.done : this.undone;
    if (l.length == 0)
      return null;
    let o = l[l.length - 1], c = o.selectionsAfter[0] || r.selection;
    if (n && o.selectionsAfter.length)
      return r.update({
        selection: o.selectionsAfter[o.selectionsAfter.length - 1],
        annotations: z.of({ side: t, rest: st(l), selection: c }),
        userEvent: t == 0 ? "select.undo" : "select.redo",
        scrollIntoView: !0
      });
    if (o.changes) {
      let s = l.length == 1 ? g : l.slice(0, l.length - 1);
      return o.mapped && (s = J(s, o.mapped)), r.update({
        changes: o.changes,
        selection: o.startSelection,
        effects: o.effects,
        annotations: z.of({ side: t, rest: s, selection: c }),
        filter: !1,
        userEvent: t == 0 ? "undo" : "redo",
        scrollIntoView: !0
      });
    } else
      return null;
  }
}
B.empty = /* @__PURE__ */ new B(g, g);
const un = [
  { key: "Mod-z", run: tt, preventDefault: !0 },
  { key: "Mod-y", mac: "Mod-Shift-z", run: Z, preventDefault: !0 },
  { linux: "Ctrl-Shift-z", run: Z, preventDefault: !0 },
  { key: "Mod-u", run: nt, preventDefault: !0 },
  { key: "Alt-u", mac: "Mod-Shift-u", run: rt, preventDefault: !0 }
];
function D(e, t) {
  return a.create(e.ranges.map(t), e.mainIndex);
}
function k(e, t) {
  return e.update({ selection: t, scrollIntoView: !0, userEvent: "select" });
}
function A({ state: e, dispatch: t }, r) {
  let n = D(e.selection, r);
  return n.eq(e.selection, !0) ? !1 : (t(k(e, n)), !0);
}
function V(e, t) {
  return a.cursor(t ? e.to : e.from);
}
function X(e, t) {
  return A(e, (r) => r.empty ? e.moveByChar(r, t) : V(r, t));
}
function d(e) {
  return e.textDirectionAt(e.state.selection.main.head) == qe.LTR;
}
const me = (e) => X(e, !d(e)), pe = (e) => X(e, d(e)), fn = (e) => X(e, !1);
function ge(e, t) {
  return A(e, (r) => r.empty ? e.moveByGroup(r, t) : V(r, t));
}
const ft = (e) => ge(e, !d(e)), at = (e) => ge(e, d(e));
function ht(e, t, r) {
  if (t.type.prop(r))
    return !0;
  let n = t.to - t.from;
  return n && (n > 2 || /[^\s,.;:]/.test(e.sliceDoc(t.from, t.to))) || t.firstChild;
}
function N(e, t, r) {
  let n = $(e).resolveInner(t.head), l = r ? F.closedBy : F.openedBy;
  for (let i = t.head; ; ) {
    let f = r ? n.childAfter(i) : n.childBefore(i);
    if (!f)
      break;
    ht(e, f, l) ? n = f : i = r ? f.to : f.from;
  }
  let o = n.type.prop(l), c, s;
  return o && (c = r ? x(e, n.from, 1) : x(e, n.to, -1)) && c.matched ? s = r ? c.end.to : c.end.from : s = r ? n.to : n.from, a.cursor(s, r ? -1 : 1);
}
const dt = (e) => A(e, (t) => N(e.state, t, !d(e))), mt = (e) => A(e, (t) => N(e.state, t, d(e)));
function ye(e, t) {
  return A(e, (r) => {
    if (!r.empty)
      return V(r, t);
    let n = e.moveVertically(r, t);
    return n.head != r.head ? n : e.moveToLineBoundary(r, t);
  });
}
const ke = (e) => ye(e, !1), Ae = (e) => ye(e, !0);
function Be(e) {
  let t = e.scrollDOM.clientHeight < e.scrollDOM.scrollHeight - 2, r = 0, n = 0, l;
  if (t) {
    for (let o of e.state.facet(E.scrollMargins)) {
      let c = o(e);
      c != null && c.top && (r = Math.max(c == null ? void 0 : c.top, r)), c != null && c.bottom && (n = Math.max(c == null ? void 0 : c.bottom, n));
    }
    l = e.scrollDOM.clientHeight - r - n;
  } else
    l = (e.dom.ownerDocument.defaultView || window).innerHeight;
  return {
    marginTop: r,
    marginBottom: n,
    selfScroll: t,
    height: Math.max(e.defaultLineHeight, l - 5)
  };
}
function Se(e, t) {
  let r = Be(e), { state: n } = e, l = D(n.selection, (c) => c.empty ? e.moveVertically(c, t, r.height) : V(c, t));
  if (l.eq(n.selection))
    return !1;
  let o;
  if (r.selfScroll) {
    let c = e.coordsAtPos(n.selection.main.head), s = e.scrollDOM.getBoundingClientRect(), i = s.top + r.marginTop, f = s.bottom - r.marginBottom;
    c && c.top > i && c.bottom < f && (o = E.scrollIntoView(l.main.head, { y: "start", yMargin: c.top - i }));
  }
  return e.dispatch(k(n, l), { effects: o }), !0;
}
const j = (e) => Se(e, !1), q = (e) => Se(e, !0);
function S(e, t, r) {
  let n = e.lineBlockAt(t.head), l = e.moveToLineBoundary(t, r);
  if (l.head == t.head && l.head != (r ? n.to : n.from) && (l = e.moveToLineBoundary(t, r, !1)), !r && l.head == n.from && n.length) {
    let o = /^\s*/.exec(e.state.sliceDoc(n.from, Math.min(n.from + 100, n.to)))[0].length;
    o && t.head != n.from + o && (l = a.cursor(n.from + o));
  }
  return l;
}
const pt = (e) => A(e, (t) => S(e, t, !0)), gt = (e) => A(e, (t) => S(e, t, !1)), yt = (e) => A(e, (t) => S(e, t, !d(e))), kt = (e) => A(e, (t) => S(e, t, d(e))), At = (e) => A(e, (t) => a.cursor(e.lineBlockAt(t.head).from, 1)), Bt = (e) => A(e, (t) => a.cursor(e.lineBlockAt(t.head).to, -1));
function St(e, t, r) {
  let n = !1, l = D(e.selection, (o) => {
    let c = x(e, o.head, -1) || x(e, o.head, 1) || o.head > 0 && x(e, o.head - 1, 1) || o.head < e.doc.length && x(e, o.head + 1, -1);
    if (!c || !c.end)
      return o;
    n = !0;
    let s = c.start.from == o.head ? c.end.to : c.end.from;
    return a.cursor(s);
  });
  return n ? (t(k(e, l)), !0) : !1;
}
const xt = ({ state: e, dispatch: t }) => St(e, t);
function y(e, t) {
  let r = D(e.state.selection, (n) => {
    let l = t(n);
    return a.range(n.anchor, l.head, l.goalColumn, l.bidiLevel || void 0);
  });
  return r.eq(e.state.selection) ? !1 : (e.dispatch(k(e.state, r)), !0);
}
function xe(e, t) {
  return y(e, (r) => e.moveByChar(r, t));
}
const De = (e) => xe(e, !d(e)), Ce = (e) => xe(e, d(e));
function Le(e, t) {
  return y(e, (r) => e.moveByGroup(r, t));
}
const Dt = (e) => Le(e, !d(e)), Ct = (e) => Le(e, d(e)), Lt = (e) => y(e, (t) => N(e.state, t, !d(e))), Mt = (e) => y(e, (t) => N(e.state, t, d(e)));
function Me(e, t) {
  return y(e, (r) => e.moveVertically(r, t));
}
const Ee = (e) => Me(e, !1), Oe = (e) => Me(e, !0);
function Te(e, t) {
  return y(e, (r) => e.moveVertically(r, t, Be(e).height));
}
const w = (e) => Te(e, !1), _ = (e) => Te(e, !0), Et = (e) => y(e, (t) => S(e, t, !0)), Ot = (e) => y(e, (t) => S(e, t, !1)), Tt = (e) => y(e, (t) => S(e, t, !d(e))), bt = (e) => y(e, (t) => S(e, t, d(e))), Rt = (e) => y(e, (t) => a.cursor(e.lineBlockAt(t.head).from)), It = (e) => y(e, (t) => a.cursor(e.lineBlockAt(t.head).to)), ee = ({ state: e, dispatch: t }) => (t(k(e, { anchor: 0 })), !0), te = ({ state: e, dispatch: t }) => (t(k(e, { anchor: e.doc.length })), !0), ne = ({ state: e, dispatch: t }) => (t(k(e, { anchor: e.selection.main.anchor, head: 0 })), !0), re = ({ state: e, dispatch: t }) => (t(k(e, { anchor: e.selection.main.anchor, head: e.doc.length })), !0), vt = ({ state: e, dispatch: t }) => (t(e.update({ selection: { anchor: 0, head: e.doc.length }, userEvent: "select" })), !0), Vt = ({ state: e, dispatch: t }) => {
  let r = P(e).map(({ from: n, to: l }) => a.range(n, Math.min(l + 1, e.doc.length)));
  return t(e.update({ selection: a.create(r), userEvent: "select" })), !0;
}, Nt = ({ state: e, dispatch: t }) => {
  let r = D(e.selection, (n) => {
    let l = $(e), o = l.resolveStack(n.from, 1);
    if (n.empty) {
      let c = l.resolveStack(n.from, -1);
      c.node.from >= o.node.from && c.node.to <= o.node.to && (o = c);
    }
    for (let c = o; c; c = c.next) {
      let { node: s } = c;
      if ((s.from < n.from && s.to >= n.to || s.to > n.to && s.from <= n.from) && c.next)
        return a.range(s.to, s.from);
    }
    return n;
  });
  return r.eq(e.selection) ? !1 : (t(k(e, r)), !0);
};
function be(e, t) {
  let { state: r } = e, n = r.selection, l = r.selection.ranges.slice();
  for (let o of r.selection.ranges) {
    let c = r.doc.lineAt(o.head);
    if (t ? c.to < e.state.doc.length : c.from > 0)
      for (let s = o; ; ) {
        let i = e.moveVertically(s, t);
        if (i.head < c.from || i.head > c.to) {
          l.some((f) => f.head == i.head) || l.push(i);
          break;
        } else {
          if (i.head == s.head)
            break;
          s = i;
        }
      }
  }
  return l.length == n.ranges.length ? !1 : (e.dispatch(k(r, a.create(l, l.length - 1))), !0);
}
const Pt = (e) => be(e, !1), Ut = (e) => be(e, !0), Jt = ({ state: e, dispatch: t }) => {
  let r = e.selection, n = null;
  return r.ranges.length > 1 ? n = a.create([r.main]) : r.main.empty || (n = a.create([a.cursor(r.main.head)])), n ? (t(k(e, n)), !0) : !1;
};
function O(e, t) {
  if (e.state.readOnly)
    return !1;
  let r = "delete.selection", { state: n } = e, l = n.changeByRange((o) => {
    let { from: c, to: s } = o;
    if (c == s) {
      let i = t(o);
      i < c ? (r = "delete.backward", i = b(e, i, !1)) : i > c && (r = "delete.forward", i = b(e, i, !0)), c = Math.min(c, i), s = Math.max(s, i);
    } else
      c = b(e, c, !1), s = b(e, s, !0);
    return c == s ? { range: o } : { changes: { from: c, to: s }, range: a.cursor(c, c < o.head ? -1 : 1) };
  });
  return l.changes.empty ? !1 : (e.dispatch(n.update(l, {
    scrollIntoView: !0,
    userEvent: r,
    effects: r == "delete.selection" ? E.announce.of(n.phrase("Selection deleted")) : void 0
  })), !0);
}
function b(e, t, r) {
  if (e instanceof E)
    for (let n of e.state.facet(E.atomicRanges).map((l) => l(e)))
      n.between(t, t, (l, o) => {
        l < t && o > t && (t = r ? o : l);
      });
  return t;
}
const Re = (e, t, r) => O(e, (n) => {
  let l = n.from, { state: o } = e, c = o.doc.lineAt(l), s, i;
  if (r && !t && l > c.from && l < c.from + 200 && !/[^ \t]/.test(s = c.text.slice(0, l - c.from))) {
    if (s[s.length - 1] == "	")
      return l - 1;
    let f = K(s, o.tabSize), u = f % G(o) || G(o);
    for (let h = 0; h < u && s[s.length - 1 - h] == " "; h++)
      l--;
    i = l;
  } else
    i = M(c.text, l - c.from, t, t) + c.from, i == l && c.number != (t ? o.doc.lines : 1) ? i += t ? 1 : -1 : !t && /[\ufe00-\ufe0f]/.test(c.text.slice(i - c.from, l - c.from)) && (i = M(c.text, i - c.from, !1, !1) + c.from);
  return i;
}), H = (e) => Re(e, !1, !0), Ie = (e) => Re(e, !0, !1), ve = (e, t) => O(e, (r) => {
  let n = r.head, { state: l } = e, o = l.doc.lineAt(n), c = l.charCategorizer(n);
  for (let s = null; ; ) {
    if (n == (t ? o.to : o.from)) {
      n == r.head && o.number != (t ? l.doc.lines : 1) && (n += t ? 1 : -1);
      break;
    }
    let i = M(o.text, n - o.from, t) + o.from, f = o.text.slice(Math.min(n, i) - o.from, Math.max(n, i) - o.from), u = c(f);
    if (s != null && u != s)
      break;
    (f != " " || n != r.head) && (s = u), n = i;
  }
  return n;
}), Ve = (e) => ve(e, !1), Gt = (e) => ve(e, !0), Ft = (e) => O(e, (t) => {
  let r = e.lineBlockAt(t.head).to;
  return t.head < r ? r : Math.min(e.state.doc.length, t.head + 1);
}), zt = (e) => O(e, (t) => {
  let r = e.moveToLineBoundary(t, !1).head;
  return t.head > r ? r : Math.max(0, t.head - 1);
}), qt = (e) => O(e, (t) => {
  let r = e.moveToLineBoundary(t, !0).head;
  return t.head < r ? r : Math.min(e.state.doc.length, t.head + 1);
}), Ht = ({ state: e, dispatch: t }) => {
  if (e.readOnly)
    return !1;
  let r = e.changeByRange((n) => ({
    changes: { from: n.from, to: n.to, insert: le.of(["", ""]) },
    range: a.cursor(n.from)
  }));
  return t(e.update(r, { scrollIntoView: !0, userEvent: "input" })), !0;
}, Kt = ({ state: e, dispatch: t }) => {
  if (e.readOnly)
    return !1;
  let r = e.changeByRange((n) => {
    if (!n.empty || n.from == 0 || n.from == e.doc.length)
      return { range: n };
    let l = n.from, o = e.doc.lineAt(l), c = l == o.from ? l - 1 : M(o.text, l - o.from, !1) + o.from, s = l == o.to ? l + 1 : M(o.text, l - o.from, !0) + o.from;
    return {
      changes: { from: c, to: s, insert: e.doc.slice(l, s).append(e.doc.slice(c, l)) },
      range: a.cursor(s)
    };
  });
  return r.changes.empty ? !1 : (t(e.update(r, { scrollIntoView: !0, userEvent: "move.character" })), !0);
};
function P(e) {
  let t = [], r = -1;
  for (let n of e.selection.ranges) {
    let l = e.doc.lineAt(n.from), o = e.doc.lineAt(n.to);
    if (!n.empty && n.to == o.from && (o = e.doc.lineAt(n.to - 1)), r >= l.number) {
      let c = t[t.length - 1];
      c.to = o.to, c.ranges.push(n);
    } else
      t.push({ from: l.from, to: o.to, ranges: [n] });
    r = o.number + 1;
  }
  return t;
}
function Ne(e, t, r) {
  if (e.readOnly)
    return !1;
  let n = [], l = [];
  for (let o of P(e)) {
    if (r ? o.to == e.doc.length : o.from == 0)
      continue;
    let c = e.doc.lineAt(r ? o.to + 1 : o.from - 1), s = c.length + 1;
    if (r) {
      n.push({ from: o.to, to: c.to }, { from: o.from, insert: c.text + e.lineBreak });
      for (let i of o.ranges)
        l.push(a.range(Math.min(e.doc.length, i.anchor + s), Math.min(e.doc.length, i.head + s)));
    } else {
      n.push({ from: c.from, to: o.from }, { from: o.to, insert: e.lineBreak + c.text });
      for (let i of o.ranges)
        l.push(a.range(i.anchor - s, i.head - s));
    }
  }
  return n.length ? (t(e.update({
    changes: n,
    scrollIntoView: !0,
    selection: a.create(l, e.selection.mainIndex),
    userEvent: "move.line"
  })), !0) : !1;
}
const $t = ({ state: e, dispatch: t }) => Ne(e, t, !1), Wt = ({ state: e, dispatch: t }) => Ne(e, t, !0);
function Pe(e, t, r) {
  if (e.readOnly)
    return !1;
  let n = [];
  for (let o of P(e))
    r ? n.push({ from: o.from, insert: e.doc.slice(o.from, o.to) + e.lineBreak }) : n.push({ from: o.to, insert: e.lineBreak + e.doc.slice(o.from, o.to) });
  let l = e.changes(n);
  return t(e.update({
    changes: l,
    selection: e.selection.map(l, r ? 1 : -1),
    scrollIntoView: !0,
    userEvent: "input.copyline"
  })), !0;
}
const Qt = ({ state: e, dispatch: t }) => Pe(e, t, !1), Xt = ({ state: e, dispatch: t }) => Pe(e, t, !0), Yt = (e) => {
  if (e.state.readOnly)
    return !1;
  let { state: t } = e, r = t.changes(P(t).map(({ from: l, to: o }) => (l > 0 ? l-- : o < t.doc.length && o++, { from: l, to: o }))), n = D(t.selection, (l) => {
    let o;
    if (e.lineWrapping) {
      let c = e.lineBlockAt(l.head), s = e.coordsAtPos(l.head, l.assoc || 1);
      s && (o = c.bottom + e.documentTop - s.bottom + e.defaultLineHeight / 2);
    }
    return e.moveVertically(l, !0, o);
  }).map(r);
  return e.dispatch({ changes: r, selection: n, scrollIntoView: !0, userEvent: "delete.line" }), !0;
};
function Zt(e, t) {
  if (/\(\)|\[\]|\{\}/.test(e.sliceDoc(t - 1, t + 1)))
    return { from: t, to: t };
  let r = $(e).resolveInner(t), n = r.childBefore(t), l = r.childAfter(t), o;
  return n && l && n.to <= t && l.from >= t && (o = n.type.prop(F.closedBy)) && o.indexOf(l.name) > -1 && e.doc.lineAt(n.to).from == e.doc.lineAt(l.from).from && !/\S/.test(e.sliceDoc(n.to, l.from)) ? { from: n.to, to: l.from } : null;
}
const oe = /* @__PURE__ */ Ue(!1), jt = /* @__PURE__ */ Ue(!0);
function Ue(e) {
  return ({ state: t, dispatch: r }) => {
    if (t.readOnly)
      return !1;
    let n = t.changeByRange((l) => {
      let { from: o, to: c } = l, s = t.doc.lineAt(o), i = !e && o == c && Zt(t, o);
      e && (o = c = (c <= s.to ? s : t.doc.lineAt(c)).to);
      let f = new ue(t, { simulateBreak: o, simulateDoubleBreak: !!i }), u = fe(f, o);
      for (u == null && (u = K(/^\s*/.exec(t.doc.lineAt(o).text)[0], t.tabSize)); c < s.to && /\s/.test(s.text[c - s.from]); )
        c++;
      i ? { from: o, to: c } = i : o > s.from && o < s.from + 100 && !/\S/.test(s.text.slice(0, o)) && (o = s.from);
      let h = ["", R(t, u)];
      return i && h.push(R(t, f.lineIndent(s.from, -1))), {
        changes: { from: o, to: c, insert: le.of(h) },
        range: a.cursor(o + 1 + h[1].length)
      };
    });
    return r(t.update(n, { scrollIntoView: !0, userEvent: "input" })), !0;
  };
}
function Y(e, t) {
  let r = -1;
  return e.changeByRange((n) => {
    let l = [];
    for (let c = n.from; c <= n.to; ) {
      let s = e.doc.lineAt(c);
      s.number > r && (n.empty || n.to > s.from) && (t(s, l, n), r = s.number), c = s.to + 1;
    }
    let o = e.changes(l);
    return {
      changes: l,
      range: a.range(o.mapPos(n.anchor, 1), o.mapPos(n.head, 1))
    };
  });
}
const wt = ({ state: e, dispatch: t }) => {
  if (e.readOnly)
    return !1;
  let r = /* @__PURE__ */ Object.create(null), n = new ue(e, { overrideIndentation: (o) => {
    let c = r[o];
    return c ?? -1;
  } }), l = Y(e, (o, c, s) => {
    let i = fe(n, o.from);
    if (i == null)
      return;
    /\S/.test(o.text) || (i = 0);
    let f = /^\s*/.exec(o.text)[0], u = R(e, i);
    (f != u || s.from < o.from + f.length) && (r[o.from] = i, c.push({ from: o.from, to: o.from + f.length, insert: u }));
  });
  return l.changes.empty || t(e.update(l, { userEvent: "indent" })), !0;
}, _t = ({ state: e, dispatch: t }) => e.readOnly ? !1 : (t(e.update(Y(e, (r, n) => {
  n.push({ from: r.from, insert: e.facet(He) });
}), { userEvent: "input.indent" })), !0), en = ({ state: e, dispatch: t }) => e.readOnly ? !1 : (t(e.update(Y(e, (r, n) => {
  let l = /^\s*/.exec(r.text)[0];
  if (!l)
    return;
  let o = K(l, e.tabSize), c = 0, s = R(e, Math.max(0, o - G(e)));
  for (; c < l.length && c < s.length && l.charCodeAt(c) == s.charCodeAt(c); )
    c++;
  n.push({ from: r.from + c, to: r.from + l.length, insert: s.slice(c) });
}), { userEvent: "delete.dedent" })), !0), tn = (e) => (e.setTabFocusMode(), !0), nn = [
  { key: "Ctrl-b", run: me, shift: De, preventDefault: !0 },
  { key: "Ctrl-f", run: pe, shift: Ce },
  { key: "Ctrl-p", run: ke, shift: Ee },
  { key: "Ctrl-n", run: Ae, shift: Oe },
  { key: "Ctrl-a", run: At, shift: Rt },
  { key: "Ctrl-e", run: Bt, shift: It },
  { key: "Ctrl-d", run: Ie },
  { key: "Ctrl-h", run: H },
  { key: "Ctrl-k", run: Ft },
  { key: "Ctrl-Alt-h", run: Ve },
  { key: "Ctrl-o", run: Ht },
  { key: "Ctrl-t", run: Kt },
  { key: "Ctrl-v", run: q }
], rn = /* @__PURE__ */ [
  { key: "ArrowLeft", run: me, shift: De, preventDefault: !0 },
  { key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: ft, shift: Dt, preventDefault: !0 },
  { mac: "Cmd-ArrowLeft", run: yt, shift: Tt, preventDefault: !0 },
  { key: "ArrowRight", run: pe, shift: Ce, preventDefault: !0 },
  { key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: at, shift: Ct, preventDefault: !0 },
  { mac: "Cmd-ArrowRight", run: kt, shift: bt, preventDefault: !0 },
  { key: "ArrowUp", run: ke, shift: Ee, preventDefault: !0 },
  { mac: "Cmd-ArrowUp", run: ee, shift: ne },
  { mac: "Ctrl-ArrowUp", run: j, shift: w },
  { key: "ArrowDown", run: Ae, shift: Oe, preventDefault: !0 },
  { mac: "Cmd-ArrowDown", run: te, shift: re },
  { mac: "Ctrl-ArrowDown", run: q, shift: _ },
  { key: "PageUp", run: j, shift: w },
  { key: "PageDown", run: q, shift: _ },
  { key: "Home", run: gt, shift: Ot, preventDefault: !0 },
  { key: "Mod-Home", run: ee, shift: ne },
  { key: "End", run: pt, shift: Et, preventDefault: !0 },
  { key: "Mod-End", run: te, shift: re },
  { key: "Enter", run: oe, shift: oe },
  { key: "Mod-a", run: vt },
  { key: "Backspace", run: H, shift: H, preventDefault: !0 },
  { key: "Delete", run: Ie, preventDefault: !0 },
  { key: "Mod-Backspace", mac: "Alt-Backspace", run: Ve, preventDefault: !0 },
  { key: "Mod-Delete", mac: "Alt-Delete", run: Gt, preventDefault: !0 },
  { mac: "Mod-Backspace", run: zt, preventDefault: !0 },
  { mac: "Mod-Delete", run: qt, preventDefault: !0 }
].concat(/* @__PURE__ */ nn.map((e) => ({ mac: e.key, run: e.run, shift: e.shift }))), an = /* @__PURE__ */ [
  { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: dt, shift: Lt },
  { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: mt, shift: Mt },
  { key: "Alt-ArrowUp", run: $t },
  { key: "Shift-Alt-ArrowUp", run: Qt },
  { key: "Alt-ArrowDown", run: Wt },
  { key: "Shift-Alt-ArrowDown", run: Xt },
  { key: "Mod-Alt-ArrowUp", run: Pt },
  { key: "Mod-Alt-ArrowDown", run: Ut },
  { key: "Escape", run: Jt },
  { key: "Mod-Enter", run: jt },
  { key: "Alt-l", mac: "Ctrl-l", run: Vt },
  { key: "Mod-i", run: Nt, preventDefault: !0 },
  { key: "Mod-[", run: en },
  { key: "Mod-]", run: _t },
  { key: "Mod-Alt-\\", run: wt },
  { key: "Shift-Mod-k", run: Yt },
  { key: "Shift-Mod-\\", run: xt },
  { key: "Mod-/", run: Ke },
  { key: "Alt-A", run: We },
  { key: "Ctrl-m", mac: "Shift-Alt-m", run: tn }
].concat(rn);
export {
  Pt as addCursorAbove,
  Ut as addCursorBelow,
  Xt as copyLineDown,
  Qt as copyLineUp,
  fn as cursorCharBackward,
  me as cursorCharLeft,
  pe as cursorCharRight,
  te as cursorDocEnd,
  ee as cursorDocStart,
  ft as cursorGroupLeft,
  at as cursorGroupRight,
  gt as cursorLineBoundaryBackward,
  pt as cursorLineBoundaryForward,
  yt as cursorLineBoundaryLeft,
  kt as cursorLineBoundaryRight,
  Ae as cursorLineDown,
  Bt as cursorLineEnd,
  At as cursorLineStart,
  ke as cursorLineUp,
  xt as cursorMatchingBracket,
  q as cursorPageDown,
  j as cursorPageUp,
  dt as cursorSyntaxLeft,
  mt as cursorSyntaxRight,
  an as defaultKeymap,
  H as deleteCharBackward,
  Ie as deleteCharForward,
  Ve as deleteGroupBackward,
  Gt as deleteGroupForward,
  Yt as deleteLine,
  zt as deleteLineBoundaryBackward,
  qt as deleteLineBoundaryForward,
  Ft as deleteToLineEnd,
  nn as emacsStyleKeymap,
  un as historyKeymap,
  en as indentLess,
  _t as indentMore,
  wt as indentSelection,
  jt as insertBlankLine,
  oe as insertNewlineAndIndent,
  we as invertedEffects,
  je as isolateHistory,
  Wt as moveLineDown,
  $t as moveLineUp,
  Z as redo,
  rt as redoSelection,
  vt as selectAll,
  De as selectCharLeft,
  Ce as selectCharRight,
  re as selectDocEnd,
  ne as selectDocStart,
  Dt as selectGroupLeft,
  Ct as selectGroupRight,
  Vt as selectLine,
  Ot as selectLineBoundaryBackward,
  Et as selectLineBoundaryForward,
  Tt as selectLineBoundaryLeft,
  bt as selectLineBoundaryRight,
  Oe as selectLineDown,
  It as selectLineEnd,
  Rt as selectLineStart,
  Ee as selectLineUp,
  _ as selectPageDown,
  w as selectPageUp,
  Nt as selectParentSyntax,
  Lt as selectSyntaxLeft,
  Mt as selectSyntaxRight,
  Jt as simplifySelection,
  Ht as splitLine,
  rn as standardKeymap,
  We as toggleBlockComment,
  Qe as toggleBlockCommentByLine,
  Ke as toggleComment,
  $e as toggleLineComment,
  tn as toggleTabFocusMode,
  Kt as transposeChars,
  tt as undo,
  nt as undoSelection
};
