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
    }
  },
  server: {
    host: true, // ou '0.0.0.0'
    port: 5173, // ou qualquer porta desejada
    cors: true,
    allowedHosts: [
      'd2ad-2804-4050-bb6-de4f-5d35-5d3e-817b-e70d.ngrok-free.app', // ngrok
    ],
  }
})
