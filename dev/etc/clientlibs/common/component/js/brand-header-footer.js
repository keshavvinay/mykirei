/**
 * KAO Brand Header Footer use.
 */
(function(window, brandHeaderFooter) {

  var $win = $(window);
  var $js_uniformHeight;
  var $js_fv_carousel;
  var $buttonsPacks;
  var resizeTimer; //リサイズタイマー

  // オーサリング画面かどうかの値をセット
  brandHeaderFooter.isAuthorring = false;

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
    checkBrandNavBlock();
    headerFixed();
    initBrandSpNav();
    initBrandFooterAccordion();
    if (typeof FONTPLUS !== "undefined") {
      reloadWebfont();
    }
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

      //ブランドフッターアコーディオン
      initBrandFooterAccordion();

      clearTimeout(resizeTimer);
      resizeTimer = null;
    }, 50);
  }


  /**
   * （仮）ブランドヘッダーの固定化
   *
   */
  function headerFixed(resize_flag) {
    var $wrapper = $('#wrapper');
    var $gBrHeader = $('.g-BrHeader');
    var $gGlHeader = $('.g-GlHeader');
    var gBrPos =  null;
    var gBrPosTop = null;
    var $gBrPlaceholder = $('.g-BrHeaderPlaceholder');
    var headerFixedFlag = null;
    var FIXEDFLAGNAME = 'data-headerfixed';
    var isFixedCls = null;
    var isFixedFlag = false;
    var BrHeaderHeight = $.fn.getBrHeaderFixedHeight();
    var gAreaHeight = $('.g-GlHeader').height();
    var fixedFlagLg = null;
    var fixedFlagMd = null;
    var fixedFlagSm = null;
    var offset = 0;
    var bp = $.fn.getBreakpoint();

    if($gBrHeader.length > 0) {
       gBrPos =  $gBrHeader.offset();
       gBrPosTop = gBrPos.top;

      $(window).on('load resize',  function(){
          bp = $.fn.getBreakpoint();
        gAreaHeight = $gGlHeader.height();
        BrHeaderHeight = $.fn.getBrHeaderFixedHeight();

        fixedFlagLg  = changeBoolean($gBrHeader.attr('data-fixed-lg'));
        fixedFlagMd  = changeBoolean($gBrHeader.attr('data-fixed-md'));
        fixedFlagSm  = changeBoolean($gBrHeader.attr('data-fixed-sm'));
        isFixedFlag = false;
         if(bp === 'lg'){
            isFixedCls = 'is-lg-fixed';
            offset = 12;
            if(fixedFlagLg === true) isFixedFlag = true;
          }else if(bp === 'md'){
            isFixedCls = 'is-md-fixed';
            offset = 15;
            if(fixedFlagMd === true) isFixedFlag = true;
          }else if(bp === 'sm'){
            isFixedCls = 'is-sm-fixed';
            offset = 15;
            if(fixedFlagSm === true) isFixedFlag = true;
          }
          headerFixedFlag = $gBrHeader.attr(FIXEDFLAGNAME);

          //リセット処理
          $gBrHeader.removeClass('is-lg-fixed').removeClass('is-md-fixed').removeClass('is-sm-fixed');

          if(isFixedFlag === true){
            $gBrPlaceholder.css({'height' : (BrHeaderHeight + 2) + 'px'});
            var resizeScrollPos = $(document).scrollTop();
            if(resizeScrollPos >= gAreaHeight + offset){
              $gBrHeader.removeClass('is-lg-fixed').removeClass('is-md-fixed').removeClass('is-sm-fixed').addClass(isFixedCls);
              $gBrHeader.css({'top' : 0});
           }

            $(document).on('scroll', function(_i, _dom){
              var scrollPos = $(this).scrollTop();
              if(scrollPos >= gAreaHeight + offset){
                $gBrHeader.removeClass('is-lg-fixed').removeClass('is-md-fixed').removeClass('is-sm-fixed').addClass(isFixedCls);
                $gBrHeader.css({'top' : 0});
              }else{
                $gBrHeader.removeClass(isFixedCls);
                $gBrHeader.css({'top' : '-' + BrHeaderHeight + 'px'});
              }
            });
          }

      });

    }
  }



  /**
   * （仮）ブランドヘッダーのメニューから表示
   *
   */
   function initBrandSpNav() {
     var $gSpBrHeaderNav = $('.g-BrHeaderNav__buttonBlock');
     var $gBrHeaderNavListBlock = $('.g-BrHeaderNav__listBlock');
     var $gBrHeaderNavButtonIcon = $('.g-BrHeaderNavButton__icon');
     var iconUpCls = 'cmn-icon--up';
     var iconDownCls = 'cmn-icon--down';
     var closeStateCls = 'is-close';
     var openStateCls = 'is-open';
     var isScroll = 'is-scroll';
     var $gSpBrHeaderNavA = $gSpBrHeaderNav.find('a');

     $gBrHeaderNavListBlock.removeClass(openStateCls).addClass(closeStateCls);
     $gBrHeaderNavButtonIcon.removeClass(iconUpCls).addClass(iconDownCls);
     $gSpBrHeaderNavA.attr('aria-selected', 'false').attr('aria-expanded', 'false').attr('aria-hidden', 'true');

     $gSpBrHeaderNav.on('click keypress', function(){
        var status = $gBrHeaderNavListBlock.hasClass(openStateCls);

       if(status === false) {
          $gBrHeaderNavListBlock.fadeIn();
          $gBrHeaderNavListBlock.removeClass(closeStateCls).addClass(openStateCls);
          $gBrHeaderNavButtonIcon.removeClass(iconDownCls).addClass(iconUpCls);
          $gSpBrHeaderNavA.attr('aria-selected', 'true').attr('aria-expanded', 'true').attr('aria-hidden', 'false');

          // 高さ揃え実行
          uniformHeight();

          var winHeight = $("body").height();
          var brandHeaderHeight = $.fn.getBrHeaderFixedHeight();
          var listBlockHeight = $gBrHeaderNavListBlock.height();
          var listBlockPos = $gBrHeaderNavListBlock.position();
          var results = winHeight - listBlockPos.top;
          //alert($("body").height());
          if(winHeight <= (brandHeaderHeight + listBlockHeight)){
            $gBrHeaderNavListBlock.addClass(isScroll).css({
              'height' : results + 'px'
            });
          }else{
            $gBrHeaderNavListBlock.removeClass(isScroll).css({
              'height' : 'auto'
            });
          }
       }else{
          $gBrHeaderNavListBlock.hide();
          $gBrHeaderNavListBlock.removeClass(openStateCls).addClass(closeStateCls);
          $gBrHeaderNavButtonIcon.addClass(iconDownCls).removeClass(iconUpCls);
          $gSpBrHeaderNavA.attr('aria-selected', 'false').attr('aria-expanded', 'false').attr('aria-hidden', 'true');
       }
       return false;
     });

   }

  /**
   * （仮）リサイズされた時のリセット
   *
   */
   function resetNavCls() {
      var bp = $.fn.getBreakpoint();
      if(bp === 'lg'){
        var $gBrHeaderNavListBlock = $('.g-BrHeaderNav__listBlock');
        var $gBrHeaderNavButtonIcon = $('.g-BrHeaderNavButton__icon');
        $gBrHeaderNavListBlock.removeClass('is-close').removeClass('is-open').attr('style', '');
        $gBrHeaderNavButtonIcon.removeClass('cmn-icon--up').addClass('cmn-icon--down');
      }
   }

  /**
   * （仮）ブランドフッター用のアコーディオン
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

      //if(bp === 'sm') {
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
   * BreakPoint切り換え時のウェブフォントの再読み込み
   *
   */
  function reloadWebfont() {
    var bp = $.fn.getBreakpoint();
    var newBp = null;
    $win.on('load resize',  function(){
        newBp = $.fn.getBreakpoint();
        if(bp !== newBp){
            FONTPLUS.reload();
            bp = newBp;
        }
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


    /**
   * リンク先なしの場合メニューボタン非表示
   *
   */
  function checkBrandNavBlock() {
    var BrNavBlock = (".l-BrHeaderCommon__navBlock:not(:has(ul > li))");
    if($(BrNavBlock)[0]){
      $(BrNavBlock).find(".l-BrHeaderNav__buttonBlock").hide();
    }
  }

})(window, window.brandHeaderFooter || (window.brandHeaderFooter = {}));