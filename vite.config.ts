import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import stylelint from 'vite-plugin-stylelint';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), stylelint()],
  resolve: {
    alias: {
      '@styles': '/src/styles',
      app: '/src/app',
      pages: '/src/pages',
      widgets: '/src/widgets',
      features: '/src/features',
      entities: '/src/entities',
      shared: '/src/shared',
      '@': '/src',
    },
  },
  css: {
    modules: {
      scopeBehaviour: 'local', // Локальные классы по умолчанию
      localsConvention: 'camelCase', // Преобразует классы в camelCase
    },
  },
});
