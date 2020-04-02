/**
 * InstagramPostItem.
 */
(function(window, kaoAPI) {
  var isAuthorring;
  /*-----------------------*/
  // ready
  /*-----------------------*/
  $(document).ready(function() {
    isAuthorring = $.fn.isAuthorring();

    initInstagramPost();
  });


  /**
   * initialize InstagramPostItem
   *
   */

  function initInstagramPost() {
    var $target = $('.js-InstagramPost');
    var cache_expire = 72000;  // キャッシュ有効期限(ms)

    if($target[0]) {
      $target.each(function(){
        var $me = $(this);
        var path = $me.data('path');
        var defferd = new $.Deferred();
        var json = {};
        kaoAPI.onloadAsyncDOM(defferd.promise());

        $.ajax({
          url: path,
          cache : false,
          type: 'GET',
          dataType: 'json'
        })
        .done(function(json, textStatus, jqXHR) {
          console.log("success");
          var cacheDate = moment(new Date(jqXHR.getResponseHeader('Last-Modified')));
          var today = moment(new Date(jqXHR.getResponseHeader('Date')));
          if(today.diff(cacheDate) < cache_expire) {
            renderInstagramPost($me, json);
            defferd.resolve();
          } else {
            // servlet呼び出し
            callServlet($me, path, defferd);
          }
        })
        .fail(function(jqXHR, textStatus) {
          console.log("error:" + textStatus);
          // servlet呼び出し
          callServlet($me, path, defferd);
        })
        .always(function() {
          console.log("complete");
        });
      });
    }
  }

  /**
   * Call Servlet
   *
   * @param $target - レンダリング先のDOM
   * @param cachePath - cache path
   * @param defferd
   */
  function callServlet($target, cachePath, defferd) {
    console.log('call servlet');
    // バックエンド実装後
    common.instagram.utils.getLatestData(document.URL, cachePath, function(json){
      if(!checkIsError(json)) {
        renderInstagramPost($target, json);
      } else {
        showError($target);
      }
      defferd.resolve();
    });
  }


  /**
   * check error
   *
   * @param json
   * @return boolean
   *
   */
  function checkIsError(json) {
    return json.data == null;
  }

  /**
   * show error
   *
   * @param $
   * @return none
   *
   */
  function showError($target) {
    $target.find('.g-InstagramPost__error').show();
  };

  /**
   * Render InstagramPostItem
   *
   * @param $
   * @param json
   *
   */
  function renderInstagramPost($target, json) {
    var tmpl, mediaTmpl, jsonArray, postDataArray = [];
    var postLength = $target.data('number');
    var dateFormat = $target.data('date-format');
    var linkLabel = $target.data('link-label');
    var $componentDom = $target.find('.g-InstagramPost__inner');

    jsonArray = json.data;
    postDataArray = formatInstagramPost($target, jsonArray, postLength, dateFormat, linkLabel);

       // メディアのテンプレート
    mediaTmpl = '<div class="g-InstagramPost__contentsBlock__image l-InstagramPost__contentsBlock__image">' +
                  '<div class="g-InstagramPost__contentsBlock__image__inner l-InstagramPost__contentsBlock__image__inner">' +
                    '{{if type == "image"}}' +
                      '<img src="{{:imageUrl}}" width="100%" alt="">' +
                    '{{else}}' +
                      '<video src="{{:videoUrl}}" width="100%" controls poster="{{:imageUrl}}"></video>' +
                    '{{/if}}' +
                  '</div>' +
                '</div>';


    tmpl  = '<div class="g-InstagramPostUnit l-InstagramPostUnit">' +
              '<div class="g-InstagramPost__contentsBlock l-InstagramPost__contentsBlock">' +
                '{{if smallViewTop}}' +
                  '{{include tmpl="mediaTmpl"/}}' +
                '{{/if}}' +
                '<div class="g-InstagramPost__contentsBlock__text l-InstagramPost__contentsBlock__text">' +
                  '<div class="g-InstagramPost__contentsBlock__date l-InstagramPost__contentsBlock__date">{{:date}}</div>' +
                  '<div class="g-InstagramPost__contentsBlock__postText l-InstagramPost__contentsBlock__postText">' +
                    '<p class="g-InstagramPost__contentsBlock__postText__text l-InstagramPost__contentsBlock__postText__text">{{:text}}</p>' +
                  '</div>' +
                  '<div class="g-InstagramPost__contentsBlock__counts__wrapper l-InstagramPost__contentsBlock__counts__wrapper">' +
                    '<ul class="g-InstagramPost__contentsBlock__counts l-InstagramPost__contentsBlock__counts">' +
                      '<li class="g-InstagramPost__contentsBlock__counts__item l-InstagramPost__contentsBlock__counts__item g-InstagramPost__contentsBlock__counts__item--likes l-InstagramPost__contentsBlock__counts__item--likes">' +
                        '<span class="g-InstagramPost__contentsBlock__counts__item__inner l-InstagramPost__contentsBlock__counts__item__inner">' +
                          '<span class="cmn-icon cmn-icon--heart g-InstagramPost__contentsBlock__counts__item__icon l-InstagramPost__contentsBlock__counts__item__icon"></span>' +
                          '<span class="g-InstagramPost__contentsBlock__counts__item__label l-InstagramPost__contentsBlock__counts__item__label">{{:likes}}</span>' +
                        '</span>' +
                      '</li>' +
                      '<li class="g-InstagramPost__contentsBlock__counts__item l-InstagramPost__contentsBlock__counts__item g-InstagramPost__contentsBlock__counts__item--comments l-InstagramPost__contentsBlock__counts__item--comments">' +
                        '<span class="g-InstagramPost__contentsBlock__counts__item__inner l-InstagramPost__contentsBlock__counts__item__inner">' +
                          '<span class="cmn-icon cmn-icon--comment g-InstagramPost__contentsBlock__counts__item__icon l-InstagramPost__contentsBlock__counts__item__icon"></span>' +
                          '<span class="g-InstagramPost__contentsBlock__counts__item__label l-InstagramPost__contentsBlock__counts__item__label">{{:comments}}</span>' +
                        '</span>' +
                      '</li>' +
                    '</ul>' +
                  '</div>' +
                  '<div class="g-InstagramPost__contentsBlock__visit l-InstagramPost__contentsBlock__visit opt-hide-sm">' +
                    '<a href="{{:linkUrl}}" target="_blank" class="g-InstagramPost__contentsBlock__visit__link l-InstagramPost__contentsBlock__visit__link">' +
                      '<span class="cmn-icon cmn-icon--window g-InstagramPost__contentsBlock__visit__icon l-InstagramPost__contentsBlock__visit__icon"></span>' +
                      '<span class="g-InstagramPost__contentsBlock__visit__label l-InstagramPost__contentsBlock__visit__label">{{:linkLabel}}</span>' +
                    '</a>' +
                  '</div>' +
                '</div>' +
                '{{if !smallViewTop}}' +
                  '{{include tmpl="mediaTmpl"/}}' +
                '{{/if}}' +
                '<div class="g-InstagramPost__contentsBlock__visit l-InstagramPost__contentsBlock__visit opt-hide-lg opt-hide-md">' +
                  '<a href="{{:linkUrl}}" target="_blank" class="g-InstagramPost__contentsBlock__visit__link l-InstagramPost__contentsBlock__visit__link">' +
                    '<span class="cmn-icon cmn-icon--window g-InstagramPost__contentsBlock__visit__icon l-InstagramPost__contentsBlock__visit__icon"></span>' +
                    '<span class="g-InstagramPost__contentsBlock__visit__label l-InstagramPost__contentsBlock__visit__label">{{:linkLabel}}</span>' +
                  '</a>' +
                '</div>' +
              '</div>' +
            '</div>';

    var html;
    $.templates('mediaTmpl', mediaTmpl);
    $.templates('postTmpl', tmpl);
    html = $.render.postTmpl(postDataArray);
    $componentDom.html(html);

    // オーサリング画面
    if(isAuthorring) {
      showError($target);
    }


    // 動画のvideo.js化
    kaoAPI.initAddedVideo();
  }


  /**
   * format InstagramPostItem
   *
   * @param $target
   * @param json
   * @param jsonLength
   * @param dateFormat
   * @param linkLabel
   * @return Array
   *
   */

   function formatInstagramPost($target, json, jsonLength, dateFormat, linkLabel) {
    var postDataArray = [];

    if(json.length == null) {
      return postDataArray;
    }

    for(var i = 0; i < json.length && i < jsonLength; i++) {
      var postData = {};

      // 本文
      if(json[i].caption) {
        postData.text = json[i].caption.text;
        postData.text = postData.text.replace(/(?:^|[^ーー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9&_/>]+)[#＃]([ー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9_]*[ー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z]+[ー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9_]*)/ig, ' <a href="https://www.instagram.com/explore/tags/$1" target="_blank">#$1</a>');
      } else {
        postData.text = '';
      }

      // 日付
      postData.date = moment.unix(Number(json[i].created_time)).format(dateFormat);

      // media
      postData.type = json[i].type;
      postData.imageUrl = json[i].images.standard_resolution.url;
      if(postData.type === 'video') {
        postData.videoUrl = json[i].videos.standard_resolution.url;
      }

      // likes
      postData.likes = json[i].likes.count;

      // comments
      postData.comments = json[i].comments.count;

      // label
      postData.linkLabel = linkLabel;

      // linkUrl
      postData.linkUrl = json[i].link;

      // media position
      postData.smallViewTop = $target.hasClass('is-smallViewTop');

      postDataArray.push(postData);
    }

    return postDataArray;
  }

})(window, window.kaoAPI || (window.kaoAPI = {}));
