import { Facet as w, EditorState as wt, StateEffect as Re, Transaction as vs, Annotation as ks, EditorSelection as S, Prec as Mi, Text as q, ChangeSet as Ai, RangeSet as R, RangeValue as Ee, combineConfig as Di, findClusterBreak as J, findColumn as Ms, MapMode as St, codePointAt as As, codePointSize as Ds, CharCategory as Ts } from "./index65.js";
import { StyleModule as dt } from "./index128.js";
import { keyName as Os, base as Bs, shift as Ls } from "./index129.js";
let E = typeof navigator < "u" ? navigator : { userAgent: "", vendor: "", platform: "" }, ge = typeof document < "u" ? document : { documentElement: { style: {} } };
const me = /* @__PURE__ */ /Edge\/(\d+)/.exec(E.userAgent), Ti = /* @__PURE__ */ /MSIE \d/.test(E.userAgent), be = /* @__PURE__ */ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(E.userAgent), Zt = !!(Ti || be || me), qe = !Zt && /* @__PURE__ */ /gecko\/(\d+)/i.test(E.userAgent), ne = !Zt && /* @__PURE__ */ /Chrome\/(\d+)/.exec(E.userAgent), Rs = "webkitFontSmoothing" in ge.documentElement.style, ye = !Zt && /* @__PURE__ */ /Apple Computer/.test(E.vendor), Ge = ye && (/* @__PURE__ */ /Mobile\/\w+/.test(E.userAgent) || E.maxTouchPoints > 2);
var y = {
  mac: Ge || /* @__PURE__ */ /Mac/.test(E.platform),
  windows: /* @__PURE__ */ /Win/.test(E.platform),
  linux: /* @__PURE__ */ /Linux|X11/.test(E.platform),
  ie: Zt,
  ie_version: Ti ? ge.documentMode || 6 : be ? +be[1] : me ? +me[1] : 0,
  gecko: qe,
  gecko_version: qe ? +(/* @__PURE__ */ /Firefox\/(\d+)/.exec(E.userAgent) || [0, 0])[1] : 0,
  chrome: !!ne,
  chrome_version: ne ? +ne[1] : 0,
  ios: Ge,
  android: /* @__PURE__ */ /Android\b/.test(E.userAgent),
  webkit_version: Rs ? +(/* @__PURE__ */ /\bAppleWebKit\/(\d+)/.exec(E.userAgent) || [0, 0])[1] : 0,
  safari: ye,
  safari_version: ye ? +(/* @__PURE__ */ /\bVersion\/(\d+(\.\d+)?)/.exec(E.userAgent) || [0, 0])[1] : 0,
  tabSize: ge.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
};
function We(n, t) {
  for (let e in n)
    e == "class" && t.class ? t.class += " " + n.class : e == "style" && t.style ? t.style += ";" + n.style : t[e] = n[e];
  return t;
}
const jt = /* @__PURE__ */ Object.create(null);
function He(n, t, e) {
  if (n == t)
    return !0;
  n || (n = jt), t || (t = jt);
  let i = Object.keys(n), s = Object.keys(t);
  if (i.length - 0 != s.length - 0)
    return !1;
  for (let r of i)
    if (r != e && (s.indexOf(r) == -1 || n[r] !== t[r]))
      return !1;
  return !0;
}
function Es(n, t) {
  for (let e = n.attributes.length - 1; e >= 0; e--) {
    let i = n.attributes[e].name;
    t[i] == null && n.removeAttribute(i);
  }
  for (let e in t) {
    let i = t[e];
    e == "style" ? n.style.cssText = i : n.getAttribute(e) != i && n.setAttribute(e, i);
  }
}
function je(n, t, e) {
  let i = !1;
  if (t)
    for (let s in t)
      e && s in e || (i = !0, s == "style" ? n.style.cssText = "" : n.removeAttribute(s));
  if (e)
    for (let s in e)
      t && t[s] == e[s] || (i = !0, s == "style" ? n.style.cssText = e[s] : n.setAttribute(s, e[s]));
  return i;
}
function Ws(n) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let e = 0; e < n.attributes.length; e++) {
    let i = n.attributes[e];
    t[i.name] = i.value;
  }
  return t;
}
class te {
  /**
  Compare this instance to another instance of the same type.
  (TypeScript can't express this, but only instances of the same
  specific class will be passed to this method.) This is used to
  avoid redrawing widgets when they are replaced by a new
  decoration of the same type. The default implementation just
  returns `false`, which will cause new instances of the widget to
  always be redrawn.
  */
  eq(t) {
    return !1;
  }
  /**
  Update a DOM element created by a widget of the same type (but
  different, non-`eq` content) to reflect this widget. May return
  true to indicate that it could update, false to indicate it
  couldn't (in which case the widget will be redrawn). The default
  implementation just returns false.
  */
  updateDOM(t, e) {
    return !1;
  }
  /**
  @internal
  */
  compare(t) {
    return this == t || this.constructor == t.constructor && this.eq(t);
  }
  /**
  The estimated height this widget will have, to be used when
  estimating the height of content that hasn't been drawn. May
  return -1 to indicate you don't know. The default implementation
  returns -1.
  */
  get estimatedHeight() {
    return -1;
  }
  /**
  For inline widgets that are displayed inline (as opposed to
  `inline-block`) and introduce line breaks (through `<br>` tags
  or textual newlines), this must indicate the amount of line
  breaks they introduce. Defaults to 0.
  */
  get lineBreaks() {
    return 0;
  }
  /**
  Can be used to configure which kinds of events inside the widget
  should be ignored by the editor. The default is to ignore all
  events.
  */
  ignoreEvent(t) {
    return !0;
  }
  /**
  Override the way screen coordinates for positions at/in the
  widget are found. `pos` will be the offset into the widget, and
  `side` the side of the position that is being queried—less than
  zero for before, greater than zero for after, and zero for
  directly at that position.
  */
  coordsAt(t, e, i) {
    return null;
  }
  /**
  @internal
  */
  get isHidden() {
    return !1;
  }
  /**
  @internal
  */
  get editable() {
    return !1;
  }
  /**
  This is called when the an instance of the widget is removed
  from the editor view.
  */
  destroy(t) {
  }
}
var P = /* @__PURE__ */ function(n) {
  return n[n.Text = 0] = "Text", n[n.WidgetBefore = 1] = "WidgetBefore", n[n.WidgetAfter = 2] = "WidgetAfter", n[n.WidgetRange = 3] = "WidgetRange", n;
}(P || (P = {}));
class N extends Ee {
  constructor(t, e, i, s) {
    super(), this.startSide = t, this.endSide = e, this.widget = i, this.spec = s;
  }
  /**
  @internal
  */
  get heightRelevant() {
    return !1;
  }
  /**
  Create a mark decoration, which influences the styling of the
  content in its range. Nested mark decorations will cause nested
  DOM elements to be created. Nesting order is determined by
  precedence of the [facet](https://codemirror.net/6/docs/ref/#view.EditorView^decorations), with
  the higher-precedence decorations creating the inner DOM nodes.
  Such elements are split on line boundaries and on the boundaries
  of lower-precedence decorations.
  */
  static mark(t) {
    return new Tt(t);
  }
  /**
  Create a widget decoration, which displays a DOM element at the
  given position.
  */
  static widget(t) {
    let e = Math.max(-1e4, Math.min(1e4, t.side || 0)), i = !!t.block;
    return e += i && !t.inlineOrder ? e > 0 ? 3e8 : -4e8 : e > 0 ? 1e8 : -1e8, new st(t, e, e, i, t.widget || null, !1);
  }
  /**
  Create a replace decoration which replaces the given range with
  a widget, or simply hides it.
  */
  static replace(t) {
    let e = !!t.block, i, s;
    if (t.isBlockGap)
      i = -5e8, s = 4e8;
    else {
      let { start: r, end: o } = Oi(t, e);
      i = (r ? e ? -3e8 : -1 : 5e8) - 1, s = (o ? e ? 2e8 : 1 : -6e8) + 1;
    }
    return new st(t, i, s, e, t.widget || null, !0);
  }
  /**
  Create a line decoration, which can add DOM attributes to the
  line starting at the given position.
  */
  static line(t) {
    return new Ot(t);
  }
  /**
  Build a [`DecorationSet`](https://codemirror.net/6/docs/ref/#view.DecorationSet) from the given
  decorated range or ranges. If the ranges aren't already sorted,
  pass `true` for `sort` to make the library sort them for you.
  */
  static set(t, e = !1) {
    return R.of(t, e);
  }
  /**
  @internal
  */
  hasHeight() {
    return this.widget ? this.widget.estimatedHeight > -1 : !1;
  }
}
N.none = R.empty;
class Tt extends N {
  constructor(t) {
    let { start: e, end: i } = Oi(t);
    super(e ? -1 : 5e8, i ? 1 : -6e8, null, t), this.tagName = t.tagName || "span", this.attrs = t.class && t.attributes ? We(t.attributes, { class: t.class }) : t.class ? { class: t.class } : t.attributes || jt;
  }
  eq(t) {
    return this == t || t instanceof Tt && this.tagName == t.tagName && He(this.attrs, t.attrs);
  }
  range(t, e = t) {
    if (t >= e)
      throw new RangeError("Mark decorations may not be empty");
    return super.range(t, e);
  }
}
Tt.prototype.point = !1;
class Ot extends N {
  constructor(t) {
    super(-2e8, -2e8, null, t);
  }
  eq(t) {
    return t instanceof Ot && this.spec.class == t.spec.class && He(this.spec.attributes, t.spec.attributes);
  }
  range(t, e = t) {
    if (e != t)
      throw new RangeError("Line decoration ranges must be zero-length");
    return super.range(t, e);
  }
}
Ot.prototype.mapMode = St.TrackBefore;
Ot.prototype.point = !0;
class st extends N {
  constructor(t, e, i, s, r, o) {
    super(e, i, r, t), this.block = s, this.isReplace = o, this.mapMode = s ? e <= 0 ? St.TrackBefore : St.TrackAfter : St.TrackDel;
  }
  // Only relevant when this.block == true
  get type() {
    return this.startSide != this.endSide ? P.WidgetRange : this.startSide <= 0 ? P.WidgetBefore : P.WidgetAfter;
  }
  get heightRelevant() {
    return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
  }
  eq(t) {
    return t instanceof st && Hs(this.widget, t.widget) && this.block == t.block && this.startSide == t.startSide && this.endSide == t.endSide;
  }
  range(t, e = t) {
    if (this.isReplace && (t > e || t == e && this.startSide > 0 && this.endSide <= 0))
      throw new RangeError("Invalid range for replacement decoration");
    if (!this.isReplace && e != t)
      throw new RangeError("Widget decorations can only have zero-length ranges");
    return super.range(t, e);
  }
}
st.prototype.point = !0;
function Oi(n, t = !1) {
  let { inclusiveStart: e, inclusiveEnd: i } = n;
  return e == null && (e = n.inclusive), i == null && (i = n.inclusive), { start: e ?? t, end: i ?? t };
}
function Hs(n, t) {
  return n == t || !!(n && t && n.compare(t));
}
function at(n, t, e, i = 0) {
  let s = e.length - 1;
  s >= 0 && e[s] + i >= n ? e[s] = Math.max(e[s], t) : e.push(n, t);
}
class kt extends Ee {
  constructor(t, e) {
    super(), this.tagName = t, this.attributes = e;
  }
  eq(t) {
    return t == this || t instanceof kt && this.tagName == t.tagName && He(this.attributes, t.attributes);
  }
  /**
  Create a block wrapper object with the given tag name and
  attributes.
  */
  static create(t) {
    return new kt(t.tagName, t.attributes || jt);
  }
  /**
  Create a range set from the given block wrapper ranges.
  */
  static set(t, e = !1) {
    return R.of(t, e);
  }
}
kt.prototype.startSide = kt.prototype.endSide = -1;
function Mt(n) {
  let t;
  return n.nodeType == 11 ? t = n.getSelection ? n : n.ownerDocument : t = n, t.getSelection();
}
function xe(n, t) {
  return t ? n == t || n.contains(t.nodeType != 1 ? t.parentNode : t) : !1;
}
function zt(n, t) {
  if (!t.anchorNode)
    return !1;
  try {
    return xe(n, t.anchorNode);
  } catch {
    return !1;
  }
}
function Kt(n) {
  return n.nodeType == 3 ? At(n, 0, n.nodeValue.length).getClientRects() : n.nodeType == 1 ? n.getClientRects() : [];
}
function Ct(n, t, e, i) {
  return e ? _e(n, t, e, i, -1) || _e(n, t, e, i, 1) : !1;
}
function tt(n) {
  for (var t = 0; ; t++)
    if (n = n.previousSibling, !n)
      return t;
}
function _t(n) {
  return n.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(n.nodeName);
}
function _e(n, t, e, i, s) {
  for (; ; ) {
    if (n == e && t == i)
      return !0;
    if (t == (s < 0 ? 0 : $(n))) {
      if (n.nodeName == "DIV")
        return !1;
      let r = n.parentNode;
      if (!r || r.nodeType != 1)
        return !1;
      t = tt(n) + (s < 0 ? 0 : 1), n = r;
    } else if (n.nodeType == 1) {
      if (n = n.childNodes[t + (s < 0 ? -1 : 0)], n.nodeType == 1 && n.contentEditable == "false")
        return !1;
      t = s < 0 ? $(n) : 0;
    } else
      return !1;
  }
}
function $(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function Yt(n, t) {
  let e = t ? n.left : n.right;
  return { left: e, right: e, top: n.top, bottom: n.bottom };
}
function Ps(n) {
  let t = n.visualViewport;
  return t ? {
    left: 0,
    right: t.width,
    top: 0,
    bottom: t.height
  } : {
    left: 0,
    right: n.innerWidth,
    top: 0,
    bottom: n.innerHeight
  };
}
function Bi(n, t) {
  let e = t.width / n.offsetWidth, i = t.height / n.offsetHeight;
  return (e > 0.995 && e < 1.005 || !isFinite(e) || Math.abs(t.width - n.offsetWidth) < 1) && (e = 1), (i > 0.995 && i < 1.005 || !isFinite(i) || Math.abs(t.height - n.offsetHeight) < 1) && (i = 1), { scaleX: e, scaleY: i };
}
function Ns(n, t, e, i, s, r, o, l) {
  let h = n.ownerDocument, a = h.defaultView || window;
  for (let f = n, d = !1; f && !d; )
    if (f.nodeType == 1) {
      let c, u = f == h.body, p = 1, g = 1;
      if (u)
        c = Ps(a);
      else {
        if (/^(fixed|sticky)$/.test(getComputedStyle(f).position) && (d = !0), f.scrollHeight <= f.clientHeight && f.scrollWidth <= f.clientWidth) {
          f = f.assignedSlot || f.parentNode;
          continue;
        }
        let x = f.getBoundingClientRect();
        ({ scaleX: p, scaleY: g } = Bi(f, x)), c = {
          left: x.left,
          right: x.left + f.clientWidth * p,
          top: x.top,
          bottom: x.top + f.clientHeight * g
        };
      }
      let m = 0, b = 0;
      if (s == "nearest")
        t.top < c.top ? (b = t.top - (c.top + o), e > 0 && t.bottom > c.bottom + b && (b = t.bottom - c.bottom + o)) : t.bottom > c.bottom && (b = t.bottom - c.bottom + o, e < 0 && t.top - b < c.top && (b = t.top - (c.top + o)));
      else {
        let x = t.bottom - t.top, v = c.bottom - c.top;
        b = (s == "center" && x <= v ? t.top + x / 2 - v / 2 : s == "start" || s == "center" && e < 0 ? t.top - o : t.bottom - v + o) - c.top;
      }
      if (i == "nearest" ? t.left < c.left ? (m = t.left - (c.left + r), e > 0 && t.right > c.right + m && (m = t.right - c.right + r)) : t.right > c.right && (m = t.right - c.right + r, e < 0 && t.left < c.left + m && (m = t.left - (c.left + r))) : m = (i == "center" ? t.left + (t.right - t.left) / 2 - (c.right - c.left) / 2 : i == "start" == l ? t.left - r : t.right - (c.right - c.left) + r) - c.left, m || b)
        if (u)
          a.scrollBy(m, b);
        else {
          let x = 0, v = 0;
          if (b) {
            let A = f.scrollTop;
            f.scrollTop += b / g, v = (f.scrollTop - A) * g;
          }
          if (m) {
            let A = f.scrollLeft;
            f.scrollLeft += m / p, x = (f.scrollLeft - A) * p;
          }
          t = {
            left: t.left - x,
            top: t.top - v,
            right: t.right - x,
            bottom: t.bottom - v
          }, x && Math.abs(x - m) < 1 && (i = "nearest"), v && Math.abs(v - b) < 1 && (s = "nearest");
        }
      if (u)
        break;
      (t.top < c.top || t.bottom > c.bottom || t.left < c.left || t.right > c.right) && (t = {
        left: Math.max(t.left, c.left),
        right: Math.min(t.right, c.right),
        top: Math.max(t.top, c.top),
        bottom: Math.min(t.bottom, c.bottom)
      }), f = f.assignedSlot || f.parentNode;
    } else if (f.nodeType == 11)
      f = f.host;
    else
      break;
}
function Fs(n) {
  let t = n.ownerDocument, e, i;
  for (let s = n.parentNode; s && !(s == t.body || e && i); )
    if (s.nodeType == 1)
      !i && s.scrollHeight > s.clientHeight && (i = s), !e && s.scrollWidth > s.clientWidth && (e = s), s = s.assignedSlot || s.parentNode;
    else if (s.nodeType == 11)
      s = s.host;
    else
      break;
  return { x: e, y: i };
}
class Vs {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  eq(t) {
    return this.anchorNode == t.anchorNode && this.anchorOffset == t.anchorOffset && this.focusNode == t.focusNode && this.focusOffset == t.focusOffset;
  }
  setRange(t) {
    let { anchorNode: e, focusNode: i } = t;
    this.set(e, Math.min(t.anchorOffset, e ? $(e) : 0), i, Math.min(t.focusOffset, i ? $(i) : 0));
  }
  set(t, e, i, s) {
    this.anchorNode = t, this.anchorOffset = e, this.focusNode = i, this.focusOffset = s;
  }
}
let et = null;
y.safari && y.safari_version >= 26 && (et = !1);
function Li(n) {
  if (n.setActive)
    return n.setActive();
  if (et)
    return n.focus(et);
  let t = [];
  for (let e = n; e && (t.push(e, e.scrollTop, e.scrollLeft), e != e.ownerDocument); e = e.parentNode)
    ;
  if (n.focus(et == null ? {
    get preventScroll() {
      return et = { preventScroll: !0 }, !0;
    }
  } : void 0), !et) {
    et = !1;
    for (let e = 0; e < t.length; ) {
      let i = t[e++], s = t[e++], r = t[e++];
      i.scrollTop != s && (i.scrollTop = s), i.scrollLeft != r && (i.scrollLeft = r);
    }
  }
}
let Ye;
function At(n, t, e = t) {
  let i = Ye || (Ye = document.createRange());
  return i.setEnd(n, e), i.setStart(n, t), i;
}
function ft(n, t, e, i) {
  let s = { key: t, code: t, keyCode: e, which: e, cancelable: !0 };
  i && ({ altKey: s.altKey, ctrlKey: s.ctrlKey, shiftKey: s.shiftKey, metaKey: s.metaKey } = i);
  let r = new KeyboardEvent("keydown", s);
  r.synthetic = !0, n.dispatchEvent(r);
  let o = new KeyboardEvent("keyup", s);
  return o.synthetic = !0, n.dispatchEvent(o), r.defaultPrevented || o.defaultPrevented;
}
function Is(n) {
  for (; n; ) {
    if (n && (n.nodeType == 9 || n.nodeType == 11 && n.host))
      return n;
    n = n.assignedSlot || n.parentNode;
  }
  return null;
}
function zs(n, t) {
  let e = t.focusNode, i = t.focusOffset;
  if (!e || t.anchorNode != e || t.anchorOffset != i)
    return !1;
  for (i = Math.min(i, $(e)); ; )
    if (i) {
      if (e.nodeType != 1)
        return !1;
      let s = e.childNodes[i - 1];
      s.contentEditable == "false" ? i-- : (e = s, i = $(e));
    } else {
      if (e == n)
        return !0;
      i = tt(e), e = e.parentNode;
    }
}
function Ri(n) {
  return n.scrollTop > Math.max(1, n.scrollHeight - n.clientHeight - 4);
}
function Ei(n, t) {
  for (let e = n, i = t; ; ) {
    if (e.nodeType == 3 && i > 0)
      return { node: e, offset: i };
    if (e.nodeType == 1 && i > 0) {
      if (e.contentEditable == "false")
        return null;
      e = e.childNodes[i - 1], i = $(e);
    } else if (e.parentNode && !_t(e))
      i = tt(e), e = e.parentNode;
    else
      return null;
  }
}
function Wi(n, t) {
  for (let e = n, i = t; ; ) {
    if (e.nodeType == 3 && i < e.nodeValue.length)
      return { node: e, offset: i };
    if (e.nodeType == 1 && i < e.childNodes.length) {
      if (e.contentEditable == "false")
        return null;
      e = e.childNodes[i], i = 0;
    } else if (e.parentNode && !_t(e))
      i = tt(e) + 1, e = e.parentNode;
    else
      return null;
  }
}
class K {
  constructor(t, e, i = !0) {
    this.node = t, this.offset = e, this.precise = i;
  }
  static before(t, e) {
    return new K(t.parentNode, tt(t), e);
  }
  static after(t, e) {
    return new K(t.parentNode, tt(t) + 1, e);
  }
}
var O = /* @__PURE__ */ function(n) {
  return n[n.LTR = 0] = "LTR", n[n.RTL = 1] = "RTL", n;
}(O || (O = {}));
const nt = O.LTR, Pe = O.RTL;
function Hi(n) {
  let t = [];
  for (let e = 0; e < n.length; e++)
    t.push(1 << +n[e]);
  return t;
}
const Ks = /* @__PURE__ */ Hi("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), qs = /* @__PURE__ */ Hi("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), we = /* @__PURE__ */ Object.create(null), j = [];
for (let n of ["()", "[]", "{}"]) {
  let t = /* @__PURE__ */ n.charCodeAt(0), e = /* @__PURE__ */ n.charCodeAt(1);
  we[t] = e, we[e] = -t;
}
function Pi(n) {
  return n <= 247 ? Ks[n] : 1424 <= n && n <= 1524 ? 2 : 1536 <= n && n <= 1785 ? qs[n - 1536] : 1774 <= n && n <= 2220 ? 4 : 8192 <= n && n <= 8204 ? 256 : 64336 <= n && n <= 65023 ? 4 : 1;
}
const Gs = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;
class X {
  /**
  The direction of this span.
  */
  get dir() {
    return this.level % 2 ? Pe : nt;
  }
  /**
  @internal
  */
  constructor(t, e, i) {
    this.from = t, this.to = e, this.level = i;
  }
  /**
  @internal
  */
  side(t, e) {
    return this.dir == e == t ? this.to : this.from;
  }
  /**
  @internal
  */
  forward(t, e) {
    return t == (this.dir == e);
  }
  /**
  @internal
  */
  static find(t, e, i, s) {
    let r = -1;
    for (let o = 0; o < t.length; o++) {
      let l = t[o];
      if (l.from <= e && l.to >= e) {
        if (l.level == i)
          return o;
        (r < 0 || (s != 0 ? s < 0 ? l.from < e : l.to > e : t[r].level > l.level)) && (r = o);
      }
    }
    if (r < 0)
      throw new RangeError("Index out of range");
    return r;
  }
}
function Ni(n, t) {
  if (n.length != t.length)
    return !1;
  for (let e = 0; e < n.length; e++) {
    let i = n[e], s = t[e];
    if (i.from != s.from || i.to != s.to || i.direction != s.direction || !Ni(i.inner, s.inner))
      return !1;
  }
  return !0;
}
const k = [];
function js(n, t, e, i, s) {
  for (let r = 0; r <= i.length; r++) {
    let o = r ? i[r - 1].to : t, l = r < i.length ? i[r].from : e, h = r ? 256 : s;
    for (let a = o, f = h, d = h; a < l; a++) {
      let c = Pi(n.charCodeAt(a));
      c == 512 ? c = f : c == 8 && d == 4 && (c = 16), k[a] = c == 4 ? 2 : c, c & 7 && (d = c), f = c;
    }
    for (let a = o, f = h, d = h; a < l; a++) {
      let c = k[a];
      if (c == 128)
        a < l - 1 && f == k[a + 1] && f & 24 ? c = k[a] = f : k[a] = 256;
      else if (c == 64) {
        let u = a + 1;
        for (; u < l && k[u] == 64; )
          u++;
        let p = a && f == 8 || u < e && k[u] == 8 ? d == 1 ? 1 : 8 : 256;
        for (let g = a; g < u; g++)
          k[g] = p;
        a = u - 1;
      } else c == 8 && d == 1 && (k[a] = 1);
      f = c, c & 7 && (d = c);
    }
  }
}
function _s(n, t, e, i, s) {
  let r = s == 1 ? 2 : 1;
  for (let o = 0, l = 0, h = 0; o <= i.length; o++) {
    let a = o ? i[o - 1].to : t, f = o < i.length ? i[o].from : e;
    for (let d = a, c, u, p; d < f; d++)
      if (u = we[c = n.charCodeAt(d)])
        if (u < 0) {
          for (let g = l - 3; g >= 0; g -= 3)
            if (j[g + 1] == -u) {
              let m = j[g + 2], b = m & 2 ? s : m & 4 ? m & 1 ? r : s : 0;
              b && (k[d] = k[j[g]] = b), l = g;
              break;
            }
        } else {
          if (j.length == 189)
            break;
          j[l++] = d, j[l++] = c, j[l++] = h;
        }
      else if ((p = k[d]) == 2 || p == 1) {
        let g = p == s;
        h = g ? 0 : 1;
        for (let m = l - 3; m >= 0; m -= 3) {
          let b = j[m + 2];
          if (b & 2)
            break;
          if (g)
            j[m + 2] |= 2;
          else {
            if (b & 4)
              break;
            j[m + 2] |= 4;
          }
        }
      }
  }
}
function Ys(n, t, e, i) {
  for (let s = 0, r = i; s <= e.length; s++) {
    let o = s ? e[s - 1].to : n, l = s < e.length ? e[s].from : t;
    for (let h = o; h < l; ) {
      let a = k[h];
      if (a == 256) {
        let f = h + 1;
        for (; ; )
          if (f == l) {
            if (s == e.length)
              break;
            f = e[s++].to, l = s < e.length ? e[s].from : t;
          } else if (k[f] == 256)
            f++;
          else
            break;
        let d = r == 1, c = (f < t ? k[f] : i) == 1, u = d == c ? d ? 1 : 2 : i;
        for (let p = f, g = s, m = g ? e[g - 1].to : n; p > h; )
          p == m && (p = e[--g].from, m = g ? e[g - 1].to : n), k[--p] = u;
        h = f;
      } else
        r = a, h++;
    }
  }
}
function Se(n, t, e, i, s, r, o) {
  let l = i % 2 ? 2 : 1;
  if (i % 2 == s % 2)
    for (let h = t, a = 0; h < e; ) {
      let f = !0, d = !1;
      if (a == r.length || h < r[a].from) {
        let g = k[h];
        g != l && (f = !1, d = g == 16);
      }
      let c = !f && l == 1 ? [] : null, u = f ? i : i + 1, p = h;
      t: for (; ; )
        if (a < r.length && p == r[a].from) {
          if (d)
            break t;
          let g = r[a];
          if (!f)
            for (let m = g.to, b = a + 1; ; ) {
              if (m == e)
                break t;
              if (b < r.length && r[b].from == m)
                m = r[b++].to;
              else {
                if (k[m] == l)
                  break t;
                break;
              }
            }
          if (a++, c)
            c.push(g);
          else {
            g.from > h && o.push(new X(h, g.from, u));
            let m = g.direction == nt != !(u % 2);
            Ce(n, m ? i + 1 : i, s, g.inner, g.from, g.to, o), h = g.to;
          }
          p = g.to;
        } else {
          if (p == e || (f ? k[p] != l : k[p] == l))
            break;
          p++;
        }
      c ? Se(n, h, p, i + 1, s, c, o) : h < p && o.push(new X(h, p, u)), h = p;
    }
  else
    for (let h = e, a = r.length; h > t; ) {
      let f = !0, d = !1;
      if (!a || h > r[a - 1].to) {
        let g = k[h - 1];
        g != l && (f = !1, d = g == 16);
      }
      let c = !f && l == 1 ? [] : null, u = f ? i : i + 1, p = h;
      t: for (; ; )
        if (a && p == r[a - 1].to) {
          if (d)
            break t;
          let g = r[--a];
          if (!f)
            for (let m = g.from, b = a; ; ) {
              if (m == t)
                break t;
              if (b && r[b - 1].to == m)
                m = r[--b].from;
              else {
                if (k[m - 1] == l)
                  break t;
                break;
              }
            }
          if (c)
            c.push(g);
          else {
            g.to < h && o.push(new X(g.to, h, u));
            let m = g.direction == nt != !(u % 2);
            Ce(n, m ? i + 1 : i, s, g.inner, g.from, g.to, o), h = g.from;
          }
          p = g.from;
        } else {
          if (p == t || (f ? k[p - 1] != l : k[p - 1] == l))
            break;
          p--;
        }
      c ? Se(n, p, h, i + 1, s, c, o) : p < h && o.push(new X(p, h, u)), h = p;
    }
}
function Ce(n, t, e, i, s, r, o) {
  let l = t % 2 ? 2 : 1;
  js(n, s, r, i, l), _s(n, s, r, i, l), Ys(s, r, i, l), Se(n, s, r, t, e, i, o);
}
function Xs(n, t, e) {
  if (!n)
    return [new X(0, 0, t == Pe ? 1 : 0)];
  if (t == nt && !e.length && !Gs.test(n))
    return Fi(n.length);
  if (e.length)
    for (; n.length > k.length; )
      k[k.length] = 256;
  let i = [], s = t == nt ? 0 : 1;
  return Ce(n, s, s, e, 0, n.length, i), i;
}
function Fi(n) {
  return [new X(0, n, 0)];
}
let Vi = "";
function Us(n, t, e, i, s) {
  var r;
  let o = i.head - n.from, l = X.find(t, o, (r = i.bidiLevel) !== null && r !== void 0 ? r : -1, i.assoc), h = t[l], a = h.side(s, e);
  if (o == a) {
    let c = l += s ? 1 : -1;
    if (c < 0 || c >= t.length)
      return null;
    h = t[l = c], o = h.side(!s, e), a = h.side(s, e);
  }
  let f = J(n.text, o, h.forward(s, e));
  (f < h.from || f > h.to) && (f = a), Vi = n.text.slice(Math.min(o, f), Math.max(o, f));
  let d = l == (s ? t.length - 1 : 0) ? null : t[l + (s ? 1 : -1)];
  return d && f == a && d.level + (s ? 0 : 1) < h.level ? S.cursor(d.side(!s, e) + n.from, d.forward(s, e) ? 1 : -1, d.level) : S.cursor(f + n.from, h.forward(s, e) ? -1 : 1, h.level);
}
function $s(n, t, e) {
  for (let i = t; i < e; i++) {
    let s = Pi(n.charCodeAt(i));
    if (s == 1)
      return nt;
    if (s == 2 || s == 4)
      return Pe;
  }
  return nt;
}
const Ii = /* @__PURE__ */ w.define(), zi = /* @__PURE__ */ w.define(), Ki = /* @__PURE__ */ w.define(), qi = /* @__PURE__ */ w.define(), ve = /* @__PURE__ */ w.define(), Gi = /* @__PURE__ */ w.define(), ji = /* @__PURE__ */ w.define(), Ne = /* @__PURE__ */ w.define(), Fe = /* @__PURE__ */ w.define(), _i = /* @__PURE__ */ w.define({
  combine: (n) => n.some((t) => t)
}), Qs = /* @__PURE__ */ w.define({
  combine: (n) => n.some((t) => t)
}), Yi = /* @__PURE__ */ w.define();
class ct {
  constructor(t, e = "nearest", i = "nearest", s = 5, r = 5, o = !1) {
    this.range = t, this.y = e, this.x = i, this.yMargin = s, this.xMargin = r, this.isSnapshot = o;
  }
  map(t) {
    return t.empty ? this : new ct(this.range.map(t), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
  clip(t) {
    return this.range.to <= t.doc.length ? this : new ct(S.cursor(t.doc.length), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
}
const Rt = /* @__PURE__ */ Re.define({ map: (n, t) => n.map(t) }), Xi = /* @__PURE__ */ Re.define();
function U(n, t, e) {
  let i = n.facet(qi);
  i.length ? i[0](t) : window.onerror && window.onerror(String(t), e, void 0, void 0, t) || (e ? console.error(e + ":", t) : console.error(t));
}
const Y = /* @__PURE__ */ w.define({ combine: (n) => n.length ? n[0] : !0 });
let Js = 0;
const lt = /* @__PURE__ */ w.define({
  combine(n) {
    return n.filter((t, e) => {
      for (let i = 0; i < e; i++)
        if (n[i].plugin == t.plugin)
          return !1;
      return !0;
    });
  }
});
class rt {
  constructor(t, e, i, s, r) {
    this.id = t, this.create = e, this.domEventHandlers = i, this.domEventObservers = s, this.baseExtensions = r(this), this.extension = this.baseExtensions.concat(lt.of({ plugin: this, arg: void 0 }));
  }
  /**
  Create an extension for this plugin with the given argument.
  */
  of(t) {
    return this.baseExtensions.concat(lt.of({ plugin: this, arg: t }));
  }
  /**
  Define a plugin from a constructor function that creates the
  plugin's value, given an editor view.
  */
  static define(t, e) {
    const { eventHandlers: i, eventObservers: s, provide: r, decorations: o } = e || {};
    return new rt(Js++, t, i, s, (l) => {
      let h = [];
      return o && h.push(Dt.of((a) => {
        let f = a.plugin(l);
        return f ? o(f) : N.none;
      })), r && h.push(r(l)), h;
    });
  }
  /**
  Create a plugin for a class whose constructor takes a single
  editor view as argument.
  */
  static fromClass(t, e) {
    return rt.define((i, s) => new t(i, s), e);
  }
}
class re {
  constructor(t) {
    this.spec = t, this.mustUpdate = null, this.value = null;
  }
  get plugin() {
    return this.spec && this.spec.plugin;
  }
  update(t) {
    if (this.value) {
      if (this.mustUpdate) {
        let e = this.mustUpdate;
        if (this.mustUpdate = null, this.value.update)
          try {
            this.value.update(e);
          } catch (i) {
            if (U(e.state, i, "CodeMirror plugin crashed"), this.value.destroy)
              try {
                this.value.destroy();
              } catch {
              }
            this.deactivate();
          }
      }
    } else if (this.spec)
      try {
        this.value = this.spec.plugin.create(t, this.spec.arg);
      } catch (e) {
        U(t.state, e, "CodeMirror plugin crashed"), this.deactivate();
      }
    return this;
  }
  destroy(t) {
    var e;
    if (!((e = this.value) === null || e === void 0) && e.destroy)
      try {
        this.value.destroy();
      } catch (i) {
        U(t.state, i, "CodeMirror plugin crashed");
      }
  }
  deactivate() {
    this.spec = this.value = null;
  }
}
const Ui = /* @__PURE__ */ w.define(), Ve = /* @__PURE__ */ w.define(), Dt = /* @__PURE__ */ w.define(), $i = /* @__PURE__ */ w.define(), Qi = /* @__PURE__ */ w.define(), Bt = /* @__PURE__ */ w.define(), Ji = /* @__PURE__ */ w.define();
function Xe(n, t) {
  let e = n.state.facet(Ji);
  if (!e.length)
    return e;
  let i = e.map((r) => r instanceof Function ? r(n) : r), s = [];
  return R.spans(i, t.from, t.to, {
    point() {
    },
    span(r, o, l, h) {
      let a = r - t.from, f = o - t.from, d = s;
      for (let c = l.length - 1; c >= 0; c--, h--) {
        let u = l[c].spec.bidiIsolate, p;
        if (u == null && (u = $s(t.text, a, f)), h > 0 && d.length && (p = d[d.length - 1]).to == a && p.direction == u)
          p.to = f, d = p.inner;
        else {
          let g = { from: a, to: f, direction: u, inner: [] };
          d.push(g), d = g.inner;
        }
      }
    }
  }), s;
}
const Zi = /* @__PURE__ */ w.define();
function ts(n) {
  let t = 0, e = 0, i = 0, s = 0;
  for (let r of n.state.facet(Zi)) {
    let o = r(n);
    o && (o.left != null && (t = Math.max(t, o.left)), o.right != null && (e = Math.max(e, o.right)), o.top != null && (i = Math.max(i, o.top)), o.bottom != null && (s = Math.max(s, o.bottom)));
  }
  return { left: t, right: e, top: i, bottom: s };
}
const bt = /* @__PURE__ */ w.define();
class V {
  constructor(t, e, i, s) {
    this.fromA = t, this.toA = e, this.fromB = i, this.toB = s;
  }
  join(t) {
    return new V(Math.min(this.fromA, t.fromA), Math.max(this.toA, t.toA), Math.min(this.fromB, t.fromB), Math.max(this.toB, t.toB));
  }
  addToSet(t) {
    let e = t.length, i = this;
    for (; e > 0; e--) {
      let s = t[e - 1];
      if (!(s.fromA > i.toA)) {
        if (s.toA < i.fromA)
          break;
        i = i.join(s), t.splice(e - 1, 1);
      }
    }
    return t.splice(e, 0, i), t;
  }
  // Extend a set to cover all the content in `ranges`, which is a
  // flat array with each pair of numbers representing fromB/toB
  // positions. These pairs are generated in unchanged ranges, so the
  // offset between doc A and doc B is the same for their start and
  // end points.
  static extendWithRanges(t, e) {
    if (e.length == 0)
      return t;
    let i = [];
    for (let s = 0, r = 0, o = 0; ; ) {
      let l = s < t.length ? t[s].fromB : 1e9, h = r < e.length ? e[r] : 1e9, a = Math.min(l, h);
      if (a == 1e9)
        break;
      let f = a + o, d = a, c = f;
      for (; ; )
        if (r < e.length && e[r] <= d) {
          let u = e[r + 1];
          r += 2, d = Math.max(d, u);
          for (let p = s; p < t.length && t[p].fromB <= d; p++)
            o = t[p].toA - t[p].toB;
          c = Math.max(c, u + o);
        } else if (s < t.length && t[s].fromB <= d) {
          let u = t[s++];
          d = Math.max(d, u.toB), c = Math.max(c, u.toA), o = u.toA - u.toB;
        } else
          break;
      i.push(new V(f, c, a, d));
    }
    return i;
  }
}
class Xt {
  constructor(t, e, i) {
    this.view = t, this.state = e, this.transactions = i, this.flags = 0, this.startState = t.state, this.changes = Ai.empty(this.startState.doc.length);
    for (let r of i)
      this.changes = this.changes.compose(r.changes);
    let s = [];
    this.changes.iterChangedRanges((r, o, l, h) => s.push(new V(r, o, l, h))), this.changedRanges = s;
  }
  /**
  @internal
  */
  static create(t, e, i) {
    return new Xt(t, e, i);
  }
  /**
  Tells you whether the [viewport](https://codemirror.net/6/docs/ref/#view.EditorView.viewport) or
  [visible ranges](https://codemirror.net/6/docs/ref/#view.EditorView.visibleRanges) changed in this
  update.
  */
  get viewportChanged() {
    return (this.flags & 4) > 0;
  }
  /**
  Returns true when
  [`viewportChanged`](https://codemirror.net/6/docs/ref/#view.ViewUpdate.viewportChanged) is true
  and the viewport change is not just the result of mapping it in
  response to document changes.
  */
  get viewportMoved() {
    return (this.flags & 8) > 0;
  }
  /**
  Indicates whether the height of a block element in the editor
  changed in this update.
  */
  get heightChanged() {
    return (this.flags & 2) > 0;
  }
  /**
  Returns true when the document was modified or the size of the
  editor, or elements within the editor, changed.
  */
  get geometryChanged() {
    return this.docChanged || (this.flags & 18) > 0;
  }
  /**
  True when this update indicates a focus change.
  */
  get focusChanged() {
    return (this.flags & 1) > 0;
  }
  /**
  Whether the document changed in this update.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Whether the selection was explicitly set in this update.
  */
  get selectionSet() {
    return this.transactions.some((t) => t.selection);
  }
  /**
  @internal
  */
  get empty() {
    return this.flags == 0 && this.transactions.length == 0;
  }
}
const Zs = [];
class D {
  constructor(t, e, i = 0) {
    this.dom = t, this.length = e, this.flags = i, this.parent = null, t.cmTile = this;
  }
  get breakAfter() {
    return this.flags & 1;
  }
  get children() {
    return Zs;
  }
  isWidget() {
    return !1;
  }
  get isHidden() {
    return !1;
  }
  isComposite() {
    return !1;
  }
  isLine() {
    return !1;
  }
  isText() {
    return !1;
  }
  isBlock() {
    return !1;
  }
  get domAttrs() {
    return null;
  }
  sync(t) {
    if (this.flags |= 2, this.flags & 4) {
      this.flags &= -5;
      let e = this.domAttrs;
      e && Es(this.dom, e);
    }
  }
  toString() {
    return this.constructor.name + (this.children.length ? `(${this.children})` : "") + (this.breakAfter ? "#" : "");
  }
  destroy() {
    this.parent = null;
  }
  setDOM(t) {
    this.dom = t, t.cmTile = this;
  }
  get posAtStart() {
    return this.parent ? this.parent.posBefore(this) : 0;
  }
  get posAtEnd() {
    return this.posAtStart + this.length;
  }
  posBefore(t, e = this.posAtStart) {
    let i = e;
    for (let s of this.children) {
      if (s == t)
        return i;
      i += s.length + s.breakAfter;
    }
    throw new RangeError("Invalid child in posBefore");
  }
  posAfter(t) {
    return this.posBefore(t) + t.length;
  }
  covers(t) {
    return !0;
  }
  coordsIn(t, e) {
    return null;
  }
  domPosFor(t, e) {
    let i = tt(this.dom), s = this.length ? t > 0 : e > 0;
    return new K(this.parent.dom, i + (s ? 1 : 0), t == 0 || t == this.length);
  }
  markDirty(t) {
    this.flags &= -3, t && (this.flags |= 4), this.parent && this.parent.flags & 2 && this.parent.markDirty(!1);
  }
  get overrideDOMText() {
    return null;
  }
  get root() {
    for (let t = this; t; t = t.parent)
      if (t instanceof ie)
        return t;
    return null;
  }
  static get(t) {
    return t.cmTile;
  }
}
class ee extends D {
  constructor(t) {
    super(t, 0), this._children = [];
  }
  isComposite() {
    return !0;
  }
  get children() {
    return this._children;
  }
  get lastChild() {
    return this.children.length ? this.children[this.children.length - 1] : null;
  }
  append(t) {
    this.children.push(t), t.parent = this;
  }
  sync(t) {
    if (this.flags & 2)
      return;
    super.sync(t);
    let e = this.dom, i = null, s, r = (t == null ? void 0 : t.node) == e ? t : null, o = 0;
    for (let l of this.children) {
      if (l.sync(t), o += l.length + l.breakAfter, s = i ? i.nextSibling : e.firstChild, r && s != l.dom && (r.written = !0), l.dom.parentNode == e)
        for (; s && s != l.dom; )
          s = Ue(s);
      else
        e.insertBefore(l.dom, s);
      i = l.dom;
    }
    for (s = i ? i.nextSibling : e.firstChild, r && s && (r.written = !0); s; )
      s = Ue(s);
    this.length = o;
  }
}
function Ue(n) {
  let t = n.nextSibling;
  return n.parentNode.removeChild(n), t;
}
class ie extends ee {
  constructor(t, e) {
    super(e), this.view = t;
  }
  owns(t) {
    for (; t; t = t.parent)
      if (t == this)
        return !0;
    return !1;
  }
  isBlock() {
    return !0;
  }
  nearest(t) {
    for (; ; ) {
      if (!t)
        return null;
      let e = D.get(t);
      if (e && this.owns(e))
        return e;
      t = t.parentNode;
    }
  }
  blockTiles(t) {
    for (let e = [], i = this, s = 0, r = 0; ; )
      if (s == i.children.length) {
        if (!e.length)
          return;
        i = i.parent, i.breakAfter && r++, s = e.pop();
      } else {
        let o = i.children[s++];
        if (o instanceof Z)
          e.push(s), i = o, s = 0;
        else {
          let l = r + o.length, h = t(o, r);
          if (h !== void 0)
            return h;
          r = l + o.breakAfter;
        }
      }
  }
  // Find the block at the given position. If side < -1, make sure to
  // stay before block widgets at that position, if side > 1, after
  // such widgets (used for selection drawing, which needs to be able
  // to get coordinates for positions that aren't valid cursor positions).
  resolveBlock(t, e) {
    let i, s = -1, r, o = -1;
    if (this.blockTiles((l, h) => {
      let a = h + l.length;
      if (t >= h && t <= a) {
        if (l.isWidget() && e >= -1 && e <= 1) {
          if (l.flags & 32)
            return !0;
          l.flags & 16 && (i = void 0);
        }
        (h < t || t == a && (e < -1 ? l.length : l.covers(1))) && (!i || !l.isWidget() && i.isWidget()) && (i = l, s = t - h), (a > t || t == h && (e > 1 ? l.length : l.covers(-1))) && (!r || !l.isWidget() && r.isWidget()) && (r = l, o = t - h);
      }
    }), !i && !r)
      throw new Error("No tile at position " + t);
    return i && e < 0 || !r ? { tile: i, offset: s } : { tile: r, offset: o };
  }
}
class Z extends ee {
  constructor(t, e) {
    super(t), this.wrapper = e;
  }
  isBlock() {
    return !0;
  }
  covers(t) {
    return this.children.length ? t < 0 ? this.children[0].covers(-1) : this.lastChild.covers(1) : !1;
  }
  get domAttrs() {
    return this.wrapper.attributes;
  }
  static of(t, e) {
    let i = new Z(e || document.createElement(t.tagName), t);
    return e || (i.flags |= 4), i;
  }
}
class ut extends ee {
  constructor(t, e) {
    super(t), this.attrs = e;
  }
  isLine() {
    return !0;
  }
  static start(t, e, i) {
    let s = new ut(e || document.createElement("div"), t);
    return (!e || !i) && (s.flags |= 4), s;
  }
  get domAttrs() {
    return this.attrs;
  }
  // Find the tile associated with a given position in this line.
  resolveInline(t, e, i) {
    let s = null, r = -1, o = null, l = -1;
    function h(f, d) {
      for (let c = 0, u = 0; c < f.children.length && u <= d; c++) {
        let p = f.children[c], g = u + p.length;
        g >= d && (p.isComposite() ? h(p, d - u) : (!o || o.isHidden && (e > 0 || i && en(o, p))) && (g > d || p.flags & 32) ? (o = p, l = d - u) : (u < d || p.flags & 16 && !p.isHidden) && (s = p, r = d - u)), u = g;
      }
    }
    h(this, t);
    let a = (e < 0 ? s : o) || s || o;
    return a ? { tile: a, offset: a == s ? r : l } : null;
  }
  coordsIn(t, e) {
    let i = this.resolveInline(t, e, !0);
    return i ? i.tile.coordsIn(Math.max(0, i.offset), e) : tn(this);
  }
  domIn(t, e) {
    let i = this.resolveInline(t, e);
    if (i) {
      let { tile: s, offset: r } = i;
      if (this.dom.contains(s.dom))
        return s.isText() ? new K(s.dom, Math.min(s.dom.nodeValue.length, r)) : s.domPosFor(r, s.flags & 16 ? 1 : s.flags & 32 ? -1 : e);
      let o = i.tile.parent, l = !1;
      for (let h of o.children) {
        if (l)
          return new K(h.dom, 0);
        h == i.tile && (l = !0);
      }
    }
    return new K(this.dom, 0);
  }
}
function tn(n) {
  let t = n.dom.lastChild;
  if (!t)
    return n.dom.getBoundingClientRect();
  let e = Kt(t);
  return e[e.length - 1] || null;
}
function en(n, t) {
  let e = n.coordsIn(0, 1), i = t.coordsIn(0, 1);
  return e && i && i.top < e.bottom;
}
class H extends ee {
  constructor(t, e) {
    super(t), this.mark = e;
  }
  get domAttrs() {
    return this.mark.attrs;
  }
  static of(t, e) {
    let i = new H(e || document.createElement(t.tagName), t);
    return e || (i.flags |= 4), i;
  }
}
class it extends D {
  constructor(t, e) {
    super(t, e.length), this.text = e;
  }
  sync(t) {
    this.flags & 2 || (super.sync(t), this.dom.nodeValue != this.text && (t && t.node == this.dom && (t.written = !0), this.dom.nodeValue = this.text));
  }
  isText() {
    return !0;
  }
  toString() {
    return JSON.stringify(this.text);
  }
  coordsIn(t, e) {
    let i = this.dom.nodeValue.length;
    t > i && (t = i);
    let s = t, r = t, o = 0;
    t == 0 && e < 0 || t == i && e >= 0 ? y.chrome || y.gecko || (t ? (s--, o = 1) : r < i && (r++, o = -1)) : e < 0 ? s-- : r < i && r++;
    let l = At(this.dom, s, r).getClientRects();
    if (!l.length)
      return null;
    let h = l[(o ? o < 0 : e >= 0) ? 0 : l.length - 1];
    return y.safari && !o && h.width == 0 && (h = Array.prototype.find.call(l, (a) => a.width) || h), o ? Yt(h, o < 0) : h || null;
  }
  static of(t, e) {
    let i = new it(e || document.createTextNode(t), t);
    return e || (i.flags |= 2), i;
  }
}
class pt extends D {
  constructor(t, e, i, s) {
    super(t, e, s), this.widget = i;
  }
  isWidget() {
    return !0;
  }
  get isHidden() {
    return this.widget.isHidden;
  }
  covers(t) {
    return this.flags & 48 ? !1 : (this.flags & (t < 0 ? 64 : 128)) > 0;
  }
  coordsIn(t, e) {
    return this.coordsInWidget(t, e, !1);
  }
  coordsInWidget(t, e, i) {
    let s = this.widget.coordsAt(this.dom, t, e);
    if (s)
      return s;
    if (i)
      return Yt(this.dom.getBoundingClientRect(), this.length ? t == 0 : e <= 0);
    {
      let r = this.dom.getClientRects(), o = null;
      if (!r.length)
        return null;
      let l = this.flags & 16 ? !0 : this.flags & 32 ? !1 : t > 0;
      for (let h = l ? r.length - 1 : 0; o = r[h], !(t > 0 ? h == 0 : h == r.length - 1 || o.top < o.bottom); h += l ? -1 : 1)
        ;
      return Yt(o, !l);
    }
  }
  get overrideDOMText() {
    if (!this.length)
      return q.empty;
    let { root: t } = this;
    if (!t)
      return q.empty;
    let e = this.posAtStart;
    return t.view.state.doc.slice(e, e + this.length);
  }
  destroy() {
    super.destroy(), this.widget.destroy(this.dom);
  }
  static of(t, e, i, s, r) {
    return r || (r = t.toDOM(e), t.editable || (r.contentEditable = "false")), new pt(r, i, t, s);
  }
}
class Ut extends D {
  constructor(t) {
    let e = document.createElement("img");
    e.className = "cm-widgetBuffer", e.setAttribute("aria-hidden", "true"), super(e, 0, t);
  }
  get isHidden() {
    return !1;
  }
  get overrideDOMText() {
    return q.empty;
  }
  coordsIn(t) {
    return this.dom.getBoundingClientRect();
  }
}
class sn {
  constructor(t) {
    this.index = 0, this.beforeBreak = !1, this.parents = [], this.tile = t;
  }
  // Advance by the given distance. If side is -1, stop leaving or
  // entering tiles, or skipping zero-length tiles, once the distance
  // has been traversed. When side is 1, leave, enter, or skip
  // everything at the end position.
  advance(t, e, i) {
    let { tile: s, index: r, beforeBreak: o, parents: l } = this;
    for (; t || e > 0; )
      if (s.isComposite())
        if (o) {
          if (!t)
            break;
          i && i.break(), t--, o = !1;
        } else if (r == s.children.length) {
          if (!t && !l.length)
            break;
          i && i.leave(s), o = !!s.breakAfter, { tile: s, index: r } = l.pop(), r++;
        } else {
          let h = s.children[r], a = h.breakAfter;
          (e > 0 ? h.length <= t : h.length < t) && (!i || i.skip(h, 0, h.length) !== !1 || !h.isComposite) ? (o = !!a, r++, t -= h.length) : (l.push({ tile: s, index: r }), s = h, r = 0, i && h.isComposite() && i.enter(h));
        }
      else if (r == s.length)
        o = !!s.breakAfter, { tile: s, index: r } = l.pop(), r++;
      else if (t) {
        let h = Math.min(t, s.length - r);
        i && i.skip(s, r, r + h), t -= h, r += h;
      } else
        break;
    return this.tile = s, this.index = r, this.beforeBreak = o, this;
  }
  get root() {
    return this.parents.length ? this.parents[0].tile : this.tile;
  }
}
class nn {
  constructor(t, e, i, s) {
    this.from = t, this.to = e, this.wrapper = i, this.rank = s;
  }
}
class rn {
  constructor(t, e, i) {
    this.cache = t, this.root = e, this.blockWrappers = i, this.curLine = null, this.lastBlock = null, this.afterWidget = null, this.pos = 0, this.wrappers = [], this.wrapperPos = 0;
  }
  addText(t, e, i, s) {
    var r;
    this.flushBuffer();
    let o = this.ensureMarks(e, i), l = o.lastChild;
    if (l && l.isText() && !(l.flags & 8)) {
      this.cache.reused.set(
        l,
        2
        /* Reused.DOM */
      );
      let h = o.children[o.children.length - 1] = new it(l.dom, l.text + t);
      h.parent = o;
    } else
      o.append(s || it.of(t, (r = this.cache.find(it)) === null || r === void 0 ? void 0 : r.dom));
    this.pos += t.length, this.afterWidget = null;
  }
  addComposition(t, e) {
    let i = this.curLine;
    i.dom != e.line.dom && (i.setDOM(this.cache.reused.has(e.line) ? oe(e.line.dom) : e.line.dom), this.cache.reused.set(
      e.line,
      2
      /* Reused.DOM */
    ));
    let s = i;
    for (let o = e.marks.length - 1; o >= 0; o--) {
      let l = e.marks[o], h = s.lastChild;
      if (h instanceof H && h.mark.eq(l.mark))
        h.dom != l.dom && h.setDOM(oe(l.dom)), s = h;
      else {
        if (this.cache.reused.get(l)) {
          let f = D.get(l.dom);
          f && f.setDOM(oe(l.dom));
        }
        let a = H.of(l.mark, l.dom);
        s.append(a), s = a;
      }
      this.cache.reused.set(
        l,
        2
        /* Reused.DOM */
      );
    }
    let r = new it(t.text, t.text.nodeValue);
    r.flags |= 8, s.append(r);
  }
  addInlineWidget(t, e, i) {
    let s = this.afterWidget && t.flags & 48 && (this.afterWidget.flags & 48) == (t.flags & 48);
    s || this.flushBuffer();
    let r = this.ensureMarks(e, i);
    !s && !(t.flags & 16) && r.append(this.getBuffer(1)), r.append(t), this.pos += t.length, this.afterWidget = t;
  }
  addMark(t, e, i) {
    this.flushBuffer(), this.ensureMarks(e, i).append(t), this.pos += t.length, this.afterWidget = null;
  }
  addBlockWidget(t) {
    this.getBlockPos().append(t), this.pos += t.length, this.lastBlock = t, this.endLine();
  }
  continueWidget(t) {
    let e = this.afterWidget || this.lastBlock;
    e.length += t, this.pos += t;
  }
  addLineStart(t, e) {
    var i;
    t || (t = es);
    let s = ut.start(t, e || ((i = this.cache.find(ut)) === null || i === void 0 ? void 0 : i.dom), !!e);
    this.getBlockPos().append(this.lastBlock = this.curLine = s);
  }
  addLine(t) {
    this.getBlockPos().append(t), this.pos += t.length, this.lastBlock = t, this.endLine();
  }
  addBreak() {
    this.lastBlock.flags |= 1, this.endLine(), this.pos++;
  }
  addLineStartIfNotCovered(t) {
    this.blockPosCovered() || this.addLineStart(t);
  }
  ensureLine(t) {
    this.curLine || this.addLineStart(t);
  }
  ensureMarks(t, e) {
    var i;
    let s = this.curLine;
    for (let r = t.length - 1; r >= 0; r--) {
      let o = t[r], l;
      if (e > 0 && (l = s.lastChild) && l instanceof H && l.mark.eq(o))
        s = l, e--;
      else {
        let h = H.of(o, (i = this.cache.find(H, (a) => a.mark.eq(o))) === null || i === void 0 ? void 0 : i.dom);
        s.append(h), s = h, e = 0;
      }
    }
    return s;
  }
  endLine() {
    if (this.curLine) {
      this.flushBuffer();
      let t = this.curLine.lastChild;
      (!t || !$e(this.curLine, !1) || t.dom.nodeName != "BR" && t.isWidget() && !(y.ios && $e(this.curLine, !0))) && this.curLine.append(this.cache.findWidget(
        le,
        0,
        32
        /* TileFlag.After */
      ) || new pt(
        le.toDOM(),
        0,
        le,
        32
        /* TileFlag.After */
      )), this.curLine = this.afterWidget = null;
    }
  }
  updateBlockWrappers() {
    this.wrapperPos > this.pos + 1e4 && (this.blockWrappers.goto(this.pos), this.wrappers.length = 0);
    for (let t = this.wrappers.length - 1; t >= 0; t--)
      this.wrappers[t].to < this.pos && this.wrappers.splice(t, 1);
    for (let t = this.blockWrappers; t.value && t.from <= this.pos; t.next())
      if (t.to >= this.pos) {
        let e = new nn(t.from, t.to, t.value, t.rank), i = this.wrappers.length;
        for (; i > 0 && (this.wrappers[i - 1].rank - e.rank || this.wrappers[i - 1].to - e.to) < 0; )
          i--;
        this.wrappers.splice(i, 0, e);
      }
    this.wrapperPos = this.pos;
  }
  getBlockPos() {
    var t;
    this.updateBlockWrappers();
    let e = this.root;
    for (let i of this.wrappers) {
      let s = e.lastChild;
      if (i.from < this.pos && s instanceof Z && s.wrapper.eq(i.wrapper))
        e = s;
      else {
        let r = Z.of(i.wrapper, (t = this.cache.find(Z, (o) => o.wrapper.eq(i.wrapper))) === null || t === void 0 ? void 0 : t.dom);
        e.append(r), e = r;
      }
    }
    return e;
  }
  blockPosCovered() {
    let t = this.lastBlock;
    return t != null && !t.breakAfter && (!t.isWidget() || (t.flags & 160) > 0);
  }
  getBuffer(t) {
    let e = 2 | (t < 0 ? 16 : 32), i = this.cache.find(
      Ut,
      void 0,
      1
      /* Reused.Full */
    );
    return i && (i.flags = e), i || new Ut(e);
  }
  flushBuffer() {
    this.afterWidget && !(this.afterWidget.flags & 32) && (this.afterWidget.parent.append(this.getBuffer(-1)), this.afterWidget = null);
  }
}
class on {
  constructor(t) {
    this.skipCount = 0, this.text = "", this.textOff = 0, this.cursor = t.iter();
  }
  skip(t) {
    this.textOff + t <= this.text.length ? this.textOff += t : (this.skipCount += t - (this.text.length - this.textOff), this.text = "", this.textOff = 0);
  }
  next(t) {
    if (this.textOff == this.text.length) {
      let { value: s, lineBreak: r, done: o } = this.cursor.next(this.skipCount);
      if (this.skipCount = 0, o)
        throw new Error("Ran out of text content when drawing inline views");
      this.text = s;
      let l = this.textOff = Math.min(t, s.length);
      return r ? null : s.slice(0, l);
    }
    let e = Math.min(this.text.length, this.textOff + t), i = this.text.slice(this.textOff, e);
    return this.textOff = e, i;
  }
}
const $t = [pt, ut, it, H, Ut, Z, ie];
for (let n = 0; n < $t.length; n++)
  $t[n].bucket = n;
class ln {
  constructor(t) {
    this.view = t, this.buckets = $t.map(() => []), this.index = $t.map(() => 0), this.reused = /* @__PURE__ */ new Map();
  }
  // Put a tile in the cache.
  add(t) {
    let e = t.constructor.bucket, i = this.buckets[e];
    i.length < 6 ? i.push(t) : i[
      this.index[e] = (this.index[e] + 1) % 6
      /* C.Bucket */
    ] = t;
  }
  find(t, e, i = 2) {
    let s = t.bucket, r = this.buckets[s], o = this.index[s];
    for (let l = r.length - 1; l >= 0; l--) {
      let h = (l + o) % r.length, a = r[h];
      if ((!e || e(a)) && !this.reused.has(a))
        return r.splice(h, 1), h < o && this.index[s]--, this.reused.set(a, i), a;
    }
    return null;
  }
  findWidget(t, e, i) {
    let s = this.buckets[0];
    if (s.length)
      for (let r = 0, o = 0; ; r++) {
        if (r == s.length) {
          if (o)
            return null;
          o = 1, r = 0;
        }
        let l = s[r];
        if (!this.reused.has(l) && (o == 0 ? l.widget.compare(t) : l.widget.constructor == t.constructor && t.updateDOM(l.dom, this.view)))
          return s.splice(r, 1), r < this.index[0] && this.index[0]--, this.reused.set(
            l,
            1
            /* Reused.Full */
          ), l.length = e, l.flags = l.flags & -498 | i, l;
      }
  }
  reuse(t) {
    return this.reused.set(
      t,
      1
      /* Reused.Full */
    ), t;
  }
  maybeReuse(t, e = 2) {
    if (!this.reused.has(t))
      return this.reused.set(t, e), t.dom;
  }
}
class hn {
  constructor(t, e, i, s, r) {
    this.view = t, this.decorations = s, this.disallowBlockEffectsFor = r, this.openWidget = !1, this.openMarks = 0, this.cache = new ln(t), this.text = new on(t.state.doc), this.builder = new rn(this.cache, new ie(t, t.contentDOM), R.iter(i)), this.cache.reused.set(
      e,
      2
      /* Reused.DOM */
    ), this.old = new sn(e);
  }
  run(t, e) {
    let i = e && this.getCompositionContext(e.text);
    for (let s = 0, r = 0, o = 0; ; ) {
      let l = o < t.length ? t[o++] : null, h = l ? l.fromA : this.old.root.length;
      if (h > s) {
        let a = h - s;
        this.preserve(a, !o, !l), s = h, r += a;
      }
      if (!l)
        break;
      this.forward(l.fromA, l.toA), e && l.fromA <= e.range.fromA && l.toA >= e.range.toA ? (this.emit(r, e.range.fromB), this.builder.addComposition(e, i), this.emit(e.range.toB, l.toB)) : this.emit(r, l.toB), r = l.toB, s = l.toA;
    }
    return this.builder.curLine && this.builder.endLine(), this.builder.root;
  }
  preserve(t, e, i) {
    let s = cn(this.old), r = this.openMarks;
    this.old.advance(t, i ? 1 : -1, {
      skip: (o, l, h) => {
        if (o.isWidget())
          if (this.openWidget)
            this.builder.continueWidget(h - l);
          else {
            let a = h > 0 || l < o.length ? pt.of(o.widget, this.view, h - l, o.flags & 496, this.cache.maybeReuse(o)) : this.cache.reuse(o);
            a.flags & 256 ? (a.flags &= -2, this.builder.addBlockWidget(a)) : (this.builder.ensureLine(null), this.builder.addInlineWidget(a, s, r), r = s.length);
          }
        else if (o.isText())
          this.builder.ensureLine(null), !l && h == o.length ? this.builder.addText(o.text, s, r, this.cache.reuse(o)) : (this.cache.add(o), this.builder.addText(o.text.slice(l, h), s, r)), r = s.length;
        else if (o.isLine())
          o.flags &= -2, this.cache.reused.set(
            o,
            1
            /* Reused.Full */
          ), this.builder.addLine(o);
        else if (o instanceof Ut)
          this.cache.add(o);
        else if (o instanceof H)
          this.builder.ensureLine(null), this.builder.addMark(o, s, r), this.cache.reused.set(
            o,
            1
            /* Reused.Full */
          ), r = s.length;
        else
          return !1;
        this.openWidget = !1;
      },
      enter: (o) => {
        o.isLine() ? this.builder.addLineStart(o.attrs, this.cache.maybeReuse(o)) : (this.cache.add(o), o instanceof H && s.unshift(o.mark)), this.openWidget = !1;
      },
      leave: (o) => {
        o.isLine() ? s.length && (s.length = r = 0) : o instanceof H && (s.shift(), r = Math.min(r, s.length));
      },
      break: () => {
        this.builder.addBreak(), this.openWidget = !1;
      }
    }), this.text.skip(t);
  }
  emit(t, e) {
    let i = null, s = this.builder, r = 0, o = R.spans(this.decorations, t, e, {
      point: (l, h, a, f, d, c) => {
        if (a instanceof st) {
          if (this.disallowBlockEffectsFor[c]) {
            if (a.block)
              throw new RangeError("Block decorations may not be specified via plugins");
            if (h > this.view.state.doc.lineAt(l).to)
              throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
          }
          if (r = f.length, d > f.length)
            s.continueWidget(h - l);
          else {
            let u = a.widget || (a.block ? gt.block : gt.inline), p = an(a), g = this.cache.findWidget(u, h - l, p) || pt.of(u, this.view, h - l, p);
            a.block ? (a.startSide > 0 && s.addLineStartIfNotCovered(i), s.addBlockWidget(g)) : (s.ensureLine(i), s.addInlineWidget(g, f, d));
          }
          i = null;
        } else
          i = fn(i, a);
        h > l && this.text.skip(h - l);
      },
      span: (l, h, a, f) => {
        for (let d = l; d < h; ) {
          let c = this.text.next(Math.min(512, h - d));
          c == null ? (s.addLineStartIfNotCovered(i), s.addBreak(), d++) : (s.ensureLine(i), s.addText(c, a, f), d += c.length), i = null;
        }
      }
    });
    s.addLineStartIfNotCovered(i), this.openWidget = o > r, this.openMarks = o;
  }
  forward(t, e) {
    this.old.advance(e - t, 1, {
      skip: (i, s, r) => {
        (i.isText() || r == i.length) && this.cache.add(i);
      },
      enter: (i) => this.cache.add(i),
      leave: () => {
      },
      break: () => {
      }
    });
  }
  getCompositionContext(t) {
    let e = [], i = null;
    for (let s = t.parentNode; ; s = s.parentNode) {
      let r = D.get(s);
      if (s == this.view.contentDOM)
        break;
      r instanceof H ? e.push(r) : r != null && r.isLine() ? i = r : s.nodeName == "DIV" && !i && s != this.view.contentDOM ? i = new ut(s, es) : e.push(H.of(new Tt({ tagName: s.nodeName.toLowerCase(), attributes: Ws(s) }), s));
    }
    return { line: i, marks: e };
  }
}
function $e(n, t) {
  let e = (i) => {
    for (let s of i.children)
      if ((t ? s.isText() : s.length) || e(s))
        return !0;
    return !1;
  };
  return e(n);
}
function an(n) {
  let t = n.isReplace ? (n.startSide < 0 ? 64 : 0) | (n.endSide > 0 ? 128 : 0) : n.startSide > 0 ? 32 : 16;
  return n.block && (t |= 256), t;
}
const es = { class: "cm-line" };
function fn(n, t) {
  let e = t.spec.attributes, i = t.spec.class;
  return !e && !i || (n || (n = { class: "cm-line" }), e && We(e, n), i && (n.class += " " + i)), n;
}
function cn(n) {
  let t = [];
  for (let e = n.parents.length; e > 1; e--) {
    let i = e == n.parents.length ? n.tile : n.parents[e].tile;
    i instanceof H && t.push(i.mark);
  }
  return t;
}
function oe(n) {
  let t = D.get(n);
  return t && t.setDOM(n.cloneNode()), n;
}
class gt extends te {
  constructor(t) {
    super(), this.tag = t;
  }
  eq(t) {
    return t.tag == this.tag;
  }
  toDOM() {
    return document.createElement(this.tag);
  }
  updateDOM(t) {
    return t.nodeName.toLowerCase() == this.tag;
  }
  get isHidden() {
    return !0;
  }
}
gt.inline = /* @__PURE__ */ new gt("span");
gt.block = /* @__PURE__ */ new gt("div");
const le = /* @__PURE__ */ new class extends te {
  toDOM() {
    return document.createElement("br");
  }
  get isHidden() {
    return !0;
  }
  get editable() {
    return !0;
  }
}();
class Qe {
  constructor(t) {
    this.view = t, this.decorations = [], this.blockWrappers = [], this.dynamicDecorationMap = [!1], this.domChanged = null, this.hasComposition = null, this.editContextFormatting = N.none, this.lastCompositionAfterCursor = !1, this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = !1, this.lastUpdate = Date.now(), this.updateDeco(), this.tile = new ie(t, t.contentDOM), this.updateInner([new V(0, 0, 0, t.state.doc.length)], null);
  }
  // Update the document view to a given state.
  update(t) {
    var e;
    let i = t.changedRanges;
    this.minWidth > 0 && i.length && (i.every(({ fromA: f, toA: d }) => d < this.minWidthFrom || f > this.minWidthTo) ? (this.minWidthFrom = t.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = t.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.updateEditContextFormatting(t);
    let s = -1;
    this.view.inputState.composing >= 0 && !this.view.observer.editContext && (!((e = this.domChanged) === null || e === void 0) && e.newSel ? s = this.domChanged.newSel.head : !wn(t.changes, this.hasComposition) && !t.selectionSet && (s = t.state.selection.main.head));
    let r = s > -1 ? un(this.view, t.changes, s) : null;
    if (this.domChanged = null, this.hasComposition) {
      let { from: f, to: d } = this.hasComposition;
      i = new V(f, d, t.changes.mapPos(f, -1), t.changes.mapPos(d, 1)).addToSet(i.slice());
    }
    this.hasComposition = r ? { from: r.range.fromB, to: r.range.toB } : null, (y.ie || y.chrome) && !r && t && t.state.doc.lines != t.startState.doc.lines && (this.forceSelection = !0);
    let o = this.decorations, l = this.blockWrappers;
    this.updateDeco();
    let h = mn(o, this.decorations, t.changes);
    h.length && (i = V.extendWithRanges(i, h));
    let a = yn(l, this.blockWrappers, t.changes);
    return a.length && (i = V.extendWithRanges(i, a)), r && !i.some((f) => f.fromA <= r.range.fromA && f.toA >= r.range.toA) && (i = r.range.addToSet(i.slice())), this.tile.flags & 2 && i.length == 0 ? !1 : (this.updateInner(i, r), t.transactions.length && (this.lastUpdate = Date.now()), !0);
  }
  // Used by update and the constructor do perform the actual DOM
  // update
  updateInner(t, e) {
    this.view.viewState.mustMeasureContent = !0;
    let { observer: i } = this.view;
    i.ignore(() => {
      if (e || t.length) {
        let o = this.tile, l = new hn(this.view, o, this.blockWrappers, this.decorations, this.dynamicDecorationMap);
        this.tile = l.run(t, e), ke(o, l.cache.reused);
      }
      this.tile.dom.style.height = this.view.viewState.contentHeight / this.view.scaleY + "px", this.tile.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
      let r = y.chrome || y.ios ? { node: i.selectionRange.focusNode, written: !1 } : void 0;
      this.tile.sync(r), r && (r.written || i.selectionRange.focusNode != r.node || !this.tile.dom.contains(r.node)) && (this.forceSelection = !0), this.tile.dom.style.height = "";
    });
    let s = [];
    if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length)
      for (let r of this.tile.children)
        r.isWidget() && r.widget instanceof he && s.push(r.dom);
    i.updateGaps(s);
  }
  updateEditContextFormatting(t) {
    this.editContextFormatting = this.editContextFormatting.map(t.changes);
    for (let e of t.transactions)
      for (let i of e.effects)
        i.is(Xi) && (this.editContextFormatting = i.value);
  }
  // Sync the DOM selection to this.state.selection
  updateSelection(t = !1, e = !1) {
    (t || !this.view.observer.selectionRange.focusNode) && this.view.observer.readSelectionRange();
    let { dom: i } = this.tile, s = this.view.root.activeElement, r = s == i, o = !r && !(this.view.state.facet(Y) || i.tabIndex > -1) && zt(i, this.view.observer.selectionRange) && !(s && i.contains(s));
    if (!(r || e || o))
      return;
    let l = this.forceSelection;
    this.forceSelection = !1;
    let h = this.view.state.selection.main, a, f;
    if (h.empty ? f = a = this.inlineDOMNearPos(h.anchor, h.assoc || 1) : (f = this.inlineDOMNearPos(h.head, h.head == h.from ? 1 : -1), a = this.inlineDOMNearPos(h.anchor, h.anchor == h.from ? 1 : -1)), y.gecko && h.empty && !this.hasComposition && dn(a)) {
      let c = document.createTextNode("");
      this.view.observer.ignore(() => a.node.insertBefore(c, a.node.childNodes[a.offset] || null)), a = f = new K(c, 0), l = !0;
    }
    let d = this.view.observer.selectionRange;
    (l || !d.focusNode || (!Ct(a.node, a.offset, d.anchorNode, d.anchorOffset) || !Ct(f.node, f.offset, d.focusNode, d.focusOffset)) && !this.suppressWidgetCursorChange(d, h)) && (this.view.observer.ignore(() => {
      y.android && y.chrome && i.contains(d.focusNode) && xn(d.focusNode, i) && (i.blur(), i.focus({ preventScroll: !0 }));
      let c = Mt(this.view.root);
      if (c) if (h.empty) {
        if (y.gecko) {
          let u = pn(a.node, a.offset);
          if (u && u != 3) {
            let p = (u == 1 ? Ei : Wi)(a.node, a.offset);
            p && (a = new K(p.node, p.offset));
          }
        }
        c.collapse(a.node, a.offset), h.bidiLevel != null && c.caretBidiLevel !== void 0 && (c.caretBidiLevel = h.bidiLevel);
      } else if (c.extend) {
        c.collapse(a.node, a.offset);
        try {
          c.extend(f.node, f.offset);
        } catch {
        }
      } else {
        let u = document.createRange();
        h.anchor > h.head && ([a, f] = [f, a]), u.setEnd(f.node, f.offset), u.setStart(a.node, a.offset), c.removeAllRanges(), c.addRange(u);
      }
      o && this.view.root.activeElement == i && (i.blur(), s && s.focus());
    }), this.view.observer.setSelectionRange(a, f)), this.impreciseAnchor = a.precise ? null : new K(d.anchorNode, d.anchorOffset), this.impreciseHead = f.precise ? null : new K(d.focusNode, d.focusOffset);
  }
  // If a zero-length widget is inserted next to the cursor during
  // composition, avoid moving it across it and disrupting the
  // composition.
  suppressWidgetCursorChange(t, e) {
    return this.hasComposition && e.empty && Ct(t.focusNode, t.focusOffset, t.anchorNode, t.anchorOffset) && this.posFromDOM(t.focusNode, t.focusOffset) == e.head;
  }
  enforceCursorAssoc() {
    if (this.hasComposition)
      return;
    let { view: t } = this, e = t.state.selection.main, i = Mt(t.root), { anchorNode: s, anchorOffset: r } = t.observer.selectionRange;
    if (!i || !e.empty || !e.assoc || !i.modify)
      return;
    let o = this.lineAt(e.head, e.assoc);
    if (!o)
      return;
    let l = o.posAtStart;
    if (e.head == l || e.head == l + o.length)
      return;
    let h = this.coordsAt(e.head, -1), a = this.coordsAt(e.head, 1);
    if (!h || !a || h.bottom > a.top)
      return;
    let f = this.domAtPos(e.head + e.assoc, e.assoc);
    i.collapse(f.node, f.offset), i.modify("move", e.assoc < 0 ? "forward" : "backward", "lineboundary"), t.observer.readSelectionRange();
    let d = t.observer.selectionRange;
    t.docView.posFromDOM(d.anchorNode, d.anchorOffset) != e.from && i.collapse(s, r);
  }
  posFromDOM(t, e) {
    let i = this.tile.nearest(t);
    if (!i)
      return this.tile.dom.compareDocumentPosition(t) & 2 ? 0 : this.view.state.doc.length;
    let s = i.posAtStart;
    if (i.isComposite()) {
      let r;
      if (t == i.dom)
        r = i.dom.childNodes[e];
      else {
        let o = $(t) == 0 ? 0 : e == 0 ? -1 : 1;
        for (; ; ) {
          let l = t.parentNode;
          if (l == i.dom)
            break;
          o == 0 && l.firstChild != l.lastChild && (t == l.firstChild ? o = -1 : o = 1), t = l;
        }
        o < 0 ? r = t : r = t.nextSibling;
      }
      if (r == i.dom.firstChild)
        return s;
      for (; r && !D.get(r); )
        r = r.nextSibling;
      if (!r)
        return s + i.length;
      for (let o = 0, l = s; ; o++) {
        let h = i.children[o];
        if (h.dom == r)
          return l;
        l += h.length + h.breakAfter;
      }
    } else return i.isText() ? t == i.dom ? s + e : s + (e ? i.length : 0) : s;
  }
  domAtPos(t, e) {
    let { tile: i, offset: s } = this.tile.resolveBlock(t, e);
    return i.isWidget() ? i.domPosFor(t, e) : i.domIn(s, e);
  }
  inlineDOMNearPos(t, e) {
    let i, s = -1, r = !1, o, l = -1, h = !1;
    return this.tile.blockTiles((a, f) => {
      if (a.isWidget()) {
        if (a.flags & 32 && f >= t)
          return !0;
        a.flags & 16 && (r = !0);
      } else {
        let d = f + a.length;
        if (f <= t && (i = a, s = t - f, r = d < t), d >= t && !o && (o = a, l = t - f, h = f > t), f > t && o)
          return !0;
      }
    }), !i && !o ? this.domAtPos(t, e) : (r && o ? i = null : h && i && (o = null), i && e < 0 || !o ? i.domIn(s, e) : o.domIn(l, e));
  }
  coordsAt(t, e) {
    let { tile: i, offset: s } = this.tile.resolveBlock(t, e);
    return i.isWidget() ? i.widget instanceof he ? null : i.coordsInWidget(s, e, !0) : i.coordsIn(s, e);
  }
  lineAt(t, e) {
    let { tile: i } = this.tile.resolveBlock(t, e);
    return i.isLine() ? i : null;
  }
  coordsForChar(t) {
    let { tile: e, offset: i } = this.tile.resolveBlock(t, 1);
    if (!e.isLine())
      return null;
    function s(r, o) {
      if (r.isComposite())
        for (let l of r.children) {
          if (l.length >= o) {
            let h = s(l, o);
            if (h)
              return h;
          }
          if (o -= l.length, o < 0)
            break;
        }
      else if (r.isText() && o < r.length) {
        let l = J(r.text, o);
        if (l == o)
          return null;
        let h = At(r.dom, o, l).getClientRects();
        for (let a = 0; a < h.length; a++) {
          let f = h[a];
          if (a == h.length - 1 || f.top < f.bottom && f.left < f.right)
            return f;
        }
      }
      return null;
    }
    return s(e, i);
  }
  measureVisibleLineHeights(t) {
    let e = [], { from: i, to: s } = t, r = this.view.contentDOM.clientWidth, o = r > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, l = -1, h = this.view.textDirection == O.LTR, a = 0, f = (d, c, u) => {
      for (let p = 0; p < d.children.length && !(c > s); p++) {
        let g = d.children[p], m = c + g.length, b = g.dom.getBoundingClientRect(), { height: x } = b;
        if (u && !p && (a += b.top - u.top), g instanceof Z)
          m > i && f(g, c, b);
        else if (c >= i && (a > 0 && e.push(-a), e.push(x + a), a = 0, o)) {
          let v = g.dom.lastChild, A = v ? Kt(v) : [];
          if (A.length) {
            let B = A[A.length - 1], T = h ? B.right - b.left : b.right - B.left;
            T > l && (l = T, this.minWidth = r, this.minWidthFrom = c, this.minWidthTo = m);
          }
        }
        u && p == d.children.length - 1 && (a += u.bottom - b.bottom), c = m + g.breakAfter;
      }
    };
    return f(this.tile, 0, null), e;
  }
  textDirectionAt(t) {
    let { tile: e } = this.tile.resolveBlock(t, 1);
    return getComputedStyle(e.dom).direction == "rtl" ? O.RTL : O.LTR;
  }
  measureTextSize() {
    let t = this.tile.blockTiles((o) => {
      if (o.isLine() && o.children.length && o.length <= 20) {
        let l = 0, h;
        for (let a of o.children) {
          if (!a.isText() || /[^ -~]/.test(a.text))
            return;
          let f = Kt(a.dom);
          if (f.length != 1)
            return;
          l += f[0].width, h = f[0].height;
        }
        if (l)
          return {
            lineHeight: o.dom.getBoundingClientRect().height,
            charWidth: l / o.length,
            textHeight: h
          };
      }
    });
    if (t)
      return t;
    let e = document.createElement("div"), i, s, r;
    return e.className = "cm-line", e.style.width = "99999px", e.style.position = "absolute", e.textContent = "abc def ghi jkl mno pqr stu", this.view.observer.ignore(() => {
      this.tile.dom.appendChild(e);
      let o = Kt(e.firstChild)[0];
      i = e.getBoundingClientRect().height, s = o && o.width ? o.width / 27 : 7, r = o && o.height ? o.height : i, e.remove();
    }), { lineHeight: i, charWidth: s, textHeight: r };
  }
  computeBlockGapDeco() {
    let t = [], e = this.view.viewState;
    for (let i = 0, s = 0; ; s++) {
      let r = s == e.viewports.length ? null : e.viewports[s], o = r ? r.from - 1 : this.view.state.doc.length;
      if (o > i) {
        let l = (e.lineBlockAt(o).bottom - e.lineBlockAt(i).top) / this.view.scaleY;
        t.push(N.replace({
          widget: new he(l),
          block: !0,
          inclusive: !0,
          isBlockGap: !0
        }).range(i, o));
      }
      if (!r)
        break;
      i = r.to + 1;
    }
    return N.set(t);
  }
  updateDeco() {
    let t = 1, e = this.view.state.facet(Dt).map((r) => (this.dynamicDecorationMap[t++] = typeof r == "function") ? r(this.view) : r), i = !1, s = this.view.state.facet(Qi).map((r, o) => {
      let l = typeof r == "function";
      return l && (i = !0), l ? r(this.view) : r;
    });
    for (s.length && (this.dynamicDecorationMap[t++] = i, e.push(R.join(s))), this.decorations = [
      this.editContextFormatting,
      ...e,
      this.computeBlockGapDeco(),
      this.view.viewState.lineGapDeco
    ]; t < this.decorations.length; )
      this.dynamicDecorationMap[t++] = !1;
    this.blockWrappers = this.view.state.facet($i).map((r) => typeof r == "function" ? r(this.view) : r);
  }
  scrollIntoView(t) {
    if (t.isSnapshot) {
      let a = this.view.viewState.lineBlockAt(t.range.head);
      this.view.scrollDOM.scrollTop = a.top - t.yMargin, this.view.scrollDOM.scrollLeft = t.xMargin;
      return;
    }
    for (let a of this.view.state.facet(Yi))
      try {
        if (a(this.view, t.range, t))
          return !0;
      } catch (f) {
        U(this.view.state, f, "scroll handler");
      }
    let { range: e } = t, i = this.coordsAt(e.head, e.empty ? e.assoc : e.head > e.anchor ? -1 : 1), s;
    if (!i)
      return;
    !e.empty && (s = this.coordsAt(e.anchor, e.anchor > e.head ? -1 : 1)) && (i = {
      left: Math.min(i.left, s.left),
      top: Math.min(i.top, s.top),
      right: Math.max(i.right, s.right),
      bottom: Math.max(i.bottom, s.bottom)
    });
    let r = ts(this.view), o = {
      left: i.left - r.left,
      top: i.top - r.top,
      right: i.right + r.right,
      bottom: i.bottom + r.bottom
    }, { offsetWidth: l, offsetHeight: h } = this.view.scrollDOM;
    Ns(this.view.scrollDOM, o, e.head < e.anchor ? -1 : 1, t.x, t.y, Math.max(Math.min(t.xMargin, l), -l), Math.max(Math.min(t.yMargin, h), -h), this.view.textDirection == O.LTR);
  }
  lineHasWidget(t) {
    let e = (i) => i.isWidget() || i.children.some(e);
    return e(this.tile.resolveBlock(t, 1).tile);
  }
  destroy() {
    ke(this.tile);
  }
}
function ke(n, t) {
  let e = t == null ? void 0 : t.get(n);
  if (e != 1) {
    e == null && n.destroy();
    for (let i of n.children)
      ke(i, t);
  }
}
function dn(n) {
  return n.node.nodeType == 1 && n.node.firstChild && (n.offset == 0 || n.node.childNodes[n.offset - 1].contentEditable == "false") && (n.offset == n.node.childNodes.length || n.node.childNodes[n.offset].contentEditable == "false");
}
function is(n, t) {
  let e = n.observer.selectionRange;
  if (!e.focusNode)
    return null;
  let i = Ei(e.focusNode, e.focusOffset), s = Wi(e.focusNode, e.focusOffset), r = i || s;
  if (s && i && s.node != i.node) {
    let l = D.get(s.node);
    if (!l || l.isText() && l.text != s.node.nodeValue)
      r = s;
    else if (n.docView.lastCompositionAfterCursor) {
      let h = D.get(i.node);
      !h || h.isText() && h.text != i.node.nodeValue || (r = s);
    }
  }
  if (n.docView.lastCompositionAfterCursor = r != i, !r)
    return null;
  let o = t - r.offset;
  return { from: o, to: o + r.node.nodeValue.length, node: r.node };
}
function un(n, t, e) {
  let i = is(n, e);
  if (!i)
    return null;
  let { node: s, from: r, to: o } = i, l = s.nodeValue;
  if (/[\n\r]/.test(l) || n.state.doc.sliceString(i.from, i.to) != l)
    return null;
  let h = t.invertedDesc;
  return { range: new V(h.mapPos(r), h.mapPos(o), r, o), text: s };
}
function pn(n, t) {
  return n.nodeType != 1 ? 0 : (t && n.childNodes[t - 1].contentEditable == "false" ? 1 : 0) | (t < n.childNodes.length && n.childNodes[t].contentEditable == "false" ? 2 : 0);
}
let gn = class {
  constructor() {
    this.changes = [];
  }
  compareRange(t, e) {
    at(t, e, this.changes);
  }
  comparePoint(t, e) {
    at(t, e, this.changes);
  }
  boundChange(t) {
    at(t, t, this.changes);
  }
};
function mn(n, t, e) {
  let i = new gn();
  return R.compare(n, t, e, i), i.changes;
}
class bn {
  constructor() {
    this.changes = [];
  }
  compareRange(t, e) {
    at(t, e, this.changes);
  }
  comparePoint() {
  }
  boundChange(t) {
    at(t, t, this.changes);
  }
}
function yn(n, t, e) {
  let i = new bn();
  return R.compare(n, t, e, i), i.changes;
}
function xn(n, t) {
  for (let e = n; e && e != t; e = e.assignedSlot || e.parentNode)
    if (e.nodeType == 1 && e.contentEditable == "false")
      return !0;
  return !1;
}
function wn(n, t) {
  let e = !1;
  return t && n.iterChangedRanges((i, s) => {
    i < t.to && s > t.from && (e = !0);
  }), e;
}
class he extends te {
  constructor(t) {
    super(), this.height = t;
  }
  toDOM() {
    let t = document.createElement("div");
    return t.className = "cm-gap", this.updateDOM(t), t;
  }
  eq(t) {
    return t.height == this.height;
  }
  updateDOM(t) {
    return t.style.height = this.height + "px", !0;
  }
  get editable() {
    return !0;
  }
  get estimatedHeight() {
    return this.height;
  }
  ignoreEvent() {
    return !1;
  }
}
function Sn(n, t, e = 1) {
  let i = n.charCategorizer(t), s = n.doc.lineAt(t), r = t - s.from;
  if (s.length == 0)
    return S.cursor(t);
  r == 0 ? e = 1 : r == s.length && (e = -1);
  let o = r, l = r;
  e < 0 ? o = J(s.text, r, !1) : l = J(s.text, r);
  let h = i(s.text.slice(o, l));
  for (; o > 0; ) {
    let a = J(s.text, o, !1);
    if (i(s.text.slice(a, o)) != h)
      break;
    o = a;
  }
  for (; l < s.length; ) {
    let a = J(s.text, l);
    if (i(s.text.slice(l, a)) != h)
      break;
    l = a;
  }
  return S.range(o + s.from, l + s.from);
}
function Cn(n, t, e, i, s) {
  let r = Math.round((i - t.left) * n.defaultCharacterWidth);
  if (n.lineWrapping && e.height > n.defaultLineHeight * 1.5) {
    let l = n.viewState.heightOracle.textHeight, h = Math.floor((s - e.top - (n.defaultLineHeight - l) * 0.5) / l);
    r += h * n.viewState.heightOracle.lineLength;
  }
  let o = n.state.sliceDoc(e.from, e.to);
  return e.from + Ms(o, r, n.state.tabSize);
}
function vn(n, t, e) {
  let i = n.lineBlockAt(t);
  if (Array.isArray(i.type)) {
    let s;
    for (let r of i.type) {
      if (r.from > t)
        break;
      if (!(r.to < t)) {
        if (r.from < t && r.to > t)
          return r;
        (!s || r.type == P.Text && (s.type != r.type || (e < 0 ? r.from < t : r.to > t))) && (s = r);
      }
    }
    return s || i;
  }
  return i;
}
function kn(n, t, e, i) {
  let s = vn(n, t.head, t.assoc || -1), r = !i || s.type != P.Text || !(n.lineWrapping || s.widgetLineBreaks) ? null : n.coordsAtPos(t.assoc < 0 && t.head > s.from ? t.head - 1 : t.head);
  if (r) {
    let o = n.dom.getBoundingClientRect(), l = n.textDirectionAt(s.from), h = n.posAtCoords({
      x: e == (l == O.LTR) ? o.right - 1 : o.left + 1,
      y: (r.top + r.bottom) / 2
    });
    if (h != null)
      return S.cursor(h, e ? -1 : 1);
  }
  return S.cursor(e ? s.to : s.from, e ? -1 : 1);
}
function Je(n, t, e, i) {
  let s = n.state.doc.lineAt(t.head), r = n.bidiSpans(s), o = n.textDirectionAt(s.from);
  for (let l = t, h = null; ; ) {
    let a = Us(s, r, o, l, e), f = Vi;
    if (!a) {
      if (s.number == (e ? n.state.doc.lines : 1))
        return l;
      f = `
`, s = n.state.doc.line(s.number + (e ? 1 : -1)), r = n.bidiSpans(s), a = n.visualLineSide(s, !e);
    }
    if (h) {
      if (!h(f))
        return l;
    } else {
      if (!i)
        return a;
      h = i(f);
    }
    l = a;
  }
}
function Mn(n, t, e) {
  let i = n.state.charCategorizer(t), s = i(e);
  return (r) => {
    let o = i(r);
    return s == Ts.Space && (s = o), s == o;
  };
}
function An(n, t, e, i) {
  let s = t.head, r = e ? 1 : -1;
  if (s == (e ? n.state.doc.length : 0))
    return S.cursor(s, t.assoc);
  let o = t.goalColumn, l, h = n.contentDOM.getBoundingClientRect(), a = n.coordsAtPos(s, t.assoc || -1), f = n.documentTop;
  if (a)
    o == null && (o = a.left - h.left), l = r < 0 ? a.top : a.bottom;
  else {
    let u = n.viewState.lineBlockAt(s);
    o == null && (o = Math.min(h.right - h.left, n.defaultCharacterWidth * (s - u.from))), l = (r < 0 ? u.top : u.bottom) + f;
  }
  let d = h.left + o, c = i ?? n.viewState.heightOracle.textHeight >> 1;
  for (let u = 0; ; u += 10) {
    let p = l + (c + u) * r, g = Me(n, { x: d, y: p }, !1, r);
    return S.cursor(g.pos, g.assoc, void 0, o);
  }
}
function vt(n, t, e) {
  for (; ; ) {
    let i = 0;
    for (let s of n)
      s.between(t - 1, t + 1, (r, o, l) => {
        if (t > r && t < o) {
          let h = i || e || (t - r < o - t ? -1 : 1);
          t = h < 0 ? r : o, i = h;
        }
      });
    if (!i)
      return t;
  }
}
function ss(n, t) {
  let e = null;
  for (let i = 0; i < t.ranges.length; i++) {
    let s = t.ranges[i], r = null;
    if (s.empty) {
      let o = vt(n, s.from, 0);
      o != s.from && (r = S.cursor(o, -1));
    } else {
      let o = vt(n, s.from, -1), l = vt(n, s.to, 1);
      (o != s.from || l != s.to) && (r = S.range(s.from == s.anchor ? o : l, s.from == s.head ? o : l));
    }
    r && (e || (e = t.ranges.slice()), e[i] = r);
  }
  return e ? S.create(e, t.mainIndex) : t;
}
function ae(n, t, e) {
  let i = vt(n.state.facet(Bt).map((s) => s(n)), e.from, t.head > e.from ? -1 : 1);
  return i == e.from ? e : S.cursor(i, i < e.from ? 1 : -1);
}
class _ {
  constructor(t, e) {
    this.pos = t, this.assoc = e;
  }
}
function Me(n, t, e, i) {
  let s = n.contentDOM.getBoundingClientRect(), r = s.top + n.viewState.paddingTop, { x: o, y: l } = t, h = l - r, a;
  for (; ; ) {
    if (h < 0)
      return new _(0, 1);
    if (h > n.viewState.docHeight)
      return new _(n.state.doc.length, -1);
    if (a = n.elementAtHeight(h), i == null)
      break;
    if (a.type == P.Text) {
      let c = n.docView.coordsAt(i < 0 ? a.from : a.to, i);
      if (c && (i < 0 ? c.top <= h + r : c.bottom >= h + r))
        break;
    }
    let d = n.viewState.heightOracle.textHeight / 2;
    h = i > 0 ? a.bottom + d : a.top - d;
  }
  if (n.viewport.from >= a.to || n.viewport.to <= a.from) {
    if (e)
      return null;
    if (a.type == P.Text) {
      let d = Cn(n, s, a, o, l);
      return new _(d, d == a.from ? 1 : -1);
    }
  }
  if (a.type != P.Text)
    return h < (a.top + a.bottom) / 2 ? new _(a.from, 1) : new _(a.to, -1);
  let f = n.docView.lineAt(a.from, 2);
  return (!f || f.length != a.length) && (f = n.docView.lineAt(a.from, -2)), ns(n, f, a.from, o, l);
}
function ns(n, t, e, i, s) {
  let r = -1, o = null, l = 1e9, h = 1e9, a = s, f = s, d = (c, u) => {
    for (let p = 0; p < c.length; p++) {
      let g = c[p];
      if (g.top == g.bottom)
        continue;
      let m = g.left > i ? g.left - i : g.right < i ? i - g.right : 0, b = g.top > s ? g.top - s : g.bottom < s ? s - g.bottom : 0;
      g.top <= f && g.bottom >= a && (a = Math.min(g.top, a), f = Math.max(g.bottom, f), b = 0), (r < 0 || (b - h || m - l) < 0) && (r >= 0 && h && l < m && o.top <= f - 2 && o.bottom >= a + 2 ? h = 0 : (r = u, l = m, h = b, o = g));
    }
  };
  if (t.isText()) {
    for (let u = 0; u < t.length; ) {
      let p = J(t.text, u);
      if (d(At(t.dom, u, p).getClientRects(), u), !l && !h)
        break;
      u = p;
    }
    return i > (o.left + o.right) / 2 == (Ze(n, r + e) == O.LTR) ? new _(e + J(t.text, r), -1) : new _(e + r, 1);
  } else {
    if (!t.length)
      return new _(e, 1);
    for (let g = 0; g < t.children.length; g++) {
      let m = t.children[g];
      if (m.flags & 48)
        continue;
      let b = (m.dom.nodeType == 1 ? m.dom : At(m.dom, 0, m.length)).getClientRects();
      if (d(b, g), !l && !h)
        break;
    }
    let c = t.children[r], u = t.posBefore(c, e);
    return c.isComposite() || c.isText() ? ns(n, c, u, Math.max(o.left, Math.min(o.right, i)), s) : i > (o.left + o.right) / 2 == (Ze(n, r + e) == O.LTR) ? new _(u + c.length, -1) : new _(u, 1);
  }
}
function Ze(n, t) {
  let e = n.state.doc.lineAt(t);
  return n.bidiSpans(e)[X.find(n.bidiSpans(e), t - e.from, -1, 1)].dir;
}
const yt = "￿";
class Dn {
  constructor(t, e) {
    this.points = t, this.text = "", this.lineSeparator = e.facet(wt.lineSeparator);
  }
  append(t) {
    this.text += t;
  }
  lineBreak() {
    this.text += yt;
  }
  readRange(t, e) {
    if (!t)
      return this;
    let i = t.parentNode;
    for (let s = t; ; ) {
      this.findPointBefore(i, s);
      let r = this.text.length;
      this.readNode(s);
      let o = D.get(s), l = s.nextSibling;
      if (l == e) {
        o != null && o.breakAfter && !l && this.lineBreak();
        break;
      }
      let h = D.get(l);
      (o && h ? o.breakAfter : (o ? o.breakAfter : _t(s)) || _t(l) && (s.nodeName != "BR" || o != null && o.isWidget()) && this.text.length > r) && !On(l, e) && this.lineBreak(), s = l;
    }
    return this.findPointBefore(i, e), this;
  }
  readTextNode(t) {
    let e = t.nodeValue;
    for (let i of this.points)
      i.node == t && (i.pos = this.text.length + Math.min(i.offset, e.length));
    for (let i = 0, s = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
      let r = -1, o = 1, l;
      if (this.lineSeparator ? (r = e.indexOf(this.lineSeparator, i), o = this.lineSeparator.length) : (l = s.exec(e)) && (r = l.index, o = l[0].length), this.append(e.slice(i, r < 0 ? e.length : r)), r < 0)
        break;
      if (this.lineBreak(), o > 1)
        for (let h of this.points)
          h.node == t && h.pos > this.text.length && (h.pos -= o - 1);
      i = r + o;
    }
  }
  readNode(t) {
    let e = D.get(t), i = e && e.overrideDOMText;
    if (i != null) {
      this.findPointInside(t, i.length);
      for (let s = i.iter(); !s.next().done; )
        s.lineBreak ? this.lineBreak() : this.append(s.value);
    } else t.nodeType == 3 ? this.readTextNode(t) : t.nodeName == "BR" ? t.nextSibling && this.lineBreak() : t.nodeType == 1 && this.readRange(t.firstChild, null);
  }
  findPointBefore(t, e) {
    for (let i of this.points)
      i.node == t && t.childNodes[i.offset] == e && (i.pos = this.text.length);
  }
  findPointInside(t, e) {
    for (let i of this.points)
      (t.nodeType == 3 ? i.node == t : t.contains(i.node)) && (i.pos = this.text.length + (Tn(t, i.node, i.offset) ? e : 0));
  }
}
function Tn(n, t, e) {
  for (; ; ) {
    if (!t || e < $(t))
      return !1;
    if (t == n)
      return !0;
    e = tt(t) + 1, t = t.parentNode;
  }
}
function On(n, t) {
  let e;
  for (; !(n == t || !n); n = n.nextSibling) {
    let i = D.get(n);
    if (!(i != null && i.isWidget()))
      return !1;
    i && (e || (e = [])).push(i);
  }
  if (e)
    for (let i of e) {
      let s = i.overrideDOMText;
      if (s != null && s.length)
        return !1;
    }
  return !0;
}
class ti {
  constructor(t, e) {
    this.node = t, this.offset = e, this.pos = -1;
  }
}
class Bn {
  constructor(t, e, i, s) {
    this.typeOver = s, this.bounds = null, this.text = "", this.domChanged = e > -1;
    let { impreciseHead: r, impreciseAnchor: o } = t.docView;
    if (t.state.readOnly && e > -1)
      this.newSel = null;
    else if (e > -1 && (this.bounds = rs(t.docView.tile, e, i, 0))) {
      let l = r || o ? [] : Rn(t), h = new Dn(l, t.state);
      h.readRange(this.bounds.startDOM, this.bounds.endDOM), this.text = h.text, this.newSel = En(l, this.bounds.from);
    } else {
      let l = t.observer.selectionRange, h = r && r.node == l.focusNode && r.offset == l.focusOffset || !xe(t.contentDOM, l.focusNode) ? t.state.selection.main.head : t.docView.posFromDOM(l.focusNode, l.focusOffset), a = o && o.node == l.anchorNode && o.offset == l.anchorOffset || !xe(t.contentDOM, l.anchorNode) ? t.state.selection.main.anchor : t.docView.posFromDOM(l.anchorNode, l.anchorOffset), f = t.viewport;
      if ((y.ios || y.chrome) && t.state.selection.main.empty && h != a && (f.from > 0 || f.to < t.state.doc.length)) {
        let d = Math.min(h, a), c = Math.max(h, a), u = f.from - d, p = f.to - c;
        (u == 0 || u == 1 || d == 0) && (p == 0 || p == -1 || c == t.state.doc.length) && (h = 0, a = t.state.doc.length);
      }
      t.inputState.composing > -1 && t.state.selection.ranges.length > 1 ? this.newSel = t.state.selection.replaceRange(S.range(a, h)) : this.newSel = S.single(a, h);
    }
  }
}
function rs(n, t, e, i) {
  if (n.isComposite()) {
    let s = -1, r = -1, o = -1, l = -1;
    for (let h = 0, a = i, f = i; h < n.children.length; h++) {
      let d = n.children[h], c = a + d.length;
      if (a < t && c > e)
        return rs(d, t, e, a);
      if (c >= t && s == -1 && (s = h, r = a), a > e && d.dom.parentNode == n.dom) {
        o = h, l = f;
        break;
      }
      f = c, a = c + d.breakAfter;
    }
    return {
      from: r,
      to: l < 0 ? i + n.length : l,
      startDOM: (s ? n.children[s - 1].dom.nextSibling : null) || n.dom.firstChild,
      endDOM: o < n.children.length && o >= 0 ? n.children[o].dom : null
    };
  } else return n.isText() ? { from: i, to: i + n.length, startDOM: n.dom, endDOM: n.dom.nextSibling } : null;
}
function os(n, t) {
  let e, { newSel: i } = t, s = n.state.selection.main, r = n.inputState.lastKeyTime > Date.now() - 100 ? n.inputState.lastKeyCode : -1;
  if (t.bounds) {
    let { from: o, to: l } = t.bounds, h = s.from, a = null;
    (r === 8 || y.android && t.text.length < l - o) && (h = s.to, a = "end");
    let f = ls(n.state.doc.sliceString(o, l, yt), t.text, h - o, a);
    f && (y.chrome && r == 13 && f.toB == f.from + 2 && t.text.slice(f.from, f.toB) == yt + yt && f.toB--, e = {
      from: o + f.from,
      to: o + f.toA,
      insert: q.of(t.text.slice(f.from, f.toB).split(yt))
    });
  } else i && (!n.hasFocus && n.state.facet(Y) || i.main.eq(s)) && (i = null);
  if (!e && !i)
    return !1;
  if (!e && t.typeOver && !s.empty && i && i.main.empty ? e = { from: s.from, to: s.to, insert: n.state.doc.slice(s.from, s.to) } : (y.mac || y.android) && e && e.from == e.to && e.from == s.head - 1 && /^\. ?$/.test(e.insert.toString()) && n.contentDOM.getAttribute("autocorrect") == "off" ? (i && e.insert.length == 2 && (i = S.single(i.main.anchor - 1, i.main.head - 1)), e = { from: e.from, to: e.to, insert: q.of([e.insert.toString().replace(".", " ")]) }) : e && e.from >= s.from && e.to <= s.to && (e.from != s.from || e.to != s.to) && s.to - s.from - (e.to - e.from) <= 4 ? e = {
    from: s.from,
    to: s.to,
    insert: n.state.doc.slice(s.from, e.from).append(e.insert).append(n.state.doc.slice(e.to, s.to))
  } : n.state.doc.lineAt(s.from).to < s.to && n.docView.lineHasWidget(s.to) && n.inputState.insertingTextAt > Date.now() - 50 ? e = {
    from: s.from,
    to: s.to,
    insert: n.state.toText(n.inputState.insertingText)
  } : y.chrome && e && e.from == e.to && e.from == s.head && e.insert.toString() == `
 ` && n.lineWrapping && (i && (i = S.single(i.main.anchor - 1, i.main.head - 1)), e = { from: s.from, to: s.to, insert: q.of([" "]) }), e)
    return Ie(n, e, i, r);
  if (i && !i.main.eq(s)) {
    let o = !1, l = "select";
    return n.inputState.lastSelectionTime > Date.now() - 50 && (n.inputState.lastSelectionOrigin == "select" && (o = !0), l = n.inputState.lastSelectionOrigin, l == "select.pointer" && (i = ss(n.state.facet(Bt).map((h) => h(n)), i))), n.dispatch({ selection: i, scrollIntoView: o, userEvent: l }), !0;
  } else
    return !1;
}
function Ie(n, t, e, i = -1) {
  if (y.ios && n.inputState.flushIOSKey(t))
    return !0;
  let s = n.state.selection.main;
  if (y.android && (t.to == s.to && // GBoard will sometimes remove a space it just inserted
  // after a completion when you press enter
  (t.from == s.from || t.from == s.from - 1 && n.state.sliceDoc(t.from, s.from) == " ") && t.insert.length == 1 && t.insert.lines == 2 && ft(n.contentDOM, "Enter", 13) || (t.from == s.from - 1 && t.to == s.to && t.insert.length == 0 || i == 8 && t.insert.length < t.to - t.from && t.to > s.head) && ft(n.contentDOM, "Backspace", 8) || t.from == s.from && t.to == s.to + 1 && t.insert.length == 0 && ft(n.contentDOM, "Delete", 46)))
    return !0;
  let r = t.insert.toString();
  n.inputState.composing >= 0 && n.inputState.composing++;
  let o, l = () => o || (o = Ln(n, t, e));
  return n.state.facet(Gi).some((h) => h(n, t.from, t.to, r, l)) || n.dispatch(l()), !0;
}
function Ln(n, t, e) {
  let i, s = n.state, r = s.selection.main, o = -1;
  if (t.from == t.to && t.from < r.from || t.from > r.to) {
    let h = t.from < r.from ? -1 : 1, a = h < 0 ? r.from : r.to, f = vt(s.facet(Bt).map((d) => d(n)), a, h);
    t.from == f && (o = f);
  }
  if (o > -1)
    i = {
      changes: t,
      selection: S.cursor(t.from + t.insert.length, -1)
    };
  else if (t.from >= r.from && t.to <= r.to && t.to - t.from >= (r.to - r.from) / 3 && (!e || e.main.empty && e.main.from == t.from + t.insert.length) && n.inputState.composing < 0) {
    let h = r.from < t.from ? s.sliceDoc(r.from, t.from) : "", a = r.to > t.to ? s.sliceDoc(t.to, r.to) : "";
    i = s.replaceSelection(n.state.toText(h + t.insert.sliceString(0, void 0, n.state.lineBreak) + a));
  } else {
    let h = s.changes(t), a = e && e.main.to <= h.newLength ? e.main : void 0;
    if (s.selection.ranges.length > 1 && (n.inputState.composing >= 0 || n.inputState.compositionPendingChange) && t.to <= r.to + 10 && t.to >= r.to - 10) {
      let f = n.state.sliceDoc(t.from, t.to), d, c = e && is(n, e.main.head);
      if (c) {
        let p = t.insert.length - (t.to - t.from);
        d = { from: c.from, to: c.to - p };
      } else
        d = n.state.doc.lineAt(r.head);
      let u = r.to - t.to;
      i = s.changeByRange((p) => {
        if (p.from == r.from && p.to == r.to)
          return { changes: h, range: a || p.map(h) };
        let g = p.to - u, m = g - f.length;
        if (n.state.sliceDoc(m, g) != f || // Unfortunately, there's no way to make multiple
        // changes in the same node work without aborting
        // composition, so cursors in the composition range are
        // ignored.
        g >= d.from && m <= d.to)
          return { range: p };
        let b = s.changes({ from: m, to: g, insert: t.insert }), x = p.to - r.to;
        return {
          changes: b,
          range: a ? S.range(Math.max(0, a.anchor + x), Math.max(0, a.head + x)) : p.map(b)
        };
      });
    } else
      i = {
        changes: h,
        selection: a && s.selection.replaceRange(a)
      };
  }
  let l = "input.type";
  return (n.composing || n.inputState.compositionPendingChange && n.inputState.compositionEndedAt > Date.now() - 50) && (n.inputState.compositionPendingChange = !1, l += ".compose", n.inputState.compositionFirstChange && (l += ".start", n.inputState.compositionFirstChange = !1)), s.update(i, { userEvent: l, scrollIntoView: !0 });
}
function ls(n, t, e, i) {
  let s = Math.min(n.length, t.length), r = 0;
  for (; r < s && n.charCodeAt(r) == t.charCodeAt(r); )
    r++;
  if (r == s && n.length == t.length)
    return null;
  let o = n.length, l = t.length;
  for (; o > 0 && l > 0 && n.charCodeAt(o - 1) == t.charCodeAt(l - 1); )
    o--, l--;
  if (i == "end") {
    let h = Math.max(0, r - Math.min(o, l));
    e -= o + h - r;
  }
  if (o < r && n.length < t.length) {
    let h = e <= r && e >= o ? r - e : 0;
    r -= h, l = r + (l - o), o = r;
  } else if (l < r) {
    let h = e <= r && e >= l ? r - e : 0;
    r -= h, o = r + (o - l), l = r;
  }
  return { from: r, toA: o, toB: l };
}
function Rn(n) {
  let t = [];
  if (n.root.activeElement != n.contentDOM)
    return t;
  let { anchorNode: e, anchorOffset: i, focusNode: s, focusOffset: r } = n.observer.selectionRange;
  return e && (t.push(new ti(e, i)), (s != e || r != i) && t.push(new ti(s, r))), t;
}
function En(n, t) {
  if (n.length == 0)
    return null;
  let e = n[0].pos, i = n.length == 2 ? n[1].pos : e;
  return e > -1 && i > -1 ? S.single(e + t, i + t) : null;
}
class Wn {
  setSelectionOrigin(t) {
    this.lastSelectionOrigin = t, this.lastSelectionTime = Date.now();
  }
  constructor(t) {
    this.view = t, this.lastKeyCode = 0, this.lastKeyTime = 0, this.lastTouchTime = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.pendingIOSKey = void 0, this.tabFocusMode = -1, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.handlers = /* @__PURE__ */ Object.create(null), this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.compositionPendingKey = !1, this.compositionPendingChange = !1, this.insertingText = "", this.insertingTextAt = 0, this.mouseSelection = null, this.draggedContent = null, this.handleEvent = this.handleEvent.bind(this), this.notifiedFocused = t.hasFocus, y.safari && t.contentDOM.addEventListener("input", () => null), y.gecko && Un(t.contentDOM.ownerDocument);
  }
  handleEvent(t) {
    !Kn(this.view, t) || this.ignoreDuringComposition(t) || t.type == "keydown" && this.keydown(t) || (this.view.updateState != 0 ? Promise.resolve().then(() => this.runHandlers(t.type, t)) : this.runHandlers(t.type, t));
  }
  runHandlers(t, e) {
    let i = this.handlers[t];
    if (i) {
      for (let s of i.observers)
        s(this.view, e);
      for (let s of i.handlers) {
        if (e.defaultPrevented)
          break;
        if (s(this.view, e)) {
          e.preventDefault();
          break;
        }
      }
    }
  }
  ensureHandlers(t) {
    let e = Hn(t), i = this.handlers, s = this.view.contentDOM;
    for (let r in e)
      if (r != "scroll") {
        let o = !e[r].handlers.length, l = i[r];
        l && o != !l.handlers.length && (s.removeEventListener(r, this.handleEvent), l = null), l || s.addEventListener(r, this.handleEvent, { passive: o });
      }
    for (let r in i)
      r != "scroll" && !e[r] && s.removeEventListener(r, this.handleEvent);
    this.handlers = e;
  }
  keydown(t) {
    if (this.lastKeyCode = t.keyCode, this.lastKeyTime = Date.now(), t.keyCode == 9 && this.tabFocusMode > -1 && (!this.tabFocusMode || Date.now() <= this.tabFocusMode))
      return !0;
    if (this.tabFocusMode > 0 && t.keyCode != 27 && as.indexOf(t.keyCode) < 0 && (this.tabFocusMode = -1), y.android && y.chrome && !t.synthetic && (t.keyCode == 13 || t.keyCode == 8))
      return this.view.observer.delayAndroidKey(t.key, t.keyCode), !0;
    let e;
    return y.ios && !t.synthetic && !t.altKey && !t.metaKey && ((e = hs.find((i) => i.keyCode == t.keyCode)) && !t.ctrlKey || Pn.indexOf(t.key) > -1 && t.ctrlKey && !t.shiftKey) ? (this.pendingIOSKey = e || t, setTimeout(() => this.flushIOSKey(), 250), !0) : (t.keyCode != 229 && this.view.observer.forceFlush(), !1);
  }
  flushIOSKey(t) {
    let e = this.pendingIOSKey;
    return !e || e.key == "Enter" && t && t.from < t.to && /^\S+$/.test(t.insert.toString()) ? !1 : (this.pendingIOSKey = void 0, ft(this.view.contentDOM, e.key, e.keyCode, e instanceof KeyboardEvent ? e : void 0));
  }
  ignoreDuringComposition(t) {
    return !/^key/.test(t.type) || t.synthetic ? !1 : this.composing > 0 ? !0 : y.safari && !y.ios && this.compositionPendingKey && Date.now() - this.compositionEndedAt < 100 ? (this.compositionPendingKey = !1, !0) : !1;
  }
  startMouseSelection(t) {
    this.mouseSelection && this.mouseSelection.destroy(), this.mouseSelection = t;
  }
  update(t) {
    this.view.observer.update(t), this.mouseSelection && this.mouseSelection.update(t), this.draggedContent && t.docChanged && (this.draggedContent = this.draggedContent.map(t.changes)), t.transactions.length && (this.lastKeyCode = this.lastSelectionTime = 0);
  }
  destroy() {
    this.mouseSelection && this.mouseSelection.destroy();
  }
}
function ei(n, t) {
  return (e, i) => {
    try {
      return t.call(n, i, e);
    } catch (s) {
      U(e.state, s);
    }
  };
}
function Hn(n) {
  let t = /* @__PURE__ */ Object.create(null);
  function e(i) {
    return t[i] || (t[i] = { observers: [], handlers: [] });
  }
  for (let i of n) {
    let s = i.spec, r = s && s.plugin.domEventHandlers, o = s && s.plugin.domEventObservers;
    if (r)
      for (let l in r) {
        let h = r[l];
        h && e(l).handlers.push(ei(i.value, h));
      }
    if (o)
      for (let l in o) {
        let h = o[l];
        h && e(l).observers.push(ei(i.value, h));
      }
  }
  for (let i in G)
    e(i).handlers.push(G[i]);
  for (let i in I)
    e(i).observers.push(I[i]);
  return t;
}
const hs = [
  { key: "Backspace", keyCode: 8, inputType: "deleteContentBackward" },
  { key: "Enter", keyCode: 13, inputType: "insertParagraph" },
  { key: "Enter", keyCode: 13, inputType: "insertLineBreak" },
  { key: "Delete", keyCode: 46, inputType: "deleteContentForward" }
], Pn = "dthko", as = [16, 17, 18, 20, 91, 92, 224, 225], Et = 6;
function Wt(n) {
  return Math.max(0, n) * 0.7 + 8;
}
function Nn(n, t) {
  return Math.max(Math.abs(n.clientX - t.clientX), Math.abs(n.clientY - t.clientY));
}
class Fn {
  constructor(t, e, i, s) {
    this.view = t, this.startEvent = e, this.style = i, this.mustSelect = s, this.scrollSpeed = { x: 0, y: 0 }, this.scrolling = -1, this.lastEvent = e, this.scrollParents = Fs(t.contentDOM), this.atoms = t.state.facet(Bt).map((o) => o(t));
    let r = t.contentDOM.ownerDocument;
    r.addEventListener("mousemove", this.move = this.move.bind(this)), r.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = e.shiftKey, this.multiple = t.state.facet(wt.allowMultipleSelections) && Vn(t, e), this.dragging = zn(t, e) && ds(e) == 1 ? null : !1;
  }
  start(t) {
    this.dragging === !1 && this.select(t);
  }
  move(t) {
    if (t.buttons == 0)
      return this.destroy();
    if (this.dragging || this.dragging == null && Nn(this.startEvent, t) < 10)
      return;
    this.select(this.lastEvent = t);
    let e = 0, i = 0, s = 0, r = 0, o = this.view.win.innerWidth, l = this.view.win.innerHeight;
    this.scrollParents.x && ({ left: s, right: o } = this.scrollParents.x.getBoundingClientRect()), this.scrollParents.y && ({ top: r, bottom: l } = this.scrollParents.y.getBoundingClientRect());
    let h = ts(this.view);
    t.clientX - h.left <= s + Et ? e = -Wt(s - t.clientX) : t.clientX + h.right >= o - Et && (e = Wt(t.clientX - o)), t.clientY - h.top <= r + Et ? i = -Wt(r - t.clientY) : t.clientY + h.bottom >= l - Et && (i = Wt(t.clientY - l)), this.setScrollSpeed(e, i);
  }
  up(t) {
    this.dragging == null && this.select(this.lastEvent), this.dragging || t.preventDefault(), this.destroy();
  }
  destroy() {
    this.setScrollSpeed(0, 0);
    let t = this.view.contentDOM.ownerDocument;
    t.removeEventListener("mousemove", this.move), t.removeEventListener("mouseup", this.up), this.view.inputState.mouseSelection = this.view.inputState.draggedContent = null;
  }
  setScrollSpeed(t, e) {
    this.scrollSpeed = { x: t, y: e }, t || e ? this.scrolling < 0 && (this.scrolling = setInterval(() => this.scroll(), 50)) : this.scrolling > -1 && (clearInterval(this.scrolling), this.scrolling = -1);
  }
  scroll() {
    let { x: t, y: e } = this.scrollSpeed;
    t && this.scrollParents.x && (this.scrollParents.x.scrollLeft += t, t = 0), e && this.scrollParents.y && (this.scrollParents.y.scrollTop += e, e = 0), (t || e) && this.view.win.scrollBy(t, e), this.dragging === !1 && this.select(this.lastEvent);
  }
  select(t) {
    let { view: e } = this, i = ss(this.atoms, this.style.get(t, this.extend, this.multiple));
    (this.mustSelect || !i.eq(e.state.selection, this.dragging === !1)) && this.view.dispatch({
      selection: i,
      userEvent: "select.pointer"
    }), this.mustSelect = !1;
  }
  update(t) {
    t.transactions.some((e) => e.isUserEvent("input.type")) ? this.destroy() : this.style.update(t) && setTimeout(() => this.select(this.lastEvent), 20);
  }
}
function Vn(n, t) {
  let e = n.state.facet(Ii);
  return e.length ? e[0](t) : y.mac ? t.metaKey : t.ctrlKey;
}
function In(n, t) {
  let e = n.state.facet(zi);
  return e.length ? e[0](t) : y.mac ? !t.altKey : !t.ctrlKey;
}
function zn(n, t) {
  let { main: e } = n.state.selection;
  if (e.empty)
    return !1;
  let i = Mt(n.root);
  if (!i || i.rangeCount == 0)
    return !0;
  let s = i.getRangeAt(0).getClientRects();
  for (let r = 0; r < s.length; r++) {
    let o = s[r];
    if (o.left <= t.clientX && o.right >= t.clientX && o.top <= t.clientY && o.bottom >= t.clientY)
      return !0;
  }
  return !1;
}
function Kn(n, t) {
  if (!t.bubbles)
    return !0;
  if (t.defaultPrevented)
    return !1;
  for (let e = t.target, i; e != n.contentDOM; e = e.parentNode)
    if (!e || e.nodeType == 11 || (i = D.get(e)) && i.isWidget() && !i.isHidden && i.widget.ignoreEvent(t))
      return !1;
  return !0;
}
const G = /* @__PURE__ */ Object.create(null), I = /* @__PURE__ */ Object.create(null), fs = y.ie && y.ie_version < 15 || y.ios && y.webkit_version < 604;
function qn(n) {
  let t = n.dom.parentNode;
  if (!t)
    return;
  let e = t.appendChild(document.createElement("textarea"));
  e.style.cssText = "position: fixed; left: -10000px; top: 10px", e.focus(), setTimeout(() => {
    n.focus(), e.remove(), cs(n, e.value);
  }, 50);
}
function se(n, t, e) {
  for (let i of n.facet(t))
    e = i(e, n);
  return e;
}
function cs(n, t) {
  t = se(n.state, Ne, t);
  let { state: e } = n, i, s = 1, r = e.toText(t), o = r.lines == e.selection.ranges.length;
  if (Ae != null && e.selection.ranges.every((h) => h.empty) && Ae == r.toString()) {
    let h = -1;
    i = e.changeByRange((a) => {
      let f = e.doc.lineAt(a.from);
      if (f.from == h)
        return { range: a };
      h = f.from;
      let d = e.toText((o ? r.line(s++).text : t) + e.lineBreak);
      return {
        changes: { from: f.from, insert: d },
        range: S.cursor(a.from + d.length)
      };
    });
  } else o ? i = e.changeByRange((h) => {
    let a = r.line(s++);
    return {
      changes: { from: h.from, to: h.to, insert: a.text },
      range: S.cursor(h.from + a.length)
    };
  }) : i = e.replaceSelection(r);
  n.dispatch(i, {
    userEvent: "input.paste",
    scrollIntoView: !0
  });
}
I.scroll = (n) => {
  n.inputState.lastScrollTop = n.scrollDOM.scrollTop, n.inputState.lastScrollLeft = n.scrollDOM.scrollLeft;
};
G.keydown = (n, t) => (n.inputState.setSelectionOrigin("select"), t.keyCode == 27 && n.inputState.tabFocusMode != 0 && (n.inputState.tabFocusMode = Date.now() + 2e3), !1);
I.touchstart = (n, t) => {
  n.inputState.lastTouchTime = Date.now(), n.inputState.setSelectionOrigin("select.pointer");
};
I.touchmove = (n) => {
  n.inputState.setSelectionOrigin("select.pointer");
};
G.mousedown = (n, t) => {
  if (n.observer.flush(), n.inputState.lastTouchTime > Date.now() - 2e3)
    return !1;
  let e = null;
  for (let i of n.state.facet(Ki))
    if (e = i(n, t), e)
      break;
  if (!e && t.button == 0 && (e = jn(n, t)), e) {
    let i = !n.hasFocus;
    n.inputState.startMouseSelection(new Fn(n, t, e, i)), i && n.observer.ignore(() => {
      Li(n.contentDOM);
      let r = n.root.activeElement;
      r && !r.contains(n.contentDOM) && r.blur();
    });
    let s = n.inputState.mouseSelection;
    if (s)
      return s.start(t), s.dragging === !1;
  } else
    n.inputState.setSelectionOrigin("select.pointer");
  return !1;
};
function ii(n, t, e, i) {
  if (i == 1)
    return S.cursor(t, e);
  if (i == 2)
    return Sn(n.state, t, e);
  {
    let s = n.docView.lineAt(t, e), r = n.state.doc.lineAt(s ? s.posAtEnd : t), o = s ? s.posAtStart : r.from, l = s ? s.posAtEnd : r.to;
    return l < n.state.doc.length && l == r.to && l++, S.range(o, l);
  }
}
const Gn = y.ie && y.ie_version <= 11;
let si = null, ni = 0, ri = 0;
function ds(n) {
  if (!Gn)
    return n.detail;
  let t = si, e = ri;
  return si = n, ri = Date.now(), ni = !t || e > Date.now() - 400 && Math.abs(t.clientX - n.clientX) < 2 && Math.abs(t.clientY - n.clientY) < 2 ? (ni + 1) % 3 : 1;
}
function jn(n, t) {
  let e = n.posAndSideAtCoords({ x: t.clientX, y: t.clientY }, !1), i = ds(t), s = n.state.selection;
  return {
    update(r) {
      r.docChanged && (e.pos = r.changes.mapPos(e.pos), s = s.map(r.changes));
    },
    get(r, o, l) {
      let h = n.posAndSideAtCoords({ x: r.clientX, y: r.clientY }, !1), a, f = ii(n, h.pos, h.assoc, i);
      if (e.pos != h.pos && !o) {
        let d = ii(n, e.pos, e.assoc, i), c = Math.min(d.from, f.from), u = Math.max(d.to, f.to);
        f = c < f.from ? S.range(c, u) : S.range(u, c);
      }
      return o ? s.replaceRange(s.main.extend(f.from, f.to)) : l && i == 1 && s.ranges.length > 1 && (a = _n(s, h.pos)) ? a : l ? s.addRange(f) : S.create([f]);
    }
  };
}
function _n(n, t) {
  for (let e = 0; e < n.ranges.length; e++) {
    let { from: i, to: s } = n.ranges[e];
    if (i <= t && s >= t)
      return S.create(n.ranges.slice(0, e).concat(n.ranges.slice(e + 1)), n.mainIndex == e ? 0 : n.mainIndex - (n.mainIndex > e ? 1 : 0));
  }
  return null;
}
G.dragstart = (n, t) => {
  let { selection: { main: e } } = n.state;
  if (t.target.draggable) {
    let s = n.docView.tile.nearest(t.target);
    if (s && s.isWidget()) {
      let r = s.posAtStart, o = r + s.length;
      (r >= e.to || o <= e.from) && (e = S.range(r, o));
    }
  }
  let { inputState: i } = n;
  return i.mouseSelection && (i.mouseSelection.dragging = !0), i.draggedContent = e, t.dataTransfer && (t.dataTransfer.setData("Text", se(n.state, Fe, n.state.sliceDoc(e.from, e.to))), t.dataTransfer.effectAllowed = "copyMove"), !1;
};
G.dragend = (n) => (n.inputState.draggedContent = null, !1);
function oi(n, t, e, i) {
  if (e = se(n.state, Ne, e), !e)
    return;
  let s = n.posAtCoords({ x: t.clientX, y: t.clientY }, !1), { draggedContent: r } = n.inputState, o = i && r && In(n, t) ? { from: r.from, to: r.to } : null, l = { from: s, insert: e }, h = n.state.changes(o ? [o, l] : l);
  n.focus(), n.dispatch({
    changes: h,
    selection: { anchor: h.mapPos(s, -1), head: h.mapPos(s, 1) },
    userEvent: o ? "move.drop" : "input.drop"
  }), n.inputState.draggedContent = null;
}
G.drop = (n, t) => {
  if (!t.dataTransfer)
    return !1;
  if (n.state.readOnly)
    return !0;
  let e = t.dataTransfer.files;
  if (e && e.length) {
    let i = Array(e.length), s = 0, r = () => {
      ++s == e.length && oi(n, t, i.filter((o) => o != null).join(n.state.lineBreak), !1);
    };
    for (let o = 0; o < e.length; o++) {
      let l = new FileReader();
      l.onerror = r, l.onload = () => {
        /[\x00-\x08\x0e-\x1f]{2}/.test(l.result) || (i[o] = l.result), r();
      }, l.readAsText(e[o]);
    }
    return !0;
  } else {
    let i = t.dataTransfer.getData("Text");
    if (i)
      return oi(n, t, i, !0), !0;
  }
  return !1;
};
G.paste = (n, t) => {
  if (n.state.readOnly)
    return !0;
  n.observer.flush();
  let e = fs ? null : t.clipboardData;
  return e ? (cs(n, e.getData("text/plain") || e.getData("text/uri-list")), !0) : (qn(n), !1);
};
function Yn(n, t) {
  let e = n.dom.parentNode;
  if (!e)
    return;
  let i = e.appendChild(document.createElement("textarea"));
  i.style.cssText = "position: fixed; left: -10000px; top: 10px", i.value = t, i.focus(), i.selectionEnd = t.length, i.selectionStart = 0, setTimeout(() => {
    i.remove(), n.focus();
  }, 50);
}
function Xn(n) {
  let t = [], e = [], i = !1;
  for (let s of n.selection.ranges)
    s.empty || (t.push(n.sliceDoc(s.from, s.to)), e.push(s));
  if (!t.length) {
    let s = -1;
    for (let { from: r } of n.selection.ranges) {
      let o = n.doc.lineAt(r);
      o.number > s && (t.push(o.text), e.push({ from: o.from, to: Math.min(n.doc.length, o.to + 1) })), s = o.number;
    }
    i = !0;
  }
  return { text: se(n, Fe, t.join(n.lineBreak)), ranges: e, linewise: i };
}
let Ae = null;
G.copy = G.cut = (n, t) => {
  let { text: e, ranges: i, linewise: s } = Xn(n.state);
  if (!e && !s)
    return !1;
  Ae = s ? e : null, t.type == "cut" && !n.state.readOnly && n.dispatch({
    changes: i,
    scrollIntoView: !0,
    userEvent: "delete.cut"
  });
  let r = fs ? null : t.clipboardData;
  return r ? (r.clearData(), r.setData("text/plain", e), !0) : (Yn(n, e), !1);
};
const us = /* @__PURE__ */ ks.define();
function ps(n, t) {
  let e = [];
  for (let i of n.facet(ji)) {
    let s = i(n, t);
    s && e.push(s);
  }
  return e.length ? n.update({ effects: e, annotations: us.of(!0) }) : null;
}
function gs(n) {
  setTimeout(() => {
    let t = n.hasFocus;
    if (t != n.inputState.notifiedFocused) {
      let e = ps(n.state, t);
      e ? n.dispatch(e) : n.update([]);
    }
  }, 10);
}
I.focus = (n) => {
  n.inputState.lastFocusTime = Date.now(), !n.scrollDOM.scrollTop && (n.inputState.lastScrollTop || n.inputState.lastScrollLeft) && (n.scrollDOM.scrollTop = n.inputState.lastScrollTop, n.scrollDOM.scrollLeft = n.inputState.lastScrollLeft), gs(n);
};
I.blur = (n) => {
  n.observer.clearSelectionRange(), gs(n);
};
I.compositionstart = I.compositionupdate = (n) => {
  n.observer.editContext || (n.inputState.compositionFirstChange == null && (n.inputState.compositionFirstChange = !0), n.inputState.composing < 0 && (n.inputState.composing = 0));
};
I.compositionend = (n) => {
  n.observer.editContext || (n.inputState.composing = -1, n.inputState.compositionEndedAt = Date.now(), n.inputState.compositionPendingKey = !0, n.inputState.compositionPendingChange = n.observer.pendingRecords().length > 0, n.inputState.compositionFirstChange = null, y.chrome && y.android ? n.observer.flushSoon() : n.inputState.compositionPendingChange ? Promise.resolve().then(() => n.observer.flush()) : setTimeout(() => {
    n.inputState.composing < 0 && n.docView.hasComposition && n.update([]);
  }, 50));
};
I.contextmenu = (n) => {
  n.inputState.lastContextMenu = Date.now();
};
G.beforeinput = (n, t) => {
  var e, i;
  if ((t.inputType == "insertText" || t.inputType == "insertCompositionText") && (n.inputState.insertingText = t.data, n.inputState.insertingTextAt = Date.now()), t.inputType == "insertReplacementText" && n.observer.editContext) {
    let r = (e = t.dataTransfer) === null || e === void 0 ? void 0 : e.getData("text/plain"), o = t.getTargetRanges();
    if (r && o.length) {
      let l = o[0], h = n.posAtDOM(l.startContainer, l.startOffset), a = n.posAtDOM(l.endContainer, l.endOffset);
      return Ie(n, { from: h, to: a, insert: n.state.toText(r) }, null), !0;
    }
  }
  let s;
  if (y.chrome && y.android && (s = hs.find((r) => r.inputType == t.inputType)) && (n.observer.delayAndroidKey(s.key, s.keyCode), s.key == "Backspace" || s.key == "Delete")) {
    let r = ((i = window.visualViewport) === null || i === void 0 ? void 0 : i.height) || 0;
    setTimeout(() => {
      var o;
      (((o = window.visualViewport) === null || o === void 0 ? void 0 : o.height) || 0) > r + 10 && n.hasFocus && (n.contentDOM.blur(), n.focus());
    }, 100);
  }
  return y.ios && t.inputType == "deleteContentForward" && n.observer.flushSoon(), y.safari && t.inputType == "insertText" && n.inputState.composing >= 0 && setTimeout(() => I.compositionend(n, t), 20), !1;
};
const li = /* @__PURE__ */ new Set();
function Un(n) {
  li.has(n) || (li.add(n), n.addEventListener("copy", () => {
  }), n.addEventListener("cut", () => {
  }));
}
const hi = ["pre-wrap", "normal", "pre-line", "break-spaces"];
let mt = !1;
function ai() {
  mt = !1;
}
class $n {
  constructor(t) {
    this.lineWrapping = t, this.doc = q.empty, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.textHeight = 14, this.lineLength = 30;
  }
  heightForGap(t, e) {
    let i = this.doc.lineAt(e).number - this.doc.lineAt(t).number + 1;
    return this.lineWrapping && (i += Math.max(0, Math.ceil((e - t - i * this.lineLength * 0.5) / this.lineLength))), this.lineHeight * i;
  }
  heightForLine(t) {
    return this.lineWrapping ? (1 + Math.max(0, Math.ceil((t - this.lineLength) / Math.max(1, this.lineLength - 5)))) * this.lineHeight : this.lineHeight;
  }
  setDoc(t) {
    return this.doc = t, this;
  }
  mustRefreshForWrapping(t) {
    return hi.indexOf(t) > -1 != this.lineWrapping;
  }
  mustRefreshForHeights(t) {
    let e = !1;
    for (let i = 0; i < t.length; i++) {
      let s = t[i];
      s < 0 ? i++ : this.heightSamples[Math.floor(s * 10)] || (e = !0, this.heightSamples[Math.floor(s * 10)] = !0);
    }
    return e;
  }
  refresh(t, e, i, s, r, o) {
    let l = hi.indexOf(t) > -1, h = Math.round(e) != Math.round(this.lineHeight) || this.lineWrapping != l;
    if (this.lineWrapping = l, this.lineHeight = e, this.charWidth = i, this.textHeight = s, this.lineLength = r, h) {
      this.heightSamples = {};
      for (let a = 0; a < o.length; a++) {
        let f = o[a];
        f < 0 ? a++ : this.heightSamples[Math.floor(f * 10)] = !0;
      }
    }
    return h;
  }
}
class Qn {
  constructor(t, e) {
    this.from = t, this.heights = e, this.index = 0;
  }
  get more() {
    return this.index < this.heights.length;
  }
}
class z {
  /**
  @internal
  */
  constructor(t, e, i, s, r) {
    this.from = t, this.length = e, this.top = i, this.height = s, this._content = r;
  }
  /**
  The type of element this is. When querying lines, this may be
  an array of all the blocks that make up the line.
  */
  get type() {
    return typeof this._content == "number" ? P.Text : Array.isArray(this._content) ? this._content : this._content.type;
  }
  /**
  The end of the element as a document position.
  */
  get to() {
    return this.from + this.length;
  }
  /**
  The bottom position of the element.
  */
  get bottom() {
    return this.top + this.height;
  }
  /**
  If this is a widget block, this will return the widget
  associated with it.
  */
  get widget() {
    return this._content instanceof st ? this._content.widget : null;
  }
  /**
  If this is a textblock, this holds the number of line breaks
  that appear in widgets inside the block.
  */
  get widgetLineBreaks() {
    return typeof this._content == "number" ? this._content : 0;
  }
  /**
  @internal
  */
  join(t) {
    let e = (Array.isArray(this._content) ? this._content : [this]).concat(Array.isArray(t._content) ? t._content : [t]);
    return new z(this.from, this.length + t.length, this.top, this.height + t.height, e);
  }
}
var M = /* @__PURE__ */ function(n) {
  return n[n.ByPos = 0] = "ByPos", n[n.ByHeight = 1] = "ByHeight", n[n.ByPosNoHeight = 2] = "ByPosNoHeight", n;
}(M || (M = {}));
const qt = 1e-3;
class W {
  constructor(t, e, i = 2) {
    this.length = t, this.height = e, this.flags = i;
  }
  get outdated() {
    return (this.flags & 2) > 0;
  }
  set outdated(t) {
    this.flags = (t ? 2 : 0) | this.flags & -3;
  }
  setHeight(t) {
    this.height != t && (Math.abs(this.height - t) > qt && (mt = !0), this.height = t);
  }
  // Base case is to replace a leaf node, which simply builds a tree
  // from the new nodes and returns that (HeightMapBranch and
  // HeightMapGap override this to actually use from/to)
  replace(t, e, i) {
    return W.of(i);
  }
  // Again, these are base cases, and are overridden for branch and gap nodes.
  decomposeLeft(t, e) {
    e.push(this);
  }
  decomposeRight(t, e) {
    e.push(this);
  }
  applyChanges(t, e, i, s) {
    let r = this, o = i.doc;
    for (let l = s.length - 1; l >= 0; l--) {
      let { fromA: h, toA: a, fromB: f, toB: d } = s[l], c = r.lineAt(h, M.ByPosNoHeight, i.setDoc(e), 0, 0), u = c.to >= a ? c : r.lineAt(a, M.ByPosNoHeight, i, 0, 0);
      for (d += u.to - a, a = u.to; l > 0 && c.from <= s[l - 1].toA; )
        h = s[l - 1].fromA, f = s[l - 1].fromB, l--, h < c.from && (c = r.lineAt(h, M.ByPosNoHeight, i, 0, 0));
      f += c.from - h, h = c.from;
      let p = ze.build(i.setDoc(o), t, f, d);
      r = Qt(r, r.replace(h, a, p));
    }
    return r.updateHeight(i, 0);
  }
  static empty() {
    return new F(0, 0, 0);
  }
  // nodes uses null values to indicate the position of line breaks.
  // There are never line breaks at the start or end of the array, or
  // two line breaks next to each other, and the array isn't allowed
  // to be empty (same restrictions as return value from the builder).
  static of(t) {
    if (t.length == 1)
      return t[0];
    let e = 0, i = t.length, s = 0, r = 0;
    for (; ; )
      if (e == i)
        if (s > r * 2) {
          let l = t[e - 1];
          l.break ? t.splice(--e, 1, l.left, null, l.right) : t.splice(--e, 1, l.left, l.right), i += 1 + l.break, s -= l.size;
        } else if (r > s * 2) {
          let l = t[i];
          l.break ? t.splice(i, 1, l.left, null, l.right) : t.splice(i, 1, l.left, l.right), i += 2 + l.break, r -= l.size;
        } else
          break;
      else if (s < r) {
        let l = t[e++];
        l && (s += l.size);
      } else {
        let l = t[--i];
        l && (r += l.size);
      }
    let o = 0;
    return t[e - 1] == null ? (o = 1, e--) : t[e] == null && (o = 1, i++), new Zn(W.of(t.slice(0, e)), o, W.of(t.slice(i)));
  }
}
function Qt(n, t) {
  return n == t ? n : (n.constructor != t.constructor && (mt = !0), t);
}
W.prototype.size = 1;
const Jn = /* @__PURE__ */ N.replace({});
class ms extends W {
  constructor(t, e, i) {
    super(t, e), this.deco = i, this.spaceAbove = 0;
  }
  mainBlock(t, e) {
    return new z(e, this.length, t + this.spaceAbove, this.height - this.spaceAbove, this.deco || 0);
  }
  blockAt(t, e, i, s) {
    return this.spaceAbove && t < i + this.spaceAbove ? new z(s, 0, i, this.spaceAbove, Jn) : this.mainBlock(i, s);
  }
  lineAt(t, e, i, s, r) {
    let o = this.mainBlock(s, r);
    return this.spaceAbove ? this.blockAt(0, i, s, r).join(o) : o;
  }
  forEachLine(t, e, i, s, r, o) {
    t <= r + this.length && e >= r && o(this.lineAt(0, M.ByPos, i, s, r));
  }
  setMeasuredHeight(t) {
    let e = t.heights[t.index++];
    e < 0 ? (this.spaceAbove = -e, e = t.heights[t.index++]) : this.spaceAbove = 0, this.setHeight(e);
  }
  updateHeight(t, e = 0, i = !1, s) {
    return s && s.from <= e && s.more && this.setMeasuredHeight(s), this.outdated = !1, this;
  }
  toString() {
    return `block(${this.length})`;
  }
}
class F extends ms {
  constructor(t, e, i) {
    super(t, e, null), this.collapsed = 0, this.widgetHeight = 0, this.breaks = 0, this.spaceAbove = i;
  }
  mainBlock(t, e) {
    return new z(e, this.length, t + this.spaceAbove, this.height - this.spaceAbove, this.breaks);
  }
  replace(t, e, i) {
    let s = i[0];
    return i.length == 1 && (s instanceof F || s instanceof L && s.flags & 4) && Math.abs(this.length - s.length) < 10 ? (s instanceof L ? s = new F(s.length, this.height, this.spaceAbove) : s.height = this.height, this.outdated || (s.outdated = !1), s) : W.of(i);
  }
  updateHeight(t, e = 0, i = !1, s) {
    return s && s.from <= e && s.more ? this.setMeasuredHeight(s) : (i || this.outdated) && (this.spaceAbove = 0, this.setHeight(Math.max(this.widgetHeight, t.heightForLine(this.length - this.collapsed)) + this.breaks * t.lineHeight)), this.outdated = !1, this;
  }
  toString() {
    return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
  }
}
class L extends W {
  constructor(t) {
    super(t, 0);
  }
  heightMetrics(t, e) {
    let i = t.doc.lineAt(e).number, s = t.doc.lineAt(e + this.length).number, r = s - i + 1, o, l = 0;
    if (t.lineWrapping) {
      let h = Math.min(this.height, t.lineHeight * r);
      o = h / r, this.length > r + 1 && (l = (this.height - h) / (this.length - r - 1));
    } else
      o = this.height / r;
    return { firstLine: i, lastLine: s, perLine: o, perChar: l };
  }
  blockAt(t, e, i, s) {
    let { firstLine: r, lastLine: o, perLine: l, perChar: h } = this.heightMetrics(e, s);
    if (e.lineWrapping) {
      let a = s + (t < e.lineHeight ? 0 : Math.round(Math.max(0, Math.min(1, (t - i) / this.height)) * this.length)), f = e.doc.lineAt(a), d = l + f.length * h, c = Math.max(i, t - d / 2);
      return new z(f.from, f.length, c, d, 0);
    } else {
      let a = Math.max(0, Math.min(o - r, Math.floor((t - i) / l))), { from: f, length: d } = e.doc.line(r + a);
      return new z(f, d, i + l * a, l, 0);
    }
  }
  lineAt(t, e, i, s, r) {
    if (e == M.ByHeight)
      return this.blockAt(t, i, s, r);
    if (e == M.ByPosNoHeight) {
      let { from: u, to: p } = i.doc.lineAt(t);
      return new z(u, p - u, 0, 0, 0);
    }
    let { firstLine: o, perLine: l, perChar: h } = this.heightMetrics(i, r), a = i.doc.lineAt(t), f = l + a.length * h, d = a.number - o, c = s + l * d + h * (a.from - r - d);
    return new z(a.from, a.length, Math.max(s, Math.min(c, s + this.height - f)), f, 0);
  }
  forEachLine(t, e, i, s, r, o) {
    t = Math.max(t, r), e = Math.min(e, r + this.length);
    let { firstLine: l, perLine: h, perChar: a } = this.heightMetrics(i, r);
    for (let f = t, d = s; f <= e; ) {
      let c = i.doc.lineAt(f);
      if (f == t) {
        let p = c.number - l;
        d += h * p + a * (t - r - p);
      }
      let u = h + a * c.length;
      o(new z(c.from, c.length, d, u, 0)), d += u, f = c.to + 1;
    }
  }
  replace(t, e, i) {
    let s = this.length - e;
    if (s > 0) {
      let r = i[i.length - 1];
      r instanceof L ? i[i.length - 1] = new L(r.length + s) : i.push(null, new L(s - 1));
    }
    if (t > 0) {
      let r = i[0];
      r instanceof L ? i[0] = new L(t + r.length) : i.unshift(new L(t - 1), null);
    }
    return W.of(i);
  }
  decomposeLeft(t, e) {
    e.push(new L(t - 1), null);
  }
  decomposeRight(t, e) {
    e.push(null, new L(this.length - t - 1));
  }
  updateHeight(t, e = 0, i = !1, s) {
    let r = e + this.length;
    if (s && s.from <= e + this.length && s.more) {
      let o = [], l = Math.max(e, s.from), h = -1;
      for (s.from > e && o.push(new L(s.from - e - 1).updateHeight(t, e)); l <= r && s.more; ) {
        let f = t.doc.lineAt(l).length;
        o.length && o.push(null);
        let d = s.heights[s.index++], c = 0;
        d < 0 && (c = -d, d = s.heights[s.index++]), h == -1 ? h = d : Math.abs(d - h) >= qt && (h = -2);
        let u = new F(f, d, c);
        u.outdated = !1, o.push(u), l += f + 1;
      }
      l <= r && o.push(null, new L(r - l).updateHeight(t, l));
      let a = W.of(o);
      return (h < 0 || Math.abs(a.height - this.height) >= qt || Math.abs(h - this.heightMetrics(t, e).perLine) >= qt) && (mt = !0), Qt(this, a);
    } else (i || this.outdated) && (this.setHeight(t.heightForGap(e, e + this.length)), this.outdated = !1);
    return this;
  }
  toString() {
    return `gap(${this.length})`;
  }
}
class Zn extends W {
  constructor(t, e, i) {
    super(t.length + e + i.length, t.height + i.height, e | (t.outdated || i.outdated ? 2 : 0)), this.left = t, this.right = i, this.size = t.size + i.size;
  }
  get break() {
    return this.flags & 1;
  }
  blockAt(t, e, i, s) {
    let r = i + this.left.height;
    return t < r ? this.left.blockAt(t, e, i, s) : this.right.blockAt(t, e, r, s + this.left.length + this.break);
  }
  lineAt(t, e, i, s, r) {
    let o = s + this.left.height, l = r + this.left.length + this.break, h = e == M.ByHeight ? t < o : t < l, a = h ? this.left.lineAt(t, e, i, s, r) : this.right.lineAt(t, e, i, o, l);
    if (this.break || (h ? a.to < l : a.from > l))
      return a;
    let f = e == M.ByPosNoHeight ? M.ByPosNoHeight : M.ByPos;
    return h ? a.join(this.right.lineAt(l, f, i, o, l)) : this.left.lineAt(l, f, i, s, r).join(a);
  }
  forEachLine(t, e, i, s, r, o) {
    let l = s + this.left.height, h = r + this.left.length + this.break;
    if (this.break)
      t < h && this.left.forEachLine(t, e, i, s, r, o), e >= h && this.right.forEachLine(t, e, i, l, h, o);
    else {
      let a = this.lineAt(h, M.ByPos, i, s, r);
      t < a.from && this.left.forEachLine(t, a.from - 1, i, s, r, o), a.to >= t && a.from <= e && o(a), e > a.to && this.right.forEachLine(a.to + 1, e, i, l, h, o);
    }
  }
  replace(t, e, i) {
    let s = this.left.length + this.break;
    if (e < s)
      return this.balanced(this.left.replace(t, e, i), this.right);
    if (t > this.left.length)
      return this.balanced(this.left, this.right.replace(t - s, e - s, i));
    let r = [];
    t > 0 && this.decomposeLeft(t, r);
    let o = r.length;
    for (let l of i)
      r.push(l);
    if (t > 0 && fi(r, o - 1), e < this.length) {
      let l = r.length;
      this.decomposeRight(e, r), fi(r, l);
    }
    return W.of(r);
  }
  decomposeLeft(t, e) {
    let i = this.left.length;
    if (t <= i)
      return this.left.decomposeLeft(t, e);
    e.push(this.left), this.break && (i++, t >= i && e.push(null)), t > i && this.right.decomposeLeft(t - i, e);
  }
  decomposeRight(t, e) {
    let i = this.left.length, s = i + this.break;
    if (t >= s)
      return this.right.decomposeRight(t - s, e);
    t < i && this.left.decomposeRight(t, e), this.break && t < s && e.push(null), e.push(this.right);
  }
  balanced(t, e) {
    return t.size > 2 * e.size || e.size > 2 * t.size ? W.of(this.break ? [t, null, e] : [t, e]) : (this.left = Qt(this.left, t), this.right = Qt(this.right, e), this.setHeight(t.height + e.height), this.outdated = t.outdated || e.outdated, this.size = t.size + e.size, this.length = t.length + this.break + e.length, this);
  }
  updateHeight(t, e = 0, i = !1, s) {
    let { left: r, right: o } = this, l = e + r.length + this.break, h = null;
    return s && s.from <= e + r.length && s.more ? h = r = r.updateHeight(t, e, i, s) : r.updateHeight(t, e, i), s && s.from <= l + o.length && s.more ? h = o = o.updateHeight(t, l, i, s) : o.updateHeight(t, l, i), h ? this.balanced(r, o) : (this.height = this.left.height + this.right.height, this.outdated = !1, this);
  }
  toString() {
    return this.left + (this.break ? " " : "-") + this.right;
  }
}
function fi(n, t) {
  let e, i;
  n[t] == null && (e = n[t - 1]) instanceof L && (i = n[t + 1]) instanceof L && n.splice(t - 1, 3, new L(e.length + 1 + i.length));
}
const tr = 5;
class ze {
  constructor(t, e) {
    this.pos = t, this.oracle = e, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = t;
  }
  get isCovered() {
    return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
  }
  span(t, e) {
    if (this.lineStart > -1) {
      let i = Math.min(e, this.lineEnd), s = this.nodes[this.nodes.length - 1];
      s instanceof F ? s.length += i - this.pos : (i > this.pos || !this.isCovered) && this.nodes.push(new F(i - this.pos, -1, 0)), this.writtenTo = i, e > i && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
    }
    this.pos = e;
  }
  point(t, e, i) {
    if (t < e || i.heightRelevant) {
      let s = i.widget ? i.widget.estimatedHeight : 0, r = i.widget ? i.widget.lineBreaks : 0;
      s < 0 && (s = this.oracle.lineHeight);
      let o = e - t;
      i.block ? this.addBlock(new ms(o, s, i)) : (o || r || s >= tr) && this.addLineDeco(s, r, o);
    } else e > t && this.span(t, e);
    this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
  }
  enterLine() {
    if (this.lineStart > -1)
      return;
    let { from: t, to: e } = this.oracle.doc.lineAt(this.pos);
    this.lineStart = t, this.lineEnd = e, this.writtenTo < t && ((this.writtenTo < t - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, t - 1)), this.nodes.push(null)), this.pos > t && this.nodes.push(new F(this.pos - t, -1, 0)), this.writtenTo = this.pos;
  }
  blankContent(t, e) {
    let i = new L(e - t);
    return this.oracle.doc.lineAt(t).to == e && (i.flags |= 4), i;
  }
  ensureLine() {
    this.enterLine();
    let t = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
    if (t instanceof F)
      return t;
    let e = new F(0, -1, 0);
    return this.nodes.push(e), e;
  }
  addBlock(t) {
    this.enterLine();
    let e = t.deco;
    e && e.startSide > 0 && !this.isCovered && this.ensureLine(), this.nodes.push(t), this.writtenTo = this.pos = this.pos + t.length, e && e.endSide > 0 && (this.covering = t);
  }
  addLineDeco(t, e, i) {
    let s = this.ensureLine();
    s.length += i, s.collapsed += i, s.widgetHeight = Math.max(s.widgetHeight, t), s.breaks += e, this.writtenTo = this.pos = this.pos + i;
  }
  finish(t) {
    let e = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
    this.lineStart > -1 && !(e instanceof F) && !this.isCovered ? this.nodes.push(new F(0, -1, 0)) : (this.writtenTo < this.pos || e == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
    let i = t;
    for (let s of this.nodes)
      s instanceof F && s.updateHeight(this.oracle, i), i += s ? s.length : 1;
    return this.nodes;
  }
  // Always called with a region that on both sides either stretches
  // to a line break or the end of the document.
  // The returned array uses null to indicate line breaks, but never
  // starts or ends in a line break, or has multiple line breaks next
  // to each other.
  static build(t, e, i, s) {
    let r = new ze(i, t);
    return R.spans(e, i, s, r, 0), r.finish(i);
  }
}
function er(n, t, e) {
  let i = new ir();
  return R.compare(n, t, e, i, 0), i.changes;
}
class ir {
  constructor() {
    this.changes = [];
  }
  compareRange() {
  }
  comparePoint(t, e, i, s) {
    (t < e || i && i.heightRelevant || s && s.heightRelevant) && at(t, e, this.changes, 5);
  }
}
function sr(n, t) {
  let e = n.getBoundingClientRect(), i = n.ownerDocument, s = i.defaultView || window, r = Math.max(0, e.left), o = Math.min(s.innerWidth, e.right), l = Math.max(0, e.top), h = Math.min(s.innerHeight, e.bottom);
  for (let a = n.parentNode; a && a != i.body; )
    if (a.nodeType == 1) {
      let f = a, d = window.getComputedStyle(f);
      if ((f.scrollHeight > f.clientHeight || f.scrollWidth > f.clientWidth) && d.overflow != "visible") {
        let c = f.getBoundingClientRect();
        r = Math.max(r, c.left), o = Math.min(o, c.right), l = Math.max(l, c.top), h = Math.min(a == n.parentNode ? s.innerHeight : h, c.bottom);
      }
      a = d.position == "absolute" || d.position == "fixed" ? f.offsetParent : f.parentNode;
    } else if (a.nodeType == 11)
      a = a.host;
    else
      break;
  return {
    left: r - e.left,
    right: Math.max(r, o) - e.left,
    top: l - (e.top + t),
    bottom: Math.max(l, h) - (e.top + t)
  };
}
function nr(n) {
  let t = n.getBoundingClientRect(), e = n.ownerDocument.defaultView || window;
  return t.left < e.innerWidth && t.right > 0 && t.top < e.innerHeight && t.bottom > 0;
}
function rr(n, t) {
  let e = n.getBoundingClientRect();
  return {
    left: 0,
    right: e.right - e.left,
    top: t,
    bottom: e.bottom - (e.top + t)
  };
}
class fe {
  constructor(t, e, i, s) {
    this.from = t, this.to = e, this.size = i, this.displaySize = s;
  }
  static same(t, e) {
    if (t.length != e.length)
      return !1;
    for (let i = 0; i < t.length; i++) {
      let s = t[i], r = e[i];
      if (s.from != r.from || s.to != r.to || s.size != r.size)
        return !1;
    }
    return !0;
  }
  draw(t, e) {
    return N.replace({
      widget: new or(this.displaySize * (e ? t.scaleY : t.scaleX), e)
    }).range(this.from, this.to);
  }
}
class or extends te {
  constructor(t, e) {
    super(), this.size = t, this.vertical = e;
  }
  eq(t) {
    return t.size == this.size && t.vertical == this.vertical;
  }
  toDOM() {
    let t = document.createElement("div");
    return this.vertical ? t.style.height = this.size + "px" : (t.style.width = this.size + "px", t.style.height = "2px", t.style.display = "inline-block"), t;
  }
  get estimatedHeight() {
    return this.vertical ? this.size : -1;
  }
}
class ci {
  constructor(t) {
    this.state = t, this.pixelViewport = { left: 0, right: window.innerWidth, top: 0, bottom: 0 }, this.inView = !0, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.scrollTop = 0, this.scrolledToBottom = !1, this.scaleX = 1, this.scaleY = 1, this.scrollAnchorPos = 0, this.scrollAnchorHeight = -1, this.scaler = di, this.scrollTarget = null, this.printing = !1, this.mustMeasureContent = !0, this.defaultTextDirection = O.LTR, this.visibleRanges = [], this.mustEnforceCursorAssoc = !1;
    let e = t.facet(Ve).some((i) => typeof i != "function" && i.class == "cm-lineWrapping");
    this.heightOracle = new $n(e), this.stateDeco = t.facet(Dt).filter((i) => typeof i != "function"), this.heightMap = W.empty().applyChanges(this.stateDeco, q.empty, this.heightOracle.setDoc(t.doc), [new V(0, 0, 0, t.doc.length)]);
    for (let i = 0; i < 2 && (this.viewport = this.getViewport(0, null), !!this.updateForViewport()); i++)
      ;
    this.updateViewportLines(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = N.set(this.lineGaps.map((i) => i.draw(this, !1))), this.computeVisibleRanges();
  }
  updateForViewport() {
    let t = [this.viewport], { main: e } = this.state.selection;
    for (let i = 0; i <= 1; i++) {
      let s = i ? e.head : e.anchor;
      if (!t.some(({ from: r, to: o }) => s >= r && s <= o)) {
        let { from: r, to: o } = this.lineBlockAt(s);
        t.push(new Ht(r, o));
      }
    }
    return this.viewports = t.sort((i, s) => i.from - s.from), this.updateScaler();
  }
  updateScaler() {
    let t = this.scaler;
    return this.scaler = this.heightMap.height <= 7e6 ? di : new Ke(this.heightOracle, this.heightMap, this.viewports), t.eq(this.scaler) ? 0 : 2;
  }
  updateViewportLines() {
    this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (t) => {
      this.viewportLines.push(xt(t, this.scaler));
    });
  }
  update(t, e = null) {
    this.state = t.state;
    let i = this.stateDeco;
    this.stateDeco = this.state.facet(Dt).filter((f) => typeof f != "function");
    let s = t.changedRanges, r = V.extendWithRanges(s, er(i, this.stateDeco, t ? t.changes : Ai.empty(this.state.doc.length))), o = this.heightMap.height, l = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollTop);
    ai(), this.heightMap = this.heightMap.applyChanges(this.stateDeco, t.startState.doc, this.heightOracle.setDoc(this.state.doc), r), (this.heightMap.height != o || mt) && (t.flags |= 2), l ? (this.scrollAnchorPos = t.changes.mapPos(l.from, -1), this.scrollAnchorHeight = l.top) : (this.scrollAnchorPos = -1, this.scrollAnchorHeight = o);
    let h = r.length ? this.mapViewport(this.viewport, t.changes) : this.viewport;
    (e && (e.range.head < h.from || e.range.head > h.to) || !this.viewportIsAppropriate(h)) && (h = this.getViewport(0, e));
    let a = h.from != this.viewport.from || h.to != this.viewport.to;
    this.viewport = h, t.flags |= this.updateForViewport(), (a || !t.changes.empty || t.flags & 2) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, t.changes))), t.flags |= this.computeVisibleRanges(t.changes), e && (this.scrollTarget = e), !this.mustEnforceCursorAssoc && t.selectionSet && t.view.lineWrapping && t.state.selection.main.empty && t.state.selection.main.assoc && !t.state.facet(Qs) && (this.mustEnforceCursorAssoc = !0);
  }
  measure(t) {
    let e = t.contentDOM, i = window.getComputedStyle(e), s = this.heightOracle, r = i.whiteSpace;
    this.defaultTextDirection = i.direction == "rtl" ? O.RTL : O.LTR;
    let o = this.heightOracle.mustRefreshForWrapping(r), l = e.getBoundingClientRect(), h = o || this.mustMeasureContent || this.contentDOMHeight != l.height;
    this.contentDOMHeight = l.height, this.mustMeasureContent = !1;
    let a = 0, f = 0;
    if (l.width && l.height) {
      let { scaleX: A, scaleY: B } = Bi(e, l);
      (A > 5e-3 && Math.abs(this.scaleX - A) > 5e-3 || B > 5e-3 && Math.abs(this.scaleY - B) > 5e-3) && (this.scaleX = A, this.scaleY = B, a |= 16, o = h = !0);
    }
    let d = (parseInt(i.paddingTop) || 0) * this.scaleY, c = (parseInt(i.paddingBottom) || 0) * this.scaleY;
    (this.paddingTop != d || this.paddingBottom != c) && (this.paddingTop = d, this.paddingBottom = c, a |= 18), this.editorWidth != t.scrollDOM.clientWidth && (s.lineWrapping && (h = !0), this.editorWidth = t.scrollDOM.clientWidth, a |= 16);
    let u = t.scrollDOM.scrollTop * this.scaleY;
    this.scrollTop != u && (this.scrollAnchorHeight = -1, this.scrollTop = u), this.scrolledToBottom = Ri(t.scrollDOM);
    let p = (this.printing ? rr : sr)(e, this.paddingTop), g = p.top - this.pixelViewport.top, m = p.bottom - this.pixelViewport.bottom;
    this.pixelViewport = p;
    let b = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
    if (b != this.inView && (this.inView = b, b && (h = !0)), !this.inView && !this.scrollTarget && !nr(t.dom))
      return 0;
    let x = l.width;
    if ((this.contentDOMWidth != x || this.editorHeight != t.scrollDOM.clientHeight) && (this.contentDOMWidth = l.width, this.editorHeight = t.scrollDOM.clientHeight, a |= 16), h) {
      let A = t.docView.measureVisibleLineHeights(this.viewport);
      if (s.mustRefreshForHeights(A) && (o = !0), o || s.lineWrapping && Math.abs(x - this.contentDOMWidth) > s.charWidth) {
        let { lineHeight: B, charWidth: T, textHeight: Lt } = t.docView.measureTextSize();
        o = B > 0 && s.refresh(r, B, T, Lt, Math.max(5, x / T), A), o && (t.docView.minWidth = 0, a |= 16);
      }
      g > 0 && m > 0 ? f = Math.max(g, m) : g < 0 && m < 0 && (f = Math.min(g, m)), ai();
      for (let B of this.viewports) {
        let T = B.from == this.viewport.from ? A : t.docView.measureVisibleLineHeights(B);
        this.heightMap = (o ? W.empty().applyChanges(this.stateDeco, q.empty, this.heightOracle, [new V(0, 0, 0, t.state.doc.length)]) : this.heightMap).updateHeight(s, 0, o, new Qn(B.from, T));
      }
      mt && (a |= 2);
    }
    let v = !this.viewportIsAppropriate(this.viewport, f) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
    return v && (a & 2 && (a |= this.updateScaler()), this.viewport = this.getViewport(f, this.scrollTarget), a |= this.updateForViewport()), (a & 2 || v) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(o ? [] : this.lineGaps, t)), a |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = !1, t.docView.enforceCursorAssoc()), a;
  }
  get visibleTop() {
    return this.scaler.fromDOM(this.pixelViewport.top);
  }
  get visibleBottom() {
    return this.scaler.fromDOM(this.pixelViewport.bottom);
  }
  getViewport(t, e) {
    let i = 0.5 - Math.max(-0.5, Math.min(0.5, t / 1e3 / 2)), s = this.heightMap, r = this.heightOracle, { visibleTop: o, visibleBottom: l } = this, h = new Ht(s.lineAt(o - i * 1e3, M.ByHeight, r, 0, 0).from, s.lineAt(l + (1 - i) * 1e3, M.ByHeight, r, 0, 0).to);
    if (e) {
      let { head: a } = e.range;
      if (a < h.from || a > h.to) {
        let f = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), d = s.lineAt(a, M.ByPos, r, 0, 0), c;
        e.y == "center" ? c = (d.top + d.bottom) / 2 - f / 2 : e.y == "start" || e.y == "nearest" && a < h.from ? c = d.top : c = d.bottom - f, h = new Ht(s.lineAt(c - 1e3 / 2, M.ByHeight, r, 0, 0).from, s.lineAt(c + f + 1e3 / 2, M.ByHeight, r, 0, 0).to);
      }
    }
    return h;
  }
  mapViewport(t, e) {
    let i = e.mapPos(t.from, -1), s = e.mapPos(t.to, 1);
    return new Ht(this.heightMap.lineAt(i, M.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(s, M.ByPos, this.heightOracle, 0, 0).to);
  }
  // Checks if a given viewport covers the visible part of the
  // document and not too much beyond that.
  viewportIsAppropriate({ from: t, to: e }, i = 0) {
    if (!this.inView)
      return !0;
    let { top: s } = this.heightMap.lineAt(t, M.ByPos, this.heightOracle, 0, 0), { bottom: r } = this.heightMap.lineAt(e, M.ByPos, this.heightOracle, 0, 0), { visibleTop: o, visibleBottom: l } = this;
    return (t == 0 || s <= o - Math.max(10, Math.min(
      -i,
      250
      /* VP.MaxCoverMargin */
    ))) && (e == this.state.doc.length || r >= l + Math.max(10, Math.min(
      i,
      250
      /* VP.MaxCoverMargin */
    ))) && s > o - 2 * 1e3 && r < l + 2 * 1e3;
  }
  mapLineGaps(t, e) {
    if (!t.length || e.empty)
      return t;
    let i = [];
    for (let s of t)
      e.touchesRange(s.from, s.to) || i.push(new fe(e.mapPos(s.from), e.mapPos(s.to), s.size, s.displaySize));
    return i;
  }
  // Computes positions in the viewport where the start or end of a
  // line should be hidden, trying to reuse existing line gaps when
  // appropriate to avoid unneccesary redraws.
  // Uses crude character-counting for the positioning and sizing,
  // since actual DOM coordinates aren't always available and
  // predictable. Relies on generous margins (see LG.Margin) to hide
  // the artifacts this might produce from the user.
  ensureLineGaps(t, e) {
    let i = this.heightOracle.lineWrapping, s = i ? 1e4 : 2e3, r = s >> 1, o = s << 1;
    if (this.defaultTextDirection != O.LTR && !i)
      return [];
    let l = [], h = (f, d, c, u) => {
      if (d - f < r)
        return;
      let p = this.state.selection.main, g = [p.from];
      p.empty || g.push(p.to);
      for (let b of g)
        if (b > f && b < d) {
          h(f, b - 10, c, u), h(b + 10, d, c, u);
          return;
        }
      let m = hr(t, (b) => b.from >= c.from && b.to <= c.to && Math.abs(b.from - f) < r && Math.abs(b.to - d) < r && !g.some((x) => b.from < x && b.to > x));
      if (!m) {
        if (d < c.to && e && i && e.visibleRanges.some((v) => v.from <= d && v.to >= d)) {
          let v = e.moveToLineBoundary(S.cursor(d), !1, !0).head;
          v > f && (d = v);
        }
        let b = this.gapSize(c, f, d, u), x = i || b < 2e6 ? b : 2e6;
        m = new fe(f, d, b, x);
      }
      l.push(m);
    }, a = (f) => {
      if (f.length < o || f.type != P.Text)
        return;
      let d = lr(f.from, f.to, this.stateDeco);
      if (d.total < o)
        return;
      let c = this.scrollTarget ? this.scrollTarget.range.head : null, u, p;
      if (i) {
        let g = s / this.heightOracle.lineLength * this.heightOracle.lineHeight, m, b;
        if (c != null) {
          let x = Nt(d, c), v = ((this.visibleBottom - this.visibleTop) / 2 + g) / f.height;
          m = x - v, b = x + v;
        } else
          m = (this.visibleTop - f.top - g) / f.height, b = (this.visibleBottom - f.top + g) / f.height;
        u = Pt(d, m), p = Pt(d, b);
      } else {
        let g = d.total * this.heightOracle.charWidth, m = s * this.heightOracle.charWidth, b = 0;
        if (g > 2e6)
          for (let T of t)
            T.from >= f.from && T.from < f.to && T.size != T.displaySize && T.from * this.heightOracle.charWidth + b < this.pixelViewport.left && (b = T.size - T.displaySize);
        let x = this.pixelViewport.left + b, v = this.pixelViewport.right + b, A, B;
        if (c != null) {
          let T = Nt(d, c), Lt = ((v - x) / 2 + m) / g;
          A = T - Lt, B = T + Lt;
        } else
          A = (x - m) / g, B = (v + m) / g;
        u = Pt(d, A), p = Pt(d, B);
      }
      u > f.from && h(f.from, u, f, d), p < f.to && h(p, f.to, f, d);
    };
    for (let f of this.viewportLines)
      Array.isArray(f.type) ? f.type.forEach(a) : a(f);
    return l;
  }
  gapSize(t, e, i, s) {
    let r = Nt(s, i) - Nt(s, e);
    return this.heightOracle.lineWrapping ? t.height * r : s.total * this.heightOracle.charWidth * r;
  }
  updateLineGaps(t) {
    fe.same(t, this.lineGaps) || (this.lineGaps = t, this.lineGapDeco = N.set(t.map((e) => e.draw(this, this.heightOracle.lineWrapping))));
  }
  computeVisibleRanges(t) {
    let e = this.stateDeco;
    this.lineGaps.length && (e = e.concat(this.lineGapDeco));
    let i = [];
    R.spans(e, this.viewport.from, this.viewport.to, {
      span(r, o) {
        i.push({ from: r, to: o });
      },
      point() {
      }
    }, 20);
    let s = 0;
    if (i.length != this.visibleRanges.length)
      s = 12;
    else
      for (let r = 0; r < i.length && !(s & 8); r++) {
        let o = this.visibleRanges[r], l = i[r];
        (o.from != l.from || o.to != l.to) && (s |= 4, t && t.mapPos(o.from, -1) == l.from && t.mapPos(o.to, 1) == l.to || (s |= 8));
      }
    return this.visibleRanges = i, s;
  }
  lineBlockAt(t) {
    return t >= this.viewport.from && t <= this.viewport.to && this.viewportLines.find((e) => e.from <= t && e.to >= t) || xt(this.heightMap.lineAt(t, M.ByPos, this.heightOracle, 0, 0), this.scaler);
  }
  lineBlockAtHeight(t) {
    return t >= this.viewportLines[0].top && t <= this.viewportLines[this.viewportLines.length - 1].bottom && this.viewportLines.find((e) => e.top <= t && e.bottom >= t) || xt(this.heightMap.lineAt(this.scaler.fromDOM(t), M.ByHeight, this.heightOracle, 0, 0), this.scaler);
  }
  scrollAnchorAt(t) {
    let e = this.lineBlockAtHeight(t + 8);
    return e.from >= this.viewport.from || this.viewportLines[0].top - t > 200 ? e : this.viewportLines[0];
  }
  elementAtHeight(t) {
    return xt(this.heightMap.blockAt(this.scaler.fromDOM(t), this.heightOracle, 0, 0), this.scaler);
  }
  get docHeight() {
    return this.scaler.toDOM(this.heightMap.height);
  }
  get contentHeight() {
    return this.docHeight + this.paddingTop + this.paddingBottom;
  }
}
class Ht {
  constructor(t, e) {
    this.from = t, this.to = e;
  }
}
function lr(n, t, e) {
  let i = [], s = n, r = 0;
  return R.spans(e, n, t, {
    span() {
    },
    point(o, l) {
      o > s && (i.push({ from: s, to: o }), r += o - s), s = l;
    }
  }, 20), s < t && (i.push({ from: s, to: t }), r += t - s), { total: r, ranges: i };
}
function Pt({ total: n, ranges: t }, e) {
  if (e <= 0)
    return t[0].from;
  if (e >= 1)
    return t[t.length - 1].to;
  let i = Math.floor(n * e);
  for (let s = 0; ; s++) {
    let { from: r, to: o } = t[s], l = o - r;
    if (i <= l)
      return r + i;
    i -= l;
  }
}
function Nt(n, t) {
  let e = 0;
  for (let { from: i, to: s } of n.ranges) {
    if (t <= s) {
      e += t - i;
      break;
    }
    e += s - i;
  }
  return e / n.total;
}
function hr(n, t) {
  for (let e of n)
    if (t(e))
      return e;
}
const di = {
  toDOM(n) {
    return n;
  },
  fromDOM(n) {
    return n;
  },
  scale: 1,
  eq(n) {
    return n == this;
  }
};
class Ke {
  constructor(t, e, i) {
    let s = 0, r = 0, o = 0;
    this.viewports = i.map(({ from: l, to: h }) => {
      let a = e.lineAt(l, M.ByPos, t, 0, 0).top, f = e.lineAt(h, M.ByPos, t, 0, 0).bottom;
      return s += f - a, { from: l, to: h, top: a, bottom: f, domTop: 0, domBottom: 0 };
    }), this.scale = (7e6 - s) / (e.height - s);
    for (let l of this.viewports)
      l.domTop = o + (l.top - r) * this.scale, o = l.domBottom = l.domTop + (l.bottom - l.top), r = l.bottom;
  }
  toDOM(t) {
    for (let e = 0, i = 0, s = 0; ; e++) {
      let r = e < this.viewports.length ? this.viewports[e] : null;
      if (!r || t < r.top)
        return s + (t - i) * this.scale;
      if (t <= r.bottom)
        return r.domTop + (t - r.top);
      i = r.bottom, s = r.domBottom;
    }
  }
  fromDOM(t) {
    for (let e = 0, i = 0, s = 0; ; e++) {
      let r = e < this.viewports.length ? this.viewports[e] : null;
      if (!r || t < r.domTop)
        return i + (t - s) / this.scale;
      if (t <= r.domBottom)
        return r.top + (t - r.domTop);
      i = r.bottom, s = r.domBottom;
    }
  }
  eq(t) {
    return t instanceof Ke ? this.scale == t.scale && this.viewports.length == t.viewports.length && this.viewports.every((e, i) => e.from == t.viewports[i].from && e.to == t.viewports[i].to) : !1;
  }
}
function xt(n, t) {
  if (t.scale == 1)
    return n;
  let e = t.toDOM(n.top), i = t.toDOM(n.bottom);
  return new z(n.from, n.length, e, i - e, Array.isArray(n._content) ? n._content.map((s) => xt(s, t)) : n._content);
}
const Ft = /* @__PURE__ */ w.define({ combine: (n) => n.join(" ") }), De = /* @__PURE__ */ w.define({ combine: (n) => n.indexOf(!0) > -1 }), Te = /* @__PURE__ */ dt.newName(), bs = /* @__PURE__ */ dt.newName(), ys = /* @__PURE__ */ dt.newName(), xs = { "&light": "." + bs, "&dark": "." + ys };
function Oe(n, t, e) {
  return new dt(t, {
    finish(i) {
      return /&/.test(i) ? i.replace(/&\w*/, (s) => {
        if (s == "&")
          return n;
        if (!e || !e[s])
          throw new RangeError(`Unsupported selector: ${s}`);
        return e[s];
      }) : n + " " + i;
    }
  });
}
const ar = /* @__PURE__ */ Oe("." + Te, {
  "&": {
    position: "relative !important",
    boxSizing: "border-box",
    "&.cm-focused": {
      // Provide a simple default outline to make sure a focused
      // editor is visually distinct. Can't leave the default behavior
      // because that will apply to the content element, which is
      // inside the scrollable container and doesn't include the
      // gutters. We also can't use an 'auto' outline, since those
      // are, for some reason, drawn behind the element content, which
      // will cause things like the active line background to cover
      // the outline (#297).
      outline: "1px dotted #212121"
    },
    display: "flex !important",
    flexDirection: "column"
  },
  ".cm-scroller": {
    display: "flex !important",
    alignItems: "flex-start !important",
    fontFamily: "monospace",
    lineHeight: 1.4,
    height: "100%",
    overflowX: "auto",
    position: "relative",
    zIndex: 0,
    overflowAnchor: "none"
  },
  ".cm-content": {
    margin: 0,
    flexGrow: 2,
    flexShrink: 0,
    display: "block",
    whiteSpace: "pre",
    wordWrap: "normal",
    // https://github.com/codemirror/dev/issues/456
    boxSizing: "border-box",
    minHeight: "100%",
    padding: "4px 0",
    outline: "none",
    "&[contenteditable=true]": {
      WebkitUserModify: "read-write-plaintext-only"
    }
  },
  ".cm-lineWrapping": {
    whiteSpace_fallback: "pre-wrap",
    // For IE
    whiteSpace: "break-spaces",
    wordBreak: "break-word",
    // For Safari, which doesn't support overflow-wrap: anywhere
    overflowWrap: "anywhere",
    flexShrink: 1
  },
  "&light .cm-content": { caretColor: "black" },
  "&dark .cm-content": { caretColor: "white" },
  ".cm-line": {
    display: "block",
    padding: "0 2px 0 6px"
  },
  ".cm-layer": {
    position: "absolute",
    left: 0,
    top: 0,
    contain: "size style",
    "& > *": {
      position: "absolute"
    }
  },
  "&light .cm-selectionBackground": {
    background: "#d9d9d9"
  },
  "&dark .cm-selectionBackground": {
    background: "#222"
  },
  "&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#d7d4f0"
  },
  "&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#233"
  },
  ".cm-cursorLayer": {
    pointerEvents: "none"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer": {
    animation: "steps(1) cm-blink 1.2s infinite"
  },
  // Two animations defined so that we can switch between them to
  // restart the animation without forcing another style
  // recomputation.
  "@keyframes cm-blink": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  "@keyframes cm-blink2": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  ".cm-cursor, .cm-dropCursor": {
    borderLeft: "1.2px solid black",
    marginLeft: "-0.6px",
    pointerEvents: "none"
  },
  ".cm-cursor": {
    display: "none"
  },
  "&dark .cm-cursor": {
    borderLeftColor: "#ddd"
  },
  ".cm-dropCursor": {
    position: "absolute"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor": {
    display: "block"
  },
  ".cm-iso": {
    unicodeBidi: "isolate"
  },
  ".cm-announced": {
    position: "fixed",
    top: "-10000px"
  },
  "@media print": {
    ".cm-announced": { display: "none" }
  },
  "&light .cm-activeLine": { backgroundColor: "#cceeff44" },
  "&dark .cm-activeLine": { backgroundColor: "#99eeff33" },
  "&light .cm-specialChar": { color: "red" },
  "&dark .cm-specialChar": { color: "#f78" },
  ".cm-gutters": {
    flexShrink: 0,
    display: "flex",
    height: "100%",
    boxSizing: "border-box",
    zIndex: 200
  },
  ".cm-gutters-before": { insetInlineStart: 0 },
  ".cm-gutters-after": { insetInlineEnd: 0 },
  "&light .cm-gutters": {
    backgroundColor: "#f5f5f5",
    color: "#6c6c6c",
    border: "0px solid #ddd",
    "&.cm-gutters-before": { borderRightWidth: "1px" },
    "&.cm-gutters-after": { borderLeftWidth: "1px" }
  },
  "&dark .cm-gutters": {
    backgroundColor: "#333338",
    color: "#ccc"
  },
  ".cm-gutter": {
    display: "flex !important",
    // Necessary -- prevents margin collapsing
    flexDirection: "column",
    flexShrink: 0,
    boxSizing: "border-box",
    minHeight: "100%",
    overflow: "hidden"
  },
  ".cm-gutterElement": {
    boxSizing: "border-box"
  },
  ".cm-lineNumbers .cm-gutterElement": {
    padding: "0 3px 0 5px",
    minWidth: "20px",
    textAlign: "right",
    whiteSpace: "nowrap"
  },
  "&light .cm-activeLineGutter": {
    backgroundColor: "#e2f2ff"
  },
  "&dark .cm-activeLineGutter": {
    backgroundColor: "#222227"
  },
  ".cm-panels": {
    boxSizing: "border-box",
    position: "sticky",
    left: 0,
    right: 0,
    zIndex: 300
  },
  "&light .cm-panels": {
    backgroundColor: "#f5f5f5",
    color: "black"
  },
  "&light .cm-panels-top": {
    borderBottom: "1px solid #ddd"
  },
  "&light .cm-panels-bottom": {
    borderTop: "1px solid #ddd"
  },
  "&dark .cm-panels": {
    backgroundColor: "#333338",
    color: "white"
  },
  ".cm-dialog": {
    padding: "2px 19px 4px 6px",
    position: "relative",
    "& label": { fontSize: "80%" }
  },
  ".cm-dialog-close": {
    position: "absolute",
    top: "3px",
    right: "4px",
    backgroundColor: "inherit",
    border: "none",
    font: "inherit",
    fontSize: "14px",
    padding: "0"
  },
  ".cm-tab": {
    display: "inline-block",
    overflow: "hidden",
    verticalAlign: "bottom"
  },
  ".cm-widgetBuffer": {
    verticalAlign: "text-top",
    height: "1em",
    width: 0,
    display: "inline"
  },
  ".cm-placeholder": {
    color: "#888",
    display: "inline-block",
    verticalAlign: "top",
    userSelect: "none"
  },
  ".cm-highlightSpace": {
    backgroundImage: "radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",
    backgroundPosition: "center"
  },
  ".cm-highlightTab": {
    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,
    backgroundSize: "auto 100%",
    backgroundPosition: "right 90%",
    backgroundRepeat: "no-repeat"
  },
  ".cm-trailingSpace": {
    backgroundColor: "#ff332255"
  },
  ".cm-button": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    padding: ".2em 1em",
    borderRadius: "1px"
  },
  "&light .cm-button": {
    backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)"
    }
  },
  "&dark .cm-button": {
    backgroundImage: "linear-gradient(#393939, #111)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#111, #333)"
    }
  },
  ".cm-textfield": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    border: "1px solid silver",
    padding: ".2em .5em"
  },
  "&light .cm-textfield": {
    backgroundColor: "white"
  },
  "&dark .cm-textfield": {
    border: "1px solid #555",
    backgroundColor: "inherit"
  }
}, xs), fr = {
  childList: !0,
  characterData: !0,
  subtree: !0,
  attributes: !0,
  characterDataOldValue: !0
}, ce = y.ie && y.ie_version <= 11;
class cr {
  constructor(t) {
    this.view = t, this.active = !1, this.editContext = null, this.selectionRange = new Vs(), this.selectionChanged = !1, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.flushingAndroidKey = -1, this.lastChange = 0, this.scrollTargets = [], this.intersection = null, this.resizeScroll = null, this.intersecting = !1, this.gapIntersection = null, this.gaps = [], this.printQuery = null, this.parentCheck = -1, this.dom = t.contentDOM, this.observer = new MutationObserver((e) => {
      for (let i of e)
        this.queue.push(i);
      (y.ie && y.ie_version <= 11 || y.ios && t.composing) && e.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), window.EditContext && y.android && t.constructor.EDIT_CONTEXT !== !1 && // Chrome <126 doesn't support inverted selections in edit context (#1392)
    !(y.chrome && y.chrome_version < 126) && (this.editContext = new ur(t), t.state.facet(Y) && (t.contentDOM.editContext = this.editContext.editContext)), ce && (this.onCharData = (e) => {
      this.queue.push({
        target: e.target,
        type: "characterData",
        oldValue: e.prevValue
      }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this), this.onResize = this.onResize.bind(this), this.onPrint = this.onPrint.bind(this), this.onScroll = this.onScroll.bind(this), window.matchMedia && (this.printQuery = window.matchMedia("print")), typeof ResizeObserver == "function" && (this.resizeScroll = new ResizeObserver(() => {
      var e;
      ((e = this.view.docView) === null || e === void 0 ? void 0 : e.lastUpdate) < Date.now() - 75 && this.onResize();
    }), this.resizeScroll.observe(t.scrollDOM)), this.addWindowListeners(this.win = t.win), this.start(), typeof IntersectionObserver == "function" && (this.intersection = new IntersectionObserver((e) => {
      this.parentCheck < 0 && (this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3)), e.length > 0 && e[e.length - 1].intersectionRatio > 0 != this.intersecting && (this.intersecting = !this.intersecting, this.intersecting != this.view.inView && this.onScrollChanged(document.createEvent("Event")));
    }, { threshold: [0, 1e-3] }), this.intersection.observe(this.dom), this.gapIntersection = new IntersectionObserver((e) => {
      e.length > 0 && e[e.length - 1].intersectionRatio > 0 && this.onScrollChanged(document.createEvent("Event"));
    }, {})), this.listenForScroll(), this.readSelectionRange();
  }
  onScrollChanged(t) {
    this.view.inputState.runHandlers("scroll", t), this.intersecting && this.view.measure();
  }
  onScroll(t) {
    this.intersecting && this.flush(!1), this.editContext && this.view.requestMeasure(this.editContext.measureReq), this.onScrollChanged(t);
  }
  onResize() {
    this.resizeTimeout < 0 && (this.resizeTimeout = setTimeout(() => {
      this.resizeTimeout = -1, this.view.requestMeasure();
    }, 50));
  }
  onPrint(t) {
    (t.type == "change" || !t.type) && !t.matches || (this.view.viewState.printing = !0, this.view.measure(), setTimeout(() => {
      this.view.viewState.printing = !1, this.view.requestMeasure();
    }, 500));
  }
  updateGaps(t) {
    if (this.gapIntersection && (t.length != this.gaps.length || this.gaps.some((e, i) => e != t[i]))) {
      this.gapIntersection.disconnect();
      for (let e of t)
        this.gapIntersection.observe(e);
      this.gaps = t;
    }
  }
  onSelectionChange(t) {
    let e = this.selectionChanged;
    if (!this.readSelectionRange() || this.delayedAndroidKey)
      return;
    let { view: i } = this, s = this.selectionRange;
    if (i.state.facet(Y) ? i.root.activeElement != this.dom : !zt(this.dom, s))
      return;
    let r = s.anchorNode && i.docView.tile.nearest(s.anchorNode);
    if (r && r.isWidget() && r.widget.ignoreEvent(t)) {
      e || (this.selectionChanged = !1);
      return;
    }
    (y.ie && y.ie_version <= 11 || y.android && y.chrome) && !i.state.selection.main.empty && // (Selection.isCollapsed isn't reliable on IE)
    s.focusNode && Ct(s.focusNode, s.focusOffset, s.anchorNode, s.anchorOffset) ? this.flushSoon() : this.flush(!1);
  }
  readSelectionRange() {
    let { view: t } = this, e = Mt(t.root);
    if (!e)
      return !1;
    let i = y.safari && t.root.nodeType == 11 && t.root.activeElement == this.dom && dr(this.view, e) || e;
    if (!i || this.selectionRange.eq(i))
      return !1;
    let s = zt(this.dom, i);
    return s && !this.selectionChanged && t.inputState.lastFocusTime > Date.now() - 200 && t.inputState.lastTouchTime < Date.now() - 300 && zs(this.dom, i) ? (this.view.inputState.lastFocusTime = 0, t.docView.updateSelection(), !1) : (this.selectionRange.setRange(i), s && (this.selectionChanged = !0), !0);
  }
  setSelectionRange(t, e) {
    this.selectionRange.set(t.node, t.offset, e.node, e.offset), this.selectionChanged = !1;
  }
  clearSelectionRange() {
    this.selectionRange.set(null, 0, null, 0);
  }
  listenForScroll() {
    this.parentCheck = -1;
    let t = 0, e = null;
    for (let i = this.dom; i; )
      if (i.nodeType == 1)
        !e && t < this.scrollTargets.length && this.scrollTargets[t] == i ? t++ : e || (e = this.scrollTargets.slice(0, t)), e && e.push(i), i = i.assignedSlot || i.parentNode;
      else if (i.nodeType == 11)
        i = i.host;
      else
        break;
    if (t < this.scrollTargets.length && !e && (e = this.scrollTargets.slice(0, t)), e) {
      for (let i of this.scrollTargets)
        i.removeEventListener("scroll", this.onScroll);
      for (let i of this.scrollTargets = e)
        i.addEventListener("scroll", this.onScroll);
    }
  }
  ignore(t) {
    if (!this.active)
      return t();
    try {
      return this.stop(), t();
    } finally {
      this.start(), this.clear();
    }
  }
  start() {
    this.active || (this.observer.observe(this.dom, fr), ce && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.active = !0);
  }
  stop() {
    this.active && (this.active = !1, this.observer.disconnect(), ce && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
  }
  // Throw away any pending changes
  clear() {
    this.processRecords(), this.queue.length = 0, this.selectionChanged = !1;
  }
  // Chrome Android, especially in combination with GBoard, not only
  // doesn't reliably fire regular key events, but also often
  // surrounds the effect of enter or backspace with a bunch of
  // composition events that, when interrupted, cause text duplication
  // or other kinds of corruption. This hack makes the editor back off
  // from handling DOM changes for a moment when such a key is
  // detected (via beforeinput or keydown), and then tries to flush
  // them or, if that has no effect, dispatches the given key.
  delayAndroidKey(t, e) {
    var i;
    if (!this.delayedAndroidKey) {
      let s = () => {
        let r = this.delayedAndroidKey;
        r && (this.clearDelayedAndroidKey(), this.view.inputState.lastKeyCode = r.keyCode, this.view.inputState.lastKeyTime = Date.now(), !this.flush() && r.force && ft(this.dom, r.key, r.keyCode));
      };
      this.flushingAndroidKey = this.view.win.requestAnimationFrame(s);
    }
    (!this.delayedAndroidKey || t == "Enter") && (this.delayedAndroidKey = {
      key: t,
      keyCode: e,
      // Only run the key handler when no changes are detected if
      // this isn't coming right after another change, in which case
      // it is probably part of a weird chain of updates, and should
      // be ignored if it returns the DOM to its previous state.
      force: this.lastChange < Date.now() - 50 || !!(!((i = this.delayedAndroidKey) === null || i === void 0) && i.force)
    });
  }
  clearDelayedAndroidKey() {
    this.win.cancelAnimationFrame(this.flushingAndroidKey), this.delayedAndroidKey = null, this.flushingAndroidKey = -1;
  }
  flushSoon() {
    this.delayedFlush < 0 && (this.delayedFlush = this.view.win.requestAnimationFrame(() => {
      this.delayedFlush = -1, this.flush();
    }));
  }
  forceFlush() {
    this.delayedFlush >= 0 && (this.view.win.cancelAnimationFrame(this.delayedFlush), this.delayedFlush = -1), this.flush();
  }
  pendingRecords() {
    for (let t of this.observer.takeRecords())
      this.queue.push(t);
    return this.queue;
  }
  processRecords() {
    let t = this.pendingRecords();
    t.length && (this.queue = []);
    let e = -1, i = -1, s = !1;
    for (let r of t) {
      let o = this.readMutation(r);
      o && (o.typeOver && (s = !0), e == -1 ? { from: e, to: i } = o : (e = Math.min(o.from, e), i = Math.max(o.to, i)));
    }
    return { from: e, to: i, typeOver: s };
  }
  readChange() {
    let { from: t, to: e, typeOver: i } = this.processRecords(), s = this.selectionChanged && zt(this.dom, this.selectionRange);
    if (t < 0 && !s)
      return null;
    t > -1 && (this.lastChange = Date.now()), this.view.inputState.lastFocusTime = 0, this.selectionChanged = !1;
    let r = new Bn(this.view, t, e, i);
    return this.view.docView.domChanged = { newSel: r.newSel ? r.newSel.main : null }, r;
  }
  // Apply pending changes, if any
  flush(t = !0) {
    if (this.delayedFlush >= 0 || this.delayedAndroidKey)
      return !1;
    t && this.readSelectionRange();
    let e = this.readChange();
    if (!e)
      return this.view.requestMeasure(), !1;
    let i = this.view.state, s = os(this.view, e);
    return this.view.state == i && (e.domChanged || e.newSel && !e.newSel.main.eq(this.view.state.selection.main)) && this.view.update([]), s;
  }
  readMutation(t) {
    let e = this.view.docView.tile.nearest(t.target);
    if (!e || e.isWidget())
      return null;
    if (e.markDirty(t.type == "attributes"), t.type == "childList") {
      let i = ui(e, t.previousSibling || t.target.previousSibling, -1), s = ui(e, t.nextSibling || t.target.nextSibling, 1);
      return {
        from: i ? e.posAfter(i) : e.posAtStart,
        to: s ? e.posBefore(s) : e.posAtEnd,
        typeOver: !1
      };
    } else return t.type == "characterData" ? { from: e.posAtStart, to: e.posAtEnd, typeOver: t.target.nodeValue == t.oldValue } : null;
  }
  setWindow(t) {
    t != this.win && (this.removeWindowListeners(this.win), this.win = t, this.addWindowListeners(this.win));
  }
  addWindowListeners(t) {
    t.addEventListener("resize", this.onResize), this.printQuery ? this.printQuery.addEventListener ? this.printQuery.addEventListener("change", this.onPrint) : this.printQuery.addListener(this.onPrint) : t.addEventListener("beforeprint", this.onPrint), t.addEventListener("scroll", this.onScroll), t.document.addEventListener("selectionchange", this.onSelectionChange);
  }
  removeWindowListeners(t) {
    t.removeEventListener("scroll", this.onScroll), t.removeEventListener("resize", this.onResize), this.printQuery ? this.printQuery.removeEventListener ? this.printQuery.removeEventListener("change", this.onPrint) : this.printQuery.removeListener(this.onPrint) : t.removeEventListener("beforeprint", this.onPrint), t.document.removeEventListener("selectionchange", this.onSelectionChange);
  }
  update(t) {
    this.editContext && (this.editContext.update(t), t.startState.facet(Y) != t.state.facet(Y) && (t.view.contentDOM.editContext = t.state.facet(Y) ? this.editContext.editContext : null));
  }
  destroy() {
    var t, e, i;
    this.stop(), (t = this.intersection) === null || t === void 0 || t.disconnect(), (e = this.gapIntersection) === null || e === void 0 || e.disconnect(), (i = this.resizeScroll) === null || i === void 0 || i.disconnect();
    for (let s of this.scrollTargets)
      s.removeEventListener("scroll", this.onScroll);
    this.removeWindowListeners(this.win), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout), this.win.cancelAnimationFrame(this.delayedFlush), this.win.cancelAnimationFrame(this.flushingAndroidKey), this.editContext && (this.view.contentDOM.editContext = null, this.editContext.destroy());
  }
}
function ui(n, t, e) {
  for (; t; ) {
    let i = D.get(t);
    if (i && i.parent == n)
      return i;
    let s = t.parentNode;
    t = s != n.dom ? s : e > 0 ? t.nextSibling : t.previousSibling;
  }
  return null;
}
function pi(n, t) {
  let e = t.startContainer, i = t.startOffset, s = t.endContainer, r = t.endOffset, o = n.docView.domAtPos(n.state.selection.main.anchor, 1);
  return Ct(o.node, o.offset, s, r) && ([e, i, s, r] = [s, r, e, i]), { anchorNode: e, anchorOffset: i, focusNode: s, focusOffset: r };
}
function dr(n, t) {
  if (t.getComposedRanges) {
    let s = t.getComposedRanges(n.root)[0];
    if (s)
      return pi(n, s);
  }
  let e = null;
  function i(s) {
    s.preventDefault(), s.stopImmediatePropagation(), e = s.getTargetRanges()[0];
  }
  return n.contentDOM.addEventListener("beforeinput", i, !0), n.dom.ownerDocument.execCommand("indent"), n.contentDOM.removeEventListener("beforeinput", i, !0), e ? pi(n, e) : null;
}
class ur {
  constructor(t) {
    this.from = 0, this.to = 0, this.pendingContextChange = null, this.handlers = /* @__PURE__ */ Object.create(null), this.composing = null, this.resetRange(t.state);
    let e = this.editContext = new window.EditContext({
      text: t.state.doc.sliceString(this.from, this.to),
      selectionStart: this.toContextPos(Math.max(this.from, Math.min(this.to, t.state.selection.main.anchor))),
      selectionEnd: this.toContextPos(t.state.selection.main.head)
    });
    this.handlers.textupdate = (i) => {
      let s = t.state.selection.main, { anchor: r, head: o } = s, l = this.toEditorPos(i.updateRangeStart), h = this.toEditorPos(i.updateRangeEnd);
      t.inputState.composing >= 0 && !this.composing && (this.composing = { contextBase: i.updateRangeStart, editorBase: l, drifted: !1 });
      let a = h - l > i.text.length;
      l == this.from && r < this.from ? l = r : h == this.to && r > this.to && (h = r);
      let f = ls(t.state.sliceDoc(l, h), i.text, (a ? s.from : s.to) - l, a ? "end" : null);
      if (!f) {
        let c = S.single(this.toEditorPos(i.selectionStart), this.toEditorPos(i.selectionEnd));
        c.main.eq(s) || t.dispatch({ selection: c, userEvent: "select" });
        return;
      }
      let d = {
        from: f.from + l,
        to: f.toA + l,
        insert: q.of(i.text.slice(f.from, f.toB).split(`
`))
      };
      if ((y.mac || y.android) && d.from == o - 1 && /^\. ?$/.test(i.text) && t.contentDOM.getAttribute("autocorrect") == "off" && (d = { from: l, to: h, insert: q.of([i.text.replace(".", " ")]) }), this.pendingContextChange = d, !t.state.readOnly) {
        let c = this.to - this.from + (d.to - d.from + d.insert.length);
        Ie(t, d, S.single(this.toEditorPos(i.selectionStart, c), this.toEditorPos(i.selectionEnd, c)));
      }
      this.pendingContextChange && (this.revertPending(t.state), this.setSelection(t.state)), d.from < d.to && !d.insert.length && t.inputState.composing >= 0 && !/[\\p{Alphabetic}\\p{Number}_]/.test(e.text.slice(Math.max(0, i.updateRangeStart - 1), Math.min(e.text.length, i.updateRangeStart + 1))) && this.handlers.compositionend(i);
    }, this.handlers.characterboundsupdate = (i) => {
      let s = [], r = null;
      for (let o = this.toEditorPos(i.rangeStart), l = this.toEditorPos(i.rangeEnd); o < l; o++) {
        let h = t.coordsForChar(o);
        r = h && new DOMRect(h.left, h.top, h.right - h.left, h.bottom - h.top) || r || new DOMRect(), s.push(r);
      }
      e.updateCharacterBounds(i.rangeStart, s);
    }, this.handlers.textformatupdate = (i) => {
      let s = [];
      for (let r of i.getTextFormats()) {
        let o = r.underlineStyle, l = r.underlineThickness;
        if (!/none/i.test(o) && !/none/i.test(l)) {
          let h = this.toEditorPos(r.rangeStart), a = this.toEditorPos(r.rangeEnd);
          if (h < a) {
            let f = `text-decoration: underline ${/^[a-z]/.test(o) ? o + " " : o == "Dashed" ? "dashed " : o == "Squiggle" ? "wavy " : ""}${/thin/i.test(l) ? 1 : 2}px`;
            s.push(N.mark({ attributes: { style: f } }).range(h, a));
          }
        }
      }
      t.dispatch({ effects: Xi.of(N.set(s)) });
    }, this.handlers.compositionstart = () => {
      t.inputState.composing < 0 && (t.inputState.composing = 0, t.inputState.compositionFirstChange = !0);
    }, this.handlers.compositionend = () => {
      if (t.inputState.composing = -1, t.inputState.compositionFirstChange = null, this.composing) {
        let { drifted: i } = this.composing;
        this.composing = null, i && this.reset(t.state);
      }
    };
    for (let i in this.handlers)
      e.addEventListener(i, this.handlers[i]);
    this.measureReq = { read: (i) => {
      this.editContext.updateControlBounds(i.contentDOM.getBoundingClientRect());
      let s = Mt(i.root);
      s && s.rangeCount && this.editContext.updateSelectionBounds(s.getRangeAt(0).getBoundingClientRect());
    } };
  }
  applyEdits(t) {
    let e = 0, i = !1, s = this.pendingContextChange;
    return t.changes.iterChanges((r, o, l, h, a) => {
      if (i)
        return;
      let f = a.length - (o - r);
      if (s && o >= s.to)
        if (s.from == r && s.to == o && s.insert.eq(a)) {
          s = this.pendingContextChange = null, e += f, this.to += f;
          return;
        } else
          s = null, this.revertPending(t.state);
      if (r += e, o += e, o <= this.from)
        this.from += f, this.to += f;
      else if (r < this.to) {
        if (r < this.from || o > this.to || this.to - this.from + a.length > 3e4) {
          i = !0;
          return;
        }
        this.editContext.updateText(this.toContextPos(r), this.toContextPos(o), a.toString()), this.to += f;
      }
      e += f;
    }), s && !i && this.revertPending(t.state), !i;
  }
  update(t) {
    let e = this.pendingContextChange, i = t.startState.selection.main;
    this.composing && (this.composing.drifted || !t.changes.touchesRange(i.from, i.to) && t.transactions.some((s) => !s.isUserEvent("input.type") && s.changes.touchesRange(this.from, this.to))) ? (this.composing.drifted = !0, this.composing.editorBase = t.changes.mapPos(this.composing.editorBase)) : !this.applyEdits(t) || !this.rangeIsValid(t.state) ? (this.pendingContextChange = null, this.reset(t.state)) : (t.docChanged || t.selectionSet || e) && this.setSelection(t.state), (t.geometryChanged || t.docChanged || t.selectionSet) && t.view.requestMeasure(this.measureReq);
  }
  resetRange(t) {
    let { head: e } = t.selection.main;
    this.from = Math.max(
      0,
      e - 1e4
      /* CxVp.Margin */
    ), this.to = Math.min(
      t.doc.length,
      e + 1e4
      /* CxVp.Margin */
    );
  }
  reset(t) {
    this.resetRange(t), this.editContext.updateText(0, this.editContext.text.length, t.doc.sliceString(this.from, this.to)), this.setSelection(t);
  }
  revertPending(t) {
    let e = this.pendingContextChange;
    this.pendingContextChange = null, this.editContext.updateText(this.toContextPos(e.from), this.toContextPos(e.from + e.insert.length), t.doc.sliceString(e.from, e.to));
  }
  setSelection(t) {
    let { main: e } = t.selection, i = this.toContextPos(Math.max(this.from, Math.min(this.to, e.anchor))), s = this.toContextPos(e.head);
    (this.editContext.selectionStart != i || this.editContext.selectionEnd != s) && this.editContext.updateSelection(i, s);
  }
  rangeIsValid(t) {
    let { head: e } = t.selection.main;
    return !(this.from > 0 && e - this.from < 500 || this.to < t.doc.length && this.to - e < 500 || this.to - this.from > 1e4 * 3);
  }
  toEditorPos(t, e = this.to - this.from) {
    t = Math.min(t, e);
    let i = this.composing;
    return i && i.drifted ? i.editorBase + (t - i.contextBase) : t + this.from;
  }
  toContextPos(t) {
    let e = this.composing;
    return e && e.drifted ? e.contextBase + (t - e.editorBase) : t - this.from;
  }
  destroy() {
    for (let t in this.handlers)
      this.editContext.removeEventListener(t, this.handlers[t]);
  }
}
class C {
  /**
  The current editor state.
  */
  get state() {
    return this.viewState.state;
  }
  /**
  To be able to display large documents without consuming too much
  memory or overloading the browser, CodeMirror only draws the
  code that is visible (plus a margin around it) to the DOM. This
  property tells you the extent of the current drawn viewport, in
  document positions.
  */
  get viewport() {
    return this.viewState.viewport;
  }
  /**
  When there are, for example, large collapsed ranges in the
  viewport, its size can be a lot bigger than the actual visible
  content. Thus, if you are doing something like styling the
  content in the viewport, it is preferable to only do so for
  these ranges, which are the subset of the viewport that is
  actually drawn.
  */
  get visibleRanges() {
    return this.viewState.visibleRanges;
  }
  /**
  Returns false when the editor is entirely scrolled out of view
  or otherwise hidden.
  */
  get inView() {
    return this.viewState.inView;
  }
  /**
  Indicates whether the user is currently composing text via
  [IME](https://en.wikipedia.org/wiki/Input_method), and at least
  one change has been made in the current composition.
  */
  get composing() {
    return !!this.inputState && this.inputState.composing > 0;
  }
  /**
  Indicates whether the user is currently in composing state. Note
  that on some platforms, like Android, this will be the case a
  lot, since just putting the cursor on a word starts a
  composition there.
  */
  get compositionStarted() {
    return !!this.inputState && this.inputState.composing >= 0;
  }
  /**
  The document or shadow root that the view lives in.
  */
  get root() {
    return this._root;
  }
  /**
  @internal
  */
  get win() {
    return this.dom.ownerDocument.defaultView || window;
  }
  /**
  Construct a new view. You'll want to either provide a `parent`
  option, or put `view.dom` into your document after creating a
  view, so that the user can see the editor.
  */
  constructor(t = {}) {
    var e;
    this.plugins = [], this.pluginMap = /* @__PURE__ */ new Map(), this.editorAttrs = {}, this.contentAttrs = {}, this.bidiCache = [], this.destroyed = !1, this.updateState = 2, this.measureScheduled = -1, this.measureRequests = [], this.contentDOM = document.createElement("div"), this.scrollDOM = document.createElement("div"), this.scrollDOM.tabIndex = -1, this.scrollDOM.className = "cm-scroller", this.scrollDOM.appendChild(this.contentDOM), this.announceDOM = document.createElement("div"), this.announceDOM.className = "cm-announced", this.announceDOM.setAttribute("aria-live", "polite"), this.dom = document.createElement("div"), this.dom.appendChild(this.announceDOM), this.dom.appendChild(this.scrollDOM), t.parent && t.parent.appendChild(this.dom);
    let { dispatch: i } = t;
    this.dispatchTransactions = t.dispatchTransactions || i && ((s) => s.forEach((r) => i(r, this))) || ((s) => this.update(s)), this.dispatch = this.dispatch.bind(this), this._root = t.root || Is(t.parent) || document, this.viewState = new ci(t.state || wt.create(t)), t.scrollTo && t.scrollTo.is(Rt) && (this.viewState.scrollTarget = t.scrollTo.value.clip(this.viewState.state)), this.plugins = this.state.facet(lt).map((s) => new re(s));
    for (let s of this.plugins)
      s.update(this);
    this.observer = new cr(this), this.inputState = new Wn(this), this.inputState.ensureHandlers(this.plugins), this.docView = new Qe(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), !((e = document.fonts) === null || e === void 0) && e.ready && document.fonts.ready.then(() => this.requestMeasure());
  }
  dispatch(...t) {
    let e = t.length == 1 && t[0] instanceof vs ? t : t.length == 1 && Array.isArray(t[0]) ? t[0] : [this.state.update(...t)];
    this.dispatchTransactions(e, this);
  }
  /**
  Update the view for the given array of transactions. This will
  update the visible document and selection to match the state
  produced by the transactions, and notify view plugins of the
  change. You should usually call
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead, which uses this
  as a primitive.
  */
  update(t) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.update are not allowed while an update is in progress");
    let e = !1, i = !1, s, r = this.state;
    for (let c of t) {
      if (c.startState != r)
        throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
      r = c.state;
    }
    if (this.destroyed) {
      this.viewState.state = r;
      return;
    }
    let o = this.hasFocus, l = 0, h = null;
    t.some((c) => c.annotation(us)) ? (this.inputState.notifiedFocused = o, l = 1) : o != this.inputState.notifiedFocused && (this.inputState.notifiedFocused = o, h = ps(r, o), h || (l = 1));
    let a = this.observer.delayedAndroidKey, f = null;
    if (a ? (this.observer.clearDelayedAndroidKey(), f = this.observer.readChange(), (f && !this.state.doc.eq(r.doc) || !this.state.selection.eq(r.selection)) && (f = null)) : this.observer.clear(), r.facet(wt.phrases) != this.state.facet(wt.phrases))
      return this.setState(r);
    s = Xt.create(this, r, t), s.flags |= l;
    let d = this.viewState.scrollTarget;
    try {
      this.updateState = 2;
      for (let c of t) {
        if (d && (d = d.map(c.changes)), c.scrollIntoView) {
          let { main: u } = c.state.selection;
          d = new ct(u.empty ? u : S.cursor(u.head, u.head > u.anchor ? -1 : 1));
        }
        for (let u of c.effects)
          u.is(Rt) && (d = u.value.clip(this.state));
      }
      this.viewState.update(s, d), this.bidiCache = Jt.update(this.bidiCache, s.changes), s.empty || (this.updatePlugins(s), this.inputState.update(s)), e = this.docView.update(s), this.state.facet(bt) != this.styleModules && this.mountStyles(), i = this.updateAttrs(), this.showAnnouncements(t), this.docView.updateSelection(e, t.some((c) => c.isUserEvent("select.pointer")));
    } finally {
      this.updateState = 0;
    }
    if (s.startState.facet(Ft) != s.state.facet(Ft) && (this.viewState.mustMeasureContent = !0), (e || i || d || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), e && this.docViewUpdate(), !s.empty)
      for (let c of this.state.facet(ve))
        try {
          c(s);
        } catch (u) {
          U(this.state, u, "update listener");
        }
    (h || f) && Promise.resolve().then(() => {
      h && this.state == h.startState && this.dispatch(h), f && !os(this, f) && a.force && ft(this.contentDOM, a.key, a.keyCode);
    });
  }
  /**
  Reset the view to the given state. (This will cause the entire
  document to be redrawn and all view plugins to be reinitialized,
  so you should probably only use it when the new state isn't
  derived from the old state. Otherwise, use
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead.)
  */
  setState(t) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");
    if (this.destroyed) {
      this.viewState.state = t;
      return;
    }
    this.updateState = 2;
    let e = this.hasFocus;
    try {
      for (let i of this.plugins)
        i.destroy(this);
      this.viewState = new ci(t), this.plugins = t.facet(lt).map((i) => new re(i)), this.pluginMap.clear();
      for (let i of this.plugins)
        i.update(this);
      this.docView.destroy(), this.docView = new Qe(this), this.inputState.ensureHandlers(this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
    } finally {
      this.updateState = 0;
    }
    e && this.focus(), this.requestMeasure();
  }
  updatePlugins(t) {
    let e = t.startState.facet(lt), i = t.state.facet(lt);
    if (e != i) {
      let s = [];
      for (let r of i) {
        let o = e.indexOf(r);
        if (o < 0)
          s.push(new re(r));
        else {
          let l = this.plugins[o];
          l.mustUpdate = t, s.push(l);
        }
      }
      for (let r of this.plugins)
        r.mustUpdate != t && r.destroy(this);
      this.plugins = s, this.pluginMap.clear();
    } else
      for (let s of this.plugins)
        s.mustUpdate = t;
    for (let s = 0; s < this.plugins.length; s++)
      this.plugins[s].update(this);
    e != i && this.inputState.ensureHandlers(this.plugins);
  }
  docViewUpdate() {
    for (let t of this.plugins) {
      let e = t.value;
      if (e && e.docViewUpdate)
        try {
          e.docViewUpdate(this);
        } catch (i) {
          U(this.state, i, "doc view update listener");
        }
    }
  }
  /**
  @internal
  */
  measure(t = !0) {
    if (this.destroyed)
      return;
    if (this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.observer.delayedAndroidKey) {
      this.measureScheduled = -1, this.requestMeasure();
      return;
    }
    this.measureScheduled = 0, t && this.observer.forceFlush();
    let e = null, i = this.scrollDOM, s = i.scrollTop * this.scaleY, { scrollAnchorPos: r, scrollAnchorHeight: o } = this.viewState;
    Math.abs(s - this.viewState.scrollTop) > 1 && (o = -1), this.viewState.scrollAnchorHeight = -1;
    try {
      for (let l = 0; ; l++) {
        if (o < 0)
          if (Ri(i))
            r = -1, o = this.viewState.heightMap.height;
          else {
            let u = this.viewState.scrollAnchorAt(s);
            r = u.from, o = u.top;
          }
        this.updateState = 1;
        let h = this.viewState.measure(this);
        if (!h && !this.measureRequests.length && this.viewState.scrollTarget == null)
          break;
        if (l > 5) {
          console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
          break;
        }
        let a = [];
        h & 4 || ([this.measureRequests, a] = [a, this.measureRequests]);
        let f = a.map((u) => {
          try {
            return u.read(this);
          } catch (p) {
            return U(this.state, p), gi;
          }
        }), d = Xt.create(this, this.state, []), c = !1;
        d.flags |= h, e ? e.flags |= h : e = d, this.updateState = 2, d.empty || (this.updatePlugins(d), this.inputState.update(d), this.updateAttrs(), c = this.docView.update(d), c && this.docViewUpdate());
        for (let u = 0; u < a.length; u++)
          if (f[u] != gi)
            try {
              let p = a[u];
              p.write && p.write(f[u], this);
            } catch (p) {
              U(this.state, p);
            }
        if (c && this.docView.updateSelection(!0), !d.viewportChanged && this.measureRequests.length == 0) {
          if (this.viewState.editorHeight)
            if (this.viewState.scrollTarget) {
              this.docView.scrollIntoView(this.viewState.scrollTarget), this.viewState.scrollTarget = null, o = -1;
              continue;
            } else {
              let p = (r < 0 ? this.viewState.heightMap.height : this.viewState.lineBlockAt(r).top) - o;
              if (p > 1 || p < -1) {
                s = s + p, i.scrollTop = s / this.scaleY, o = -1;
                continue;
              }
            }
          break;
        }
      }
    } finally {
      this.updateState = 0, this.measureScheduled = -1;
    }
    if (e && !e.empty)
      for (let l of this.state.facet(ve))
        l(e);
  }
  /**
  Get the CSS classes for the currently active editor themes.
  */
  get themeClasses() {
    return Te + " " + (this.state.facet(De) ? ys : bs) + " " + this.state.facet(Ft);
  }
  updateAttrs() {
    let t = mi(this, Ui, {
      class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
    }), e = {
      spellcheck: "false",
      autocorrect: "off",
      autocapitalize: "off",
      writingsuggestions: "false",
      translate: "no",
      contenteditable: this.state.facet(Y) ? "true" : "false",
      class: "cm-content",
      style: `${y.tabSize}: ${this.state.tabSize}`,
      role: "textbox",
      "aria-multiline": "true"
    };
    this.state.readOnly && (e["aria-readonly"] = "true"), mi(this, Ve, e);
    let i = this.observer.ignore(() => {
      let s = je(this.contentDOM, this.contentAttrs, e), r = je(this.dom, this.editorAttrs, t);
      return s || r;
    });
    return this.editorAttrs = t, this.contentAttrs = e, i;
  }
  showAnnouncements(t) {
    let e = !0;
    for (let i of t)
      for (let s of i.effects)
        if (s.is(C.announce)) {
          e && (this.announceDOM.textContent = ""), e = !1;
          let r = this.announceDOM.appendChild(document.createElement("div"));
          r.textContent = s.value;
        }
  }
  mountStyles() {
    this.styleModules = this.state.facet(bt);
    let t = this.state.facet(C.cspNonce);
    dt.mount(this.root, this.styleModules.concat(ar).reverse(), t ? { nonce: t } : void 0);
  }
  readMeasured() {
    if (this.updateState == 2)
      throw new Error("Reading the editor layout isn't allowed during an update");
    this.updateState == 0 && this.measureScheduled > -1 && this.measure(!1);
  }
  /**
  Schedule a layout measurement, optionally providing callbacks to
  do custom DOM measuring followed by a DOM write phase. Using
  this is preferable reading DOM layout directly from, for
  example, an event handler, because it'll make sure measuring and
  drawing done by other components is synchronized, avoiding
  unnecessary DOM layout computations.
  */
  requestMeasure(t) {
    if (this.measureScheduled < 0 && (this.measureScheduled = this.win.requestAnimationFrame(() => this.measure())), t) {
      if (this.measureRequests.indexOf(t) > -1)
        return;
      if (t.key != null) {
        for (let e = 0; e < this.measureRequests.length; e++)
          if (this.measureRequests[e].key === t.key) {
            this.measureRequests[e] = t;
            return;
          }
      }
      this.measureRequests.push(t);
    }
  }
  /**
  Get the value of a specific plugin, if present. Note that
  plugins that crash can be dropped from a view, so even when you
  know you registered a given plugin, it is recommended to check
  the return value of this method.
  */
  plugin(t) {
    let e = this.pluginMap.get(t);
    return (e === void 0 || e && e.plugin != t) && this.pluginMap.set(t, e = this.plugins.find((i) => i.plugin == t) || null), e && e.update(this).value;
  }
  /**
  The top position of the document, in screen coordinates. This
  may be negative when the editor is scrolled down. Points
  directly to the top of the first line, not above the padding.
  */
  get documentTop() {
    return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
  }
  /**
  Reports the padding above and below the document.
  */
  get documentPadding() {
    return { top: this.viewState.paddingTop, bottom: this.viewState.paddingBottom };
  }
  /**
  If the editor is transformed with CSS, this provides the scale
  along the X axis. Otherwise, it will just be 1. Note that
  transforms other than translation and scaling are not supported.
  */
  get scaleX() {
    return this.viewState.scaleX;
  }
  /**
  Provide the CSS transformed scale along the Y axis.
  */
  get scaleY() {
    return this.viewState.scaleY;
  }
  /**
  Find the text line or block widget at the given vertical
  position (which is interpreted as relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop)).
  */
  elementAtHeight(t) {
    return this.readMeasured(), this.viewState.elementAtHeight(t);
  }
  /**
  Find the line block (see
  [`lineBlockAt`](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt)) at the given
  height, again interpreted relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop).
  */
  lineBlockAtHeight(t) {
    return this.readMeasured(), this.viewState.lineBlockAtHeight(t);
  }
  /**
  Get the extent and vertical position of all [line
  blocks](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt) in the viewport. Positions
  are relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop);
  */
  get viewportLineBlocks() {
    return this.viewState.viewportLines;
  }
  /**
  Find the line block around the given document position. A line
  block is a range delimited on both sides by either a
  non-[hidden](https://codemirror.net/6/docs/ref/#view.Decoration^replace) line break, or the
  start/end of the document. It will usually just hold a line of
  text, but may be broken into multiple textblocks by block
  widgets.
  */
  lineBlockAt(t) {
    return this.viewState.lineBlockAt(t);
  }
  /**
  The editor's total content height.
  */
  get contentHeight() {
    return this.viewState.contentHeight;
  }
  /**
  Move a cursor position by [grapheme
  cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak). `forward` determines whether
  the motion is away from the line start, or towards it. In
  bidirectional text, the line is traversed in visual order, using
  the editor's [text direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection).
  When the start position was the last one on the line, the
  returned position will be across the line break. If there is no
  further line, the original position is returned.
  
  By default, this method moves over a single cluster. The
  optional `by` argument can be used to move across more. It will
  be called with the first cluster as argument, and should return
  a predicate that determines, for each subsequent cluster,
  whether it should also be moved over.
  */
  moveByChar(t, e, i) {
    return ae(this, t, Je(this, t, e, i));
  }
  /**
  Move a cursor position across the next group of either
  [letters](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) or non-letter
  non-whitespace characters.
  */
  moveByGroup(t, e) {
    return ae(this, t, Je(this, t, e, (i) => Mn(this, t.head, i)));
  }
  /**
  Get the cursor position visually at the start or end of a line.
  Note that this may differ from the _logical_ position at its
  start or end (which is simply at `line.from`/`line.to`) if text
  at the start or end goes against the line's base text direction.
  */
  visualLineSide(t, e) {
    let i = this.bidiSpans(t), s = this.textDirectionAt(t.from), r = i[e ? i.length - 1 : 0];
    return S.cursor(r.side(e, s) + t.from, r.forward(!e, s) ? 1 : -1);
  }
  /**
  Move to the next line boundary in the given direction. If
  `includeWrap` is true, line wrapping is on, and there is a
  further wrap point on the current line, the wrap point will be
  returned. Otherwise this function will return the start or end
  of the line.
  */
  moveToLineBoundary(t, e, i = !0) {
    return kn(this, t, e, i);
  }
  /**
  Move a cursor position vertically. When `distance` isn't given,
  it defaults to moving to the next line (including wrapped
  lines). Otherwise, `distance` should provide a positive distance
  in pixels.
  
  When `start` has a
  [`goalColumn`](https://codemirror.net/6/docs/ref/#state.SelectionRange.goalColumn), the vertical
  motion will use that as a target horizontal position. Otherwise,
  the cursor's own horizontal position is used. The returned
  cursor will have its goal column set to whichever column was
  used.
  */
  moveVertically(t, e, i) {
    return ae(this, t, An(this, t, e, i));
  }
  /**
  Find the DOM parent node and offset (child offset if `node` is
  an element, character offset when it is a text node) at the
  given document position.
  
  Note that for positions that aren't currently in
  `visibleRanges`, the resulting DOM position isn't necessarily
  meaningful (it may just point before or after a placeholder
  element).
  */
  domAtPos(t, e = 1) {
    return this.docView.domAtPos(t, e);
  }
  /**
  Find the document position at the given DOM node. Can be useful
  for associating positions with DOM events. Will raise an error
  when `node` isn't part of the editor content.
  */
  posAtDOM(t, e = 0) {
    return this.docView.posFromDOM(t, e);
  }
  posAtCoords(t, e = !0) {
    this.readMeasured();
    let i = Me(this, t, e);
    return i && i.pos;
  }
  posAndSideAtCoords(t, e = !0) {
    return this.readMeasured(), Me(this, t, e);
  }
  /**
  Get the screen coordinates at the given document position.
  `side` determines whether the coordinates are based on the
  element before (-1) or after (1) the position (if no element is
  available on the given side, the method will transparently use
  another strategy to get reasonable coordinates).
  */
  coordsAtPos(t, e = 1) {
    this.readMeasured();
    let i = this.docView.coordsAt(t, e);
    if (!i || i.left == i.right)
      return i;
    let s = this.state.doc.lineAt(t), r = this.bidiSpans(s), o = r[X.find(r, t - s.from, -1, e)];
    return Yt(i, o.dir == O.LTR == e > 0);
  }
  /**
  Return the rectangle around a given character. If `pos` does not
  point in front of a character that is in the viewport and
  rendered (i.e. not replaced, not a line break), this will return
  null. For space characters that are a line wrap point, this will
  return the position before the line break.
  */
  coordsForChar(t) {
    return this.readMeasured(), this.docView.coordsForChar(t);
  }
  /**
  The default width of a character in the editor. May not
  accurately reflect the width of all characters (given variable
  width fonts or styling of invididual ranges).
  */
  get defaultCharacterWidth() {
    return this.viewState.heightOracle.charWidth;
  }
  /**
  The default height of a line in the editor. May not be accurate
  for all lines.
  */
  get defaultLineHeight() {
    return this.viewState.heightOracle.lineHeight;
  }
  /**
  The text direction
  ([`direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)
  CSS property) of the editor's content element.
  */
  get textDirection() {
    return this.viewState.defaultTextDirection;
  }
  /**
  Find the text direction of the block at the given position, as
  assigned by CSS. If
  [`perLineTextDirection`](https://codemirror.net/6/docs/ref/#view.EditorView^perLineTextDirection)
  isn't enabled, or the given position is outside of the viewport,
  this will always return the same as
  [`textDirection`](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection). Note that
  this may trigger a DOM layout.
  */
  textDirectionAt(t) {
    return !this.state.facet(_i) || t < this.viewport.from || t > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(t));
  }
  /**
  Whether this editor [wraps lines](https://codemirror.net/6/docs/ref/#view.EditorView.lineWrapping)
  (as determined by the
  [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
  CSS property of its content element).
  */
  get lineWrapping() {
    return this.viewState.heightOracle.lineWrapping;
  }
  /**
  Returns the bidirectional text structure of the given line
  (which should be in the current document) as an array of span
  objects. The order of these spans matches the [text
  direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection)—if that is
  left-to-right, the leftmost spans come first, otherwise the
  rightmost spans come first.
  */
  bidiSpans(t) {
    if (t.length > pr)
      return Fi(t.length);
    let e = this.textDirectionAt(t.from), i;
    for (let r of this.bidiCache)
      if (r.from == t.from && r.dir == e && (r.fresh || Ni(r.isolates, i = Xe(this, t))))
        return r.order;
    i || (i = Xe(this, t));
    let s = Xs(t.text, e, i);
    return this.bidiCache.push(new Jt(t.from, t.to, e, i, !0, s)), s;
  }
  /**
  Check whether the editor has focus.
  */
  get hasFocus() {
    var t;
    return (this.dom.ownerDocument.hasFocus() || y.safari && ((t = this.inputState) === null || t === void 0 ? void 0 : t.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
  }
  /**
  Put focus on the editor.
  */
  focus() {
    this.observer.ignore(() => {
      Li(this.contentDOM), this.docView.updateSelection();
    });
  }
  /**
  Update the [root](https://codemirror.net/6/docs/ref/##view.EditorViewConfig.root) in which the editor lives. This is only
  necessary when moving the editor's existing DOM to a new window or shadow root.
  */
  setRoot(t) {
    this._root != t && (this._root = t, this.observer.setWindow((t.nodeType == 9 ? t : t.ownerDocument).defaultView || window), this.mountStyles());
  }
  /**
  Clean up this editor view, removing its element from the
  document, unregistering event handlers, and notifying
  plugins. The view instance can no longer be used after
  calling this.
  */
  destroy() {
    this.root.activeElement == this.contentDOM && this.contentDOM.blur();
    for (let t of this.plugins)
      t.destroy(this);
    this.plugins = [], this.inputState.destroy(), this.docView.destroy(), this.dom.remove(), this.observer.destroy(), this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.destroyed = !0;
  }
  /**
  Returns an effect that can be
  [added](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) to a transaction to
  cause it to scroll the given position or range into view.
  */
  static scrollIntoView(t, e = {}) {
    return Rt.of(new ct(typeof t == "number" ? S.cursor(t) : t, e.y, e.x, e.yMargin, e.xMargin));
  }
  /**
  Return an effect that resets the editor to its current (at the
  time this method was called) scroll position. Note that this
  only affects the editor's own scrollable element, not parents.
  See also
  [`EditorViewConfig.scrollTo`](https://codemirror.net/6/docs/ref/#view.EditorViewConfig.scrollTo).
  
  The effect should be used with a document identical to the one
  it was created for. Failing to do so is not an error, but may
  not scroll to the expected position. You can
  [map](https://codemirror.net/6/docs/ref/#state.StateEffect.map) the effect to account for changes.
  */
  scrollSnapshot() {
    let { scrollTop: t, scrollLeft: e } = this.scrollDOM, i = this.viewState.scrollAnchorAt(t);
    return Rt.of(new ct(S.cursor(i.from), "start", "start", i.top - t, e, !0));
  }
  /**
  Enable or disable tab-focus mode, which disables key bindings
  for Tab and Shift-Tab, letting the browser's default
  focus-changing behavior go through instead. This is useful to
  prevent trapping keyboard users in your editor.
  
  Without argument, this toggles the mode. With a boolean, it
  enables (true) or disables it (false). Given a number, it
  temporarily enables the mode until that number of milliseconds
  have passed or another non-Tab key is pressed.
  */
  setTabFocusMode(t) {
    t == null ? this.inputState.tabFocusMode = this.inputState.tabFocusMode < 0 ? 0 : -1 : typeof t == "boolean" ? this.inputState.tabFocusMode = t ? 0 : -1 : this.inputState.tabFocusMode != 0 && (this.inputState.tabFocusMode = Date.now() + t);
  }
  /**
  Returns an extension that can be used to add DOM event handlers.
  The value should be an object mapping event names to handler
  functions. For any given event, such functions are ordered by
  extension precedence, and the first handler to return true will
  be assumed to have handled that event, and no other handlers or
  built-in behavior will be activated for it. These are registered
  on the [content element](https://codemirror.net/6/docs/ref/#view.EditorView.contentDOM), except
  for `scroll` handlers, which will be called any time the
  editor's [scroll element](https://codemirror.net/6/docs/ref/#view.EditorView.scrollDOM) or one of
  its parent nodes is scrolled.
  */
  static domEventHandlers(t) {
    return rt.define(() => ({}), { eventHandlers: t });
  }
  /**
  Create an extension that registers DOM event observers. Contrary
  to event [handlers](https://codemirror.net/6/docs/ref/#view.EditorView^domEventHandlers),
  observers can't be prevented from running by a higher-precedence
  handler returning true. They also don't prevent other handlers
  and observers from running when they return true, and should not
  call `preventDefault`.
  */
  static domEventObservers(t) {
    return rt.define(() => ({}), { eventObservers: t });
  }
  /**
  Create a theme extension. The first argument can be a
  [`style-mod`](https://github.com/marijnh/style-mod#documentation)
  style spec providing the styles for the theme. These will be
  prefixed with a generated class for the style.
  
  Because the selectors will be prefixed with a scope class, rule
  that directly match the editor's [wrapper
  element](https://codemirror.net/6/docs/ref/#view.EditorView.dom)—to which the scope class will be
  added—need to be explicitly differentiated by adding an `&` to
  the selector for that element—for example
  `&.cm-focused`.
  
  When `dark` is set to true, the theme will be marked as dark,
  which will cause the `&dark` rules from [base
  themes](https://codemirror.net/6/docs/ref/#view.EditorView^baseTheme) to be used (as opposed to
  `&light` when a light theme is active).
  */
  static theme(t, e) {
    let i = dt.newName(), s = [Ft.of(i), bt.of(Oe(`.${i}`, t))];
    return e && e.dark && s.push(De.of(!0)), s;
  }
  /**
  Create an extension that adds styles to the base theme. Like
  with [`theme`](https://codemirror.net/6/docs/ref/#view.EditorView^theme), use `&` to indicate the
  place of the editor wrapper element when directly targeting
  that. You can also use `&dark` or `&light` instead to only
  target editors with a dark or light theme.
  */
  static baseTheme(t) {
    return Mi.lowest(bt.of(Oe("." + Te, t, xs)));
  }
  /**
  Retrieve an editor view instance from the view's DOM
  representation.
  */
  static findFromDOM(t) {
    var e;
    let i = t.querySelector(".cm-content"), s = i && D.get(i) || D.get(t);
    return ((e = s == null ? void 0 : s.root) === null || e === void 0 ? void 0 : e.view) || null;
  }
}
C.styleModule = bt;
C.inputHandler = Gi;
C.clipboardInputFilter = Ne;
C.clipboardOutputFilter = Fe;
C.scrollHandler = Yi;
C.focusChangeEffect = ji;
C.perLineTextDirection = _i;
C.exceptionSink = qi;
C.updateListener = ve;
C.editable = Y;
C.mouseSelectionStyle = Ki;
C.dragMovesSelection = zi;
C.clickAddsSelectionRange = Ii;
C.decorations = Dt;
C.blockWrappers = $i;
C.outerDecorations = Qi;
C.atomicRanges = Bt;
C.bidiIsolatedRanges = Ji;
C.scrollMargins = Zi;
C.darkTheme = De;
C.cspNonce = /* @__PURE__ */ w.define({ combine: (n) => n.length ? n[0] : "" });
C.contentAttributes = Ve;
C.editorAttributes = Ui;
C.lineWrapping = /* @__PURE__ */ C.contentAttributes.of({ class: "cm-lineWrapping" });
C.announce = /* @__PURE__ */ Re.define();
const pr = 4096, gi = {};
class Jt {
  constructor(t, e, i, s, r, o) {
    this.from = t, this.to = e, this.dir = i, this.isolates = s, this.fresh = r, this.order = o;
  }
  static update(t, e) {
    if (e.empty && !t.some((r) => r.fresh))
      return t;
    let i = [], s = t.length ? t[t.length - 1].dir : O.LTR;
    for (let r = Math.max(0, t.length - 10); r < t.length; r++) {
      let o = t[r];
      o.dir == s && !e.touchesRange(o.from, o.to) && i.push(new Jt(e.mapPos(o.from, 1), e.mapPos(o.to, -1), o.dir, o.isolates, !1, o.order));
    }
    return i;
  }
}
function mi(n, t, e) {
  for (let i = n.state.facet(t), s = i.length - 1; s >= 0; s--) {
    let r = i[s], o = typeof r == "function" ? r(n) : r;
    o && We(o, e);
  }
  return e;
}
const gr = y.mac ? "mac" : y.windows ? "win" : y.linux ? "linux" : "key";
function mr(n, t) {
  const e = n.split(/-(?!$)/);
  let i = e[e.length - 1];
  i == "Space" && (i = " ");
  let s, r, o, l;
  for (let h = 0; h < e.length - 1; ++h) {
    const a = e[h];
    if (/^(cmd|meta|m)$/i.test(a))
      l = !0;
    else if (/^a(lt)?$/i.test(a))
      s = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      r = !0;
    else if (/^s(hift)?$/i.test(a))
      o = !0;
    else if (/^mod$/i.test(a))
      t == "mac" ? l = !0 : r = !0;
    else
      throw new Error("Unrecognized modifier name: " + a);
  }
  return s && (i = "Alt-" + i), r && (i = "Ctrl-" + i), l && (i = "Meta-" + i), o && (i = "Shift-" + i), i;
}
function Vt(n, t, e) {
  return t.altKey && (n = "Alt-" + n), t.ctrlKey && (n = "Ctrl-" + n), t.metaKey && (n = "Meta-" + n), e !== !1 && t.shiftKey && (n = "Shift-" + n), n;
}
const br = /* @__PURE__ */ Mi.default(/* @__PURE__ */ C.domEventHandlers({
  keydown(n, t) {
    return Ss(ws(t.state), n, t, "editor");
  }
})), yr = /* @__PURE__ */ w.define({ enables: br }), bi = /* @__PURE__ */ new WeakMap();
function ws(n) {
  let t = n.facet(yr), e = bi.get(t);
  return e || bi.set(t, e = wr(t.reduce((i, s) => i.concat(s), []))), e;
}
function Hr(n, t, e) {
  return Ss(ws(n.state), t, n, e);
}
let Q = null;
const xr = 4e3;
function wr(n, t = gr) {
  let e = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null), s = (o, l) => {
    let h = i[o];
    if (h == null)
      i[o] = l;
    else if (h != l)
      throw new Error("Key binding " + o + " is used both as a regular binding and as a multi-stroke prefix");
  }, r = (o, l, h, a, f) => {
    var d, c;
    let u = e[o] || (e[o] = /* @__PURE__ */ Object.create(null)), p = l.split(/ (?!$)/).map((b) => mr(b, t));
    for (let b = 1; b < p.length; b++) {
      let x = p.slice(0, b).join(" ");
      s(x, !0), u[x] || (u[x] = {
        preventDefault: !0,
        stopPropagation: !1,
        run: [(v) => {
          let A = Q = { view: v, prefix: x, scope: o };
          return setTimeout(() => {
            Q == A && (Q = null);
          }, xr), !0;
        }]
      });
    }
    let g = p.join(" ");
    s(g, !1);
    let m = u[g] || (u[g] = {
      preventDefault: !1,
      stopPropagation: !1,
      run: ((c = (d = u._any) === null || d === void 0 ? void 0 : d.run) === null || c === void 0 ? void 0 : c.slice()) || []
    });
    h && m.run.push(h), a && (m.preventDefault = !0), f && (m.stopPropagation = !0);
  };
  for (let o of n) {
    let l = o.scope ? o.scope.split(" ") : ["editor"];
    if (o.any)
      for (let a of l) {
        let f = e[a] || (e[a] = /* @__PURE__ */ Object.create(null));
        f._any || (f._any = { preventDefault: !1, stopPropagation: !1, run: [] });
        let { any: d } = o;
        for (let c in f)
          f[c].run.push((u) => d(u, Be));
      }
    let h = o[t] || o.key;
    if (h)
      for (let a of l)
        r(a, h, o.run, o.preventDefault, o.stopPropagation), o.shift && r(a, "Shift-" + h, o.shift, o.preventDefault, o.stopPropagation);
  }
  return e;
}
let Be = null;
function Ss(n, t, e, i) {
  Be = t;
  let s = Os(t), r = As(s, 0), o = Ds(r) == s.length && s != " ", l = "", h = !1, a = !1, f = !1;
  Q && Q.view == e && Q.scope == i && (l = Q.prefix + " ", as.indexOf(t.keyCode) < 0 && (a = !0, Q = null));
  let d = /* @__PURE__ */ new Set(), c = (m) => {
    if (m) {
      for (let b of m.run)
        if (!d.has(b) && (d.add(b), b(e)))
          return m.stopPropagation && (f = !0), !0;
      m.preventDefault && (m.stopPropagation && (f = !0), a = !0);
    }
    return !1;
  }, u = n[i], p, g;
  return u && (c(u[l + Vt(s, t, !o)]) ? h = !0 : o && (t.altKey || t.metaKey || t.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
  !(y.windows && t.ctrlKey && t.altKey) && // Alt-combinations on macOS tend to be typed characters
  !(y.mac && t.altKey && !(t.ctrlKey || t.metaKey)) && (p = Bs[t.keyCode]) && p != s ? (c(u[l + Vt(p, t, !0)]) || t.shiftKey && (g = Ls[t.keyCode]) != s && g != p && c(u[l + Vt(g, t, !1)])) && (h = !0) : o && t.shiftKey && c(u[l + Vt(s, t, !0)]) && (h = !0), !h && c(u._any) && (h = !0)), a && (h = !0), h && f && t.stopPropagation(), Be = null, h;
}
const Sr = /* @__PURE__ */ w.define({
  combine(n) {
    return Di(n, {
      cursorBlinkRate: 1200,
      drawRangeCursor: !0
    }, {
      cursorBlinkRate: (t, e) => Math.min(t, e),
      drawRangeCursor: (t, e) => t || e
    });
  }
});
function Pr(n) {
  return n.facet(Sr);
}
const yi = /* @__PURE__ */ w.define({
  combine(n) {
    let t, e;
    for (let i of n)
      t = t || i.topContainer, e = e || i.bottomContainer;
    return { topContainer: t, bottomContainer: e };
  }
}), Cr = /* @__PURE__ */ rt.fromClass(class {
  constructor(n) {
    this.input = n.state.facet(wi), this.specs = this.input.filter((e) => e), this.panels = this.specs.map((e) => e(n));
    let t = n.state.facet(yi);
    this.top = new It(n, !0, t.topContainer), this.bottom = new It(n, !1, t.bottomContainer), this.top.sync(this.panels.filter((e) => e.top)), this.bottom.sync(this.panels.filter((e) => !e.top));
    for (let e of this.panels)
      e.dom.classList.add("cm-panel"), e.mount && e.mount();
  }
  update(n) {
    let t = n.state.facet(yi);
    this.top.container != t.topContainer && (this.top.sync([]), this.top = new It(n.view, !0, t.topContainer)), this.bottom.container != t.bottomContainer && (this.bottom.sync([]), this.bottom = new It(n.view, !1, t.bottomContainer)), this.top.syncClasses(), this.bottom.syncClasses();
    let e = n.state.facet(wi);
    if (e != this.input) {
      let i = e.filter((h) => h), s = [], r = [], o = [], l = [];
      for (let h of i) {
        let a = this.specs.indexOf(h), f;
        a < 0 ? (f = h(n.view), l.push(f)) : (f = this.panels[a], f.update && f.update(n)), s.push(f), (f.top ? r : o).push(f);
      }
      this.specs = i, this.panels = s, this.top.sync(r), this.bottom.sync(o);
      for (let h of l)
        h.dom.classList.add("cm-panel"), h.mount && h.mount();
    } else
      for (let i of this.panels)
        i.update && i.update(n);
  }
  destroy() {
    this.top.sync([]), this.bottom.sync([]);
  }
}, {
  provide: (n) => C.scrollMargins.of((t) => {
    let e = t.plugin(n);
    return e && { top: e.top.scrollMargin(), bottom: e.bottom.scrollMargin() };
  })
});
class It {
  constructor(t, e, i) {
    this.view = t, this.top = e, this.container = i, this.dom = void 0, this.classes = "", this.panels = [], this.syncClasses();
  }
  sync(t) {
    for (let e of this.panels)
      e.destroy && t.indexOf(e) < 0 && e.destroy();
    this.panels = t, this.syncDOM();
  }
  syncDOM() {
    if (this.panels.length == 0) {
      this.dom && (this.dom.remove(), this.dom = void 0);
      return;
    }
    if (!this.dom) {
      this.dom = document.createElement("div"), this.dom.className = this.top ? "cm-panels cm-panels-top" : "cm-panels cm-panels-bottom", this.dom.style[this.top ? "top" : "bottom"] = "0";
      let e = this.container || this.view.dom;
      e.insertBefore(this.dom, this.top ? e.firstChild : null);
    }
    let t = this.dom.firstChild;
    for (let e of this.panels)
      if (e.dom.parentNode == this.dom) {
        for (; t != e.dom; )
          t = xi(t);
        t = t.nextSibling;
      } else
        this.dom.insertBefore(e.dom, t);
    for (; t; )
      t = xi(t);
  }
  scrollMargin() {
    return !this.dom || this.container ? 0 : Math.max(0, this.top ? this.dom.getBoundingClientRect().bottom - Math.max(0, this.view.scrollDOM.getBoundingClientRect().top) : Math.min(innerHeight, this.view.scrollDOM.getBoundingClientRect().bottom) - this.dom.getBoundingClientRect().top);
  }
  syncClasses() {
    if (!(!this.container || this.classes == this.view.themeClasses)) {
      for (let t of this.classes.split(" "))
        t && this.container.classList.remove(t);
      for (let t of (this.classes = this.view.themeClasses).split(" "))
        t && this.container.classList.add(t);
    }
  }
}
function xi(n) {
  let t = n.nextSibling;
  return n.remove(), t;
}
const wi = /* @__PURE__ */ w.define({
  enables: Cr
});
class ot extends Ee {
  /**
  @internal
  */
  compare(t) {
    return this == t || this.constructor == t.constructor && this.eq(t);
  }
  /**
  Compare this marker to another marker of the same type.
  */
  eq(t) {
    return !1;
  }
  /**
  Called if the marker has a `toDOM` method and its representation
  was removed from a gutter.
  */
  destroy(t) {
  }
}
ot.prototype.elementClass = "";
ot.prototype.toDOM = void 0;
ot.prototype.mapMode = St.TrackBefore;
ot.prototype.startSide = ot.prototype.endSide = -1;
ot.prototype.point = !0;
const de = /* @__PURE__ */ w.define(), vr = /* @__PURE__ */ w.define(), Gt = /* @__PURE__ */ w.define(), Si = /* @__PURE__ */ w.define({
  combine: (n) => n.some((t) => t)
});
function kr(n) {
  return [
    Mr
  ];
}
const Mr = /* @__PURE__ */ rt.fromClass(class {
  constructor(n) {
    this.view = n, this.domAfter = null, this.prevViewport = n.viewport, this.dom = document.createElement("div"), this.dom.className = "cm-gutters cm-gutters-before", this.dom.setAttribute("aria-hidden", "true"), this.dom.style.minHeight = this.view.contentHeight / this.view.scaleY + "px", this.gutters = n.state.facet(Gt).map((t) => new vi(n, t)), this.fixed = !n.state.facet(Si);
    for (let t of this.gutters)
      t.config.side == "after" ? this.getDOMAfter().appendChild(t.dom) : this.dom.appendChild(t.dom);
    this.fixed && (this.dom.style.position = "sticky"), this.syncGutters(!1), n.scrollDOM.insertBefore(this.dom, n.contentDOM);
  }
  getDOMAfter() {
    return this.domAfter || (this.domAfter = document.createElement("div"), this.domAfter.className = "cm-gutters cm-gutters-after", this.domAfter.setAttribute("aria-hidden", "true"), this.domAfter.style.minHeight = this.view.contentHeight / this.view.scaleY + "px", this.domAfter.style.position = this.fixed ? "sticky" : "", this.view.scrollDOM.appendChild(this.domAfter)), this.domAfter;
  }
  update(n) {
    if (this.updateGutters(n)) {
      let t = this.prevViewport, e = n.view.viewport, i = Math.min(t.to, e.to) - Math.max(t.from, e.from);
      this.syncGutters(i < (e.to - e.from) * 0.8);
    }
    if (n.geometryChanged) {
      let t = this.view.contentHeight / this.view.scaleY + "px";
      this.dom.style.minHeight = t, this.domAfter && (this.domAfter.style.minHeight = t);
    }
    this.view.state.facet(Si) != !this.fixed && (this.fixed = !this.fixed, this.dom.style.position = this.fixed ? "sticky" : "", this.domAfter && (this.domAfter.style.position = this.fixed ? "sticky" : "")), this.prevViewport = n.view.viewport;
  }
  syncGutters(n) {
    let t = this.dom.nextSibling;
    n && (this.dom.remove(), this.domAfter && this.domAfter.remove());
    let e = R.iter(this.view.state.facet(de), this.view.viewport.from), i = [], s = this.gutters.map((r) => new Ar(r, this.view.viewport, -this.view.documentPadding.top));
    for (let r of this.view.viewportLineBlocks)
      if (i.length && (i = []), Array.isArray(r.type)) {
        let o = !0;
        for (let l of r.type)
          if (l.type == P.Text && o) {
            Le(e, i, l.from);
            for (let h of s)
              h.line(this.view, l, i);
            o = !1;
          } else if (l.widget)
            for (let h of s)
              h.widget(this.view, l);
      } else if (r.type == P.Text) {
        Le(e, i, r.from);
        for (let o of s)
          o.line(this.view, r, i);
      } else if (r.widget)
        for (let o of s)
          o.widget(this.view, r);
    for (let r of s)
      r.finish();
    n && (this.view.scrollDOM.insertBefore(this.dom, t), this.domAfter && this.view.scrollDOM.appendChild(this.domAfter));
  }
  updateGutters(n) {
    let t = n.startState.facet(Gt), e = n.state.facet(Gt), i = n.docChanged || n.heightChanged || n.viewportChanged || !R.eq(n.startState.facet(de), n.state.facet(de), n.view.viewport.from, n.view.viewport.to);
    if (t == e)
      for (let s of this.gutters)
        s.update(n) && (i = !0);
    else {
      i = !0;
      let s = [];
      for (let r of e) {
        let o = t.indexOf(r);
        o < 0 ? s.push(new vi(this.view, r)) : (this.gutters[o].update(n), s.push(this.gutters[o]));
      }
      for (let r of this.gutters)
        r.dom.remove(), s.indexOf(r) < 0 && r.destroy();
      for (let r of s)
        r.config.side == "after" ? this.getDOMAfter().appendChild(r.dom) : this.dom.appendChild(r.dom);
      this.gutters = s;
    }
    return i;
  }
  destroy() {
    for (let n of this.gutters)
      n.destroy();
    this.dom.remove(), this.domAfter && this.domAfter.remove();
  }
}, {
  provide: (n) => C.scrollMargins.of((t) => {
    let e = t.plugin(n);
    if (!e || e.gutters.length == 0 || !e.fixed)
      return null;
    let i = e.dom.offsetWidth * t.scaleX, s = e.domAfter ? e.domAfter.offsetWidth * t.scaleX : 0;
    return t.textDirection == O.LTR ? { left: i, right: s } : { right: i, left: s };
  })
});
function Ci(n) {
  return Array.isArray(n) ? n : [n];
}
function Le(n, t, e) {
  for (; n.value && n.from <= e; )
    n.from == e && t.push(n.value), n.next();
}
class Ar {
  constructor(t, e, i) {
    this.gutter = t, this.height = i, this.i = 0, this.cursor = R.iter(t.markers, e.from);
  }
  addElement(t, e, i) {
    let { gutter: s } = this, r = (e.top - this.height) / t.scaleY, o = e.height / t.scaleY;
    if (this.i == s.elements.length) {
      let l = new Cs(t, o, r, i);
      s.elements.push(l), s.dom.appendChild(l.dom);
    } else
      s.elements[this.i].update(t, o, r, i);
    this.height = e.bottom, this.i++;
  }
  line(t, e, i) {
    let s = [];
    Le(this.cursor, s, e.from), i.length && (s = s.concat(i));
    let r = this.gutter.config.lineMarker(t, e, s);
    r && s.unshift(r);
    let o = this.gutter;
    s.length == 0 && !o.config.renderEmptyElements || this.addElement(t, e, s);
  }
  widget(t, e) {
    let i = this.gutter.config.widgetMarker(t, e.widget, e), s = i ? [i] : null;
    for (let r of t.state.facet(vr)) {
      let o = r(t, e.widget, e);
      o && (s || (s = [])).push(o);
    }
    s && this.addElement(t, e, s);
  }
  finish() {
    let t = this.gutter;
    for (; t.elements.length > this.i; ) {
      let e = t.elements.pop();
      t.dom.removeChild(e.dom), e.destroy();
    }
  }
}
class vi {
  constructor(t, e) {
    this.view = t, this.config = e, this.elements = [], this.spacer = null, this.dom = document.createElement("div"), this.dom.className = "cm-gutter" + (this.config.class ? " " + this.config.class : "");
    for (let i in e.domEventHandlers)
      this.dom.addEventListener(i, (s) => {
        let r = s.target, o;
        if (r != this.dom && this.dom.contains(r)) {
          for (; r.parentNode != this.dom; )
            r = r.parentNode;
          let h = r.getBoundingClientRect();
          o = (h.top + h.bottom) / 2;
        } else
          o = s.clientY;
        let l = t.lineBlockAtHeight(o - t.documentTop);
        e.domEventHandlers[i](t, l, s) && s.preventDefault();
      });
    this.markers = Ci(e.markers(t)), e.initialSpacer && (this.spacer = new Cs(t, 0, 0, [e.initialSpacer(t)]), this.dom.appendChild(this.spacer.dom), this.spacer.dom.style.cssText += "visibility: hidden; pointer-events: none");
  }
  update(t) {
    let e = this.markers;
    if (this.markers = Ci(this.config.markers(t.view)), this.spacer && this.config.updateSpacer) {
      let s = this.config.updateSpacer(this.spacer.markers[0], t);
      s != this.spacer.markers[0] && this.spacer.update(t.view, 0, 0, [s]);
    }
    let i = t.view.viewport;
    return !R.eq(this.markers, e, i.from, i.to) || (this.config.lineMarkerChange ? this.config.lineMarkerChange(t) : !1);
  }
  destroy() {
    for (let t of this.elements)
      t.destroy();
  }
}
class Cs {
  constructor(t, e, i, s) {
    this.height = -1, this.above = 0, this.markers = [], this.dom = document.createElement("div"), this.dom.className = "cm-gutterElement", this.update(t, e, i, s);
  }
  update(t, e, i, s) {
    this.height != e && (this.height = e, this.dom.style.height = e + "px"), this.above != i && (this.dom.style.marginTop = (this.above = i) ? i + "px" : ""), Dr(this.markers, s) || this.setMarkers(t, s);
  }
  setMarkers(t, e) {
    let i = "cm-gutterElement", s = this.dom.firstChild;
    for (let r = 0, o = 0; ; ) {
      let l = o, h = r < e.length ? e[r++] : null, a = !1;
      if (h) {
        let f = h.elementClass;
        f && (i += " " + f);
        for (let d = o; d < this.markers.length; d++)
          if (this.markers[d].compare(h)) {
            l = d, a = !0;
            break;
          }
      } else
        l = this.markers.length;
      for (; o < l; ) {
        let f = this.markers[o++];
        if (f.toDOM) {
          f.destroy(s);
          let d = s.nextSibling;
          s.remove(), s = d;
        }
      }
      if (!h)
        break;
      h.toDOM && (a ? s = s.nextSibling : this.dom.insertBefore(h.toDOM(t), s)), a && o++;
    }
    this.dom.className = i, this.markers = e;
  }
  destroy() {
    this.setMarkers(null, []);
  }
}
function Dr(n, t) {
  if (n.length != t.length)
    return !1;
  for (let e = 0; e < n.length; e++)
    if (!n[e].compare(t[e]))
      return !1;
  return !0;
}
const Tr = /* @__PURE__ */ w.define(), Or = /* @__PURE__ */ w.define(), ht = /* @__PURE__ */ w.define({
  combine(n) {
    return Di(n, { formatNumber: String, domEventHandlers: {} }, {
      domEventHandlers(t, e) {
        let i = Object.assign({}, t);
        for (let s in e) {
          let r = i[s], o = e[s];
          i[s] = r ? (l, h, a) => r(l, h, a) || o(l, h, a) : o;
        }
        return i;
      }
    });
  }
});
class ue extends ot {
  constructor(t) {
    super(), this.number = t;
  }
  eq(t) {
    return this.number == t.number;
  }
  toDOM() {
    return document.createTextNode(this.number);
  }
}
function pe(n, t) {
  return n.state.facet(ht).formatNumber(t, n.state);
}
const Br = /* @__PURE__ */ Gt.compute([ht], (n) => ({
  class: "cm-lineNumbers",
  renderEmptyElements: !1,
  markers(t) {
    return t.state.facet(Tr);
  },
  lineMarker(t, e, i) {
    return i.some((s) => s.toDOM) ? null : new ue(pe(t, t.state.doc.lineAt(e.from).number));
  },
  widgetMarker: (t, e, i) => {
    for (let s of t.state.facet(Or)) {
      let r = s(t, e, i);
      if (r)
        return r;
    }
    return null;
  },
  lineMarkerChange: (t) => t.startState.facet(ht) != t.state.facet(ht),
  initialSpacer(t) {
    return new ue(pe(t, ki(t.state.doc.lines)));
  },
  updateSpacer(t, e) {
    let i = pe(e.view, ki(e.view.state.doc.lines));
    return i == t.number ? t : new ue(i);
  },
  domEventHandlers: n.facet(ht).domEventHandlers,
  side: "before"
}));
function Nr(n = {}) {
  return [
    ht.of(n),
    kr(),
    Br
  ];
}
function ki(n) {
  let t = 9;
  for (; t < n; )
    t = t * 10 + 9;
  return t;
}
export {
  X as BidiSpan,
  z as BlockInfo,
  P as BlockType,
  kt as BlockWrapper,
  N as Decoration,
  O as Direction,
  C as EditorView,
  ot as GutterMarker,
  rt as ViewPlugin,
  Xt as ViewUpdate,
  te as WidgetType,
  Pr as getDrawSelectionConfig,
  de as gutterLineClass,
  vr as gutterWidgetClass,
  kr as gutters,
  yr as keymap,
  Tr as lineNumberMarkers,
  Or as lineNumberWidgetMarker,
  Nr as lineNumbers,
  U as logException,
  Hr as runScopeHandlers,
  wi as showPanel
};
