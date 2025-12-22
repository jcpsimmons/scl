import { NodeProp as q } from "./index120.js";
let A = 0;
class l {
  /**
  @internal
  */
  constructor(t, a, i, n) {
    this.name = t, this.set = a, this.base = i, this.modified = n, this.id = A++;
  }
  toString() {
    let { name: t } = this;
    for (let a of this.modified)
      a.name && (t = `${a.name}(${t})`);
    return t;
  }
  static define(t, a) {
    let i = typeof t == "string" ? t : "?";
    if (t instanceof l && (a = t), a != null && a.base)
      throw new Error("Can not derive from a modified tag");
    let n = new l(i, [], null, []);
    if (n.set.push(n), a)
      for (let r of a.set)
        n.set.push(r);
    return n;
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
    let a = new x(t);
    return (i) => i.modified.indexOf(a) > -1 ? i : x.get(i.base || i, i.modified.concat(a).sort((n, r) => n.id - r.id));
  }
}
let I = 0;
class x {
  constructor(t) {
    this.name = t, this.instances = [], this.id = I++;
  }
  static get(t, a) {
    if (!a.length)
      return t;
    let i = a[0].instances.find((g) => g.base == t && j(a, g.modified));
    if (i)
      return i;
    let n = [], r = new l(t.name, n, t, a);
    for (let g of a)
      g.instances.push(r);
    let f = B(a);
    for (let g of t.set)
      if (!g.modified.length)
        for (let w of f)
          n.push(x.get(g, w));
    return r;
  }
}
function j(s, t) {
  return s.length == t.length && s.every((a, i) => a == t[i]);
}
function B(s) {
  let t = [[]];
  for (let a = 0; a < s.length; a++)
    for (let i = 0, n = t.length; i < n; i++)
      t.push(t[i].concat(s[a]));
  return t.sort((a, i) => i.length - a.length);
}
new q({
  combine(s, t) {
    let a, i, n;
    for (; s || t; ) {
      if (!s || t && s.depth >= t.depth ? (n = t, t = t.next) : (n = s, s = s.next), a && a.mode == n.mode && !n.context && !a.context)
        continue;
      let r = new O(n.tags, n.mode, n.context);
      a ? a.next = r : i = r, a = r;
    }
    return i;
  }
});
class O {
  constructor(t, a, i, n) {
    this.tags = t, this.mode = a, this.context = i, this.next = n;
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
O.empty = new O([], 2, null);
function D(s, t) {
  let a = /* @__PURE__ */ Object.create(null);
  for (let r of s)
    if (!Array.isArray(r.tag))
      a[r.tag.id] = r.class;
    else
      for (let f of r.tag)
        a[f.id] = r.class;
  let { scope: i, all: n = null } = {};
  return {
    style: (r) => {
      let f = n;
      for (let g of r)
        for (let w of g.set) {
          let v = a[w.id];
          if (v) {
            f = f ? f + " " + v : v;
            break;
          }
        }
      return f;
    },
    scope: i
  };
}
const e = l.define, N = e(), p = e(), K = e(p), S = e(p), u = e(), y = e(u), M = e(u), m = e(), h = e(m), c = e(), d = e(), C = e(), k = e(C), b = e(), o = {
  /**
  A comment.
  */
  comment: N,
  /**
  A line [comment](#highlight.tags.comment).
  */
  lineComment: e(N),
  /**
  A block [comment](#highlight.tags.comment).
  */
  blockComment: e(N),
  /**
  A documentation [comment](#highlight.tags.comment).
  */
  docComment: e(N),
  /**
  Any kind of identifier.
  */
  name: p,
  /**
  The [name](#highlight.tags.name) of a variable.
  */
  variableName: e(p),
  /**
  A type [name](#highlight.tags.name).
  */
  typeName: K,
  /**
  A tag name (subtag of [`typeName`](#highlight.tags.typeName)).
  */
  tagName: e(K),
  /**
  A property or field [name](#highlight.tags.name).
  */
  propertyName: S,
  /**
  An attribute name (subtag of [`propertyName`](#highlight.tags.propertyName)).
  */
  attributeName: e(S),
  /**
  The [name](#highlight.tags.name) of a class.
  */
  className: e(p),
  /**
  A label [name](#highlight.tags.name).
  */
  labelName: e(p),
  /**
  A namespace [name](#highlight.tags.name).
  */
  namespace: e(p),
  /**
  The [name](#highlight.tags.name) of a macro.
  */
  macroName: e(p),
  /**
  A literal value.
  */
  literal: u,
  /**
  A string [literal](#highlight.tags.literal).
  */
  string: y,
  /**
  A documentation [string](#highlight.tags.string).
  */
  docString: e(y),
  /**
  A character literal (subtag of [string](#highlight.tags.string)).
  */
  character: e(y),
  /**
  An attribute value (subtag of [string](#highlight.tags.string)).
  */
  attributeValue: e(y),
  /**
  A number [literal](#highlight.tags.literal).
  */
  number: M,
  /**
  An integer [number](#highlight.tags.number) literal.
  */
  integer: e(M),
  /**
  A floating-point [number](#highlight.tags.number) literal.
  */
  float: e(M),
  /**
  A boolean [literal](#highlight.tags.literal).
  */
  bool: e(u),
  /**
  Regular expression [literal](#highlight.tags.literal).
  */
  regexp: e(u),
  /**
  An escape [literal](#highlight.tags.literal), for example a
  backslash escape in a string.
  */
  escape: e(u),
  /**
  A color [literal](#highlight.tags.literal).
  */
  color: e(u),
  /**
  A URL [literal](#highlight.tags.literal).
  */
  url: e(u),
  /**
  A language keyword.
  */
  keyword: c,
  /**
  The [keyword](#highlight.tags.keyword) for the self or this
  object.
  */
  self: e(c),
  /**
  The [keyword](#highlight.tags.keyword) for null.
  */
  null: e(c),
  /**
  A [keyword](#highlight.tags.keyword) denoting some atomic value.
  */
  atom: e(c),
  /**
  A [keyword](#highlight.tags.keyword) that represents a unit.
  */
  unit: e(c),
  /**
  A modifier [keyword](#highlight.tags.keyword).
  */
  modifier: e(c),
  /**
  A [keyword](#highlight.tags.keyword) that acts as an operator.
  */
  operatorKeyword: e(c),
  /**
  A control-flow related [keyword](#highlight.tags.keyword).
  */
  controlKeyword: e(c),
  /**
  A [keyword](#highlight.tags.keyword) that defines something.
  */
  definitionKeyword: e(c),
  /**
  A [keyword](#highlight.tags.keyword) related to defining or
  interfacing with modules.
  */
  moduleKeyword: e(c),
  /**
  An operator.
  */
  operator: d,
  /**
  An [operator](#highlight.tags.operator) that dereferences something.
  */
  derefOperator: e(d),
  /**
  Arithmetic-related [operator](#highlight.tags.operator).
  */
  arithmeticOperator: e(d),
  /**
  Logical [operator](#highlight.tags.operator).
  */
  logicOperator: e(d),
  /**
  Bit [operator](#highlight.tags.operator).
  */
  bitwiseOperator: e(d),
  /**
  Comparison [operator](#highlight.tags.operator).
  */
  compareOperator: e(d),
  /**
  [Operator](#highlight.tags.operator) that updates its operand.
  */
  updateOperator: e(d),
  /**
  [Operator](#highlight.tags.operator) that defines something.
  */
  definitionOperator: e(d),
  /**
  Type-related [operator](#highlight.tags.operator).
  */
  typeOperator: e(d),
  /**
  Control-flow [operator](#highlight.tags.operator).
  */
  controlOperator: e(d),
  /**
  Program or markup punctuation.
  */
  punctuation: C,
  /**
  [Punctuation](#highlight.tags.punctuation) that separates
  things.
  */
  separator: e(C),
  /**
  Bracket-style [punctuation](#highlight.tags.punctuation).
  */
  bracket: k,
  /**
  Angle [brackets](#highlight.tags.bracket) (usually `<` and `>`
  tokens).
  */
  angleBracket: e(k),
  /**
  Square [brackets](#highlight.tags.bracket) (usually `[` and `]`
  tokens).
  */
  squareBracket: e(k),
  /**
  Parentheses (usually `(` and `)` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  paren: e(k),
  /**
  Braces (usually `{` and `}` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  brace: e(k),
  /**
  Content, for example plain text in XML or markup documents.
  */
  content: m,
  /**
  [Content](#highlight.tags.content) that represents a heading.
  */
  heading: h,
  /**
  A level 1 [heading](#highlight.tags.heading).
  */
  heading1: e(h),
  /**
  A level 2 [heading](#highlight.tags.heading).
  */
  heading2: e(h),
  /**
  A level 3 [heading](#highlight.tags.heading).
  */
  heading3: e(h),
  /**
  A level 4 [heading](#highlight.tags.heading).
  */
  heading4: e(h),
  /**
  A level 5 [heading](#highlight.tags.heading).
  */
  heading5: e(h),
  /**
  A level 6 [heading](#highlight.tags.heading).
  */
  heading6: e(h),
  /**
  A prose [content](#highlight.tags.content) separator (such as a horizontal rule).
  */
  contentSeparator: e(m),
  /**
  [Content](#highlight.tags.content) that represents a list.
  */
  list: e(m),
  /**
  [Content](#highlight.tags.content) that represents a quote.
  */
  quote: e(m),
  /**
  [Content](#highlight.tags.content) that is emphasized.
  */
  emphasis: e(m),
  /**
  [Content](#highlight.tags.content) that is styled strong.
  */
  strong: e(m),
  /**
  [Content](#highlight.tags.content) that is part of a link.
  */
  link: e(m),
  /**
  [Content](#highlight.tags.content) that is styled as code or
  monospace.
  */
  monospace: e(m),
  /**
  [Content](#highlight.tags.content) that has a strike-through
  style.
  */
  strikethrough: e(m),
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
  meta: b,
  /**
  [Metadata](#highlight.tags.meta) that applies to the entire
  document.
  */
  documentMeta: e(b),
  /**
  [Metadata](#highlight.tags.meta) that annotates or adds
  attributes to a given syntactic element.
  */
  annotation: e(b),
  /**
  Processing instruction or preprocessor directive. Subtag of
  [meta](#highlight.tags.meta).
  */
  processingInstruction: e(b),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that a
  given element is being defined. Expected to be used with the
  various [name](#highlight.tags.name) tags.
  */
  definition: l.defineModifier("definition"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that
  something is constant. Mostly expected to be used with
  [variable names](#highlight.tags.variableName).
  */
  constant: l.defineModifier("constant"),
  /**
  [Modifier](#highlight.Tag^defineModifier) used to indicate that
  a [variable](#highlight.tags.variableName) or [property
  name](#highlight.tags.propertyName) is being called or defined
  as a function.
  */
  function: l.defineModifier("function"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that can be applied to
  [names](#highlight.tags.name) to indicate that they belong to
  the language's standard environment.
  */
  standard: l.defineModifier("standard"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates a given
  [names](#highlight.tags.name) is local to some scope.
  */
  local: l.defineModifier("local"),
  /**
  A generic variant [modifier](#highlight.Tag^defineModifier) that
  can be used to tag language-specific alternative variants of
  some common tag. It is recommended for themes to define special
  forms of at least the [string](#highlight.tags.string) and
  [variable name](#highlight.tags.variableName) tags, since those
  come up a lot.
  */
  special: l.defineModifier("special")
};
for (let s in o) {
  let t = o[s];
  t instanceof l && (t.name = s);
}
D([
  { tag: o.link, class: "tok-link" },
  { tag: o.heading, class: "tok-heading" },
  { tag: o.emphasis, class: "tok-emphasis" },
  { tag: o.strong, class: "tok-strong" },
  { tag: o.keyword, class: "tok-keyword" },
  { tag: o.atom, class: "tok-atom" },
  { tag: o.bool, class: "tok-bool" },
  { tag: o.url, class: "tok-url" },
  { tag: o.labelName, class: "tok-labelName" },
  { tag: o.inserted, class: "tok-inserted" },
  { tag: o.deleted, class: "tok-deleted" },
  { tag: o.literal, class: "tok-literal" },
  { tag: o.string, class: "tok-string" },
  { tag: o.number, class: "tok-number" },
  { tag: [o.regexp, o.escape, o.special(o.string)], class: "tok-string2" },
  { tag: o.variableName, class: "tok-variableName" },
  { tag: o.local(o.variableName), class: "tok-variableName tok-local" },
  { tag: o.definition(o.variableName), class: "tok-variableName tok-definition" },
  { tag: o.special(o.variableName), class: "tok-variableName2" },
  { tag: o.definition(o.propertyName), class: "tok-propertyName tok-definition" },
  { tag: o.typeName, class: "tok-typeName" },
  { tag: o.namespace, class: "tok-namespace" },
  { tag: o.className, class: "tok-className" },
  { tag: o.macroName, class: "tok-macroName" },
  { tag: o.propertyName, class: "tok-propertyName" },
  { tag: o.operator, class: "tok-operator" },
  { tag: o.comment, class: "tok-comment" },
  { tag: o.meta, class: "tok-meta" },
  { tag: o.invalid, class: "tok-invalid" },
  { tag: o.punctuation, class: "tok-punctuation" }
]);
export {
  l as Tag,
  D as tagHighlighter,
  o as tags
};
