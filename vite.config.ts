import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/LTXLDL_Note_Gr4/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('src/data/viva/')) return 'viva-bank';
          if (id.includes('src/data/codebase/')) return 'codebase-catalog';
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3-')) return 'charts-vendor';
          if (id.includes('node_modules/katex')) return 'katex-vendor';
        },
      },
    },
  },
});
