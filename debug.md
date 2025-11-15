# Ollama 模型未顯示問題診斷與解決方案

## 常見問題與解決方案

### 問題 1：後端無法連接 Ollama
**症狀**：後端啟動時顯示 "⚠️ Ollama 連接失敗"

**解決方案**：
```bash
# 1. 檢查 Ollama 服務是否在正確端口運行
curl http://localhost:11434/api/version

# 2. 如果連接失敗，重新啟動 Ollama
ollama serve

# 3. 確認模型是否正常
ollama list
```

### 問題 2：API 端點問題
**症狀**：前端載入模型時出錯

**測試 API 端點**：
```bash
# 測試模型列表 API
curl http://localhost:3001/v1/models

# 測試健康檢查
curl http://localhost:3001/api/health
```

### 問題 3：前端緩存問題
**解決方案**：
1. 清除瀏覽器緩存
2. 重新整理頁面
3. 重新啟動前端和後端

### 問題 4：權限問題
**解決方案**：
```bash
# 確認後端有權限訪問 Ollama
netstat -an | grep 11434
```

## 快速診斷步驟

1. **檢查 Ollama 狀態**：
   ```bash
   ollama serve &  # 啟動 Ollama
   ollama list     # 查看模型
   ```

2. **測試 API 連接**：
   ```bash
   curl http://localhost:11434/api/version
   ```

3. **檢查後端服務**：
   ```bash
   npm run server
   ```

4. **測試前端 API**：
   在瀏覽器開發者工具 Console 中執行：
   ```javascript
   fetch('/v1/models').then(r => r.json()).then(console.log)
   ```

## 如果問題仍然存在

請提供以下資訊：
1. `ollama list` 的輸出
2. 後端啟動時的完整日誌
3. 瀏覽器 Console 的錯誤訊息
4. 前端載入模型時的網路請求狀態

這將幫助我提供更精確的解決方案。</parameter>
<line_count>60</line_count>
</write_to_file>