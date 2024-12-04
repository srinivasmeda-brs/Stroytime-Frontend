import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: '0.0.0.0', // Make the server accessible externally
    port: 4173,  // Ensure this port is used for your production build
  },
  build: {
    outDir: 'dist', // Make sure the build output goes into the 'dist' folder
  },
});
