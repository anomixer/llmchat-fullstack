import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        open: true,
        // 允許的主機列表：預設值 + 環境變數
        allowedHosts: [
            'localhost',
            '127.0.0.1',
            ...(process.env.VITE_ALLOWED_HOSTS
                ? process.env.VITE_ALLOWED_HOSTS.split(',').map(host => host.trim())
                : [])
        ],
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
