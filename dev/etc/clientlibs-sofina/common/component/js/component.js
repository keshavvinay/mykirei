/**
 * KAO WCM Common use.
 */
(function(window, kaoAPI) {

  var $win = $(window);
  var $js_uniformHeight;
  var $js_fv_carousel;
  var $buttonsPacks;
  var resizeTimer; //リサイズタイマー

  // オーサリング画面かどうかの値をセット
  kaoAPI.isAuthorring = false;

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

    $js_uniformHeight = $('.js-uniformHeight:not([class*="dontuniform"])');
    $js_fv_carousel = $('.js-fullwidthVisualsCarousel');
    $buttonsPacks = $('.g-LinksButtonsP');

    initFullwidthVisualsCarouselP();
    initTelephoneCall();

    onresize();
    initAccordion();

    initLinkButton();
    // setTimeout(jumpToDestElem, 1000);
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

      // 高さ揃え実行
      uniformHeight();

      // Buttons大きさ揃え実行
      uniformButtonsSize();

      // カルーセル高さ
      resizeFullwidthVisualsCarouselP();

      changeImgMovieTextPPosition();

      clearTimeout(resizeTimer);
      resizeTimer = null;
    }, 50);
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
   * LinksButtonsPackのButtonを同じ大きさにする。
   */

   function uniformButtonsSize() {
     if($buttonsPacks == null) return;

     $buttonsPacks.each(function(index, el){
       var buttons = [];

       var $buttons = $(el).find('.is-btn > a');
       if(!$buttons.length) {
         return true;
       }

       // ボタンの横幅を揃える
       $buttons.outerWidth($buttons.parent().width());

      // ボタンの高さを揃える
       $buttons.each(function(index, el) {
         buttons.push($(el));
       });
       uniformHeightExe(buttons);
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
      // var height = +$target.height();
      var height = +$target.outerHeight();
      if (maxHeight < height) maxHeight = height;
    }

    if (elmArray.length < 2) return;

    for (var j = 0; j < elmArray.length; j++) {
      $target = $(elmArray[j]);
      // var grpid = $target.data('grpid');
      // var itemid = $target.data('itemid');
      // $target.height(maxHeight);
      $target.outerHeight(maxHeight);

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



  function initAccordion() {
    var $acrdUnit = $('.js-accordion');
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

      // 開閉
      $acrdLabel.on('click keypress', function(){
        if ($acrdPanel.is(':animated')) return;
        $acrdPanel.slideToggle(slideDuration, function(){
          if ($acrdPanel.hasClass(openStateCls)) {
            $acrdPanel.removeClass(openStateCls).addClass(closeStateCls);
            $acrdLabelIcon.removeClass(iconOpenStateCls).addClass(iconCloseStateCls);
          } else if ($acrdPanel.hasClass(closeStateCls)) {
            $acrdPanel.removeClass(closeStateCls).addClass(openStateCls);
            $acrdLabelIcon.removeClass(iconCloseStateCls).addClass(iconOpenStateCls);
          }
          $acrdPanel.css('display','');
        });
      });
    });
  }


  /**
   * フルビジュアルカルーセル 初期化
   */
  function initFullwidthVisualsCarouselP() {

    if ($js_fv_carousel == null ) return;
    $js_fv_carousel.each(function(index, el) {
      var $this = $(this);
      var $target = $this.find('.g-FullwidthVisualsCarouselP__list');
      var $targetUnit = $target.find('.g-FullwidthVisualsCarouselUnit');
      var autoplay = changeBoolean($this.attr('data-autoplay'));
      var autoplaySpeed = $this.attr('data-autoplaySpeed') * 1000;
      var fade = changeBoolean($this.attr('data-fade'));
      var speed;
      var slickObj;

      if ($target.slick) {

        // Unit初期化
        $targetUnit.each(function(index, el) {
          var $unit = $(this);
          var $unitInfoOver = $unit.find('.g-FullwidthVisualsCarouselUnit__image__info');
          var $unitInfoUnder = $unit.find('.g-FullwidthVisualsCarouselUnit__info');
          var $unitMain = $unit.find('.g-FullwidthVisualsCarouselUnit__info__main');
          var $unitSub = $unit.find('.g-FullwidthVisualsCarouselUnit__info__sub');
          var align = $unit.attr('data-align');
          var verticalAlign = $unit.attr('data-verticalAlign');
          var mainWidth_lg = $unit.attr('data-lg-main-w');
          var mainWidth_md = $unit.attr('data-md-main-w');
          var mainWidth_sm = $unit.attr('data-sm-main-w');
          var subWidth_lg = $unit.attr('data-lg-sub-w');
          var subWidth_md = $unit.attr('data-md-sub-w');

          // 配置
          $unitInfoOver.addClass('is-' + align);
          $unitInfoOver.addClass('is-' + verticalAlign);

          // 幅
          $unitMain.addClass('opt-lg-w' + mainWidth_lg + 'p');
          $unitMain.addClass('opt-md-w' + mainWidth_md + 'p');
          $unitMain.addClass('opt-sm-w' + mainWidth_sm + 'p');
          $unitSub.addClass('opt-lg-w' + subWidth_lg + 'p');
          $unitSub.addClass('opt-md-w' + subWidth_md + 'p');
        });

        if (fade) speed = 1500;
        else      speed = 700;

        //オーサリング画面の場合はカルーセルの初期化を行わない
        if(!$.fn.isAuthorring()) {
          //カスタマイズ
          slickObj = $target.slick({
            arrows: true,
            dots: true,
            infinite: true,
            speed: speed,
            pauseOnHover: false,
            autoplay: autoplay,
            autoplaySpeed: autoplaySpeed,
            fade: fade,
            prevArrow: '<button type="button" data-role="none" class="g-FullwidthVisualsCarouselP__prevArrow" aria-label="Previous" tabindex="0" role="button">Previous</button>',
            nextArrow: '<button type="button" data-role="none" class="g-FullwidthVisualsCarouselP__nextArrow" aria-label="Next" tabindex="0" role="button">Next</button>',
            customPaging: function(slider, i) {
              return '<button type="button" class="g-FullwidthVisualsCarouselP__nav__dot" data-role="none" role="button" aria-required="false" tabindex="0">' + (i + 1) + '</button>';
            },
            dotsClass: 'g-FullwidthVisualsCarouselP__nav',
            //adaptiveHeight: true,
            accessibility: false,
            draggable: false,
            slidesToShow: 1
          });

          //一時停止ボタン追加
          var $nav = $this.find('.g-FullwidthVisualsCarouselP__nav');
          var $toggle = $('<button type="button" class="g-FullwidthVisualsCarouselP__nav__toggle">pause</button>').appendTo($nav);
          if (autoplay) $toggle.addClass('is-pause');
          else          $toggle.addClass('is-play');

          $toggle.on('click', function(event) {
            event.preventDefault();
            if ($toggle.hasClass('is-pause')) {
              $toggle.removeClass('is-pause');
              $toggle.addClass('is-play');
              slickObj.slick('slickPause').slick('slickSetOption', 'pauseOnDotsHover', false);
            } else {
              $toggle.addClass('is-pause');
              $toggle.removeClass('is-play');
              slickObj.slick('slickPlay').slick('slickSetOption', 'pauseOnDotsHover', false);
            }
          });
        }
      }
    });

    resizeFullwidthVisualsCarouselP();
  }


  /**
   * フルビジュアルカルーセル・リサイズで動的表示変更
   */
  function resizeFullwidthVisualsCarouselP() {

    if ($js_fv_carousel == null ) return;
    $js_fv_carousel.each(function(index, el) {

      var $this = $(this);
      var heightLg = $this.attr('data-height-lg');
      var heightMd = $this.attr('data-height-md');
      var heightSm = $this.attr('data-height-sm');
      var $targetUnit = $this.find('.g-FullwidthVisualsCarouselUnit');
      var $image = $this.find('.g-FullwidthVisualsCarouselUnit__image');
      var $prevArrow = $this.find('.g-FullwidthVisualsCarouselP__prevArrow');
      var $nextArrow = $this.find('.g-FullwidthVisualsCarouselP__nextArrow');

      //ブレイクポイント別の表示切り替え
      var bp = $.fn.getBreakpoint();
      if (bp === "lg") {
        $image.css('height', heightLg + 'px');
        $prevArrow.css('top', heightLg / 2 + 'px');
        $nextArrow.css('top', heightLg / 2 + 'px');
      } else if (bp === "md") {
        $image.css('height', heightMd + 'px');
        $prevArrow.css('top', heightMd / 2 + 'px');
        $nextArrow.css('top', heightMd / 2 + 'px');
      } else if (bp === "sm") {
        $image.css('height', heightSm + 'px');
        $prevArrow.css('top', 'auto');
        $nextArrow.css('top', 'auto');
      }

      $targetUnit.each(function(index, el) {
        var $unit = $(this);
        var $unitInfoOver = $unit.find('.g-FullwidthVisualsCarouselUnit__image__info');
        var $unitInfoUnder = $unit.find('.g-FullwidthVisualsCarouselUnit__info');

        var $unitSub;
        var $unitBtn;

        if (bp === "sm") {
          $unitSub = $unitInfoOver.find('.g-FullwidthVisualsCarouselUnit__info__sub');
          $unitBtn = $unitInfoOver.find('.g-FullwidthVisualsCarouselUnit__info__btn');
          if ($unitSub.length > 0) {
            $unitSub.clone(true).appendTo($unitInfoUnder);
            $unitSub.remove();
          }
          if ($unitBtn.length > 0) {
            $unitBtn.clone(true).appendTo($unitInfoUnder);
            $unitBtn.remove();
          }
        } else {
          $unitSub = $unitInfoUnder.find('.g-FullwidthVisualsCarouselUnit__info__sub');
          $unitBtn = $unitInfoUnder.find('.g-FullwidthVisualsCarouselUnit__info__btn');
          if ($unitSub.length > 0) {
            $unitSub.clone(true).appendTo($unitInfoOver);
            $unitSub.remove();
          }
          if ($unitBtn.length > 0) {
            $unitBtn.clone(true).appendTo($unitInfoOver);
            $unitBtn.remove();
          }
        }

      });

    });
  }


  /**
   * TelephoneCall Itemの初期化
   */
  function initTelephoneCall() {
    var $telephoneCall = $('.js-telephoneCall');
    //if ($telephoneCall == null ) return;
    $telephoneCall.each(function(index, el) {
      var $this = $(this);
      var $link = $this.children('a');
      $link.click(function(event) {
        if ($.fn.isBreakpointMd() && $this.hasClass('is-tel--md')) {
          return true;
        } else if ($.fn.isBreakpointSm() && $this.hasClass('is-tel--sm')) {
          return true;
        }
        return false;
      });
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

  function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] == sParam) {
        return sParameterName[1];
      }
    }
  }
  /**
   * headerの高さを取る
   */
  // function getAnchorPaddingSize() {
  //   var scrollMargin = 10;
  //   var paddingSize = 0;
  //   //calculate padding size
  //   var $paddingElem = $('.js-anchor__space');
  //   if ($paddingElem && $paddingElem.length > 0) {
  //     if ($.fn.isBreakpointLg()) {
  //       var elemHeight = parseInt($paddingElem.data('fixedheight-lg'));
  //     } else if ($.fn.isBreakpointMd()) {
  //       var elemHeight = parseInt($paddingElem.data('fixedheight-md'));
  //     } if ($.fn.isBreakpointSm()) {
  //       var elemHeight = parseInt($paddingElem.data('fixedheight-sm'));
  //     }
  //     if (elemHeight) {
  //       paddingSize = elemHeight + scrollMargin;
  //     }
  //   }
  //   return paddingSize;
  // }

  /**
   * 他のページまでのアンカー
   * urlからターゲットを探してターゲットまでスクロールする
   * 例:url ~html?goto=destElem
   *
   */
  // function jumpToDestElem() {
  //   var queryString = '#' + getURLParameter('goto');
  //   var $destElem = $(queryString);
  //   var paddingSize = getAnchorPaddingSize();
  //   var destPoint = $destElem.offset().top - paddingSize;
  //   if (destPoint < 0) {
  //     destPoint = 0;
  //   }
  //   if ($destElem && $destElem.length > 0) {
  //     $('html, body').animate({scrollTop: destPoint}, 0);
  //   }
  // }
  function jumpToDestElem() {
    var queryString = window.location.hash;
    var $destElem = $(queryString);
    if ($destElem && $destElem.length > 0) {
      var paddingSize = $.fn.getBrHeaderFixedHeight();
      var destPoint = $destElem.offset().top - paddingSize;
      if (destPoint > 0) {
        window.scrollTo(0, destPoint);
      }
    }
  }

  /**
   * ターゲットまでスムーズスクロールする
   *
   * @param $destElem　ターゲット
   */
  function scrollToDestElem($destElem) {
    if ($destElem && $destElem.length > 0) {
      var scrollTime = 500;
      var paddingSize = $.fn.getBrHeaderFixedHeight();
      var destPoint = $destElem.offset().top - paddingSize;
      if (destPoint < 0) {
        destPoint = 0;
      }
      $('html, body').animate({scrollTop: destPoint}, scrollTime, "swing");
    }

  }

  /**
   * Link/button　アンカー の初期化
   */
  function initLinkButton() {
    $('.js-anchorLink').each(function(index){
      var $this = $(this);
      var target = $this.attr('href');
      if (!target) return;
      //anchorの場合
      if (target.indexOf('#') == 0) {
        var $destElem = $(target);
        if ($destElem && $destElem.length > 0) {
          $this.on('click', function(e){
            scrollToDestElem($destElem);
            e.preventDefault();
          });
        }
      }
    });
   }


  /**
   * Image/Movie TextPack用のjs:　
   * テキストの回り込みの場合は画像とテキストの位置を交換する
   *
  */
  function changeImgMovieTextPPosition() {
    var elemClassName = '.g-ImageTextHP.is-wraparound.is-smallViewVertical,' +
        '.g-ImageTextVP.is-wraparound.is-smallViewHorizontalL,' +
        '.g-ImageTextVP.is-wraparound.is-smallViewHorizontalR,' +
        '.g-MovieTextHP.is-wraparound.is-smallViewVertical,' +
        '.g-MovieTextVP.is-wraparound.is-smallViewHorizontalL,' +
        '.g-MovieTextVP.is-wraparound.is-smallViewHorizontalR';
    if ($(elemClassName).length == 0) return;

    var imgMovieClassName = '.g-ImageTextHP__contentsBlock__image,' +
        '.g-ImageTextVP__contentsBlock__image,' +
        '.g-MovieTextHP__contentsBlock__movie,' +
        '.g-MovieTextVP__contentsBlock__movie';
    var textClassName = '.g-ImageTextHP__contentsBlock__text,' +
        '.g-ImageTextVP__contentsBlock__text,' +
        '.g-MovieTextHP__contentsBlock__text,' +
        '.g-MovieTextVP__contentsBlock__text';
    var positionChangedClass = 'js-isPositionChanged';

    $(elemClassName).each(function(index) {
      var $this = $(this);
      var $packImgMovie = $this.find(imgMovieClassName);
      var $packText = $this.find(textClassName);
      var isImgMovieBottom = $packImgMovie.isElementAfter($packText);

      //Small break: TOPの場合は変更不要
      if (!isImgMovieBottom && !$this.hasClass(positionChangedClass)) return;

      var shouldChangePos = true;
      if ($this.hasClass('g-ImageTextHP') || $this.hasClass('g-MovieTextHP')) {
        //horizontal: mediumとlargeで変化する
        shouldChangePos = !$.fn.isBreakpointSm();
      } else if ($this.hasClass('g-ImageTextVP') || $this.hasClass('g-MovieTextVP')) {
        //Vertical: smallで変化する
        shouldChangePos = $.fn.isBreakpointSm();
      }

      if (shouldChangePos) {
        if (!$this.hasClass(positionChangedClass)) {
          //change position
          // console.log('move image');
          $packImgMovie.insertBefore($packText);
          $this.addClass(positionChangedClass);
        }
      }
      else {
        if ($this.hasClass(positionChangedClass)) {
          //change position to original position
          // console.log('move image to original position!');
          $packImgMovie.insertAfter($packText);
          $this.removeClass(positionChangedClass);
        }
      }
    });
  }

  /**
   * xxxxxxxxxxxxxxxxxx
   *
   * @param xxx
   * @return xxx
   */


})(window, window.kaoAPI || (window.kaoAPI = {}));
