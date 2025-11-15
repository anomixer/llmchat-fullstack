import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        open: true,
        proxy: {
            // 代理 API 請求到後端服務器
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                secure: false,
                logLevel: 'debug'
            }
        }
    },
    build: {
        outDir: 'dist',
        sourcemap: true
    },
    resolve: {
        alias: {
            '@': '/src',
            '@/components': '/src/components',
            '@/utils': '/src/utils'
        }
    }
})