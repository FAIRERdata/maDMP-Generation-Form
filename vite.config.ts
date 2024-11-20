import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: mode === 'production' ? 'https://fairerdata.github.io/maDMP-Generation-Form/' : '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})