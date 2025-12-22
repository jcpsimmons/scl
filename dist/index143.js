const kt = 1024;
let ct = 0;
class Z {
  constructor(t, e) {
    this.from = t, this.to = e;
  }
}
class k {
  /**
  Create a new node prop type.
  */
  constructor(t = {}) {
    this.id = ct++, this.perNode = !!t.perNode, this.deserialize = t.deserialize || (() => {
      throw new Error("This node type doesn't define a deserialize function");
    }), this.combine = t.combine || null;
  }
  /**
  This is meant to be used with
  [`NodeSet.extend`](#common.NodeSet.extend) or
  [`LRParser.configure`](#lr.ParserConfig.props) to compute
  prop values for each node type in the set. Takes a [match
  object](#common.NodeType^match) or function that returns undefined
  if the node type doesn't get this prop, and the prop's value if
  it does.
  */
  add(t) {
    if (this.perNode)
      throw new RangeError("Can't add per-node props to node types");
    return typeof t != "function" && (t = j.match(t)), (e) => {
      let r = t(e);
      return r === void 0 ? null : [this, r];
    };
  }
}
k.closedBy = new k({ deserialize: (l) => l.split(" ") });
k.openedBy = new k({ deserialize: (l) => l.split(" ") });
k.group = new k({ deserialize: (l) => l.split(" ") });
k.isolate = new k({ deserialize: (l) => {
  if (l && l != "rtl" && l != "ltr" && l != "auto")
    throw new RangeError("Invalid value for isolate: " + l);
  return l || "auto";
} });
k.contextHash = new k({ perNode: !0 });
k.lookAhead = new k({ perNode: !0 });
k.mounted = new k({ perNode: !0 });
class X {
  constructor(t, e, r) {
    this.tree = t, this.overlay = e, this.parser = r;
  }
  /**
  @internal
  */
  static get(t) {
    return t && t.props && t.props[k.mounted.id];
  }
}
const gt = /* @__PURE__ */ Object.create(null);
class j {
  /**
  @internal
  */
  constructor(t, e, r, i = 0) {
    this.name = t, this.props = e, this.id = r, this.flags = i;
  }
  /**
  Define a node type.
  */
  static define(t) {
    let e = t.props && t.props.length ? /* @__PURE__ */ Object.create(null) : gt, r = (t.top ? 1 : 0) | (t.skipped ? 2 : 0) | (t.error ? 4 : 0) | (t.name == null ? 8 : 0), i = new j(t.name || "", e, t.id, r);
    if (t.props) {
      for (let n of t.props)
        if (Array.isArray(n) || (n = n(i)), n) {
          if (n[0].perNode)
            throw new RangeError("Can't store a per-node prop on a node type");
          e[n[0].id] = n[1];
        }
    }
    return i;
  }
  /**
  Retrieves a node prop for this type. Will return `undefined` if
  the prop isn't present on this node.
  */
  prop(t) {
    return this.props[t.id];
  }
  /**
  True when this is the top node of a grammar.
  */
  get isTop() {
    return (this.flags & 1) > 0;
  }
  /**
  True when this node is produced by a skip rule.
  */
  get isSkipped() {
    return (this.flags & 2) > 0;
  }
  /**
  Indicates whether this is an error node.
  */
  get isError() {
    return (this.flags & 4) > 0;
  }
  /**
  When true, this node type doesn't correspond to a user-declared
  named node, for example because it is used to cache repetition.
  */
  get isAnonymous() {
    return (this.flags & 8) > 0;
  }
  /**
  Returns true when this node's name or one of its
  [groups](#common.NodeProp^group) matches the given string.
  */
  is(t) {
    if (typeof t == "string") {
      if (this.name == t)
        return !0;
      let e = this.prop(k.group);
      return e ? e.indexOf(t) > -1 : !1;
    }
    return this.id == t;
  }
  /**
  Create a function from node types to arbitrary values by
  specifying an object whose property names are node or
  [group](#common.NodeProp^group) names. Often useful with
  [`NodeProp.add`](#common.NodeProp.add). You can put multiple
  names, separated by spaces, in a single property name to map
  multiple node names to a single value.
  */
  static match(t) {
    let e = /* @__PURE__ */ Object.create(null);
    for (let r in t)
      for (let i of r.split(" "))
        e[i] = t[r];
    return (r) => {
      for (let i = r.prop(k.group), n = -1; n < (i ? i.length : 0); n++) {
        let s = e[n < 0 ? r.name : i[n]];
        if (s)
          return s;
      }
    };
  }
}
j.none = new j(
  "",
  /* @__PURE__ */ Object.create(null),
  0,
  8
  /* NodeFlag.Anonymous */
);
const K = /* @__PURE__ */ new WeakMap(), ft = /* @__PURE__ */ new WeakMap();
var z;
(function(l) {
  l[l.ExcludeBuffers = 1] = "ExcludeBuffers", l[l.IncludeAnonymous = 2] = "IncludeAnonymous", l[l.IgnoreMounts = 4] = "IgnoreMounts", l[l.IgnoreOverlays = 8] = "IgnoreOverlays";
})(z || (z = {}));
class E {
  /**
  Construct a new tree. See also [`Tree.build`](#common.Tree^build).
  */
  constructor(t, e, r, i, n) {
    if (this.type = t, this.children = e, this.positions = r, this.length = i, this.props = null, n && n.length) {
      this.props = /* @__PURE__ */ Object.create(null);
      for (let [s, h] of n)
        this.props[typeof s == "number" ? s : s.id] = h;
    }
  }
  /**
  @internal
  */
  toString() {
    let t = X.get(this);
    if (t && !t.overlay)
      return t.tree.toString();
    let e = "";
    for (let r of this.children) {
      let i = r.toString();
      i && (e && (e += ","), e += i);
    }
    return this.type.name ? (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (e.length ? "(" + e + ")" : "") : e;
  }
  /**
  Get a [tree cursor](#common.TreeCursor) positioned at the top of
  the tree. Mode can be used to [control](#common.IterMode) which
  nodes the cursor visits.
  */
  cursor(t = 0) {
    return new et(this.topNode, t);
  }
  /**
  Get a [tree cursor](#common.TreeCursor) pointing into this tree
  at the given position and side (see
  [`moveTo`](#common.TreeCursor.moveTo).
  */
  cursorAt(t, e = 0, r = 0) {
    let i = K.get(this) || this.topNode, n = new et(i);
    return n.moveTo(t, e), K.set(this, n._tree), n;
  }
  /**
  Get a [syntax node](#common.SyntaxNode) object for the top of the
  tree.
  */
  get topNode() {
    return new I(this, 0, 0, null);
  }
  /**
  Get the [syntax node](#common.SyntaxNode) at the given position.
  If `side` is -1, this will move into nodes that end at the
  position. If 1, it'll move into nodes that start at the
  position. With 0, it'll only enter nodes that cover the position
  from both sides.
  
  Note that this will not enter
  [overlays](#common.MountedTree.overlay), and you often want
  [`resolveInner`](#common.Tree.resolveInner) instead.
  */
  resolve(t, e = 0) {
    let r = G(K.get(this) || this.topNode, t, e, !1);
    return K.set(this, r), r;
  }
  /**
  Like [`resolve`](#common.Tree.resolve), but will enter
  [overlaid](#common.MountedTree.overlay) nodes, producing a syntax node
  pointing into the innermost overlaid tree at the given position
  (with parent links going through all parent structure, including
  the host trees).
  */
  resolveInner(t, e = 0) {
    let r = G(ft.get(this) || this.topNode, t, e, !0);
    return ft.set(this, r), r;
  }
  /**
  In some situations, it can be useful to iterate through all
  nodes around a position, including those in overlays that don't
  directly cover the position. This method gives you an iterator
  that will produce all nodes, from small to big, around the given
  position.
  */
  resolveStack(t, e = 0) {
    return bt(this, t, e);
  }
  /**
  Iterate over the tree and its children, calling `enter` for any
  node that touches the `from`/`to` region (if given) before
  running over such a node's children, and `leave` (if given) when
  leaving the node. When `enter` returns `false`, that node will
  not have its children iterated over (or `leave` called).
  */
  iterate(t) {
    let { enter: e, leave: r, from: i = 0, to: n = this.length } = t, s = t.mode || 0, h = (s & z.IncludeAnonymous) > 0;
    for (let o = this.cursor(s | z.IncludeAnonymous); ; ) {
      let C = !1;
      if (o.from <= n && o.to >= i && (!h && o.type.isAnonymous || e(o) !== !1)) {
        if (o.firstChild())
          continue;
        C = !0;
      }
      for (; C && r && (h || !o.type.isAnonymous) && r(o), !o.nextSibling(); ) {
        if (!o.parent())
          return;
        C = !0;
      }
    }
  }
  /**
  Get the value of the given [node prop](#common.NodeProp) for this
  node. Works with both per-node and per-type props.
  */
  prop(t) {
    return t.perNode ? this.props ? this.props[t.id] : void 0 : this.type.prop(t);
  }
  /**
  Returns the node's [per-node props](#common.NodeProp.perNode) in a
  format that can be passed to the [`Tree`](#common.Tree)
  constructor.
  */
  get propValues() {
    let t = [];
    if (this.props)
      for (let e in this.props)
        t.push([+e, this.props[e]]);
    return t;
  }
  /**
  Balance the direct children of this tree, producing a copy of
  which may have children grouped into subtrees with type
  [`NodeType.none`](#common.NodeType^none).
  */
  balance(t = {}) {
    return this.children.length <= 8 ? this : st(j.none, this.children, this.positions, 0, this.children.length, 0, this.length, (e, r, i) => new E(this.type, e, r, i, this.propValues), t.makeTree || ((e, r, i) => new E(j.none, e, r, i)));
  }
  /**
  Build a tree from a postfix-ordered buffer of node information,
  or a cursor over such a buffer.
  */
  static build(t) {
    return mt(t);
  }
}
E.empty = new E(j.none, [], [], 0);
class it {
  constructor(t, e) {
    this.buffer = t, this.index = e;
  }
  get id() {
    return this.buffer[this.index - 4];
  }
  get start() {
    return this.buffer[this.index - 3];
  }
  get end() {
    return this.buffer[this.index - 2];
  }
  get size() {
    return this.buffer[this.index - 1];
  }
  get pos() {
    return this.index;
  }
  next() {
    this.index -= 4;
  }
  fork() {
    return new it(this.buffer, this.index);
  }
}
class U {
  /**
  Create a tree buffer.
  */
  constructor(t, e, r) {
    this.buffer = t, this.length = e, this.set = r;
  }
  /**
  @internal
  */
  get type() {
    return j.none;
  }
  /**
  @internal
  */
  toString() {
    let t = [];
    for (let e = 0; e < this.buffer.length; )
      t.push(this.childString(e)), e = this.buffer[e + 3];
    return t.join(",");
  }
  /**
  @internal
  */
  childString(t) {
    let e = this.buffer[t], r = this.buffer[t + 3], i = this.set.types[e], n = i.name;
    if (/\W/.test(n) && !i.isError && (n = JSON.stringify(n)), t += 4, r == t)
      return n;
    let s = [];
    for (; t < r; )
      s.push(this.childString(t)), t = this.buffer[t + 3];
    return n + "(" + s.join(",") + ")";
  }
  /**
  @internal
  */
  findChild(t, e, r, i, n) {
    let { buffer: s } = this, h = -1;
    for (let o = t; o != e && !(at(n, i, s[o + 1], s[o + 2]) && (h = o, r > 0)); o = s[o + 3])
      ;
    return h;
  }
  /**
  @internal
  */
  slice(t, e, r) {
    let i = this.buffer, n = new Uint16Array(e - t), s = 0;
    for (let h = t, o = 0; h < e; ) {
      n[o++] = i[h++], n[o++] = i[h++] - r;
      let C = n[o++] = i[h++] - r;
      n[o++] = i[h++] - t, s = Math.max(s, C);
    }
    return new U(n, s, this.set);
  }
}
function at(l, t, e, r) {
  switch (l) {
    case -2:
      return e < t;
    case -1:
      return r >= t && e < t;
    case 0:
      return e < t && r > t;
    case 1:
      return e <= t && r > t;
    case 2:
      return r > t;
    case 4:
      return !0;
  }
}
function G(l, t, e, r) {
  for (var i; l.from == l.to || (e < 1 ? l.from >= t : l.from > t) || (e > -1 ? l.to <= t : l.to < t); ) {
    let s = !r && l instanceof I && l.index < 0 ? null : l.parent;
    if (!s)
      return l;
    l = s;
  }
  let n = r ? 0 : z.IgnoreOverlays;
  if (r)
    for (let s = l, h = s.parent; h; s = h, h = s.parent)
      s instanceof I && s.index < 0 && ((i = h.enter(t, e, n)) === null || i === void 0 ? void 0 : i.from) != s.from && (l = h);
  for (; ; ) {
    let s = l.enter(t, e, n);
    if (!s)
      return l;
    l = s;
  }
}
class pt {
  cursor(t = 0) {
    return new et(this, t);
  }
  getChild(t, e = null, r = null) {
    let i = ut(this, t, e, r);
    return i.length ? i[0] : null;
  }
  getChildren(t, e = null, r = null) {
    return ut(this, t, e, r);
  }
  resolve(t, e = 0) {
    return G(this, t, e, !1);
  }
  resolveInner(t, e = 0) {
    return G(this, t, e, !0);
  }
  matchContext(t) {
    return tt(this.parent, t);
  }
  enterUnfinishedNodesBefore(t) {
    let e = this.childBefore(t), r = this;
    for (; e; ) {
      let i = e.lastChild;
      if (!i || i.to != e.to)
        break;
      i.type.isError && i.from == i.to ? (r = e, e = i.prevSibling) : e = i;
    }
    return r;
  }
  get node() {
    return this;
  }
  get next() {
    return this.parent;
  }
}
class I extends pt {
  constructor(t, e, r, i) {
    super(), this._tree = t, this.from = e, this.index = r, this._parent = i;
  }
  get type() {
    return this._tree.type;
  }
  get name() {
    return this._tree.type.name;
  }
  get to() {
    return this.from + this._tree.length;
  }
  nextChild(t, e, r, i, n = 0) {
    for (let s = this; ; ) {
      for (let { children: h, positions: o } = s._tree, C = e > 0 ? h.length : -1; t != C; t += e) {
        let d = h[t], S = o[t] + s.from;
        if (at(i, r, S, S + d.length)) {
          if (d instanceof U) {
            if (n & z.ExcludeBuffers)
              continue;
            let w = d.findChild(0, d.buffer.length, e, r - S, i);
            if (w > -1)
              return new M(new xt(s, d, t, S), null, w);
          } else if (n & z.IncludeAnonymous || !d.type.isAnonymous || nt(d)) {
            let w;
            if (!(n & z.IgnoreMounts) && (w = X.get(d)) && !w.overlay)
              return new I(w.tree, S, t, s);
            let B = new I(d, S, t, s);
            return n & z.IncludeAnonymous || !B.type.isAnonymous ? B : B.nextChild(e < 0 ? d.children.length - 1 : 0, e, r, i);
          }
        }
      }
      if (n & z.IncludeAnonymous || !s.type.isAnonymous || (s.index >= 0 ? t = s.index + e : t = e < 0 ? -1 : s._parent._tree.children.length, s = s._parent, !s))
        return null;
    }
  }
  get firstChild() {
    return this.nextChild(
      0,
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  get lastChild() {
    return this.nextChild(
      this._tree.children.length - 1,
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  childAfter(t) {
    return this.nextChild(
      0,
      1,
      t,
      2
      /* Side.After */
    );
  }
  childBefore(t) {
    return this.nextChild(
      this._tree.children.length - 1,
      -1,
      t,
      -2
      /* Side.Before */
    );
  }
  prop(t) {
    return this._tree.prop(t);
  }
  enter(t, e, r = 0) {
    let i;
    if (!(r & z.IgnoreOverlays) && (i = X.get(this._tree)) && i.overlay) {
      let n = t - this.from;
      for (let { from: s, to: h } of i.overlay)
        if ((e > 0 ? s <= n : s < n) && (e < 0 ? h >= n : h > n))
          return new I(i.tree, i.overlay[0].from + this.from, -1, this);
    }
    return this.nextChild(0, 1, t, e, r);
  }
  nextSignificantParent() {
    let t = this;
    for (; t.type.isAnonymous && t._parent; )
      t = t._parent;
    return t;
  }
  get parent() {
    return this._parent ? this._parent.nextSignificantParent() : null;
  }
  get nextSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(
      this.index + 1,
      1,
      0,
      4
      /* Side.DontCare */
    ) : null;
  }
  get prevSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(
      this.index - 1,
      -1,
      0,
      4
      /* Side.DontCare */
    ) : null;
  }
  get tree() {
    return this._tree;
  }
  toTree() {
    return this._tree;
  }
  /**
  @internal
  */
  toString() {
    return this._tree.toString();
  }
}
function ut(l, t, e, r) {
  let i = l.cursor(), n = [];
  if (!i.firstChild())
    return n;
  if (e != null) {
    for (let s = !1; !s; )
      if (s = i.type.is(e), !i.nextSibling())
        return n;
  }
  for (; ; ) {
    if (r != null && i.type.is(r))
      return n;
    if (i.type.is(t) && n.push(i.node), !i.nextSibling())
      return r == null ? n : [];
  }
}
function tt(l, t, e = t.length - 1) {
  for (let r = l; e >= 0; r = r.parent) {
    if (!r)
      return !1;
    if (!r.type.isAnonymous) {
      if (t[e] && t[e] != r.name)
        return !1;
      e--;
    }
  }
  return !0;
}
class xt {
  constructor(t, e, r, i) {
    this.parent = t, this.buffer = e, this.index = r, this.start = i;
  }
}
class M extends pt {
  get name() {
    return this.type.name;
  }
  get from() {
    return this.context.start + this.context.buffer.buffer[this.index + 1];
  }
  get to() {
    return this.context.start + this.context.buffer.buffer[this.index + 2];
  }
  constructor(t, e, r) {
    super(), this.context = t, this._parent = e, this.index = r, this.type = t.buffer.set.types[t.buffer.buffer[r]];
  }
  child(t, e, r) {
    let { buffer: i } = this.context, n = i.findChild(this.index + 4, i.buffer[this.index + 3], t, e - this.context.start, r);
    return n < 0 ? null : new M(this.context, this, n);
  }
  get firstChild() {
    return this.child(
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  get lastChild() {
    return this.child(
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  childAfter(t) {
    return this.child(
      1,
      t,
      2
      /* Side.After */
    );
  }
  childBefore(t) {
    return this.child(
      -1,
      t,
      -2
      /* Side.Before */
    );
  }
  prop(t) {
    return this.type.prop(t);
  }
  enter(t, e, r = 0) {
    if (r & z.ExcludeBuffers)
      return null;
    let { buffer: i } = this.context, n = i.findChild(this.index + 4, i.buffer[this.index + 3], e > 0 ? 1 : -1, t - this.context.start, e);
    return n < 0 ? null : new M(this.context, this, n);
  }
  get parent() {
    return this._parent || this.context.parent.nextSignificantParent();
  }
  externalSibling(t) {
    return this._parent ? null : this.context.parent.nextChild(
      this.context.index + t,
      t,
      0,
      4
      /* Side.DontCare */
    );
  }
  get nextSibling() {
    let { buffer: t } = this.context, e = t.buffer[this.index + 3];
    return e < (this._parent ? t.buffer[this._parent.index + 3] : t.buffer.length) ? new M(this.context, this._parent, e) : this.externalSibling(1);
  }
  get prevSibling() {
    let { buffer: t } = this.context, e = this._parent ? this._parent.index + 4 : 0;
    return this.index == e ? this.externalSibling(-1) : new M(this.context, this._parent, t.findChild(
      e,
      this.index,
      -1,
      0,
      4
      /* Side.DontCare */
    ));
  }
  get tree() {
    return null;
  }
  toTree() {
    let t = [], e = [], { buffer: r } = this.context, i = this.index + 4, n = r.buffer[this.index + 3];
    if (n > i) {
      let s = r.buffer[this.index + 1];
      t.push(r.slice(i, n, s)), e.push(0);
    }
    return new E(this.type, t, e, this.to - this.from);
  }
  /**
  @internal
  */
  toString() {
    return this.context.buffer.childString(this.index);
  }
}
function dt(l) {
  if (!l.length)
    return null;
  let t = 0, e = l[0];
  for (let n = 1; n < l.length; n++) {
    let s = l[n];
    (s.from > e.from || s.to < e.to) && (e = s, t = n);
  }
  let r = e instanceof I && e.index < 0 ? null : e.parent, i = l.slice();
  return r ? i[t] = r : i.splice(t, 1), new yt(i, e);
}
class yt {
  constructor(t, e) {
    this.heads = t, this.node = e;
  }
  get next() {
    return dt(this.heads);
  }
}
function bt(l, t, e) {
  let r = l.resolveInner(t, e), i = null;
  for (let n = r instanceof I ? r : r.context.parent; n; n = n.parent)
    if (n.index < 0) {
      let s = n.parent;
      (i || (i = [r])).push(s.resolve(t, e)), n = s;
    } else {
      let s = X.get(n.tree);
      if (s && s.overlay && s.overlay[0].from <= t && s.overlay[s.overlay.length - 1].to >= t) {
        let h = new I(s.tree, s.overlay[0].from + n.from, -1, n);
        (i || (i = [r])).push(G(h, t, e, !1));
      }
    }
  return i ? dt(i) : r;
}
class et {
  /**
  Shorthand for `.type.name`.
  */
  get name() {
    return this.type.name;
  }
  /**
  @internal
  */
  constructor(t, e = 0) {
    if (this.mode = e, this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, t instanceof I)
      this.yieldNode(t);
    else {
      this._tree = t.context.parent, this.buffer = t.context;
      for (let r = t._parent; r; r = r._parent)
        this.stack.unshift(r.index);
      this.bufferNode = t, this.yieldBuf(t.index);
    }
  }
  yieldNode(t) {
    return t ? (this._tree = t, this.type = t.type, this.from = t.from, this.to = t.to, !0) : !1;
  }
  yieldBuf(t, e) {
    this.index = t;
    let { start: r, buffer: i } = this.buffer;
    return this.type = e || i.set.types[i.buffer[t]], this.from = r + i.buffer[t + 1], this.to = r + i.buffer[t + 2], !0;
  }
  /**
  @internal
  */
  yield(t) {
    return t ? t instanceof I ? (this.buffer = null, this.yieldNode(t)) : (this.buffer = t.context, this.yieldBuf(t.index, t.type)) : !1;
  }
  /**
  @internal
  */
  toString() {
    return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
  }
  /**
  @internal
  */
  enterChild(t, e, r) {
    if (!this.buffer)
      return this.yield(this._tree.nextChild(t < 0 ? this._tree._tree.children.length - 1 : 0, t, e, r, this.mode));
    let { buffer: i } = this.buffer, n = i.findChild(this.index + 4, i.buffer[this.index + 3], t, e - this.buffer.start, r);
    return n < 0 ? !1 : (this.stack.push(this.index), this.yieldBuf(n));
  }
  /**
  Move the cursor to this node's first child. When this returns
  false, the node has no child, and the cursor has not been moved.
  */
  firstChild() {
    return this.enterChild(
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  /**
  Move the cursor to this node's last child.
  */
  lastChild() {
    return this.enterChild(
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  /**
  Move the cursor to the first child that ends after `pos`.
  */
  childAfter(t) {
    return this.enterChild(
      1,
      t,
      2
      /* Side.After */
    );
  }
  /**
  Move to the last child that starts before `pos`.
  */
  childBefore(t) {
    return this.enterChild(
      -1,
      t,
      -2
      /* Side.Before */
    );
  }
  /**
  Move the cursor to the child around `pos`. If side is -1 the
  child may end at that position, when 1 it may start there. This
  will also enter [overlaid](#common.MountedTree.overlay)
  [mounted](#common.NodeProp^mounted) trees unless `overlays` is
  set to false.
  */
  enter(t, e, r = this.mode) {
    return this.buffer ? r & z.ExcludeBuffers ? !1 : this.enterChild(1, t, e) : this.yield(this._tree.enter(t, e, r));
  }
  /**
  Move to the node's parent node, if this isn't the top node.
  */
  parent() {
    if (!this.buffer)
      return this.yieldNode(this.mode & z.IncludeAnonymous ? this._tree._parent : this._tree.parent);
    if (this.stack.length)
      return this.yieldBuf(this.stack.pop());
    let t = this.mode & z.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
    return this.buffer = null, this.yieldNode(t);
  }
  /**
  @internal
  */
  sibling(t) {
    if (!this.buffer)
      return this._tree._parent ? this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + t, t, 0, 4, this.mode)) : !1;
    let { buffer: e } = this.buffer, r = this.stack.length - 1;
    if (t < 0) {
      let i = r < 0 ? 0 : this.stack[r] + 4;
      if (this.index != i)
        return this.yieldBuf(e.findChild(
          i,
          this.index,
          -1,
          0,
          4
          /* Side.DontCare */
        ));
    } else {
      let i = e.buffer[this.index + 3];
      if (i < (r < 0 ? e.buffer.length : e.buffer[this.stack[r] + 3]))
        return this.yieldBuf(i);
    }
    return r < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + t, t, 0, 4, this.mode)) : !1;
  }
  /**
  Move to this node's next sibling, if any.
  */
  nextSibling() {
    return this.sibling(1);
  }
  /**
  Move to this node's previous sibling, if any.
  */
  prevSibling() {
    return this.sibling(-1);
  }
  atLastNode(t) {
    let e, r, { buffer: i } = this;
    if (i) {
      if (t > 0) {
        if (this.index < i.buffer.buffer.length)
          return !1;
      } else
        for (let n = 0; n < this.index; n++)
          if (i.buffer.buffer[n + 3] < this.index)
            return !1;
      ({ index: e, parent: r } = i);
    } else
      ({ index: e, _parent: r } = this._tree);
    for (; r; { index: e, _parent: r } = r)
      if (e > -1)
        for (let n = e + t, s = t < 0 ? -1 : r._tree.children.length; n != s; n += t) {
          let h = r._tree.children[n];
          if (this.mode & z.IncludeAnonymous || h instanceof U || !h.type.isAnonymous || nt(h))
            return !1;
        }
    return !0;
  }
  move(t, e) {
    if (e && this.enterChild(
      t,
      0,
      4
      /* Side.DontCare */
    ))
      return !0;
    for (; ; ) {
      if (this.sibling(t))
        return !0;
      if (this.atLastNode(t) || !this.parent())
        return !1;
    }
  }
  /**
  Move to the next node in a
  [pre-order](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR)
  traversal, going from a node to its first child or, if the
  current node is empty or `enter` is false, its next sibling or
  the next sibling of the first parent node that has one.
  */
  next(t = !0) {
    return this.move(1, t);
  }
  /**
  Move to the next node in a last-to-first pre-order traversal. A
  node is followed by its last child or, if it has none, its
  previous sibling or the previous sibling of the first parent
  node that has one.
  */
  prev(t = !0) {
    return this.move(-1, t);
  }
  /**
  Move the cursor to the innermost node that covers `pos`. If
  `side` is -1, it will enter nodes that end at `pos`. If it is 1,
  it will enter nodes that start at `pos`.
  */
  moveTo(t, e = 0) {
    for (; (this.from == this.to || (e < 1 ? this.from >= t : this.from > t) || (e > -1 ? this.to <= t : this.to < t)) && this.parent(); )
      ;
    for (; this.enterChild(1, t, e); )
      ;
    return this;
  }
  /**
  Get a [syntax node](#common.SyntaxNode) at the cursor's current
  position.
  */
  get node() {
    if (!this.buffer)
      return this._tree;
    let t = this.bufferNode, e = null, r = 0;
    if (t && t.context == this.buffer)
      t: for (let i = this.index, n = this.stack.length; n >= 0; ) {
        for (let s = t; s; s = s._parent)
          if (s.index == i) {
            if (i == this.index)
              return s;
            e = s, r = n + 1;
            break t;
          }
        i = this.stack[--n];
      }
    for (let i = r; i < this.stack.length; i++)
      e = new M(this.buffer, e, this.stack[i]);
    return this.bufferNode = new M(this.buffer, e, this.index);
  }
  /**
  Get the [tree](#common.Tree) that represents the current node, if
  any. Will return null when the node is in a [tree
  buffer](#common.TreeBuffer).
  */
  get tree() {
    return this.buffer ? null : this._tree._tree;
  }
  /**
  Iterate over the current node and all its descendants, calling
  `enter` when entering a node and `leave`, if given, when leaving
  one. When `enter` returns `false`, any children of that node are
  skipped, and `leave` isn't called for it.
  */
  iterate(t, e) {
    for (let r = 0; ; ) {
      let i = !1;
      if (this.type.isAnonymous || t(this) !== !1) {
        if (this.firstChild()) {
          r++;
          continue;
        }
        this.type.isAnonymous || (i = !0);
      }
      for (; ; ) {
        if (i && e && e(this), i = this.type.isAnonymous, !r)
          return;
        if (this.nextSibling())
          break;
        this.parent(), r--, i = !0;
      }
    }
  }
  /**
  Test whether the current node matches a given context—a sequence
  of direct parent node names. Empty strings in the context array
  are treated as wildcards.
  */
  matchContext(t) {
    if (!this.buffer)
      return tt(this.node.parent, t);
    let { buffer: e } = this.buffer, { types: r } = e.set;
    for (let i = t.length - 1, n = this.stack.length - 1; i >= 0; n--) {
      if (n < 0)
        return tt(this._tree, t, i);
      let s = r[e.buffer[this.stack[n]]];
      if (!s.isAnonymous) {
        if (t[i] && t[i] != s.name)
          return !1;
        i--;
      }
    }
    return !0;
  }
}
function nt(l) {
  return l.children.some((t) => t instanceof U || !t.type.isAnonymous || nt(t));
}
function mt(l) {
  var t;
  let { buffer: e, nodeSet: r, maxBufferLength: i = 1024, reused: n = [], minRepeatType: s = r.types.length } = l, h = Array.isArray(e) ? new it(e, e.length) : e, o = r.types, C = 0, d = 0;
  function S(c, x, f, b, p, m) {
    let { id: a, start: u, end: g, size: y } = h, _ = d, L = C;
    if (y < 0)
      if (h.next(), y == -1) {
        let O = n[a];
        f.push(O), b.push(u - c);
        return;
      } else if (y == -3) {
        C = a;
        return;
      } else if (y == -4) {
        d = a;
        return;
      } else
        throw new RangeError(`Unrecognized record size: ${y}`);
    let V = o[a], $, T, lt = u - c;
    if (g - u <= i && (T = Y(h.pos - x, p))) {
      let O = new Uint16Array(T.size - T.skip), N = h.pos - T.size, P = O.length;
      for (; h.pos > N; )
        P = J(T.start, O, P);
      $ = new U(O, g - T.start, r), lt = T.start - c;
    } else {
      let O = h.pos - y;
      h.next();
      let N = [], P = [], F = a >= s ? a : -1, H = 0, q = g;
      for (; h.pos > O; )
        F >= 0 && h.id == F && h.size >= 0 ? (h.end <= q - i && (A(N, P, u, H, h.end, q, F, _, L), H = N.length, q = h.end), h.next()) : m > 2500 ? w(u, O, N, P) : S(u, O, N, P, F, m + 1);
      if (F >= 0 && H > 0 && H < N.length && A(N, P, u, H, u, q, F, _, L), N.reverse(), P.reverse(), F > -1 && H > 0) {
        let ht = B(V, L);
        $ = st(V, N, P, 0, N.length, 0, g - u, ht, ht);
      } else
        $ = R(V, N, P, g - u, _ - g, L);
    }
    f.push($), b.push(lt);
  }
  function w(c, x, f, b) {
    let p = [], m = 0, a = -1;
    for (; h.pos > x; ) {
      let { id: u, start: g, end: y, size: _ } = h;
      if (_ > 4)
        h.next();
      else {
        if (a > -1 && g < a)
          break;
        a < 0 && (a = y - i), p.push(u, g, y), m++, h.next();
      }
    }
    if (m) {
      let u = new Uint16Array(m * 4), g = p[p.length - 2];
      for (let y = p.length - 3, _ = 0; y >= 0; y -= 3)
        u[_++] = p[y], u[_++] = p[y + 1] - g, u[_++] = p[y + 2] - g, u[_++] = _;
      f.push(new U(u, p[2] - g, r)), b.push(g - c);
    }
  }
  function B(c, x) {
    return (f, b, p) => {
      let m = 0, a = f.length - 1, u, g;
      if (a >= 0 && (u = f[a]) instanceof E) {
        if (!a && u.type == c && u.length == p)
          return u;
        (g = u.prop(k.lookAhead)) && (m = b[a] + u.length + g);
      }
      return R(c, f, b, p, m, x);
    };
  }
  function A(c, x, f, b, p, m, a, u, g) {
    let y = [], _ = [];
    for (; c.length > b; )
      y.push(c.pop()), _.push(x.pop() + f - p);
    c.push(R(r.types[a], y, _, m - p, u - m, g)), x.push(p - f);
  }
  function R(c, x, f, b, p, m, a) {
    if (m) {
      let u = [k.contextHash, m];
      a = a ? [u].concat(a) : [u];
    }
    if (p > 25) {
      let u = [k.lookAhead, p];
      a = a ? [u].concat(a) : [u];
    }
    return new E(c, x, f, b, a);
  }
  function Y(c, x) {
    let f = h.fork(), b = 0, p = 0, m = 0, a = f.end - i, u = { size: 0, start: 0, skip: 0 };
    t: for (let g = f.pos - c; f.pos > g; ) {
      let y = f.size;
      if (f.id == x && y >= 0) {
        u.size = b, u.start = p, u.skip = m, m += 4, b += 4, f.next();
        continue;
      }
      let _ = f.pos - y;
      if (y < 0 || _ < g || f.start < a)
        break;
      let L = f.id >= s ? 4 : 0, V = f.start;
      for (f.next(); f.pos > _; ) {
        if (f.size < 0)
          if (f.size == -3 || f.size == -4)
            L += 4;
          else
            break t;
        else f.id >= s && (L += 4);
        f.next();
      }
      p = V, b += y, m += L;
    }
    return (x < 0 || b == c) && (u.size = b, u.start = p, u.skip = m), u.size > 4 ? u : void 0;
  }
  function J(c, x, f) {
    let { id: b, start: p, end: m, size: a } = h;
    if (h.next(), a >= 0 && b < s) {
      let u = f;
      if (a > 4) {
        let g = h.pos - (a - 4);
        for (; h.pos > g; )
          f = J(c, x, f);
      }
      x[--f] = u, x[--f] = m - c, x[--f] = p - c, x[--f] = b;
    } else a == -3 ? C = b : a == -4 && (d = b);
    return f;
  }
  let W = [], v = [];
  for (; h.pos > 0; )
    S(l.start || 0, l.bufferStart || 0, W, v, -1, 0);
  let D = (t = l.length) !== null && t !== void 0 ? t : W.length ? v[0] + W[0].length : 0;
  return new E(o[l.topID], W.reverse(), v.reverse(), D);
}
const ot = /* @__PURE__ */ new WeakMap();
function Q(l, t) {
  if (!l.isAnonymous || t instanceof U || t.type != l)
    return 1;
  let e = ot.get(t);
  if (e == null) {
    e = 1;
    for (let r of t.children) {
      if (r.type != l || !(r instanceof E)) {
        e = 1;
        break;
      }
      e += Q(l, r);
    }
    ot.set(t, e);
  }
  return e;
}
function st(l, t, e, r, i, n, s, h, o) {
  let C = 0;
  for (let A = r; A < i; A++)
    C += Q(l, t[A]);
  let d = Math.ceil(
    C * 1.5 / 8
    /* Balance.BranchFactor */
  ), S = [], w = [];
  function B(A, R, Y, J, W) {
    for (let v = Y; v < J; ) {
      let D = v, c = R[v], x = Q(l, A[v]);
      for (v++; v < J; v++) {
        let f = Q(l, A[v]);
        if (x + f >= d)
          break;
        x += f;
      }
      if (v == D + 1) {
        if (x > d) {
          let f = A[D];
          B(f.children, f.positions, 0, f.children.length, R[D] + W);
          continue;
        }
        S.push(A[D]);
      } else {
        let f = R[v - 1] + A[v - 1].length - c;
        S.push(st(l, A, R, D, v, c, f, null, o));
      }
      w.push(c + W - n);
    }
  }
  return B(t, e, r, i, 0), (h || o)(S, w, s);
}
class rt {
  /**
  Construct a tree fragment. You'll usually want to use
  [`addTree`](#common.TreeFragment^addTree) and
  [`applyChanges`](#common.TreeFragment^applyChanges) instead of
  calling this directly.
  */
  constructor(t, e, r, i, n = !1, s = !1) {
    this.from = t, this.to = e, this.tree = r, this.offset = i, this.open = (n ? 1 : 0) | (s ? 2 : 0);
  }
  /**
  Whether the start of the fragment represents the start of a
  parse, or the end of a change. (In the second case, it may not
  be safe to reuse some nodes at the start, depending on the
  parsing algorithm.)
  */
  get openStart() {
    return (this.open & 1) > 0;
  }
  /**
  Whether the end of the fragment represents the end of a
  full-document parse, or the start of a change.
  */
  get openEnd() {
    return (this.open & 2) > 0;
  }
  /**
  Create a set of fragments from a freshly parsed tree, or update
  an existing set of fragments by replacing the ones that overlap
  with a tree with content from the new tree. When `partial` is
  true, the parse is treated as incomplete, and the resulting
  fragment has [`openEnd`](#common.TreeFragment.openEnd) set to
  true.
  */
  static addTree(t, e = [], r = !1) {
    let i = [new rt(0, t.length, t, 0, !1, r)];
    for (let n of e)
      n.to > t.length && i.push(n);
    return i;
  }
  /**
  Apply a set of edits to an array of fragments, removing or
  splitting fragments as necessary to remove edited ranges, and
  adjusting offsets for fragments that moved.
  */
  static applyChanges(t, e, r = 128) {
    if (!e.length)
      return t;
    let i = [], n = 1, s = t.length ? t[0] : null;
    for (let h = 0, o = 0, C = 0; ; h++) {
      let d = h < e.length ? e[h] : null, S = d ? d.fromA : 1e9;
      if (S - o >= r)
        for (; s && s.from < S; ) {
          let w = s;
          if (o >= w.from || S <= w.to || C) {
            let B = Math.max(w.from, o) - C, A = Math.min(w.to, S) - C;
            w = B >= A ? null : new rt(B, A, w.tree, w.offset + C, h > 0, !!d);
          }
          if (w && i.push(w), s.to > S)
            break;
          s = n < t.length ? t[n++] : null;
        }
      if (!d)
        break;
      o = d.toA, C = d.toA - d.toB;
    }
    return i;
  }
}
class Ct {
  /**
  Start a parse, returning a [partial parse](#common.PartialParse)
  object. [`fragments`](#common.TreeFragment) can be passed in to
  make the parse incremental.
  
  By default, the entire input is parsed. You can pass `ranges`,
  which should be a sorted array of non-empty, non-overlapping
  ranges, to parse only those ranges. The tree returned in that
  case will start at `ranges[0].from`.
  */
  startParse(t, e, r) {
    return typeof t == "string" && (t = new wt(t)), r = r ? r.length ? r.map((i) => new Z(i.from, i.to)) : [new Z(0, 0)] : [new Z(0, t.length)], this.createParse(t, e || [], r);
  }
  /**
  Run a full parse, returning the resulting tree.
  */
  parse(t, e, r) {
    let i = this.startParse(t, e, r);
    for (; ; ) {
      let n = i.advance();
      if (n)
        return n;
    }
  }
}
class wt {
  constructor(t) {
    this.string = t;
  }
  get length() {
    return this.string.length;
  }
  chunk(t) {
    return this.string.slice(t);
  }
  get lineChunks() {
    return !1;
  }
  read(t, e) {
    return this.string.slice(t, e);
  }
}
new k({ perNode: !0 });
export {
  kt as DefaultBufferLength,
  z as IterMode,
  X as MountedTree,
  k as NodeProp,
  j as NodeType,
  Ct as Parser,
  E as Tree,
  U as TreeBuffer,
  et as TreeCursor,
  rt as TreeFragment
};
