# LLMChat

一個具有玻璃擬態設計的現代化本地大語言模型聊天應用程式，**純前端架構**直接調用 Ollama API，提供美觀且功能完整的聊天體驗。支援靜態部署到 Vercel、Netlify 等平台。

## 🌟 功能特色

- **現代化聊天介面**: 類似 ChatGPT 的設計，上方顯示對話內容，下方有輸入框和設定區域
- **玻璃擬態設計**: 現代化的玻璃擬態視覺效果，搭配主題適應的漸層背景（亮色模式藍色，暗色模式紫色），提供沉浸式聊天體驗
- **全螢幕優化**: 最大化利用螢幕空間，實現真正的全螢幕聊天體驗
- **模型狀態顯示**: 標題欄顯示當前使用的 AI 模型，點擊可快速開啟設定
- **多對話管理**: 支援創建、切換和刪除多個獨立對話
- **對話歷史持久化**: 自動保存對話記錄到本地儲存
- **檔案上傳功能**: 支援上傳文件並以小字顯示檔名，可收合展開，提供對話上下文
- **語音輸入/輸出**: 支援語音輸入和文字轉語音功能
- **實時串流回應**: 以實時串流顯示AI回應，提供類似打字機的效果，自動滾動跟隨最新內容
- **思考過程顯示**: 支援顯示AI的思考過程，可收合展開，支援實時流式顯示（如果模型支援）
- **環境變數配置**: 支援 `VITE_OLLAMA_API_URL` 和 `VITE_OLLAMA_API_KEY` 環境變數配置
- **靜態部署支援**: 可部署到 Vercel、Netlify 等靜態託管平台
- **Markdown 支援**: 完整的 Markdown 語法支援，包括程式碼高亮和格式化顯示
- **智能滾動控制**: 訊息串流時自動下捲，用戶可隨時往上回捲禁用自動下捲功能，除非捲到底部才重新啟用
- **程式碼複製功能**: Markdown 中的程式碼區塊提供一鍵複製按鈕，方便使用
- **暗色主題**: 完整的暗色主題支援，主題偏好自動保存
- **鍵盤快捷鍵**: 支援多種快捷鍵操作，提升使用效率
- **導出對話記錄**: 支援導出為JSON和Markdown格式
- **即時對話**: 支援與本地 Ollama 模型進行即時對話
- **靈活設定**: 可調整模型、溫度、Token 數量等參數
- **響應式設計**: 支援桌面和移動裝置
- **清除功能**: 一鍵清除對話記錄
- **錯誤處理**: 完善的錯誤提示和處理機制

## ⌨️ 快捷鍵支援

應用程式支援以下鍵盤快捷鍵，提升操作效率：

- **Ctrl/Cmd + I**: 創建新對話
- **Ctrl/Cmd + K**: 清除當前對話內容
- **Ctrl/Cmd + ,**: 開啟/關閉設定面板
- **Ctrl/Cmd + B**: 開啟/關閉對話列表面板
- **Escape**: 關閉所有開啟的面板
- **Enter**: 發送消息（Shift + Enter 換行）

## 🏗️ 技術架構

### 前端
- **React 18** - 使用 Hooks 和現代 React 功能
- **TypeScript** - 提供型別安全
- **Tailwind CSS** - 快速樣式開發
- **Vite** - 快速建構工具
- **Lucide React** - 現代化圖示庫

### 架構特點
- **純前端架構** - 直接調用 Ollama API，無需後端服務
- **靜態部署** - 可部署到 Vercel、Netlify 等靜態託管平台
- **環境變數配置** - 支援自定義 Ollama API URL 和 Key
- **CORS 處理** - 需要配置 Ollama 服務器允許跨域訪問

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

### 2. 配置環境變數（可選）

複製並編輯環境變數文件：

```bash
cp .env.example .env
```

編輯 `.env` 文件設定您的 Ollama 服務器：

```bash
# Ollama API 配置
VITE_OLLAMA_API_URL=http://your-ollama-server:11434
VITE_OLLAMA_API_KEY=your_api_key_here  # 可選
```

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
ollama pull llama3:8b
ollama pull codellama:7b
ollama pull mistral:7b
ollama pull gemma3:4b
```

### 4. 啟動應用程式

```bash
npm run dev
```

### 5. 開啟瀏覽器

應用程式將自動在瀏覽器中開啟，或手動訪問：
- 前端：http://localhost:5173

## 🚀 部署

### 本地部署
```bash
npm run build
npm run preview
```

### ☁️ 靜態託管部署（推薦）

#### Vercel 部署（推薦）
1. **前往 [vercel.com](https://vercel.com) 註冊帳號**
2. **連接您的 GitHub 倉庫**
3. **自動部署**：
   - Vercel 會自動檢測 Vite 專案
   - 無需額外配置
4. **完成！** 您的應用程式會自動部署並獲得 HTTPS 域名

#### Netlify 部署
1. **前往 [netlify.com](https://netlify.com) 註冊帳號**
2. **連接您的 GitHub 倉庫**
3. **自動部署**：
   - Netlify 會自動檢測專案配置
   - 使用 `_netlify.toml` 中的設定
4. **完成！** 您的應用程式會自動部署並獲得 HTTPS 域名

#### 其他選項
- **GitHub Pages**: 免費，但需要手動配置
- **Railway**: 支援靜態託管
- **Render**: 靜態託管選項

#### 部署特點

- **純前端架構**: 只有靜態文件，無服務器
- **全球 CDN**: 自動獲得 CDN 加速
- **免費額度充足**: 大多數平台提供免費額度
- **自動 HTTPS**: 內建 SSL 證書
- **即時部署**: 推送代碼自動重新部署

#### 環境變數配置

在部署平台設定環境變數：

**Vercel:**
- 在專案設定 > Environment Variables 中添加：
  - `VITE_OLLAMA_API_URL`: 您的 Ollama 服務器 URL
  - `VITE_OLLAMA_API_KEY`: API Key（可選）

**Netlify:**
- 在 Site settings > Environment variables 中添加相同變數

#### 注意事項

- **Ollama 服務**: 需要一個可訪問的 Ollama 服務器（本地或遠程）
- **CORS 設置**: 確保 Ollama 服務器允許前端域名訪問
- **API Key 安全**: API Key 會暴露在前端，建議使用只讀權限

**啟用 Ollama CORS 的方法：**
```bash
# 使用環境變數啟動
OLLAMA_ORIGINS="https://your-frontend-domain.com" ollama serve

# 或修改 Ollama 配置
# 在 ~/.ollama/ 目錄下創建或編輯配置文件
```

## 📁 專案結構

```
llmchat/
├── src/                   # 前端原始碼
│   ├── App.tsx            # 主應用元件（直接調用 Ollama API）
│   ├── MarkdownMsg.tsx    # Markdown 渲染組件
│   ├── main.jsx           # 應用程式入口
│   ├── index.css          # 全域樣式（包含玻璃擬態設計）
│   └── vite-env.d.ts      # Vite 環境變數類型定義
├── public/                # 靜態資源
│   ├── favicon.svg        # 網站圖標
│   └── github.svg         # GitHub 官方標誌
├── .env                   # 環境變數配置（從 .env.example 複製）
├── .env.example           # 環境變數範例
├── index.html             # HTML 模板（簡化設計）
├── package.json           # 專案配置
├── tsconfig.json          # TypeScript 配置
├── tsconfig.node.json     # Node.js TypeScript 配置
├── vite.config.js         # Vite 配置
├── tailwind.config.js     # Tailwind 配置
├── postcss.config.js      # PostCSS 配置
├── vercel.json            # Vercel 部署配置
├── _netlify.toml          # Netlify 部署配置
└── README.md              # 專案說明
```

## 🔧 配置說明

### 環境變數配置

應用程式支援以下環境變數配置：

```bash
# Ollama API 配置
VITE_OLLAMA_API_URL=http://localhost:11434    # Ollama 服務器地址
VITE_OLLAMA_API_KEY=your_api_key_here         # API Key（可選）
VITE_ALLOWED_HOSTS=                           # 允許的主機列表（開發用）
```

**配置步驟：**
1. 複製環境變數範例：`cp .env.example .env`
2. 編輯 `.env` 文件設定您的 Ollama 服務器地址
3. 重新啟動開發服務器：`npm run dev`

### 前端設定

在應用程式設定面板中，您可以調整：

- **LLM模型**: 自動從 Ollama 載入可用模型
- **預設溫度**: 0.7 (0.0-2.0，低溫=確定、邏輯、一致；高溫=多樣、創造、驚喜)
- **最大 Context 數**: 8192 (範圍: 4096-262144)
- **Top P**: 0.9 (0.0-1.0，高=高機率；低=低機率)
- **Top K**: 40 (1-100，高=取樣多；低=取樣少)
- **系統提示**: 自定義 AI 行為
- **串流模式**: 永遠啟用，提供實時回應體驗

### Ollama 服務配置

由於是純前端架構，您需要確保 Ollama 服務器配置正確：

- **啟用 CORS**: Ollama 需要允許前端域名訪問
- **網路訪問**: 確保 Ollama 服務器可以從外部訪問
- **安全考慮**: API Key 會暴露在前端，建議使用只讀權限

## 🎯 Ollama API 整合

應用程式直接調用 Ollama 的標準 API：

### GET /api/tags
獲取可用模型列表
```json
{
  "models": [
    {
      "name": "llama3:8b",
      "size": 4661224676,
      "modified_at": "2025-11-17T10:00:00.000000Z"
    }
  ]
}
```

### POST /api/chat
發送串流聊天消息（實時回應）
```json
{
  "model": "llama3:8b",
  "messages": [
    {"role": "system", "content": "你是一個有用的AI助手"},
    {"role": "user", "content": "你好，請自我介紹"}
  ],
  "stream": true,
  "options": {
    "temperature": 0.7,
    "num_predict": 8192,
    "top_p": 0.9,
    "top_k": 40
  }
}
```

**回應格式：**
```json
{"message":{"content":"你"},"done":false}
{"message":{"content":"好"},"done":false}
{"message":{"thinking":"我正在思考如何自我介紹..."},"done":false}
{"done":true}
```

**思考過程支援**: 某些模型支援顯示AI的思考過程，會在 `message.thinking` 字段中返回。應用程式會即時顯示思考內容，並支援展開/收起控制。

## 🛠️ 開發命令

```bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 建構生產版本
npm run build

# 預覽生產版本
npm run preview
```

## 🐛 故障排除

### 環境變數配置問題
- 確保 `.env` 文件存在並正確配置
- 環境變數必須以 `VITE_` 開頭才能在前端使用
- 修改環境變數後需要重新啟動開發服務器
- 檢查環境變數名稱是否正確：`VITE_OLLAMA_API_URL`

### Ollama 連接失敗
- 確保 Ollama 服務正在運行：`ollama serve`
- 檢查端口是否正確：預設為 11434
- 檢查 API URL 是否正確：`http://your-server:11434`
- 測試連接：`curl http://your-server:11434/api/tags`

### CORS 錯誤
- 啟用 Ollama CORS：`OLLAMA_ORIGINS="*" ollama serve`
- 或指定特定域名：`OLLAMA_ORIGINS="https://your-domain.com" ollama serve`
- 對於靜態部署，需要在 Ollama 配置中添加部署域名

### 模型載入錯誤
- 檢查網路連接是否正常
- 確認 Ollama 服務器可以訪問
- 查看瀏覽器控制台的詳細錯誤訊息
- 嘗試重新載入頁面

### 模型未找到
- 確認模型已下載：`ollama list`
- 如果沒有模型，使用：`ollama pull llama3:8b`
- 檢查模型名稱是否正確

### TypeScript 錯誤
- 重新安裝依賴：`rm -rf node_modules package-lock.json && npm install`
- 檢查 TypeScript 版本：`npx tsc --version`

## 🔄 更新日誌

### v1.2.0 (2025-11-17)
- 🚀 **純前端架構**: 移除後端服務，直接調用 Ollama API
- 📦 **靜態部署**: 支援 Vercel、Netlify 等靜態託管平台
- 🗂️ **專案結構優化**: 移除 server 目錄，簡化專案結構
- ⚙️ **環境變數支援**: 新增 VITE_OLLAMA_API_URL 和 VITE_OLLAMA_API_KEY 環境變數配置
- 📋 **API 整合**: 直接使用 Ollama 標準 API (/api/tags, /api/chat)
- 🔧 **建構優化**: 移除後端依賴，專注前端功能
- 🏷️ **版本號顯示**: 在應用標題中顯示版本號，提供更好的版本識別
- 📝 **Markdown 支援**: 新增完整的 Markdown 語法支援，包括程式碼高亮和格式化顯示
- 🎯 **智能滾動控制**: 實現訊息串流時的智能滾動，用戶可隨時往上回捲禁用自動下捲功能，除非捲到底部才重新啟用
- 📋 **程式碼複製功能**: Markdown 中的程式碼區塊提供一鍵複製按鈕，方便使用
- 📏 **對話框寬度優化**: 將對話框寬度調整為 90%，提供更好的閱讀體驗
- 🌐 **允許主機配置**: 新增 VITE_ALLOWED_HOSTS 環境變數，支持動態配置 Vite 開發服務器允許的主機列表
- 📁 **檔案顯示優化**: 檔案上傳以小字顯示並支援收合展開，類似思考過程樣式
- 🎛️ **設定面板重構**: 改為左右50:50佈局，提供更平衡的視覺體驗
- 📝 **參數說明優化**: 整合說明文字到標籤中，提供詳細的參數解釋
- 🎚️ **滑桿統一**: 所有生成參數統一使用滑桿輸入，提升用戶體驗
- 📊 **Context範圍調整**: 最大Context數範圍調整為4096-262144，提供更合理的設定選項
- 🎨 **主題背景優化**: 亮色模式使用藍色漸層，暗色模式使用紫色漸層，提供更好的視覺體驗
- 🧠 **串流思考過程**: 實現思考過程的即時串流顯示和展開/收起控制
- 🔧 **錯誤處理改善**: 改善模型載入錯誤處理，提供具體的錯誤訊息
- ⚡ **載入邏輯優化**: 修復環境變數載入時機和重複載入問題

### v1.1.0 (2025-11-16)
- ✨ **玻璃擬態設計**: 實現現代化的玻璃擬態視覺效果，搭配漸層背景
- 🎨 **UI 優化**: 全螢幕沉浸式體驗，thinking區域有獨特的樣式區分
- 📐 **容器寬度**: 將玻璃容器寬度調整為 96% 瀏覽器寬度
- 📏 **高度優化**: 動態調整容器高度避免滾動條，最大化聊天空間
- 📁 **檔案顯示優化**: 檔案上傳僅顯示檔名，不顯示內容以保持介面簡潔
- 🎯 **設計完善**: 提升整體視覺一致性和使用者體驗
- 🔗 **GitHub 整合**: 添加官方 GitHub 標誌連結
- 📊 **模型狀態**: 標題欄顯示當前模型，點擊可開啟設定
- 💬 **歡迎介面**: 優化歡迎訊息，完整介紹應用功能
- 🎨 **主題適應**: 完善明暗主題的視覺效果和對比度
- 🧠 **思考過程顯示**: 新增AI思考過程的可收合顯示功能
- 📡 **實時thinking流式**: 支援thinking內容的實時流式顯示
- 🎯 **精確控制**: 只有實際包含thinking的訊息才會顯示思考過程按鈕

### v1.0.0 (2025-11-15)
- 🎉 **全功能實現**: 完成所有規劃中的進階功能
- 💬 **多對話管理**: 支援創建、切換和刪除多個獨立對話
- 💾 **對話持久化**: 自動保存對話記錄到本地儲存
- ⚡ **實時串流**: 支援實時串流回應，提供打字機效果
- 📜 **自動滾動**: 實現流式消息時自動滾動到底部，跟隨最新內容
- 📁 **檔案上傳**: 支援文件上傳並自動讀取內容
- 🎤 **語音功能**: 實現語音輸入和文字轉語音輸出
- ⌨️ **快捷鍵支援**: 添加多種鍵盤快捷鍵操作
- 📤 **導出功能**: 支援JSON和Markdown格式導出
- 🔧 **API擴展**: 新增串流聊天API端點
- 🚀 **Token 限制提升**: 最大 Token 數上限提升到 262144
- ⚙️ **Context 同步**: maxToken 設定與 Ollama context size 同步
- 🛡️ **確認機制**: 添加刪除對話和清除內容的確認視窗


## � 未來功能

- [ ] UI再改良
- [ ] 支援更多Provider的模型
- [ ] 支援更完善的Chat功能，如網路搜尋
- [ ] 支援更進階的功能，如MCP等

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

**享受與本地 AI 模型的美觀對話體驗吧！** ✨
