import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@drjoshcsimmons/scl/dist/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
