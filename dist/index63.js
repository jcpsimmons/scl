import { parser as x } from "./index126.js";
import { LRLanguage as B, LanguageSupport as F, indentNodeProp as j, foldNodeProp as L, continuedIndent as b, delimitedIndent as N, flatIndent as O, foldInside as P, sublanguageProp as T, defineLanguageFacet as V, syntaxTree as C } from "./index70.js";
import { EditorSelection as M } from "./index62.js";
import { EditorView as _ } from "./index61.js";
import { snippetCompletion as r, ifNotIn as R, completeFromList as W } from "./index127.js";
import { NodeWeakMap as H, IterMode as K } from "./index128.js";
const J = [
  /* @__PURE__ */ r("function ${name}(${params}) {\n	${}\n}", {
    label: "function",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ r("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", {
    label: "for",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ r("for (let ${name} of ${collection}) {\n	${}\n}", {
    label: "for",
    detail: "of loop",
    type: "keyword"
  }),
  /* @__PURE__ */ r("do {\n	${}\n} while (${})", {
    label: "do",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ r("while (${}) {\n	${}\n}", {
    label: "while",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ r(`try {
	\${}
} catch (\${error}) {
	\${}
}`, {
    label: "try",
    detail: "/ catch block",
    type: "keyword"
  }),
  /* @__PURE__ */ r("if (${}) {\n	${}\n}", {
    label: "if",
    detail: "block",
    type: "keyword"
  }),
  /* @__PURE__ */ r(`if (\${}) {
	\${}
} else {
	\${}
}`, {
    label: "if",
    detail: "/ else block",
    type: "keyword"
  }),
  /* @__PURE__ */ r(`class \${name} {
	constructor(\${params}) {
		\${}
	}
}`, {
    label: "class",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ r('import {${names}} from "${module}"\n${}', {
    label: "import",
    detail: "named",
    type: "keyword"
  }),
  /* @__PURE__ */ r('import ${name} from "${module}"\n${}', {
    label: "import",
    detail: "default",
    type: "keyword"
  })
], q = /* @__PURE__ */ J.concat([
  /* @__PURE__ */ r("interface ${name} {\n	${}\n}", {
    label: "interface",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ r("type ${name} = ${type}", {
    label: "type",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ r("enum ${name} {\n	${}\n}", {
    label: "enum",
    detail: "definition",
    type: "keyword"
  })
]), h = /* @__PURE__ */ new H(), X = /* @__PURE__ */ new Set([
  "Script",
  "Block",
  "FunctionExpression",
  "FunctionDeclaration",
  "ArrowFunction",
  "MethodDeclaration",
  "ForStatement"
]);
function d(e) {
  return (t, o) => {
    let n = t.node.getChild("VariableDefinition");
    return n && o(n, e), !0;
  };
}
const z = ["FunctionDeclaration"], G = {
  FunctionDeclaration: /* @__PURE__ */ d("function"),
  ClassDeclaration: /* @__PURE__ */ d("class"),
  ClassExpression: () => !0,
  EnumDeclaration: /* @__PURE__ */ d("constant"),
  TypeAliasDeclaration: /* @__PURE__ */ d("type"),
  NamespaceDeclaration: /* @__PURE__ */ d("namespace"),
  VariableDefinition(e, t) {
    e.matchContext(z) || t(e, "variable");
  },
  TypeDefinition(e, t) {
    t(e, "type");
  },
  __proto__: null
};
function I(e, t) {
  let o = h.get(t);
  if (o)
    return o;
  let n = [], l = !0;
  function u(a, s) {
    let f = e.sliceString(a.from, a.to);
    n.push({ label: f, type: s });
  }
  return t.cursor(K.IncludeAnonymous).iterate((a) => {
    if (l)
      l = !1;
    else if (a.name) {
      let s = G[a.name];
      if (s && s(a, u) || X.has(a.name))
        return !1;
    } else if (a.to - a.from > 8192) {
      for (let s of I(e, a.node))
        n.push(s);
      return !1;
    }
  }), h.set(t, n), n;
}
const k = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/, D = [
  "TemplateString",
  "String",
  "RegExp",
  "LineComment",
  "BlockComment",
  "VariableDefinition",
  "TypeDefinition",
  "Label",
  "PropertyDefinition",
  "PropertyName",
  "PrivatePropertyDefinition",
  "PrivatePropertyName",
  "JSXText",
  "JSXAttributeValue",
  "JSXOpenTag",
  "JSXCloseTag",
  "JSXSelfClosingTag",
  ".",
  "?."
];
function Q(e) {
  let t = C(e.state).resolveInner(e.pos, -1);
  if (D.indexOf(t.name) > -1)
    return null;
  let o = t.name == "VariableName" || t.to - t.from < 20 && k.test(e.state.sliceDoc(t.from, t.to));
  if (!o && !e.explicit)
    return null;
  let n = [];
  for (let l = t; l; l = l.parent)
    X.has(l.name) && (n = n.concat(I(e.state.doc, l)));
  return {
    options: n,
    from: o ? t.from : e.pos,
    validFor: k
  };
}
const c = /* @__PURE__ */ B.define({
  name: "javascript",
  parser: /* @__PURE__ */ x.configure({
    props: [
      /* @__PURE__ */ j.add({
        IfStatement: /* @__PURE__ */ b({ except: /^\s*({|else\b)/ }),
        TryStatement: /* @__PURE__ */ b({ except: /^\s*({|catch\b|finally\b)/ }),
        LabeledStatement: O,
        SwitchBody: (e) => {
          let t = e.textAfter, o = /^\s*\}/.test(t), n = /^\s*(case|default)\b/.test(t);
          return e.baseIndent + (o ? 0 : n ? 1 : 2) * e.unit;
        },
        Block: /* @__PURE__ */ N({ closing: "}" }),
        ArrowFunction: (e) => e.baseIndent + e.unit,
        "TemplateString BlockComment": () => null,
        "Statement Property": /* @__PURE__ */ b({ except: /^\s*{/ }),
        JSXElement(e) {
          let t = /^\s*<\//.test(e.textAfter);
          return e.lineIndent(e.node.from) + (t ? 0 : e.unit);
        },
        JSXEscape(e) {
          let t = /\s*\}/.test(e.textAfter);
          return e.lineIndent(e.node.from) + (t ? 0 : e.unit);
        },
        "JSXOpenTag JSXSelfClosingTag"(e) {
          return e.column(e.node.from) + e.unit;
        }
      }),
      /* @__PURE__ */ L.add({
        "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType": P,
        BlockComment(e) {
          return { from: e.from + 2, to: e.to - 2 };
        }
      })
    ]
  }),
  languageData: {
    closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] },
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
    wordChars: "$"
  }
}), v = {
  test: (e) => /^JSX/.test(e.name),
  facet: /* @__PURE__ */ V({ commentTokens: { block: { open: "{/*", close: "*/}" } } })
}, U = /* @__PURE__ */ c.configure({ dialect: "ts" }, "typescript"), Y = /* @__PURE__ */ c.configure({
  dialect: "jsx",
  props: [/* @__PURE__ */ T.add((e) => e.isTop ? [v] : void 0)]
}), Z = /* @__PURE__ */ c.configure({
  dialect: "jsx ts",
  props: [/* @__PURE__ */ T.add((e) => e.isTop ? [v] : void 0)]
}, "typescript");
let A = (e) => ({ label: e, type: "keyword" });
const E = /* @__PURE__ */ "break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map(A), ee = /* @__PURE__ */ E.concat(/* @__PURE__ */ ["declare", "implements", "private", "protected", "public"].map(A));
function ce(e = {}) {
  let t = e.jsx ? e.typescript ? Z : Y : e.typescript ? U : c, o = e.typescript ? q.concat(ee) : J.concat(E);
  return new F(t, [
    c.data.of({
      autocomplete: R(D, W(o))
    }),
    c.data.of({
      autocomplete: Q
    }),
    e.jsx ? ae : []
  ]);
}
function te(e) {
  for (; ; ) {
    if (e.name == "JSXOpenTag" || e.name == "JSXSelfClosingTag" || e.name == "JSXFragmentTag")
      return e;
    if (e.name == "JSXEscape" || !e.parent)
      return null;
    e = e.parent;
  }
}
function w(e, t, o = e.length) {
  for (let n = t == null ? void 0 : t.firstChild; n; n = n.nextSibling)
    if (n.name == "JSXIdentifier" || n.name == "JSXBuiltin" || n.name == "JSXNamespacedName" || n.name == "JSXMemberExpression")
      return e.sliceString(n.from, Math.min(n.to, o));
  return "";
}
const ne = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent), ae = /* @__PURE__ */ _.inputHandler.of((e, t, o, n, l) => {
  if ((ne ? e.composing : e.compositionStarted) || e.state.readOnly || t != o || n != ">" && n != "/" || !c.isActiveAt(e.state, t, -1))
    return !1;
  let u = l(), { state: a } = u, s = a.changeByRange((f) => {
    var g;
    let { head: i } = f, p = C(a).resolveInner(i - 1, -1), y;
    if (p.name == "JSXStartTag" && (p = p.parent), !(a.doc.sliceString(i - 1, i) != n || p.name == "JSXAttributeValue" && p.to > i)) {
      if (n == ">" && p.name == "JSXFragmentTag")
        return { range: f, changes: { from: i, insert: "</>" } };
      if (n == "/" && p.name == "JSXStartCloseTag") {
        let m = p.parent, S = m.parent;
        if (S && m.from == i - 2 && ((y = w(a.doc, S.firstChild, i)) || ((g = S.firstChild) === null || g === void 0 ? void 0 : g.name) == "JSXFragmentTag")) {
          let $ = `${y}>`;
          return { range: M.cursor(i + $.length, -1), changes: { from: i, insert: $ } };
        }
      } else if (n == ">") {
        let m = te(p);
        if (m && m.name == "JSXOpenTag" && !/^\/?>|^<\//.test(a.doc.sliceString(i, i + 2)) && (y = w(a.doc, m, i)))
          return { range: f, changes: { from: i, insert: `</${y}>` } };
      }
    }
    return { range: f };
  });
  return s.changes.empty ? !1 : (e.dispatch([
    u,
    a.update(s, { userEvent: "input.complete", scrollIntoView: !0 })
  ]), !0);
});
export {
  ae as autoCloseTags,
  ce as javascript,
  c as javascriptLanguage,
  Y as jsxLanguage,
  Q as localCompletionSource,
  J as snippets,
  Z as tsxLanguage,
  U as typescriptLanguage,
  q as typescriptSnippets
};
