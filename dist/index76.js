import * as d from "react";
import { clamp as $ } from "./index124.js";
import { composeEventHandlers as C } from "./index126.js";
import { useComposedRefs as M } from "./index91.js";
import { createContextScope as ce } from "./index92.js";
import { useControllableState as le } from "./index88.js";
import { useDirection as de } from "./index107.js";
import { usePrevious as ue } from "./index109.js";
import { useSize as fe } from "./index108.js";
import { Primitive as K } from "./index89.js";
import { createCollection as me } from "./index127.js";
import { jsx as v, jsxs as pe } from "react/jsx-runtime";
var j = ["PageUp", "PageDown"], X = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], G = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, I = "Slider", [z, he, Se] = me(I), [W] = ce(I, [
  Se
]), [ge, T] = W(I), q = d.forwardRef(
  (e, t) => {
    const {
      name: o,
      min: n = 0,
      max: a = 100,
      step: c = 1,
      orientation: r = "horizontal",
      disabled: s = !1,
      minStepsBetweenThumbs: l = 0,
      defaultValue: h = [n],
      value: S,
      onValueChange: i = () => {
      },
      onValueCommit: u = () => {
      },
      inverted: w = !1,
      form: P,
      ...g
    } = e, m = d.useRef(/* @__PURE__ */ new Set()), f = d.useRef(0), b = r === "horizontal" ? ve : we, [p = [], A] = le({
      prop: S,
      defaultProp: h,
      onChange: (R) => {
        var E;
        (E = [...m.current][f.current]) == null || E.focus(), i(R);
      }
    }), k = d.useRef(p);
    function H(R) {
      const x = ye(p, R);
      V(R, x);
    }
    function se(R) {
      V(R, f.current);
    }
    function ae() {
      const R = k.current[f.current];
      p[f.current] !== R && u(p);
    }
    function V(R, x, { commit: E } = { commit: !1 }) {
      const F = Ce(c), N = Me(Math.round((R - n) / c) * c + n, F), B = $(N, [n, a]);
      A((_ = []) => {
        const y = Pe(_, B, x);
        if (_e(y, l * c)) {
          f.current = y.indexOf(B);
          const Y = String(y) !== String(_);
          return Y && E && u(y), Y ? y : _;
        } else
          return _;
      });
    }
    return /* @__PURE__ */ v(
      ge,
      {
        scope: e.__scopeSlider,
        name: o,
        disabled: s,
        min: n,
        max: a,
        valueIndexToChangeRef: f,
        thumbs: m.current,
        values: p,
        orientation: r,
        form: P,
        children: /* @__PURE__ */ v(z.Provider, { scope: e.__scopeSlider, children: /* @__PURE__ */ v(z.Slot, { scope: e.__scopeSlider, children: /* @__PURE__ */ v(
          b,
          {
            "aria-disabled": s,
            "data-disabled": s ? "" : void 0,
            ...g,
            ref: t,
            onPointerDown: C(g.onPointerDown, () => {
              s || (k.current = p);
            }),
            min: n,
            max: a,
            inverted: w,
            onSlideStart: s ? void 0 : H,
            onSlideMove: s ? void 0 : se,
            onSlideEnd: s ? void 0 : ae,
            onHomeKeyDown: () => !s && V(n, 0, { commit: !0 }),
            onEndKeyDown: () => !s && V(a, p.length - 1, { commit: !0 }),
            onStepKeyDown: ({ event: R, direction: x }) => {
              if (!s) {
                const N = j.includes(R.key) || R.shiftKey && X.includes(R.key) ? 10 : 1, B = f.current, _ = p[B], y = c * N * x;
                V(_ + y, B, { commit: !0 });
              }
            }
          }
        ) }) })
      }
    );
  }
);
q.displayName = I;
var [J, Q] = W(I, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), ve = d.forwardRef(
  (e, t) => {
    const {
      min: o,
      max: n,
      dir: a,
      inverted: c,
      onSlideStart: r,
      onSlideMove: s,
      onSlideEnd: l,
      onStepKeyDown: h,
      ...S
    } = e, [i, u] = d.useState(null), w = M(t, (b) => u(b)), P = d.useRef(void 0), g = de(a), m = g === "ltr", f = m && !c || !m && c;
    function D(b) {
      const p = P.current || i.getBoundingClientRect(), A = [0, p.width], H = U(A, f ? [o, n] : [n, o]);
      return P.current = p, H(b - p.left);
    }
    return /* @__PURE__ */ v(
      J,
      {
        scope: e.__scopeSlider,
        startEdge: f ? "left" : "right",
        endEdge: f ? "right" : "left",
        direction: f ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ v(
          Z,
          {
            dir: g,
            "data-orientation": "horizontal",
            ...S,
            ref: w,
            style: {
              ...S.style,
              "--radix-slider-thumb-transform": "translateX(-50%)"
            },
            onSlideStart: (b) => {
              const p = D(b.clientX);
              r == null || r(p);
            },
            onSlideMove: (b) => {
              const p = D(b.clientX);
              s == null || s(p);
            },
            onSlideEnd: () => {
              P.current = void 0, l == null || l();
            },
            onStepKeyDown: (b) => {
              const A = G[f ? "from-left" : "from-right"].includes(b.key);
              h == null || h({ event: b, direction: A ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), we = d.forwardRef(
  (e, t) => {
    const {
      min: o,
      max: n,
      inverted: a,
      onSlideStart: c,
      onSlideMove: r,
      onSlideEnd: s,
      onStepKeyDown: l,
      ...h
    } = e, S = d.useRef(null), i = M(t, S), u = d.useRef(void 0), w = !a;
    function P(g) {
      const m = u.current || S.current.getBoundingClientRect(), f = [0, m.height], b = U(f, w ? [n, o] : [o, n]);
      return u.current = m, b(g - m.top);
    }
    return /* @__PURE__ */ v(
      J,
      {
        scope: e.__scopeSlider,
        startEdge: w ? "bottom" : "top",
        endEdge: w ? "top" : "bottom",
        size: "height",
        direction: w ? 1 : -1,
        children: /* @__PURE__ */ v(
          Z,
          {
            "data-orientation": "vertical",
            ...h,
            ref: i,
            style: {
              ...h.style,
              "--radix-slider-thumb-transform": "translateY(50%)"
            },
            onSlideStart: (g) => {
              const m = P(g.clientY);
              c == null || c(m);
            },
            onSlideMove: (g) => {
              const m = P(g.clientY);
              r == null || r(m);
            },
            onSlideEnd: () => {
              u.current = void 0, s == null || s();
            },
            onStepKeyDown: (g) => {
              const f = G[w ? "from-bottom" : "from-top"].includes(g.key);
              l == null || l({ event: g, direction: f ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), Z = d.forwardRef(
  (e, t) => {
    const {
      __scopeSlider: o,
      onSlideStart: n,
      onSlideMove: a,
      onSlideEnd: c,
      onHomeKeyDown: r,
      onEndKeyDown: s,
      onStepKeyDown: l,
      ...h
    } = e, S = T(I, o);
    return /* @__PURE__ */ v(
      K.span,
      {
        ...h,
        ref: t,
        onKeyDown: C(e.onKeyDown, (i) => {
          i.key === "Home" ? (r(i), i.preventDefault()) : i.key === "End" ? (s(i), i.preventDefault()) : j.concat(X).includes(i.key) && (l(i), i.preventDefault());
        }),
        onPointerDown: C(e.onPointerDown, (i) => {
          const u = i.target;
          u.setPointerCapture(i.pointerId), i.preventDefault(), S.thumbs.has(u) ? u.focus() : n(i);
        }),
        onPointerMove: C(e.onPointerMove, (i) => {
          i.target.hasPointerCapture(i.pointerId) && a(i);
        }),
        onPointerUp: C(e.onPointerUp, (i) => {
          const u = i.target;
          u.hasPointerCapture(i.pointerId) && (u.releasePointerCapture(i.pointerId), c(i));
        })
      }
    );
  }
), ee = "SliderTrack", te = d.forwardRef(
  (e, t) => {
    const { __scopeSlider: o, ...n } = e, a = T(ee, o);
    return /* @__PURE__ */ v(
      K.span,
      {
        "data-disabled": a.disabled ? "" : void 0,
        "data-orientation": a.orientation,
        ...n,
        ref: t
      }
    );
  }
);
te.displayName = ee;
var L = "SliderRange", ne = d.forwardRef(
  (e, t) => {
    const { __scopeSlider: o, ...n } = e, a = T(L, o), c = Q(L, o), r = d.useRef(null), s = M(t, r), l = a.values.length, h = a.values.map(
      (u) => ie(u, a.min, a.max)
    ), S = l > 1 ? Math.min(...h) : 0, i = 100 - Math.max(...h);
    return /* @__PURE__ */ v(
      K.span,
      {
        "data-orientation": a.orientation,
        "data-disabled": a.disabled ? "" : void 0,
        ...n,
        ref: s,
        style: {
          ...e.style,
          [c.startEdge]: S + "%",
          [c.endEdge]: i + "%"
        }
      }
    );
  }
);
ne.displayName = L;
var O = "SliderThumb", oe = d.forwardRef(
  (e, t) => {
    const o = he(e.__scopeSlider), [n, a] = d.useState(null), c = M(t, (s) => a(s)), r = d.useMemo(
      () => n ? o().findIndex((s) => s.ref.current === n) : -1,
      [o, n]
    );
    return /* @__PURE__ */ v(be, { ...e, ref: c, index: r });
  }
), be = d.forwardRef(
  (e, t) => {
    const { __scopeSlider: o, index: n, name: a, ...c } = e, r = T(O, o), s = Q(O, o), [l, h] = d.useState(null), S = M(t, (D) => h(D)), i = l ? r.form || !!l.closest("form") : !0, u = fe(l), w = r.values[n], P = w === void 0 ? 0 : ie(w, r.min, r.max), g = xe(n, r.values.length), m = u == null ? void 0 : u[s.size], f = m ? De(m, P, s.direction) : 0;
    return d.useEffect(() => {
      if (l)
        return r.thumbs.add(l), () => {
          r.thumbs.delete(l);
        };
    }, [l, r.thumbs]), /* @__PURE__ */ pe(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [s.startEdge]: `calc(${P}% + ${f}px)`
        },
        children: [
          /* @__PURE__ */ v(z.ItemSlot, { scope: e.__scopeSlider, children: /* @__PURE__ */ v(
            K.span,
            {
              role: "slider",
              "aria-label": e["aria-label"] || g,
              "aria-valuemin": r.min,
              "aria-valuenow": w,
              "aria-valuemax": r.max,
              "aria-orientation": r.orientation,
              "data-orientation": r.orientation,
              "data-disabled": r.disabled ? "" : void 0,
              tabIndex: r.disabled ? void 0 : 0,
              ...c,
              ref: S,
              style: w === void 0 ? { display: "none" } : e.style,
              onFocus: C(e.onFocus, () => {
                r.valueIndexToChangeRef.current = n;
              })
            }
          ) }),
          i && /* @__PURE__ */ v(
            re,
            {
              name: a ?? (r.name ? r.name + (r.values.length > 1 ? "[]" : "") : void 0),
              form: r.form,
              value: w
            },
            n
          )
        ]
      }
    );
  }
);
oe.displayName = O;
var Re = "RadioBubbleInput", re = d.forwardRef(
  ({ __scopeSlider: e, value: t, ...o }, n) => {
    const a = d.useRef(null), c = M(a, n), r = ue(t);
    return d.useEffect(() => {
      const s = a.current;
      if (!s) return;
      const l = window.HTMLInputElement.prototype, S = Object.getOwnPropertyDescriptor(l, "value").set;
      if (r !== t && S) {
        const i = new Event("input", { bubbles: !0 });
        S.call(s, t), s.dispatchEvent(i);
      }
    }, [r, t]), /* @__PURE__ */ v(
      K.input,
      {
        style: { display: "none" },
        ...o,
        ref: c,
        defaultValue: t
      }
    );
  }
);
re.displayName = Re;
function Pe(e = [], t, o) {
  const n = [...e];
  return n[o] = t, n.sort((a, c) => a - c);
}
function ie(e, t, o) {
  const c = 100 / (o - t) * (e - t);
  return $(c, [0, 100]);
}
function xe(e, t) {
  return t > 2 ? `Value ${e + 1} of ${t}` : t === 2 ? ["Minimum", "Maximum"][e] : void 0;
}
function ye(e, t) {
  if (e.length === 1) return 0;
  const o = e.map((a) => Math.abs(a - t)), n = Math.min(...o);
  return o.indexOf(n);
}
function De(e, t, o) {
  const n = e / 2, c = U([0, 50], [0, n]);
  return (n - c(t) * o) * o;
}
function Ee(e) {
  return e.slice(0, -1).map((t, o) => e[o + 1] - t);
}
function _e(e, t) {
  if (t > 0) {
    const o = Ee(e);
    return Math.min(...o) >= t;
  }
  return !0;
}
function U(e, t) {
  return (o) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const n = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + n * (o - e[0]);
  };
}
function Ce(e) {
  return (String(e).split(".")[1] || "").length;
}
function Me(e, t) {
  const o = Math.pow(10, t);
  return Math.round(e * o) / o;
}
var Oe = q, Ue = te, Fe = ne, Ye = oe;
export {
  Fe as Range,
  Oe as Root,
  q as Slider,
  ne as SliderRange,
  oe as SliderThumb,
  te as SliderTrack,
  Ye as Thumb,
  Ue as Track
};
