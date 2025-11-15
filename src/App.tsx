import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Settings, Trash2, Moon, Sun } from 'lucide-react'

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}

interface ChatSettings {
    model: string
    temperature: number
    maxTokens: number
    apiUrl: string
    apiKey: string
    topP: number
    topK: number
}

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme')
        return saved ? JSON.parse(saved) : false
    })
    const [availableModels, setAvailableModels] = useState<Array<{ id: string; name: string }>>([])
    const [isLoadingModels, setIsLoadingModels] = useState(true)
    const [settings, setSettings] = useState<ChatSettings>({
        model: '',
        temperature: 0.7,
        maxTokens: 8192,
        apiUrl: 'http://localhost:11434',
        apiKey: '',
        topP: 0.9,
        topK: 40
    })
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    // 切換主題函數
    const toggleTheme = () => {
        const newTheme = !isDarkMode
        setIsDarkMode(newTheme)
        localStorage.setItem('theme', JSON.stringify(newTheme))
    }

    // 載入可用模型列表 - 支持自定義 API URL
    const loadAvailableModels = async () => {
        try {
            setIsLoadingModels(true)
            const apiUrl = settings.apiUrl || 'http://localhost:11434'
            const response = await fetch(`/api/models?apiUrl=${encodeURIComponent(apiUrl)}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            const models = data.models.map((model: any) => ({
                id: model.name,
                name: model.name
            }))
            setAvailableModels(models)

            // 如果有模型且當前模型為空，使用第一個
            if (models.length > 0 && !settings.model) {
                setSettings(prev => ({ ...prev, model: models[0].id }))
            }
        } catch (error) {
            console.error('Error loading models:', error)
            setAvailableModels([]) // 不使用備用列表，只從 Ollama 獲取
        } finally {
            setIsLoadingModels(false)
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
        }
    }, [input])

    // 組件掛載時載入模型列表
    useEffect(() => {
        loadAvailableModels()
    }, [])

    // 當 API URL 變化時重新載入模型列表 (防抖)
    useEffect(() => {
        if (settings.apiUrl) {
            const timeoutId = setTimeout(() => {
                loadAvailableModels()
            }, 500) // 500ms 防抖
            return () => clearTimeout(timeoutId)
        }
    }, [settings.apiUrl])

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage.content,
                    settings: settings,
                    history: messages
                }),
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.response,
                timestamp: new Date()
            }

            setMessages(prev => [...prev, assistantMessage])
        } catch (error) {
            console.error('Error sending message:', error)
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: '抱歉，發生錯誤。請檢查後端服務是否正常運行。',
                timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
            // 發送完成後自動聚焦到輸入框
            setTimeout(() => {
                textareaRef.current?.focus()
            }, 100)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    const clearChat = () => {
        setMessages([])
    }

    return (
        <div className={`flex flex-col h-screen transition-colors ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
            {/* Header */}
            <div className={`shadow-sm border-b px-4 py-3 flex items-center justify-between transition-colors ${isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
                }`}>
                <div className="flex items-center space-x-2">
                    <Bot className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <h1 className={`text-xl font-semibold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>Local LLM Chat</h1>
                </div>
                <div className="flex items-center space-x-2">
                    {/* 主題切換按鈕 */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg transition-colors ${isDarkMode
                            ? 'text-yellow-400 hover:bg-gray-700'
                            : 'text-gray-500 hover:bg-gray-100'
                            }`}
                        title={isDarkMode ? '切換到亮色模式' : '切換到暗色模式'}
                    >
                        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                    <button
                        onClick={clearChat}
                        className={`p-2 rounded-lg transition-colors ${isDarkMode
                            ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700'
                            : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                            }`}
                        title="清除對話"
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className={`p-2 rounded-lg transition-colors ${showSettings
                            ? (isDarkMode ? 'text-blue-400 bg-gray-700' : 'text-blue-600 bg-blue-50')
                            : (isDarkMode
                                ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700'
                                : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50')
                            }`}
                        title="設定"
                    >
                        <Settings className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <div className={`border-b px-4 py-3 transition-colors ${isDarkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                    }`}>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* 左側：LLM 配置 */}
                        <div className="lg:col-span-3 space-y-4">
                            <h3 className={`text-sm font-semibold transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-800'
                                }`}>
                                LLM 配置
                            </h3>

                            <div>
                                <label className={`block text-sm font-medium mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                    API URL
                                </label>
                                <input
                                    type="text"
                                    value={settings.apiUrl}
                                    onChange={(e) => setSettings(prev => ({ ...prev, apiUrl: e.target.value }))}
                                    placeholder="http://localhost:11434"
                                    className={`max-w-md px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isDarkMode
                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                        : 'bg-white border-gray-300'
                                        }`}
                                />
                                <p className={`text-xs mt-1 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    Ollama/OpenAI API 地址
                                </p>
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                    API Key
                                </label>
                                <input
                                    type="password"
                                    value={settings.apiKey}
                                    onChange={(e) => setSettings(prev => ({ ...prev, apiKey: e.target.value }))}
                                    placeholder="輸入 API Key (可選)"
                                    className={`max-w-md px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isDarkMode
                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                        : 'bg-white border-gray-300'
                                        }`}
                                />
                                <p className={`text-xs mt-1 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    用於需要驗證的 API 服務
                                </p>
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                    模型 {isLoadingModels && <span className="text-xs text-gray-500">(載入中...)</span>}
                                    {availableModels.length === 0 && !isLoadingModels && (
                                        <span className="text-xs text-red-500 ml-2">(未找到模型)</span>
                                    )}
                                </label>
                                <select
                                    value={settings.model}
                                    onChange={(e) => setSettings(prev => ({ ...prev, model: e.target.value }))}
                                    disabled={isLoadingModels}
                                    className={`max-w-md px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isDarkMode
                                        ? 'bg-gray-700 border-gray-600 text-white disabled:opacity-50'
                                        : 'bg-white border-gray-300 disabled:opacity-50'
                                        }`}
                                >
                                    {isLoadingModels ? (
                                        <option value="">載入中...</option>
                                    ) : availableModels.length > 0 ? (
                                        availableModels.map(model => (
                                            <option key={model.id} value={model.id}>
                                                {model.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">沒有可用模型</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        {/* 右側：生成參數 */}
                        <div className="lg:col-span-2 space-y-4">
                            <h3 className={`text-sm font-semibold transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-800'
                                }`}>
                                生成參數
                            </h3>

                            <div>
                                <label className={`block text-sm font-medium mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                    溫度: {settings.temperature}
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="2"
                                    step="0.1"
                                    value={settings.temperature}
                                    onChange={(e) => setSettings(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                                    className={`max-w-sm ${isDarkMode ? 'accent-blue-400' : 'accent-blue-600'
                                        }`}
                                />
                                <p className={`text-xs mt-1 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    控制輸出的隨機性 (0-2)
                                </p>
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                    Top P: {settings.topP}
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={settings.topP}
                                    onChange={(e) => setSettings(prev => ({ ...prev, topP: parseFloat(e.target.value) }))}
                                    className={`max-w-sm ${isDarkMode ? 'accent-blue-400' : 'accent-blue-600'
                                        }`}
                                />
                                <p className={`text-xs mt-1 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    核心採樣，考慮高概率令牌 (0-1)
                                </p>
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                    Top K: {settings.topK}
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    step="1"
                                    value={settings.topK}
                                    onChange={(e) => setSettings(prev => ({ ...prev, topK: parseInt(e.target.value) }))}
                                    className={`max-w-sm ${isDarkMode ? 'accent-blue-400' : 'accent-blue-600'
                                        }`}
                                />
                                <p className={`text-xs mt-1 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    限制候選令牌數量 (1-100)
                                </p>
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                    最大 Token 數
                                </label>
                                <input
                                    type="number"
                                    min="100"
                                    max="262144"
                                    step="100"
                                    value={settings.maxTokens}
                                    onChange={(e) => setSettings(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                                    className={`max-w-sm px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isDarkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300'
                                        }`}
                                />
                                <p className={`text-xs mt-1 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    限制生成回應的最大長度
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages.length === 0 ? (
                    <div className={`text-center mt-12 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                        <Bot className={`h-12 w-12 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'
                            }`} />
                        <p className="text-lg">開始與 AI 對話吧！</p>
                        <p className="text-sm">輸入您的問題，我會盡力為您回答。</p>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex items-start space-x-3 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                                }`}
                        >
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.role === 'user'
                                ? 'bg-blue-600 text-white'
                                : isDarkMode
                                    ? 'bg-gray-700 text-gray-300'
                                    : 'bg-gray-200 text-gray-600'
                                }`}>
                                {message.role === 'user' ? (
                                    <User className="h-4 w-4" />
                                ) : (
                                    <Bot className="h-4 w-4" />
                                )}
                            </div>
                            <div className={`flex-1 max-w-3xl ${message.role === 'user' ? 'text-right' : ''
                                }`}>
                                <div className={`inline-block px-4 py-2 rounded-lg transition-colors ${message.role === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : isDarkMode
                                        ? 'bg-gray-800 text-gray-100 border border-gray-700'
                                        : 'bg-white text-gray-900 border border-gray-200'
                                    }`}>
                                    <p className="whitespace-pre-wrap break-words">{message.content}</p>
                                </div>
                                <p className={`text-xs mt-1 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    {message.timestamp.toLocaleTimeString('zh-TW')}
                                </p>
                            </div>
                        </div>
                    ))
                )}
                {isLoading && (
                    <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-200 text-gray-600'
                            }`}>
                            <Bot className="h-4 w-4" />
                        </div>
                        <div className={`border rounded-lg px-4 py-2 transition-colors ${isDarkMode
                            ? 'bg-gray-800 border-gray-700'
                            : 'bg-white border-gray-200'
                            }`}>
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`border-t px-4 py-4 transition-colors ${isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
                }`}>
                <div className="flex items-end space-x-3">
                    <div className="flex-1 relative">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="輸入您的訊息... (Shift+Enter 換行)"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[52px] max-h-32 transition-colors ${isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300'
                                }`}
                            rows={1}
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || isLoading || availableModels.length === 0}
                        className={`p-3 rounded-lg transition-colors ${input.trim() && !isLoading && availableModels.length > 0
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : isDarkMode
                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default App