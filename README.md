# Local LLM Chat

一個基於 React + Node.js + Ollama 的本地大語言模型聊天應用程式，提供類似 ChatGPT 的使用者介面。

## 🌟 功能特色

- **現代化聊天介面**: 類似 ChatGPT 的設計，上方顯示對話內容，下方有輸入框和設定區域
- **暗色主題**: 完整的暗色主題支援，主題偏好自動保存
- **即時對話**: 支援與本地 Ollama 模型進行即時對話
- **靈活設定**: 可調整模型、溫度、Token 數量等參數
- **響應式設計**: 支援桌面和移動裝置
- **清除功能**: 一鍵清除對話記錄
- **錯誤處理**: 完善的錯誤提示和處理機制

## 🏗️ 技術架構

### 前端
- **React 18** - 使用 Hooks 和現代 React 功能
- **TypeScript** - 提供型別安全
- **Tailwind CSS** - 快速樣式開發
- **Vite** - 快速建構工具
- **Lucide React** - 現代化圖示庫

### 後端
- **Node.js + Express** - API 伺服器
- **Ollama SDK** - 本地 LLM 集成
- **CORS** - 跨域資源分享
- **Axios** - HTTP 客戶端

## 📋 系統需求

- **Node.js** 16.0.0 或更高版本
- **NPM** 8.0.0 或更高版本
- **Ollama** - 本地大語言模型執行環境

## 🚀 快速開始

### 1. 安裝依賴

```bash
npm install
```

> **注意**: 如果遇到依賴安裝問題，請嘗試：
> ```bash
> npm install --legacy-peer-deps
> ```

### 2. 啟動 Ollama

確保您的系統已安裝並啟動 Ollama：

```bash
# 啟動 Ollama 服務（通常自動啟動）
ollama serve

# 檢查 Ollama 狀態
ollama list
```

### 3. 安裝模型（可選）

```bash
# 下載常用模型
ollama pull llama2
ollama pull codellama
ollama pull mistral
ollama pull phi
```

### 4. 啟動應用程式

```bash
# 同時啟動前端和後端
npm run dev

# 或者分別啟動
# 終端 1 - 啟動後端
npm run server

# 終端 2 - 啟動前端
npm run client
```

### 5. 開啟瀏覽器

應用程式將自動在瀏覽器中開啟，或手動訪問：
- 前端：http://localhost:3000
- 後端 API：http://localhost:3001

## 📁 專案結構

```
local-llm-chat/
├── src/                    # 前端原始碼
│   ├── App.tsx            # 主應用元件
│   ├── main.jsx           # 應用程式入口
│   └── index.css          # 全域樣式
├── server/                # 後端原始碼
│   ├── index.js           # Express 伺服器
│   ├── chatProvider.js    # 聊天邏輯
│   └── ollamaProvider.js  # Ollama 集成
├── public/                # 靜態資源
├── package.json           # 專案配置
├── tsconfig.json          # TypeScript 配置
├── vite.config.js         # Vite 配置
├── tailwind.config.js     # Tailwind 配置
└── postcss.config.js      # PostCSS 配置
```

## 🔧 配置說明

### 前端設定

在 `src/App.tsx` 中，您可以調整：

- **預設模型**: `llama2`, `codellama`, `mistral`, `phi`
- **預設溫度**: 0.7 (0.0-2.0)
- **最大 Token 數**: 8192 (範圍: 100-262144)
- **UI 佈局**: 左側設定面板擴大 (3:2 比例)
- **系統提示**: 自定義 AI 行為

### 後端設定

在 `server/index.js` 中，您可以調整：

- **服務器端口**: 預設 3001
- **CORS 設定**: 跨域訪問控制
- **請求超時**: 30秒

在 `server/ollamaProvider.js` 中，您可以調整：

- **Ollama 連接**: http://localhost:11434
- **生成參數**: temperature, top_p, repeat_penalty
- **Context 控制**: num_ctx 與 maxTokens 同步設定
- **Token 限制**: num_predict 根據用戶設定動態調整

## 🎯 API 端點

### GET /api/health
健康檢查端點
```json
{
  "status": "ok",
  "timestamp": "2025-11-15T13:17:12.110Z"
}
```

### GET /api/models
獲取可用模型列表
```json
{
  "models": [
    {
      "name": "llama2",
      "size": 1234567890,
      "modifiedAt": "2025-11-15T13:17:12.110Z"
    }
  ]
}
```

### POST /api/chat
發送聊天消息
```json
{
  "message": "你好，請自我介紹",
  "settings": {
    "model": "llama2",
    "temperature": 0.7,
    "maxTokens": 2048
  },
  "history": []
}
```

## 🛠️ 開發命令

```bash
# 安裝依賴
npm install

# 開發模式（同時啟動前後端）
npm run dev

# 僅啟動前端
npm run client

# 僅啟動後端
npm run server

# 建構生產版本
npm run build

# 預覽生產版本
npm run preview
```

## 🐛 故障排除

### Ollama 連接失敗
- 確保 Ollama 服務正在運行：`ollama serve`
- 檢查端口是否正確：預設為 11434
- 嘗試重新啟動 Ollama：`ollama serve --port 11434`

### 模型未找到
- 確認模型已下載：`ollama list`
- 如果沒有模型，使用：`ollama pull llama2`
- 檢查模型名稱是否正確

### 前端無法連接到後端
- 確保後端在端口 3001 上運行
- 檢查 Vite 代理配置：`vite.config.js`
- 查看瀏覽器控制台的錯誤訊息

### TypeScript 錯誤
- 重新安裝依賴：`rm -rf node_modules package-lock.json && npm install`
- 檢查 TypeScript 版本：`npx tsc --version`

## 🔄 更新日誌

### v1.1.0 (2025-11-15)
- ✨ **UI 改進**: 左側設定面板擴大，提供更好的操作體驗
- 🚀 **Token 限制提升**: 最大 Token 數上限從 4096 提升到 262144
- ⚙️ **Context 同步**: maxToken 設定與 Ollama context size 同步
- 🔧 **技術改進**: 優化佈局比例 (3:2) 和參數控制邏輯

### v1.0.0 (2025-11-15)
- 🎉 初始版本發布
- 💬 基本聊天功能
- 🌙 暗色主題支援
- 📱 響應式設計

## � 未來功能

- [ ] 多對話管理
- [ ] 對話歷史持久化
- [ ] 檔案上傳功能
- [ ] 語音輸入/輸出
- [ ] 實時串流回應
- [ ] 深色模式
- [ ] 鍵盤快捷鍵
- [ ] 導出對話記錄

## 📝 注意事項

1. **硬體要求**: 大型模型需要足夠的 RAM（建議 8GB 以上）
2. **首次使用**: 首次啟動模型可能需要下載，請耐心等待
3. **安全**: 這是本地應用，數據不會上傳到雲端
4. **性能**: 模型大小會影響響應速度

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License - 詳見 LICENSE 檔案

---

**享受與本地 AI 模型的對話吧！** 🚀
