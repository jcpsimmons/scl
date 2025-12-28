import { NodeProp as F } from "./index134.js";
let z = 0;
class g {
  /**
  @internal
  */
  constructor(t, a, n, i) {
    this.name = t, this.set = a, this.base = n, this.modified = i, this.id = z++;
  }
  toString() {
    let { name: t } = this;
    for (let a of this.modified)
      a.name && (t = `${a.name}(${t})`);
    return t;
  }
  static define(t, a) {
    let n = typeof t == "string" ? t : "?";
    if (t instanceof g && (a = t), a != null && a.base)
      throw new Error("Can not derive from a modified tag");
    let i = new g(n, [], null, []);
    if (i.set.push(i), a)
      for (let o of a.set)
        i.set.push(o);
    return i;
  }
  /**
  Define a tag _modifier_, which is a function that, given a tag,
  will return a tag that is a subtag of the original. Applying the
  same modifier to a twice tag will return the same value (`m1(t1)
  == m1(t1)`) and applying multiple modifiers will, regardless or
  order, produce the same tag (`m1(m2(t1)) == m2(m1(t1))`).
  
  When multiple modifiers are applied to a given base tag, each
  smaller set of modifiers is registered as a parent, so that for
  example `m1(m2(m3(t1)))` is a subtype of `m1(m2(t1))`,
  `m1(m3(t1)`, and so on.
  */
  static defineModifier(t) {
    let a = new q(t);
    return (n) => n.modified.indexOf(a) > -1 ? n : q.get(n.base || n, n.modified.concat(a).sort((i, o) => i.id - o.id));
  }
}
let G = 0;
class q {
  constructor(t) {
    this.name = t, this.instances = [], this.id = G++;
  }
  static get(t, a) {
    if (!a.length)
      return t;
    let n = a[0].instances.find((r) => r.base == t && L(a, r.modified));
    if (n)
      return n;
    let i = [], o = new g(t.name, i, t, a);
    for (let r of a)
      r.instances.push(o);
    let c = P(a);
    for (let r of t.set)
      if (!r.modified.length)
        for (let m of c)
          i.push(q.get(r, m));
    return o;
  }
}
function L(s, t) {
  return s.length == t.length && s.every((a, n) => a == t[n]);
}
function P(s) {
  let t = [[]];
  for (let a = 0; a < s.length; a++)
    for (let n = 0, i = t.length; n < i; n++)
      t.push(t[n].concat(s[a]));
  return t.sort((a, n) => n.length - a.length);
}
function Z(s) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let a in s) {
    let n = s[a];
    Array.isArray(n) || (n = [n]);
    for (let i of a.split(" "))
      if (i) {
        let o = [], c = 2, r = i;
        for (let d = 0; ; ) {
          if (r == "..." && d > 0 && d + 3 == i.length) {
            c = 1;
            break;
          }
          let f = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(r);
          if (!f)
            throw new RangeError("Invalid path: " + i);
          if (o.push(f[0] == "*" ? "" : f[0][0] == '"' ? JSON.parse(f[0]) : f[0]), d += f[0].length, d == i.length)
            break;
          let b = i[d++];
          if (d == i.length && b == "!") {
            c = 0;
            break;
          }
          if (b != "/")
            throw new RangeError("Invalid path: " + i);
          r = i.slice(d);
        }
        let m = o.length - 1, h = o[m];
        if (!h)
          throw new RangeError("Invalid path: " + i);
        let v = new R(n, c, m > 0 ? o.slice(0, m) : null);
        t[h] = v.sort(t[h]);
      }
  }
  return J.add(t);
}
const J = new F({
  combine(s, t) {
    let a, n, i;
    for (; s || t; ) {
      if (!s || t && s.depth >= t.depth ? (i = t, t = t.next) : (i = s, s = s.next), a && a.mode == i.mode && !i.context && !a.context)
        continue;
      let o = new R(i.tags, i.mode, i.context);
      a ? a.next = o : n = o, a = o;
    }
    return n;
  }
});
class R {
  constructor(t, a, n, i) {
    this.tags = t, this.mode = a, this.context = n, this.next = i;
  }
  get opaque() {
    return this.mode == 0;
  }
  get inherit() {
    return this.mode == 1;
  }
  sort(t) {
    return !t || t.depth < this.depth ? (this.next = t, this) : (t.next = this.sort(t.next), t);
  }
  get depth() {
    return this.context ? this.context.length : 0;
  }
}
R.empty = new R([], 2, null);
function Q(s, t) {
  let a = /* @__PURE__ */ Object.create(null);
  for (let o of s)
    if (!Array.isArray(o.tag))
      a[o.tag.id] = o.class;
    else
      for (let c of o.tag)
        a[c.id] = o.class;
  let { scope: n, all: i = null } = t || {};
  return {
    style: (o) => {
      let c = i;
      for (let r of o)
        for (let m of r.set) {
          let h = a[m.id];
          if (h) {
            c = c ? c + " " + h : h;
            break;
          }
        }
      return c;
    },
    scope: n
  };
}
function U(s, t) {
  let a = null;
  for (let n of s) {
    let i = n.style(t);
    i && (a = a ? a + " " + i : i);
  }
  return a;
}
function _(s, t, a, n = 0, i = s.length) {
  let o = new W(n, Array.isArray(t) ? t : [t], a);
  o.highlightRange(s.cursor(), n, i, "", o.highlighters), o.flush(i);
}
class W {
  constructor(t, a, n) {
    this.at = t, this.highlighters = a, this.span = n, this.class = "";
  }
  startSpan(t, a) {
    a != this.class && (this.flush(t), t > this.at && (this.at = t), this.class = a);
  }
  flush(t) {
    t > this.at && this.class && this.span(this.at, t, this.class);
  }
  highlightRange(t, a, n, i, o) {
    let { type: c, from: r, to: m } = t;
    if (r >= n || m <= a)
      return;
    c.isTop && (o = this.highlighters.filter((b) => !b.scope || b.scope(c)));
    let h = i, v = X(t) || R.empty, d = U(o, v.tags);
    if (d && (h && (h += " "), h += d, v.mode == 1 && (i += (i ? " " : "") + d)), this.startSpan(Math.max(a, r), h), v.opaque)
      return;
    let f = t.tree && t.tree.prop(F.mounted);
    if (f && f.overlay) {
      let b = t.node.enter(f.overlay[0].from + r, 1), V = this.highlighters.filter((w) => !w.scope || w.scope(f.tree.type)), B = t.firstChild();
      for (let w = 0, M = r; ; w++) {
        let S = w < f.overlay.length ? f.overlay[w] : null, E = S ? S.from + r : m, H = Math.max(a, M), A = Math.min(n, E);
        if (H < A && B)
          for (; t.from < A && (this.highlightRange(t, H, A, i, o), this.startSpan(Math.min(A, t.to), h), !(t.to >= E || !t.nextSibling())); )
            ;
        if (!S || E > n)
          break;
        M = S.to + r, M > a && (this.highlightRange(b.cursor(), Math.max(a, S.from + r), Math.min(n, M), "", V), this.startSpan(Math.min(n, M), h));
      }
      B && t.parent();
    } else if (t.firstChild()) {
      f && (i = "");
      do
        if (!(t.to <= a)) {
          if (t.from >= n)
            break;
          this.highlightRange(t, a, n, i, o), this.startSpan(Math.min(n, t.to), h);
        }
      while (t.nextSibling());
      t.parent();
    }
  }
}
function X(s) {
  let t = s.type.prop(J);
  for (; t && t.context && !s.matchContext(t.context); )
    t = t.next;
  return t || null;
}
const e = g.define, I = e(), y = e(), D = e(y), $ = e(y), N = e(), T = e(N), K = e(N), k = e(), x = e(k), p = e(), u = e(), j = e(), O = e(j), C = e(), l = {
  /**
  A comment.
  */
  comment: I,
  /**
  A line [comment](#highlight.tags.comment).
  */
  lineComment: e(I),
  /**
  A block [comment](#highlight.tags.comment).
  */
  blockComment: e(I),
  /**
  A documentation [comment](#highlight.tags.comment).
  */
  docComment: e(I),
  /**
  Any kind of identifier.
  */
  name: y,
  /**
  The [name](#highlight.tags.name) of a variable.
  */
  variableName: e(y),
  /**
  A type [name](#highlight.tags.name).
  */
  typeName: D,
  /**
  A tag name (subtag of [`typeName`](#highlight.tags.typeName)).
  */
  tagName: e(D),
  /**
  A property or field [name](#highlight.tags.name).
  */
  propertyName: $,
  /**
  An attribute name (subtag of [`propertyName`](#highlight.tags.propertyName)).
  */
  attributeName: e($),
  /**
  The [name](#highlight.tags.name) of a class.
  */
  className: e(y),
  /**
  A label [name](#highlight.tags.name).
  */
  labelName: e(y),
  /**
  A namespace [name](#highlight.tags.name).
  */
  namespace: e(y),
  /**
  The [name](#highlight.tags.name) of a macro.
  */
  macroName: e(y),
  /**
  A literal value.
  */
  literal: N,
  /**
  A string [literal](#highlight.tags.literal).
  */
  string: T,
  /**
  A documentation [string](#highlight.tags.string).
  */
  docString: e(T),
  /**
  A character literal (subtag of [string](#highlight.tags.string)).
  */
  character: e(T),
  /**
  An attribute value (subtag of [string](#highlight.tags.string)).
  */
  attributeValue: e(T),
  /**
  A number [literal](#highlight.tags.literal).
  */
  number: K,
  /**
  An integer [number](#highlight.tags.number) literal.
  */
  integer: e(K),
  /**
  A floating-point [number](#highlight.tags.number) literal.
  */
  float: e(K),
  /**
  A boolean [literal](#highlight.tags.literal).
  */
  bool: e(N),
  /**
  Regular expression [literal](#highlight.tags.literal).
  */
  regexp: e(N),
  /**
  An escape [literal](#highlight.tags.literal), for example a
  backslash escape in a string.
  */
  escape: e(N),
  /**
  A color [literal](#highlight.tags.literal).
  */
  color: e(N),
  /**
  A URL [literal](#highlight.tags.literal).
  */
  url: e(N),
  /**
  A language keyword.
  */
  keyword: p,
  /**
  The [keyword](#highlight.tags.keyword) for the self or this
  object.
  */
  self: e(p),
  /**
  The [keyword](#highlight.tags.keyword) for null.
  */
  null: e(p),
  /**
  A [keyword](#highlight.tags.keyword) denoting some atomic value.
  */
  atom: e(p),
  /**
  A [keyword](#highlight.tags.keyword) that represents a unit.
  */
  unit: e(p),
  /**
  A modifier [keyword](#highlight.tags.keyword).
  */
  modifier: e(p),
  /**
  A [keyword](#highlight.tags.keyword) that acts as an operator.
  */
  operatorKeyword: e(p),
  /**
  A control-flow related [keyword](#highlight.tags.keyword).
  */
  controlKeyword: e(p),
  /**
  A [keyword](#highlight.tags.keyword) that defines something.
  */
  definitionKeyword: e(p),
  /**
  A [keyword](#highlight.tags.keyword) related to defining or
  interfacing with modules.
  */
  moduleKeyword: e(p),
  /**
  An operator.
  */
  operator: u,
  /**
  An [operator](#highlight.tags.operator) that dereferences something.
  */
  derefOperator: e(u),
  /**
  Arithmetic-related [operator](#highlight.tags.operator).
  */
  arithmeticOperator: e(u),
  /**
  Logical [operator](#highlight.tags.operator).
  */
  logicOperator: e(u),
  /**
  Bit [operator](#highlight.tags.operator).
  */
  bitwiseOperator: e(u),
  /**
  Comparison [operator](#highlight.tags.operator).
  */
  compareOperator: e(u),
  /**
  [Operator](#highlight.tags.operator) that updates its operand.
  */
  updateOperator: e(u),
  /**
  [Operator](#highlight.tags.operator) that defines something.
  */
  definitionOperator: e(u),
  /**
  Type-related [operator](#highlight.tags.operator).
  */
  typeOperator: e(u),
  /**
  Control-flow [operator](#highlight.tags.operator).
  */
  controlOperator: e(u),
  /**
  Program or markup punctuation.
  */
  punctuation: j,
  /**
  [Punctuation](#highlight.tags.punctuation) that separates
  things.
  */
  separator: e(j),
  /**
  Bracket-style [punctuation](#highlight.tags.punctuation).
  */
  bracket: O,
  /**
  Angle [brackets](#highlight.tags.bracket) (usually `<` and `>`
  tokens).
  */
  angleBracket: e(O),
  /**
  Square [brackets](#highlight.tags.bracket) (usually `[` and `]`
  tokens).
  */
  squareBracket: e(O),
  /**
  Parentheses (usually `(` and `)` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  paren: e(O),
  /**
  Braces (usually `{` and `}` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  brace: e(O),
  /**
  Content, for example plain text in XML or markup documents.
  */
  content: k,
  /**
  [Content](#highlight.tags.content) that represents a heading.
  */
  heading: x,
  /**
  A level 1 [heading](#highlight.tags.heading).
  */
  heading1: e(x),
  /**
  A level 2 [heading](#highlight.tags.heading).
  */
  heading2: e(x),
  /**
  A level 3 [heading](#highlight.tags.heading).
  */
  heading3: e(x),
  /**
  A level 4 [heading](#highlight.tags.heading).
  */
  heading4: e(x),
  /**
  A level 5 [heading](#highlight.tags.heading).
  */
  heading5: e(x),
  /**
  A level 6 [heading](#highlight.tags.heading).
  */
  heading6: e(x),
  /**
  A prose [content](#highlight.tags.content) separator (such as a horizontal rule).
  */
  contentSeparator: e(k),
  /**
  [Content](#highlight.tags.content) that represents a list.
  */
  list: e(k),
  /**
  [Content](#highlight.tags.content) that represents a quote.
  */
  quote: e(k),
  /**
  [Content](#highlight.tags.content) that is emphasized.
  */
  emphasis: e(k),
  /**
  [Content](#highlight.tags.content) that is styled strong.
  */
  strong: e(k),
  /**
  [Content](#highlight.tags.content) that is part of a link.
  */
  link: e(k),
  /**
  [Content](#highlight.tags.content) that is styled as code or
  monospace.
  */
  monospace: e(k),
  /**
  [Content](#highlight.tags.content) that has a strike-through
  style.
  */
  strikethrough: e(k),
  /**
  Inserted text in a change-tracking format.
  */
  inserted: e(),
  /**
  Deleted text.
  */
  deleted: e(),
  /**
  Changed text.
  */
  changed: e(),
  /**
  An invalid or unsyntactic element.
  */
  invalid: e(),
  /**
  Metadata or meta-instruction.
  */
  meta: C,
  /**
  [Metadata](#highlight.tags.meta) that applies to the entire
  document.
  */
  documentMeta: e(C),
  /**
  [Metadata](#highlight.tags.meta) that annotates or adds
  attributes to a given syntactic element.
  */
  annotation: e(C),
  /**
  Processing instruction or preprocessor directive. Subtag of
  [meta](#highlight.tags.meta).
  */
  processingInstruction: e(C),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that a
  given element is being defined. Expected to be used with the
  various [name](#highlight.tags.name) tags.
  */
  definition: g.defineModifier("definition"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that
  something is constant. Mostly expected to be used with
  [variable names](#highlight.tags.variableName).
  */
  constant: g.defineModifier("constant"),
  /**
  [Modifier](#highlight.Tag^defineModifier) used to indicate that
  a [variable](#highlight.tags.variableName) or [property
  name](#highlight.tags.propertyName) is being called or defined
  as a function.
  */
  function: g.defineModifier("function"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that can be applied to
  [names](#highlight.tags.name) to indicate that they belong to
  the language's standard environment.
  */
  standard: g.defineModifier("standard"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates a given
  [names](#highlight.tags.name) is local to some scope.
  */
  local: g.defineModifier("local"),
  /**
  A generic variant [modifier](#highlight.Tag^defineModifier) that
  can be used to tag language-specific alternative variants of
  some common tag. It is recommended for themes to define special
  forms of at least the [string](#highlight.tags.string) and
  [variable name](#highlight.tags.variableName) tags, since those
  come up a lot.
  */
  special: g.defineModifier("special")
};
for (let s in l) {
  let t = l[s];
  t instanceof g && (t.name = s);
}
Q([
  { tag: l.link, class: "tok-link" },
  { tag: l.heading, class: "tok-heading" },
  { tag: l.emphasis, class: "tok-emphasis" },
  { tag: l.strong, class: "tok-strong" },
  { tag: l.keyword, class: "tok-keyword" },
  { tag: l.atom, class: "tok-atom" },
  { tag: l.bool, class: "tok-bool" },
  { tag: l.url, class: "tok-url" },
  { tag: l.labelName, class: "tok-labelName" },
  { tag: l.inserted, class: "tok-inserted" },
  { tag: l.deleted, class: "tok-deleted" },
  { tag: l.literal, class: "tok-literal" },
  { tag: l.string, class: "tok-string" },
  { tag: l.number, class: "tok-number" },
  { tag: [l.regexp, l.escape, l.special(l.string)], class: "tok-string2" },
  { tag: l.variableName, class: "tok-variableName" },
  { tag: l.local(l.variableName), class: "tok-variableName tok-local" },
  { tag: l.definition(l.variableName), class: "tok-variableName tok-definition" },
  { tag: l.special(l.variableName), class: "tok-variableName2" },
  { tag: l.definition(l.propertyName), class: "tok-propertyName tok-definition" },
  { tag: l.typeName, class: "tok-typeName" },
  { tag: l.namespace, class: "tok-namespace" },
  { tag: l.className, class: "tok-className" },
  { tag: l.macroName, class: "tok-macroName" },
  { tag: l.propertyName, class: "tok-propertyName" },
  { tag: l.operator, class: "tok-operator" },
  { tag: l.comment, class: "tok-comment" },
  { tag: l.meta, class: "tok-meta" },
  { tag: l.invalid, class: "tok-invalid" },
  { tag: l.punctuation, class: "tok-punctuation" }
]);
export {
  g as Tag,
  X as getStyleTags,
  _ as highlightTree,
  Z as styleTags,
  Q as tagHighlighter,
  l as tags
};
