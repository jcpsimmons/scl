import { RangeValue as a } from "./index60.js";
import { syntaxTree as l } from "./index68.js";
class u {
  /**
  Create a new completion context. (Mostly useful for testing
  completion sources—in the editor, the extension will create
  these for you.)
  */
  constructor(s, t, e, o) {
    this.state = s, this.pos = t, this.explicit = e, this.view = o, this.abortListeners = [], this.abortOnDocChange = !1;
  }
  /**
  Get the extent, content, and (if there is a token) type of the
  token before `this.pos`.
  */
  tokenBefore(s) {
    let t = l(this.state).resolveInner(this.pos, -1);
    for (; t && s.indexOf(t.name) < 0; )
      t = t.parent;
    return t ? {
      from: t.from,
      to: this.pos,
      text: this.state.sliceDoc(t.from, this.pos),
      type: t.type
    } : null;
  }
  /**
  Get the match of the given expression directly before the
  cursor.
  */
  matchBefore(s) {
    let t = this.state.doc.lineAt(this.pos), e = Math.max(t.from, this.pos - 250), o = t.text.slice(e - t.from, this.pos - t.from), n = o.search(h(s));
    return n < 0 ? null : { from: e + n, to: this.pos, text: o.slice(n) };
  }
  /**
  Yields true when the query has been aborted. Can be useful in
  asynchronous queries to avoid doing work that will be ignored.
  */
  get aborted() {
    return this.abortListeners == null;
  }
  /**
  Allows you to register abort handlers, which will be called when
  the query is
  [aborted](https://codemirror.net/6/docs/ref/#autocomplete.CompletionContext.aborted).
  
  By default, running queries will not be aborted for regular
  typing or backspacing, on the assumption that they are likely to
  return a result with a
  [`validFor`](https://codemirror.net/6/docs/ref/#autocomplete.CompletionResult.validFor) field that
  allows the result to be used after all. Passing `onDocChange:
  true` will cause this query to be aborted for any document
  change.
  */
  addEventListener(s, t, e) {
    s == "abort" && this.abortListeners && (this.abortListeners.push(t), e && e.onDocChange && (this.abortOnDocChange = !0));
  }
}
function h(r, s) {
  var t;
  let { source: e } = r, o = e[e.length - 1] != "$";
  return o ? new RegExp(`(?:${e})${o ? "$" : ""}`, (t = r.flags) !== null && t !== void 0 ? t : r.ignoreCase ? "i" : "") : r;
}
const i = /* @__PURE__ */ new class extends a {
}();
i.startSide = 1;
i.endSide = -1;
export {
  u as CompletionContext
};
