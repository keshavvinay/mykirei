/**
 * KAO Common Header Footer use.
 */
(function(window, kaoHeaderFooter) {

  var $win = $(window);
  var resizeTimer; //リサイズタイマー


  /*-----------------------*/
  // ready
  /*-----------------------*/
  $(document).ready(function() {
    //$js_uniformHeight = $('.js-uniformHeight:not([class*="dontuniform"])');
    initSIdebarNav();
    initFooterAccordion();
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
      //フッターアコーディオン
      initFooterAccordion();

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
    var $btnMenu =  $('.g-GlHeaderButtonLink');
    var $btnMenu02 = $glMenu.find('.g-GlMenuButtonLink');
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


  /**
   * フッター用のアコーディオン
   */
  function initFooterAccordion() {
    var $acrdUnit = $('.js-footer');
    var iconCls = 'kao-icon';
    var openStateCls = 'is-open';
    var closeStateCls = 'is-close';
    var iconOpenStateCls = iconCls+'--up';
    var iconCloseStateCls = iconCls+'--down';
    var slideDuration = 400;

    $acrdUnit.each(function(index, el){
      var $holder = $(el);
      var acrdLabelCls = $holder.attr('data-accordion-label');
      var acrdTgtCls = $holder.attr('data-accordion-panel');
      var $footerLinkTitle =  $holder.find( '.g-footerLinkTitle' );
      if (!acrdLabelCls||!acrdTgtCls) return true;

      var $acrdLabel = $holder.find('.' + acrdLabelCls);
      var $acrdLabelIcon = $acrdLabel.find('.' + iconCls);
      var $acrdPanel = $holder.find('.' + acrdTgtCls);

      // 初期表示ステータス
      if ($acrdPanel.css('display') === 'none') {
        $acrdPanel.removeClass(function(index,className){
          return (className.match(/\bis-(open|close)\S+/g) || []).join(' ')
        });
        $acrdPanel.addClass(closeStateCls);
        $acrdLabelIcon.addClass(iconCloseStateCls);
      } else {
        $acrdPanel.removeClass(function(index,className){
          return (className.match(/\bis-\S+/g) || []).join(' ')
        });
        $acrdPanel.addClass(openStateCls);
        $acrdLabelIcon.addClass(iconOpenStateCls);
      }

      var bp = $.fn.getBreakpoint();

      if(bp === 'lg') {
        $acrdLabel.off();
        $footerLinkTitle.removeAttr('tabindex');
        return;
      }else{
        var isTabIndex = $footerLinkTitle.attr('tabindex');
        if(!isTabIndex <= 0) {
          $footerLinkTitle.attr('tabindex', '0');
        }
      }


      // 開閉
      $acrdLabel.off();
      $acrdLabel.on('click keypress', function(){
        if ($acrdPanel.is(':animated')) return;
        $acrdPanel.slideToggle(slideDuration, function(){
          if ($acrdPanel.hasClass(openStateCls)) {
            $acrdLabel.removeClass(openStateCls).addClass(closeStateCls);
            $acrdPanel.removeClass(openStateCls).addClass(closeStateCls);
            $acrdLabelIcon.removeClass(iconOpenStateCls).addClass(iconCloseStateCls);
          } else if ($acrdPanel.hasClass(closeStateCls)) {
            $acrdLabel.removeClass(closeStateCls).addClass(openStateCls);
            $acrdPanel.removeClass(closeStateCls).addClass(openStateCls);
            $acrdLabelIcon.removeClass(iconCloseStateCls).addClass(iconOpenStateCls);
          }
          $acrdPanel.css('display','');
        });
      });
    });
  }


})(window, window.kaoHeaderFooter || (window.kaoHeaderFooter = {}));