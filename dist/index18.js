import { jsx as i } from "react/jsx-runtime";
import * as s from "react";
import { Root as F } from "./index72.js";
import { FormProvider as u, useFormContext as p, Controller as x } from "./index73.js";
import { cn as a } from "./index2.js";
import { Label as I } from "./index20.js";
const D = u, f = s.createContext(
  {}
), M = ({
  ...e
}) => /* @__PURE__ */ i(f.Provider, { value: { name: e.name }, children: /* @__PURE__ */ i(x, { ...e }) }), d = () => {
  const e = s.useContext(f), o = s.useContext(l), { getFieldState: r, formState: t } = p(), m = r(e.name, t);
  if (!e)
    throw new Error("useFormField should be used within <FormField>");
  const { id: n } = o;
  return {
    id: n,
    name: e.name,
    formItemId: `${n}-form-item`,
    formDescriptionId: `${n}-form-item-description`,
    formMessageId: `${n}-form-item-message`,
    ...m
  };
}, l = s.createContext(
  {}
), C = s.forwardRef(({ className: e, ...o }, r) => {
  const t = s.useId();
  return /* @__PURE__ */ i(l.Provider, { value: { id: t }, children: /* @__PURE__ */ i("div", { ref: r, className: a("space-y-2", e), ...o }) });
});
C.displayName = "FormItem";
const g = s.forwardRef(({ className: e, ...o }, r) => {
  const { error: t, formItemId: m } = d();
  return /* @__PURE__ */ i(
    I,
    {
      ref: r,
      className: a(t && "text-destructive", e),
      htmlFor: m,
      ...o
    }
  );
});
g.displayName = "FormLabel";
const v = s.forwardRef(({ ...e }, o) => {
  const { error: r, formItemId: t, formDescriptionId: m, formMessageId: n } = d();
  return /* @__PURE__ */ i(
    F,
    {
      ref: o,
      id: t,
      "aria-describedby": r ? `${m} ${n}` : `${m}`,
      "aria-invalid": !!r,
      ...e
    }
  );
});
v.displayName = "FormControl";
const N = s.forwardRef(({ className: e, ...o }, r) => {
  const { formDescriptionId: t } = d();
  return /* @__PURE__ */ i(
    "p",
    {
      ref: r,
      id: t,
      className: a("text-[0.8rem] text-muted-foreground", e),
      ...o
    }
  );
});
N.displayName = "FormDescription";
const w = s.forwardRef(({ className: e, children: o, ...r }, t) => {
  const { error: m, formMessageId: n } = d(), c = m ? String(m == null ? void 0 : m.message) : o;
  return c ? /* @__PURE__ */ i(
    "p",
    {
      ref: t,
      id: n,
      className: a("text-[0.8rem] font-medium text-destructive", e),
      ...r,
      children: c
    }
  ) : null;
});
w.displayName = "FormMessage";
export {
  D as Form,
  v as FormControl,
  N as FormDescription,
  M as FormField,
  C as FormItem,
  g as FormLabel,
  w as FormMessage,
  d as useFormField
};
