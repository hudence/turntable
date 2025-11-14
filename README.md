# 抽獎轉盤

一個支援離線使用的抽獎轉盤網頁應用（PWA）

## 功能特點

- 精美的轉盤動畫效果
- 可自訂選項，支援新增和刪除
- 使用 LocalStorage 保存選項設定
- 支援離線使用（PWA）
- 響應式設計，支援手機和桌面裝置

## 使用方法

### 本地運行

1. 由於 Service Worker 需要在 HTTPS 或 localhost 環境下運行，請使用以下方式之一：

**方法一：使用 Python 內建伺服器**
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**方法二：使用 Node.js http-server**
```bash
# 安裝 http-server
npm install -g http-server

# 啟動伺服器
http-server -p 8000
```

**方法三：使用 PHP 內建伺服器**
```bash
php -S localhost:8000
```

2. 在瀏覽器中訪問 `http://localhost:8000`

> **注意**：Logo 已設定為線上連結，無需手動下載圖片檔案。

### 如何使用轉盤

1. **開啟設定**：點擊右上角的「設定」按鈕
2. **新增選項**：在設定彈窗的輸入框中輸入選項名稱，點擊「新增」按鈕
3. **刪除選項**：點擊選項旁的「刪除」按鈕（至少需保留2個選項）
4. **關閉設定**：點擊彈窗右上角的 × 或點擊背景關閉
5. **開始抽獎**：點擊轉盤中央的「開始抽獎」按鈕
6. **查看結果**：等待轉盤停止，會彈出抽中的選項

### 離線使用

1. 首次訪問網頁時，Service Worker 會自動快取所有必要文件
2. 之後即使沒有網路連線，也可以正常使用
3. 在 Chrome 或 Edge 瀏覽器中，可以點擊網址列的安裝圖示，將應用安裝到桌面

## Logo 和圖標說明

### 公司 Logo
Logo 已設定為線上連結（https://hudence.site/links/Hudence_Logo.png），會自動從網路載入，無需手動下載。

### PWA 圖標
manifest.json 中引用了兩個圖標檔案（icon-192.png 和 icon-512.png）。如果需要完整的 PWA 體驗，請準備這兩個尺寸的圖標：

- `icon-192.png` - 192x192 像素
- `icon-512.png` - 512x512 像素

可以使用任何圖像編輯軟體製作，或使用線上工具生成。如果暫時沒有圖標，應用仍可正常使用，只是安裝到桌面時會顯示預設圖示。

## 技術棧

- HTML5 Canvas - 繪製轉盤
- CSS3 - 動畫和樣式
- Vanilla JavaScript - 應用邏輯
- Service Worker - 離線支援
- LocalStorage - 資料持久化
- PWA - 漸進式網頁應用

## 瀏覽器支援

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 行動裝置瀏覽器

## 授權

MIT License

