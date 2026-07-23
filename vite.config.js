import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  css: {
    // Forces Vite to use standard esbuild instead of lightningcss to avoid build cache errors
    transformer: 'postcss',
    minify: false
  },
  server: {
    port: 3000
  }
})