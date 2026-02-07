/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import mkcert from 'vite-plugin-mkcert'
import path from 'path'
import react from '@vitejs/plugin-react'

const aliases = {
  '@components': path.resolve(__dirname, 'src/components'),
  '@context': path.resolve(__dirname, 'src/context'),
  '@hooks': path.resolve(__dirname, 'src/hooks'),
  '@interfaces': path.resolve(__dirname, 'src/interfaces'),
  '@pages': path.resolve(__dirname, 'src/pages'),
  '@services': path.resolve(__dirname, 'src/services'),
  '@utils': path.resolve(__dirname, 'src/utils'),
};

export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    port: 7000,
    https: {},
  },
  resolve: {
    alias: aliases,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setupTests.tsx',
    // Ensure Vitest uses the same aliases
    alias: aliases, 
    include: [
      'src/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'tests/**/*.{test,spec}.{js,ts,jsx,tsx}'
    ],
    exclude: ['node_modules', '.git', 'dist'],
    coverage: {
      reporter: ['text', 'html'],
    },
  }
})