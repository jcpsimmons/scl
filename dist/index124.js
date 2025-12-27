import { StateEffect as L, codePointAt as y, codePointSize as b, fromCodePoint as w } from "./index137.js";
const p = typeof String.prototype.normalize == "function" ? (n) => n.normalize("NFKD") : (n) => n;
class x {
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
  constructor(t, e, i = 0, s = t.length, r) {
    this.value = { from: 0, to: 0 }, this.done = !1, this.matches = [], this.buffer = "", this.bufferPos = 0, this.iter = t.iterRange(i, s), this.bufferStart = i, this.normalize = r ? (h) => r(p(h)) : p, this.query = this.normalize(e);
  }
  peek() {
    if (this.bufferPos == this.buffer.length) {
      if (this.bufferStart += this.buffer.length, this.iter.next(), this.iter.done)
        return -1;
      this.bufferPos = 0, this.buffer = this.iter.value;
    }
    return y(this.buffer, this.bufferPos);
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
      let e = w(t), i = this.bufferStart + this.bufferPos;
      this.bufferPos += b(t);
      let s = this.normalize(e);
      for (let r = 0, h = i; ; r++) {
        let l = s.charCodeAt(r), g = this.match(l, h);
        if (g)
          return this.value = g, this;
        if (r == s.length - 1)
          break;
        h == i && r < e.length && e.charCodeAt(r) == l && h++;
      }
    }
  }
  match(t, e) {
    let i = null;
    for (let s = 0; s < this.matches.length; s += 2) {
      let r = this.matches[s], h = !1;
      this.query.charCodeAt(r) == t && (r == this.query.length - 1 ? i = { from: this.matches[s + 1], to: e + 1 } : (this.matches[s]++, h = !0)), h || (this.matches.splice(s, 2), s -= 2);
    }
    return this.query.charCodeAt(0) == t && (this.query.length == 1 ? i = { from: e, to: e + 1 } : this.matches.push(1, e)), i;
  }
}
typeof Symbol < "u" && (x.prototype[Symbol.iterator] = function() {
  return this;
});
const m = { from: -1, to: -1, match: /* @__PURE__ */ /.*/.exec("") }, f = "gm" + (/x/.unicode == null ? "" : "u");
class v {
  /**
  Create a cursor that will search the given range in the given
  document. `query` should be the raw pattern (as you'd pass it to
  `new RegExp`).
  */
  constructor(t, e, i, s = 0, r = t.length) {
    if (this.to = r, this.curLine = "", this.done = !1, this.value = m, /\\[sWDnr]|\n|\r|\[\^/.test(e))
      return new d(t, e, i, s, r);
    this.re = new RegExp(e, f + (i != null && i.ignoreCase ? "i" : "")), this.iter = t.iter();
    let h = t.lineAt(s);
    this.curLineStart = h.from, this.matchPos = s, this.getLine(this.curLineStart);
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
      let e = this.matchPos <= this.to && this.re.exec(this.curLine);
      if (e) {
        let i = this.curLineStart + e.index, s = i + e[0].length;
        if (this.matchPos = s + (i == s ? 1 : 0), i == this.curLine.length && this.nextLine(), i < s || i > this.value.to)
          return this.value = { from: i, to: s, match: e }, this;
        t = this.matchPos - this.curLineStart;
      } else if (this.curLineStart + this.curLine.length < this.to)
        this.nextLine(), t = 0;
      else
        return this.done = !0, this;
    }
  }
}
const o = /* @__PURE__ */ new WeakMap();
class c {
  constructor(t, e) {
    this.from = t, this.text = e;
  }
  get to() {
    return this.from + this.text.length;
  }
  static get(t, e, i) {
    let s = o.get(t);
    if (!s || s.from >= i || s.to <= e) {
      let l = new c(e, t.sliceString(e, i));
      return o.set(t, l), l;
    }
    if (s.from == e && s.to == i)
      return s;
    let { text: r, from: h } = s;
    return h > e && (r = t.sliceString(e, h) + r, h = e), s.to < i && (r += t.sliceString(s.to, i)), o.set(t, new c(h, r)), new c(e, r.slice(e - h, i - h));
  }
}
class d {
  constructor(t, e, i, s, r) {
    this.text = t, this.to = r, this.done = !1, this.value = m, this.matchPos = s, this.re = new RegExp(e, f + (i != null && i.ignoreCase ? "i" : "")), this.flat = c.get(t, s, this.chunkEnd(
      s + 5e3
      /* Base */
    ));
  }
  chunkEnd(t) {
    return t >= this.to ? this.to : this.text.lineAt(t).to;
  }
  next() {
    for (; ; ) {
      let t = this.re.lastIndex = this.matchPos - this.flat.from, e = this.re.exec(this.flat.text);
      if (e && !e[0] && e.index == t && (this.re.lastIndex = t + 1, e = this.re.exec(this.flat.text)), e && this.flat.to < this.to && e.index + e[0].length > this.flat.text.length - 10 && (e = null), e) {
        let i = this.flat.from + e.index, s = i + e[0].length;
        return this.value = { from: i, to: s, match: e }, this.matchPos = s + (i == s ? 1 : 0), this;
      } else {
        if (this.flat.to == this.to)
          return this.done = !0, this;
        this.flat = c.get(this.text, this.flat.from, this.chunkEnd(this.flat.from + this.flat.text.length * 2));
      }
    }
  }
}
typeof Symbol < "u" && (v.prototype[Symbol.iterator] = d.prototype[Symbol.iterator] = function() {
  return this;
});
function M(n) {
  try {
    return new RegExp(n, f), !0;
  } catch {
    return !1;
  }
}
class E {
  /**
  Create a query object.
  */
  constructor(t) {
    this.search = t.search, this.caseSensitive = !!t.caseSensitive, this.regexp = !!t.regexp, this.replace = t.replace || "", this.valid = !!this.search && (!this.regexp || M(this.search)), this.unquoted = t.literal ? this.search : this.search.replace(/\\([nrt\\])/g, (e, i) => i == "n" ? `
` : i == "r" ? "\r" : i == "t" ? "	" : "\\");
  }
  /**
  Compare this query to another query.
  */
  eq(t) {
    return this.search == t.search && this.replace == t.replace && this.caseSensitive == t.caseSensitive && this.regexp == t.regexp;
  }
  /**
  @internal
  */
  create() {
    return this.regexp ? new R(this) : new P(this);
  }
  /**
  Get a search cursor for this query, searching through the given
  range in the given document.
  */
  getCursor(t, e = 0, i = t.length) {
    return this.regexp ? u(this, t, e, i) : a(this, t, e, i);
  }
}
class S {
  constructor(t) {
    this.spec = t;
  }
}
function a(n, t, e, i) {
  return new x(t, n.unquoted, e, i, n.caseSensitive ? void 0 : (s) => s.toLowerCase());
}
class P extends S {
  constructor(t) {
    super(t);
  }
  nextMatch(t, e, i) {
    let s = a(this.spec, t, i, t.length).nextOverlapping();
    return s.done && (s = a(this.spec, t, 0, e).nextOverlapping()), s.done ? null : s.value;
  }
  // Searching in reverse is, rather than implementing inverted search
  // cursor, done by scanning chunk after chunk forward.
  prevMatchInRange(t, e, i) {
    for (let s = i; ; ) {
      let r = Math.max(e, s - 1e4 - this.spec.unquoted.length), h = a(this.spec, t, r, s), l = null;
      for (; !h.nextOverlapping().done; )
        l = h.value;
      if (l)
        return l;
      if (r == e)
        return null;
      s -= 1e4;
    }
  }
  prevMatch(t, e, i) {
    return this.prevMatchInRange(t, 0, e) || this.prevMatchInRange(t, i, t.length);
  }
  getReplacement(t) {
    return this.spec.replace;
  }
  matchAll(t, e) {
    let i = a(this.spec, t, 0, t.length), s = [];
    for (; !i.next().done; ) {
      if (s.length >= e)
        return null;
      s.push(i.value);
    }
    return s;
  }
  highlight(t, e, i, s) {
    let r = a(this.spec, t, Math.max(0, e - this.spec.unquoted.length), Math.min(i + this.spec.unquoted.length, t.length));
    for (; !r.next().done; )
      s(r.value.from, r.value.to);
  }
}
function u(n, t, e, i) {
  return new v(t, n.search, n.caseSensitive ? void 0 : { ignoreCase: !0 }, e, i);
}
class R extends S {
  nextMatch(t, e, i) {
    let s = u(this.spec, t, i, t.length).next();
    return s.done && (s = u(this.spec, t, 0, e).next()), s.done ? null : s.value;
  }
  prevMatchInRange(t, e, i) {
    for (let s = 1; ; s++) {
      let r = Math.max(
        e,
        i - s * 1e4
        /* ChunkSize */
      ), h = u(this.spec, t, r, i), l = null;
      for (; !h.next().done; )
        l = h.value;
      if (l && (r == e || l.from > r + 10))
        return l;
      if (r == e)
        return null;
    }
  }
  prevMatch(t, e, i) {
    return this.prevMatchInRange(t, 0, e) || this.prevMatchInRange(t, i, t.length);
  }
  getReplacement(t) {
    return this.spec.replace.replace(/\$([$&\d+])/g, (e, i) => i == "$" ? "$" : i == "&" ? t.match[0] : i != "0" && +i < t.match.length ? t.match[i] : e);
  }
  matchAll(t, e) {
    let i = u(this.spec, t, 0, t.length), s = [];
    for (; !i.next().done; ) {
      if (s.length >= e)
        return null;
      s.push(i.value);
    }
    return s;
  }
  highlight(t, e, i, s) {
    let r = u(this.spec, t, Math.max(
      0,
      e - 250
      /* HighlightMargin */
    ), Math.min(i + 250, t.length));
    for (; !r.next().done; )
      s(r.value.from, r.value.to);
  }
}
const k = /* @__PURE__ */ L.define();
export {
  v as RegExpCursor,
  x as SearchCursor,
  E as SearchQuery,
  k as setSearchQuery
};
