/**
 * KAO WCM Common use.
 */
(function (window, kmsAPI) {
  var isAuthorring = false;

  $(window).on('load', function () {
    $(window).on('resize', function () {
      initC190();

      // ~Andloid 4.3
      if ($('body').hasClass('is-ltAndroid4_3')) {
        $('.kmsHeader__mainmenu, .kmsBrandHeader__mainmenu').css('maxHeight', $(window).height() - 60);
        $('.c280__selector').css('maxHeight', $(window).height() - 60);
      }
    });
    $(window).resize();
  });

  /*-----------------------*/
  // ready
  /*-----------------------*/
  $(document).ready(function () {
    isAuthorring = $.fn.isAuthorring();
    if (isAuthorring) {
      $('body').addClass('is-authorring');
    }
    // debug
    // isAuthorring = true;

    initHeaderMainMenu();
    initHeaderSubMenu();
    initHeaderSearchMenu();
    initC190_filterImage();
    initC270Carousel();
    initC280();
    initC290();
    init370();
    init375();
    initC420();
    initC450();
    initC450x();
    initC030();
    initYouTubeVideoModal();
    c190_Carousel();
    c182_Carousel();
    initLoadMoreStyleEquations();
    initLoadMoreStyleMagazines();

    // ~Andloid 4.3
    if ($('body').hasClass('is-ltAndroid4_3')) {}
  });

  /**
   * initialize header main menu
   *
   * @param none
   * @return none
   */

  function initHeaderMainMenu() {
    var $trigger = $('.js-mainmenu-trigger');

    if ($trigger[0]) {
      var $target = $trigger.parent();
      var $toggleTarget = $('.kmsHeader__mainmenu, .kmsBrandHeader__mainmenu');

      if (!isAuthorring) {
        $trigger.on('click', function () {
          if (!$toggleTarget.is(':animated')) {
            // country selector
            var $c280 = $('.js-c280');
            if ($c280[0]) {
              if ($c280.hasClass('is-open')) {
                closeC280($c280);
              }
            }

            if ($target.hasClass('is-active')) {
              $target.removeClass('is-active');
              $target.addClass('is-deactive');
              $toggleTarget.slideUp(500);
              if ($.fn.isBreakpointSm()) {
                fixBody(false);
              }
            } else {
              $target.addClass('is-active');
              $target.removeClass('is-deactive');
              $toggleTarget.slideDown(500);
              if ($.fn.isBreakpointSm()) {
                fixBody(true);
              }
            }
          }
        });
      } else {
        // isAuthorring
        $toggleTarget.show();
        $trigger.parents('.kmsHeader, .kmsBrandHeader').css('position', 'relative');
      }
    }
  }

  /**
   * initialize header main menu
   *
   * @param none
   * @return none
   */

  function initHeaderSubMenu() {
    var $trigger = $('.js-submenu, .js-kms_submenu');

    if ($trigger[0]) {
      $trigger.each(function () {
        var $me = $(this);
        if (!isAuthorring) {
          $me.on('click', function () {
            var $target = $me.next();
            if (!$target.is(':animated')) {
              if ($target.is(':hidden')) {
                $target.slideDown(500);
              } else {
                $target.slideUp(500);
              }
            }
          });
        } else {
          $me.next().show();
          $me.parents('.l-GroupBox').find('.kmsBrandHeader__submenu').show();
        }
      });
    }
  }

  function initHeaderSearchMenu() {
    var $trigger = $('.js-search-trigger');
    var $closeTrigger = $('.js-search-closeTrigger');
    var $kmsSearch = $('.js-kmsSearch');
    if (!$kmsSearch[0]) $kmsSearch = $('#js-kmsSearch'); // kms側結果画面
    if (!($trigger[0] && $closeTrigger[0] && $kmsSearch[0])) return;

    var $toggleTarget = $('.kmsBrandHeader__inner');
    $trigger.on('click', function () {
      $toggleTarget.addClass('is-active-search');
    });
    $closeTrigger.on('click', function () {
      $toggleTarget.removeClass('is-active-search');
    });

    // Adobe Analytics
    var $kmsHeaderSearchForm = $kmsSearch.parents('.kmsBrandHeader__form');
    if (!$kmsHeaderSearchForm[0]) return;

    $kmsHeaderSearchForm.on('submit', function () {
      s.linkTrackVars = "prop11,eVar11,events";
      s.linkTrackEvents = "event19";
      s.prop11 = $kmsSearch.val();
      s.eVar11 = "D=c11";
      s.events = "event19";
      s.tl(this, 'o', 'On site search');
    });

    // FIXME: インクリメンタルサーチ表示確認用のダミーメソッド。組み込み後、削除
    // function dummySuggestion() {
    //   $suggestion = $('.kmsBrandHeader__form__suggestion');
    //   $kmsSearch.on('keyup', function() {
    //     if (0 < $(this).val().length) {
    //       $suggestion.show();
    //     } else {
    //       $suggestion.hide();
    //     }
    //   });
    // }
    // dummySuggestion();
  }

  /**
   * C190 TEXT (HOVER) OVER IMAGE / IMAGE ABOVE TEXT initialize
   *
   * @param none
   * @return none
   */
  function initC190() {
    var $c190__imageTextVP = $('.c190__imageTextVP');
    if (!$c190__imageTextVP[0]) return;
    var length = $c190__imageTextVP.length;

    for (var i = 0; i < length; i++) {
      var $inner = $c190__imageTextVP.eq(i).find('.l-ImageTextVP__contentsBlock__text');
      if (!$.fn.isBreakpointLg()) {
        $inner.removeAttr('style');
      } else {
        $inner
          .width($c190__imageTextVP.eq(i).width() * 0.8)
          .height($c190__imageTextVP.eq(i).height() * 0.8);
      }
    }
  }

  function initC190_filterImage() {
    var $c190__imageTextVP = $('.c190__imageTextVP');
    if (!$c190__imageTextVP[0]) return;

    var length = $c190__imageTextVP.length;
    for (var i = 0; i < length; i++) {
      var $outer = $c190__imageTextVP.eq(i).find('.l-ImageTextVP__contentsBlock');
      var $inner = $outer.find('.l-ImageTextVP__contentsBlock__text');
      $inner.wrapInner('<div class="l-ImageTextVP__contentsBlock__text__inner">');
    }
  }
  /**
   * C190 CAROUSEL
   *
   */
  function c190_Carousel() {
    var C190Carousel = (".js-C190Carousel"); {
      $(C190Carousel).find(".l-ColumnUnit").slick({
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        initialSlide: 0,
        responsive: [{
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              initialSlide: 0,
              dots: true
            }
          },
          {
            breakpoint: 641,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    }
  }

  /**
   * Load More Feature
   *
   * Style Equations Page
   */

  function initLoadMoreStyleEquations() {
    $(".c190__commonColumnSeparator").slice(0, 6).addClass('visible');
    $(".c190__commonColumnSeparator").slice(6).addClass('hidden');
    $(".visible").show();
    $(".hidden").hide();
    $(".loadMoreStyleEquation").click(function (e) {
      e.preventDefault();
      $(".hidden").slice(0, 2).addClass('visible');
      $(".hidden").slice(0, 2).show();
      $(".hidden").slice(0, 2).removeClass('hidden');
      if ($(".hidden").length == 0) {
        $(".loadMoreStyleEquation").hide();
      }
      initC190();
    });
  }

  /**
   * Load More Feature
   *
   * Style Magazines Page
   */

  function initLoadMoreStyleMagazines() {
    $(".c190__StyleMagazine_commonColumnSeparator").slice(0, 6).addClass('visible');
    $(".c190__StyleMagazine_commonColumnSeparator").slice(6).addClass('hidden');
    $(".visible").show();
    $(".hidden").hide();
    $(".loadMoreStyleMagazine").click(function (e) {
      e.preventDefault();
      $(".hidden").slice(0, 3).addClass('visible');
      $(".hidden").slice(0, 3).show();
      $(".hidden").slice(0, 3).removeClass('hidden');
      if ($(".hidden").length == 0) {
        $(".loadMoreStyleMagazine").hide();
      }
      initC190();
    });
  }

  /**
   * C270 + C140 HEADER CAROUSEL initialize
   *
   * @param none
   * @return none
   */

  function initC270Carousel() {
    var $carousel = $('.js-C270Carousel');
    if (!$carousel[0]) return;
    if ($.fn.isAuthorring()) {
      $carousel.find('.c270__textblock, .c270__buttons').css({
        'position': 'relative',
        'bottom': 'auto'
      });
      $carousel.find('.l-SlideImagePUnit').css('backgroundColor', '#999');
    } else {
      $carousel.each(function (index) {
        var $target = $(this).find('.g-SlideImageP__list');
        if ($target[0].slick === undefined) return true; // slickの初期化がされていない場合、continue
        var $items = $target.find('.l-SlideImagePUnit');
        var autoplay = $target.slick('slickGetOption', 'autoplay');
        var $nav = $target.find('.g-SlideImageP__nav');
        if ($target[0]) {
          if ($items.length > 1) {
            $target.on('touchmove', function (event) {
              if (autoplay && !$target.hasClass('is-pause')) {
                $target.slick('slickPause');
                $target.addClass('is-pause');
              }
            });
            $target.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
              if (autoplay && $target.hasClass('is-pause')) {
                $target.slick('slickPlay');
                $target.removeClass('is-pause');
              }
            });

            $nav.find('button').on('mousedown touchstart', function () {
              if (autoplay && !$target.hasClass('is-pause')) {
                $target.slick('slickPause');
                $target.addClass('is-pause');
              }
            });
            $nav.find('button').on('mouseup touchend', function () {
              if (autoplay && $target.hasClass('is-pause')) {
                $target.slick('slickPlay');
                $target.removeClass('is-pause');
              }
            });

            $target.find('.js-c270__prev, .js-c270__next').on('mousedown', function () {
              if (autoplay && !$target.hasClass('is-pause')) {
                $target.slick('slickPause');
                $target.addClass('is-pause');
              }
            });
            $target.find('.js-c270__prev, .js-c270__next').on('mouseup', function () {
              if (autoplay && $target.hasClass('is-pause')) {
                $target.slick('slickPlay');
                $target.removeClass('is-pause');
              }
            });

            $target.on('touchstart', function () {
              if (autoplay && !$target.hasClass('is-pause')) {
                $target.slick('slickPause');
                $target.addClass('is-pause');
              }
            });
            $target.on('touchend', function () {
              if (autoplay && $target.hasClass('is-pause')) {
                $target.slick('slickPlay');
                $target.removeClass('is-pause');
              }
            });

            if ($.fn.isBreakpointLg()) {
              $target.find('.g-SlideImagePUnit *').on('mouseover', function () {
                if (autoplay && !$target.hasClass('is-pause')) {
                  $target.slick('slickPause');
                  $target.addClass('is-pause');
                }
              });
              $target.find('.g-SlideImagePUnit *').on('mouseout', function () {
                if (autoplay && $target.hasClass('is-pause')) {
                  $target.slick('slickPlay');
                  $target.removeClass('is-pause');
                }
              });
            }

            $target.find('.js-c270__prev').on('click', function () {
              $target.slick('slickPrev');
            });
            $target.find('.js-c270__next').on('click', function () {
              $target.slick('slickNext');
            });

            $target.on('beforeChange', function () {
              $target.find('.c270__navi').hide();
            });
            $target.on('afterChange', function () {
              $target.find('.c270__navi').show();
            });
          } else {
            $target.find('.c270__navi').remove();
          }
        }
      });
    }
  }

  /**
   * C280 COUNTRY SELECTOR initialize
   *
   * @param none
   * @return none
   */

  function initC280() {
    // country selector
    var $trigger = $('.js-c280');

    if ($trigger[0]) {
      if (!isAuthorring) {
        $trigger.on('click', function () {
          var $me = $(this);
          var $target = $me.next();

          if (!$target.is(':animated')) {
            if ($me.hasClass('is-open')) {
              closeC280($me);
              if ($.fn.isBreakpointSm()) {
                fixBody(false);
              }
            } else {
              openC280($me);
              if ($.fn.isBreakpointSm()) {
                fixBody(true);
              }
            }
          }
        });
      } else {
        $trigger.parents('.c280brandHeader').css({
          'position': 'relative',
          'top': 'auto'
        });
        $trigger.next().show().css('position', 'relative');
        $trigger.parents('.c280brandHeader').find('.c280brandHeader__selector').show().css('position', 'relative');

        $trigger.parents('.c280brandHeader').find('.l-TextLinkP__list').css('left', '0');
      }
    }

    // toggle lang selector
    var $langTrigger = $('.c280 .js-langopen, .c280brandHeader .js-langopen');

    if ($langTrigger[0]) {
      if (!isAuthorring) {
        $langTrigger.on('click', function () {
          var $me = $(this);
          var $target = $me.parents('.c280__selector__country, .c280brandHeader__selector__country');

          $target.toggleClass('is-open');
        });
      } else {
        $langTrigger.parents('.c280__selector__country, .c280brandHeader__selector__country').toggleClass('is-open');
      }
    }
  }

  /**
   * C280 COUNTRY SELECTOR open
   *
   * @param $
   * @return none
   */

  function openC280($trigger) {
    var $target = $trigger.next();

    $target.slideDown(500, function () {
      $trigger.addClass('is-open');
    });
  }

  /**
   * C280 COUNTRY SELECTOR close
   *
   * @param $
   * @return none
   */

  function closeC280($trigger) {
    var $target = $trigger.next();

    $trigger.removeClass('is-open');
    $target.slideUp(500);
  }

  /**
   * C290 COUNTRY SELECTOR(FOOTER) initialize
   *
   * @param none
   * @return none
   */

  function initC290() {
    // country selector
    var $trigger = $('.js-c290');
    var $trigger_new = $('.js-c290brandFooter');

    if ($trigger[0]) {
      if (!isAuthorring) {
        $trigger.on('click', function () {
          var $me = $(this);
          var $target = $me.parents('.c290__trigger').next();

          if (!$target.is(':animated')) {
            if ($me.hasClass('is-open')) {
              closeC290($me);
            } else {
              openC290($me);
            }
          }
        });
      } else {
        $trigger.parents('.c290__trigger').next().show();
        $trigger.addClass('is-open');
      }
    }

    if ($trigger_new[0]) {
      if (!isAuthorring) {
        $trigger_new.on('click', function () {
          var $me = $(this);
          var $target = $me.next();

          if (!$target.is(':animated')) {
            if ($me.find('.l-TextLinkUnit__link').hasClass('is-open')) {
              closeC290($me.find('.l-TextLinkUnit__link'));
            } else {
              openC290($me.find('.l-TextLinkUnit__link'));
            }
          }
        });
      } else {
        $trigger_new.next().show();
        $trigger_new.addClass('is-open');
        $trigger_new.parents('.c290brandFooter').find('.c290brandFooter__selector').show();

        $trigger_new.parents('.c290brandFooter').find('.l-TextLinkP__list').css('left', '0');
      }
    }

    // toggle lang selector
    var $langTrigger = $('.c290 .js-langopen, .c290brandFooter .js-langopen');

    if ($langTrigger[0]) {
      if (!isAuthorring) {
        $langTrigger.on('click', function () {
          var $me = $(this);
          var $target = $me.parents('.c290__selector__country, .c290brandFooter__selector__country');

          $target.toggleClass('is-open');
        });
      } else {
        $langTrigger.parents('.c290__selector__country, .c290brandFooter__selector__country').addClass('is-open');
      }
    }

  }

  /**
   * C290 COUNTRY SELECTOR open
   *
   * @param $
   * @return none
   */

  function openC290($trigger) {
    var $target = $trigger.parents('.c290__trigger, .c290brandFooter__trigger').next();

    $target.slideDown(500, function () {
      $trigger.addClass('is-open');
    });
    $('html, body').animate({
      scrollTop: $target.offset().top
    }, 500, "swing");
  }

  /**
   * C290 COUNTRY SELECTOR close
   *
   * @param $
   * @return none
   */

  function closeC290($trigger) {
    var $target = $trigger.parents('.c290__trigger, .c290brandFooter__trigger').next();

    $trigger.removeClass('is-open');
    $target.slideUp(500);
  }

  /**
   * C420 SOCIAL MEDIA BAR
   *
   * @param none
   * @return none
   */
  function initC420() {
    var pinterestImagePath = function () {
      var path = $('img').attr('src');
      if (path === undefined) {
        return ""
      }
      if (path.match(/http/)) {
        return path;
      }
      var protocol = window.location.protocol + '//';
      var url = window.location.host;
      return (protocol + url + path);
    }()

    var lang = $('html').attr('lang').split('-')[0];
    var url = location.href;
    // initialize .shariff elements
    $('.c420__sns .shariff').each(function () {
      if (this.hasOwnProperty('shariff')) return;

      $(this).attr('data-lang', lang);
      $(this).attr('data-media-url', pinterestImagePath);
      this.shariff = new Shariff(this);
      $(this).find('.shariff-button.mail').children('a').attr('href', 'mailto:?body=' + url);
      var $buttons = $(this).find('.shariff-button');

      $buttons.each(function (index, el) {
        var $self = $(el);
        var snsName = function () {
          var classes = $self.attr('class').split(' ');
          return classes[classes.length - 1];
        }();
        $self.on('click', function () {
          addSNSAnalyticsTags(snsName);
        });
      });
    });

    initC420ToggleMenu();
  }

  function initC420ToggleMenu() {
    var $trigger = $('.js-c420'); // social media
    if ($trigger[0]) {
      $trigger.on('click touchend', function () {
        var $me = $(this);
        var $target = $me.next();
        var isHidden = false;

        if ($target.is(':hidden')) {
          $target.show();
          isHidden = true;
        }
        var $targetItem = $target.find('.shariff-button').eq(0);
        var targetWidth = $target.find('.shariff-button').length * $targetItem.width();
        if ($.fn.isBreakpointSm() && $(window).height() > $(window).width()) {
          targetWidth = $targetItem.width();
        }
        if (isHidden) {
          $target.hide();
        }

        if (!$target.is(':animated')) {
          $me.toggleClass('is-open');
          if ($me.hasClass('is-open')) {
            $target.show();
            $target.animate({
              'width': targetWidth
            }, 500);
          } else {
            $target.animate({
              'width': 0
            }, 500, function () {
              $target.hide();
            });
          }
        }
      });
    }
  }

  /**
   * add Adobe Analytics Tag to Shariff
   */
  function addSNSAnalyticsTags(snsName) {
    s.linkTrackVars = "events";
    s.linkTrackEvents = "event11";
    s.events = "event11";
    s.tl(this, 'o', snsName);
  }

  /**
   * C230 Initialize YouTubeModal
   */
  function initYouTubeVideoModal() {
    var $target = $('.c230');
    if (!$target[0]) return;
    var $originOVR = $('.l-overlay');

    $target.each(function (index, el) {
      var $self = $(this);
      var $movieBlock = $self.find('.l-YouTubeVideo__movieBlock__outer');
      $movieBlock.ready(function () {
        createShariffModal($self, $movieBlock, $originOVR);
      });
    });

    var timer = function ($target) {
      setTimeout(function () {
        if (0 < $('.js-youtubeModal').length) {
          $('.js-youtubeModal').off('click');
          $target.find('.js-modalTrigger').on('click.kms', onClickYouTubeVideoModal);
          $('.js-closeModal').on('click.kms', function () {
            event.stopPropagation();
            $('.js-overlay').fadeOut();
          });
        } else {
          timer($target);
        }
      }, 1000)
    };

    timer($target);

    $originOVR.remove();
  }

  function createShariffModal($c230, $movieBlock, $originOVR) {
    $originOVR.clone().appendTo($movieBlock);
    var services = "[&quot;facebook&quot;,&quot;twitter&quot;]";
    var title = $c230.find('.g-YouTubeVideo__textBlock__title__link').text();
    var url = encodeURI($c230.data('video-url'));

    var $contents = $('<div class="l-modal__contents"></div>');
    var $share = $('<h2 class="g-modal__contents__title l-modal__contents__title">SHARE:</h2>');
    var $urlElm = $('<div class="modalURL">' +
      '<a class="modalURL__link" href="' + url + '">' +
      url + '</a>' +
      '</div>');
    var $shariff = $('<div class="shariff"' +
      ' data-services="' + services + '"' +
      ' data-title="' + title + '"' +
      ' data-url="' + url + '"' +
      '></div>');
    var $modal = $movieBlock.find('.l-modal__inner');
    $modal
      .append($contents)
    $contents
      .append($share)
      .append($urlElm)
      .append($shariff);
    $shariff.shariff = new Shariff($shariff);
  }

  function onClickYouTubeVideoModal(events) {
    event.stopPropagation();
    var $youtubeElm = $(this).closest('.c230');
    $youtubeElm.find('.js-overlay').fadeIn();
    var $shareList = $(this).find('.g-modal__contents__shareList');
  }

  /**
   * C370 Facebook Post Item
   */
  function init370() {
    var $target = $('.c370');
    if (!$target[0]) return;

    var targetSelector = '.l-FacebookPostUnit';
    var linkElmSelector = '.l-FacebookPost__textBlock__listItem__link';
    var urlElmSelector = '.l-FacebookPost__textBlock__visit__link';

    var timer = function () {
      setTimeout(function () {
        var $target = $(targetSelector);
        if (0 < $target.length) {
          replaceShareLink($target, linkElmSelector, urlElmSelector);
        } else {
          timer();
        }
      }, 1000)
    };

    timer();
  }

  /**
   * C375 Twitter Post Item
   */
  function init375() {
    var $target = $('.c375');
    if (!$target[0]) return;

    var targetSelector = '.l-TwitterPostUnit';
    var linkElmSelector = '.l-TwitterPost__contentsBlock__links__item__link';
    var urlElmSelector = '.l-TwitterPost__contentsBlock__visit__link';

    var timer = function () {
      setTimeout(function () {
        var $target = $(targetSelector);
        if (0 < $target.length) {
          replaceShareLink($target, linkElmSelector, urlElmSelector);
        } else {
          timer();
        }
      }, 1000)
    };

    timer();
  }

  function replaceShareLink($target, linkElmSelector, urlElmSelector) {
    $target.each(function (index, el) {
      var $urlElm = $(el).find(urlElmSelector);
      var $linkElm = $(el).find(linkElmSelector);
      var url = $urlElm.attr('href');
      $linkElm.removeAttr('onclick');
      $linkElm.attr('href', url);
      $linkElm.attr('target', '_blank');
    });
  }

  /**
   * C450 COOKIE BAR
   */
  function initC450() {
    var $cookieBar = $('.js-cookieBar');
    if (!$cookieBar[0]) return;
    var $kmsHeader = $('.kmsHeader, .kmsBrandHeader');

    var lang = $('html').attr('lang');
    var cookieName = 'kmshair-acceptCookie_' + lang;

    if (isAuthorring) {
      $cookieBar.css('display', 'block');
      return;
    }

    if (checkExistCookie(cookieName)) {
      $cookieBar.remove();
      $kmsHeader.addClass('fixed');
      return;
    }
    $cookieBar.css('display', 'block');
    var $window = $(window);
    var cookieBarHeight = $cookieBar.height();

    // Cookieページへのリンク先をURLより判別（暫定対応）
    var location, lang, href, strAry;
    location = window.location.href;
    // （マスター以外の処理）
    if (location.indexOf('inc-common') < 0 && location.indexOf('master') < 0) {
      var $cookieLink = $cookieBar.find('.c450__text a');

      // var domain = 'www-kmshair-com'; //debug
      var domain = 'www.kmshair.com';
      if (location.indexOf(domain) > -1) {
        // 本番の場合
        // locationから国・言語判別
        strAry = location.split('/');
        for (var i = 0; i < strAry.length; i++) {
          if (strAry[i].indexOf(domain) > -1) lang = strAry[i + 1];
        };
        // リンク先を書き換え（Previewの場合でも内部でリンクさせる）
        href = '/' + lang + '/Cookies/';
      } else {
        // 本番以外の場合
        // locationから国・言語判別（www-kmshair-comから2階層分を抜き出す）
        var startStr = 'www-kmshair-com';
        strAry = location.split('/');
        for (var i = 0; i < strAry.length; i++) {
          if (strAry[i].indexOf(startStr) > -1) lang = strAry[i + 1] + '/' + strAry[i + 2];
        };
        // リンク先を書き換え（Previewの場合でも内部でリンクさせる）
        href = '/content/wcm_kao/sites/kaousa/www-kmshair-com/' + lang + '/Cookies.html';
      }
      $cookieLink.attr('href', href);
    }

    $window.scroll(function () {
      if ($cookieBar.is(':hidden')) return;
      if ($(this).scrollTop() > cookieBarHeight || $('#area-Contents').hasClass('is-fixbody')) {
        $kmsHeader.addClass('fixed');
      } else {
        $kmsHeader.removeClass('fixed');
      }
    });

    var $acceptButton = $('#js-didAcceptCookie');
    $acceptButton.on('click', function () {
      // write cookie
      document.cookie = (cookieName + '=true; path=/');
      $cookieBar.css('display', 'none');
      $kmsHeader.addClass('fixed');
    });
  }

  function checkExistCookie(cookieName) {
    var cookieStr = document.cookie;
    var cookies = cookieStr.split('; ');
    var regexp = new RegExp(cookieName + '(.*)');
    for (var i = 0, len = cookies.length; i < len; i++) {
      if (cookies[i].match(regexp)) return true;
    }
    return false;
  }

  /**
   * C450x COOKIE BAR
   */
  function initC450x() {
    var $cookieBar = $('.js-cookieBarX');
    if (!$cookieBar[0]) return;

    // ButtonAction
    $('#kms_cookieOverlay_accept').on('click', function (event) {
      toggleC450x(false, '.c450x__cookieBar__box--confirm');
    });
    $('#kms_cookieOverlay_decline').on('click', function (event) {
      toggleC450x(false, '.c450x__cookieBar__box--confirm', function () {
        toggleC450x(true, '.c450x__cookieBar__box--nopage');
      });
    });

    // cookie page
    var $cookieButtons = $('.c450x__cookieButtons');
    if ($cookieButtons[0]) {
      $('#kms_cookieButtons_accept').on('click', function (event) {
        $cookieButtons.fadeOut(200);
      });
      $('#kms_cookieButtons_decline').on('click', function (event) {
        toggleC450x(true, '.c450x__cookieBar__box--nopage');
      });
    }

  }

  /**
   * C450x COOKIE BAR
   */
  function toggleC450x(flg, target, callback) {
    var $overlay = $('.c450x__cookieBar');
    var $popup = $(target);
    if (!$overlay[0] || !$popup[0]) return;

    if (flg) {
      $overlay.fadeIn(200);
      $popup.fadeIn(400, callback);
    } else {
      $overlay.fadeOut(200);
      $popup.fadeOut(400, callback);
    }
  }

  /**
   * C450x COOKIE BAR show overlay
   */
  kmsAPI.showCookieOverlay = function () {
    toggleC450x(true, '.c450x__cookieBar__box--confirm');
  }

  /**
   * C450x COOKIE BAR show cookie page buttons
   */
  kmsAPI.showCookieButtons = function () {
    var $cookieButtons = $('.c450x__cookieButtons');
    if (!$cookieButtons[0]) return;
    $cookieButtons.fadeIn();
  }

  /**
   * FIX Body
   *
   * @param boolean
   * @return none
   */
  var current_scrollY;

  function fixBody(flg) {
    if (flg) {
      current_scrollY = $(window).scrollTop();

      $('#area-Contents').css({
        position: 'fixed',
        width: '100%',
        top: -1 * current_scrollY
      }).addClass('is-fixbody');
      $('#area-BrFooter').css({
        position: 'fixed',
        width: '100%',
        top: (-1 * current_scrollY) + $('#area-Contents').height()
      });
    } else {
      $('#area-Contents').attr({
        style: ''
      }).removeClass('is-fixbody');
      $('#area-BrFooter').attr({
        style: ''
      });
      $('html, body').prop({
        scrollTop: current_scrollY
      });
    }
  }

  /**
   * C030 FAQ
   */
  function initC030() {
    var $target = $('.js-c030 .l-HeadingTitle__titleBlock');
    if (!$target[0]) return;

    if (isAuthorring) {
      $target.parents('.l-AccordionUnit').addClass('is-open');
      $target.parents('.l-AccordionUnit').find('.l-AccordionUnit__contentBlock').height(auto);
      return;
    }

    var speed = 500;
    var animating = false;

    $target.on('click', function (el) {
      if (animating) return;

      var $unit = $(this).parents('.l-AccordionUnit');
      animating = true;

      if ($unit.hasClass('is-open')) {
        closeC030($unit, speed, function () {
          animating = false;
        });
      } else {
        openC030($unit, speed, function () {
          animating = false;
        });
      }
    });

    $(window).resize(function () {
      adjustC030($target.parents('.l-AccordionUnit'));
      checkC030($target.parents('.l-AccordionUnit'));
    });
  }

  function closeC030($unit, speed, callback) {
    var $toggle = $unit.find('.l-AccordionUnit__contentBlock');
    var $richtext = $toggle.find('> .l-Text > .cmn-richtext');
    var closedHeight = '1.5em';

    $richtext.css({
      'height': 'auto',
      'white-space': 'normal'
    });
    $unit.removeClass('is-open');
    $toggle.height(closedHeight);

    $toggle.on('oTransitionEnd mozTransitionEnd webkitTransitionEnd transitionend', function () {
      $richtext.css({
        'height': closedHeight,
        'white-space': 'nowrap'
      });
      if (typeof callback === 'function') {
        callback();
      }
      $toggle.off('oTransitionEnd mozTransitionEnd webkitTransitionEnd transitionend');
    });
  }

  function openC030($unit, speed, callback) {
    var $toggle = $unit.find('.l-AccordionUnit__contentBlock');
    var $richtext = $toggle.find('> .l-Text > .cmn-richtext');
    var opendHeight;

    $richtext.css({
      'height': 'auto',
      'white-space': 'normal'
    });
    $unit.addClass('is-open');
    opendHeight = $richtext.height();
    $toggle.height(opendHeight);

    $toggle.on('oTransitionEnd mozTransitionEnd webkitTransitionEnd transitionend', function () {
      if (typeof callback === 'function') {
        callback();
      }
      $toggle.off('oTransitionEnd mozTransitionEnd webkitTransitionEnd transitionend');
    });
  }

  function adjustC030($target) {
    var $opend = $target.filter('.is-open');

    if (!$opend[0] || isAuthorring) return;

    $opend.each(function (index, el) {
      var $toggle = $(el).find('.l-AccordionUnit__contentBlock');
      var $richtext = $toggle.find('> .l-Text > .cmn-richtext');

      if ($toggle.height() != $richtext.height()) {
        $toggle.height($richtext.height());
      }
    });
  }

  function checkC030($target) {
    var opendHeight, closeHeight;
    $target.each(function (index, el) {
      var $toggle = $(el).find('.l-AccordionUnit__contentBlock');
      var $richtext = $toggle.find('> .l-Text > .cmn-richtext');
      var $me = $(this);

      if ($(el).hasClass('is-open')) {
        openHeight = $richtext.height();
        $richtext.css({
          'height': '1.5em',
          'white-space': 'nowrap'
        });
        closeHeight = $richtext.height();
        $richtext.css({
          'height': 'auto',
          'white-space': 'normal'
        });
      } else {
        closeHeight = $richtext.height();
        $richtext.css({
          'height': 'auto',
          'white-space': 'normal'
        });
        openHeight = $richtext.height();
        $richtext.removeAttr('style');
      }

      if (openHeight == closeHeight) {
        $me.addClass('is-disable');
        console.log(openHeight);
      } else if ($target.hasClass('is-disable')) {
        $me.removeClass('is-disable');
      }
    });
  }


  function c182_Carousel() {
    var $target = $('.js-c182__carousel');

    if (!$target[0] || isAuthorring) return;

    $target.slick({
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: false,
      dots: true,
      infinite: true,
      accessibility: false
    });
  }
})(window, window.kmsAPI || (window.kmsAPI = {}));


// KMS redesign

$(document).ready(function () {

  $('.mf_finder_searchBox_form').attr('spellcheck', 'false');
  if ($(window).width() >= 1025) {
    $(".main-nav li").mouseover(function () {
      $(".g-GroupBox, .over-navigation").addClass("on-hover");
    });

    $(".over-navigation").mouseleave(function () {
      $(".g-GroupBox, .over-navigation").removeClass("on-hover");

    });
  }
  $('.mobile-toggle button').click(function () {
    $(this).toggleClass('open');
  });

  if ($(window).width() < 1025 && $(window).width() >= 640) {
    $(".mobile-toggle").click(function (e) {
      var open = $("mobile-toggle button").hasClass('open');
      if ($(".main-nav,.over-navigation").css('display') == 'none' && !open) {
        $(".over-navigation").fadeIn(500).css('display', 'block');
        $(".main-nav").fadeIn(500).css("display", "flex");
        // .fadeIn(4000);
        $(".g-GroupBox,.kmsHeaderSearchBlock").fadeIn(500).css('display', 'block');
      } else
        $(".main-nav,.g-GroupBox,.kmsHeaderSearchBlock,.over-navigation").fadeOut();
    });
  }

  // mobile

  if ($(window).width() < 640) {
    $("li.g-ListP__ul__item").has(".g-GroupBox").addClass("arrow");

    $(".mobile-toggle").click(function (e) {
      var open = $("mobile-toggle button").hasClass('open');
      if ($(".main-nav,.over-navigation").css('display') == 'none' && !open) {
        $(".over-navigation").fadeIn(500).css('display', 'block');
        $(".main-nav,.kmsHeaderSearchBlock").fadeIn(500).css('display', 'block');
      } else
        $(".main-nav,.kmsHeaderSearchBlock,.over-navigation").fadeOut() //css('display', 'none') //.fadeOut();
    });

    $(".arrow").click(function (e) {
      $(this).toggleClass("is-open");
      $(this).children(".g-GroupBox").toggleClass("on-hover");
      e.stopPropagation();
    });

    var a = $('.over-navigation').detach()

    $('.main-nav').append(a);
  }

  if ($(window).width() >= 640) {

    $('.kmsHeaderSearchBlock .mf_finder_searchBox_submit').click(function (e) {
      $('.kmsHeaderSearchBlock .mf_finder_searchBox_query_wrap')
        .toggleClass('on')
        .focus();
      if (
        $('.kmsHeaderSearchBlock .mf_finder_searchBox_query_wrap').css('display').toLowerCase() == 'block'
      ) {
        event.preventDefault();
        $('.main-nav').css('display', 'none');
        $('.over-navigation').css('display', function() {
          if ($(window).width() < 1025) {
            return 'none';
          }
        });
        $('.kmsHeaderSearchBlock').css('width', function () {
          if ($(window).width() < 1025) {
            return '79%';
          } else {
            return '89%';
          }
        });
        $('.mobile-toggle').css('display', 'none');
        $('.mf_finder_searchBox_items').append("<a class='close'></a>");

      } else {
        var x = $('.mf_finder_searchBox_query_input').val();
        if (x.length >= 1) {
          $('.close').remove();
          return true;
        } else {
          event.preventDefault();
          $('.main-nav').css('display', 'flex');
          $('.over-navigation').css('display', function () {
            if ($(window).width() < 1025) {
              return 'block';
            }
          });
          $('.kmsHeaderSearchBlock').css('width', 'auto');
          $('.close').remove();
          if ($(window).width() < 1025) {
            $('.mobile-toggle').css('display', 'block');
          } else {
            $('.mobile-toggle').css('display', 'none');

          }
        }
      }

      $('.close').click(function () {
        $('.main-nav').css('display', 'flex');
        $('.over-navigation').css('display', function () {
          if ($(window).width() < 1025) {
            return 'block';
          }
        });
        $('.kmsHeaderSearchBlock .mf_finder_searchBox_query_wrap').removeClass('on');
        $('.kmsHeaderSearchBlock').css('width', 'auto');
        $('.close').remove();
        if ($(window).width() < 1025) {
          $('.mobile-toggle').css('display', 'block');
        } else {
          $('.mobile-toggle').css('display', 'none');

        }

      })

    
     
    });
    // $('.mf_finder_searchBox_submit').click(function (e) {
    //   e.preventDefault();
    //   $('.main-nav').css('display', 'none');
    //   $('.kmsHeaderSearchBlock').css('width', '89%');
    //   $('.mf_finder_searchBox_query_wrap').css('display', 'block');
    // });

    // $(document).click(function (e) {
    //   if (!$('.mf_finder_searchBox_submit').is(e.target)) {
    //     e.preventDefault();
    //     $('.main-nav').css('display', 'block');
    //     $('.kmsHeaderSearchBlock').css('width', 'auto');
    //     $('.mf_finder_searchBox_query_wrap').css('display', 'none');
    //   }
    // });
  }

});