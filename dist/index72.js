import { NodeProp as p, Tree as x, IterMode as me, TreeFragment as P, Parser as ge, NodeType as V } from "./index113.js";
import { Facet as w, Prec as ke, EditorState as I, countColumn as we, RangeSetBuilder as ye, StateEffect as O, StateField as ee, combineConfig as ve } from "./index64.js";
import { EditorView as y, ViewPlugin as te, Decoration as g, logException as be, WidgetType as re, Direction as z } from "./index63.js";
import { tagHighlighter as xe, highlightTree as Te, tags as Se, styleTags as Ce } from "./index119.js";
import { StyleModule as q } from "./index108.js";
var N;
const T = /* @__PURE__ */ new p();
function Ae(n) {
  return w.define({
    combine: n ? (e) => e.concat(n) : void 0
  });
}
const Pe = /* @__PURE__ */ new p();
class c {
  /**
  Construct a language object. If you need to invoke this
  directly, first define a data facet with
  [`defineLanguageFacet`](https://codemirror.net/6/docs/ref/#language.defineLanguageFacet), and then
  configure your parser to [attach](https://codemirror.net/6/docs/ref/#language.languageDataProp) it
  to the language's outer syntax node.
  */
  constructor(e, t, r = [], i = "") {
    this.data = e, this.name = i, I.prototype.hasOwnProperty("tree") || Object.defineProperty(I.prototype, "tree", { get() {
      return k(this);
    } }), this.parser = t, this.extension = [
      C.of(this),
      I.languageData.of((s, o, a) => {
        let l = J(s, o, a), u = l.type.prop(T);
        if (!u)
          return [];
        let h = s.facet(u), f = l.type.prop(Pe);
        if (f) {
          let m = l.resolve(o - l.from, a);
          for (let d of f)
            if (d.test(m, s)) {
              let v = s.facet(d.facet);
              return d.type == "replace" ? v : v.concat(h);
            }
        }
        return h;
      })
    ].concat(r);
  }
  /**
  Query whether this language is active at the given position.
  */
  isActiveAt(e, t, r = -1) {
    return J(e, t, r).type.prop(T) == this.data;
  }
  /**
  Find the document regions that were parsed using this language.
  The returned regions will _include_ any nested languages rooted
  in this language, when those exist.
  */
  findRegions(e) {
    let t = e.facet(C);
    if ((t == null ? void 0 : t.data) == this.data)
      return [{ from: 0, to: e.doc.length }];
    if (!t || !t.allowsNesting)
      return [];
    let r = [], i = (s, o) => {
      if (s.prop(T) == this.data) {
        r.push({ from: o, to: o + s.length });
        return;
      }
      let a = s.prop(p.mounted);
      if (a) {
        if (a.tree.prop(T) == this.data) {
          if (a.overlay)
            for (let l of a.overlay)
              r.push({ from: l.from + o, to: l.to + o });
          else
            r.push({ from: o, to: o + s.length });
          return;
        } else if (a.overlay) {
          let l = r.length;
          if (i(a.tree, a.overlay[0].from + o), r.length > l)
            return;
        }
      }
      for (let l = 0; l < s.children.length; l++) {
        let u = s.children[l];
        u instanceof x && i(u, s.positions[l] + o);
      }
    };
    return i(k(e), 0), r;
  }
  /**
  Indicates whether this language allows nested languages. The
  default implementation returns true.
  */
  get allowsNesting() {
    return !0;
  }
}
c.setState = /* @__PURE__ */ O.define();
function J(n, e, t) {
  let r = n.facet(C), i = k(n).topNode;
  if (!r || r.allowsNesting)
    for (let s = i; s; s = s.enter(e, t, me.ExcludeBuffers))
      s.type.isTop && (i = s);
  return i;
}
class M extends c {
  constructor(e, t, r) {
    super(e, t, [], r), this.parser = t;
  }
  /**
  Define a language from a parser.
  */
  static define(e) {
    let t = Ae(e.languageData);
    return new M(t, e.parser.configure({
      props: [T.add((r) => r.isTop ? t : void 0)]
    }), e.name);
  }
  /**
  Create a new instance of this language with a reconfigured
  version of its parser and optionally a new name.
  */
  configure(e, t) {
    return new M(this.data, this.parser.configure(e), t || this.name);
  }
  get allowsNesting() {
    return this.parser.hasWrappers();
  }
}
function k(n) {
  let e = n.field(c.state, !1);
  return e ? e.tree : x.empty;
}
function mt(n, e, t = 50) {
  var r;
  let i = (r = n.field(c.state, !1)) === null || r === void 0 ? void 0 : r.context;
  if (!i)
    return null;
  let s = i.viewport;
  i.updateViewport({ from: 0, to: e });
  let o = i.isDone(e) || i.work(t, e) ? i.tree : null;
  return i.updateViewport(s), o;
}
class Ie {
  /**
  Create an input object for the given document.
  */
  constructor(e) {
    this.doc = e, this.cursorPos = 0, this.string = "", this.cursor = e.iter();
  }
  get length() {
    return this.doc.length;
  }
  syncTo(e) {
    return this.string = this.cursor.next(e - this.cursorPos).value, this.cursorPos = e + this.string.length, this.cursorPos - this.string.length;
  }
  chunk(e) {
    return this.syncTo(e), this.string;
  }
  get lineChunks() {
    return !0;
  }
  read(e, t) {
    let r = this.cursorPos - this.string.length;
    return e < r || t >= this.cursorPos ? this.doc.sliceString(e, t) : this.string.slice(e - r, t - r);
  }
}
let A = null;
class D {
  constructor(e, t, r = [], i, s, o, a, l) {
    this.parser = e, this.state = t, this.fragments = r, this.tree = i, this.treeLen = s, this.viewport = o, this.skipped = a, this.scheduleOn = l, this.parse = null, this.tempSkipped = [];
  }
  /**
  @internal
  */
  static create(e, t, r) {
    return new D(e, t, [], x.empty, 0, r, [], null);
  }
  startParse() {
    return this.parser.startParse(new Ie(this.state.doc), this.fragments);
  }
  /**
  @internal
  */
  work(e, t) {
    return t != null && t >= this.state.doc.length && (t = void 0), this.tree != x.empty && this.isDone(t ?? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
      var r;
      if (typeof e == "number") {
        let i = Date.now() + e;
        e = () => Date.now() > i;
      }
      for (this.parse || (this.parse = this.startParse()), t != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > t) && t < this.state.doc.length && this.parse.stopAt(t); ; ) {
        let i = this.parse.advance();
        if (i)
          if (this.fragments = this.withoutTempSkipped(P.addTree(i, this.fragments, this.parse.stoppedAt != null)), this.treeLen = (r = this.parse.stoppedAt) !== null && r !== void 0 ? r : this.state.doc.length, this.tree = i, this.parse = null, this.treeLen < (t ?? this.state.doc.length))
            this.parse = this.startParse();
          else
            return !0;
        if (e())
          return !1;
      }
    });
  }
  /**
  @internal
  */
  takeTree() {
    let e, t;
    this.parse && (e = this.parse.parsedPos) >= this.treeLen && ((this.parse.stoppedAt == null || this.parse.stoppedAt > e) && this.parse.stopAt(e), this.withContext(() => {
      for (; !(t = this.parse.advance()); )
        ;
    }), this.treeLen = e, this.tree = t, this.fragments = this.withoutTempSkipped(P.addTree(this.tree, this.fragments, !0)), this.parse = null);
  }
  withContext(e) {
    let t = A;
    A = this;
    try {
      return e();
    } finally {
      A = t;
    }
  }
  withoutTempSkipped(e) {
    for (let t; t = this.tempSkipped.pop(); )
      e = G(e, t.from, t.to);
    return e;
  }
  /**
  @internal
  */
  changes(e, t) {
    let { fragments: r, tree: i, treeLen: s, viewport: o, skipped: a } = this;
    if (this.takeTree(), !e.empty) {
      let l = [];
      if (e.iterChangedRanges((u, h, f, m) => l.push({ fromA: u, toA: h, fromB: f, toB: m })), r = P.applyChanges(r, l), i = x.empty, s = 0, o = { from: e.mapPos(o.from, -1), to: e.mapPos(o.to, 1) }, this.skipped.length) {
        a = [];
        for (let u of this.skipped) {
          let h = e.mapPos(u.from, 1), f = e.mapPos(u.to, -1);
          h < f && a.push({ from: h, to: f });
        }
      }
    }
    return new D(this.parser, t, r, i, s, o, a, this.scheduleOn);
  }
  /**
  @internal
  */
  updateViewport(e) {
    if (this.viewport.from == e.from && this.viewport.to == e.to)
      return !1;
    this.viewport = e;
    let t = this.skipped.length;
    for (let r = 0; r < this.skipped.length; r++) {
      let { from: i, to: s } = this.skipped[r];
      i < e.to && s > e.from && (this.fragments = G(this.fragments, i, s), this.skipped.splice(r--, 1));
    }
    return this.skipped.length >= t ? !1 : (this.reset(), !0);
  }
  /**
  @internal
  */
  reset() {
    this.parse && (this.takeTree(), this.parse = null);
  }
  /**
  Notify the parse scheduler that the given region was skipped
  because it wasn't in view, and the parse should be restarted
  when it comes into view.
  */
  skipUntilInView(e, t) {
    this.skipped.push({ from: e, to: t });
  }
  /**
  Returns a parser intended to be used as placeholder when
  asynchronously loading a nested parser. It'll skip its input and
  mark it as not-really-parsed, so that the next update will parse
  it again.
  
  When `until` is given, a reparse will be scheduled when that
  promise resolves.
  */
  static getSkippingParser(e) {
    return new class extends ge {
      createParse(t, r, i) {
        let s = i[0].from, o = i[i.length - 1].to;
        return {
          parsedPos: s,
          advance() {
            let l = A;
            if (l) {
              for (let u of i)
                l.tempSkipped.push(u);
              e && (l.scheduleOn = l.scheduleOn ? Promise.all([l.scheduleOn, e]) : e);
            }
            return this.parsedPos = o, new x(V.none, [], [], o - s);
          },
          stoppedAt: null,
          stopAt() {
          }
        };
      }
    }();
  }
  /**
  @internal
  */
  isDone(e) {
    e = Math.min(e, this.state.doc.length);
    let t = this.fragments;
    return this.treeLen >= e && t.length && t[0].from == 0 && t[0].to >= e;
  }
  /**
  Get the context for the current parse, or `null` if no editor
  parse is in progress.
  */
  static get() {
    return A;
  }
}
function G(n, e, t) {
  return P.applyChanges(n, [{ fromA: e, toA: t, fromB: e, toB: t }]);
}
class S {
  constructor(e) {
    this.context = e, this.tree = e.tree;
  }
  apply(e) {
    if (!e.docChanged && this.tree == this.context.tree)
      return this;
    let t = this.context.changes(e.changes, e.state), r = this.context.treeLen == e.startState.doc.length ? void 0 : Math.max(e.changes.mapPos(this.context.treeLen), t.viewport.to);
    return t.work(20, r) || t.takeTree(), new S(t);
  }
  static init(e) {
    let t = Math.min(3e3, e.doc.length), r = D.create(e.facet(C).parser, e, { from: 0, to: t });
    return r.work(20, t) || r.takeTree(), new S(r);
  }
}
c.state = /* @__PURE__ */ ee.define({
  create: S.init,
  update(n, e) {
    for (let t of e.effects)
      if (t.is(c.setState))
        return t.value;
    return e.startState.facet(C) != e.state.facet(C) ? S.init(e.state) : n.apply(e);
  }
});
let ne = (n) => {
  let e = setTimeout(
    () => n(),
    500
    /* Work.MaxPause */
  );
  return () => clearTimeout(e);
};
typeof requestIdleCallback < "u" && (ne = (n) => {
  let e = -1, t = setTimeout(
    () => {
      e = requestIdleCallback(n, {
        timeout: 400
        /* Work.MinPause */
      });
    },
    100
    /* Work.MinPause */
  );
  return () => e < 0 ? clearTimeout(t) : cancelIdleCallback(e);
});
const F = typeof navigator < "u" && (!((N = navigator.scheduling) === null || N === void 0) && N.isInputPending) ? () => navigator.scheduling.isInputPending() : null, De = /* @__PURE__ */ te.fromClass(class {
  constructor(e) {
    this.view = e, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
  }
  update(e) {
    let t = this.view.state.field(c.state).context;
    (t.updateViewport(e.view.viewport) || this.view.viewport.to > t.treeLen) && this.scheduleWork(), (e.docChanged || e.selectionSet) && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(t);
  }
  scheduleWork() {
    if (this.working)
      return;
    let { state: e } = this.view, t = e.field(c.state);
    (t.tree != t.context.tree || !t.context.isDone(e.doc.length)) && (this.working = ne(this.work));
  }
  work(e) {
    this.working = null;
    let t = Date.now();
    if (this.chunkEnd < t && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = t + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0)
      return;
    let { state: r, viewport: { to: i } } = this.view, s = r.field(c.state);
    if (s.tree == s.context.tree && s.context.isDone(
      i + 1e5
      /* Work.MaxParseAhead */
    ))
      return;
    let o = Date.now() + Math.min(this.chunkBudget, 100, e && !F ? Math.max(25, e.timeRemaining() - 5) : 1e9), a = s.context.treeLen < i && r.doc.length > i + 1e3, l = s.context.work(() => F && F() || Date.now() > o, i + (a ? 0 : 1e5));
    this.chunkBudget -= Date.now() - t, (l || this.chunkBudget <= 0) && (s.context.takeTree(), this.view.dispatch({ effects: c.setState.of(new S(s.context)) })), this.chunkBudget > 0 && !(l && !a) && this.scheduleWork(), this.checkAsyncSchedule(s.context);
  }
  checkAsyncSchedule(e) {
    e.scheduleOn && (this.workScheduled++, e.scheduleOn.then(() => this.scheduleWork()).catch((t) => be(this.view.state, t)).then(() => this.workScheduled--), e.scheduleOn = null);
  }
  destroy() {
    this.working && this.working();
  }
  isWorking() {
    return !!(this.working || this.workScheduled > 0);
  }
}, {
  eventHandlers: { focus() {
    this.scheduleWork();
  } }
}), C = /* @__PURE__ */ w.define({
  combine(n) {
    return n.length ? n[0] : null;
  },
  enables: (n) => [
    c.state,
    De,
    y.contentAttributes.compute([n], (e) => {
      let t = e.facet(n);
      return t && t.name ? { "data-language": t.name } : {};
    })
  ]
});
class kt {
  /**
  Create a language support object.
  */
  constructor(e, t = []) {
    this.language = e, this.support = t, this.extension = [e, t];
  }
}
class ie {
  constructor(e, t, r, i, s, o = void 0) {
    this.name = e, this.alias = t, this.extensions = r, this.filename = i, this.loadFunc = s, this.support = o, this.loading = null;
  }
  /**
  Start loading the the language. Will return a promise that
  resolves to a [`LanguageSupport`](https://codemirror.net/6/docs/ref/#language.LanguageSupport)
  object when the language successfully loads.
  */
  load() {
    return this.loading || (this.loading = this.loadFunc().then((e) => this.support = e, (e) => {
      throw this.loading = null, e;
    }));
  }
  /**
  Create a language description.
  */
  static of(e) {
    let { load: t, support: r } = e;
    if (!t) {
      if (!r)
        throw new RangeError("Must pass either 'load' or 'support' to LanguageDescription.of");
      t = () => Promise.resolve(r);
    }
    return new ie(e.name, (e.alias || []).concat(e.name).map((i) => i.toLowerCase()), e.extensions || [], e.filename, t, r);
  }
  /**
  Look for a language in the given array of descriptions that
  matches the filename. Will first match
  [`filename`](https://codemirror.net/6/docs/ref/#language.LanguageDescription.filename) patterns,
  and then [extensions](https://codemirror.net/6/docs/ref/#language.LanguageDescription.extensions),
  and return the first language that matches.
  */
  static matchFilename(e, t) {
    for (let i of e)
      if (i.filename && i.filename.test(t))
        return i;
    let r = /\.([^.]+)$/.exec(t);
    if (r) {
      for (let i of e)
        if (i.extensions.indexOf(r[1]) > -1)
          return i;
    }
    return null;
  }
  /**
  Look for a language whose name or alias matches the the given
  name (case-insensitively). If `fuzzy` is true, and no direct
  matchs is found, this'll also search for a language whose name
  or alias occurs in the string (for names shorter than three
  characters, only when surrounded by non-word characters).
  */
  static matchLanguageName(e, t, r = !0) {
    t = t.toLowerCase();
    for (let i of e)
      if (i.alias.some((s) => s == t))
        return i;
    if (r)
      for (let i of e)
        for (let s of i.alias) {
          let o = t.indexOf(s);
          if (o > -1 && (s.length > 2 || !/\w/.test(t[o - 1]) && !/\w/.test(t[o + s.length])))
            return i;
        }
    return null;
  }
}
const Oe = /* @__PURE__ */ w.define(), se = /* @__PURE__ */ w.define({
  combine: (n) => {
    if (!n.length)
      return "  ";
    let e = n[0];
    if (!e || /\S/.test(e) || Array.from(e).some((t) => t != e[0]))
      throw new Error("Invalid indent unit: " + JSON.stringify(n[0]));
    return e;
  }
});
function Be(n) {
  let e = n.facet(se);
  return e.charCodeAt(0) == 9 ? n.tabSize * e.length : e.length;
}
function wt(n, e) {
  let t = "", r = n.tabSize, i = n.facet(se)[0];
  if (i == "	") {
    for (; e >= r; )
      t += "	", e -= r;
    i = " ";
  }
  for (let s = 0; s < e; s++)
    t += i;
  return t;
}
function yt(n, e) {
  n instanceof I && (n = new oe(n));
  for (let r of n.state.facet(Oe)) {
    let i = r(n, e);
    if (i !== void 0)
      return i;
  }
  let t = k(n.state);
  return t.length >= e ? Fe(n, t, e) : null;
}
class oe {
  /**
  Create an indent context.
  */
  constructor(e, t = {}) {
    this.state = e, this.options = t, this.unit = Be(e);
  }
  /**
  Get a description of the line at the given position, taking
  [simulated line
  breaks](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
  into account. If there is such a break at `pos`, the `bias`
  argument determines whether the part of the line line before or
  after the break is used.
  */
  lineAt(e, t = 1) {
    let r = this.state.doc.lineAt(e), { simulateBreak: i, simulateDoubleBreak: s } = this.options;
    return i != null && i >= r.from && i <= r.to ? s && i == e ? { text: "", from: e } : (t < 0 ? i < e : i <= e) ? { text: r.text.slice(i - r.from), from: i } : { text: r.text.slice(0, i - r.from), from: r.from } : r;
  }
  /**
  Get the text directly after `pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  textAfterPos(e, t = 1) {
    if (this.options.simulateDoubleBreak && e == this.options.simulateBreak)
      return "";
    let { text: r, from: i } = this.lineAt(e, t);
    return r.slice(e - i, Math.min(r.length, e + 100 - i));
  }
  /**
  Find the column for the given position.
  */
  column(e, t = 1) {
    let { text: r, from: i } = this.lineAt(e, t), s = this.countColumn(r, e - i), o = this.options.overrideIndentation ? this.options.overrideIndentation(i) : -1;
    return o > -1 && (s += o - this.countColumn(r, r.search(/\S|$/))), s;
  }
  /**
  Find the column position (taking tabs into account) of the given
  position in the given string.
  */
  countColumn(e, t = e.length) {
    return we(e, this.state.tabSize, t);
  }
  /**
  Find the indentation column of the line at the given point.
  */
  lineIndent(e, t = 1) {
    let { text: r, from: i } = this.lineAt(e, t), s = this.options.overrideIndentation;
    if (s) {
      let o = s(i);
      if (o > -1)
        return o;
    }
    return this.countColumn(r, r.search(/\S|$/));
  }
  /**
  Returns the [simulated line
  break](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
  for this context, if any.
  */
  get simulatedBreak() {
    return this.options.simulateBreak || null;
  }
}
const Ne = /* @__PURE__ */ new p();
function Fe(n, e, t) {
  let r = e.resolveStack(t), i = e.resolveInner(t, -1).resolve(t, 0).enterUnfinishedNodesBefore(t);
  if (i != r.node) {
    let s = [];
    for (let o = i; o && !(o.from < r.node.from || o.to > r.node.to || o.from == r.node.from && o.type == r.node.type); o = o.parent)
      s.push(o);
    for (let o = s.length - 1; o >= 0; o--)
      r = { node: s[o], next: r };
  }
  return le(r, n, t);
}
function le(n, e, t) {
  for (let r = n; r; r = r.next) {
    let i = Le(r.node);
    if (i)
      return i($.create(e, t, r));
  }
  return 0;
}
function Ee(n) {
  return n.pos == n.options.simulateBreak && n.options.simulateDoubleBreak;
}
function Le(n) {
  let e = n.type.prop(Ne);
  if (e)
    return e;
  let t = n.firstChild, r;
  if (t && (r = t.type.prop(p.closedBy))) {
    let i = n.lastChild, s = i && r.indexOf(i.name) > -1;
    return (o) => ae(o, !0, 1, void 0, s && !Ee(o) ? i.from : void 0);
  }
  return n.parent == null ? Me : null;
}
function Me() {
  return 0;
}
class $ extends oe {
  constructor(e, t, r) {
    super(e.state, e.options), this.base = e, this.pos = t, this.context = r;
  }
  /**
  The syntax tree node to which the indentation strategy
  applies.
  */
  get node() {
    return this.context.node;
  }
  /**
  @internal
  */
  static create(e, t, r) {
    return new $(e, t, r);
  }
  /**
  Get the text directly after `this.pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  get textAfter() {
    return this.textAfterPos(this.pos);
  }
  /**
  Get the indentation at the reference line for `this.node`, which
  is the line on which it starts, unless there is a node that is
  _not_ a parent of this node covering the start of that line. If
  so, the line at the start of that node is tried, again skipping
  on if it is covered by another such node.
  */
  get baseIndent() {
    return this.baseIndentFor(this.node);
  }
  /**
  Get the indentation for the reference line of the given node
  (see [`baseIndent`](https://codemirror.net/6/docs/ref/#language.TreeIndentContext.baseIndent)).
  */
  baseIndentFor(e) {
    let t = this.state.doc.lineAt(e.from);
    for (; ; ) {
      let r = e.resolve(t.from);
      for (; r.parent && r.parent.from == r.from; )
        r = r.parent;
      if (We(r, e))
        break;
      t = this.state.doc.lineAt(r.from);
    }
    return this.lineIndent(t.from);
  }
  /**
  Continue looking for indentations in the node's parent nodes,
  and return the result of that.
  */
  continue() {
    return le(this.context.next, this.base, this.pos);
  }
}
function We(n, e) {
  for (let t = e; t; t = t.parent)
    if (n == t)
      return !0;
  return !1;
}
function Re(n) {
  let e = n.node, t = e.childAfter(e.from), r = e.lastChild;
  if (!t)
    return null;
  let i = n.options.simulateBreak, s = n.state.doc.lineAt(t.from), o = i == null || i <= s.from ? s.to : Math.min(s.to, i);
  for (let a = t.to; ; ) {
    let l = e.childAfter(a);
    if (!l || l == r)
      return null;
    if (!l.type.isSkipped) {
      if (l.from >= o)
        return null;
      let u = /^ */.exec(s.text.slice(t.to - s.from))[0].length;
      return { from: t.from, to: t.to + u };
    }
    a = l.to;
  }
}
function vt({ closing: n, align: e = !0, units: t = 1 }) {
  return (r) => ae(r, e, t, n);
}
function ae(n, e, t, r, i) {
  let s = n.textAfter, o = s.match(/^\s*/)[0].length, a = r && s.slice(o, o + r.length) == r || i == n.pos + o, l = e ? Re(n) : null;
  return l ? a ? n.column(l.from) : n.column(l.to) : n.baseIndent + (a ? 0 : n.unit * t);
}
const bt = (n) => n.baseIndent;
function xt({ except: n, units: e = 1 } = {}) {
  return (t) => {
    let r = n && n.test(t.textAfter);
    return t.baseIndent + (r ? 0 : e * t.unit);
  };
}
const He = /* @__PURE__ */ w.define(), Ve = /* @__PURE__ */ new p();
function Tt(n) {
  let e = n.firstChild, t = n.lastChild;
  return e && e.to < t.from ? { from: e.to, to: t.type.isError ? n.to : t.from } : null;
}
function $e(n, e, t) {
  let r = k(n);
  if (r.length < t)
    return null;
  let i = r.resolveStack(t, 1), s = null;
  for (let o = i; o; o = o.next) {
    let a = o.node;
    if (a.to <= t || a.from > t)
      continue;
    if (s && a.from < e)
      break;
    let l = a.type.prop(Ve);
    if (l && (a.to < r.length - 50 || r.length == n.doc.length || !Ue(a))) {
      let u = l(a, n);
      u && u.from <= t && u.from >= e && u.to > t && (s = u);
    }
  }
  return s;
}
function Ue(n) {
  let e = n.lastChild;
  return e && e.to == n.to && e.type.isError;
}
function je(n, e, t) {
  for (let r of n.facet(He)) {
    let i = r(n, e, t);
    if (i)
      return i;
  }
  return $e(n, e, t);
}
function ue(n, e) {
  let t = e.mapPos(n.from, 1), r = e.mapPos(n.to, -1);
  return t >= r ? void 0 : { from: t, to: r };
}
const he = /* @__PURE__ */ O.define({ map: ue }), fe = /* @__PURE__ */ O.define({ map: ue });
function ze(n) {
  let e = [];
  for (let { head: t } of n.state.selection.ranges)
    e.some((r) => r.from <= t && r.to >= t) || e.push(n.lineBlockAt(t));
  return e;
}
const U = /* @__PURE__ */ ee.define({
  create() {
    return g.none;
  },
  update(n, e) {
    e.isUserEvent("delete") && e.changes.iterChangedRanges((t, r) => n = K(n, t, r)), n = n.map(e.changes);
    for (let t of e.effects)
      if (t.is(he) && !Je(n, t.value.from, t.value.to)) {
        let { preparePlaceholder: r } = e.state.facet(ce), i = r ? g.replace({ widget: new Ye(r(e.state, t.value)) }) : Q;
        n = n.update({ add: [i.range(t.value.from, t.value.to)] });
      } else t.is(fe) && (n = n.update({
        filter: (r, i) => t.value.from != r || t.value.to != i,
        filterFrom: t.value.from,
        filterTo: t.value.to
      }));
    return e.selection && (n = K(n, e.selection.main.head)), n;
  },
  provide: (n) => y.decorations.from(n),
  toJSON(n, e) {
    let t = [];
    return n.between(0, e.doc.length, (r, i) => {
      t.push(r, i);
    }), t;
  },
  fromJSON(n) {
    if (!Array.isArray(n) || n.length % 2)
      throw new RangeError("Invalid JSON for fold state");
    let e = [];
    for (let t = 0; t < n.length; ) {
      let r = n[t++], i = n[t++];
      if (typeof r != "number" || typeof i != "number")
        throw new RangeError("Invalid JSON for fold state");
      e.push(Q.range(r, i));
    }
    return g.set(e, !0);
  }
});
function K(n, e, t = e) {
  let r = !1;
  return n.between(e, t, (i, s) => {
    i < t && s > e && (r = !0);
  }), r ? n.update({
    filterFrom: e,
    filterTo: t,
    filter: (i, s) => i >= t || s <= e
  }) : n;
}
function qe(n, e, t) {
  var r;
  let i = null;
  return (r = n.field(U, !1)) === null || r === void 0 || r.between(e, t, (s, o) => {
    (!i || i.from > s) && (i = { from: s, to: o });
  }), i;
}
function Je(n, e, t) {
  let r = !1;
  return n.between(e, e, (i, s) => {
    i == e && s == t && (r = !0);
  }), r;
}
function Ge(n, e) {
  return n.field(U, !1) ? e : e.concat(O.appendConfig.of(Xe()));
}
const St = (n) => {
  for (let e of ze(n)) {
    let t = je(n.state, e.from, e.to);
    if (t)
      return n.dispatch({ effects: Ge(n.state, [he.of(t), Ke(n, t)]) }), !0;
  }
  return !1;
};
function Ke(n, e, t = !0) {
  let r = n.state.doc.lineAt(e.from).number, i = n.state.doc.lineAt(e.to).number;
  return y.announce.of(`${n.state.phrase(t ? "Folded lines" : "Unfolded lines")} ${r} ${n.state.phrase("to")} ${i}.`);
}
const Qe = {
  placeholderDOM: null,
  preparePlaceholder: null,
  placeholderText: "…"
}, ce = /* @__PURE__ */ w.define({
  combine(n) {
    return ve(n, Qe);
  }
});
function Xe(n) {
  return [U, Ze];
}
function de(n, e) {
  let { state: t } = n, r = t.facet(ce), i = (o) => {
    let a = n.lineBlockAt(n.posAtDOM(o.target)), l = qe(n.state, a.from, a.to);
    l && n.dispatch({ effects: fe.of(l) }), o.preventDefault();
  };
  if (r.placeholderDOM)
    return r.placeholderDOM(n, i, e);
  let s = document.createElement("span");
  return s.textContent = r.placeholderText, s.setAttribute("aria-label", t.phrase("folded code")), s.title = t.phrase("unfold"), s.className = "cm-foldPlaceholder", s.onclick = i, s;
}
const Q = /* @__PURE__ */ g.replace({ widget: /* @__PURE__ */ new class extends re {
  toDOM(n) {
    return de(n, null);
  }
}() });
class Ye extends re {
  constructor(e) {
    super(), this.value = e;
  }
  eq(e) {
    return this.value == e.value;
  }
  toDOM(e) {
    return de(e, this.value);
  }
}
const Ze = /* @__PURE__ */ y.baseTheme({
  ".cm-foldPlaceholder": {
    backgroundColor: "#eee",
    border: "1px solid #ddd",
    color: "#888",
    borderRadius: ".2em",
    margin: "0 1px",
    padding: "0 1px",
    cursor: "pointer"
  },
  ".cm-foldGutter span": {
    padding: "0 1px",
    cursor: "pointer"
  }
});
class j {
  constructor(e, t) {
    this.specs = e;
    let r;
    function i(a) {
      let l = q.newName();
      return (r || (r = /* @__PURE__ */ Object.create(null)))["." + l] = a, l;
    }
    const s = typeof t.all == "string" ? t.all : t.all ? i(t.all) : void 0, o = t.scope;
    this.scope = o instanceof c ? (a) => a.prop(T) == o.data : o ? (a) => a == o : void 0, this.style = xe(e.map((a) => ({
      tag: a.tag,
      class: a.class || i(Object.assign({}, a, { tag: null }))
    })), {
      all: s
    }).style, this.module = r ? new q(r) : null, this.themeType = t.themeType;
  }
  /**
  Create a highlighter style that associates the given styles to
  the given tags. The specs must be objects that hold a style tag
  or array of tags in their `tag` property, and either a single
  `class` property providing a static CSS class (for highlighter
  that rely on external styling), or a
  [`style-mod`](https://github.com/marijnh/style-mod#documentation)-style
  set of CSS properties (which define the styling for those tags).
  
  The CSS rules created for a highlighter will be emitted in the
  order of the spec's properties. That means that for elements that
  have multiple tags associated with them, styles defined further
  down in the list will have a higher CSS precedence than styles
  defined earlier.
  */
  static define(e, t) {
    return new j(e, t || {});
  }
}
const W = /* @__PURE__ */ w.define(), _e = /* @__PURE__ */ w.define({
  combine(n) {
    return n.length ? [n[0]] : null;
  }
});
function E(n) {
  let e = n.facet(W);
  return e.length ? e : n.facet(_e);
}
function Ct(n, e) {
  let t = [tt], r;
  return n instanceof j && (n.module && t.push(y.styleModule.of(n.module)), r = n.themeType), r ? t.push(W.computeN([y.darkTheme], (i) => i.facet(y.darkTheme) == (r == "dark") ? [n] : [])) : t.push(W.of(n)), t;
}
class et {
  constructor(e) {
    this.markCache = /* @__PURE__ */ Object.create(null), this.tree = k(e.state), this.decorations = this.buildDeco(e, E(e.state)), this.decoratedTo = e.viewport.to;
  }
  update(e) {
    let t = k(e.state), r = E(e.state), i = r != E(e.startState), { viewport: s } = e.view, o = e.changes.mapPos(this.decoratedTo, 1);
    t.length < s.to && !i && t.type == this.tree.type && o >= s.to ? (this.decorations = this.decorations.map(e.changes), this.decoratedTo = o) : (t != this.tree || e.viewportChanged || i) && (this.tree = t, this.decorations = this.buildDeco(e.view, r), this.decoratedTo = s.to);
  }
  buildDeco(e, t) {
    if (!t || !this.tree.length)
      return g.none;
    let r = new ye();
    for (let { from: i, to: s } of e.visibleRanges)
      Te(this.tree, t, (o, a, l) => {
        r.add(o, a, this.markCache[l] || (this.markCache[l] = g.mark({ class: l })));
      }, i, s);
    return r.finish();
  }
}
const tt = /* @__PURE__ */ ke.high(/* @__PURE__ */ te.fromClass(et, {
  decorations: (n) => n.decorations
})), rt = 1e4, nt = "()[]{}", it = /* @__PURE__ */ new p();
function R(n, e, t) {
  let r = n.prop(e < 0 ? p.openedBy : p.closedBy);
  if (r)
    return r;
  if (n.name.length == 1) {
    let i = t.indexOf(n.name);
    if (i > -1 && i % 2 == (e < 0 ? 1 : 0))
      return [t[i + e]];
  }
  return null;
}
function H(n) {
  let e = n.type.prop(it);
  return e ? e(n.node) : n;
}
function At(n, e, t, r = {}) {
  let i = r.maxScanDistance || rt, s = r.brackets || nt, o = k(n), a = o.resolveInner(e, t);
  for (let l = a; l; l = l.parent) {
    let u = R(l.type, t, s);
    if (u && l.from < l.to) {
      let h = H(l);
      if (h && (t > 0 ? e >= h.from && e < h.to : e > h.from && e <= h.to))
        return st(n, e, t, l, h, u, s);
    }
  }
  return ot(n, e, t, o, a.type, i, s);
}
function st(n, e, t, r, i, s, o) {
  let a = r.parent, l = { from: i.from, to: i.to }, u = 0, h = a == null ? void 0 : a.cursor();
  if (h && (t < 0 ? h.childBefore(r.from) : h.childAfter(r.to)))
    do
      if (t < 0 ? h.to <= r.from : h.from >= r.to) {
        if (u == 0 && s.indexOf(h.type.name) > -1 && h.from < h.to) {
          let f = H(h);
          return { start: l, end: f ? { from: f.from, to: f.to } : void 0, matched: !0 };
        } else if (R(h.type, t, o))
          u++;
        else if (R(h.type, -t, o)) {
          if (u == 0) {
            let f = H(h);
            return {
              start: l,
              end: f && f.from < f.to ? { from: f.from, to: f.to } : void 0,
              matched: !1
            };
          }
          u--;
        }
      }
    while (t < 0 ? h.prevSibling() : h.nextSibling());
  return { start: l, matched: !1 };
}
function ot(n, e, t, r, i, s, o) {
  let a = t < 0 ? n.sliceDoc(e - 1, e) : n.sliceDoc(e, e + 1), l = o.indexOf(a);
  if (l < 0 || l % 2 == 0 != t > 0)
    return null;
  let u = { from: t < 0 ? e - 1 : e, to: t > 0 ? e + 1 : e }, h = n.doc.iterRange(e, t > 0 ? n.doc.length : 0), f = 0;
  for (let m = 0; !h.next().done && m <= s; ) {
    let d = h.value;
    t < 0 && (m += d.length);
    let v = e + m * t;
    for (let b = t > 0 ? 0 : d.length - 1, pe = t > 0 ? d.length : -1; b != pe; b += t) {
      let B = o.indexOf(d[b]);
      if (!(B < 0 || r.resolveInner(v + b, 1).type != i))
        if (B % 2 == 0 == t > 0)
          f++;
        else {
          if (f == 1)
            return { start: u, end: { from: v + b, to: v + b + 1 }, matched: B >> 1 == l >> 1 };
          f--;
        }
    }
    t > 0 && (m += d.length);
  }
  return h.done ? { start: u, matched: !1 } : null;
}
function X(n, e, t, r = 0, i = 0) {
  e == null && (e = n.search(/[^\s\u00a0]/), e == -1 && (e = n.length));
  let s = i;
  for (let o = r; o < e; o++)
    n.charCodeAt(o) == 9 ? s += t - s % t : s++;
  return s;
}
class Pt {
  /**
  Create a stream.
  */
  constructor(e, t, r, i) {
    this.string = e, this.tabSize = t, this.indentUnit = r, this.overrideIndent = i, this.pos = 0, this.start = 0, this.lastColumnPos = 0, this.lastColumnValue = 0;
  }
  /**
  True if we are at the end of the line.
  */
  eol() {
    return this.pos >= this.string.length;
  }
  /**
  True if we are at the start of the line.
  */
  sol() {
    return this.pos == 0;
  }
  /**
  Get the next code unit after the current position, or undefined
  if we're at the end of the line.
  */
  peek() {
    return this.string.charAt(this.pos) || void 0;
  }
  /**
  Read the next code unit and advance `this.pos`.
  */
  next() {
    if (this.pos < this.string.length)
      return this.string.charAt(this.pos++);
  }
  /**
  Match the next character against the given string, regular
  expression, or predicate. Consume and return it if it matches.
  */
  eat(e) {
    let t = this.string.charAt(this.pos), r;
    if (typeof e == "string" ? r = t == e : r = t && (e instanceof RegExp ? e.test(t) : e(t)), r)
      return ++this.pos, t;
  }
  /**
  Continue matching characters that match the given string,
  regular expression, or predicate function. Return true if any
  characters were consumed.
  */
  eatWhile(e) {
    let t = this.pos;
    for (; this.eat(e); )
      ;
    return this.pos > t;
  }
  /**
  Consume whitespace ahead of `this.pos`. Return true if any was
  found.
  */
  eatSpace() {
    let e = this.pos;
    for (; /[\s\u00a0]/.test(this.string.charAt(this.pos)); )
      ++this.pos;
    return this.pos > e;
  }
  /**
  Move to the end of the line.
  */
  skipToEnd() {
    this.pos = this.string.length;
  }
  /**
  Move to directly before the given character, if found on the
  current line.
  */
  skipTo(e) {
    let t = this.string.indexOf(e, this.pos);
    if (t > -1)
      return this.pos = t, !0;
  }
  /**
  Move back `n` characters.
  */
  backUp(e) {
    this.pos -= e;
  }
  /**
  Get the column position at `this.pos`.
  */
  column() {
    return this.lastColumnPos < this.start && (this.lastColumnValue = X(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue;
  }
  /**
  Get the indentation column of the current line.
  */
  indentation() {
    var e;
    return (e = this.overrideIndent) !== null && e !== void 0 ? e : X(this.string, null, this.tabSize);
  }
  /**
  Match the input against the given string or regular expression
  (which should start with a `^`). Return true or the regexp match
  if it matches.
  
  Unless `consume` is set to `false`, this will move `this.pos`
  past the matched text.
  
  When matching a string `caseInsensitive` can be set to true to
  make the match case-insensitive.
  */
  match(e, t, r) {
    if (typeof e == "string") {
      let i = (o) => r ? o.toLowerCase() : o, s = this.string.substr(this.pos, e.length);
      return i(s) == i(e) ? (t !== !1 && (this.pos += e.length), !0) : null;
    } else {
      let i = this.string.slice(this.pos).match(e);
      return i && i.index > 0 ? null : (i && t !== !1 && (this.pos += i[0].length), i);
    }
  }
  /**
  Get the current token.
  */
  current() {
    return this.string.slice(this.start, this.pos);
  }
}
const lt = /* @__PURE__ */ Object.create(null), Y = [V.none], Z = [], _ = /* @__PURE__ */ Object.create(null), at = /* @__PURE__ */ Object.create(null);
for (let [n, e] of [
  ["variable", "variableName"],
  ["variable-2", "variableName.special"],
  ["string-2", "string.special"],
  ["def", "variableName.definition"],
  ["tag", "tagName"],
  ["attribute", "attributeName"],
  ["type", "typeName"],
  ["builtin", "variableName.standard"],
  ["qualifier", "modifier"],
  ["error", "invalid"],
  ["header", "heading"],
  ["property", "propertyName"]
])
  at[n] = /* @__PURE__ */ ut(lt, e);
function L(n, e) {
  Z.indexOf(n) > -1 || (Z.push(n), console.warn(e));
}
function ut(n, e) {
  let t = [];
  for (let a of e.split(" ")) {
    let l = [];
    for (let u of a.split(".")) {
      let h = n[u] || Se[u];
      h ? typeof h == "function" ? l.length ? l = l.map(h) : L(u, `Modifier ${u} used at start of tag`) : l.length ? L(u, `Tag ${u} used as modifier`) : l = Array.isArray(h) ? h : [h] : L(u, `Unknown highlighting tag ${u}`);
    }
    for (let u of l)
      t.push(u);
  }
  if (!t.length)
    return 0;
  let r = e.replace(/ /g, "_"), i = r + " " + t.map((a) => a.id), s = _[i];
  if (s)
    return s.id;
  let o = _[i] = V.define({
    id: Y.length,
    name: r,
    props: [Ce({ [r]: t })]
  });
  return Y.push(o), o.id;
}
z.RTL, z.LTR;
export {
  Ie as DocInput,
  j as HighlightStyle,
  oe as IndentContext,
  M as LRLanguage,
  c as Language,
  ie as LanguageDescription,
  kt as LanguageSupport,
  D as ParseContext,
  Pt as StringStream,
  $ as TreeIndentContext,
  it as bracketMatchingHandle,
  Xe as codeFolding,
  xt as continuedIndent,
  Ae as defineLanguageFacet,
  vt as delimitedIndent,
  mt as ensureSyntaxTree,
  bt as flatIndent,
  St as foldCode,
  he as foldEffect,
  Tt as foldInside,
  Ve as foldNodeProp,
  He as foldService,
  U as foldState,
  je as foldable,
  Be as getIndentUnit,
  yt as getIndentation,
  Ne as indentNodeProp,
  Oe as indentService,
  wt as indentString,
  se as indentUnit,
  C as language,
  T as languageDataProp,
  At as matchBrackets,
  Pe as sublanguageProp,
  Ct as syntaxHighlighting,
  k as syntaxTree,
  fe as unfoldEffect
};
