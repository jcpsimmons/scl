import { jsx as X } from "react/jsx-runtime";
import * as R from "react";
import { cn as L } from "./index2.js";
const M = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`, F = `
  precision mediump float;

  varying vec2 v_texCoord;

  uniform sampler2D u_image;
  uniform vec3 u_color;

  void main() {
    vec4 texColor = texture2D(u_image, v_texCoord);
    // Dithered image is already black/white, just colorize the white pixels
    vec3 finalColor = texColor.r * u_color;
    gl_FragColor = vec4(finalColor, texColor.a);
  }
`, B = `
  precision mediump float;

  varying vec2 v_texCoord;

  uniform sampler2D u_image;
  uniform sampler2D u_bayerTex;
  uniform vec2 u_resolution;
  uniform float u_ditherSize;
  uniform vec3 u_color;

  void main() {
    vec2 pixelPos = mod(floor(gl_FragCoord.xy / u_ditherSize), 8.0);
    vec4 texColor = texture2D(u_image, v_texCoord);

    // Convert to grayscale using luminance
    float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

    // Look up threshold from Bayer texture
    float threshold = texture2D(u_bayerTex, (pixelPos + 0.5) / 8.0).r;
    float dithered = step(threshold, gray);

    // Output color or black
    vec3 finalColor = dithered * u_color;
    gl_FragColor = vec4(finalColor, texColor.a);
  }
`, N = [
  0,
  32,
  8,
  40,
  2,
  34,
  10,
  42,
  48,
  16,
  56,
  24,
  50,
  18,
  58,
  26,
  12,
  44,
  4,
  36,
  14,
  46,
  6,
  38,
  60,
  28,
  52,
  20,
  62,
  30,
  54,
  22,
  3,
  35,
  11,
  43,
  1,
  33,
  9,
  41,
  51,
  19,
  59,
  27,
  49,
  17,
  57,
  25,
  15,
  47,
  7,
  39,
  13,
  45,
  5,
  37,
  63,
  31,
  55,
  23,
  61,
  29,
  53,
  21
];
function w(n, m = 128) {
  const t = new Uint8ClampedArray(n.data), o = n.width, d = n.height, _ = (r, a) => (a * o + r) * 4, f = (r, a, i) => {
    if (r < 0 || r >= o || a < 0 || a >= d) return;
    const E = _(r, a);
    t[E] = Math.max(0, Math.min(255, t[E] + i)), t[E + 1] = Math.max(0, Math.min(255, t[E + 1] + i)), t[E + 2] = Math.max(0, Math.min(255, t[E + 2] + i));
  };
  for (let r = 0; r < d; r++)
    for (let a = 0; a < o; a++) {
      const i = _(a, r), E = t[i] * 0.299 + t[i + 1] * 0.587 + t[i + 2] * 0.114, c = E < m ? 0 : 255, u = Math.floor((E - c) / 8);
      t[i] = c, t[i + 1] = c, t[i + 2] = c, f(a + 1, r, u), f(a + 2, r, u), f(a - 1, r + 1, u), f(a, r + 1, u), f(a + 1, r + 1, u), f(a, r + 2, u);
    }
  return new ImageData(t, o, d);
}
function G(n, m = 128) {
  const t = new Uint8ClampedArray(n.data), o = n.width, d = n.height, _ = (r, a) => (a * o + r) * 4, f = (r, a, i, E) => {
    if (r < 0 || r >= o || a < 0 || a >= d) return;
    const c = _(r, a), u = i * E;
    t[c] = Math.max(0, Math.min(255, t[c] + u)), t[c + 1] = Math.max(0, Math.min(255, t[c + 1] + u)), t[c + 2] = Math.max(0, Math.min(255, t[c + 2] + u));
  };
  for (let r = 0; r < d; r++)
    for (let a = 0; a < o; a++) {
      const i = _(a, r), E = t[i] * 0.299 + t[i + 1] * 0.587 + t[i + 2] * 0.114, c = E < m ? 0 : 255, u = E - c;
      t[i] = c, t[i + 1] = c, t[i + 2] = c, f(a + 1, r, u, 7 / 16), f(a - 1, r + 1, u, 3 / 16), f(a, r + 1, u, 5 / 16), f(a + 1, r + 1, u, 1 / 16);
    }
  return new ImageData(t, o, d);
}
function I(n, m, t) {
  const o = n.createShader(m);
  return o ? (n.shaderSource(o, t), n.compileShader(o), n.getShaderParameter(o, n.COMPILE_STATUS) ? o : (console.error("Shader compile error:", n.getShaderInfoLog(o)), n.deleteShader(o), null)) : null;
}
function k(n, m, t) {
  const o = n.createProgram();
  return o ? (n.attachShader(o, m), n.attachShader(o, t), n.linkProgram(o), n.getProgramParameter(o, n.LINK_STATUS) ? o : (console.error("Program link error:", n.getProgramInfoLog(o)), n.deleteProgram(o), null)) : null;
}
const O = R.forwardRef(
  ({
    className: n,
    src: m,
    alt: t,
    width: o,
    height: d,
    ditherSize: _ = 1,
    color: f = [0, 255, 0],
    algorithm: r = "atkinson",
    threshold: a = 128,
    ...i
  }, E) => {
    const c = R.useRef(null), u = R.useRef(null), b = R.useRef(null), p = R.useRef(null);
    return R.useImperativeHandle(E, () => c.current), R.useEffect(() => {
      const A = c.current;
      if (!A) return;
      const e = A.getContext("webgl", { preserveDrawingBuffer: !0 });
      if (!e) {
        console.error("WebGL not supported");
        return;
      }
      u.current = e;
      const x = r === "bayer" ? B : F, l = I(e, e.VERTEX_SHADER, M), g = I(
        e,
        e.FRAGMENT_SHADER,
        x
      );
      if (!l || !g) {
        console.error("Failed to create shaders");
        return;
      }
      const s = k(e, l, g);
      if (!s) {
        console.error("Failed to create program");
        return;
      }
      if (e.useProgram(s), b.current = s, r === "bayer") {
        const S = e.createTexture();
        e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, S);
        const P = new Uint8Array(N.map((y) => y / 64 * 255));
        e.texImage2D(
          e.TEXTURE_2D,
          0,
          e.LUMINANCE,
          8,
          8,
          0,
          e.LUMINANCE,
          e.UNSIGNED_BYTE,
          P
        ), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.REPEAT), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.REPEAT), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), p.current = S;
      }
      const T = new Float32Array([
        -1,
        -1,
        1,
        -1,
        -1,
        1,
        -1,
        1,
        1,
        -1,
        1,
        1
      ]), h = new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]), C = e.createBuffer();
      e.bindBuffer(e.ARRAY_BUFFER, C), e.bufferData(e.ARRAY_BUFFER, T, e.STATIC_DRAW);
      const D = e.getAttribLocation(s, "a_position");
      e.enableVertexAttribArray(D), e.vertexAttribPointer(D, 2, e.FLOAT, !1, 0, 0);
      const v = e.createBuffer();
      e.bindBuffer(e.ARRAY_BUFFER, v), e.bufferData(e.ARRAY_BUFFER, h, e.STATIC_DRAW);
      const U = e.getAttribLocation(s, "a_texCoord");
      return e.enableVertexAttribArray(U), e.vertexAttribPointer(U, 2, e.FLOAT, !1, 0, 0), e.uniform1i(e.getUniformLocation(s, "u_image"), 0), r === "bayer" && e.uniform1i(e.getUniformLocation(s, "u_bayerTex"), 1), () => {
        e.deleteProgram(s), e.deleteShader(l), e.deleteShader(g), p.current && e.deleteTexture(p.current);
      };
    }, [r]), R.useEffect(() => {
      const A = c.current, e = u.current, x = b.current;
      if (!A || !e || !x) return;
      const l = new Image();
      l.crossOrigin = "anonymous", l.onload = () => {
        const g = l.naturalWidth / l.naturalHeight;
        let s, T;
        o && d ? (s = o, T = d) : o ? (s = o, T = Math.round(o / g)) : d ? (T = d, s = Math.round(d * g)) : (s = l.naturalWidth, T = l.naturalHeight), A.width = s, A.height = T, e.viewport(0, 0, s, T), e.useProgram(x);
        let h = l;
        if (r === "atkinson" || r === "floyd-steinberg") {
          const D = document.createElement("canvas");
          D.width = s, D.height = T;
          const v = D.getContext("2d");
          if (v) {
            v.drawImage(l, 0, 0, s, T);
            const U = v.getImageData(0, 0, s, T);
            h = r === "atkinson" ? w(U, a) : G(U, a);
          }
        }
        r === "bayer" && (e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, p.current)), e.activeTexture(e.TEXTURE0);
        const C = e.createTexture();
        e.bindTexture(e.TEXTURE_2D, C), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), h instanceof ImageData, e.texImage2D(
          e.TEXTURE_2D,
          0,
          e.RGBA,
          e.RGBA,
          e.UNSIGNED_BYTE,
          h
        ), r === "bayer" && (e.uniform2f(e.getUniformLocation(x, "u_resolution"), s, T), e.uniform1f(
          e.getUniformLocation(x, "u_ditherSize"),
          _
        )), e.uniform3f(
          e.getUniformLocation(x, "u_color"),
          f[0] / 255,
          f[1] / 255,
          f[2] / 255
        ), e.drawArrays(e.TRIANGLES, 0, 6), e.deleteTexture(C);
      }, l.onerror = () => {
        console.error("Failed to load image:", m);
      }, l.src = m;
    }, [m, o, d, _, f, r, a]), /* @__PURE__ */ X(
      "canvas",
      {
        ref: c,
        className: L("", n),
        "aria-label": t,
        role: "img",
        ...i
      }
    );
  }
);
O.displayName = "DitheredImage";
export {
  O as DitheredImage
};
