let I = /* @__PURE__ */ "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((n) => n ? parseInt(n, 36) : 1);
for (let n = 1; n < I.length; n++)
  I[n] += I[n - 1];
function q(n) {
  return n >= 56320 && n < 57344;
}
function j(n) {
  return n >= 55296 && n < 56320;
}
function O(n, t) {
  let e = n.charCodeAt(t);
  if (!j(e) || t + 1 == n.length)
    return e;
  let i = n.charCodeAt(t + 1);
  return q(i) ? (e - 55296 << 10) + (i - 56320) + 65536 : e;
}
function V(n) {
  return n <= 65535 ? String.fromCharCode(n) : (n -= 65536, String.fromCharCode((n >> 10) + 55296, (n & 1023) + 56320));
}
function G(n) {
  return n < 65536 ? 1 : 2;
}
var y = /* @__PURE__ */ function(n) {
  return n[n.Simple = 0] = "Simple", n[n.TrackDel = 1] = "TrackDel", n[n.TrackBefore = 2] = "TrackBefore", n[n.TrackAfter = 3] = "TrackAfter", n;
}(y || (y = {}));
class z {
  /**
  @internal
  */
  constructor(t) {
    this.map = t;
  }
  /**
  Create a [state effect](https://codemirror.net/6/docs/ref/#state.StateEffect) instance of this
  type.
  */
  of(t) {
    return new k(this, t);
  }
}
class k {
  /**
  @internal
  */
  constructor(t, e) {
    this.type = t, this.value = e;
  }
  /**
  Map this effect through a position mapping. Will return
  `undefined` when that ends up deleting the effect.
  */
  map(t) {
    let e = this.type.map(this.value, t);
    return e === void 0 ? void 0 : e == this.value ? this : new k(this.type, e);
  }
  /**
  Tells you whether this effect object is of a given
  [type](https://codemirror.net/6/docs/ref/#state.StateEffectType).
  */
  is(t) {
    return this.type == t;
  }
  /**
  Define a new effect type. The type parameter indicates the type
  of values that his effect holds.
  */
  static define(t = {}) {
    return new z(t.map || ((e) => e));
  }
  /**
  Map an array of effects through a change set.
  */
  static mapEffects(t, e) {
    if (!t.length)
      return t;
    let i = [];
    for (let s of t) {
      let h = s.map(e);
      h && i.push(h);
    }
    return i;
  }
}
k.reconfigure = /* @__PURE__ */ k.define();
k.appendConfig = /* @__PURE__ */ k.define();
let M;
try {
  M = /* @__PURE__ */ new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
} catch {
}
y.TrackDel;
class S {
  constructor(t, e, i) {
    this.from = t, this.to = e, this.value = i;
  }
  /**
  @internal
  */
  static create(t, e, i) {
    return new S(t, e, i);
  }
}
function T(n, t) {
  return n.from - t.from || n.value.startSide - t.value.startSide;
}
class E {
  constructor(t, e, i, s) {
    this.from = t, this.to = e, this.value = i, this.maxPoint = s;
  }
  get length() {
    return this.to[this.to.length - 1];
  }
  // Find the index of the given position and side. Use the ranges'
  // `from` pos when `end == false`, `to` when `end == true`.
  findIndex(t, e, i, s = 0) {
    let h = i ? this.to : this.from;
    for (let r = s, o = h.length; ; ) {
      if (r == o)
        return r;
      let a = r + o >> 1, l = h[a] - t || (i ? this.value[a].endSide : this.value[a].startSide) - e;
      if (a == r)
        return l >= 0 ? r : o;
      l >= 0 ? o = a : r = a + 1;
    }
  }
  between(t, e, i, s) {
    for (let h = this.findIndex(e, -1e9, !0), r = this.findIndex(i, 1e9, !1, h); h < r; h++)
      if (s(this.from[h] + t, this.to[h] + t, this.value[h]) === !1)
        return !1;
  }
  map(t, e) {
    let i = [], s = [], h = [], r = -1, o = -1;
    for (let a = 0; a < this.value.length; a++) {
      let l = this.value[a], u = this.from[a] + t, c = this.to[a] + t, d, m;
      if (u == c) {
        let C = e.mapPos(u, l.startSide, l.mapMode);
        if (C == null || (d = m = C, l.startSide != l.endSide && (m = e.mapPos(u, l.endSide), m < d)))
          continue;
      } else if (d = e.mapPos(u, l.startSide), m = e.mapPos(c, l.endSide), d > m || d == m && l.startSide > 0 && l.endSide <= 0)
        continue;
      (m - d || l.endSide - l.startSide) < 0 || (r < 0 && (r = d), l.point && (o = Math.max(o, m - d)), i.push(l), s.push(d - r), h.push(m - r));
    }
    return { mapped: i.length ? new E(s, h, i, o) : null, pos: r };
  }
}
class f {
  constructor(t, e, i, s) {
    this.chunkPos = t, this.chunk = e, this.nextLayer = i, this.maxPoint = s;
  }
  /**
  @internal
  */
  static create(t, e, i, s) {
    return new f(t, e, i, s);
  }
  /**
  @internal
  */
  get length() {
    let t = this.chunk.length - 1;
    return t < 0 ? 0 : Math.max(this.chunkEnd(t), this.nextLayer.length);
  }
  /**
  The number of ranges in the set.
  */
  get size() {
    if (this.isEmpty)
      return 0;
    let t = this.nextLayer.size;
    for (let e of this.chunk)
      t += e.value.length;
    return t;
  }
  /**
  @internal
  */
  chunkEnd(t) {
    return this.chunkPos[t] + this.chunk[t].length;
  }
  /**
  Update the range set, optionally adding new ranges or filtering
  out existing ones.
  
  (Note: The type parameter is just there as a kludge to work
  around TypeScript variance issues that prevented `RangeSet<X>`
  from being a subtype of `RangeSet<Y>` when `X` is a subtype of
  `Y`.)
  */
  update(t) {
    let { add: e = [], sort: i = !1, filterFrom: s = 0, filterTo: h = this.length } = t, r = t.filter;
    if (e.length == 0 && !r)
      return this;
    if (i && (e = e.slice().sort(T)), this.isEmpty)
      return e.length ? f.of(e) : this;
    let o = new F(this, null, -1).goto(0), a = 0, l = [], u = new P();
    for (; o.value || a < e.length; )
      if (a < e.length && (o.from - e[a].from || o.startSide - e[a].value.startSide) >= 0) {
        let c = e[a++];
        u.addInner(c.from, c.to, c.value) || l.push(c);
      } else o.rangeIndex == 1 && o.chunkIndex < this.chunk.length && (a == e.length || this.chunkEnd(o.chunkIndex) < e[a].from) && (!r || s > this.chunkEnd(o.chunkIndex) || h < this.chunkPos[o.chunkIndex]) && u.addChunk(this.chunkPos[o.chunkIndex], this.chunk[o.chunkIndex]) ? o.nextChunk() : ((!r || s > o.to || h < o.from || r(o.from, o.to, o.value)) && (u.addInner(o.from, o.to, o.value) || l.push(S.create(o.from, o.to, o.value))), o.next());
    return u.finishInner(this.nextLayer.isEmpty && !l.length ? f.empty : this.nextLayer.update({ add: l, filter: r, filterFrom: s, filterTo: h }));
  }
  /**
  Map this range set through a set of changes, return the new set.
  */
  map(t) {
    if (t.empty || this.isEmpty)
      return this;
    let e = [], i = [], s = -1;
    for (let r = 0; r < this.chunk.length; r++) {
      let o = this.chunkPos[r], a = this.chunk[r], l = t.touchesRange(o, o + a.length);
      if (l === !1)
        s = Math.max(s, a.maxPoint), e.push(a), i.push(t.mapPos(o));
      else if (l === !0) {
        let { mapped: u, pos: c } = a.map(o, t);
        u && (s = Math.max(s, u.maxPoint), e.push(u), i.push(c));
      }
    }
    let h = this.nextLayer.map(t);
    return e.length == 0 ? h : new f(i, e, h || f.empty, s);
  }
  /**
  Iterate over the ranges that touch the region `from` to `to`,
  calling `f` for each. There is no guarantee that the ranges will
  be reported in any specific order. When the callback returns
  `false`, iteration stops.
  */
  between(t, e, i) {
    if (!this.isEmpty) {
      for (let s = 0; s < this.chunk.length; s++) {
        let h = this.chunkPos[s], r = this.chunk[s];
        if (e >= h && t <= h + r.length && r.between(h, t - h, e - h, i) === !1)
          return;
      }
      this.nextLayer.between(t, e, i);
    }
  }
  /**
  Iterate over the ranges in this set, in order, including all
  ranges that end at or after `from`.
  */
  iter(t = 0) {
    return x.from([this]).goto(t);
  }
  /**
  @internal
  */
  get isEmpty() {
    return this.nextLayer == this;
  }
  /**
  Iterate over the ranges in a collection of sets, in order,
  starting from `from`.
  */
  static iter(t, e = 0) {
    return x.from(t).goto(e);
  }
  /**
  Iterate over two groups of sets, calling methods on `comparator`
  to notify it of possible differences.
  */
  static compare(t, e, i, s, h = -1) {
    let r = t.filter((c) => c.maxPoint > 0 || !c.isEmpty && c.maxPoint >= h), o = e.filter((c) => c.maxPoint > 0 || !c.isEmpty && c.maxPoint >= h), a = A(r, o, i), l = new p(r, a, h), u = new p(o, a, h);
    i.iterGaps((c, d, m) => L(l, c, u, d, m, s)), i.empty && i.length == 0 && L(l, 0, u, 0, 0, s);
  }
  /**
  Compare the contents of two groups of range sets, returning true
  if they are equivalent in the given range.
  */
  static eq(t, e, i = 0, s) {
    s == null && (s = 1e9);
    let h = t.filter((u) => !u.isEmpty && e.indexOf(u) < 0), r = e.filter((u) => !u.isEmpty && t.indexOf(u) < 0);
    if (h.length != r.length)
      return !1;
    if (!h.length)
      return !0;
    let o = A(h, r), a = new p(h, o, 0).goto(i), l = new p(r, o, 0).goto(i);
    for (; ; ) {
      if (a.to != l.to || !b(a.active, l.active) || a.point && (!l.point || !a.point.eq(l.point)))
        return !1;
      if (a.to > s)
        return !0;
      a.next(), l.next();
    }
  }
  /**
  Iterate over a group of range sets at the same time, notifying
  the iterator about the ranges covering every given piece of
  content. Returns the open count (see
  [`SpanIterator.span`](https://codemirror.net/6/docs/ref/#state.SpanIterator.span)) at the end
  of the iteration.
  */
  static spans(t, e, i, s, h = -1) {
    let r = new p(t, null, h).goto(e), o = e, a = r.openStart;
    for (; ; ) {
      let l = Math.min(r.to, i);
      if (r.point ? (s.point(o, l, r.point, r.activeForPoint(r.to), a, r.pointRank), a = r.openEnd(l) + (r.to > l ? 1 : 0)) : l > o && (s.span(o, l, r.active, a), a = r.openEnd(l)), r.to > i)
        break;
      o = r.to, r.next();
    }
    return a;
  }
  /**
  Create a range set for the given range or array of ranges. By
  default, this expects the ranges to be _sorted_ (by start
  position and, if two start at the same position,
  `value.startSide`). You can pass `true` as second argument to
  cause the method to sort them.
  */
  static of(t, e = !1) {
    let i = new P();
    for (let s of t instanceof S ? [t] : e ? B(t) : t)
      i.add(s.from, s.to, s.value);
    return i.finish();
  }
}
f.empty = /* @__PURE__ */ new f([], [], null, -1);
function B(n) {
  if (n.length > 1)
    for (let t = n[0], e = 1; e < n.length; e++) {
      let i = n[e];
      if (T(t, i) > 0)
        return n.slice().sort(T);
      t = i;
    }
  return n;
}
f.empty.nextLayer = f.empty;
class P {
  /**
  Create an empty builder.
  */
  constructor() {
    this.chunks = [], this.chunkPos = [], this.chunkStart = -1, this.last = null, this.lastFrom = -1e9, this.lastTo = -1e9, this.from = [], this.to = [], this.value = [], this.maxPoint = -1, this.setMaxPoint = -1, this.nextLayer = null;
  }
  finishChunk(t) {
    this.chunks.push(new E(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, t && (this.from = [], this.to = [], this.value = []);
  }
  /**
  Add a range. Ranges should be added in sorted (by `from` and
  `value.startSide`) order.
  */
  add(t, e, i) {
    this.addInner(t, e, i) || (this.nextLayer || (this.nextLayer = new P())).add(t, e, i);
  }
  /**
  @internal
  */
  addInner(t, e, i) {
    let s = t - this.lastTo || i.startSide - this.last.endSide;
    if (s <= 0 && (t - this.lastFrom || i.startSide - this.last.startSide) < 0)
      throw new Error("Ranges must be added sorted by `from` position and `startSide`");
    return s < 0 ? !1 : (this.from.length == 250 && this.finishChunk(!0), this.chunkStart < 0 && (this.chunkStart = t), this.from.push(t - this.chunkStart), this.to.push(e - this.chunkStart), this.last = i, this.lastFrom = t, this.lastTo = e, this.value.push(i), i.point && (this.maxPoint = Math.max(this.maxPoint, e - t)), !0);
  }
  /**
  @internal
  */
  addChunk(t, e) {
    if ((t - this.lastTo || e.value[0].startSide - this.last.endSide) < 0)
      return !1;
    this.from.length && this.finishChunk(!0), this.setMaxPoint = Math.max(this.setMaxPoint, e.maxPoint), this.chunks.push(e), this.chunkPos.push(t);
    let i = e.value.length - 1;
    return this.last = e.value[i], this.lastFrom = e.from[i] + t, this.lastTo = e.to[i] + t, !0;
  }
  /**
  Finish the range set. Returns the new set. The builder can't be
  used anymore after this has been called.
  */
  finish() {
    return this.finishInner(f.empty);
  }
  /**
  @internal
  */
  finishInner(t) {
    if (this.from.length && this.finishChunk(!1), this.chunks.length == 0)
      return t;
    let e = f.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(t) : t, this.setMaxPoint);
    return this.from = null, e;
  }
}
function A(n, t, e) {
  let i = /* @__PURE__ */ new Map();
  for (let h of n)
    for (let r = 0; r < h.chunk.length; r++)
      h.chunk[r].maxPoint <= 0 && i.set(h.chunk[r], h.chunkPos[r]);
  let s = /* @__PURE__ */ new Set();
  for (let h of t)
    for (let r = 0; r < h.chunk.length; r++) {
      let o = i.get(h.chunk[r]);
      o != null && (e ? e.mapPos(o) : o) == h.chunkPos[r] && !(e != null && e.touchesRange(o, o + h.chunk[r].length)) && s.add(h.chunk[r]);
    }
  return s;
}
class F {
  constructor(t, e, i, s = 0) {
    this.layer = t, this.skip = e, this.minPoint = i, this.rank = s;
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  get endSide() {
    return this.value ? this.value.endSide : 0;
  }
  goto(t, e = -1e9) {
    return this.chunkIndex = this.rangeIndex = 0, this.gotoInner(t, e, !1), this;
  }
  gotoInner(t, e, i) {
    for (; this.chunkIndex < this.layer.chunk.length; ) {
      let s = this.layer.chunk[this.chunkIndex];
      if (!(this.skip && this.skip.has(s) || this.layer.chunkEnd(this.chunkIndex) < t || s.maxPoint < this.minPoint))
        break;
      this.chunkIndex++, i = !1;
    }
    if (this.chunkIndex < this.layer.chunk.length) {
      let s = this.layer.chunk[this.chunkIndex].findIndex(t - this.layer.chunkPos[this.chunkIndex], e, !0);
      (!i || this.rangeIndex < s) && this.setRangeIndex(s);
    }
    this.next();
  }
  forward(t, e) {
    (this.to - t || this.endSide - e) < 0 && this.gotoInner(t, e, !0);
  }
  next() {
    for (; ; )
      if (this.chunkIndex == this.layer.chunk.length) {
        this.from = this.to = 1e9, this.value = null;
        break;
      } else {
        let t = this.layer.chunkPos[this.chunkIndex], e = this.layer.chunk[this.chunkIndex], i = t + e.from[this.rangeIndex];
        if (this.from = i, this.to = t + e.to[this.rangeIndex], this.value = e.value[this.rangeIndex], this.setRangeIndex(this.rangeIndex + 1), this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint)
          break;
      }
  }
  setRangeIndex(t) {
    if (t == this.layer.chunk[this.chunkIndex].value.length) {
      if (this.chunkIndex++, this.skip)
        for (; this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex]); )
          this.chunkIndex++;
      this.rangeIndex = 0;
    } else
      this.rangeIndex = t;
  }
  nextChunk() {
    this.chunkIndex++, this.rangeIndex = 0, this.next();
  }
  compare(t) {
    return this.from - t.from || this.startSide - t.startSide || this.rank - t.rank || this.to - t.to || this.endSide - t.endSide;
  }
}
class x {
  constructor(t) {
    this.heap = t;
  }
  static from(t, e = null, i = -1) {
    let s = [];
    for (let h = 0; h < t.length; h++)
      for (let r = t[h]; !r.isEmpty; r = r.nextLayer)
        r.maxPoint >= i && s.push(new F(r, e, i, h));
    return s.length == 1 ? s[0] : new x(s);
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  goto(t, e = -1e9) {
    for (let i of this.heap)
      i.goto(t, e);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      w(this.heap, i);
    return this.next(), this;
  }
  forward(t, e) {
    for (let i of this.heap)
      i.forward(t, e);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      w(this.heap, i);
    (this.to - t || this.value.endSide - e) < 0 && this.next();
  }
  next() {
    if (this.heap.length == 0)
      this.from = this.to = 1e9, this.value = null, this.rank = -1;
    else {
      let t = this.heap[0];
      this.from = t.from, this.to = t.to, this.value = t.value, this.rank = t.rank, t.value && t.next(), w(this.heap, 0);
    }
  }
}
function w(n, t) {
  for (let e = n[t]; ; ) {
    let i = (t << 1) + 1;
    if (i >= n.length)
      break;
    let s = n[i];
    if (i + 1 < n.length && s.compare(n[i + 1]) >= 0 && (s = n[i + 1], i++), e.compare(s) < 0)
      break;
    n[i] = e, n[t] = s, t = i;
  }
}
class p {
  constructor(t, e, i) {
    this.minPoint = i, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = x.from(t, e, i);
  }
  goto(t, e = -1e9) {
    return this.cursor.goto(t, e), this.active.length = this.activeTo.length = this.activeRank.length = 0, this.minActive = -1, this.to = t, this.endSide = e, this.openStart = -1, this.next(), this;
  }
  forward(t, e) {
    for (; this.minActive > -1 && (this.activeTo[this.minActive] - t || this.active[this.minActive].endSide - e) < 0; )
      this.removeActive(this.minActive);
    this.cursor.forward(t, e);
  }
  removeActive(t) {
    v(this.active, t), v(this.activeTo, t), v(this.activeRank, t), this.minActive = R(this.active, this.activeTo);
  }
  addActive(t) {
    let e = 0, { value: i, to: s, rank: h } = this.cursor;
    for (; e < this.activeRank.length && this.activeRank[e] <= h; )
      e++;
    g(this.active, e, i), g(this.activeTo, e, s), g(this.activeRank, e, h), t && g(t, e, this.cursor.from), this.minActive = R(this.active, this.activeTo);
  }
  // After calling this, if `this.point` != null, the next range is a
  // point. Otherwise, it's a regular range, covered by `this.active`.
  next() {
    let t = this.to, e = this.point;
    this.point = null;
    let i = this.openStart < 0 ? [] : null, s = 0;
    for (; ; ) {
      let h = this.minActive;
      if (h > -1 && (this.activeTo[h] - this.cursor.from || this.active[h].endSide - this.cursor.startSide) < 0) {
        if (this.activeTo[h] > t) {
          this.to = this.activeTo[h], this.endSide = this.active[h].endSide;
          break;
        }
        this.removeActive(h), i && v(i, h);
      } else if (this.cursor.value)
        if (this.cursor.from > t) {
          this.to = this.cursor.from, this.endSide = this.cursor.startSide;
          break;
        } else {
          let r = this.cursor.value;
          if (!r.point)
            this.addActive(i), this.cursor.next();
          else if (e && this.cursor.to == this.to && this.cursor.from < this.cursor.to)
            this.cursor.next();
          else {
            this.point = r, this.pointFrom = this.cursor.from, this.pointRank = this.cursor.rank, this.to = this.cursor.to, this.endSide = r.endSide, this.cursor.from < t && (s = 1), this.cursor.next(), this.forward(this.to, this.endSide);
            break;
          }
        }
      else {
        this.to = this.endSide = 1e9;
        break;
      }
    }
    if (i) {
      let h = 0;
      for (; h < i.length && i[h] < t; )
        h++;
      this.openStart = h + s;
    }
  }
  activeForPoint(t) {
    if (!this.active.length)
      return this.active;
    let e = [];
    for (let i = this.active.length - 1; i >= 0 && !(this.activeRank[i] < this.pointRank); i--)
      (this.activeTo[i] > t || this.activeTo[i] == t && this.active[i].endSide >= this.point.endSide) && e.push(this.active[i]);
    return e.reverse();
  }
  openEnd(t) {
    let e = 0;
    for (let i = this.activeTo.length - 1; i >= 0 && this.activeTo[i] > t; i--)
      e++;
    return e;
  }
}
function L(n, t, e, i, s, h) {
  n.goto(t), e.goto(i);
  let r = i + s, o = i, a = i - t;
  for (; ; ) {
    let l = n.to + a - e.to || n.endSide - e.endSide, u = l < 0 ? n.to + a : e.to, c = Math.min(u, r);
    if (n.point || e.point ? n.point && e.point && (n.point == e.point || n.point.eq(e.point)) && b(n.activeForPoint(n.to + a), e.activeForPoint(e.to)) || h.comparePoint(o, c, n.point, e.point) : c > o && !b(n.active, e.active) && h.compareRange(o, c, n.active, e.active), u > r)
      break;
    o = u, l <= 0 && n.next(), l >= 0 && e.next();
  }
}
function b(n, t) {
  if (n.length != t.length)
    return !1;
  for (let e = 0; e < n.length; e++)
    if (n[e] != t[e] && !n[e].eq(t[e]))
      return !1;
  return !0;
}
function v(n, t) {
  for (let e = t, i = n.length - 1; e < i; e++)
    n[e] = n[e + 1];
  n.pop();
}
function g(n, t, e) {
  for (let i = n.length - 1; i >= t; i--)
    n[i + 1] = n[i];
  n[t] = e;
}
function R(n, t) {
  let e = -1, i = 1e9;
  for (let s = 0; s < t.length; s++)
    (t[s] - i || n[s].endSide - n[e].endSide) < 0 && (e = s, i = t[s]);
  return e;
}
export {
  y as MapMode,
  S as Range,
  f as RangeSet,
  P as RangeSetBuilder,
  k as StateEffect,
  z as StateEffectType,
  O as codePointAt,
  G as codePointSize,
  V as fromCodePoint
};
