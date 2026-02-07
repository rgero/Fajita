/// <reference types="vitest" />

import { defineConfig } from 'vite'
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

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && mkcert(),
  ].filter(Boolean),

  server: {
    port: 7000,
    https: {},
  },

  resolve: {
    alias: aliases,
  },

  build: {
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'react-vendor';
            }
            // Everything else goes to a general vendor chunk
            return 'vendor';
          }
        },
      },
    },
  },

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setupTests.tsx',
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
}));