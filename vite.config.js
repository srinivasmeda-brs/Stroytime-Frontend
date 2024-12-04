import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 80,  // Ensure the app binds to the correct port
  },
  build: {
    outDir: 'dist',
  },
});
