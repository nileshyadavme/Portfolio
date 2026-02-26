import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import viteImagemin from 'vite-plugin-imagemin';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      viteImagemin({
        mozjpeg: { quality: 80 },
        optipng: { optimizationLevel: 5 },
        pngquant: { quality: [0.8, 0.9], speed: 4 },
        svgo: { plugins: [{ name: 'removeViewBox', active: false }] },
      }),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      // Target modern browsers — smaller output, no legacy polyfills needed
      target: 'es2020',
      rollupOptions: {
        output: {
          /**
           * Split vendor libraries into separate cached chunks.
           * When you update your code, users only re-download YOUR chunk —
           * not react, motion, or router (which never change between deployments).
           */
          manualChunks: {
            // Core React runtime — almost never changes
            'vendor-react': ['react', 'react-dom'],
            // Router — updated rarely
            'vendor-router': ['react-router-dom'],
            // Framer Motion is large (~100KB) — isolate it
            'vendor-motion': ['motion'],
            // Markdown rendering stack
            'vendor-markdown': ['react-markdown', 'remark-math', 'rehype-katex', 'rehype-highlight'],
          },
        },
      },
    },
  };
});
