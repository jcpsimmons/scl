import { forwardRef as i, createElement as o } from "react";
import b from "./index167.js";
import { mergeClasses as d } from "./index165.js";
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N = i(
  ({
    color: m = "currentColor",
    size: r = 24,
    strokeWidth: e = 2,
    absoluteStrokeWidth: a,
    className: s = "",
    children: t,
    iconNode: u,
    ...f
  }, l) => o(
    "svg",
    {
      ref: l,
      ...b,
      width: r,
      height: r,
      stroke: m,
      strokeWidth: a ? Number(e) * 24 / Number(r) : e,
      className: d("lucide", s),
      ...f
    },
    [
      ...u.map(([p, c]) => o(p, c)),
      ...Array.isArray(t) ? t : [t]
    ]
  )
);
export {
  N as default
};
