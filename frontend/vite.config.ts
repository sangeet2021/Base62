import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "lodash": "lodash-es",        // ← add this
    },
  },
  optimizeDeps: {
    include: ['recharts'],           // ← just recharts, drop es-toolkit/lodash
  },
});