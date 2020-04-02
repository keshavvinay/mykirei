/**
 * SOFINAトップ
 */

(function() {
  'use strict';
  /*-----------------------*/
  // ready
  /*-----------------------*/
  $(function() {
    // initSlider();

    /*-----------------------*/
    // スライダを初期化
    /*-----------------------*/
    var $js_topMainvisual = $('.js-topMainvisual');
    var isAuthorring;
    
    isAuthorring = $.fn.isAuthorring();

    if(isAuthorring) {
      /* オーサリング画面 */
      $js_topMainvisual.find('.slider').height('auto');
      $js_topMainvisual.find('.imgholder').css({
        height: 'auto',
        position: 'relative',
        left: '0',
        width: '960',
        margin: '0 auto'
      });
      $js_topMainvisual.find('.imgitem').css({
        position: 'relative'
      });
      
    } else {
      
      if ($js_topMainvisual.length > 0) {
        new $.Slider({
          maxW: 960,
          maxH: 390,
          el: $js_topMainvisual.find('.cq-dd-image')
        });
      }
    }

  });

})();
