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
  // Para GitHub Pages con subdirectorio (usuario.github.io/repo), usar '/repo/'
  // Para dominio personalizado (www.tudominio.com), cambiar a '/'
  base: '/calibre/',
})