/**
 * WebFont 読み込み
 */
window.WebFontConfig = {
  google: {
    families: ['EB+Garamond::latin']
  }
};
(function() {
  'use strict';
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();


/**
 * Sofina IP use.
 */
(function(global, common) {

  var window = global;
  var $win = $(window);
  var $js_uniformHeight;


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

  $(function() {
    $breakPointSmall = $("#breakPoint-small");
    $breakPointMiddle = $("#breakPoint-middle");
    $breakPointLarge = $("#breakPoint-large");
    $('.js-action__anchor__link a').off('click').on('click', function(e){
      var $this = $(this);
      var $target = $($this.attr('href'));
      var headerSize = 0;
      var scrollMargin = 10;
      if ($breakPointLarge.css('display') == 'block') {
        headerSize = 94;
      } else if ($breakPointMiddle.css('display') == 'block') {
        headerSize = 84;
      } if ($breakPointSmall.css('display') == 'block') {
        headerSize = 63;
      }
      if ($target.length > 0) {
        $('html, body').animate({
          scrollTop: $target.offset().top - headerSize - scrollMargin
        }, 1000);
      }
      e.preventDefault();
    });
  });

})(this, this.ip || (this.ip = {}));
