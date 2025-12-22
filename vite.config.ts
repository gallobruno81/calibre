import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react']
        }
      }
    }
  },
  // 'base' controla cómo se cargan los assets (imágenes, js).
  // Si usas un dominio personalizado (www.tudominio.com), '/' es correcto.
  // Si usas usuario.github.io/repo, GitHub Actions inyectará la ruta correcta si fuera necesario, 
  // pero para Custom Domain en Hostinger, '/' es lo que necesitas.
  base: '/',
})