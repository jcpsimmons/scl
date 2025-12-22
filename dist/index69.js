import { parser as n } from "./index137.js";
import { LanguageSupport as r, LRLanguage as o, indentNodeProp as a, foldNodeProp as t, continuedIndent as e, foldInside as d } from "./index73.js";
const p = /* @__PURE__ */ o.define({
  name: "json",
  parser: /* @__PURE__ */ n.configure({
    props: [
      /* @__PURE__ */ a.add({
        Object: /* @__PURE__ */ e({ except: /^\s*\}/ }),
        Array: /* @__PURE__ */ e({ except: /^\s*\]/ })
      }),
      /* @__PURE__ */ t.add({
        "Object Array": d
      })
    ]
  }),
  languageData: {
    closeBrackets: { brackets: ["[", "{", '"'] },
    indentOnInput: /^\s*[\}\]]$/
  }
});
function u() {
  return new r(p);
}
export {
  u as json,
  p as jsonLanguage
};
