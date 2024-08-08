/// <reference types="vitest" />

import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts', // assuming the test folder is in the root of our project
  }
})
