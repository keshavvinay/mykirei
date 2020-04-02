## 概要
ソフィーナの子ブランドごとに必要なブランドヘッダーのファイル一式になります。  
html内のヘッダー部分をBrand Header Footer Master PageのBrand Headerコンポーネントのダイアログ内にペーストし、  
img/css/js/fontsの各ファイルをAssetsにアップロードして使用します。

### Assetsの場所
beauteとgraceでは以下の場所に置きました。
sites/kao/www-sofina-co-jp/[ブランド名]/brand_header/
img/css/js/fontsの各ディレクトリも上記ディレクトリ内に作り、各ファイルをアップしました。
ディレクトリ/ファイルそれぞれPubslishしています。

### 更新方法
scssファイルを同梱していますので、Compassを使用している場合はこちらをcssのソースとしてください。
Compassを使用しない場合はcssを直接編集して下さい。  
img/css/jsを更新した場合は、Assetsへの再アップとPublishが必要です。  
htmlを更新したい場合は後述する「他子ブランドの展開」時と同様にBrand Header Footer Master Pageのbrand Headerコンポーネントのダイアログ内のHTML入力部分に、htmlソース中の「area-brands-BlHeader」コメントで囲まれた部分をペーストして下さい。  
htmlはトップページ用とその他のページ用があります。

### 他子ブランドの展開
他の子ブランドを展開する場合は、Assetsに必要ファイルをアップした後、子ブランドトップページのページプロパティを変更してAssetsにアップしたcssとjsを読み込む設定をします。  
STYLE&SCRIPTタグの「inherited from〜」のチェックを外し、css/jsファイルを指定して下さい。
htmlはメニュー、ロゴなどの差し替え後、Brand Header Footer Master PageのBrand Headerコンポーネントのダイアログ内のHTML入力部分に、htmlソース中の「area-brands-BlHeader」コメントで囲まれた部分をペーストして下さい。  
htmlはトップページ用とその他のページ用があります。

### アンカーリンク用調整class
ブランドヘッダーはページスクロール時にfixedされるので、ページ内へアンカーリンクをはる場合の調整用styleを用意してあります。  
AEM上で飛び先の要素のコンポーネントダイアログのSTYLEタブのAdd CSS Classに、「opt-fixed-adjust」を指定して下さい。  
margin-top: -[fixedヘッダの高さ]px;  
padding-top: [fixedヘッダの高さ]px;  
のstyleが適用されます。  
既にmargin-top/padding-topが指定されている要素にはつけられませんので注意してください。
