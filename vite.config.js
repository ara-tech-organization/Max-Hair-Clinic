import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: process.env.SITE_BASE || (command === 'build' ? '/Max-Hair-Clinic/' : '/'),
}))
