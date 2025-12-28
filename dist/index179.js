const ke = 1024;
let ce = 0;
class Z {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
class m {
  /**
  Create a new node prop type.
  */
  constructor(e = {}) {
    this.id = ce++, this.perNode = !!e.perNode, this.deserialize = e.deserialize || (() => {
      throw new Error("This node type doesn't define a deserialize function");
    }), this.combine = e.combine || null;
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
  add(e) {
    if (this.perNode)
      throw new RangeError("Can't add per-node props to node types");
    return typeof e != "function" && (e = E.match(e)), (t) => {
      let r = e(t);
      return r === void 0 ? null : [this, r];
    };
  }
}
m.closedBy = new m({ deserialize: (l) => l.split(" ") });
m.openedBy = new m({ deserialize: (l) => l.split(" ") });
m.group = new m({ deserialize: (l) => l.split(" ") });
m.isolate = new m({ deserialize: (l) => {
  if (l && l != "rtl" && l != "ltr" && l != "auto")
    throw new RangeError("Invalid value for isolate: " + l);
  return l || "auto";
} });
m.contextHash = new m({ perNode: !0 });
m.lookAhead = new m({ perNode: !0 });
m.mounted = new m({ perNode: !0 });
class X {
  constructor(e, t, r) {
    this.tree = e, this.overlay = t, this.parser = r;
  }
  /**
  @internal
  */
  static get(e) {
    return e && e.props && e.props[m.mounted.id];
  }
}
const ge = /* @__PURE__ */ Object.create(null);
class E {
  /**
  @internal
  */
  constructor(e, t, r, i = 0) {
    this.name = e, this.props = t, this.id = r, this.flags = i;
  }
  /**
  Define a node type.
  */
  static define(e) {
    let t = e.props && e.props.length ? /* @__PURE__ */ Object.create(null) : ge, r = (e.top ? 1 : 0) | (e.skipped ? 2 : 0) | (e.error ? 4 : 0) | (e.name == null ? 8 : 0), i = new E(e.name || "", t, e.id, r);
    if (e.props) {
      for (let n of e.props)
        if (Array.isArray(n) || (n = n(i)), n) {
          if (n[0].perNode)
            throw new RangeError("Can't store a per-node prop on a node type");
          t[n[0].id] = n[1];
        }
    }
    return i;
  }
  /**
  Retrieves a node prop for this type. Will return `undefined` if
  the prop isn't present on this node.
  */
  prop(e) {
    return this.props[e.id];
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
  is(e) {
    if (typeof e == "string") {
      if (this.name == e)
        return !0;
      let t = this.prop(m.group);
      return t ? t.indexOf(e) > -1 : !1;
    }
    return this.id == e;
  }
  /**
  Create a function from node types to arbitrary values by
  specifying an object whose property names are node or
  [group](#common.NodeProp^group) names. Often useful with
  [`NodeProp.add`](#common.NodeProp.add). You can put multiple
  names, separated by spaces, in a single property name to map
  multiple node names to a single value.
  */
  static match(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let r in e)
      for (let i of r.split(" "))
        t[i] = e[r];
    return (r) => {
      for (let i = r.prop(m.group), n = -1; n < (i ? i.length : 0); n++) {
        let s = t[n < 0 ? r.name : i[n]];
        if (s)
          return s;
      }
    };
  }
}
E.none = new E(
  "",
  /* @__PURE__ */ Object.create(null),
  0,
  8
  /* NodeFlag.Anonymous */
);
class oe {
  /**
  Create a set with the given types. The `id` property of each
  type should correspond to its position within the array.
  */
  constructor(e) {
    this.types = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].id != t)
        throw new RangeError("Node type ids should correspond to array positions when creating a node set");
  }
  /**
  Create a copy of this set with some node properties added. The
  arguments to this method can be created with
  [`NodeProp.add`](#common.NodeProp.add).
  */
  extend(...e) {
    let t = [];
    for (let r of this.types) {
      let i = null;
      for (let n of e) {
        let s = n(r);
        if (s) {
          i || (i = Object.assign({}, r.props));
          let h = s[1], o = s[0];
          o.combine && o.id in i && (h = o.combine(i[o.id], h)), i[o.id] = h;
        }
      }
      t.push(i ? new E(r.name, i, r.id, r.flags) : r);
    }
    return new oe(t);
  }
}
const K = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakMap();
var S;
(function(l) {
  l[l.ExcludeBuffers = 1] = "ExcludeBuffers", l[l.IncludeAnonymous = 2] = "IncludeAnonymous", l[l.IgnoreMounts = 4] = "IgnoreMounts", l[l.IgnoreOverlays = 8] = "IgnoreOverlays";
})(S || (S = {}));
class P {
  /**
  Construct a new tree. See also [`Tree.build`](#common.Tree^build).
  */
  constructor(e, t, r, i, n) {
    if (this.type = e, this.children = t, this.positions = r, this.length = i, this.props = null, n && n.length) {
      this.props = /* @__PURE__ */ Object.create(null);
      for (let [s, h] of n)
        this.props[typeof s == "number" ? s : s.id] = h;
    }
  }
  /**
  @internal
  */
  toString() {
    let e = X.get(this);
    if (e && !e.overlay)
      return e.tree.toString();
    let t = "";
    for (let r of this.children) {
      let i = r.toString();
      i && (t && (t += ","), t += i);
    }
    return this.type.name ? (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (t.length ? "(" + t + ")" : "") : t;
  }
  /**
  Get a [tree cursor](#common.TreeCursor) positioned at the top of
  the tree. Mode can be used to [control](#common.IterMode) which
  nodes the cursor visits.
  */
  cursor(e = 0) {
    return new te(this.topNode, e);
  }
  /**
  Get a [tree cursor](#common.TreeCursor) pointing into this tree
  at the given position and side (see
  [`moveTo`](#common.TreeCursor.moveTo).
  */
  cursorAt(e, t = 0, r = 0) {
    let i = K.get(this) || this.topNode, n = new te(i);
    return n.moveTo(e, t), K.set(this, n._tree), n;
  }
  /**
  Get a [syntax node](#common.SyntaxNode) object for the top of the
  tree.
  */
  get topNode() {
    return new z(this, 0, 0, null);
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
  resolve(e, t = 0) {
    let r = G(K.get(this) || this.topNode, e, t, !1);
    return K.set(this, r), r;
  }
  /**
  Like [`resolve`](#common.Tree.resolve), but will enter
  [overlaid](#common.MountedTree.overlay) nodes, producing a syntax node
  pointing into the innermost overlaid tree at the given position
  (with parent links going through all parent structure, including
  the host trees).
  */
  resolveInner(e, t = 0) {
    let r = G(he.get(this) || this.topNode, e, t, !0);
    return he.set(this, r), r;
  }
  /**
  In some situations, it can be useful to iterate through all
  nodes around a position, including those in overlays that don't
  directly cover the position. This method gives you an iterator
  that will produce all nodes, from small to big, around the given
  position.
  */
  resolveStack(e, t = 0) {
    return be(this, e, t);
  }
  /**
  Iterate over the tree and its children, calling `enter` for any
  node that touches the `from`/`to` region (if given) before
  running over such a node's children, and `leave` (if given) when
  leaving the node. When `enter` returns `false`, that node will
  not have its children iterated over (or `leave` called).
  */
  iterate(e) {
    let { enter: t, leave: r, from: i = 0, to: n = this.length } = e, s = e.mode || 0, h = (s & S.IncludeAnonymous) > 0;
    for (let o = this.cursor(s | S.IncludeAnonymous); ; ) {
      let _ = !1;
      if (o.from <= n && o.to >= i && (!h && o.type.isAnonymous || t(o) !== !1)) {
        if (o.firstChild())
          continue;
        _ = !0;
      }
      for (; _ && r && (h || !o.type.isAnonymous) && r(o), !o.nextSibling(); ) {
        if (!o.parent())
          return;
        _ = !0;
      }
    }
  }
  /**
  Get the value of the given [node prop](#common.NodeProp) for this
  node. Works with both per-node and per-type props.
  */
  prop(e) {
    return e.perNode ? this.props ? this.props[e.id] : void 0 : this.type.prop(e);
  }
  /**
  Returns the node's [per-node props](#common.NodeProp.perNode) in a
  format that can be passed to the [`Tree`](#common.Tree)
  constructor.
  */
  get propValues() {
    let e = [];
    if (this.props)
      for (let t in this.props)
        e.push([+t, this.props[t]]);
    return e;
  }
  /**
  Balance the direct children of this tree, producing a copy of
  which may have children grouped into subtrees with type
  [`NodeType.none`](#common.NodeType^none).
  */
  balance(e = {}) {
    return this.children.length <= 8 ? this : ne(E.none, this.children, this.positions, 0, this.children.length, 0, this.length, (t, r, i) => new P(this.type, t, r, i, this.propValues), e.makeTree || ((t, r, i) => new P(E.none, t, r, i)));
  }
  /**
  Build a tree from a postfix-ordered buffer of node information,
  or a cursor over such a buffer.
  */
  static build(e) {
    return me(e);
  }
}
P.empty = new P(E.none, [], [], 0);
class re {
  constructor(e, t) {
    this.buffer = e, this.index = t;
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
    return new re(this.buffer, this.index);
  }
}
class W {
  /**
  Create a tree buffer.
  */
  constructor(e, t, r) {
    this.buffer = e, this.length = t, this.set = r;
  }
  /**
  @internal
  */
  get type() {
    return E.none;
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    for (let t = 0; t < this.buffer.length; )
      e.push(this.childString(t)), t = this.buffer[t + 3];
    return e.join(",");
  }
  /**
  @internal
  */
  childString(e) {
    let t = this.buffer[e], r = this.buffer[e + 3], i = this.set.types[t], n = i.name;
    if (/\W/.test(n) && !i.isError && (n = JSON.stringify(n)), e += 4, r == e)
      return n;
    let s = [];
    for (; e < r; )
      s.push(this.childString(e)), e = this.buffer[e + 3];
    return n + "(" + s.join(",") + ")";
  }
  /**
  @internal
  */
  findChild(e, t, r, i, n) {
    let { buffer: s } = this, h = -1;
    for (let o = e; o != t && !(ae(n, i, s[o + 1], s[o + 2]) && (h = o, r > 0)); o = s[o + 3])
      ;
    return h;
  }
  /**
  @internal
  */
  slice(e, t, r) {
    let i = this.buffer, n = new Uint16Array(t - e), s = 0;
    for (let h = e, o = 0; h < t; ) {
      n[o++] = i[h++], n[o++] = i[h++] - r;
      let _ = n[o++] = i[h++] - r;
      n[o++] = i[h++] - e, s = Math.max(s, _);
    }
    return new W(n, s, this.set);
  }
}
function ae(l, e, t, r) {
  switch (l) {
    case -2:
      return t < e;
    case -1:
      return r >= e && t < e;
    case 0:
      return t < e && r > e;
    case 1:
      return t <= e && r > e;
    case 2:
      return r > e;
    case 4:
      return !0;
  }
}
function G(l, e, t, r) {
  for (var i; l.from == l.to || (t < 1 ? l.from >= e : l.from > e) || (t > -1 ? l.to <= e : l.to < e); ) {
    let s = !r && l instanceof z && l.index < 0 ? null : l.parent;
    if (!s)
      return l;
    l = s;
  }
  let n = r ? 0 : S.IgnoreOverlays;
  if (r)
    for (let s = l, h = s.parent; h; s = h, h = s.parent)
      s instanceof z && s.index < 0 && ((i = h.enter(e, t, n)) === null || i === void 0 ? void 0 : i.from) != s.from && (l = h);
  for (; ; ) {
    let s = l.enter(e, t, n);
    if (!s)
      return l;
    l = s;
  }
}
class de {
  cursor(e = 0) {
    return new te(this, e);
  }
  getChild(e, t = null, r = null) {
    let i = fe(this, e, t, r);
    return i.length ? i[0] : null;
  }
  getChildren(e, t = null, r = null) {
    return fe(this, e, t, r);
  }
  resolve(e, t = 0) {
    return G(this, e, t, !1);
  }
  resolveInner(e, t = 0) {
    return G(this, e, t, !0);
  }
  matchContext(e) {
    return ee(this.parent, e);
  }
  enterUnfinishedNodesBefore(e) {
    let t = this.childBefore(e), r = this;
    for (; t; ) {
      let i = t.lastChild;
      if (!i || i.to != t.to)
        break;
      i.type.isError && i.from == i.to ? (r = t, t = i.prevSibling) : t = i;
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
class z extends de {
  constructor(e, t, r, i) {
    super(), this._tree = e, this.from = t, this.index = r, this._parent = i;
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
  nextChild(e, t, r, i, n = 0) {
    for (let s = this; ; ) {
      for (let { children: h, positions: o } = s._tree, _ = t > 0 ? h.length : -1; e != _; e += t) {
        let w = h[e], A = o[e] + s.from;
        if (ae(i, r, A, A + w.length)) {
          if (w instanceof W) {
            if (n & S.ExcludeBuffers)
              continue;
            let B = w.findChild(0, w.buffer.length, t, r - A, i);
            if (B > -1)
              return new U(new xe(s, w, e, A), null, B);
          } else if (n & S.IncludeAnonymous || !w.type.isAnonymous || ie(w)) {
            let B;
            if (!(n & S.IgnoreMounts) && (B = X.get(w)) && !B.overlay)
              return new z(B.tree, A, e, s);
            let j = new z(w, A, e, s);
            return n & S.IncludeAnonymous || !j.type.isAnonymous ? j : j.nextChild(t < 0 ? w.children.length - 1 : 0, t, r, i);
          }
        }
      }
      if (n & S.IncludeAnonymous || !s.type.isAnonymous || (s.index >= 0 ? e = s.index + t : e = t < 0 ? -1 : s._parent._tree.children.length, s = s._parent, !s))
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
  childAfter(e) {
    return this.nextChild(
      0,
      1,
      e,
      2
      /* Side.After */
    );
  }
  childBefore(e) {
    return this.nextChild(
      this._tree.children.length - 1,
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  prop(e) {
    return this._tree.prop(e);
  }
  enter(e, t, r = 0) {
    let i;
    if (!(r & S.IgnoreOverlays) && (i = X.get(this._tree)) && i.overlay) {
      let n = e - this.from;
      for (let { from: s, to: h } of i.overlay)
        if ((t > 0 ? s <= n : s < n) && (t < 0 ? h >= n : h > n))
          return new z(i.tree, i.overlay[0].from + this.from, -1, this);
    }
    return this.nextChild(0, 1, e, t, r);
  }
  nextSignificantParent() {
    let e = this;
    for (; e.type.isAnonymous && e._parent; )
      e = e._parent;
    return e;
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
function fe(l, e, t, r) {
  let i = l.cursor(), n = [];
  if (!i.firstChild())
    return n;
  if (t != null) {
    for (let s = !1; !s; )
      if (s = i.type.is(t), !i.nextSibling())
        return n;
  }
  for (; ; ) {
    if (r != null && i.type.is(r))
      return n;
    if (i.type.is(e) && n.push(i.node), !i.nextSibling())
      return r == null ? n : [];
  }
}
function ee(l, e, t = e.length - 1) {
  for (let r = l; t >= 0; r = r.parent) {
    if (!r)
      return !1;
    if (!r.type.isAnonymous) {
      if (e[t] && e[t] != r.name)
        return !1;
      t--;
    }
  }
  return !0;
}
class xe {
  constructor(e, t, r, i) {
    this.parent = e, this.buffer = t, this.index = r, this.start = i;
  }
}
class U extends de {
  get name() {
    return this.type.name;
  }
  get from() {
    return this.context.start + this.context.buffer.buffer[this.index + 1];
  }
  get to() {
    return this.context.start + this.context.buffer.buffer[this.index + 2];
  }
  constructor(e, t, r) {
    super(), this.context = e, this._parent = t, this.index = r, this.type = e.buffer.set.types[e.buffer.buffer[r]];
  }
  child(e, t, r) {
    let { buffer: i } = this.context, n = i.findChild(this.index + 4, i.buffer[this.index + 3], e, t - this.context.start, r);
    return n < 0 ? null : new U(this.context, this, n);
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
  childAfter(e) {
    return this.child(
      1,
      e,
      2
      /* Side.After */
    );
  }
  childBefore(e) {
    return this.child(
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  prop(e) {
    return this.type.prop(e);
  }
  enter(e, t, r = 0) {
    if (r & S.ExcludeBuffers)
      return null;
    let { buffer: i } = this.context, n = i.findChild(this.index + 4, i.buffer[this.index + 3], t > 0 ? 1 : -1, e - this.context.start, t);
    return n < 0 ? null : new U(this.context, this, n);
  }
  get parent() {
    return this._parent || this.context.parent.nextSignificantParent();
  }
  externalSibling(e) {
    return this._parent ? null : this.context.parent.nextChild(
      this.context.index + e,
      e,
      0,
      4
      /* Side.DontCare */
    );
  }
  get nextSibling() {
    let { buffer: e } = this.context, t = e.buffer[this.index + 3];
    return t < (this._parent ? e.buffer[this._parent.index + 3] : e.buffer.length) ? new U(this.context, this._parent, t) : this.externalSibling(1);
  }
  get prevSibling() {
    let { buffer: e } = this.context, t = this._parent ? this._parent.index + 4 : 0;
    return this.index == t ? this.externalSibling(-1) : new U(this.context, this._parent, e.findChild(
      t,
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
    let e = [], t = [], { buffer: r } = this.context, i = this.index + 4, n = r.buffer[this.index + 3];
    if (n > i) {
      let s = r.buffer[this.index + 1];
      e.push(r.slice(i, n, s)), t.push(0);
    }
    return new P(this.type, e, t, this.to - this.from);
  }
  /**
  @internal
  */
  toString() {
    return this.context.buffer.childString(this.index);
  }
}
function pe(l) {
  if (!l.length)
    return null;
  let e = 0, t = l[0];
  for (let n = 1; n < l.length; n++) {
    let s = l[n];
    (s.from > t.from || s.to < t.to) && (t = s, e = n);
  }
  let r = t instanceof z && t.index < 0 ? null : t.parent, i = l.slice();
  return r ? i[e] = r : i.splice(e, 1), new ye(i, t);
}
class ye {
  constructor(e, t) {
    this.heads = e, this.node = t;
  }
  get next() {
    return pe(this.heads);
  }
}
function be(l, e, t) {
  let r = l.resolveInner(e, t), i = null;
  for (let n = r instanceof z ? r : r.context.parent; n; n = n.parent)
    if (n.index < 0) {
      let s = n.parent;
      (i || (i = [r])).push(s.resolve(e, t)), n = s;
    } else {
      let s = X.get(n.tree);
      if (s && s.overlay && s.overlay[0].from <= e && s.overlay[s.overlay.length - 1].to >= e) {
        let h = new z(s.tree, s.overlay[0].from + n.from, -1, n);
        (i || (i = [r])).push(G(h, e, t, !1));
      }
    }
  return i ? pe(i) : r;
}
class te {
  /**
  Shorthand for `.type.name`.
  */
  get name() {
    return this.type.name;
  }
  /**
  @internal
  */
  constructor(e, t = 0) {
    if (this.mode = t, this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, e instanceof z)
      this.yieldNode(e);
    else {
      this._tree = e.context.parent, this.buffer = e.context;
      for (let r = e._parent; r; r = r._parent)
        this.stack.unshift(r.index);
      this.bufferNode = e, this.yieldBuf(e.index);
    }
  }
  yieldNode(e) {
    return e ? (this._tree = e, this.type = e.type, this.from = e.from, this.to = e.to, !0) : !1;
  }
  yieldBuf(e, t) {
    this.index = e;
    let { start: r, buffer: i } = this.buffer;
    return this.type = t || i.set.types[i.buffer[e]], this.from = r + i.buffer[e + 1], this.to = r + i.buffer[e + 2], !0;
  }
  /**
  @internal
  */
  yield(e) {
    return e ? e instanceof z ? (this.buffer = null, this.yieldNode(e)) : (this.buffer = e.context, this.yieldBuf(e.index, e.type)) : !1;
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
  enterChild(e, t, r) {
    if (!this.buffer)
      return this.yield(this._tree.nextChild(e < 0 ? this._tree._tree.children.length - 1 : 0, e, t, r, this.mode));
    let { buffer: i } = this.buffer, n = i.findChild(this.index + 4, i.buffer[this.index + 3], e, t - this.buffer.start, r);
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
  childAfter(e) {
    return this.enterChild(
      1,
      e,
      2
      /* Side.After */
    );
  }
  /**
  Move to the last child that starts before `pos`.
  */
  childBefore(e) {
    return this.enterChild(
      -1,
      e,
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
  enter(e, t, r = this.mode) {
    return this.buffer ? r & S.ExcludeBuffers ? !1 : this.enterChild(1, e, t) : this.yield(this._tree.enter(e, t, r));
  }
  /**
  Move to the node's parent node, if this isn't the top node.
  */
  parent() {
    if (!this.buffer)
      return this.yieldNode(this.mode & S.IncludeAnonymous ? this._tree._parent : this._tree.parent);
    if (this.stack.length)
      return this.yieldBuf(this.stack.pop());
    let e = this.mode & S.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
    return this.buffer = null, this.yieldNode(e);
  }
  /**
  @internal
  */
  sibling(e) {
    if (!this.buffer)
      return this._tree._parent ? this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + e, e, 0, 4, this.mode)) : !1;
    let { buffer: t } = this.buffer, r = this.stack.length - 1;
    if (e < 0) {
      let i = r < 0 ? 0 : this.stack[r] + 4;
      if (this.index != i)
        return this.yieldBuf(t.findChild(
          i,
          this.index,
          -1,
          0,
          4
          /* Side.DontCare */
        ));
    } else {
      let i = t.buffer[this.index + 3];
      if (i < (r < 0 ? t.buffer.length : t.buffer[this.stack[r] + 3]))
        return this.yieldBuf(i);
    }
    return r < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + e, e, 0, 4, this.mode)) : !1;
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
  atLastNode(e) {
    let t, r, { buffer: i } = this;
    if (i) {
      if (e > 0) {
        if (this.index < i.buffer.buffer.length)
          return !1;
      } else
        for (let n = 0; n < this.index; n++)
          if (i.buffer.buffer[n + 3] < this.index)
            return !1;
      ({ index: t, parent: r } = i);
    } else
      ({ index: t, _parent: r } = this._tree);
    for (; r; { index: t, _parent: r } = r)
      if (t > -1)
        for (let n = t + e, s = e < 0 ? -1 : r._tree.children.length; n != s; n += e) {
          let h = r._tree.children[n];
          if (this.mode & S.IncludeAnonymous || h instanceof W || !h.type.isAnonymous || ie(h))
            return !1;
        }
    return !0;
  }
  move(e, t) {
    if (t && this.enterChild(
      e,
      0,
      4
      /* Side.DontCare */
    ))
      return !0;
    for (; ; ) {
      if (this.sibling(e))
        return !0;
      if (this.atLastNode(e) || !this.parent())
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
  next(e = !0) {
    return this.move(1, e);
  }
  /**
  Move to the next node in a last-to-first pre-order traversal. A
  node is followed by its last child or, if it has none, its
  previous sibling or the previous sibling of the first parent
  node that has one.
  */
  prev(e = !0) {
    return this.move(-1, e);
  }
  /**
  Move the cursor to the innermost node that covers `pos`. If
  `side` is -1, it will enter nodes that end at `pos`. If it is 1,
  it will enter nodes that start at `pos`.
  */
  moveTo(e, t = 0) {
    for (; (this.from == this.to || (t < 1 ? this.from >= e : this.from > e) || (t > -1 ? this.to <= e : this.to < e)) && this.parent(); )
      ;
    for (; this.enterChild(1, e, t); )
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
    let e = this.bufferNode, t = null, r = 0;
    if (e && e.context == this.buffer)
      e: for (let i = this.index, n = this.stack.length; n >= 0; ) {
        for (let s = e; s; s = s._parent)
          if (s.index == i) {
            if (i == this.index)
              return s;
            t = s, r = n + 1;
            break e;
          }
        i = this.stack[--n];
      }
    for (let i = r; i < this.stack.length; i++)
      t = new U(this.buffer, t, this.stack[i]);
    return this.bufferNode = new U(this.buffer, t, this.index);
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
  iterate(e, t) {
    for (let r = 0; ; ) {
      let i = !1;
      if (this.type.isAnonymous || e(this) !== !1) {
        if (this.firstChild()) {
          r++;
          continue;
        }
        this.type.isAnonymous || (i = !0);
      }
      for (; ; ) {
        if (i && t && t(this), i = this.type.isAnonymous, !r)
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
  matchContext(e) {
    if (!this.buffer)
      return ee(this.node.parent, e);
    let { buffer: t } = this.buffer, { types: r } = t.set;
    for (let i = e.length - 1, n = this.stack.length - 1; i >= 0; n--) {
      if (n < 0)
        return ee(this._tree, e, i);
      let s = r[t.buffer[this.stack[n]]];
      if (!s.isAnonymous) {
        if (e[i] && e[i] != s.name)
          return !1;
        i--;
      }
    }
    return !0;
  }
}
function ie(l) {
  return l.children.some((e) => e instanceof W || !e.type.isAnonymous || ie(e));
}
function me(l) {
  var e;
  let { buffer: t, nodeSet: r, maxBufferLength: i = 1024, reused: n = [], minRepeatType: s = r.types.length } = l, h = Array.isArray(t) ? new re(t, t.length) : t, o = r.types, _ = 0, w = 0;
  function A(p, g, f, y, d, b) {
    let { id: a, start: u, end: c, size: x } = h, k = w, L = _;
    if (x < 0)
      if (h.next(), x == -1) {
        let O = n[a];
        f.push(O), y.push(u - p);
        return;
      } else if (x == -3) {
        _ = a;
        return;
      } else if (x == -4) {
        w = a;
        return;
      } else
        throw new RangeError(`Unrecognized record size: ${x}`);
    let V = o[a], $, H, se = u - p;
    if (c - u <= i && (H = Y(h.pos - g, d))) {
      let O = new Uint16Array(H.size - H.skip), N = h.pos - H.size, I = O.length;
      for (; h.pos > N; )
        I = J(H.start, O, I);
      $ = new W(O, c - H.start, r), se = H.start - p;
    } else {
      let O = h.pos - x;
      h.next();
      let N = [], I = [], M = a >= s ? a : -1, F = 0, q = c;
      for (; h.pos > O; )
        M >= 0 && h.id == M && h.size >= 0 ? (h.end <= q - i && (v(N, I, u, F, h.end, q, M, k, L), F = N.length, q = h.end), h.next()) : b > 2500 ? B(u, O, N, I) : A(u, O, N, I, M, b + 1);
      if (M >= 0 && F > 0 && F < N.length && v(N, I, u, F, u, q, M, k, L), N.reverse(), I.reverse(), M > -1 && F > 0) {
        let le = j(V, L);
        $ = ne(V, N, I, 0, N.length, 0, c - u, le, le);
      } else
        $ = R(V, N, I, c - u, k - c, L);
    }
    f.push($), y.push(se);
  }
  function B(p, g, f, y) {
    let d = [], b = 0, a = -1;
    for (; h.pos > g; ) {
      let { id: u, start: c, end: x, size: k } = h;
      if (k > 4)
        h.next();
      else {
        if (a > -1 && c < a)
          break;
        a < 0 && (a = x - i), d.push(u, c, x), b++, h.next();
      }
    }
    if (b) {
      let u = new Uint16Array(b * 4), c = d[d.length - 2];
      for (let x = d.length - 3, k = 0; x >= 0; x -= 3)
        u[k++] = d[x], u[k++] = d[x + 1] - c, u[k++] = d[x + 2] - c, u[k++] = k;
      f.push(new W(u, d[2] - c, r)), y.push(c - p);
    }
  }
  function j(p, g) {
    return (f, y, d) => {
      let b = 0, a = f.length - 1, u, c;
      if (a >= 0 && (u = f[a]) instanceof P) {
        if (!a && u.type == p && u.length == d)
          return u;
        (c = u.prop(m.lookAhead)) && (b = y[a] + u.length + c);
      }
      return R(p, f, y, d, b, g);
    };
  }
  function v(p, g, f, y, d, b, a, u, c) {
    let x = [], k = [];
    for (; p.length > y; )
      x.push(p.pop()), k.push(g.pop() + f - d);
    p.push(R(r.types[a], x, k, b - d, u - b, c)), g.push(d - f);
  }
  function R(p, g, f, y, d, b, a) {
    if (b) {
      let u = [m.contextHash, b];
      a = a ? [u].concat(a) : [u];
    }
    if (d > 25) {
      let u = [m.lookAhead, d];
      a = a ? [u].concat(a) : [u];
    }
    return new P(p, g, f, y, a);
  }
  function Y(p, g) {
    let f = h.fork(), y = 0, d = 0, b = 0, a = f.end - i, u = { size: 0, start: 0, skip: 0 };
    e: for (let c = f.pos - p; f.pos > c; ) {
      let x = f.size;
      if (f.id == g && x >= 0) {
        u.size = y, u.start = d, u.skip = b, b += 4, y += 4, f.next();
        continue;
      }
      let k = f.pos - x;
      if (x < 0 || k < c || f.start < a)
        break;
      let L = f.id >= s ? 4 : 0, V = f.start;
      for (f.next(); f.pos > k; ) {
        if (f.size < 0)
          if (f.size == -3 || f.size == -4)
            L += 4;
          else
            break e;
        else f.id >= s && (L += 4);
        f.next();
      }
      d = V, y += x, b += L;
    }
    return (g < 0 || y == p) && (u.size = y, u.start = d, u.skip = b), u.size > 4 ? u : void 0;
  }
  function J(p, g, f) {
    let { id: y, start: d, end: b, size: a } = h;
    if (h.next(), a >= 0 && y < s) {
      let u = f;
      if (a > 4) {
        let c = h.pos - (a - 4);
        for (; h.pos > c; )
          f = J(p, g, f);
      }
      g[--f] = u, g[--f] = b - p, g[--f] = d - p, g[--f] = y;
    } else a == -3 ? _ = y : a == -4 && (w = y);
    return f;
  }
  let D = [], C = [];
  for (; h.pos > 0; )
    A(l.start || 0, l.bufferStart || 0, D, C, -1, 0);
  let T = (e = l.length) !== null && e !== void 0 ? e : D.length ? C[0] + D[0].length : 0;
  return new P(o[l.topID], D.reverse(), C.reverse(), T);
}
const ue = /* @__PURE__ */ new WeakMap();
function Q(l, e) {
  if (!l.isAnonymous || e instanceof W || e.type != l)
    return 1;
  let t = ue.get(e);
  if (t == null) {
    t = 1;
    for (let r of e.children) {
      if (r.type != l || !(r instanceof P)) {
        t = 1;
        break;
      }
      t += Q(l, r);
    }
    ue.set(e, t);
  }
  return t;
}
function ne(l, e, t, r, i, n, s, h, o) {
  let _ = 0;
  for (let v = r; v < i; v++)
    _ += Q(l, e[v]);
  let w = Math.ceil(
    _ * 1.5 / 8
    /* Balance.BranchFactor */
  ), A = [], B = [];
  function j(v, R, Y, J, D) {
    for (let C = Y; C < J; ) {
      let T = C, p = R[C], g = Q(l, v[C]);
      for (C++; C < J; C++) {
        let f = Q(l, v[C]);
        if (g + f >= w)
          break;
        g += f;
      }
      if (C == T + 1) {
        if (g > w) {
          let f = v[T];
          j(f.children, f.positions, 0, f.children.length, R[T] + D);
          continue;
        }
        A.push(v[T]);
      } else {
        let f = R[C - 1] + v[C - 1].length - p;
        A.push(ne(l, v, R, T, C, p, f, null, o));
      }
      B.push(p + D - n);
    }
  }
  return j(e, t, r, i, 0), (h || o)(A, B, s);
}
class Ce {
  /**
  Start a parse, returning a [partial parse](#common.PartialParse)
  object. [`fragments`](#common.TreeFragment) can be passed in to
  make the parse incremental.
  
  By default, the entire input is parsed. You can pass `ranges`,
  which should be a sorted array of non-empty, non-overlapping
  ranges, to parse only those ranges. The tree returned in that
  case will start at `ranges[0].from`.
  */
  startParse(e, t, r) {
    return typeof e == "string" && (e = new we(e)), r = r ? r.length ? r.map((i) => new Z(i.from, i.to)) : [new Z(0, 0)] : [new Z(0, e.length)], this.createParse(e, t || [], r);
  }
  /**
  Run a full parse, returning the resulting tree.
  */
  parse(e, t, r) {
    let i = this.startParse(e, t, r);
    for (; ; ) {
      let n = i.advance();
      if (n)
        return n;
    }
  }
}
class we {
  constructor(e) {
    this.string = e;
  }
  get length() {
    return this.string.length;
  }
  chunk(e) {
    return this.string.slice(e);
  }
  get lineChunks() {
    return !1;
  }
  read(e, t) {
    return this.string.slice(e, t);
  }
}
new m({ perNode: !0 });
export {
  ke as DefaultBufferLength,
  S as IterMode,
  X as MountedTree,
  m as NodeProp,
  oe as NodeSet,
  E as NodeType,
  Ce as Parser,
  P as Tree,
  W as TreeBuffer,
  te as TreeCursor
};
