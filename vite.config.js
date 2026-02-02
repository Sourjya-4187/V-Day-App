import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves from https://<user>.github.io/<repo>/
// Set base to your repo name with leading and trailing slashes
export default defineConfig({
  plugins: [react()],
  base: '/V-Day-App/',
});
