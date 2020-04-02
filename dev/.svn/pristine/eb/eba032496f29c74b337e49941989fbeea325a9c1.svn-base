/**
 * KAO Common Header Footer use.
 */
(function(window, kaoHeaderFooter) {

  var $win = $(window);
  var $js_uniformHeight;
  var $js_fv_carousel;
  var $buttonsPacks;
  var resizeTimer; //リサイズタイマー

  // オーサリング画面かどうかの値をセット
  kaoHeaderFooter.isAuthorring = false;

  /*-----------------------*/
  // ログ無効
  /*-----------------------*/
  if(document.URL.indexOf('localhost') === -1){

  }

  /*-----------------------*/
  // ready
  /*-----------------------*/
  $(document).ready(function() {
    $js_uniformHeight = $('.js-uniformHeight:not([class*="dontuniform"])');
    initSIdebarNav();
    initFooterAccordion();
    initPagetopControl();
  });

  /*-----------------------*/
  // load
  /*-----------------------*/
  $win.load(function() {

    onresize();
    /*-----------------------*/
    // chrome・IE対策
    /*-----------------------*/
    setTimeout(onresize, 100);
    setTimeout(onresize, 200);
    setTimeout(onresize, 350);
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
   * （仮）リサイズされた時のリセット
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
   * （仮）ヘッダー用のサイドバーナビゲーション
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
   * （仮）フッター用のアコーディオン
   */
  function initFooterAccordion() {
    var $acrdUnit = $('.js-footer');
    var iconCls = 'cmn-icon';
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


  /**
   * （仮）高さを揃える
   * 全部同じ大きさにするか、列別に揃えるか
   */
  function uniformHeight() {

    var grpid = 0;
    // var itemid = 0;
    //console.log("uniformHeight");
    if($js_uniformHeight == null) return;
    $js_uniformHeight.each(function(index, el) {

      var $holder = $(el);
      var targetClass = $holder.attr('data-uniform-target');
      if (!targetClass) return true;

      var $targets = $holder.find('.' + targetClass);

      //同じ列の分だけピックアップして高さを揃える
      var rows = [];
      var colsTiles = [];
      var offsetY = 0;
      $targets.each(function(index, el) {
        var $tgt = $(el);

        var y = $tgt.offset().top;
        if (offsetY === 0) offsetY = y;

        if (offsetY === y) {
          colsTiles.push($tgt);
        } else {
          // if(colsTiles.length > 1) rows.push(colsTiles);
          rows.push(colsTiles);
          colsTiles = [$tgt];
          offsetY = y;
          grpid++;
        }

      });

      // if(colsTiles.length > 1) rows.push(colsTiles);
      rows.push(colsTiles);

      for (var i = 0; i < rows.length; i++) {
        uniformHeightExe(rows[i]);
      }
    });
  }

  /**
   * 要素の高さを一番heightの高い要素に合わせる
   * @param $array
   */
  function uniformHeightExe(elmArray) {
    var maxHeight = 0;
    var $target;

    for (var i = 0; i < elmArray.length; i++) {
      $target = $(elmArray[i]);

      $target.height('auto');
      var height = +$target.height();
      if (maxHeight < height) maxHeight = height;
    }

    if (elmArray.length < 2) return;

    for (var j = 0; j < elmArray.length; j++) {
      $target = $(elmArray[j]);
      // var grpid = $target.data('grpid');
      // var itemid = $target.data('itemid');
      $target.height(maxHeight);

      // $target.css({border:'solid 1px #FF3344'});

      // var $debug;
      // if($target.find('.debug').length === 0){
      //   $debug = $('<p class="debug"/>').appendTo($target);
      // } else {
      //   $debug = $target.find('.debug');
      // }
      // $debug.html(+maxHeight+'（'+grpid+'）itemid:'+itemid);
    }
  }


  /**
   * （仮）ページトップボタンの制御
   */

  function initPagetopControl() {
    var SCROLL_SPEED = 500;
    var $window = $(window);
    var winHeight = $(document).height();
    var pageTopCls = '#area-PageTop';
    var $gPageTop = $(pageTopCls);
    var href =null;
    var target = null;
    var position = null;
    var $html = $('html, body');
    //alert(winHeight);
    $gPageTop.hide();
    
    $window.on('resize', function(){
      winHeight = $(document).height();
    });
    
    $(document).on('scroll', function(){
      var scrollValue = $(this).scrollTop();
      //Page Top
      if(scrollValue > (winHeight / 4)){
        $gPageTop.stop().fadeIn();
      }else if(scrollValue < (winHeight / 4)){
        $gPageTop.stop().fadeOut();
      }
    });

    $('#area-PageTop a').on('click',  function(){
      href= $(this).attr("href");
      target = $(href == "#" || href == "" ? 'html' : href);
      position = target.offset().top;
      $html.stop().animate({scrollTop : position}, SCROLL_SPEED);
      return false;
    });
  }


  /**
   * true/falseを文字列からBooleanに変換
   *
   * @param str "true" "false"
   * @return true false
   */
  function changeBoolean(str) {
    if(str === "true")  return true;
    else                return false;
  }

})(window, window.kaoHeaderFooter || (window.kaoHeaderFooter = {}));