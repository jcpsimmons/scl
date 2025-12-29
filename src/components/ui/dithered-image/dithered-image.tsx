import * as React from 'react';
import { cn } from '@/lib/utils';

// Simple colorization shader (used after CPU-based dithering)
const VERTEX_SHADER = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

const COLORIZE_SHADER = `
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
`;

// Bayer dithering shader (for ordered dithering mode)
const BAYER_SHADER = `
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
`;

// 8x8 Bayer matrix values (0-63, will be normalized to 0-1)
const BAYER_MATRIX = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28,
  52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7,
  39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21,
];

export type DitherAlgorithm = 'atkinson' | 'bayer' | 'floyd-steinberg';

export interface DitheredImageProps extends Omit<React.HTMLAttributes<HTMLCanvasElement>, 'color'> {
  src: string;
  alt?: string;
  /** Width in pixels. If only width is set, height is calculated from aspect ratio */
  width?: number;
  /** Height in pixels. If only height is set, width is calculated from aspect ratio */
  height?: number;
  /** Size of dither pattern pixels (default: 1) */
  ditherSize?: number;
  /** RGB color for lit pixels (default: terminal green [0, 255, 0]) */
  color?: [number, number, number];
  /** Dithering algorithm (default: 'atkinson' for classic Mac look) */
  algorithm?: DitherAlgorithm;
  /** Threshold for black/white conversion (0-255, default: 128) */
  threshold?: number;
}

/**
 * Atkinson dithering algorithm (Bill Atkinson, Apple 1980s)
 * Diffuses 6/8 (75%) of the error to create sharper contrast
 *
 * Error diffusion pattern:
 *         X   1/8  1/8
 *     1/8  1/8  1/8
 *          1/8
 */
function atkinsonDither(imageData: ImageData, threshold: number = 128): ImageData {
  const data = new Uint8ClampedArray(imageData.data);
  const width = imageData.width;
  const height = imageData.height;

  const getIndex = (x: number, y: number) => (y * width + x) * 4;

  const addError = (x: number, y: number, error: number) => {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const idx = getIndex(x, y);
    data[idx] = Math.max(0, Math.min(255, data[idx] + error));
    data[idx + 1] = Math.max(0, Math.min(255, data[idx + 1] + error));
    data[idx + 2] = Math.max(0, Math.min(255, data[idx + 2] + error));
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = getIndex(x, y);

      // Get grayscale value using luminance
      const gray = data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114;
      const newVal = gray < threshold ? 0 : 255;

      // Calculate error (only diffuse 6/8 = 75%)
      const error = Math.floor((gray - newVal) / 8);

      // Set pixel to black or white
      data[idx] = newVal;
      data[idx + 1] = newVal;
      data[idx + 2] = newVal;

      // Diffuse error to neighbors (Atkinson pattern)
      addError(x + 1, y, error); // right
      addError(x + 2, y, error); // right+1
      addError(x - 1, y + 1, error); // bottom-left
      addError(x, y + 1, error); // bottom
      addError(x + 1, y + 1, error); // bottom-right
      addError(x, y + 2, error); // bottom+1
    }
  }

  return new ImageData(data, width, height);
}

/**
 * Floyd-Steinberg dithering algorithm
 * Diffuses 100% of error, creates smoother gradients
 *
 * Error diffusion pattern:
 *         X   7/16
 *     3/16 5/16 1/16
 */
function floydSteinbergDither(imageData: ImageData, threshold: number = 128): ImageData {
  const data = new Uint8ClampedArray(imageData.data);
  const width = imageData.width;
  const height = imageData.height;

  const getIndex = (x: number, y: number) => (y * width + x) * 4;

  const addError = (x: number, y: number, error: number, factor: number) => {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const idx = getIndex(x, y);
    const e = error * factor;
    data[idx] = Math.max(0, Math.min(255, data[idx] + e));
    data[idx + 1] = Math.max(0, Math.min(255, data[idx + 1] + e));
    data[idx + 2] = Math.max(0, Math.min(255, data[idx + 2] + e));
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = getIndex(x, y);

      const gray = data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114;
      const newVal = gray < threshold ? 0 : 255;
      const error = gray - newVal;

      data[idx] = newVal;
      data[idx + 1] = newVal;
      data[idx + 2] = newVal;

      // Floyd-Steinberg error diffusion
      addError(x + 1, y, error, 7 / 16);
      addError(x - 1, y + 1, error, 3 / 16);
      addError(x, y + 1, error, 5 / 16);
      addError(x + 1, y + 1, error, 1 / 16);
    }
  }

  return new ImageData(data, width, height);
}

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

const DitheredImage = React.forwardRef<HTMLCanvasElement, DitheredImageProps>(
  (
    {
      className,
      src,
      alt,
      width,
      height,
      ditherSize = 1,
      color = [0, 255, 0],
      algorithm = 'atkinson',
      threshold = 128,
      ...props
    },
    ref
  ) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const glRef = React.useRef<WebGLRenderingContext | null>(null);
    const programRef = React.useRef<WebGLProgram | null>(null);
    const bayerTexRef = React.useRef<WebGLTexture | null>(null);

    React.useImperativeHandle(ref, () => canvasRef.current!);

    // Initialize WebGL
    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true });
      if (!gl) {
        console.error('WebGL not supported');
        return;
      }
      glRef.current = gl;

      // Choose shader based on algorithm
      const fragmentShaderSource = algorithm === 'bayer' ? BAYER_SHADER : COLORIZE_SHADER;

      const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

      if (!vertexShader || !fragmentShader) {
        console.error('Failed to create shaders');
        return;
      }

      const program = createProgram(gl, vertexShader, fragmentShader);
      if (!program) {
        console.error('Failed to create program');
        return;
      }

      // biome-ignore lint/correctness/useHookAtTopLevel: This is WebGL's useProgram, not a React hook
      gl.useProgram(program);
      programRef.current = program;

      // Create Bayer texture (only needed for bayer algorithm)
      if (algorithm === 'bayer') {
        const bayerTex = gl.createTexture();
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, bayerTex);
        const bayerData = new Uint8Array(BAYER_MATRIX.map((v) => (v / 64) * 255));
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.LUMINANCE,
          8,
          8,
          0,
          gl.LUMINANCE,
          gl.UNSIGNED_BYTE,
          bayerData
        );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        bayerTexRef.current = bayerTex;
      }

      // Set up geometry (full-screen quad)
      const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
      const texCoords = new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]);

      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
      const positionLoc = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      const texCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
      const texCoordLoc = gl.getAttribLocation(program, 'a_texCoord');
      gl.enableVertexAttribArray(texCoordLoc);
      gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);

      // Set texture units
      gl.uniform1i(gl.getUniformLocation(program, 'u_image'), 0);
      if (algorithm === 'bayer') {
        gl.uniform1i(gl.getUniformLocation(program, 'u_bayerTex'), 1);
      }

      return () => {
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        if (bayerTexRef.current) {
          gl.deleteTexture(bayerTexRef.current);
        }
      };
    }, [algorithm]);

    // Process image when src or settings change
    React.useEffect(() => {
      const canvas = canvasRef.current;
      const gl = glRef.current;
      const program = programRef.current;
      if (!canvas || !gl || !program) return;

      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => {
        const aspectRatio = image.naturalWidth / image.naturalHeight;
        let w: number;
        let h: number;

        if (width && height) {
          w = width;
          h = height;
        } else if (width) {
          w = width;
          h = Math.round(width / aspectRatio);
        } else if (height) {
          h = height;
          w = Math.round(height * aspectRatio);
        } else {
          w = image.naturalWidth;
          h = image.naturalHeight;
        }

        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);

        // biome-ignore lint/correctness/useHookAtTopLevel: This is WebGL's useProgram, not a React hook
        gl.useProgram(program);

        let textureData: ImageData | HTMLImageElement = image;

        // For error diffusion algorithms, process on CPU first
        if (algorithm === 'atkinson' || algorithm === 'floyd-steinberg') {
          // Draw image to temp canvas to get pixel data
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = w;
          tempCanvas.height = h;
          const tempCtx = tempCanvas.getContext('2d');
          if (tempCtx) {
            tempCtx.drawImage(image, 0, 0, w, h);
            const imageData = tempCtx.getImageData(0, 0, w, h);

            // Apply dithering algorithm
            const dithered =
              algorithm === 'atkinson'
                ? atkinsonDither(imageData, threshold)
                : floydSteinbergDither(imageData, threshold);

            textureData = dithered;
          }
        }

        // Bind Bayer texture if needed
        if (algorithm === 'bayer') {
          gl.activeTexture(gl.TEXTURE1);
          gl.bindTexture(gl.TEXTURE_2D, bayerTexRef.current);
        }

        // Create and bind image texture
        gl.activeTexture(gl.TEXTURE0);
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        if (textureData instanceof ImageData) {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureData);
        } else {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureData);
        }

        // Set uniforms
        if (algorithm === 'bayer') {
          gl.uniform2f(gl.getUniformLocation(program, 'u_resolution'), w, h);
          gl.uniform1f(gl.getUniformLocation(program, 'u_ditherSize'), ditherSize);
        }
        gl.uniform3f(
          gl.getUniformLocation(program, 'u_color'),
          color[0] / 255,
          color[1] / 255,
          color[2] / 255
        );

        // Draw
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // Clean up image texture
        gl.deleteTexture(texture);
      };
      image.onerror = () => {
        console.error('Failed to load image:', src);
      };
      image.src = src;
    }, [src, width, height, ditherSize, color, algorithm, threshold]);

    return (
      <canvas
        ref={canvasRef}
        className={cn('', className)}
        aria-label={alt}
        role="img"
        {...props}
      />
    );
  }
);
DitheredImage.displayName = 'DitheredImage';

export { DitheredImage };
