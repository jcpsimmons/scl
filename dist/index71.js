import * as m from "react";
import { createContextScope as $ } from "./index130.js";
import { Primitive as c } from "./index131.js";
import { jsx as l } from "react/jsx-runtime";
var u = "Progress", d = 100, [I] = $(u), [h, R] = I(u), f = m.forwardRef(
  (r, e) => {
    const {
      __scopeProgress: i,
      value: o = null,
      max: a,
      getValueLabel: P = E,
      ...N
    } = r;
    (a || a === 0) && !v(a) && console.error(M(`${a}`, "Progress"));
    const t = v(a) ? a : d;
    o !== null && !p(o, t) && console.error(V(`${o}`, "Progress"));
    const n = p(o, t) ? o : null, b = s(n) ? P(n, t) : void 0;
    return /* @__PURE__ */ l(h, { scope: i, value: n, max: t, children: /* @__PURE__ */ l(
      c.div,
      {
        "aria-valuemax": t,
        "aria-valuemin": 0,
        "aria-valuenow": s(n) ? n : void 0,
        "aria-valuetext": b,
        role: "progressbar",
        "data-state": x(n, t),
        "data-value": n ?? void 0,
        "data-max": t,
        ...N,
        ref: e
      }
    ) });
  }
);
f.displayName = u;
var g = "ProgressIndicator", _ = m.forwardRef(
  (r, e) => {
    const { __scopeProgress: i, ...o } = r, a = R(g, i);
    return /* @__PURE__ */ l(
      c.div,
      {
        "data-state": x(a.value, a.max),
        "data-value": a.value ?? void 0,
        "data-max": a.max,
        ...o,
        ref: e
      }
    );
  }
);
_.displayName = g;
function E(r, e) {
  return `${Math.round(r / e * 100)}%`;
}
function x(r, e) {
  return r == null ? "indeterminate" : r === e ? "complete" : "loading";
}
function s(r) {
  return typeof r == "number";
}
function v(r) {
  return s(r) && !isNaN(r) && r > 0;
}
function p(r, e) {
  return s(r) && !isNaN(r) && r <= e && r >= 0;
}
function M(r, e) {
  return `Invalid prop \`max\` of value \`${r}\` supplied to \`${e}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${d}\`.`;
}
function V(r, e) {
  return `Invalid prop \`value\` of value \`${r}\` supplied to \`${e}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${d} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var D = f;
export {
  f as Progress,
  _ as ProgressIndicator,
  D as Root
};
