import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pageA: resolve(__dirname, 'pages/page-a/index.html'),
        pageB: resolve(__dirname, 'pages/page-b/index.html'),
        pageC: resolve(__dirname, 'pages/page-c/index.html'),
      },
    },
  },
})
