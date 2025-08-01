import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
  base: '/Jadwal-sholat-Web/', // ✅ letakkan di luar plugins
=======
  base: '/Jadwal-sholat-Web/',
>>>>>>> bfa727f7b5b30307d39cef51f985f74daf494749
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
