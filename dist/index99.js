import * as l from "react";
import { composeRefs as y } from "./index82.js";
import { jsx as p, Fragment as S } from "react/jsx-runtime";
// @__NO_SIDE_EFFECTS__
function _(e) {
  const r = /* @__PURE__ */ g(e), o = l.forwardRef((n, t) => {
    const { children: i, ...a } = n, s = l.Children.toArray(i), c = s.find(E);
    if (c) {
      const f = c.props.children, m = s.map((u) => u === c ? l.Children.count(f) > 1 ? l.Children.only(null) : l.isValidElement(f) ? f.props.children : null : u);
      return /* @__PURE__ */ p(r, { ...a, ref: t, children: l.isValidElement(f) ? l.cloneElement(f, void 0, m) : null });
    }
    return /* @__PURE__ */ p(r, { ...a, ref: t, children: i });
  });
  return o.displayName = `${e}.Slot`, o;
}
// @__NO_SIDE_EFFECTS__
function g(e) {
  const r = l.forwardRef((o, n) => {
    const { children: t, ...i } = o;
    if (l.isValidElement(t)) {
      const a = b(t), s = C(i, t.props);
      return t.type !== l.Fragment && (s.ref = n ? y(n, a) : a), l.cloneElement(t, s);
    }
    return l.Children.count(t) > 1 ? l.Children.only(null) : null;
  });
  return r.displayName = `${e}.SlotClone`, r;
}
var d = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function x(e) {
  const r = ({ children: o }) => /* @__PURE__ */ p(S, { children: o });
  return r.displayName = `${e}.Slottable`, r.__radixId = d, r;
}
function E(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === d;
}
function C(e, r) {
  const o = { ...r };
  for (const n in r) {
    const t = e[n], i = r[n];
    /^on[A-Z]/.test(n) ? t && i ? o[n] = (...s) => {
      const c = i(...s);
      return t(...s), c;
    } : t && (o[n] = t) : n === "style" ? o[n] = { ...t, ...i } : n === "className" && (o[n] = [t, i].filter(Boolean).join(" "));
  }
  return { ...e, ...o };
}
function b(e) {
  var n, t;
  let r = (n = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : n.get, o = r && "isReactWarning" in r && r.isReactWarning;
  return o ? e.ref : (r = (t = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : t.get, o = r && "isReactWarning" in r && r.isReactWarning, o ? e.props.ref : e.props.ref || e.ref);
}
export {
  _ as createSlot,
  x as createSlottable
};
