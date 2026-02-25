import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_REDIRECT_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', 
    setupFiles: './src/test/setup.ts', 
  },
})