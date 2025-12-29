import * as f from "react";
import { composeEventHandlers as m } from "./index84.js";
import { useControllableState as p } from "./index85.js";
import { Primitive as b } from "./index86.js";
import { jsx as c } from "react/jsx-runtime";
var r = "Toggle", t = f.forwardRef((e, a) => {
  const { pressed: s, defaultPressed: d, onPressedChange: i, ...l } = e, [o, n] = p({
    prop: s,
    onChange: i,
    defaultProp: d ?? !1,
    caller: r
  });
  return /* @__PURE__ */ c(
    b.button,
    {
      type: "button",
      "aria-pressed": o,
      "data-state": o ? "on" : "off",
      "data-disabled": e.disabled ? "" : void 0,
      ...l,
      ref: a,
      onClick: m(e.onClick, () => {
        e.disabled || n(!o);
      })
    }
  );
});
t.displayName = r;
var C = t;
export {
  C as Root,
  t as Toggle
};
