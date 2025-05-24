import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@controllers': path.resolve(__dirname, './src/controllers'),
      '@repositories': path.resolve(__dirname, './src/repositories'),
      '@stores': path.resolve(__dirname, './src/stores'),
    }
  },
  server: {
    host: true,
    port: 5173,
    cors: true,
    allowedHosts: [
      '33e9-2804-4050-bb6-de4f-a01a-18df-9bda-be62.ngrok-free.app'
    ],
  }
})
