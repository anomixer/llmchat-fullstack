import express from 'express'
import cors from 'cors'
import { OllamaProvider } from './ollamaProvider.js'
import { ChatProvider } from './chatProvider.js'

const app = express()
const PORT = process.env.PORT || 3001

// 中間件
app.use(cors())
app.use(express.json())

// 初始化提供者
const ollamaProvider = new OllamaProvider()
const chatProvider = new ChatProvider(ollamaProvider)

// 健康檢查端點
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 獲取可用模型 - OpenAI API 相容格式
app.get('/v1/models', async (req, res) => {
    try {
        const models = await ollamaProvider.getAvailableModels()

        // OpenAI API 相容的響應格式
        const openaiModels = models.map(model => ({
            id: model.name,
            object: 'model',
            created: Math.floor(Date.now() / 1000),
            owned_by: 'local'
        }))

        res.json({
            object: 'list',
            data: openaiModels
        })
    } catch (error) {
        console.error('Error fetching models:', error)
        res.status(500).json({
            error: {
                message: '無法獲取模型列表',
                type: 'invalid_request_error'
            }
        })
    }
})

// 獲取可用模型 - 支持自定義 API URL
app.get('/api/models', async (req, res) => {
    try {
        const apiUrl = req.query.apiUrl || 'http://localhost:11434'
        const dynamicProvider = new OllamaProvider(apiUrl)
        const models = await dynamicProvider.getAvailableModels()
        res.json({ models })
    } catch (error) {
        console.error('Error fetching models:', error)
        res.status(500).json({ error: '無法獲取模型列表' })
    }
})

// 聊天端點 - 支持自定義 API URL 和 API Key
app.post('/api/chat', async (req, res) => {
    try {
        const { message, settings, history } = req.body

        if (!message) {
            return res.status(400).json({ error: '消息不能為空' })
        }

        // 設置預設設定
        const chatSettings = {
            model: settings?.model || 'llama2',
            temperature: settings?.temperature || 0.7,
            maxTokens: settings?.maxTokens || 2048,
            systemPrompt: settings?.systemPrompt || '你是一個有用的AI助手，請用繁體中文回答用戶的問題。',
            apiUrl: settings?.apiUrl || 'http://localhost:11434',
            apiKey: settings?.apiKey || ''
        }

        // 使用自定義 API URL 和 API Key 的動態提供者
        const dynamicProvider = new OllamaProvider(chatSettings.apiUrl, chatSettings.apiKey)
        const dynamicChatProvider = new ChatProvider(dynamicProvider)

        // 生成回應
        const response = await dynamicChatProvider.generateResponse({
            message,
            history: history || [],
            settings: chatSettings
        })

        res.json({ response })
    } catch (error) {
        console.error('Chat error:', error)
        res.status(500).json({ error: '處理請求時發生錯誤', details: error.message })
    }
})

// 聊天歷史端點（可選功能）
app.get('/api/history', (req, res) => {
    // 這裡可以實現從數據庫獲取聊天歷史的功能
    // 目前返回空數組，可以後續擴展
    res.json({ history: [] })
})

// 全局錯誤處理
app.use((error, req, res, next) => {
    console.error('Global error:', error)
    res.status(500).json({
        error: '服務器內部錯誤',
        message: process.env.NODE_ENV === 'development' ? error.message : '請稍後再試'
    })
})

// 啟動服務器
app.listen(PORT, () => {
    console.log(`🚀 Local LLM Chat Server 運行在 http://localhost:${PORT}`)
    console.log(`📝 API 端點:`)
    console.log(`   - GET  /api/health     - 健康檢查`)
    console.log(`   - GET  /v1/models      - 獲取模型列表 (OpenAI 格式)`)
    console.log(`   - GET  /api/models     - 獲取模型列表 (舊格式)`)
    console.log(`   - POST /api/chat       - 聊天`)
    console.log(`   - GET  /api/history    - 聊天歷史`)

    // 測試 Ollama 連接
    ollamaProvider.checkConnection()
        .then(connected => {
            if (connected) {
                console.log('✅ Ollama 連接正常')
            } else {
                console.warn('⚠️  Ollama 連接失敗，請確保 Ollama 正在運行')
            }
        })
        .catch(error => {
            console.warn('⚠️  檢查 Ollama 連接時發生錯誤:', error.message)
        })
})

export default app