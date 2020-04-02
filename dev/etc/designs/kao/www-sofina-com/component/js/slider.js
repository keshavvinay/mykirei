/**
 * SOFINAトップ　スライダー
 */

(function() {
  'use strict';

  var ease = 'easeInOutCubic';
  /*-----------------------*/
  // トランジションアニメフォールバック
  /*-----------------------*/
  if (!$.support.transition){
    ease = 'swing';
    $.fn.transition = $.fn.animate;
  }

  var winW;
  var $win = $(window);

  //メインビジュアルが見えているか
  var visualVisible = true;
  //イメージカバーのアルファ
  var imgcoverAlpha = 0.8;
  //オートスライダの開始までの時間
  var autoslidetimerWaitTime = 5000;
  //オートスライダの感覚
  var autoslidetimerDuration = 3000;

  /*-----------------------*/
  //
  // Sliderクラス
  //
  /*-----------------------*/
  function Slider(param) {

    var me = this;

    //プロパティをセット
    for (var item in param) {
      if (!param.hasOwnProperty(item)) continue;
      this[item] = param[item];
    }
    var el = this.el;
    /*-----------------------*/
    // イメージをロード
    /*-----------------------*/
    this.makeImgNode()

    /*-----------------------*/
    // サイドボタン
    /*-----------------------*/
    .then(function() {

      var $sidebtnholder = me.$sidebtnholder = $('<div class="slider-sidebtnholder"/>').appendTo(me.$slider);
      //左ボタン
      var $btn_left = me.$btn_left = $('<a class="slider-btn--left" href="javascript:void(0);" />').appendTo($sidebtnholder);
      $btn_left.onSpClick(function() {
        me.prev();
      }, false);
      //右ボタン
      var $btn_right = me.$btn_right = $('<a class="slider-btn--right" href="javascript:void(0);" />').appendTo($sidebtnholder);
      $btn_right.onSpClick(function() {
        me.next();
      }, false);

      /*-----------------------*/
      // サイドのカバー
      /*-----------------------*/
      me.$imgcover_L = $('<div class="imgcover imgcover-left"/>').appendTo(me.$imgholder);
      me.$imgcover_R = $('<div class="imgcover imgcover-right"/>').appendTo(me.$imgholder);


      me.onResize();

      me.showItem(me.currentNum, null, function(){

        console.log('me.poslist', me.poslist);
      });

      //オートスライド開始
      me.startAutoSlider();





    });

    /*-----------------------*/
    // クリックページネーション
    /*-----------------------*/
    this.el.on('click', '.slider-pagination a', function() {
      var $self = $(this);
      var num = $self.attr('num');
      me.showItem(num);
    });

    /*-----------------------*/
    // リサイズ
    /*-----------------------*/
    $win.on('resize.slider', function() {
      me.onResize();
    });

    /*-----------------------*/
    // オートスライド制御
    /*-----------------------*/
    this.el.on({
      mouseenter: function() {
        me.stopAutoSlider();
      },
      mouseleave: function() {
        me.startAutoSlider();
      }
    });

    /*-----------------------*/
    // スクロール
    // 全体が見えたらフラグオン、キーに反応開始
    /*-----------------------*/
    var bottom = me.el.offset().top;
    $win.on('scroll.slider touchmove.slider', function(e) {

      if(e.type.indexOf('touchmove') != -1){
        $win.off('scroll.slider');
      }

      var scrollVal = $win.scrollTop();

      if (scrollVal < bottom) {
        // el.css({opacity:0.5});
        visualVisible = true;
        //オートスライド開始
        me.startAutoSlider();
      } else {
        // el.css({opacity:1});
        visualVisible = false;
        //オートスライド停止
        me.stopAutoSlider();
      }
    });

    /*-----------------------*/
    // キーダウン
    /*-----------------------*/
    $win.on('keydown.slider', function(e) {

      if (!visualVisible) return;



      if (e.keyCode === 37) {
        //左
        me.prev();
      } else if (e.keyCode === 39) {
        //右
        me.next();
      }

    });

  }
  var P = Slider.prototype;
  P.items = []; //イメージの参照配列
  P.poslist = []; //ポジジョン配列
  P.currentNum = 1;
  P.autoslideStartTimer = null; //オートスライド開始までのタイマー
  P.autoslideTimer = null; //オートスライドのタイマー
  P.autoslideFlg = false; //オートスライドするべきか

  /*-----------------------*/
  // オートスライド開始
  /*-----------------------*/
  P.startAutoSlider = function() {

    var me = this;
    me.autoslideFlg = true;

    //タイマーID削除
    me.clearSliderTimer();

    //開始タイマー
    me.autoslideStartTimer = setTimeout(function() {

      //タイマーID削除
      me.clearSliderTimer();
      if (!me.autoslideFlg) return;

      //autoSlide開始
      autoSlide();

    }, autoslidetimerWaitTime);

    /*-----------------------*/
    // autoSlide
    /*-----------------------*/
    function autoSlide() {

      if (!me.autoslideFlg) return;

      /*-----------------------*/
      // next
      /*-----------------------*/
      me.next()

      /*-----------------------*/
      // then
      /*-----------------------*/
      .then(function() {

        if (!me.autoslideFlg) return;

        //開始タイマー
        me.autoslideTimer = setTimeout(function() {

          clearTimeout(me.autoslideTimer);
          me.autoslideTimer = null;

          autoSlide();
        }, autoslidetimerDuration);

      });
    }
  };

  /*-----------------------*/
  // オートスライド停止
  /*-----------------------*/
  P.stopAutoSlider = function() {
    console.log('stopAutoSlider');
    var me = this;
    me.autoslideFlg = false;
    me.clearSliderTimer();

  };
  /*-----------------------*/
  // オートスライド用タイマー解除
  /*-----------------------*/
  P.clearSliderTimer = function() {
    var me = this;
    //タイマーID削除
    clearTimeout(me.autoslideStartTimer);
    me.autoslideStartTimer = null;
    clearTimeout(me.autoslideTimer);
    me.autoslideTimer = null;
  };

  /*-----------------------*/
  // アイテムの幅を返却
  /*-----------------------*/
  P.getItemSize = function() {

    var itemW = this.maxW;
    var itemH = this.maxH;

    if (winW < itemW) {
      itemW = winW;
    }

    var per = this.maxH / this.maxW;
    itemH = itemW * per;

    return {
      itemW: itemW,
      itemH: itemH
    };
  };

  /*-----------------------*/
  // ポジションを更新
  /*-----------------------*/
  P.updatePosList = function() {

    var poslist = this.poslist = [];
    var lastItemW = this.lastItemW;
    var itemW = this.getItemSize().itemW;

    for (var i = 0, len = 5; i < len; i++) {
      poslist.push({
        x: i * itemW,
        num: i + 1
      });
    }

    if (lastItemW != itemW) {

      //アイテムのサイズを更新
      this.items.forEach(function($itm) {
        $itm.css({
          width: itemW
        });
      });
    }

    this.lastItemW = itemW;
  };

  /*-----------------------*/
  // アイテムのポジションを更新
  //
  // @num ページ番号
  // @dir 方向 prev,next
  /*-----------------------*/
  P.updateItemPosList = function(num, dir) {

    var ret = [];
    var me = this;

    var poslist = this.poslist.concat();
    //numのアイテムが配列の中央に来るようにインデックスを調整する

    var items = this.items.concat();
    var posindex;

    //画像の個数がポイントの配列より少ない場合、アイテム配置座標をずらす
    var skipcount = poslist.length - items.length - 1;
    if (skipcount < 0) {
      //画像が5個以上
      skipcount = 0;
      posindex = (num - 1 + 3) % poslist.length;
      items = items.slice(posindex).concat(items.slice(0, posindex));

    } else {

      /*-----------------------*/
      // 画像の枚数が少ないときの処理
      /*-----------------------*/
      if (items.length === 3) {
        posindex = (num - 1 - 1) % poslist.length;
      } else if (items.length === 4) {
        posindex = (num - 1 - 2) % poslist.length;
      }
      items = items.slice(posindex).concat(items.slice(0, posindex));
      var $side, $clone, cloneX;
      if (dir === 'next') {
        skipcount = 0;
        /*-----------------------*/
        // 次へ
        /*-----------------------*/
        if (items.length <= 3) {

          $side = items[items.length - 1];
          $side.css({
            left: poslist[poslist.length - 1].x
          });
          //クローンして配置する
          $clone = $side.clone();
          //初期座標をセット
          cloneX = poslist[1].x;
          items.unshift($clone);
        }

      } else if (dir === 'prev') {
        /*-----------------------*/
        // 前へ
        /*-----------------------*/
        $side = items[0];
        $side.css({
          left: poslist[0].x
        });
        //クローンして配置する
        $clone = $side.clone();
        //初期座標をセット
        cloneX = poslist[3].x;
        items.push($clone);

        // console.log('items[1]', $side.find('img').attr('src'), $side.css('left'));
      }
      //クローンがあればセット
      if ($clone && $clone.length > 0) {
        $clone.css({
          left: cloneX
        }).attr('cloned', 1);

        me.$imgholder.append($clone);
      }

    }

    if (isNaN(posindex)) return ret;

    // var posindex = (num - 1) % poslist.length;
    console.log('アイテムのポジションを更新:', num, 'posindex:', posindex);

    // items.forEach(function($itm){
    //   console.log($itm.find('img').attr('src'));
    // });

    var posnum = 0;
    poslist.forEach(function(posD) {

      var $itm = null;
      var x = posD.x;

      if (skipcount > 0) {
        skipcount--;
      } else {
        $itm = items.shift();
      }
      ret.push({
        tx: x,
        $itm: $itm,
        posnum: ++posnum
      });

      // if ($itm) {
      //   console.log($itm.find('img').attr('src'));
      // } else {
      //   console.log('＊');
      // }

    });

    return ret;
  };

  /*-----------------------*/
  // サイズなどを更新
  // パフォーマンスを考慮して
  // 一定間隔で更新される
  /*-----------------------*/
  P.onResize = function() {

    var me = this;

    //リサイズされても、一定間隔で更新される
    if (me.resizeTimer) return;

    winW = $win.width();
    me.updatePosList();
    me.updateViewSize();

    me.resizeTimer = setTimeout(function() {

      winW = $win.width();
      me.updatePosList();
      me.updateViewSize();

      me.updateImgPos();
      //タイマーリセット
      clearTimeout(me.resizeTimer);
      me.resizeTimer = null;
    }, 50);

  };

  /*-----------------------*/
  // ビュー全体のサイズを更新
  /*-----------------------*/
  P.updateViewSize = function() {

    var size = this.getItemSize();
    var itemW = size.itemW;
    var itemH = size.itemH;
    var w = this.poslist.length * itemW;
    var $imgholder = this.$imgholder;
    $imgholder.css({
      marginLeft: -w / 2,
      width: w
    });

    /*-----------------------*/
    //
    /*-----------------------*/
    this.$slider.css({
      height: itemH
    });

    /*-----------------------*/
    // サイドバーボタンホルダ
    /*-----------------------*/
    this.$sidebtnholder.css({
      width: itemW,
      height: itemH,
      marginLeft: -itemW / 2,
    });
    //console.log('updateViewSize', w, itemW);

    /*-----------------------*/
    // サイドカバー
    /*-----------------------*/
    this.$imgcover_L.css({
      left: this.poslist[1].x,
      width: itemW,
      height: itemH,
    });
    this.$imgcover_R.css({
      left: this.poslist[3].x,
      width: itemW,
      height: itemH
    });

  };

  /*-----------------------*/
  // 画像のポジションを更新
  /*-----------------------*/
  P.updateImgPos = function() {

    /*-----------------------*/
    // 画像のポジションを更新
    /*-----------------------*/
    var itemposlist = this.updateItemPosList(this.currentNum);
    itemposlist.forEach(function(d) {
      var $itm = d.$itm;
      if (!$itm) return true;
      $itm.css({
        left: d.tx
      });
      $itm.attr('posnum', d.posnum);
    });

    //クローン削除
    $('.imgitem[cloned]').remove();

  };

  /*-----------------------*/
  // next
  /*-----------------------*/
  P.next = function() {

    if(this.isanimating) return;

    var dfd = $.Deferred();
    var num = this.currentNum + 1;
    if (num > this.items.length) {
      num = 1;
    }

    //タイマーリセット
    this.startAutoSlider();

    //位置を調整
    var poslist = this.poslist;
    var $item_0 = this.$imgholder.find('a[posnum=1]');
    $item_0.css({
      left: poslist[poslist.length - 1].x
    });

    this.showItem(num, 'next', function() {
      dfd.resolve();
    });
    return dfd.promise();
  };

  /*-----------------------*/
  // prev
  /*-----------------------*/
  P.prev = function() {

    if(this.isanimating) return;

    var dfd = $.Deferred();
    var num = this.currentNum - 1;
    if (num < 1) {
      num = this.items.length;
    }

    //タイマーリセット
    this.startAutoSlider();

    //位置を調整
    var poslist = this.poslist;
    var $item_last = this.$imgholder.find('a[posnum=' + poslist.length + ']');
    $item_last.css({
      left: poslist[0].x
    });

    this.showItem(num, 'prev', function() {
      dfd.resolve();
    });
    return dfd.promise();
  };

  /*-----------------------*/
  // ページネーション更新
  /*-----------------------*/
  P.updatePagination = function(num) {

    /*-----------------------*/
    // ページネーション　カレント処理
    /*-----------------------*/
    this.$pagination.find('a').removeClass('current');
    this.$pagination.find('a[num=' + num + ']').addClass('current');

  };

  /*-----------------------*/
  // 指定アイテムを表示
  //
  // @num ページ番号
  // @dir 方向 prev,next
  /*-----------------------*/
  P.showItem = function(num, dir, callback) {

    this.currentNum = num;

    var itemposlist = this.updateItemPosList(num, dir);

    //アニメ開始
    this.showItemExe(itemposlist, callback);
    //ページネーション更新
    this.updatePagination(num);
  };

  /*-----------------------*/
  // 操作不可
  /*-----------------------*/
  P.setDisabled = function(flg) {
    var me = this;



    // me.$sidebtnholder.addClass('disabled');
    // me.$pagination.addClass('disabled');
    // if (flg) {
    //   me.$btn_right.css({
    //     'pointer-events': 'none',
    //   });
    //   me.$btn_left.css({
    //     'pointer-events': 'none',
    //   });
    // } else {
    //   me.$btn_right.css({
    //     'pointer-events': 'auto',
    //   });
    //   me.$btn_left.css({
    //     'pointer-events': 'auto',
    //   });
    // }

  };


  /*-----------------------*/
  // 指定アイテムを表示
  /*-----------------------*/
  P.showItemExe = function(itemposlist, callback) {

    var me = this;
    if (!itemposlist.length) return;

    //アニメ中ならばサイドバー、ページネーション無効
    // this.setDisabled(true);



    //アニメ中かどうか
    this.isanimating = true;

    var finishCount = 0;

    //ビューサイズ更新
    this.updateViewSize();

    var max = itemposlist.length;
    itemposlist.forEach(function(d, idx) {

      if (itemposlist.length === 0) return true;
      var $itm = d.$itm;
      if (!$itm) {
        finishcheck();
        return true;
      }
      //カバー消す


      // $itm.find('.imgcover').hide();

      var tx = d.tx;
      var posnum = +d.posnum;
      //アニメをスキップするか
      var skipanime = false;
      //自分のポジション
      var mypos = +$itm.attr('posnum');
      if (mypos === 1 && posnum === max) {
        skipanime = true;
      } else if (mypos === max && posnum === 1) {
        skipanime = true;
      }

      //console.log('アニメ mypos', mypos, posnum, skipanime);

      //ポジション更新
      $itm.attr('posnum', posnum);

      //CSSアニメ停止
      $itm.css({
        left: $itm.position().left,
        zIndex: 20
      });
      if (idx === 3) {
        $itm.css({
          zIndex: 30
        });
      }

      if (skipanime) {
        //アニメなし
        $itm.css({
          left: tx
        });
        finishcheck();

      } else {

        //CSSアニメ開始
        $itm.transition({
          left: tx,
        }, 1000, ease, function() {
          // }, 1600, ease, function() {

          finishcheck();
        });
      }

    });

    /*-----------------------*/
    // finishcheck
    /*-----------------------*/
    function finishcheck() {
      finishCount++;
      if (finishCount === itemposlist.length) {
        console.log('アニメかんりょう');
        me.isanimating = false;

        //クローン削除
        $('.imgitem[cloned]').remove();

        //コールバック
        if (callback) callback();

        //両サイドホワイトカバー表示
        // if (me.timer_imgcover) {
        //   clearTimeout(me.timer_imgcover);
        //   me.timer_imgcover = null;
        // }
        // me.timer_imgcover = setTimeout(function() {

        //   //CSSアニメ開始
        //   $('.imgitem[posnum=2] .imgcover').show().css({
        //     opacity: 0
        //   }).transition({
        //     opacity: imgcoverAlpha,
        //   }, 300, 'easeOutCubic');
        //   //CSSアニメ開始
        //   $('.imgitem[posnum=4] .imgcover').show().css({
        //     opacity: 0
        //   }).transition({
        //     opacity: imgcoverAlpha,
        //   }, 300, 'easeOutCubic', function() {
        //     //コールバック
        //     if (callback) callback();
        //   });
        // }, 100);

      }
    }

  };

  /*-----------------------*/
  // イメージをロード
  /*-----------------------*/
  P.makeImgNode = function() {

    var me = this;
    var el = this.el;
    var $slider = this.$slider = el.find('.slider');
    this.$imgholder = el.find('.imgholder');
    //ページネーション用
    var $pagination = this.$pagination = $('<div class="slider-pagination"/>').appendTo(el);
    var $pagination_ul = $('<ul />').appendTo($pagination);

    /*-----------------------*/
    // 個数調整
    /*-----------------------*/
    // var $imgitem = this.$imgholder.find('.imgitem');
    // if($imgitem.length < 5){
    //     this.$imgholder.append($imgitem.clone());
    // }

    /*-----------------------*/
    // データの配列を生成
    /*-----------------------*/
    this.$imgholder.find('.imgitem').each(function(idx) {
      var $a = $(this);
      me.items.push($a);

      //カバー
      // var $imgcover = $('<div />').hide().appendTo($a);
      // $imgcover.addClass('imgcover');

      // if (idx === 1 || idx === 3) {
      //   $imgcover.css({
      //     opacity: imgcoverAlpha
      //   }).show();
      // }

      //ページネーション
      var $li = $('<li />').appendTo($pagination_ul);
      var $btn_page = $('<a class="" href="javascript:void(0);" />').appendTo($li);
      $btn_page.attr('num', idx + 1).append(idx + 1);

    });

    el.css({
      visibility: 'visible'
    });

    //出現
    $slider.css({
      opacity: 0
    }).transition({
      opacity: 1,
    }, 1200, ease, function() {

    });

    var dfd = $.Deferred();
    return dfd.resolve();

  };

  /*-----------------------*/
  // destroy
  /*-----------------------*/
  P.destroy = function() {

    $win.off('resize.slider');
  };

  /*-------------------------

    $.extend

  ------------------------*/
  $.extend({

    Slider: Slider

  });

})();
