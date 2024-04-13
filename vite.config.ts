import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react()
  ],
  ssr: {
    noExternal: ['react-helmet-async'],
  },
  test: {
    include: ['src/client/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', 'src/server/**', 'lib/**'],
    globals: true,
    environment: 'jsdom',
    css: false,
  },
})
