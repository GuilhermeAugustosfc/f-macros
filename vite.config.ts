// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  base: '/f-macros/',
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'default',
        icon: true,
      },
    }),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'), // cria o alias @ -> src
    },
  },
  server: {
    port: 3000,
  },
});
