// User-Agent 言語振り分けdemo

(function(){
  // テスト用転送先url(適宜変えて下さい)
  var jaSiteUrl = '/apps/kao/sites/common/components/content/test/languageTest_ja.html',
      globalSiteUrl = '/apps/kao/sites/common/components/content/test/languageTest_global.html';

  var uaLang;

  if(location.hostname.indexOf('www.kanebo-global.com') >= 0) {
    // 本番用転送先url(適宜変えて下さい)
    jaSiteUrl = '/apps/kao/sites/common/components/content/test/languageTest_ja.html';
    globalSiteUrl = '/apps/kao/sites/common/components/content/test/languageTest_global.html';
  }

  // 初回のみ転送処理
  if(!getValByCookie('uaLang')) {
    uaLang = getLanguage();
    
    setCookie('uaLang', uaLang, 3000);

    // 日本語なら日本語サイト
    if(uaLang == 'ja') {
      location.href = jaSiteUrl;
    }
    // 日本語以外ならグローバルサイト
    else {
      location.href = globalSiteUrl;
    }
  }
  
  
  /* 言語設定取得 */
  function getLanguage() {
    var ua = window.navigator.userAgent.toLowerCase();
    try {
      // chrome
      if( ua.indexOf( 'chrome' ) != -1 ){
        return ( navigator.languages[0] || navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2);
      }
      // それ以外
      else{
        return ( navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2);
      }
    }
    catch( e ) {
      return undefined;
    }
  }

  /* クッキーに保存 */
  function setCookie(c_name,value,expiredays) {
    // pathの指定
    var path = '/';
    // pathをフォルダ毎に指定する場合のIE対策
    var paths = new Array();
    paths = path.split("/");
    if(paths[paths.length-1] != ""){
        paths[paths.length-1] = "";
        path = paths.join("/");
    }
    // 有効期限の日付
    var extime = new Date().getTime();
    var cltime = new Date(extime + (60*60*24*1000*expiredays));
    var exdate = cltime.toUTCString();
    // クッキーに保存する文字列を生成
    var s="";
    s += c_name +"="+ escape(value);// 値はエンコードしておく
    s += "; path="+ path;
    if(expiredays){
        s += "; expires=" +exdate+"; ";
    }else{
        s += "; ";
    }
    // クッキーに保存
    document.cookie=s;
  }

  /* クッキー取得 */
  function getValByCookie(key) {
    var cookies = document.cookie.split(/\s*;\s*/);
    var reg = new RegExp('^' + key + '=(.*)$');
    var val = null;

    for (var i = 0, l = cookies.length; i < l; i++) {
      if (!val && cookies[i].match(reg)) {
        val = cookies[i].match(reg);
        break;
      }
    }
    // XSS対策エスケープ
    return val ? htmlSpecialChars(decodeURIComponent(val[1])) : null;
  }

  // サニタイズ
  function htmlSpecialChars(str) {
    if (!str) return;

    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&apos;');

    return str;
  };

})();