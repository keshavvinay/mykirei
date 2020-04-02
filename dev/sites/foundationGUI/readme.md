## Design Foundation入力ページ

### モックアップでの実装

- アンカークリック時のスムーススクロール
- 各セクションのアコーディオン
- 各セクションの「デフォルト値に戻す」ボタン
- 「デフォルトのアイコンデザインに戻す」をクリック時、input[type=hidden]でname="iconClear"をtrueでセット
- 数値入力のバリデーションチェック
- 入力値の必須チェック（icon file以外は全て必須想定。ColorはPickerの入力によって削除してもtransparentが入る想定）
- カラー入力のcolor Picker
- Font-sizeセクションのLetter-spacing入力disableコントロール
- icon fileのドラッグアンドドロップ

### 組み込み時に処理をお願いしたい部分

- Colorsセクションのformコンポーネントにはname属性を入れていないので、必要に応じて任意のnameを付与して下さい。
- Colorsセクション以外のormコンポーネントにはname属性を入れており、「UI項目Mapping」の入力タイプが「px」のものはJavaScriptのValidation Checkで使用しているので、nameを変更した場合はJavaScriptの修正も必要です。
- 「デフォルトのアイコンデザインに戻す」をクリックして送信された場合は、component/fonts/内をクリアして下さい。



## フォント一覧ページ

### モックアップでの実装

- フォントメーカー名クリックでのページ切り替え
- json等で別途用意する想定のフォントデータ（メーカー名/フォント名/英語表記フォント名/sans-serif or serif）から一覧部分を生成
- コピーボタンでフォント名をクリップボードへコピー
