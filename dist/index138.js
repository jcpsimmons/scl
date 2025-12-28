let d = 0;
class t {
  /**
  Create a new node prop type.
  */
  constructor(e = {}) {
    this.id = d++, this.perNode = !!e.perNode, this.deserialize = e.deserialize || (() => {
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
    return typeof e != "function" && (e = l.match(e)), (n) => {
      let o = e(n);
      return o === void 0 ? null : [this, o];
    };
  }
}
t.closedBy = new t({ deserialize: (r) => r.split(" ") });
t.openedBy = new t({ deserialize: (r) => r.split(" ") });
t.group = new t({ deserialize: (r) => r.split(" ") });
t.isolate = new t({ deserialize: (r) => {
  if (r && r != "rtl" && r != "ltr" && r != "auto")
    throw new RangeError("Invalid value for isolate: " + r);
  return r || "auto";
} });
t.contextHash = new t({ perNode: !0 });
t.lookAhead = new t({ perNode: !0 });
t.mounted = new t({ perNode: !0 });
const a = /* @__PURE__ */ Object.create(null);
class l {
  /**
  @internal
  */
  constructor(e, n, o, s = 0) {
    this.name = e, this.props = n, this.id = o, this.flags = s;
  }
  /**
  Define a node type.
  */
  static define(e) {
    let n = e.props && e.props.length ? /* @__PURE__ */ Object.create(null) : a, o = (e.top ? 1 : 0) | (e.skipped ? 2 : 0) | (e.error ? 4 : 0) | (e.name == null ? 8 : 0), s = new l(e.name || "", n, e.id, o);
    if (e.props) {
      for (let i of e.props)
        if (Array.isArray(i) || (i = i(s)), i) {
          if (i[0].perNode)
            throw new RangeError("Can't store a per-node prop on a node type");
          n[i[0].id] = i[1];
        }
    }
    return s;
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
      let n = this.prop(t.group);
      return n ? n.indexOf(e) > -1 : !1;
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
    let n = /* @__PURE__ */ Object.create(null);
    for (let o in e)
      for (let s of o.split(" "))
        n[s] = e[o];
    return (o) => {
      for (let s = o.prop(t.group), i = -1; i < (s ? s.length : 0); i++) {
        let p = n[i < 0 ? o.name : s[i]];
        if (p)
          return p;
      }
    };
  }
}
l.none = new l(
  "",
  /* @__PURE__ */ Object.create(null),
  0,
  8
  /* NodeFlag.Anonymous */
);
var u;
(function(r) {
  r[r.ExcludeBuffers = 1] = "ExcludeBuffers", r[r.IncludeAnonymous = 2] = "IncludeAnonymous", r[r.IgnoreMounts = 4] = "IgnoreMounts", r[r.IgnoreOverlays = 8] = "IgnoreOverlays";
})(u || (u = {}));
new t({ perNode: !0 });
export {
  u as IterMode,
  t as NodeProp,
  l as NodeType
};
