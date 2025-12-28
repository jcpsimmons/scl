import { StateEffect as W, EditorState as R, CharCategory as u, codePointAt as q, codePointSize as b, fromCodePoint as E, findClusterBreak as S } from "./index66.js";
const v = typeof String.prototype.normalize == "function" ? (n) => n.normalize("NFKD") : (n) => n;
class L {
  /**
  Create a text cursor. The query is the search string, `from` to
  `to` provides the region to search.
  
  When `normalize` is given, it will be called, on both the query
  string and the content it is matched against, before comparing.
  You can, for example, create a case-insensitive search by
  passing `s => s.toLowerCase()`.
  
  Text is always normalized with
  [`.normalize("NFKD")`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
  (when supported).
  */
  constructor(t, r, e = 0, i = t.length, h, s) {
    this.test = s, this.value = { from: 0, to: 0 }, this.done = !1, this.matches = [], this.buffer = "", this.bufferPos = 0, this.iter = t.iterRange(e, i), this.bufferStart = e, this.normalize = h ? (l) => h(v(l)) : v, this.query = this.normalize(r);
  }
  peek() {
    if (this.bufferPos == this.buffer.length) {
      if (this.bufferStart += this.buffer.length, this.iter.next(), this.iter.done)
        return -1;
      this.bufferPos = 0, this.buffer = this.iter.value;
    }
    return q(this.buffer, this.bufferPos);
  }
  /**
  Look for the next match. Updates the iterator's
  [`value`](https://codemirror.net/6/docs/ref/#search.SearchCursor.value) and
  [`done`](https://codemirror.net/6/docs/ref/#search.SearchCursor.done) properties. Should be called
  at least once before using the cursor.
  */
  next() {
    for (; this.matches.length; )
      this.matches.pop();
    return this.nextOverlapping();
  }
  /**
  The `next` method will ignore matches that partially overlap a
  previous match. This method behaves like `next`, but includes
  such matches.
  */
  nextOverlapping() {
    for (; ; ) {
      let t = this.peek();
      if (t < 0)
        return this.done = !0, this;
      let r = E(t), e = this.bufferStart + this.bufferPos;
      this.bufferPos += b(t);
      let i = this.normalize(r);
      if (i.length)
        for (let h = 0, s = e; ; h++) {
          let l = i.charCodeAt(h), m = this.match(l, s, this.bufferPos + this.bufferStart);
          if (h == i.length - 1) {
            if (m)
              return this.value = m, this;
            break;
          }
          s == e && h < r.length && r.charCodeAt(h) == l && s++;
        }
    }
  }
  match(t, r, e) {
    let i = null;
    for (let h = 0; h < this.matches.length; h += 2) {
      let s = this.matches[h], l = !1;
      this.query.charCodeAt(s) == t && (s == this.query.length - 1 ? i = { from: this.matches[h + 1], to: e } : (this.matches[h]++, l = !0)), l || (this.matches.splice(h, 2), h -= 2);
    }
    return this.query.charCodeAt(0) == t && (this.query.length == 1 ? i = { from: r, to: e } : this.matches.push(1, r)), i && this.test && !this.test(i.from, i.to, this.buffer, this.bufferStart) && (i = null), i;
  }
}
typeof Symbol < "u" && (L.prototype[Symbol.iterator] = function() {
  return this;
});
const w = { from: -1, to: -1, match: /* @__PURE__ */ /.*/.exec("") }, x = "gm" + (/x/.unicode == null ? "" : "u");
class y {
  /**
  Create a cursor that will search the given range in the given
  document. `query` should be the raw pattern (as you'd pass it to
  `new RegExp`).
  */
  constructor(t, r, e, i = 0, h = t.length) {
    if (this.text = t, this.to = h, this.curLine = "", this.done = !1, this.value = w, /\\[sWDnr]|\n|\r|\[\^/.test(r))
      return new C(t, r, e, i, h);
    this.re = new RegExp(r, x + (e != null && e.ignoreCase ? "i" : "")), this.test = e == null ? void 0 : e.test, this.iter = t.iter();
    let s = t.lineAt(i);
    this.curLineStart = s.from, this.matchPos = f(t, i), this.getLine(this.curLineStart);
  }
  getLine(t) {
    this.iter.next(t), this.iter.lineBreak ? this.curLine = "" : (this.curLine = this.iter.value, this.curLineStart + this.curLine.length > this.to && (this.curLine = this.curLine.slice(0, this.to - this.curLineStart)), this.iter.next());
  }
  nextLine() {
    this.curLineStart = this.curLineStart + this.curLine.length + 1, this.curLineStart > this.to ? this.curLine = "" : this.getLine(0);
  }
  /**
  Move to the next match, if there is one.
  */
  next() {
    for (let t = this.matchPos - this.curLineStart; ; ) {
      this.re.lastIndex = t;
      let r = this.matchPos <= this.to && this.re.exec(this.curLine);
      if (r) {
        let e = this.curLineStart + r.index, i = e + r[0].length;
        if (this.matchPos = f(this.text, i + (e == i ? 1 : 0)), e == this.curLineStart + this.curLine.length && this.nextLine(), (e < i || e > this.value.to) && (!this.test || this.test(e, i, r)))
          return this.value = { from: e, to: i, match: r }, this;
        t = this.matchPos - this.curLineStart;
      } else if (this.curLineStart + this.curLine.length < this.to)
        this.nextLine(), t = 0;
      else
        return this.done = !0, this;
    }
  }
}
const p = /* @__PURE__ */ new WeakMap();
class o {
  constructor(t, r) {
    this.from = t, this.text = r;
  }
  get to() {
    return this.from + this.text.length;
  }
  static get(t, r, e) {
    let i = p.get(t);
    if (!i || i.from >= e || i.to <= r) {
      let l = new o(r, t.sliceString(r, e));
      return p.set(t, l), l;
    }
    if (i.from == r && i.to == e)
      return i;
    let { text: h, from: s } = i;
    return s > r && (h = t.sliceString(r, s) + h, s = r), i.to < e && (h += t.sliceString(i.to, e)), p.set(t, new o(s, h)), new o(r, h.slice(r - s, e - s));
  }
}
class C {
  constructor(t, r, e, i, h) {
    this.text = t, this.to = h, this.done = !1, this.value = w, this.matchPos = f(t, i), this.re = new RegExp(r, x + (e != null && e.ignoreCase ? "i" : "")), this.test = e == null ? void 0 : e.test, this.flat = o.get(t, i, this.chunkEnd(
      i + 5e3
      /* Chunk.Base */
    ));
  }
  chunkEnd(t) {
    return t >= this.to ? this.to : this.text.lineAt(t).to;
  }
  next() {
    for (; ; ) {
      let t = this.re.lastIndex = this.matchPos - this.flat.from, r = this.re.exec(this.flat.text);
      if (r && !r[0] && r.index == t && (this.re.lastIndex = t + 1, r = this.re.exec(this.flat.text)), r) {
        let e = this.flat.from + r.index, i = e + r[0].length;
        if ((this.flat.to >= this.to || r.index + r[0].length <= this.flat.text.length - 10) && (!this.test || this.test(e, i, r)))
          return this.value = { from: e, to: i, match: r }, this.matchPos = f(this.text, i + (e == i ? 1 : 0)), this;
      }
      if (this.flat.to == this.to)
        return this.done = !0, this;
      this.flat = o.get(this.text, this.flat.from, this.chunkEnd(this.flat.from + this.flat.text.length * 2));
    }
  }
}
typeof Symbol < "u" && (y.prototype[Symbol.iterator] = C.prototype[Symbol.iterator] = function() {
  return this;
});
function A(n) {
  try {
    return new RegExp(n, x), !0;
  } catch {
    return !1;
  }
}
function f(n, t) {
  if (t >= n.length)
    return t;
  let r = n.lineAt(t), e;
  for (; t < r.to && (e = r.text.charCodeAt(t - r.from)) >= 56320 && e < 57344; )
    t++;
  return t;
}
class $ {
  /**
  Create a query object.
  */
  constructor(t) {
    this.search = t.search, this.caseSensitive = !!t.caseSensitive, this.literal = !!t.literal, this.regexp = !!t.regexp, this.replace = t.replace || "", this.valid = !!this.search && (!this.regexp || A(this.search)), this.unquoted = this.unquote(this.search), this.wholeWord = !!t.wholeWord;
  }
  /**
  @internal
  */
  unquote(t) {
    return this.literal ? t : t.replace(/\\([nrt\\])/g, (r, e) => e == "n" ? `
` : e == "r" ? "\r" : e == "t" ? "	" : "\\");
  }
  /**
  Compare this query to another query.
  */
  eq(t) {
    return this.search == t.search && this.replace == t.replace && this.caseSensitive == t.caseSensitive && this.regexp == t.regexp && this.wholeWord == t.wholeWord;
  }
  /**
  @internal
  */
  create() {
    return this.regexp ? new O(this) : new k(this);
  }
  /**
  Get a search cursor for this query, searching through the given
  range in the given state.
  */
  getCursor(t, r = 0, e) {
    let i = t.doc ? t : R.create({ doc: t });
    return e == null && (e = i.doc.length), this.regexp ? c(this, i, r, e) : a(this, i, r, e);
  }
}
class M {
  constructor(t) {
    this.spec = t;
  }
}
function a(n, t, r, e) {
  return new L(t.doc, n.unquoted, r, e, n.caseSensitive ? void 0 : (i) => i.toLowerCase(), n.wholeWord ? P(t.doc, t.charCategorizer(t.selection.main.head)) : void 0);
}
function P(n, t) {
  return (r, e, i, h) => ((h > r || h + i.length < e) && (h = Math.max(0, r - 2), i = n.sliceString(h, Math.min(n.length, e + 2))), (t(d(i, r - h)) != u.Word || t(g(i, r - h)) != u.Word) && (t(g(i, e - h)) != u.Word || t(d(i, e - h)) != u.Word));
}
class k extends M {
  constructor(t) {
    super(t);
  }
  nextMatch(t, r, e) {
    let i = a(this.spec, t, e, t.doc.length).nextOverlapping();
    if (i.done) {
      let h = Math.min(t.doc.length, r + this.spec.unquoted.length);
      i = a(this.spec, t, 0, h).nextOverlapping();
    }
    return i.done || i.value.from == r && i.value.to == e ? null : i.value;
  }
  // Searching in reverse is, rather than implementing an inverted search
  // cursor, done by scanning chunk after chunk forward.
  prevMatchInRange(t, r, e) {
    for (let i = e; ; ) {
      let h = Math.max(r, i - 1e4 - this.spec.unquoted.length), s = a(this.spec, t, h, i), l = null;
      for (; !s.nextOverlapping().done; )
        l = s.value;
      if (l)
        return l;
      if (h == r)
        return null;
      i -= 1e4;
    }
  }
  prevMatch(t, r, e) {
    let i = this.prevMatchInRange(t, 0, r);
    return i || (i = this.prevMatchInRange(t, Math.max(0, e - this.spec.unquoted.length), t.doc.length)), i && (i.from != r || i.to != e) ? i : null;
  }
  getReplacement(t) {
    return this.spec.unquote(this.spec.replace);
  }
  matchAll(t, r) {
    let e = a(this.spec, t, 0, t.doc.length), i = [];
    for (; !e.next().done; ) {
      if (i.length >= r)
        return null;
      i.push(e.value);
    }
    return i;
  }
  highlight(t, r, e, i) {
    let h = a(this.spec, t, Math.max(0, r - this.spec.unquoted.length), Math.min(e + this.spec.unquoted.length, t.doc.length));
    for (; !h.next().done; )
      i(h.value.from, h.value.to);
  }
}
function c(n, t, r, e) {
  return new y(t.doc, n.search, {
    ignoreCase: !n.caseSensitive,
    test: n.wholeWord ? I(t.charCategorizer(t.selection.main.head)) : void 0
  }, r, e);
}
function d(n, t) {
  return n.slice(S(n, t, !1), t);
}
function g(n, t) {
  return n.slice(t, S(n, t));
}
function I(n) {
  return (t, r, e) => !e[0].length || (n(d(e.input, e.index)) != u.Word || n(g(e.input, e.index)) != u.Word) && (n(g(e.input, e.index + e[0].length)) != u.Word || n(d(e.input, e.index + e[0].length)) != u.Word);
}
class O extends M {
  nextMatch(t, r, e) {
    let i = c(this.spec, t, e, t.doc.length).next();
    return i.done && (i = c(this.spec, t, 0, r).next()), i.done ? null : i.value;
  }
  prevMatchInRange(t, r, e) {
    for (let i = 1; ; i++) {
      let h = Math.max(
        r,
        e - i * 1e4
        /* FindPrev.ChunkSize */
      ), s = c(this.spec, t, h, e), l = null;
      for (; !s.next().done; )
        l = s.value;
      if (l && (h == r || l.from > h + 10))
        return l;
      if (h == r)
        return null;
    }
  }
  prevMatch(t, r, e) {
    return this.prevMatchInRange(t, 0, r) || this.prevMatchInRange(t, e, t.doc.length);
  }
  getReplacement(t) {
    return this.spec.unquote(this.spec.replace).replace(/\$([$&]|\d+)/g, (r, e) => {
      if (e == "&")
        return t.match[0];
      if (e == "$")
        return "$";
      for (let i = e.length; i > 0; i--) {
        let h = +e.slice(0, i);
        if (h > 0 && h < t.match.length)
          return t.match[h] + e.slice(i);
      }
      return r;
    });
  }
  matchAll(t, r) {
    let e = c(this.spec, t, 0, t.doc.length), i = [];
    for (; !e.next().done; ) {
      if (i.length >= r)
        return null;
      i.push(e.value);
    }
    return i;
  }
  highlight(t, r, e, i) {
    let h = c(this.spec, t, Math.max(
      0,
      r - 250
      /* RegExp.HighlightMargin */
    ), Math.min(e + 250, t.doc.length));
    for (; !h.next().done; )
      i(h.value.from, h.value.to);
  }
}
const z = /* @__PURE__ */ W.define();
export {
  y as RegExpCursor,
  L as SearchCursor,
  $ as SearchQuery,
  z as setSearchQuery
};
