import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
=======
  server: {
    host: true,
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
  },
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
})
