/**
 * Foundation GUI Common use.
 */
(function(window, foundationAPI) {

  var $form = $('#js-inputForm');

  initHeader();
  initColors($('.js-inputColor'));
  initLinkButton($('.js-anchor'));
  initAccordion($('.js-accordion'));
  initValidation();
  initReset();
  initLetterSpacing();
  resetIcon();
  showIEnote();

  /*-----------------------*/
  // リサイズイベント処理
  /*-----------------------*/
  $(window).on('resize', function() {
    fitHeaderHeight();
  });


  $('.uploadFile__select__file').hover(
    function() {
      $('.uploadFile__select__label').addClass('hover');
    },
    function() {
      $('.uploadFile__select__label').removeClass('hover');
    }
  );

  /**
   * initialize Header
   *
   * @return None
   */
  function initHeader() {

    var $formSubName = $('.js-editSubDesignName');
    if ($formSubName[0]) {
      $('#editSubDesignName').on('click', function(event) {
        $formSubName.addClass('is-edit');
      });
    }

    fitHeaderHeight();
  }


  /**
   * fit Header Height
   *
   * @return None
   */
  function fitHeaderHeight() {
    var $header = $('.header');
    var $base = $('.formArea');
    $base.css('padding-top', $header.outerHeight());
  }


  /**
   * initialize color picker
   *
   * @param jQuery
   * @return None
   */
  function initColors($target) {
    if($target[0]) {
      $target.spectrum({
        preferredFormat: "hex",
        showInput: true,
        allowEmpty:true,
        showAlpha: true,
        change: function(color) {
          var $me = $(this);
          if(color == null) {
            $me.val('transparent');
            $me.siblings('.inputList__item--color__value').text('None');
          } else {
            if(color.getAlpha() < 1) {
              $me.val(color.toRgbString());
            }
            if($me.val() != 'transparent' && $me.val() != '') {
              $me.siblings('.inputList__item--color__value').text($me.val());
            } else {
              $me.siblings('.inputList__item--color__value').text('None');
            }
          }
        },
        hide: function()  {
          var $me = $(this);
          var color = $me.siblings('.inputList__item--color__value').text();
          color = color.replace(/None/, "transparent");
          $me.spectrum("set", color);
        }
      }).each(function(){
        var $me = $(this);

        if($me.val() != 'transparent' && $me.val() != '') {
          $me.siblings('.inputList__item--color__value').text($me.val());
        } else {
          $me.siblings('.inputList__item--color__value').text('None');
        }
      });
    }
  }


  /**
   * ターゲットまでスムーズスクロールする
   *
   * @param $destElem　ターゲット
   */
  function scrollToDestElem($destElem) {
    var headerHeight = $('.header--foundationGUI').outerHeight(true);
    if ($destElem && $destElem.length > 0) {
      var scrollTime = 500;
      var destPoint = $destElem.offset().top - headerHeight;
      if (destPoint < 0) {
        destPoint = 0;
      }
      $('html, body').animate({scrollTop: destPoint}, scrollTime, "swing");
    }
  }

  /**
   * Link/button　アンカー の初期化
   */
  function initLinkButton($target) {
    if($target[0]) {
      $target.each(function(index){
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
  }

  /**
   * initialize accordion
   *
   * @param jQuery
   * @return None
   */
  function initAccordion($trigger) {
    var speed = 500;
    if($trigger[0]) {
      $trigger.each(function(){
        var $me = $(this);
        var $target = $($me.data('target'));
        if($target[0]) {
          $me.on('click', function(){
            if($target.is(':animated')) {
              return false;
            }

            if($target.hasClass('is-open')) {
              $target.slideUp(speed, function(){
                $target.removeClass('is-open').addClass('is-close');
                $me.removeClass('is-open').addClass('is-close');
              })
            } else {
              $target.slideDown(speed, function(){
                $target.removeClass('is-close').addClass('is-open');
                $me.removeClass('is-close').addClass('is-open');
              })
            }
          });
        }
      });
    }
  }

  /**
   * initialize validation
   *
   * @param jQuery
   * @return None
   */
  function initValidation() {
    // 整数チェック
    $.validator.addMethod('integer', function(value, element) {
      return this.optional( element ) || /^\d*$/.test( value );
    }, '整数を入力して下さい。');
    // 小数チェック
    $.validator.addMethod('floatVal', function(value, element) {
      return this.optional( element ) || /^[\d]*[\.]?[\d]*$/.test( value );
    });
    // 実数チェック
    $.validator.addMethod('number', function(value, element) {
      return this.optional( element ) || /^-?[\d]*[\.]?[\d]*$/.test( value );
    });

    // fontFamilyがCSS構文エラーしていないかチェック
    $.validator.addMethod('fontfamily', function(value, element) {
      var properties = value.split(",");
      var regex_multiByte = /[^\x01-\x7E]/;            // マルチバイト文字が含まれている
      var regex_space = /^.*\s.*/;                     // 半角スペースが含まれている
      var regex_quotationInText = /^.((?!('|")).)*.$/; // 行中にシングル・ダブルコーテーションが含まれていない
      var regex_singleQuotation = /^'.*'$/;            // シングルコーテーションで囲まれている
      var regex_doubleQuotation = /^".*"$/;            // ダブルコーテーションで囲まれている

      var checkQuotation = function() {
        return (regex_singleQuotation.test(property) || regex_doubleQuotation.test(property));
      };

      for (var i = 0; i < properties.length; i++) {
        var property = properties[i].trim();
        if(regex_quotationInText.test(property) === false) {
          return false;
        }
        if(/^('|")/.test(property) || /('|")$/.test(property)) {
          if(checkQuotation() === false) return false;
        }
        if(regex_space.test(property) || regex_multiByte.test(property)) {
          if(checkQuotation() === false) return false;
        }
      }
      return true;
    }, 'フォントファミリーの指定が正しくありません');

    var $footerButton = $('#js-submit');
    var ruleInteger = 'integer';
    var ruleFloat = {floatVal: true, step: 0.000001};
    var ruleNumber = {number: true, step: 0.000001};
    var ruleFontfamily = {fontfamily: true, required: false};

    $form.validate({
      errorClass: 'is-error',
      errorContainer: '.footer__error',
      messages: {required: '必須項目です'},
      errorPlacement: function(error, element) {
        error.appendTo(element.parent('.inputList__item--fontFamily')); // fontFamilyの場合のみ、エラー出力
      },
      highlight: function(element, errorClass) {
        $(element).addClass(errorClass);
        if(0 < $('input.is-error').length) {
          $footerButton.addClass('disabled');
          $footerButton.prop('disabled', true);
        }
      },
      unhighlight: function(element, errorClass) {
        $(element).removeClass(errorClass);
        if(0 === $('input.is-error').length) {
          $footerButton.removeClass('disabled');
          $footerButton.prop('disabled', false);
        }
      },
      rules: {
        'sub_design_name': {required: true},
        // integer
        'margin-section-sm': ruleInteger,
        'margin-section-md': ruleInteger,
        'margin-section-lg': ruleInteger,
        'margin-column-sm-s': ruleInteger,
        'margin-column-sm-m': ruleInteger,
        'margin-column-sm-l': ruleInteger,
        'margin-column-sm-xl': ruleInteger,
        'margin-column-md-s': ruleInteger,
        'margin-column-md-m': ruleInteger,
        'margin-column-md-l': ruleInteger,
        'margin-column-md-xl': ruleInteger,
        'margin-column-lg-s': ruleInteger,
        'margin-column-lg-m': ruleInteger,
        'margin-column-lg-l': ruleInteger,
        'margin-column-lg-xl': ruleInteger,
        'margin-groupbox-sm-s': ruleInteger,
        'margin-groupbox-sm-m': ruleInteger,
        'margin-groupbox-sm-l': ruleInteger,
        'margin-groupbox-sm-xl': ruleInteger,
        'margin-groupbox-md-s': ruleInteger,
        'margin-groupbox-md-m': ruleInteger,
        'margin-groupbox-md-l': ruleInteger,
        'margin-groupbox-md-xl': ruleInteger,
        'margin-groupbox-lg-s': ruleInteger,
        'margin-groupbox-lg-m': ruleInteger,
        'margin-groupbox-lg-l': ruleInteger,
        'margin-groupbox-lg-xl': ruleInteger,
        'margin-item-sm-xs': ruleInteger,
        'margin-item-sm-s': ruleInteger,
        'margin-item-sm-m': ruleInteger,
        'margin-item-sm-l': ruleInteger,
        'margin-item-sm-xl': ruleInteger,
        'margin-item-md-xs': ruleInteger,
        'margin-item-md-s': ruleInteger,
        'margin-item-md-m': ruleInteger,
        'margin-item-md-l': ruleInteger,
        'margin-item-md-xl': ruleInteger,
        'margin-item-lg-xs': ruleInteger,
        'margin-item-lg-s': ruleInteger,
        'margin-item-lg-m': ruleInteger,
        'margin-item-lg-l': ruleInteger,
        'margin-item-lg-xl': ruleInteger,
        'fontsize-h1-sm': ruleInteger,
        'fontsize-h1-md': ruleInteger,
        'fontsize-h1-lg': ruleInteger,
        'fontsize-h2-sm': ruleInteger,
        'fontsize-h2-md': ruleInteger,
        'fontsize-h2-lg': ruleInteger,
        'fontsize-h3-sm': ruleInteger,
        'fontsize-h3-md': ruleInteger,
        'fontsize-h3-lg': ruleInteger,
        'fontsize-h4-sm': ruleInteger,
        'fontsize-h4-md': ruleInteger,
        'fontsize-h4-lg': ruleInteger,
        'fontsize-h5-sm': ruleInteger,
        'fontsize-h5-md': ruleInteger,
        'fontsize-h5-lg': ruleInteger,
        'fontsize-h6-sm': ruleInteger,
        'fontsize-h6-md': ruleInteger,
        'fontsize-h6-lg': ruleInteger,
        'fontsize-p-sm': ruleInteger,
        'fontsize-p-md': ruleInteger,
        'fontsize-p-lg': ruleInteger,
        'fontsize-body-sm': ruleInteger,
        'fontsize-body-md': ruleInteger,
        'fontsize-body-lg': ruleInteger,
        'fontsize-caption-sm': ruleInteger,
        'fontsize-caption-md': ruleInteger,
        'fontsize-caption-lg': ruleInteger,
        'fontsize-brandheader-sm': ruleInteger,
        'fontsize-brandheader-md': ruleInteger,
        'fontsize-brandheader-lg': ruleInteger,
        'fontsize-lnavicategory-sm': ruleInteger,
        'fontsize-lnavicategory-md': ruleInteger,
        'fontsize-lnavicategory-lg': ruleInteger,
        'fontsize-lnavilabel-sm': ruleInteger,
        'fontsize-lnavilabel-md': ruleInteger,
        'fontsize-lnavilabel-lg': ruleInteger,
        'fontsize-breadcrumb': ruleInteger,
        'fontsize-bfootcategory-sm': ruleInteger,
        'fontsize-bfootcategory-md': ruleInteger,
        'fontsize-bfootcategory-lg': ruleInteger,
        'fontsize-bfootlabel-sm': ruleInteger,
        'radius-xs': ruleInteger,
        'radius-s': ruleInteger,
        'radius-m': ruleInteger,
        'radius-l': ruleInteger,
        'radius-xl': ruleInteger,
        'shadow-a-x': ruleInteger,
        'shadow-a-y': ruleInteger,
        'shadow-a-blur': ruleInteger,
        'shadow-a-spread': ruleInteger,
        'shadow-b-x': ruleInteger,
        'shadow-b-y': ruleInteger,
        'shadow-b-blur': ruleInteger,
        'shadow-b-spread': ruleInteger,
        'line-hr-r': ruleInteger,
        'line-hr-b': ruleInteger,
        'line-hr-eb': ruleInteger,
        'line-border-r': ruleInteger,
        'line-border-b': ruleInteger,
        'line-border-eb': ruleInteger,
        // float
        'lineheight-h1-sm': ruleFloat,
        'lineheight-h1-md': ruleFloat,
        'lineheight-h1-lg': ruleFloat,
        'lineheight-h2-sm': ruleFloat,
        'lineheight-h2-md': ruleFloat,
        'lineheight-h2-lg': ruleFloat,
        'lineheight-h3-sm': ruleFloat,
        'lineheight-h3-md': ruleFloat,
        'lineheight-h3-lg': ruleFloat,
        'lineheight-h4-sm': ruleFloat,
        'lineheight-h4-md': ruleFloat,
        'lineheight-h4-lg': ruleFloat,
        'lineheight-h5-sm': ruleFloat,
        'lineheight-h5-md': ruleFloat,
        'lineheight-h5-lg': ruleFloat,
        'lineheight-h6-sm': ruleFloat,
        'lineheight-h6-md': ruleFloat,
        'lineheight-h6-lg': ruleFloat,
        'lineheight-p-sm': ruleFloat,
        'lineheight-p-md': ruleFloat,
        'lineheight-p-lg': ruleFloat,
        'lineheight-body-sm': ruleFloat,
        'lineheight-body-md': ruleFloat,
        'lineheight-body-lg': ruleFloat,
        'lineheight-caption-sm': ruleFloat,
        'lineheight-caption-md': ruleFloat,
        'lineheight-caption-lg': ruleFloat,
        'lineheight-brandheader-sm': ruleFloat,
        'lineheight-brandheader-md': ruleFloat,
        'lineheight-brandheader-lg': ruleFloat,
        'lineheight-lnavicategory-sm': ruleFloat,
        'lineheight-lnavicategory-md': ruleFloat,
        'lineheight-lnavicategory-lg': ruleFloat,
        'lineheight-lnavilabel-sm': ruleFloat,
        'lineheight-lnavilabel-md': ruleFloat,
        'lineheight-lnavilabel-lg': ruleFloat,
        'lineheight-breadcrumb': ruleFloat,
        'lineheight-bfootcategory-sm': ruleFloat,
        'lineheight-bfootcategory-md': ruleFloat,
        'lineheight-bfootcategory-lg': ruleFloat,
        'lineheight-bfootlabel-sm': ruleFloat,
        // number
        'letterspacing-h1-sm': ruleNumber,
        'letterspacing-h1-md': ruleNumber,
        'letterspacing-h1-lg': ruleNumber,
        'letterspacing-h2-sm': ruleNumber,
        'letterspacing-h2-md': ruleNumber,
        'letterspacing-h2-lg': ruleNumber,
        'letterspacing-h3-sm': ruleNumber,
        'letterspacing-h3-md': ruleNumber,
        'letterspacing-h3-lg': ruleNumber,
        'letterspacing-h4-sm': ruleNumber,
        'letterspacing-h4-md': ruleNumber,
        'letterspacing-h4-lg': ruleNumber,
        'letterspacing-h5-sm': ruleNumber,
        'letterspacing-h5-md': ruleNumber,
        'letterspacing-h5-lg': ruleNumber,
        'letterspacing-h6-sm': ruleNumber,
        'letterspacing-h6-md': ruleNumber,
        'letterspacing-h6-lg': ruleNumber,
        'letterspacing-p-sm': ruleNumber,
        'letterspacing-p-md': ruleNumber,
        'letterspacing-p-lg': ruleNumber,
        'letterspacing-body-sm': ruleNumber,
        'letterspacing-body-md': ruleNumber,
        'letterspacing-body-lg': ruleNumber,
        'letterspacing-caption-sm': ruleNumber,
        'letterspacing-caption-md': ruleNumber,
        'letterspacing-caption-lg': ruleNumber,
        'letterspacing-brandheader-sm': ruleNumber,
        'letterspacing-brandheader-md': ruleNumber,
        'letterspacing-brandheader-lg': ruleNumber,
        'letterspacing-lnavicategory-sm': ruleNumber,
        'letterspacing-lnavicategory-md': ruleNumber,
        'letterspacing-lnavicategory-lg': ruleNumber,
        'letterspacing-lnavilabel-sm': ruleNumber,
        'letterspacing-lnavilabel-md': ruleNumber,
        'letterspacing-lnavilabel-lg': ruleNumber,
        'letterspacing-breadcrumb': ruleNumber,
        'letterspacing-bfootcategory-sm': ruleNumber,
        'letterspacing-bfootcategory-md': ruleNumber,
        'letterspacing-bfootcategory-lg': ruleNumber,
        'letterspacing-bfootlabel-sm': ruleNumber,
        // float
        'link-opacity': ruleFloat,
        // fontfamily
        'fontfamily-heading': ruleFontfamily,
        'fontfamily-body': ruleFontfamily,
        'fontfamily-option1': ruleFontfamily,
        'fontfamily-option2': ruleFontfamily,
        'fontfamily-option3': ruleFontfamily,
        'fontfamily-option4': ruleFontfamily,
        'fontfamily-option5': ruleFontfamily,
        'fontfamily-option6': ruleFontfamily,
        'fontfamily-brandheader': ruleFontfamily,
        'fontfamily-brandheader-lg': ruleFontfamily,
        'fontfamily-localnavi-category': ruleFontfamily,
        'fontfamily-localnavi-label': ruleFontfamily,
        'fontfamily-breadcrumb': ruleFontfamily,
        'fontfamily-brandfooter-sm': ruleFontfamily,
        'fontfamily-brandfooter': ruleFontfamily,
        'fontfamily-brandfooter-label': ruleFontfamily,
      }
    });
  }

  /**
   * initialize form reset
   *
   * @param None
   * @return None
   */
  function initReset() {
    $trigger = $('.js-reset');

    if($trigger[0]) {
      $trigger.each(function(){
        var $me = $(this);
        var $target = $($me.data('target'));

        // デフォルト値に戻すボタンのdisableコントロール
        $me.prop('disabled', true);

        $target.find('input[data-default]').each(function(index){
          var $input = $(this);

          $input.on('change', function(){
            if(!propEqCheck($input)) {
              $me.prop('disabled', false);
            } else {
              // 対象エリア全体をチェック
              $me.prop('disabled', true);
              $target.find('input[data-default]').each(function(){
                var $input2 = $(this);
                if(!propEqCheck($input2)) {
                  $me.prop('disabled', false);
                  return;
                }
              });
            }
          });
          $input.change();
        });

        // デフォルト値に戻すボタンclick
        $me.on('click', function(){
          if($me.is(':enabled')) {
            $target.find('input[data-default]').each(function(){
              var $input = $(this);

              if($input.is(':checkbox')) {
                $input.prop('checked', $input.data('default'));
              } else {
                $input.val($input.data('default'));
              }
              $input.change();
              if($input.is('.js-inputColor')) {
                initColors($input);
              }
            });
            // バリデーション
            $form.valid();
          }
        });
      });
    }
  }

  // アップロード済みアイコンのリセット処理
  function resetIcon() {
    $('#js-iconResetTrigger').on('click', function() {
      $('#js-iconResetFlag').val(1);
      $('#js-uploadFiles').fadeOut('fast').queue(function() { $(this).empty(); });
    });
  }

  /**
   * defalt値と入力値を比較
   *
   * @param jQuery
   * @return Bool
   */
  function propEqCheck($input) {
    if($input.is(':checkbox')) {
      if($input.prop('checked') != $input.data('default')) {
        return false;
      }
    } else {
      if($input.val() != $input.data('default')) {
        return false;
       }
    }
    return true;
  }

  function initLetterSpacing() {
    var $trigger = $('.js-letterSpacing');

    if($trigger[0]) {
      $trigger.on('change', function(){
        var $me = $(this);
        var $target = $me.parents('.inputTable__letterSpacing').find('.inputItem--letterSpacing');

        if($me.prop('checked')) {
          $target.prop('disabled', true);
          $target.removeClass('is-error');
        } else {
          $target.prop('disabled', false);
        }
      });
      $trigger.change();
    }
  }

  function showIEnote() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/(msie | MSIE)/) || ua.match(/(T|t)rident/)) {
      $('.js-ieNote').show();
    }
  }

  foundationAPI.showDialog_success = function() {
    var $dialog = $('#js-showDialog_success');
    $dialog.fadeIn(200, function() {
      $(this).delay(1500).fadeOut(400);
    });
  };

  foundationAPI.showDialog_error = function() {
    var $dialog = $('#js-showDialog_error');
    var $close = $dialog.children('.close');

    $dialog.addClass('show');
    $close.on('click', function() {
      $dialog.removeClass('show');
    });
  };

})(window, window.foundationAPI || (window.foundationAPI = {}));
