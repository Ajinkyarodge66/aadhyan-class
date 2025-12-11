import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: Only ONE export default allowed
export default defineConfig({
  plugins: [react()],
  base: "/aadhyan-class/",  // your repo name
});

