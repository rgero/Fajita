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
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('@mui/') || id.includes('@emotion/')) {
            return 'vendor-mui';
          }

          if (
            id.includes('react-router-dom') ||
            id.includes('react-dom') ||
            id.includes('react/jsx-runtime') ||
            id.includes('/react/')
          ) {
            return 'vendor-react';
          }

          if (id.includes('@tanstack/react-query')) {
            return 'vendor-query';
          }

          if (id.includes('@dnd-kit/')) {
            return 'vendor-dnd';
          }

          if (id.includes('socket.io-client')) {
            return 'vendor-socket';
          }

          if (id.includes('date-fns') || id.includes('date-fns-tz')) {
            return 'vendor-date';
          }

          return 'vendor-misc';
        },
      },
    },
  },
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
    alias: aliases,
    server: {
      deps: {
        inline: [/@mui\//, /react-transition-group/],
      },
    }, 
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