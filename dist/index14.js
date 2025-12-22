import { jsx as D } from "react/jsx-runtime";
import * as n from "react";
import { cn as S } from "./index2.js";
const b = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`, C = `
  precision mediump float;

  uniform sampler2D u_image;
  uniform vec2 u_resolution;
  uniform float u_ditherSize;
  uniform vec3 u_color;

  // 8x8 Bayer matrix for ordered dithering
  float bayer8x8(vec2 pos) {
    int x = int(mod(pos.x, 8.0));
    int y = int(mod(pos.y, 8.0));
    int index = x + y * 8;

    // Bayer 8x8 pattern (normalized to 0-1)
    float pattern[64];
    pattern[0] = 0.0/64.0;   pattern[1] = 32.0/64.0;  pattern[2] = 8.0/64.0;   pattern[3] = 40.0/64.0;
    pattern[4] = 48.0/64.0;  pattern[5] = 16.0/64.0;  pattern[6] = 56.0/64.0;  pattern[7] = 24.0/64.0;
    pattern[8] = 12.0/64.0;  pattern[9] = 44.0/64.0;  pattern[10] = 4.0/64.0;  pattern[11] = 36.0/64.0;
    pattern[12] = 60.0/64.0; pattern[13] = 28.0/64.0; pattern[14] = 52.0/64.0; pattern[15] = 20.0/64.0;
    pattern[16] = 3.0/64.0;  pattern[17] = 35.0/64.0; pattern[18] = 11.0/64.0; pattern[19] = 43.0/64.0;
    pattern[20] = 51.0/64.0; pattern[21] = 19.0/64.0; pattern[22] = 59.0/64.0; pattern[23] = 27.0/64.0;
    pattern[24] = 15.0/64.0; pattern[25] = 47.0/64.0; pattern[26] = 7.0/64.0;  pattern[27] = 39.0/64.0;
    pattern[28] = 63.0/64.0; pattern[29] = 31.0/64.0; pattern[30] = 55.0/64.0; pattern[31] = 23.0/64.0;
    pattern[32] = 2.0/64.0;  pattern[33] = 34.0/64.0; pattern[34] = 10.0/64.0; pattern[35] = 42.0/64.0;
    pattern[36] = 50.0/64.0; pattern[37] = 18.0/64.0; pattern[38] = 58.0/64.0; pattern[39] = 26.0/64.0;
    pattern[40] = 14.0/64.0; pattern[41] = 46.0/64.0; pattern[42] = 6.0/64.0;  pattern[43] = 38.0/64.0;
    pattern[44] = 62.0/64.0; pattern[45] = 30.0/64.0; pattern[46] = 54.0/64.0; pattern[47] = 22.0/64.0;
    pattern[48] = 1.0/64.0;  pattern[49] = 33.0/64.0; pattern[50] = 9.0/64.0;  pattern[51] = 41.0/64.0;
    pattern[52] = 49.0/64.0; pattern[53] = 17.0/64.0; pattern[54] = 57.0/64.0; pattern[55] = 25.0/64.0;
    pattern[56] = 13.0/64.0; pattern[57] = 45.0/64.0; pattern[58] = 5.0/64.0;  pattern[59] = 37.0/64.0;
    pattern[60] = 61.0/64.0; pattern[61] = 29.0/64.0; pattern[62] = 53.0/64.0; pattern[63] = 21.0/64.0;

    for (int i = 0; i < 64; i++) {
      if (i == index) return pattern[i];
    }
    return 0.0;
  }

  void main() {
    vec2 pixelPos = floor(gl_FragCoord.xy / u_ditherSize);
    vec4 texColor = texture2D(u_image, v_texCoord);

    // Convert to grayscale using luminance
    float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

    // Apply dithering threshold
    float threshold = bayer8x8(pixelPos);
    float dithered = step(threshold, gray);

    // Output green or black
    vec3 finalColor = dithered * u_color;
    gl_FragColor = vec4(finalColor, texColor.a);
  }
`, y = n.forwardRef(
  ({
    className: g,
    src: u,
    alt: x,
    width: f,
    height: l,
    ditherSize: d = 2,
    color: p = [0, 255, 0],
    ...A
  }, T) => {
    const c = n.useRef(null), m = n.useRef(null), _ = n.useRef(null);
    return n.useImperativeHandle(T, () => c.current), n.useEffect(() => {
      const o = c.current;
      if (!o) return;
      const t = o.getContext("webgl", { preserveDrawingBuffer: !0 });
      if (!t) {
        console.error("WebGL not supported");
        return;
      }
      m.current = t;
      const a = t.createShader(t.VERTEX_SHADER);
      t.shaderSource(a, b), t.compileShader(a);
      const r = t.createShader(t.FRAGMENT_SHADER);
      t.shaderSource(r, C), t.compileShader(r);
      const e = t.createProgram();
      t.attachShader(e, a), t.attachShader(e, r), t.linkProgram(e), t.useProgram(e), _.current = e;
      const i = new Float32Array([
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
      ]), s = new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]), h = t.createBuffer();
      t.bindBuffer(t.ARRAY_BUFFER, h), t.bufferData(t.ARRAY_BUFFER, i, t.STATIC_DRAW);
      const R = t.getAttribLocation(e, "a_position");
      t.enableVertexAttribArray(R), t.vertexAttribPointer(R, 2, t.FLOAT, !1, 0, 0);
      const v = t.createBuffer();
      t.bindBuffer(t.ARRAY_BUFFER, v), t.bufferData(t.ARRAY_BUFFER, s, t.STATIC_DRAW);
      const E = t.getAttribLocation(e, "a_texCoord");
      return t.enableVertexAttribArray(E), t.vertexAttribPointer(E, 2, t.FLOAT, !1, 0, 0), () => {
        t.deleteProgram(e), t.deleteShader(a), t.deleteShader(r);
      };
    }, []), n.useEffect(() => {
      const o = c.current, t = m.current, a = _.current;
      if (!o || !t || !a) return;
      const r = new Image();
      r.crossOrigin = "anonymous", r.onload = () => {
        const e = f ?? r.naturalWidth, i = l ?? r.naturalHeight;
        o.width = e, o.height = i, t.viewport(0, 0, e, i);
        const s = t.createTexture();
        t.bindTexture(t.TEXTURE_2D, s), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, r), t.uniform2f(t.getUniformLocation(a, "u_resolution"), e, i), t.uniform1f(t.getUniformLocation(a, "u_ditherSize"), d), t.uniform3f(
          t.getUniformLocation(a, "u_color"),
          p[0] / 255,
          p[1] / 255,
          p[2] / 255
        ), t.drawArrays(t.TRIANGLES, 0, 6);
      }, r.src = u;
    }, [u, f, l, d, p]), /* @__PURE__ */ D(
      "canvas",
      {
        ref: c,
        className: S("", g),
        "aria-label": x,
        role: "img",
        ...A
      }
    );
  }
);
y.displayName = "DitheredImage";
export {
  y as DitheredImage
};
