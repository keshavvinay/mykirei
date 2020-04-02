/**
 * KAO WCM Common use.
 */
(function(window, kaoAPI) {

  var $win = $(window);
  var $js_uniformHeight;
  var $js_uniformWidth;
  var $js_fv_carousel;
  var $buttonsPacks;
  var resizeTimer; //リサイズタイマー
  var interval = 50;
  var isAuthorring;
  var androidVer;
  // オーサリング画面かどうかの値をセット
  kaoAPI.isAuthorring = false;

  // SlideImagePackTest
  var $js_img_carousel;

  /*-----------------------*/
  // ログ無効
  /*-----------------------*/

  if(document.URL.indexOf('localhost') === -1){
    window.console = {};
    window.console.log = function(i){return;};
    window.console.time = function(i){return;};
    window.console.timeEnd = function(i){return;};
  }

  androidVer = getAndroidVer();

  /*-----------------------*/
  // ready
  /*-----------------------*/
  $(document).ready(function() {

    isAuthorring = $.fn.isAuthorring();
    if(isAuthorring) interval = 100;

    initialize();
    onresize();
    setTimeout(jumpToDestElem, 1000);
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

    /*-----------------------*/
    // MapItem init
    /*-----------------------*/
    initMapItem();

  });

  /*-----------------------*/
  // リサイズイベントに登録
  /*-----------------------*/
  $win.on('resize', function() {
    if(isAuthorring){
      initialize();
    }
    onresize();
  });


  /**
   * 初期化処理
   */
  function initialize() {
    $js_uniformHeight = $('.js-uniformHeight:not([class*="dontuniform"])');
    $js_uniformWidth = $('.js-uniformWidth:not([class*="dontuniform"])');
    $js_fv_carousel = $('.js-fullwidthVisualsCarousel');
    $buttonsPacks = $('.g-ButtonP');

    initFullwidthVisualsCarouselP();
    initTelephoneCall();
    initAccordion();
    initLinkButton();
    initBgImageSize();
    initPagetopControl();
    initVideoControl();
    initBaseOverlay();

    // コピー禁止処理
    initCopyDisable();

    // SlideImagePackTest
    $js_img_carousel = $('.js-SlideImageP');
    initSlideImage();

    // google Maps API
    if($('.js-map').length) {
      var gm = document.createElement('script');
      gm.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://maps.googleapis.com/maps/api/js?key=AIzaSyCEW6Lz8UL_R0XDPPzYdLkdDSejReEP5N0&extension=.js';
      gm.type = 'text/javascript';
      gm.async = 'true';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(gm, s);
    }

    if(androidVer) {
      // Android 4.4未満
      if(androidVer < 4.4) {
        $('body').addClass('is-ltAndroid4_3');
      }
    }
  }


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

      // 幅揃え実行
      uniformWidth();

      // Buttons大きさ揃え実行
      uniformButtonsSize();

      // カルーセル高さ
      resizeFullwidthVisualsCarouselP();

      changeImgMovieTextPPosition();

      clearTimeout(resizeTimer);
      resizeTimer = null;
    }, interval);
  }


  /**
   * 高さを揃える
   * 全部同じ大きさにするか、列別に揃えるか
   */
  function uniformHeight() {

    if(!$js_uniformHeight[0]) return;

    var $isHiddenParent;

    $isHiddenParent = $js_uniformHeight.parent(':hidden');

    if($isHiddenParent[0]) {
      $isHiddenParent.show();
    }

    $js_uniformHeight.each(function(index, el) {

      var $holder = $(el);

      var attributes = $holder.attr('data-uniform-target');
      if (!attributes) return true;

      var targetClasses = []; // 高さを変更するClass
      targetClasses = attributes.split(",");

      for (var i = 0, length = targetClasses.length; i < length; i++) {

        //同じ列の分だけピックアップして高さを揃える
        var rows = setUniformTargetRows($holder, targetClasses[i]);
        for (var j = 0; j < rows.length; j++) {
          uniformHeightExe(rows[j]);
        }
      }
    });

    if($isHiddenParent[0]) {
      $isHiddenParent.hide();
    }
  }


  /**
   * 高さを揃える列を保持した配列を生成する
   */
  function setUniformTargetRows(holder, target) {

    var grpid = 0;
    var $targets = holder.find('.' + target);

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
    return rows;
  }


  /**
   * LinksButtonsPackのButtonを同じ大きさにする。
   */
   function uniformButtonsSize() {
     if(!$buttonsPacks[0]) return;

    var $isHiddenParent;

    $isHiddenParent = $buttonsPacks.parent(':hidden');

    if($isHiddenParent[0]) {
      $isHiddenParent.show();
    }

     $buttonsPacks.each(function(index, el){
       var buttons = [];

       var $buttons = $(el).find('.g-ButtonUnit__link');
       if(!$buttons.length) {
         return true;
       }

      // ボタンの高さを揃える
       $buttons.each(function(index, el) {
         buttons.push($(el));
       });
       uniformHeightExe(buttons);
     });

    if($isHiddenParent[0]) {
      $isHiddenParent.hide();
    }
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
      var height = +$target.outerHeight();
      if (maxHeight < height) maxHeight = height;
    }

    if (elmArray.length < 2) return;

    for (var j = 0; j < elmArray.length; j++) {
      $target = $(elmArray[j]);
      $target.outerHeight(maxHeight);
    }
  }


  /**
   * 横幅を合わせる要素を取得し幅を揃える
   */
  function uniformWidth() {
    if(!$js_uniformWidth[0]) return;


    var $isHiddenParent;

    $isHiddenParent = $js_uniformWidth.parent(':hidden');

    if($isHiddenParent[0]) {
      $isHiddenParent.show();
    }

    $js_uniformWidth.each(function(index, el) {
      var $holder = $(el);
      var elmArray = [];
      var attributes = $holder.attr('data-uniformWidth-target');
      var targetClasses = []; // 横幅を変更するClass
      targetClasses = attributes.split(",");

      for (var i = 0, length = targetClasses.length; i < length; i++) {
        elmArray = $holder.find('.' + targetClasses[i]);
        if (!elmArray.length) return;

        uniformWidthExe(elmArray);
      }
    });

    if($isHiddenParent[0]) {
      $isHiddenParent.hide();
    }
  }


  /**
   * 要素の横幅を一番widthの長い要素に合わせる
   * @param $array
   */
  function uniformWidthExe(elmArray) {
    var maxWidth = 0;
    var $target;

    if (elmArray.length < 2) return;

    for (var i = 0; i < elmArray.length; i++) {
      $target = $(elmArray[i]);

      $target.width('auto');
      var width = $target.outerWidth();
      if (maxWidth < width) maxWidth = width;
    }

    for (var j = 0; j < elmArray.length; j++) {
      $target = $(elmArray[j]);
      $target.outerWidth(maxWidth + 1);
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
    var openRadiusCls = 'is-radius--open';
    var closeRadiusCls = 'is-radius--close';

    $acrdUnit.each(function(index, el){
      var $holder = $(el);
      var acrdLabelCls = $holder.attr('data-accordion-label');
      var acrdTgtCls = $holder.attr('data-accordion-panel');
      if (!acrdLabelCls||!acrdTgtCls) return true;

      var $acrdLabel = $holder.find('.' + acrdLabelCls);
      var $acrdLabelIcon = $acrdLabel.find('.' + iconCls);
      var $acrdPanel = $holder.find('.' + acrdTgtCls);

      $holder.removeClass(openRadiusCls + ' ' + closeRadiusCls);
      // 初期表示ステータス
      if ($acrdPanel.css('display') === 'none') {
        $acrdPanel.removeClass(function(index,className){
          return (className.match(/\bis-(open|close)\S+/g) || []).join(' ')
        });
        $acrdPanel.addClass(closeStateCls);
        $acrdLabelIcon.addClass(iconCloseStateCls);

        // border radius
        $holder.addClass(closeRadiusCls);
      } else {
        $acrdPanel.removeClass(function(index,className){
          //return (className.match(/\bis-\S+/g) || []).join(' ')
          return (className.match(/\bis-(open|close)\S+/g) || []).join(' ')
        });
        $acrdPanel.addClass(openStateCls);
        $acrdLabelIcon.addClass(iconOpenStateCls);

        // border radius
        $holder.addClass(openRadiusCls);
      }

      // 開閉
      $acrdLabel.on('click keypress', function(){
        if ($acrdPanel.is(':animated')) return;
        // border radius open
        if($holder.hasClass(closeRadiusCls)) {
          $holder.removeClass(closeRadiusCls);
          $holder.addClass(openRadiusCls);
        }
        $acrdPanel.slideToggle(slideDuration, function(){
          if ($acrdPanel.hasClass(openStateCls)) {
            $acrdPanel.removeClass(openStateCls).addClass(closeStateCls);
            $acrdLabelIcon.removeClass(iconOpenStateCls).addClass(iconCloseStateCls);
            // border radius close
            $holder.removeClass(openRadiusCls);
            $holder.addClass(closeRadiusCls);
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

    if (!$js_fv_carousel[0]) return;
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
            prevArrow: '<button type="button" data-role="none" class="g-FullwidthVisualsCarouselP__prevArrow l-FullwidthVisualsCarouselP__prevArrow" aria-label="Previous" tabindex="0" role="button">Previous</button>',
            nextArrow: '<button type="button" data-role="none" class="g-FullwidthVisualsCarouselP__nextArrow l-FullwidthVisualsCarouselP__nextArrow" aria-label="Next" tabindex="0" role="button">Next</button>',
            customPaging: function(slider, i) {
              return '<button type="button" class="g-FullwidthVisualsCarouselP__nav__dot l-FullwidthVisualsCarouselP__nav__dot" data-role="none" role="button" aria-required="false" tabindex="0">' + (i + 1) + '</button>';
            },
            dotsClass: 'g-FullwidthVisualsCarouselP__nav l-FullwidthVisualsCarouselP__nav',
            //adaptiveHeight: true,
            accessibility: false,
            draggable: false,
            slidesToShow: 1
          });

          //一時停止ボタン追加
          var $nav = $this.find('.g-FullwidthVisualsCarouselP__nav');
          var $toggle = $('<button type="button" class="g-FullwidthVisualsCarouselP__nav__toggle l-FullwidthVisualsCarouselP__nav__toggle">pause</button>').appendTo($nav);
          if (autoplay) $toggle.addClass('is-pause');
          else          $toggle.addClass('is-play');

          $toggle.on('click', function(event) {
            event.preventDefault();
            if ($toggle.hasClass('is-pause')) {
              $toggle.removeClass('is-pause');
              $toggle.addClass('is-play');
              slickObj.slick('slickPause').slick('slickSetOption', 'autoplay', false);
            } else {
              $toggle.addClass('is-pause');
              $toggle.removeClass('is-play');
              slickObj.slick('slickPlay').slick('slickNext').slick('slickSetOption', 'autoplay', true);
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

    if (!$js_fv_carousel[0]) return;
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
    //if (!$telephoneCall[0]) return;
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
   * 他のページまでのアンカー
   * urlからターゲットを探してターゲットまでスクロールする
   * 例:url ~html?goto=destElem
   *
   */
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
   * リンクのアンカー初期化
   */
  function initLinkButton() {
    //$('.js-anchorLink').each(function(index){
    $('a').each(function(index){
      var $this = $(this);
      var href = $this.attr('href');
      if (!href) return;

      //anchor指定がない場合を除外
      var index = href.indexOf('#');
      if (index < 0) return;

      //anchorの場合
      var hash;
      if (index == 0) {
        hash = href;
      } else {
        //他ページの場合を除外
        var targetUrl = $(this).prop("href").split("#")[0]; //絶対パス取得
        var currentUrl = location.href.split("#")[0];
        if (targetUrl != currentUrl) return;

        hash = href.slice(index, href.length);
      }
      var $destElem = $(hash);
      if ($destElem && $destElem.length > 0) {
        $this.on('click', function(e){
          e.preventDefault();
          scrollToDestElem($destElem);
        });
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
          $packImgMovie.insertBefore($packText);
          $this.addClass(positionChangedClass);
        }
      }
      else {
        if ($this.hasClass(positionChangedClass)) {
          $packImgMovie.insertAfter($packText);
          $this.removeClass(positionChangedClass);
        }
      }
    });
  }



  /**
   * Map Itemの初期化
   */
  function initMapItem() {
    var $map = $('.js-map');
    var bp = $.fn.getBreakpoint();

    $map.each(function(index, el) {
      var $this = $(this);
      var address = $this.data('map-address');
      if(address) {

        var geocoder = new google.maps.Geocoder();
        var zoom = (bp == 'sm') ? (($this.data('map-zoom-sm')) ? $this.data('map-zoom-sm') : 15) : (($this.data('map-zoom-lg')) ? $this.data('map-zoom-lg') : 17);

        var mapOptions = {
          zoom: zoom,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: false,
          scaleControl: false,
          scrollwheel: false,
          streetViewControl: false,
          draggable: !(bp == 'sm'),
          styles: [
            {
              "featureType": "all",
              "stylers": [
                {
                  "hue": $this.data('map-hue')
                },
                {
                  "saturation": $this.data('map-saturation')
                }
              ]
            }
          ]
        };

        $this.find('.g-Map__inner').height((bp == 'sm') ? $this.data('map-height-sm') : ((bp == 'md') ? $this.data('map-height-md') : $this.data('map-height-lg')));
        var mapElement = $this.find('.g-Map__inner').get(0);

        var map = new google.maps.Map(mapElement, mapOptions);

        geocoder.geocode( { 'address': address}, function(results, status) {

          if (status == google.maps.GeocoderStatus.OK) {

            map.setCenter(results[0].geometry.location);

            var image, marker;

            if($this.data('map-marker')) {
              image = {
                url : $this.data('map-marker'),
                scaledSize : new google.maps.Size(40, 40)
              }


              marker = new google.maps.Marker({
                map: map,
                icon : image,
                position: results[0].geometry.location,
                title: $this.data('map-title'),
                desc: $this.data('map-zip') + ' ' + address
              });
            } else {
              marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                title: $this.data('map-title'),
                desc: $this.data('map-zip') + ' ' + address
              });
            }


            var iw = (($this.data('map-zip')) ? $this.data('map-zip') + ' ' : '') + address;

            bindInfoWindow(marker, map, $this.data('map-title'), iw, $this.data('map-info'));

          // ジオコーディングが成功しなかった場合
          } else {
            console.log('Geocode was not successful for the following reason: ' + status);
          }

        });

        // アプリで開くリンク
        $this.find('.g-Map__appLink').attr('href', 'http://maps.apple.com/?q=' + encodeURIComponent(address));
      }
    });
  }
  function bindInfoWindow(marker, map, title, desc, info) {
    var infoWindowVisible = (function () {
      var currentlyVisible = false;
      return function (visible) {
          if (visible !== undefined) {
              currentlyVisible = visible;
          }
          return currentlyVisible;
       };
    }());
    var html= "<div class='g-Map__infoWindow l-Map__infoWindow'>"+((title) ? "<h4 class='g-Map__infoWindow__title l-Map__infoWindow__title'>"+title+"</h4>" : "")+"<p class='g-Map__infoWindow__text l-Map__infoWindow__text'>"+desc+"</p></div>";
    var iw = new google.maps.InfoWindow({content:html});
    google.maps.event.addListener(marker, 'click', function() {
      if (infoWindowVisible()) {
        iw.close();
        infoWindowVisible(false);
      } else {
        iw.open(map,marker);
        infoWindowVisible(true);
      }
    });
    google.maps.event.addListener(iw, 'closeclick', function () {
      infoWindowVisible(false);
    });

    if(info) {
      google.maps.event.trigger(marker, 'click');
      google.maps.event.addListener(map, 'tilesloaded', function(){
        map.panBy(0, -40);
      });
    }
  }


  /**
   * スライドイメージパック 初期化（Test）
   */
  function initSlideImage() {

    if (!$js_img_carousel[0]) return;
    $js_img_carousel.each(function(index, el) {
      var $this = $(this);
      var $target = $this.find('.g-SlideImageP__list');
      var $targetUnit = $target.find('.g-SlideImagePUnit');
      var autoplay = changeBoolean($this.attr('data-autoplay'));
      var autoplaySpeed = $this.attr('data-autoplaySpeed') * 1000;
      var fade = changeBoolean($this.attr('data-fade'));
      var speed;
      var slickObj;

      if ($target.slick) {

        if (fade) speed = 1500;
        else      speed = 700;

        //オーサリング画面の場合とUnitの数が1以下の場合はカルーセルの初期化を行わない
        if(!$.fn.isAuthorring() && $targetUnit.length >= 2) {
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
            prevArrow: '<button type="button" data-role="none" class="g-SlideImageP__prevArrow l-SlideImageP__prevArrow" aria-label="Previous" tabindex="0" role="button">Previous</button>',
            nextArrow: '<button type="button" data-role="none" class="g-SlideImageP__nextArrow l-SlideImageP__nextArrow" aria-label="Next" tabindex="0" role="button">Next</button>',
            customPaging: function(slider, i) {
              return '<button type="button" class="g-SlideImageP__nav__dot l-SlideImageP__nav__dot" data-role="none" role="button" aria-required="false" tabindex="0">' + (i + 1) + '</button>';
            },
            dotsClass: 'g-SlideImageP__nav',
            //adaptiveHeight: true,
            accessibility: false,
            draggable: false,
            slidesToShow: 1
          });

          //一時停止ボタン追加
          var $nav = $this.find('.g-SlideImageP__nav');
          var $toggle = $('<button type="button" class="g-SlideImageP__nav__toggle l-SlideImageP__nav__toggle">pause</button>').appendTo($nav);
          if (autoplay) $toggle.addClass('is-pause');
          else          $toggle.addClass('is-play');

          $toggle.on('click', function(event) {
            event.preventDefault();
            if ($toggle.hasClass('is-pause')) {
              $toggle.removeClass('is-pause');
              $toggle.addClass('is-play');
              slickObj.slick('slickPause').slick('slickSetOption', 'autoplay', false);
            } else {
              $toggle.addClass('is-pause');
              $toggle.removeClass('is-play');
              slickObj.slick('slickPlay').slick('slickNext').slick('slickSetOption', 'autoplay', true);
            }
          });
        }
      }
    });

  }


  /**
   * background-sizeの初期化
   */
   function initBgImageSize() {

     var $js_bgImageSize = $('.js-bgImageSize');

     $js_bgImageSize.each(function() {

       var $this = $(this);
       var size = $this.attr('data-bgImageSize');
       if (size === "") return;

       var bgSize = size + 'px';
       $this.css('background-size', bgSize);
     });
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

  /**
   * Androidのバージョンを取得
   *
   * @return Number
   */

  function getAndroidVer() {
    var and_ua = navigator.userAgent;
    if( and_ua.indexOf("Android") > 0 ) {
      var version = parseFloat(and_ua.slice(and_ua.indexOf("Android")+8));
      return version;
    }
  }

  /**
   * Copy禁止処理
   *
   */
  function initCopyDisable() {
    var $spacer = $('<img />').attr({
      src: '/etc/clientlibs/common/option/img/spacer.gif'
    }).addClass('spacer');
    $('.opt-copy--disable .g-Image__img').prepend($spacer);
    $('.opt-copy--disable img, .opt-copy--disable video, .opt-copy--disable.is-background').on('contextmenu selectstart mousemove mousedown copy cut dragstart', function(e){
      return false;
    });
  }


  /**
   * Video同時再生制御初期化
   *
   */
  var $emPlayers;
  function initVideoControl() {

    var $target = $('.g-Movie');

    if($target[0]) {
      kaoAPI.loadPlayer();

      $emPlayers = $('.g-Movie video');
      $emPlayers.each(function(){
        var $me = $(this);
        $me.get(0).addEventListener('play', checkPlayingVideo);
      });
    }

  }

  /**
   * 動画再生時、その他の動画の再生を停止する
   */
  function checkPlayingVideo(e) {
    if(typeof e.target.tagName === "undefined"){
      // YouTube
      for(var i = 0; i < kaoAPI.ytPlayers.length; i++) {
        if(kaoAPI.ytPlayers[i] != e.target && kaoAPI.ytPlayers[i].getPlayerState() === YT.PlayerState.PLAYING) {
          kaoAPI.ytPlayers[i].pauseVideo();
        }
      }
      // Embed Video
      if($emPlayers !== undefined) {
        $emPlayers.each(function(){
          $(this).get(0).pause();
        });
      }
    } else {
      // Embed Video
      if($emPlayers !== undefined) {
        $emPlayers.each(function(){
          if($(this).get(0) != e.target) {
            $(this).get(0).pause();
          }
        });
      }
      for(var d = 0; d < kaoAPI.ytPlayers.length; d++) {
        if(kaoAPI.ytPlayers[d].getPlayerState() === YT.PlayerState.PLAYING) {
          kaoAPI.ytPlayers[d].pauseVideo();
        }
      }
    }
  }

  kaoAPI.ytPlayers = [];
  kaoAPI.$emPlayers;
  kaoAPI.ytPlayerStateChange = function(event) {
    var state = event.target.getPlayerState();

    if(state === YT.PlayerState.PLAYING) {
      checkPlayingVideo(event);
    }
  };


  /**
   * YouTubePlayerをロードする
   * @param {array} videoIds - 再生する動画のvideo idを格納した配列
   */
  kaoAPI.loadPlayer = function(videoIds) {
    if(typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
      var scriptTag = document.createElement('script');
      scriptTag.src = "https://www.youtube.com/iframe_api";
      var firstScript = document.querySelector('script');
      firstScript.parentNode.insertBefore(scriptTag, firstScript);

      window.onYouTubeIframeAPIReady = function() {
        onYouTubePlayer(videoIds);
      };
    }
    else {
      onYouTubePlayer(videoIds);
    }
  };

  function onYouTubePlayer(videoIds) {
    // Movie Itemのplayerインスタンスを生成
    $('.g-Movie iframe').each(function(index){
      $(this).attr('id', 'embedplayer' + index);
      var embedTag = $(this).attr('id');
      var EmbedYT = new YT.Player(embedTag, {
        events: {
          'onStateChange': kaoAPI.ytPlayerStateChange
        }
      });
      kaoAPI.ytPlayers.push(EmbedYT);
    });

    // YouTube Video Itemのplayerインスタンスを生成
    if(videoIds === undefined) return;
    var $movieArea = $('.g-YouTubeVideo__movieBlock__inner');
    for(var i = 0, len = videoIds.length; i < len; i++) {
      var id = videoIds[i];
      var playerTag = 'ytplayer_' + i;
      $movieArea.eq(i).attr('id', playerTag);
      var PlayerYT = new YT.Player(playerTag, {
        videoId: id,
        events: {
          'onStateChange': kaoAPI.ytPlayerStateChange
        },
        playerVars: {
          rel: 0,
          enablejsapi: 1
        }
      });
      kaoAPI.ytPlayers.push(PlayerYT);
    }
  }



  /**
   * オーバーレイのベースをレンダリングする
   */
  function initBaseOverlay() {
    var overlay = '<div class="g-overlay l-overlay js-overlay">' +
                    '<div class="g-modal l-modal">' +
                      '<div class="g-modal__close l-modal__close">' +
                        '<a href="javascript:void(0);" class="g-modal__close__link l-modal__close__link js-closeModal">' +
                          '<span class="cmn-icon cmn-icon--close g-modal__close__icon l-g-modal__close__icon"></span>' +
                        '</a>' +
                      '</div>' +
                      '<div class="g-modal__inner l-modal__inner js-modalInner">' +
                      '</div>' +
                  '</div>';
    $('body').append(overlay);
    kaoAPI.Overlay.addCloseEvent();
  }

  /**
   * オーバーレイのイベントを管理
   */
  kaoAPI.Overlay = {
    show: function(innerContents) {
      var $modalInner = $('.js-modalInner');
      $modalInner.html(innerContents);
      $('.js-overlay').fadeIn();
    },
    addCloseEvent: function() {
      $('.js-overlay')
        .off('click.overlay')
        .on('click.overlay', function() {
          $('.js-overlay').fadeOut();
      });
      $('.js-modalInner').on('click', function(event) {
        event.stopPropagation();
      });
      $('.js-closeModal').on('click', function(event) {
        event.preventDefault();
      });
    }
  };

  var componentLength = 0;
  var componentCount = 0;

  /**
  * 非同期で生成されたDOMがすべて描画されたタイミングで処理を行う
  * @param {Deferred} defferd
  */
  kaoAPI.onloadAsyncDOM = function(defferd) {
    componentLength++;

    defferd.done(function() {
      componentCount++;
      if (componentLength === componentCount) {
        // fontplusのリロード
        if(document.location.hostname != "localhost") {
          FONTPLUS.reload();
        }
      }
    });
  }

})(window, window.kaoAPI || (window.kaoAPI = {}));
