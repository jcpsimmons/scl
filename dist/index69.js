import { Prec as z, EditorSelection as x, countColumn as w, EditorState as K } from "./index64.js";
import { keymap as _, EditorView as j } from "./index63.js";
import { foldService as G, LanguageSupport as N, Language as Q, defineLanguageFacet as J, syntaxTree as A, indentUnit as Y, foldNodeProp as R, indentNodeProp as Z, languageDataProp as W, LanguageDescription as D, ParseContext as ee } from "./index72.js";
import { CompletionContext as te } from "./index112.js";
import { MarkdownParser as re, parseCode as ne, parser as oe, GFM as ie, Subscript as le, Superscript as se, Emoji as fe } from "./index117.js";
import { html as ae, htmlCompletionSource as me } from "./index66.js";
import { NodeProp as ue } from "./index113.js";
const $ = /* @__PURE__ */ J({ commentTokens: { block: { open: "<!--", close: "-->" } } }), q = /* @__PURE__ */ new ue(), H = /* @__PURE__ */ oe.configure({
  props: [
    /* @__PURE__ */ R.add((r) => !r.is("Block") || r.is("Document") || P(r) != null || ce(r) ? void 0 : (n, o) => ({ from: o.doc.lineAt(n.from).to, to: n.to })),
    /* @__PURE__ */ q.add(P),
    /* @__PURE__ */ Z.add({
      Document: () => null
    }),
    /* @__PURE__ */ W.add({
      Document: $
    })
  ]
});
function P(r) {
  let n = /^(?:ATX|Setext)Heading(\d)$/.exec(r.name);
  return n ? +n[1] : void 0;
}
function ce(r) {
  return r.name == "OrderedList" || r.name == "BulletList";
}
function pe(r, n) {
  let o = r;
  for (; ; ) {
    let t = o.nextSibling, e;
    if (!t || (e = P(t.type)) != null && e <= n)
      break;
    o = t;
  }
  return o.to;
}
const de = /* @__PURE__ */ G.of((r, n, o) => {
  for (let t = A(r).resolveInner(o, -1); t && !(t.from < n); t = t.parent) {
    let e = t.type.prop(q);
    if (e == null)
      continue;
    let i = pe(t, e);
    if (i > o)
      return { from: o, to: i };
  }
  return null;
});
function T(r) {
  return new Q($, r, [], "markdown");
}
const he = /* @__PURE__ */ T(H), ge = /* @__PURE__ */ H.configure([ie, le, se, fe, {
  props: [
    /* @__PURE__ */ R.add({
      Table: (r, n) => ({ from: n.doc.lineAt(r.from).to, to: r.to })
    })
  ]
}]), b = /* @__PURE__ */ T(ge);
function ke(r, n) {
  return (o) => {
    if (o && r) {
      let t = null;
      if (o = /\S*/.exec(o)[0], typeof r == "function" ? t = r(o) : t = D.matchLanguageName(r, o, !0), t instanceof D)
        return t.support ? t.support.language.parser : ee.getSkippingParser(t.load());
      if (t)
        return t.parser;
    }
    return n ? n.parser : null;
  };
}
class v {
  constructor(n, o, t, e, i, a, m) {
    this.node = n, this.from = o, this.to = t, this.spaceBefore = e, this.spaceAfter = i, this.type = a, this.item = m;
  }
  blank(n, o = !0) {
    let t = this.spaceBefore + (this.node.name == "Blockquote" ? ">" : "");
    if (n != null) {
      for (; t.length < n; )
        t += " ";
      return t;
    } else {
      for (let e = this.to - this.from - t.length - this.spaceAfter.length; e > 0; e--)
        t += " ";
      return t + (o ? this.spaceAfter : "");
    }
  }
  marker(n, o) {
    let t = this.node.name == "OrderedList" ? String(+V(this.item, n)[2] + o) : "";
    return this.spaceBefore + t + this.type + this.spaceAfter;
  }
}
function U(r, n) {
  let o = [], t = [];
  for (let e = r; e; e = e.parent) {
    if (e.name == "FencedCode")
      return t;
    (e.name == "ListItem" || e.name == "Blockquote") && o.push(e);
  }
  for (let e = o.length - 1; e >= 0; e--) {
    let i = o[e], a, m = n.lineAt(i.from), s = i.from - m.from;
    if (i.name == "Blockquote" && (a = /^ *>( ?)/.exec(m.text.slice(s))))
      t.push(new v(i, s, s + a[0].length, "", a[1], ">", null));
    else if (i.name == "ListItem" && i.parent.name == "OrderedList" && (a = /^( *)\d+([.)])( *)/.exec(m.text.slice(s)))) {
      let f = a[3], l = a[0].length;
      f.length >= 4 && (f = f.slice(0, f.length - 4), l -= 4), t.push(new v(i.parent, s, s + l, a[1], f, a[2], i));
    } else if (i.name == "ListItem" && i.parent.name == "BulletList" && (a = /^( *)([-+*])( {1,4}\[[ xX]\])?( +)/.exec(m.text.slice(s)))) {
      let f = a[4], l = a[0].length;
      f.length > 4 && (f = f.slice(0, f.length - 4), l -= 4);
      let u = a[2];
      a[3] && (u += a[3].replace(/[xX]/, " ")), t.push(new v(i.parent, s, s + l, a[1], f, u, i));
    }
  }
  return t;
}
function V(r, n) {
  return /^(\s*)(\d+)(?=[.)])/.exec(n.sliceString(r.from, r.from + 10));
}
function I(r, n, o, t = 0) {
  for (let e = -1, i = r; ; ) {
    if (i.name == "ListItem") {
      let m = V(i, n), s = +m[2];
      if (e >= 0) {
        if (s != e + 1)
          return;
        o.push({ from: i.from + m[1].length, to: i.from + m[0].length, insert: String(e + 2 + t) });
      }
      e = s;
    }
    let a = i.nextSibling;
    if (!a)
      break;
    i = a;
  }
}
function E(r, n) {
  let o = /^[ \t]*/.exec(r)[0].length;
  if (!o || n.facet(Y) != "	")
    return r;
  let t = w(r, 4, o), e = "";
  for (let i = t; i > 0; )
    i >= 4 ? (e += "	", i -= 4) : (e += " ", i--);
  return e + r.slice(o);
}
const xe = (r = {}) => ({ state: n, dispatch: o }) => {
  let t = A(n), { doc: e } = n, i = null, a = n.changeByRange((m) => {
    if (!m.empty || !b.isActiveAt(n, m.from, -1) && !b.isActiveAt(n, m.from, 1))
      return i = { range: m };
    let s = m.from, f = e.lineAt(s), l = U(t.resolveInner(s, -1), e);
    for (; l.length && l[l.length - 1].from > s - f.from; )
      l.pop();
    if (!l.length)
      return i = { range: m };
    let u = l[l.length - 1];
    if (u.to - u.spaceAfter.length > s - f.from)
      return i = { range: m };
    let d = s >= u.to - u.spaceAfter.length && !/\S/.test(f.text.slice(u.to));
    if (u.item && d) {
      let p = u.node.firstChild, h = u.node.getChild("ListItem", "ListItem");
      if (p.to >= s || h && h.to < s || f.from > 0 && !/[^\s>]/.test(e.lineAt(f.from - 1).text) || r.nonTightLists === !1) {
        let c = l.length > 1 ? l[l.length - 2] : null, C, B = "";
        c && c.item ? (C = f.from + c.from, B = c.marker(e, 1)) : C = f.from + (c ? c.to : 0);
        let S = [{ from: C, to: s, insert: B }];
        return u.node.name == "OrderedList" && I(u.item, e, S, -2), c && c.node.name == "OrderedList" && I(c.item, e, S), { range: x.cursor(C + B.length), changes: S };
      } else {
        let c = F(l, n, f);
        return {
          range: x.cursor(s + c.length + 1),
          changes: { from: f.from, insert: c + n.lineBreak }
        };
      }
    }
    if (u.node.name == "Blockquote" && d && f.from) {
      let p = e.lineAt(f.from - 1), h = />\s*$/.exec(p.text);
      if (h && h.index == u.from) {
        let c = n.changes([
          { from: p.from + h.index, to: p.to },
          { from: f.from + u.from, to: f.to }
        ]);
        return { range: m.map(c), changes: c };
      }
    }
    let g = [];
    u.node.name == "OrderedList" && I(u.item, e, g);
    let M = u.item && u.item.from < f.from, k = "";
    if (!M || /^[\s\d.)\-+*>]*/.exec(f.text)[0].length >= u.to)
      for (let p = 0, h = l.length - 1; p <= h; p++)
        k += p == h && !M ? l[p].marker(e, 1) : l[p].blank(p < h ? w(f.text, 4, l[p + 1].from) - k.length : null);
    let L = s;
    for (; L > f.from && /\s/.test(f.text.charAt(L - f.from - 1)); )
      L--;
    return k = E(k, n), we(u.node, n.doc) && (k = F(l, n, f) + n.lineBreak + k), g.push({ from: L, to: s, insert: n.lineBreak + k }), { range: x.cursor(L + k.length + 1), changes: g };
  });
  return i ? !1 : (o(n.update(a, { scrollIntoView: !0, userEvent: "input" })), !0);
}, Le = /* @__PURE__ */ xe();
function O(r) {
  return r.name == "QuoteMark" || r.name == "ListMark";
}
function we(r, n) {
  if (r.name != "OrderedList" && r.name != "BulletList")
    return !1;
  let o = r.firstChild, t = r.getChild("ListItem", "ListItem");
  if (!t)
    return !1;
  let e = n.lineAt(o.to), i = n.lineAt(t.from), a = /^[\s>]*$/.test(e.text);
  return e.number + (a ? 0 : 1) < i.number;
}
function F(r, n, o) {
  let t = "";
  for (let e = 0, i = r.length - 2; e <= i; e++)
    t += r[e].blank(e < i ? w(o.text, 4, r[e + 1].from) - t.length : null, e < i);
  return E(t, n);
}
function Ae(r, n) {
  let o = r.resolveInner(n, -1), t = n;
  O(o) && (t = o.from, o = o.parent);
  for (let e; e = o.childBefore(t); )
    if (O(e))
      t = e.from;
    else if (e.name == "OrderedList" || e.name == "BulletList")
      o = e.lastChild, t = o.to;
    else
      break;
  return o;
}
const Ce = ({ state: r, dispatch: n }) => {
  let o = A(r), t = null, e = r.changeByRange((i) => {
    let a = i.from, { doc: m } = r;
    if (i.empty && b.isActiveAt(r, i.from)) {
      let s = m.lineAt(a), f = U(Ae(o, a), m);
      if (f.length) {
        let l = f[f.length - 1], u = l.to - l.spaceAfter.length + (l.spaceAfter ? 1 : 0);
        if (a - s.from > u && !/\S/.test(s.text.slice(u, a - s.from)))
          return {
            range: x.cursor(s.from + u),
            changes: { from: s.from + u, to: a }
          };
        if (a - s.from == u && // Only apply this if we're on the line that has the
        // construct's syntax, or there's only indentation in the
        // target range
        (!l.item || s.from <= l.item.from || !/\S/.test(s.text.slice(0, l.to)))) {
          let d = s.from + l.from;
          if (l.item && l.node.from < l.item.from && /\S/.test(s.text.slice(l.from, l.to))) {
            let g = l.blank(w(s.text, 4, l.to) - w(s.text, 4, l.from));
            return d == s.from && (g = E(g, r)), {
              range: x.cursor(d + g.length),
              changes: { from: d, to: s.from + l.to, insert: g }
            };
          }
          if (d < a)
            return { range: x.cursor(d), changes: { from: d, to: a } };
        }
      }
    }
    return t = { range: i };
  });
  return t ? !1 : (n(r.update(e, { scrollIntoView: !0, userEvent: "delete" })), !0);
}, be = [
  { key: "Enter", run: Le },
  { key: "Backspace", run: Ce }
], X = /* @__PURE__ */ ae({ matchClosingTags: !1 });
function Oe(r = {}) {
  let { codeLanguages: n, defaultCodeLanguage: o, addKeymap: t = !0, base: { parser: e } = he, completeHTMLTags: i = !0, pasteURLAsLink: a = !0, htmlTagLanguage: m = X } = r;
  if (!(e instanceof re))
    throw new RangeError("Base parser provided to `markdown` should be a Markdown parser");
  let s = r.extensions ? [r.extensions] : [], f = [m.support, de], l;
  a && f.push(Ie), o instanceof N ? (f.push(o.support), l = o.language) : o && (l = o);
  let u = n || l ? ke(n, l) : void 0;
  s.push(ne({ codeParser: u, htmlParser: m.language.parser })), t && f.push(z.high(_.of(be)));
  let d = T(e.configure(s));
  return i && f.push(d.data.of({ autocomplete: Be })), new N(d, f);
}
function Be(r) {
  let { state: n, pos: o } = r, t = /<[:\-\.\w\u00b7-\uffff]*$/.exec(n.sliceDoc(o - 25, o));
  if (!t)
    return null;
  let e = A(n).resolveInner(o, -1);
  for (; e && !e.type.isTop; ) {
    if (e.name == "CodeBlock" || e.name == "FencedCode" || e.name == "ProcessingInstructionBlock" || e.name == "CommentBlock" || e.name == "Link" || e.name == "Image")
      return null;
    e = e.parent;
  }
  return {
    from: o - t[0].length,
    to: o,
    options: Se(),
    validFor: /^<[:\-\.\w\u00b7-\uffff]*$/
  };
}
let y = null;
function Se() {
  if (y)
    return y;
  let r = me(new te(K.create({ extensions: X }), 0, !0));
  return y = r ? r.options : [];
}
const ve = /code|horizontalrule|html|link|comment|processing|escape|entity|image|mark|url/i, Ie = /* @__PURE__ */ j.domEventHandlers({
  paste: (r, n) => {
    var o;
    let { main: t } = n.state.selection;
    if (t.empty)
      return !1;
    let e = (o = r.clipboardData) === null || o === void 0 ? void 0 : o.getData("text/plain");
    if (!e || !/^(https?:\/\/|mailto:|xmpp:|www\.)/.test(e) || (/^www\./.test(e) && (e = "https://" + e), !b.isActiveAt(n.state, t.from, 1)))
      return !1;
    let i = A(n.state), a = !1;
    return i.iterate({
      from: t.from,
      to: t.to,
      enter: (m) => {
        (m.from > t.from || ve.test(m.name)) && (a = !0);
      },
      leave: (m) => {
        m.to < t.to && (a = !0);
      }
    }), a ? !1 : (n.dispatch({
      changes: [{ from: t.from, insert: "[" }, { from: t.to, insert: `](${e})` }],
      userEvent: "input.paste",
      scrollIntoView: !0
    }), !0);
  }
});
export {
  he as commonmarkLanguage,
  Ce as deleteMarkupBackward,
  Le as insertNewlineContinueMarkup,
  xe as insertNewlineContinueMarkupCommand,
  Oe as markdown,
  be as markdownKeymap,
  b as markdownLanguage,
  Ie as pasteURLAsLink
};
