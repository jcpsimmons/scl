/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), i = (...e) => e.filter((o, r, t) => !!o && o.trim() !== "" && t.indexOf(o) === r).join(" ").trim();
export {
  i as mergeClasses,
  n as toKebabCase
};
