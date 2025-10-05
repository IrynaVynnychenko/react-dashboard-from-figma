import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react-dashboard-from-figma/', // Додаємо базовий шлях для GitHub Pages
  server: {
    port: 3000,
    open: true
  }
})
