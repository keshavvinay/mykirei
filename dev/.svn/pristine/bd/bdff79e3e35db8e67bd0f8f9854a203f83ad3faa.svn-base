/**
 * KAO Brand Header Footer use.
 */
(function(window, brandHeaderFooter) {

  var $win = $(window);
  var $js_uniformHeight;
  var resizeTimer; //リサイズタイマー

  /*-----------------------*/
  // ready
  /*-----------------------*/
  $(document).ready(function() {
    $js_uniformHeight = $('.js-uniformHeight:not([class*="dontuniform"])');

    initBrandFooterAccordion();
  });

  /*-----------------------*/
  // load
  /*-----------------------*/
  $win.load(function() {
    initPagetopControl();
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
      //ブランドフッターアコーディオン
      initBrandFooterAccordion();

      clearTimeout(resizeTimer);
      resizeTimer = null;
    }, 50);
  }


  /**
   * ブランドフッター用のアコーディオン
   */
  function initBrandFooterAccordion() {
    var $acrdUnit = $('.js-BrFooter');
    var iconCls = 'cmn-icon';
    var openStateCls = 'is-open';
    var closeStateCls = 'is-close';
    var iconOpenStateCls = iconCls+'--up';
    var iconCloseStateCls = iconCls+'--down';
    var slideDuration = 400;
    var bp = $.fn.getBreakpoint();

    // 高さ揃え実行
    uniformHeight();

    $acrdUnit.each(function(index, el){
      var $holder = $(el);
      var acrdLabelCls = $holder.attr('data-accordion-label');
      var acrdTgtCls = $holder.attr('data-accordion-panel');
      var $brandLinkTitle =  $holder.find( '.g-BrFooterSitemapUnit__title' );
      if (!acrdLabelCls||!acrdTgtCls) return true;

      var $acrdLabel = $holder.find('.' + acrdLabelCls);
      var $acrdLabelIcon = $acrdLabel.find('.' + iconCls);
      var $acrdPanel = $holder.find('.' + acrdTgtCls);
      if($acrdPanel.length < 1) return true;

      if(!$acrdPanel.hasClass(openStateCls) && bp === 'sm') {
        $acrdPanel.addClass(closeStateCls);
        $acrdLabelIcon.addClass(iconCloseStateCls);
      }

      // 初期表示ステータス
      if ($acrdPanel.css('display') === 'none') {
        $acrdPanel.removeClass(function(index,className){
          return (className.match(/\bis-(open|close)\S+/g) || []).join(' ')
        });
        if(bp === 'sm'){
          $acrdPanel.addClass(closeStateCls);
          $acrdLabel.attr('aria-selected', 'false').attr('aria-expanded', 'false').attr('aria-hidden', 'true');
          $acrdLabelIcon.addClass(iconCloseStateCls);
        }
      } else {
        $acrdPanel.removeClass(function(index,className){
          return (className.match(/\bis-\S+/g) || []).join(' ')
        });
        if(bp === 'sm'){
          $acrdPanel.addClass(openStateCls);
          $acrdLabel.attr('aria-selected', 'true').attr('aria-expanded', 'true').attr('aria-hidden', 'false');
          $acrdLabelIcon.addClass(iconOpenStateCls);
        }
      }

      var $brandLinkATag = $brandLinkTitle.find('a');

      if(bp === 'lg' || bp === 'md') {
        $acrdLabel.off();
        $acrdPanel.removeClass(openStateCls).removeClass(closeStateCls);
        $acrdLabelIcon.removeClass(iconOpenStateCls).removeClass(iconCloseStateCls);
        $brandLinkATag.removeAttr('tabindex').off();
        $brandLinkTitle.removeAttr('tabindex');
        return;
      }else{
        $brandLinkTitle.attr('tabindex', '0');
        $brandLinkATag = $brandLinkTitle.find('a');
        $brandLinkATag.attr('tabindex', '-1').on('click keypress', function(){
          _acrdUnit();
          return false;
        });
      }

      // 開閉
      $acrdLabel.off();
      $acrdLabel.on('click keypress', function(){
        _acrdUnit();
      });

      function _acrdUnit() {
        if ($acrdPanel.is(':animated')) return;
        $acrdPanel.slideToggle(slideDuration, function(){
          if ($acrdPanel.hasClass(openStateCls)) {
            $acrdLabel.removeClass(openStateCls).addClass(closeStateCls);
            $acrdPanel.removeClass(openStateCls).addClass(closeStateCls);
            $acrdLabel.attr('aria-selected', 'false').attr('aria-expanded', 'false').attr('aria-hidden', 'true');
            $acrdLabelIcon.removeClass(iconOpenStateCls).addClass(iconCloseStateCls);
          } else if ($acrdPanel.hasClass(closeStateCls)) {
            $acrdLabel.removeClass(closeStateCls).addClass(openStateCls);
            $acrdPanel.removeClass(closeStateCls).addClass(openStateCls);
            $acrdLabel.attr('aria-selected', 'true').attr('aria-expanded', 'true').attr('aria-hidden', 'false');
            $acrdLabelIcon.removeClass(iconCloseStateCls).addClass(iconOpenStateCls);
          }
          $acrdPanel.css('display','');
        });
      }

    });
  }

  /**
   * （仮）高さを揃える
   * 全部同じ大きさにするか、列別に揃えるか
   */
  function uniformHeight() {

    var grpid = 0;
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
          rows.push(colsTiles);
          colsTiles = [$tgt];
          offsetY = y;
          grpid++;
        }

      });

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
      $target.height(maxHeight);

    }
  }



  /**
   * ページトップボタンの制御
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

})(window, window.brandHeaderFooter || (window.brandHeaderFooter = {}));