import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx', 'src/test-setup.ts'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        assetFileNames: 'globals[extname]',
      },
    },
    copyPublicDir: false,
    cssCodeSplit: false,
  },
  css: {
    // No PostCSS/Tailwind needed - pure CSS
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
