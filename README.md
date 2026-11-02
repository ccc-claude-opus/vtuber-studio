# 虛擬主播台（Virtual Streamer Studio）

純前端專案，不需要建置或安裝。用 Edge / Chrome 直接開啟 `index.html` 即可。

## 目錄結構

```
vtuber-studio/
├── index.html               頁面骨架：舞台 SVG（主播角色）、投影片容器、控制面板
├── css/
│   └── style.css            全部樣式（含深淺色主題、投影片版型、三種投影片模式）
├── js/                      以 classic script 依序載入（可直接用 file:// 開啟）
│   ├── mathjax-config.js    MathJax 設定（$...$ 與 $$...$$）
│   ├── core.js              共用工具 $()
│   ├── sample.js            預設講稿
│   ├── parser.js            講稿解析：分句、標記、自動情緒
│   ├── emotions.js          情緒參數表（表情、語速、音調）
│   ├── speech.js            語音合成（Web Speech API）與口語過場
│   ├── player.js            播放控制：播放、暫停、跳句、停頓節奏
│   ├── slides.js            投影片顯示、TeX 排版、三種模式、投影片範例
│   ├── ui.js                面板控制項、快捷鍵
│   ├── avatars.js           主播外觀產生器：動漫、Q版、擬真、吉祥物、美式卡通
│   ├── characters.js        10 位主播的預設與套用
│   ├── init.js              初始化與網址參數
│   └── animation.js         動畫迴圈：眨眼、呼吸、口型、視線、肢體
├── build.py                 產生單檔版：python3 build.py
└── dist/
    └── vtuber-standalone.html   單檔版（內含全部 CSS 與 JS，方便分享）
```

載入順序很重要：`index.html` 底部的 script 標籤順序不要調換。

## 講稿語法

- 一般文字：主播會唸出來，依標點自動分句。
- 標記：`[開心]` `[驚訝]` `[疑惑]` `[難過]` `[認真]` `[慢]` `[快]` `[強調]` `[揮手]` `[停頓1.5]`
- 投影片：`## 標題` 開新的一頁；`- 要點` 顯示在投影片上（不唸）。
- 數學式：`$...$` 行內、單獨一行 `$$...$$` 為獨立公式（TeX，不唸，也不進字幕）。

## 網址參數

| 參數 | 說明 |
|---|---|
| `?clean=1` | 隱藏面板、背景透明（OBS 用） |
| `?who=0..9` | 指定主播（見下表） |
| `?smode=1..3` | 投影片模式：1 大主播、2 右下角、3 不要主播 |

可組合，例如 `index.html?clean=1&who=2&smode=1`。

## 主播

| who | 主播 | 風格 |
|---|---|---|
| 0 | 小夜：紫色長髮 | 動漫 |
| 1 | 阿翔：眼鏡、西裝 | 動漫 |
| 2 | 阿森：耳機、帽T | 動漫 |
| 3 | 小橘：貓耳、雙馬尾 | Q版 |
| 4 | 雪音：銀髮、丸子頭 | Q版 |
| 5 | 團子：小熊吉祥物 | Q版 |
| 6 | 艾莉：新聞主播 | 擬真 |
| 7 | 陳先生：西裝男主播 | 擬真 |
| 8 | 林博士：白袍教授 | 擬真 |
| 9 | Max | 美式卡通 |

外觀都是程式組出來的 SVG（`js/avatars.js`）。要新增主播，在 `js/characters.js` 的 `CH` 加一筆：`geo` 選臉型比例（`anime` `chibi` `real` `toon` `mascot`），`eye`／`brow` 選眼睛和眉毛畫法，`hs` 列出髮型部件，`acc` 列出配件。

## 快捷鍵

`H` 隱藏／顯示面板，空白鍵播放／暫停。

## 常見修改

- 新增主播：在 `js/characters.js` 的 `CH` 陣列加一筆（髮色、服裝、瞳色、膚色，`style` 為 `L` 長髮 / `S` 短髮 / `T` 雙馬尾，另可開 `cat`、`gl`、`ph`、`tie`）。
- 新增情緒：在 `js/emotions.js` 的 `EM` 加一組參數，並在 `js/parser.js` 的 `EMO` 加對應標記名稱。
- 投影片位置與大小：模式的主播縮放在 `js/slides.js` 的 `SM`，投影片尺寸在 `css/style.css` 的 `#wrap.m1 / .m3 #slide`。
- 換成更好的語音：改 `js/speech.js` 的 `say()`，保留回傳 Promise 與 `speaking`、`pulse` 變數，口型動畫就會繼續運作。

## 注意

- 數學式使用 MathJax（由 jsDelivr 載入），第一次需要連網；離線時只顯示原始 TeX 文字。
- 瀏覽器內建語音的品質取決於裝置，Edge 的 Online／Natural 語音最自然。
