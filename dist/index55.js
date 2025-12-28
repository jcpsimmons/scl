import u from "react";
var z = (e) => e.type === "checkbox", k = (e) => e instanceof Date, w = (e) => e == null;
const H = (e) => typeof e == "object";
var p = (e) => !w(e) && !Array.isArray(e) && H(e) && !k(e), J = (e) => p(e) && e.target ? z(e.target) ? e.target.checked : e.target.value : e, Q = (e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e, X = (e, s) => e.has(Q(s)), Y = (e) => {
  const s = e.constructor && e.constructor.prototype;
  return p(s) && s.hasOwnProperty("isPrototypeOf");
}, Z = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function W(e) {
  if (e instanceof Date)
    return new Date(e);
  const s = typeof FileList < "u" && e instanceof FileList;
  if (Z && (e instanceof Blob || s))
    return e;
  const t = Array.isArray(e);
  if (!t && !(p(e) && Y(e)))
    return e;
  const n = t ? [] : Object.create(Object.getPrototypeOf(e));
  for (const r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (n[r] = W(e[r]));
  return n;
}
var G = (e) => /^\w*$/.test(e), R = (e) => e === void 0, j = (e) => Array.isArray(e) ? e.filter(Boolean) : [], $ = (e) => j(e.replace(/["|']|\]/g, "").split(/\.|\[/)), y = (e, s, t) => {
  if (!s || !p(e))
    return t;
  const n = (G(s) ? [s] : $(s)).reduce((r, a) => w(r) ? r : r[a], e);
  return R(n) || n === e ? R(e[s]) ? t : e[s] : n;
}, P = (e) => typeof e == "boolean", E = (e) => typeof e == "function", D = (e, s, t) => {
  let n = -1;
  const r = G(s) ? [s] : $(s), a = r.length, i = a - 1;
  for (; ++n < a; ) {
    const l = r[n];
    let c = t;
    if (n !== i) {
      const f = e[l];
      c = p(f) || Array.isArray(f) ? f : isNaN(+r[n + 1]) ? {} : [];
    }
    if (l === "__proto__" || l === "constructor" || l === "prototype")
      return;
    e[l] = c, e = e[l];
  }
};
const I = {
  BLUR: "blur",
  CHANGE: "change"
}, B = {
  all: "all"
}, L = u.createContext(null);
L.displayName = "HookFormContext";
const M = () => u.useContext(L), oe = (e) => {
  const { children: s, ...t } = e;
  return u.createElement(L.Provider, { value: t }, s);
};
var ee = (e, s, t, n = !0) => {
  const r = {
    defaultValues: s._defaultValues
  };
  for (const a in e)
    Object.defineProperty(r, a, {
      get: () => {
        const i = a;
        return s._proxyFormState[i] !== B.all && (s._proxyFormState[i] = !n || B.all), t && (t[i] = !0), e[i];
      }
    });
  return r;
};
const q = typeof window < "u" ? u.useLayoutEffect : u.useEffect;
function te(e) {
  const s = M(), { control: t = s.control, disabled: n, name: r, exact: a } = e || {}, [i, l] = u.useState(t._formState), c = u.useRef({
    isDirty: !1,
    isLoading: !1,
    dirtyFields: !1,
    touchedFields: !1,
    validatingFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  });
  return q(() => t._subscribe({
    name: r,
    formState: c.current,
    exact: a,
    callback: (f) => {
      !n && l({
        ...t._formState,
        ...f
      });
    }
  }), [r, n, a]), u.useEffect(() => {
    c.current.isValid && t._setValid(!0);
  }, [t]), u.useMemo(() => ee(i, t, c.current, !1), [i, t]);
}
var re = (e) => typeof e == "string", T = (e, s, t, n, r) => re(e) ? y(t, e, r) : Array.isArray(e) ? e.map((a) => y(t, a)) : t, U = (e) => w(e) || !H(e);
function S(e, s, t = /* @__PURE__ */ new WeakSet()) {
  if (U(e) || U(s))
    return Object.is(e, s);
  if (k(e) && k(s))
    return e.getTime() === s.getTime();
  const n = Object.keys(e), r = Object.keys(s);
  if (n.length !== r.length)
    return !1;
  if (t.has(e) || t.has(s))
    return !0;
  t.add(e), t.add(s);
  for (const a of n) {
    const i = e[a];
    if (!r.includes(a))
      return !1;
    if (a !== "ref") {
      const l = s[a];
      if (k(i) && k(l) || p(i) && p(l) || Array.isArray(i) && Array.isArray(l) ? !S(i, l, t) : !Object.is(i, l))
        return !1;
    }
  }
  return !0;
}
function se(e) {
  const s = M(), { control: t = s.control, name: n, defaultValue: r, disabled: a, exact: i, compute: l } = e || {}, c = u.useRef(r), f = u.useRef(l), V = u.useRef(void 0), d = u.useRef(t), g = u.useRef(n);
  f.current = l;
  const [A, v] = u.useState(() => {
    const o = t._getWatch(n, c.current);
    return f.current ? f.current(o) : o;
  }), C = u.useCallback((o) => {
    const m = T(n, t._names, o || t._formValues, !1, c.current);
    return f.current ? f.current(m) : m;
  }, [t._formValues, t._names, n]), b = u.useCallback((o) => {
    if (!a) {
      const m = T(n, t._names, o || t._formValues, !1, c.current);
      if (f.current) {
        const _ = f.current(m);
        S(_, V.current) || (v(_), V.current = _);
      } else
        v(m);
    }
  }, [t._formValues, t._names, a, n]);
  q(() => ((d.current !== t || !S(g.current, n)) && (d.current = t, g.current = n, b()), t._subscribe({
    name: n,
    formState: {
      values: !0
    },
    exact: i,
    callback: (o) => {
      b(o.values);
    }
  })), [t, i, n, b]), u.useEffect(() => t._removeUnmounted());
  const h = d.current !== t, F = g.current, O = u.useMemo(() => {
    if (a)
      return null;
    const o = !h && !S(F, n);
    return h || o ? C() : null;
  }, [a, h, n, F, C]);
  return O !== null ? O : A;
}
function ne(e) {
  const s = M(), { name: t, disabled: n, control: r = s.control, shouldUnregister: a, defaultValue: i, exact: l = !0 } = e, c = X(r._names.array, t), f = u.useMemo(() => y(r._formValues, t, y(r._defaultValues, t, i)), [r, t, i]), V = se({
    control: r,
    name: t,
    defaultValue: f,
    exact: l
  }), d = te({
    control: r,
    name: t,
    exact: l
  }), g = u.useRef(e), A = u.useRef(void 0), v = u.useRef(r.register(t, {
    ...e.rules,
    value: V,
    ...P(e.disabled) ? { disabled: e.disabled } : {}
  }));
  g.current = e;
  const C = u.useMemo(() => Object.defineProperties({}, {
    invalid: {
      enumerable: !0,
      get: () => !!y(d.errors, t)
    },
    isDirty: {
      enumerable: !0,
      get: () => !!y(d.dirtyFields, t)
    },
    isTouched: {
      enumerable: !0,
      get: () => !!y(d.touchedFields, t)
    },
    isValidating: {
      enumerable: !0,
      get: () => !!y(d.validatingFields, t)
    },
    error: {
      enumerable: !0,
      get: () => y(d.errors, t)
    }
  }), [d, t]), b = u.useCallback((o) => v.current.onChange({
    target: {
      value: J(o),
      name: t
    },
    type: I.CHANGE
  }), [t]), h = u.useCallback(() => v.current.onBlur({
    target: {
      value: y(r._formValues, t),
      name: t
    },
    type: I.BLUR
  }), [t, r._formValues]), F = u.useCallback((o) => {
    const m = y(r._fields, t);
    m && m._f && o && (m._f.ref = {
      focus: () => E(o.focus) && o.focus(),
      select: () => E(o.select) && o.select(),
      setCustomValidity: (_) => E(o.setCustomValidity) && o.setCustomValidity(_),
      reportValidity: () => E(o.reportValidity) && o.reportValidity()
    });
  }, [r._fields, t]), O = u.useMemo(() => ({
    name: t,
    value: V,
    ...P(n) || d.disabled ? { disabled: d.disabled || n } : {},
    onChange: b,
    onBlur: h,
    ref: F
  }), [t, n, d.disabled, b, h, F, V]);
  return u.useEffect(() => {
    const o = r._options.shouldUnregister || a, m = A.current;
    m && m !== t && !c && r.unregister(m), r.register(t, {
      ...g.current.rules,
      ...P(g.current.disabled) ? { disabled: g.current.disabled } : {}
    });
    const _ = (x, K) => {
      const N = y(r._fields, x);
      N && N._f && (N._f.mount = K);
    };
    if (_(t, !0), o) {
      const x = W(y(r._options.defaultValues, t, g.current.defaultValue));
      D(r._defaultValues, t, x), R(y(r._formValues, t)) && D(r._formValues, t, x);
    }
    return !c && r.register(t), A.current = t, () => {
      (c ? o && !r._state.action : o) ? r.unregister(t) : _(t, !1);
    };
  }, [t, r, c, a]), u.useEffect(() => {
    r._setDisabledField({
      disabled: n,
      name: t
    });
  }, [n, t, r]), u.useMemo(() => ({
    field: O,
    formState: d,
    fieldState: C
  }), [O, d, C]);
}
const ae = (e) => e.render(ne(e));
export {
  ae as Controller,
  oe as FormProvider,
  y as get,
  D as set,
  ne as useController,
  M as useFormContext,
  te as useFormState,
  se as useWatch
};
