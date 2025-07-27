import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 移除base路径，支持自定义域名
  // base: '/IdiomHeros/',
}) 