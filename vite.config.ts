import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8083,
    host: true,
    open: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei', 'gsap'],
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-bundle': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation-bundle': ['gsap', '@react-spring/web', '@react-spring/three'],
        },
      },
    },
  },
});
