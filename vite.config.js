import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages: site is at https://<user>.github.io/<repo-name>/
// base must be '/<repo-name>/' (leading and trailing slashes)
// If your repo is different, change base to match (e.g. base: '/my-repo/')
export default defineConfig({
  plugins: [react()],
  base: '/V-Day-App/',
});
