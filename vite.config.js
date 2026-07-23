import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Explicitly tells Vite 8 and Rolldown to turn off CSS minification entirely
    cssMinify: false
  },
  server: {
    port: 3000
  }
})