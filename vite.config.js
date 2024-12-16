import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',  // Set the base path to '/'
  build: {
    outDir: 'dist',  // Make sure build output goes to 'dist'
  },
});