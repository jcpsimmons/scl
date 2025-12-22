/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Terminal color scheme
        'terminal-green': 'rgb(0 255 0)',
        'terminal-blue': 'rgb(0 0 255)',
        'terminal-yellow': 'rgb(255 255 0)',
        // Existing colors
        magenta: 'rgb(255 0 255)',
        orange: 'rgb(255 167 0)',
        deepblue: 'rgb(0 0 152)',
        yellow: 'rgb(255 255 0)',
      },
      fontFamily: {
        mono: ['BigBlueTerm437', 'monospace'],
      },
    },
  },
  plugins: [],
};
