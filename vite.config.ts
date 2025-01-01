import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import stylelint from 'vite-plugin-stylelint';
import { defineConfig } from 'vitest/config';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), stylelint()],
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/styles'),
      app: path.resolve(__dirname, 'src/app'),
      pages: path.resolve(__dirname, 'src/pages'),
      widgets: path.resolve(__dirname, 'src/widgets'),
      features: path.resolve(__dirname, 'src/features'),
      entities: path.resolve(__dirname, 'src/entities'),
      shared: path.resolve(__dirname, 'src/shared'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    modules: {
      scopeBehaviour: 'local', // Локальные классы по умолчанию
      localsConvention: 'camelCase', // Преобразует классы в camelCase
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname, 'src/setupTests.ts')],
  },
});
