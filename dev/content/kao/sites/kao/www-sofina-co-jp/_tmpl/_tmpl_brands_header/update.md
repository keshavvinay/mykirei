## 更新履歴

### 2018/10/12
Adobe様からの指摘を受け、  
CSS内で呼び出しているフォントファイル名の後ろのパラメータを削除しました。

#### 修正内容
brand_header.scss内、line 9-13のフォントファイル読み込み部分のパラメータを削除しました。  
ビルド後のbrand_header.cssではline 26-27になります。  
使用しているbrand_header.cssを差し替えるか、カスタマイズして使用している場合は同様の修正を行ってAEMへ反映お願いします。


### 2018/06/20
ヘッダーメニューのリンク先がページ内リンクだった場合に、sm/mdでメニューをタップしてもメニューが閉じない不具合を解消しました。

#### 修正内容
brand-header.jsにヘッダーメニューのリンクをタップ時にメニューを閉じる処理を追加しました。
サンプルのbrand-header.js内、line 84-87の処理を追加しています。
```
// menu click action
$globalNav.find('a').on('click', function(){
  $menuTrigger.click();
});
```
使用しているbrand-header.jsを差し替えるか、カスタマイズして使用している場合は同様の処理を追加してAEMへ反映お願いします。