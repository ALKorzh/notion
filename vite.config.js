import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  build: {
    rollupOptions: {
      // Указываем зависимости, которые не нужно включать в сборку
      external: ["aws-sdk", "mock-aws-s3", "nock", "@mapbox/node-pre-gyp"],
    },
  },
})
