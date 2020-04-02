'use strict';
/*-----------------------*/
//
// $.fn.extend
//
/*-----------------------*/
$.fn.extend({


  /* -----------------------*/
  // オーサ画面かどうかの判別
  // ※ オーサ用jsでメソッドごと上書きしてtrueを返却
  // @return true/false
  /* -----------------------*/
  isAuthorring: function() {
    return window.kaoAPI.isAuthorring;
  },


  /* -----------------------*/
  // ブレークポイント取得
  // @return lg/md/sm
  /* -----------------------*/
  getBreakpoint: function() {
    var bp;
    if ($('#js-breakpoint--lg').is(':visible')) {
      bp = "lg";
    } else if ($('#js-breakpoint--md').is(':visible')) {
      bp = "md";
    } else if ($('#js-breakpoint--sm').is(':visible')) {
      bp = "sm";
    }
    return bp;
  },


  /* -----------------------*/
  // ブレークポイント判別（Large）
  // @return true/false
  /* -----------------------*/
  isBreakpointLg: function() {
    if ($('#js-breakpoint--lg').is(':visible')) return true;
    else return false;
  },


  /* -----------------------*/
  // ブレークポイント判別（Middle）
  // @return true/false
  /* -----------------------*/
  isBreakpointMd: function() {
    if ($('#js-breakpoint--md').is(':visible')) return true;
    else return false;
  },


  /* -----------------------*/
  // ブレークポイント判別（Small）
  // @return true/false
  /* -----------------------*/
  isBreakpointSm: function() {
    if ($('#js-breakpoint--sm').is(':visible')) return true;
    else return false;
  },


  /* -----------------------*/
  // ブランドヘッダ高さ取得
  // @return number
  /* -----------------------*/
  getBrandHeaderHeight: function() {
    var getBHeaderHeight = 0;
    if($('.g-BlHeader').length > 0){
      getBHeaderHeight = $('.g-BlHeader').height();
    }
    return getBHeaderHeight;
  },


  /* -----------------------*/
  // ヘッダーの高さを返す
  // @return BrHeader or 0
  /* -----------------------*/
  getBrHeaderFixedHeight: function() {
    var $gBrHeader = $('.g-BrHeader');
    var headerHeight = 0;
    if($gBrHeader.length > 0){
      var fixedFlagLg  = _changeBoolean($gBrHeader.attr('data-fixed-lg'));
      var fixedFlagMd  = _changeBoolean($gBrHeader.attr('data-fixed-md'));
      var fixedFlagSm  = _changeBoolean($gBrHeader.attr('data-fixed-sm'));

      if(fixedFlagLg === true){
        headerHeight = $gBrHeader.height();
      }

      if(fixedFlagMd === true){
        headerHeight = $gBrHeader.height();
      }

      if(fixedFlagSm === true){
        headerHeight = $gBrHeader.height();
      }
    }

    function _changeBoolean(str) {
      if(str === "true")  return true;
      else                return false;
    }

    return headerHeight;
  },


  /* -----------------------*/
  // スマホ用クリック
  //
  // @notpreventtap　タップ禁止処理をする（デフォルトtrueとする）
  /* -----------------------*/
  onSpClick: function($itemOrCallback, callback, preventtap, preventdefault) {

    var me = this;
    //明示的にfalseでない場合、連続タップ禁止
    if (preventtap !== false) {
      preventtap = true;
    }
    //明示的にfalseでない場合、バブリング禁止
    if (preventdefault !== false) {
      preventdefault = true;
    }
    if (typeof callback === 'boolean') {
      preventtap = callback;
    }

    var $target = $itemOrCallback;
    if (typeof $itemOrCallback === 'function') {
      callback = $itemOrCallback;
      $target = null;
    }

    var movieVal = 3;

    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchMoveX = 0;
    this.touchMoveY = 0;
    this.on({
      'touchstart': function(e) {

        var $self = $(e.currentTarget);
        $self.data('isTouch', true);
        var touches = e.originalEvent.touches[0];

        $self.data('touchStartX', touches.pageX);
        $self.data('touchStartY', touches.pageY);
        $self.data('touchMoveX', 0);
        $self.data('touchMoveY', 0);

        $self.addClass('hover');

        //タッチが可能な場合はクリックはオフ
        me.off('click');
        // return false;
      },
      'touchmove': function(e) {

        var $self = $(e.currentTarget);
        var touches = e.originalEvent.changedTouches[0];
        var touchMoveX = touches.pageX;
        var touchMoveY = touches.pageY;
        var touchStartX = $self.data('touchStartX');
        var touchStartY = $self.data('touchStartY');
        $self.data('touchMoveX', touchMoveX);
        $self.data('touchMoveY', touchMoveY);

        var moviedX = Math.abs(touchMoveX - touchStartX);
        var moviedY = Math.abs(touchMoveY - touchStartY);

        if (moviedX > movieVal || moviedY > movieVal) {

          $self.data('isTouch', false);
          $self.removeClass('hover');
        }
      },
      'touchend': function(e) {

        var $self = $(e.currentTarget);
        // console.log('touchend', $self, 'isTouch', $self.data('isTouch'));

        $self.removeClass('hover');

        if ($self.data('isTouch')) {

          callback = $.proxy(callback, e.currentTarget);
          if (callback) callback(e.currentTarget);

          if (preventtap) {
            $self.addClass('preventtap'); //連続タップ禁止

          }
          if (preventdefault) {
            return false;
          }

        } else {
          // alert('isTouchがないよ');
        }

        $self.data('isTouch', false);

      },
      'mouseover': function(e) {
        var $self = $(e.currentTarget);
        $self.addClass('hover');
      },
      'mouseout': function(e) {
        var $self = $(e.currentTarget);
        $self.removeClass('hover');
      },
      'click': function(e) {
        var $self = $(e.currentTarget);

        // $self.addClass('hover');

        callback = $.proxy(callback, e.currentTarget);
        if (callback) callback(this);

        if (preventtap) {
          $self.addClass('preventtap'); //連続タップ禁止
        }
        if (preventdefault) {
          return false;
        }
        // return false;
      }
    }, $target);

    return this;

  },

  /*-----------------------*/
  // スマホ用クリック解除
  /*-----------------------*/
  offSpClick: function(target) {

    if (!target) target = null;

    this.off('touchstart', target);
    this.off('touchmove', target);
    this.off('touchend', target);
    this.off('click', target);
    return this;
  },

  /*-----------------------*/
  // 要素の位置を取得する
  /*-----------------------*/
  isElementAfter: function(elem){
    return this.prevAll().filter(elem).length !== 0;
  },

  isElementBefore: function(elem){
    return this.nextAll().filter(elem).length !== 0;
  },


  /*-----------------------*/
  // テキスト中のリンクをa要素で置き換える
  /*-----------------------*/
  replaceLink: function(str, target) {
    return str.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&amp;%@!&#45;\/]))?)/g,'<a href="$1" target="'+ target +'">$1</a>');
  }
});
