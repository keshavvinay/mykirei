'use strict';
/**
 * WebFont 読み込み
 */
window.WebFontConfig = {
  google: {
    families: ['EB+Garamond::latin']
  }
};
(function() {

  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();


/**
 * Sofina BPS Common use.
 */
(function(global, bps) {

  var window = global;
  var $win = $(window);
  var resizeTimer; //リサイズタイマー
  var $mainvisual;
  var $txtholder;
  var $whitecover;
  var easeing;

  /*-----------------------*/
  // ログ無効
  /*-----------------------*/
  if(document.URL.indexOf('localhost') === -1){
    window.console = {};
    window.console.log = function(i){return;};
    window.console.time = function(i){return;};
    window.console.timeEnd = function(i){return;};
  }


  /*-----------------------*/
  // ready
  /*-----------------------*/
  $(document).ready(function() {
    console.log('document ready');

    easeing = 'easeInOutCubic';
    /*-----------------------*/
    // トランジションアニメフォールバック
    /*-----------------------*/
    if (!$.support.transition){
      easeing = 'swing';
      $.fn.transition = $.fn.animate;
    }

    onresize();

    //メインビジュアルの参照
    $mainvisual = $('.sofina-section_mainvisual_visualleft');
    if($mainvisual.length === 0) $mainvisual = null;
    $txtholder = $('.sofina-section_mainvisual_visualleft__txtholder');

    if($mainvisual){
      //ホワイトカバー
      $whitecover = $('<div class="sofina-section_mainvisual_whitecover"/>');
      $mainvisual.append($whitecover);

      $txtholder.show();
    }

  });

  /*-----------------------*/
  // load
  /*-----------------------*/
  $win.load(function() {
    console.log('ウィンドウロード');
    onresize();
    /*-----------------------*/
    // chrome対策で二回目
    /*-----------------------*/
    setTimeout(onresize, 100);

    /*-----------------------*/
    // カバー消失
    /*-----------------------*/
    if($whitecover){
      $whitecover.transition({
        opacity: 0,
        delay: 100
      }, 1000, easeing, function() {
        $whitecover.remove();
        $whitecover = null;
      });
    }


  });

  /*-----------------------*/
  // リサイズイベントに登録
  /*-----------------------*/
  $win.on('resize', function() {
    onresize();
  });




  /**
   * リサイズ時にコールされる。
   * タイマーが作動中の場合は処理が無視される
   */
  function onresize() {


    resizeMainViusual();


    if (resizeTimer) return;

    // resizeMainViusual();

    //タイマー開始
    resizeTimer = setTimeout(function() {

      clearTimeout(resizeTimer);
      resizeTimer = null;
    }, 50);

  }

  /*-----------------------*/
  // リサイズメインビジュアル
  /*-----------------------*/
  function resizeMainViusual() {
    if(!$mainvisual || !$txtholder) return;

    var winW = $win.width();

    /*-----------------------*/
    // ビジュアル高さをセット
    /*-----------------------*/
    // var h = winW * 0.2;
    var h = 320;
    var posX;

    var visualBlockW = winW;
    if(visualBlockW > 1360){
      visualBlockW = 1360;
    }
    var sidew = visualBlockW/2;

    if(h > 320) h = 320;
    var paddingTop = h;
    // if(winW < 640){
    if(winW < 640){
      //スマホモード
      h = 'auto';
      paddingTop = winW * 0.5;
      posX = 'top left';

    } else if(winW < 1024){
      //タブレット

      paddingTop = '0px';
      posX = 'top left';
      h = winW * (716/2/1024);

    } else {

      paddingTop = '0px';
      var winWHalf = winW/2;
      var visualWHalf = h * (680/320);
      posX = winWHalf - visualWHalf;

    }



    $mainvisual.css({
      height: h,
      paddingTop: paddingTop,
      'background-position' : posX
    });

    /*-----------------------*/
    // txtholderを中心にセット
    /*-----------------------*/
    // var marginTop = (h - txtholderH)/2;
    // if(winW > 1024){
    //   $txtholder.css({
    //     marginTop: marginTop
    //   });
    // } else {
    //   $txtholder.css({
    //     marginTop: 'auto'
    //   });
    // }

  }


  /**
   * CSSの値を数値に変換
   * @param value CSS値
   * @param unit 単位
   */
  function changeInt(value, unit) {
    return parseInt(value.replace(unit, ''));
  }


  /*----------------------*/
  // iosかどうか
  /*-----------------------*/
  var isiOS = (function() {
    var flg = false,
      p = navigator.platform;

    if (p === 'iPad' || p === 'iPhone' || p === 'iPod') {
      flg = navigator.appVersion.split(' ')[0] || false;
    }
    return flg;
  })();


  /*-----------------------*/
  // 印刷ボタン
  /*-----------------------*/
  $(document).onSpClick('.btn-print a', function() {

    window.print();

  }, false);

  /*-----------------------*/
  // 印刷ウィンドウボタン
  /*-----------------------*/
  $(document).onSpClick('.btn-open-printwindow a', function(self) {

    openPrintWindow($(self));

  }, false);

  /*-----------------------*/
  // マップボタン
  /*-----------------------*/
  $(document).onSpClick('.btn-map a', function() {

    openMap();

  }, false);

  /*-----------------------*/
  // ウィンドウ閉じる
  /*-----------------------*/
  $(document).onSpClick('.btn-close-window a', function() {

    window.close();

  }, false);


  /**
   * プリントウィンドウ起動
   */
  function openPrintWindow($a) {

    var href = $a.attr('href');
    var target = $a.attr('target');
    var w = 680;
    //var h = 940;
    var h = 680;

    //window.open(href, target, 'width=' + w + ',height=' + h);
    window.open(href, target, 'width=' + w + ',height=' + h + ',scrollbars=yes');
  }

  /**
   * マップ起動
   */
  function openMap() {

    var url = 'http://maps.apple.com/?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E4%B8%AD%E5%A4%AE%E5%8C%BA%E9%8A%80%E5%BA%A7%E4%B8%89%E4%B8%81%E7%9B%AE4%E7%95%AA12%E5%8F%B7';
    /*
    if (isiOS) {
      url = 'comgooglemaps:q=' + url;
    }
    */

    //window.open(url, '_blank');
    location.href = url;
  }

})(this, this.bps || (this.bps = {}));
