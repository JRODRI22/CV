import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),   // Portfolio → dist/index.html
        cv:   resolve(__dirname, 'cv.html'),       // CV solo  → dist/cv.html
      },
    },
  },
})
