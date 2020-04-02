/**
 * KAO Common Header Footer use.
 */
(function(window, kaoHeaderFooterOs) {

  var $win = $(window);
  var resizeTimer; //リサイズタイマー

  /*-----------------------*/
  // ready
  /*-----------------------*/
  $(document).ready(function() {
    initSIdebarNav();
  });

  /*-----------------------*/
  // load
  /*-----------------------*/
  $win.load(function() {
    onresize();
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

    if (resizeTimer) return;

    //タイマー開始
    resizeTimer = setTimeout(function() {
      //ナビゲーションのリセット
      resetNavCls();

      clearTimeout(resizeTimer);
      resizeTimer = null;
    }, 50);
  }


  /**
   * リサイズされた時のリセット
   *
   */
  function resetNavCls() {
    var bp = $.fn.getBreakpoint();
    if(bp === 'lg'){
      var $menu = $('#menu');
      var $wrapper = $('#wrapper');

      $wrapper.removeClass('is-open');
      $menu.removeClass('is-open');
    }
   }


  /**
   * ヘッダー用のサイドバーナビゲーション
   */
  function initSIdebarNav() {
    var $menu = $('#menu');
    var $wrapper = $('#wrapper');
    var $glHeader = $('.g-GlHeader');
    var $glMenu = $('.g-GlMenu');
    var $glMenuNavList = $('.g-GlMenuNavList li');
    var $menuHolder =  $wrapper.find('.js-menuHolder');
    var $btnMenu =  $('.g-GlHeaderButtonLink--os');
    var $btnMenu02 = $glMenu.find('.g-GlMenuButtonLink--os');
    var $gBrHeader = $('.g-BrHeader');
    var openStateCls = 'is-open';
    var closeStateCls = 'is-close';
    var move = '-276px';
    var duration = 200;

    $wrapper.removeClass('is-open');
    $menu.removeClass('is-open');

    $btnMenu02.find('a').on('blur', function(){
      $glMenuNavList.eq(0).find('a').focus();
    });

    //アニメーション終了後にclass処理は取って付ける
    $btnMenu.on('click keypress', function(){
      var status = $menu.hasClass(openStateCls);
      if(status === false){
        $gBrHeader.addClass('is-fixed-cancel');
        $wrapper.removeClass(closeStateCls).css({
          'position': 'fixed',
          'width': '100%',
          'left' : '0'
        }).animate({
          'left' : move
        }, duration, function(){
          $(this).addClass(openStateCls).attr('style', '');
        });

        $menu.removeClass(closeStateCls).css({
          'width' : move
        }).animate({
          'width' : '0'
        }, duration, function(){
          $(this).addClass(openStateCls).attr('style', '');
        });
      }else{
        $gBrHeader.removeClass('is-fixed-cancel');
        $wrapper.removeClass(openStateCls).css({
          'position': 'fixed',
          'width': '100%',
          'left' : move
        }).animate({
          //'position': 'fixed',
          'left' : '0'
        }, duration, function(){
          $(this).addClass(closeStateCls).attr('style', '');
        });

        $menu.removeClass(openStateCls).css({
          'width' : '0'
        }).animate({
          'width' : move
        }, duration, function(){
          $(this).addClass(closeStateCls).attr('style', '');
        });
      }
    });

    $btnMenu02.on('click keypress', function(){
      var status = $menu.css({'position' : 'static'}).hasClass(openStateCls);
      if(status === false){
        $gBrHeader.addClass('is-fixed-cancel');
        $wrapper.removeClass(closeStateCls).css({
          'position': 'fixed',
          'width': '100%',
          'left' : '0'
        }).animate({
          'left' : move
        }, duration, function(){
          $(this).addClass(openStateCls).attr('style', '');
        });

        $menu.removeClass(closeStateCls).css({
          'width' : move
        }).animate({
          'width' : '0'
        }, duration, function(){
          $(this).addClass(openStateCls).attr('style', '');
        });
      }else{
        $gBrHeader.removeClass('is-fixed-cancel');
        $wrapper.removeClass(openStateCls).css({
          'position': 'fixed',
          'width': '100%',
          'left' : move
        }).animate({
          //'position': 'fixed',
          'left' : '0'
        }, duration, function(){
          $(this).addClass(closeStateCls).attr('style', '');
        });

        $menu.removeClass(openStateCls).css({
          'width' : '0'
        }).animate({
          'width' : move
        }, duration, function(){
          $(this).addClass(closeStateCls).attr('style', '');
        });
      }
    });

  }

})(window, window.kaoHeaderFooterOs || (window.kaoHeaderFooterOs = {}));