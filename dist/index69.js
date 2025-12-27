import * as i from "react";
import { createContextScope as C } from "./index105.js";
import { useCallbackRef as h } from "./index106.js";
import { useLayoutEffect as f } from "./index107.js";
import { Primitive as m } from "./index100.js";
import { useIsHydrated as _ } from "./index108.js";
import { jsx as l } from "react/jsx-runtime";
var v = "Avatar", [y] = C(v), [x, A] = y(v), L = i.forwardRef(
  (t, e) => {
    const { __scopeAvatar: o, ...r } = t, [n, a] = i.useState("idle");
    return /* @__PURE__ */ l(
      x,
      {
        scope: o,
        imageLoadingStatus: n,
        onImageLoadingStatusChange: a,
        children: /* @__PURE__ */ l(m.span, { ...r, ref: e })
      }
    );
  }
);
L.displayName = v;
var S = "AvatarImage", E = i.forwardRef(
  (t, e) => {
    const { __scopeAvatar: o, src: r, onLoadingStatusChange: n = () => {
    }, ...a } = t, u = A(S, o), s = N(r, a), d = h((c) => {
      n(c), u.onImageLoadingStatusChange(c);
    });
    return f(() => {
      s !== "idle" && d(s);
    }, [s, d]), s === "loaded" ? /* @__PURE__ */ l(m.img, { ...a, ref: e, src: r }) : null;
  }
);
E.displayName = S;
var I = "AvatarFallback", R = i.forwardRef(
  (t, e) => {
    const { __scopeAvatar: o, delayMs: r, ...n } = t, a = A(I, o), [u, s] = i.useState(r === void 0);
    return i.useEffect(() => {
      if (r !== void 0) {
        const d = window.setTimeout(() => s(!0), r);
        return () => window.clearTimeout(d);
      }
    }, [r]), u && a.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ l(m.span, { ...n, ref: e }) : null;
  }
);
R.displayName = I;
function p(t, e) {
  return t ? e ? (t.src !== e && (t.src = e), t.complete && t.naturalWidth > 0 ? "loaded" : "loading") : "error" : "idle";
}
function N(t, { referrerPolicy: e, crossOrigin: o }) {
  const r = _(), n = i.useRef(null), a = r ? (n.current || (n.current = new window.Image()), n.current) : null, [u, s] = i.useState(
    () => p(a, t)
  );
  return f(() => {
    s(p(a, t));
  }, [a, t]), f(() => {
    const d = (w) => () => {
      s(w);
    };
    if (!a) return;
    const c = d("loaded"), g = d("error");
    return a.addEventListener("load", c), a.addEventListener("error", g), e && (a.referrerPolicy = e), typeof o == "string" && (a.crossOrigin = o), () => {
      a.removeEventListener("load", c), a.removeEventListener("error", g);
    };
  }, [a, o, e]), u;
}
var H = L, j = E, B = R;
export {
  L as Avatar,
  R as AvatarFallback,
  E as AvatarImage,
  B as Fallback,
  j as Image,
  H as Root
};
