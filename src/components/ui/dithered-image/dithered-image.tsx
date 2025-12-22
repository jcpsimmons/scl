import * as React from 'react'
import { cn } from '@/lib/utils'

const VERTEX_SHADER = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`

const FRAGMENT_SHADER = `
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
`

// 8x8 Bayer matrix values (0-63, will be normalized to 0-1)
const BAYER_MATRIX = [
  0, 32, 8, 40, 2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44, 4, 36, 14, 46, 6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
  3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47, 7, 39, 13, 45, 5, 37,
  63, 31, 55, 23, 61, 29, 53, 21,
]

interface DitheredImageProps
  extends Omit<React.HTMLAttributes<HTMLCanvasElement>, 'color'> {
  src: string
  alt?: string
  /** Width in pixels. If only width is set, height is calculated from aspect ratio */
  width?: number
  /** Height in pixels. If only height is set, width is calculated from aspect ratio */
  height?: number
  /** Size of dither pattern pixels (default: 1) */
  ditherSize?: number
  /** RGB color for lit pixels (default: terminal green [0, 255, 0]) */
  color?: [number, number, number]
}

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram()
  if (!program) return null

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
    return null
  }
  return program
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
      ...props
    },
    ref
  ) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const glRef = React.useRef<WebGLRenderingContext | null>(null)
    const programRef = React.useRef<WebGLProgram | null>(null)
    const bayerTexRef = React.useRef<WebGLTexture | null>(null)

    React.useImperativeHandle(ref, () => canvasRef.current!)

    React.useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true })
      if (!gl) {
        console.error('WebGL not supported')
        return
      }
      glRef.current = gl

      // Create shaders
      const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
      const fragmentShader = createShader(
        gl,
        gl.FRAGMENT_SHADER,
        FRAGMENT_SHADER
      )

      if (!vertexShader || !fragmentShader) {
        console.error('Failed to create shaders')
        return
      }

      // Create program
      const program = createProgram(gl, vertexShader, fragmentShader)
      if (!program) {
        console.error('Failed to create program')
        return
      }

      gl.useProgram(program)
      programRef.current = program

      // Create Bayer texture
      const bayerTex = gl.createTexture()
      gl.activeTexture(gl.TEXTURE1)
      gl.bindTexture(gl.TEXTURE_2D, bayerTex)
      const bayerData = new Uint8Array(BAYER_MATRIX.map((v) => (v / 64) * 255))
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
      )
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
      bayerTexRef.current = bayerTex

      // Set up geometry (full-screen quad)
      const positions = new Float32Array([
        -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
      ])
      const texCoords = new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0])

      const positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
      const positionLoc = gl.getAttribLocation(program, 'a_position')
      gl.enableVertexAttribArray(positionLoc)
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

      const texCoordBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW)
      const texCoordLoc = gl.getAttribLocation(program, 'a_texCoord')
      gl.enableVertexAttribArray(texCoordLoc)
      gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0)

      // Set texture units
      gl.uniform1i(gl.getUniformLocation(program, 'u_image'), 0)
      gl.uniform1i(gl.getUniformLocation(program, 'u_bayerTex'), 1)

      return () => {
        gl.deleteProgram(program)
        gl.deleteShader(vertexShader)
        gl.deleteShader(fragmentShader)
        gl.deleteTexture(bayerTex)
      }
    }, [])

    React.useEffect(() => {
      const canvas = canvasRef.current
      const gl = glRef.current
      const program = programRef.current
      if (!canvas || !gl || !program) return

      const image = new Image()
      image.crossOrigin = 'anonymous'
      image.onload = () => {
        const aspectRatio = image.naturalWidth / image.naturalHeight
        let w: number
        let h: number

        if (width && height) {
          // Both specified - use as-is
          w = width
          h = height
        } else if (width) {
          // Only width - calculate height from aspect ratio
          w = width
          h = Math.round(width / aspectRatio)
        } else if (height) {
          // Only height - calculate width from aspect ratio
          h = height
          w = Math.round(height * aspectRatio)
        } else {
          // Neither - use natural size
          w = image.naturalWidth
          h = image.naturalHeight
        }

        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)

        // Make sure program is active
        gl.useProgram(program)

        // Bind Bayer texture to unit 1
        gl.activeTexture(gl.TEXTURE1)
        gl.bindTexture(gl.TEXTURE_2D, bayerTexRef.current)

        // Create and bind image texture to unit 0
        gl.activeTexture(gl.TEXTURE0)
        const texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          image
        )

        // Set uniforms
        gl.uniform2f(gl.getUniformLocation(program, 'u_resolution'), w, h)
        gl.uniform1f(gl.getUniformLocation(program, 'u_ditherSize'), ditherSize)
        gl.uniform3f(
          gl.getUniformLocation(program, 'u_color'),
          color[0] / 255,
          color[1] / 255,
          color[2] / 255
        )

        // Draw
        gl.drawArrays(gl.TRIANGLES, 0, 6)

        // Clean up image texture
        gl.deleteTexture(texture)
      }
      image.onerror = () => {
        console.error('Failed to load image:', src)
      }
      image.src = src
    }, [src, width, height, ditherSize, color])

    return (
      <canvas
        ref={canvasRef}
        className={cn('', className)}
        aria-label={alt}
        role="img"
        {...props}
      />
    )
  }
)
DitheredImage.displayName = 'DitheredImage'

export { DitheredImage }
export type { DitheredImageProps }
