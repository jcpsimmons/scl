import * as r from "react";
import s from "react-dom";
import { Primitive as c } from "./index93.js";
import { useLayoutEffect as u } from "./index89.js";
import { jsx as l } from "react/jsx-runtime";
var p = "Portal", d = r.forwardRef((e, a) => {
  var o;
  const { container: f, ...i } = e, [m, n] = r.useState(!1);
  u(() => n(!0), []);
  const t = f || m && ((o = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : o.body);
  return t ? s.createPortal(/* @__PURE__ */ l(c.div, { ...i, ref: a }), t) : null;
});
d.displayName = p;
export {
  d as Portal
};
