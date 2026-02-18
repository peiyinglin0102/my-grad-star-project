import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. 引入插件

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/my-grad-star-project/', // 👈 加入這一行，名稱要跟 GitHub 專案一模一樣
})