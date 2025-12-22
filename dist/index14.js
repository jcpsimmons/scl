import { jsx as X } from "react/jsx-runtime";
import * as c from "react";
import { cn as C } from "./index2.js";
const I = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`, h = `
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
`, F = [
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
function D(t, T, f) {
  const r = t.createShader(T);
  return r ? (t.shaderSource(r, f), t.compileShader(r), t.getShaderParameter(r, t.COMPILE_STATUS) ? r : (console.error("Shader compile error:", t.getShaderInfoLog(r)), t.deleteShader(r), null)) : null;
}
function y(t, T, f) {
  const r = t.createProgram();
  return r ? (t.attachShader(r, T), t.attachShader(r, f), t.linkProgram(r), t.getProgramParameter(r, t.LINK_STATUS) ? r : (console.error("Program link error:", t.getProgramInfoLog(r)), t.deleteProgram(r), null)) : null;
}
const N = c.forwardRef(
  ({
    className: t,
    src: T,
    alt: f,
    width: r,
    height: E,
    ditherSize: m = 1,
    color: l = [0, 255, 0],
    ...p
  }, v) => {
    const R = c.useRef(null), d = c.useRef(null), A = c.useRef(null), x = c.useRef(null);
    return c.useImperativeHandle(v, () => R.current), c.useEffect(() => {
      const s = R.current;
      if (!s) return;
      const e = s.getContext("webgl", { preserveDrawingBuffer: !0 });
      if (!e) {
        console.error("WebGL not supported");
        return;
      }
      d.current = e;
      const i = D(e, e.VERTEX_SHADER, I), o = D(
        e,
        e.FRAGMENT_SHADER,
        h
      );
      if (!i || !o) {
        console.error("Failed to create shaders");
        return;
      }
      const a = y(e, i, o);
      if (!a) {
        console.error("Failed to create program");
        return;
      }
      e.useProgram(a), A.current = a;
      const n = e.createTexture();
      e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, n);
      const u = new Uint8Array(F.map((L) => L / 64 * 255));
      e.texImage2D(
        e.TEXTURE_2D,
        0,
        e.LUMINANCE,
        8,
        8,
        0,
        e.LUMINANCE,
        e.UNSIGNED_BYTE,
        u
      ), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.REPEAT), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.REPEAT), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), x.current = n;
      const _ = new Float32Array([
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
      ]), P = new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]), S = e.createBuffer();
      e.bindBuffer(e.ARRAY_BUFFER, S), e.bufferData(e.ARRAY_BUFFER, _, e.STATIC_DRAW);
      const g = e.getAttribLocation(a, "a_position");
      e.enableVertexAttribArray(g), e.vertexAttribPointer(g, 2, e.FLOAT, !1, 0, 0);
      const b = e.createBuffer();
      e.bindBuffer(e.ARRAY_BUFFER, b), e.bufferData(e.ARRAY_BUFFER, P, e.STATIC_DRAW);
      const U = e.getAttribLocation(a, "a_texCoord");
      return e.enableVertexAttribArray(U), e.vertexAttribPointer(U, 2, e.FLOAT, !1, 0, 0), e.uniform1i(e.getUniformLocation(a, "u_image"), 0), e.uniform1i(e.getUniformLocation(a, "u_bayerTex"), 1), () => {
        e.deleteProgram(a), e.deleteShader(i), e.deleteShader(o), e.deleteTexture(n);
      };
    }, []), c.useEffect(() => {
      const s = R.current, e = d.current, i = A.current;
      if (!s || !e || !i) return;
      const o = new Image();
      o.crossOrigin = "anonymous", o.onload = () => {
        const a = o.naturalWidth / o.naturalHeight;
        let n, u;
        r && E ? (n = r, u = E) : r ? (n = r, u = Math.round(r / a)) : E ? (u = E, n = Math.round(E * a)) : (n = o.naturalWidth, u = o.naturalHeight), s.width = n, s.height = u, e.viewport(0, 0, n, u), e.useProgram(i), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, x.current), e.activeTexture(e.TEXTURE0);
        const _ = e.createTexture();
        e.bindTexture(e.TEXTURE_2D, _), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texImage2D(
          e.TEXTURE_2D,
          0,
          e.RGBA,
          e.RGBA,
          e.UNSIGNED_BYTE,
          o
        ), e.uniform2f(e.getUniformLocation(i, "u_resolution"), n, u), e.uniform1f(e.getUniformLocation(i, "u_ditherSize"), m), e.uniform3f(
          e.getUniformLocation(i, "u_color"),
          l[0] / 255,
          l[1] / 255,
          l[2] / 255
        ), e.drawArrays(e.TRIANGLES, 0, 6), e.deleteTexture(_);
      }, o.onerror = () => {
        console.error("Failed to load image:", T);
      }, o.src = T;
    }, [T, r, E, m, l]), /* @__PURE__ */ X(
      "canvas",
      {
        ref: R,
        className: C("", t),
        "aria-label": f,
        role: "img",
        ...p
      }
    );
  }
);
N.displayName = "DitheredImage";
export {
  N as DitheredImage
};
