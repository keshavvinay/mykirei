/**
 * FacebookPostItem.
 */
(function(window, kaoAPI) {
  "use strict";

  var isAuthorring;
  /*-----------------------*/
  // ready
  /*-----------------------*/
  $(document).ready(function() {
    isAuthorring = $.fn.isAuthorring();
    initFacebookPost();
  });


  /**
   * initialize FacebookPostItem
   */
  function initFacebookPost() {
    var $js_FacebookPost = $('.js-FacebookPost');
    if (!$js_FacebookPost[0]) return;
    var cache_expire = 300000;  // キャッシュ有効期限(ms)

    $js_FacebookPost.each(function() {
      var $me = $(this);
      var path = $me.data('path');
      var defferd = new $.Deferred();
      var json = {};
      kaoAPI.onloadAsyncDOM(defferd.promise());

      $.ajax({
        url: path,
        cache: false,
        type: 'GET',
        dataType: 'json'
      })
      .done(function (json, textStatus, jqXHR) {
        console.log('success');
        var cacheDate = moment(new Date(jqXHR.getResponseHeader('Last-Modified')));
        var today = moment(new Date(jqXHR.getResponseHeader('Date')));

        if (today.diff(cacheDate) < cache_expire) {
          var data = json.data;
          var fbPostData = formatFBObject($me, data);
          renderFacebookPost($me, fbPostData);
          defferd.resolve();
          return;
        }
        callServlet($me, path, defferd);
      })
      .fail(function (jqXHR, textStatus) {
        console.log('error:' + textStatus);
        callServlet($me, path, defferd);
      });
    });
  }


  /**
   * サーブレット経由で記事データを取得する
   *
   * @param $target - レンダリング先のDOM
   * @param cachePath - cache path
   * @param defferd
   */
  function callServlet($target, cachePath, defferd) {
    console.log('call servlet');
    common.facebook.utils.getLatestData(document.URL, cachePath, function(json) {
      var data = json.data;
      if (!checkIsError(data)) {
        var fbPostData = formatFBObject($target, data);
        renderFacebookPost($target, fbPostData);
      } else {
        showError($target);
      }
      defferd.resolve();
    });
  }

  function checkIsError(data) {
    return data === undefined;
  }

  function showError($target) {
    $target.find('.g-FacebookPost__error').show();
  }


  /**
   * Format FacebookPostDataObject
   *
   * @param $target($('.js-FacebookPost'))
   * @param FacebookPostData(jsonObject)
   * @return formatted FacebookPostData
   */
  function formatFBObject($target, data) {
    var fbPostData = [];
    var postLength = $target.data('number');
    var dateFormat = $target.data('date-format');
    var linkLabel = $target.data('link-label');

    for(var i = 0; i < data.length && i < postLength; i++) {
      var fbPost = {};
      // post ID
      fbPost.id = data[i].id.split('_')[1];
      // 日付
      fbPost.date = moment(data[i].created_time, 'YYYY-MM-DD hh:mm:ss').format(dateFormat);
      // 本文
      if(data[i].message !== undefined) {
        fbPost.text = $.fn.replaceLink(data[i].message, '_blank');
        // ハッシュタグ → リンクに変換
        fbPost.text = fbPost.text.replace(/(?:^|[^ーー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9À-ɏ&_/>]+)[#＃]([ー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9À-ɏ_]*[ー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-ZÀ-ɏ]+[ー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9À-ɏ_]*)/ig, ' <a href="https://www.facebook.com/hashtag/$1?source=feed_text&story_id="' + fbPost.id + '" target="_blank">#$1</a>');

      }
      // コメント数
      fbPost.commentCount = (data[i].comments !== undefined) ? data[i].comments.data.length : 0;
      // like数
      fbPost.likeCount = (data[i].reactions.summary.total_count !== undefined) ? data[i].reactions.summary.total_count : -1;
      // permalink
      fbPost.permalink = data[i].permalink_url;
      // mediaなし
      fbPost.hasMedia = false;
      // media(画像)
      if(data[i].full_picture !== undefined) {
        fbPost.imageSrc = data[i].full_picture;
        fbPost.mediaType = 'image';
        fbPost.hasMedia = true;
      }
      // media(動画)
      if(data[i].source !== undefined) {
        fbPost.movieSrc = data[i].source;
        fbPost.mediaType = 'movie';
        fbPost.hasMedia = true;
      }
      // media position (sm)
      fbPost.smallViewTop = $target.hasClass('is-smallViewTop');
      // 投稿の種類 (シェア投稿の判別に使用)
      fbPost.status_type = data[i].status_type;
      // 投稿の種類テキスト
      fbPost.status_story = data[i].story;
      // シェアした投稿のURL
      fbPost.sharedURL = data[i].link;
      // シェアした投稿のタイトル
      fbPost.sharedTitle = data[i].name;
      // シェアした投稿のdiscription
      fbPost.sharedDescription = data[i].description;
      // シェアした投稿のcaption
      fbPost.sharedCaption = data[i].caption;
      // リンクラベル
      fbPost.linkLabel = linkLabel;

      fbPostData.push(fbPost);
    }
    return fbPostData;
  }

  /**
   * Render FacebookPostItem
   *
   * @param $target($('.js-FacebookPost'))
   * @param formatted facebook data objects
   */
  function renderFacebookPost($target, fbPostData) {
    $.templates('sharedBlockTmpl', sharedBlockTmpl);
    $.templates('mediaTmpl', mediaTmpl);
    $.templates('postsTmpl', tmpl);
    var html = $.render.postsTmpl(fbPostData);
    var $componentDom = $target.find('.g-FacebookPost__inner');
    $componentDom.html(html);

    // オーサリング画面
    if(isAuthorring) {
      showError($target);
    }

    // 動画のvideo.js化
    kaoAPI.initAddedVideo();
  }

  var mediaTmpl = '{{if hasMedia}}' +
                  '<div class="g-FacebookPost__imageBlock l-FacebookPost__imageBlock">' +
                    '<div class="g-FacebookPost__imageBlock__inner l-FacebookPost__imageBlock__inner">' +
                      '{{if mediaType === "image"}}' +
                        '<img src="{{:imageSrc}}" width="100%" alt="">' +
                      '{{else}}' +
                        '<video width="100%" poster="{{:imageSrc}}" controls>' +
                          '<source src="{{:movieSrc}}">' +
                        '</video>' +
                      '{{/if}}' +
                    '</div>' +
                  '</div>' +
                  '{{/if}}';

  var sharedBlockTmpl = '<div class="g-FacebookPost__sharedBlock l-FacebookPost__sharedBlock">' +
                          '<div class="g-FacebookPost__sharedBlock__inner l-FacebookPost__sharedBlock__inner">' +
                            '<div class="g-FacebookPost__sharedBlock__image l-FacebookPost__sharedBlock__image">' +
                              '<div class="g-FacebookPost__sharedBlock__image__inner l-FacebookPost__sharedBlock__image__inner">' +
                              '{{if mediaType === "image"}}' +
                                '<img src="{{:imageSrc}}" width="100%">' +
                              '{{else}}' +
                                '<video width="100%" poster="{{:imageSrc}}" controls>' +
                                  '<source src="{{:movieSrc}}">' +
                                '</video>' +
                              '{{/if}}' +
                              '</div>' +
                            '</div>' +
                            '<div class="g-FacebookPost__sharedBlock__desc l-FacebookPost__sharedBlock__desc">' +
                              '<h3 class="g-FacebookPost__sharedBlock__titleWrapper l-FacebookPost__sharedBlock__titleWrapper" >' +
                                '<a href="{{:sharedURL}}" class="g-FacebookPost__sharedBlock__title l-FacebookPost__sharedBlock__title" target="_blank">{{:sharedTitle}}</a>' +
                              '</h3>' +
                              '<p class="g-FacebookPost__sharedBlock__text l-FacebookPost__sharedBlock__text">{{:sharedDescription}}</p>' +
                              '{{if status_type === "shared_story"}}' +
                                '<small class="g-FacebookPost__sharedBlock__caption l-FacebookPost__sharedBlock__caption">{{:sharedCaption}}</small>' +
                              '{{/if}}' +
                            '</div>' +
                          '</div>' +
                        '</div>';

  var tmpl = '<div class="g-FacebookPostUnit l-FacebookPostUnit {{if !hasMedia}}is-none-media{{/if}} {{if status_type === "shared_story" || status_type === "created_event"}}is-sharepost{{/if}}">' +
              '<div class="g-FacebookPost__contentsBlock l-FacebookPost__contentsBlock">' +
                '{{if !(status_type === "shared_story" || status_type === "created_event")}}' +
                  '{{if smallViewTop}}' +
                    '{{include tmpl="mediaTmpl"/}}' +
                  '{{/if}}' +
                '{{/if}}' +
                '<div class="g-FacebookPost__textBlock l-FacebookPost__textBlock">' +
                    '<div class="g-FacebookPost__textBlock__date l-FacebookPost__textBlock__date">{{:date}}</div>' +
                    '<div class="g-FacebookPost__textBlock__message l-FacebookPost__textBlock__message">' +
                    '{{if status_type === "shared_story" || text === undefined}}' +
                      '<p class="g-FacebookPost__textBlock__message__info l-FacebookPost__textBlock__message__info">{{:status_story}}</p>' +
                    '{{/if}}' +
                      '<p class="g-FacebookPost__textBlock__message__text l-FacebookPost__textBlock__message__text">{{:text}}</p>' +
                    '</div>' +
                    '{{if hasMedia}}' +
                      '{{if status_type === "shared_story" || status_type === "created_event"}}' +
                        '{{include tmpl="sharedBlockTmpl"/}}' +
                      '{{/if}}' +
                    '{{/if}}' +
                    '<div class="g-FacebookPost__textBlock__list__wrapper l-FacebookPost__textBlock__list__wrapper">' +
                      '<ul class="g-FacebookPost__textBlock__list l-FacebookPost__textBlock__list">' +
                        '<li class="g-FacebookPost__textBlock__listItem l-FacebookPost__textBlock__listItem g-FacebookPost__textBlock__listItem--comment l-FacebookPost__textBlock__listItem--comment">' +
                          '<span class="cmn-icon cmn-icon--comment g-FacebookPost__textBlock__listItem__icon l-FacebookPost__textBlock__listItem__icon"></span>' +
                          '<span class="g-FacebookPost__textBlock__listItem__label l-FacebookPost__textBlock__listItem__label">{{:commentCount}}</span>' +
                        '</li>' +
                        '{{if likeCount >= 0}}' +
                          '<li class="g-FacebookPost__textBlock__listItem l-FacebookPost__textBlock__listItem g-FacebookPost__textBlock__listItem--like l-FacebookPost__textBlock__listItem--like">' +
                            '<span class="cmn-icon cmn-icon--thumbs_up g-FacebookPost__textBlock__listItem__icon l-FacebookPost__textBlock__listItem__icon"></span>' +
                            '<span class="g-FacebookPost__textBlock__listItem__label l-FacebookPost__textBlock__listItem__label">{{:likeCount}}</span>' +
                          '</li>' +
                        '{{/if}}' +
                        '<li class="g-FacebookPost__textBlock__listItem l-FacebookPost__textBlock__listItem g-FacebookPost__textBlock__listItem--share l-FacebookPost__textBlock__listItem--share">' +
                          '<a href="http://www.facebook.com/share.php?u={{:permalink}}" class="g-FacebookPost__textBlock__listItem__link l-FacebookPost__textBlock__listItem__link" onclick="window.open(this.href, \'FBwindow\', \'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes\'); return false;">' +
                            '<span class="cmn-icon cmn-icon--share g-FacebookPost__textBlock__listItem__icon l-FacebookPost__textBlock__listItem__icon"></span>' +
                            '<span class="g-FacebookPost__textBlock__listItem__label l-FacebookPost__textBlock__listItem__label">Share</span>' +
                          '</a>' +
                        '</li>' +
                      '</ul>' +
                    '</div>' +
                    '<div class="g-FacebookPost__textBlock__visit l-FacebookPost__textBlock__visit opt-hide-sm">' +
                      '<a href="{{:permalink}}" target="_blank" class="g-FacebookPost__textBlock__visit__link l-FacebookPost__textBlock__visit__link">' +
                        '<span class="cmn-icon cmn-icon--window g-FacebookPost__textBlock__visit__icon l-FacebookPost__textBlock__visit__icon"></span>' +
                        '<span class="g-FacebookPost__textBlock__visit__label l-FacebookPost__textBlock__visit__label">{{:linkLabel}}</span>' +
                      '</a>' +
                    '</div>' +
                  '</div>' +
                  '{{if !(status_type === "shared_story" || status_type === "created_event")}}' +
                    '{{if !smallViewTop}}' +
                      '{{include tmpl="mediaTmpl"/}}' +
                    '{{/if}}' +
                  '{{/if}}' +
                  '<div class="g-FacebookPost__textBlock__visit l-FacebookPost__textBlock__visit opt-hide-lg opt-hide-md">' +
                    '<a href="{{:permalink}}" target="_blank" class="g-FacebookPost__textBlock__visit__link l-FacebookPost__textBlock__visit__link">' +
                      '<span class="cmn-icon cmn-icon--window g-FacebookPost__textBlock__visit__icon l-FacebookPost__textBlock__visit__icon"></span>' +
                      '<span class="g-FacebookPost__textBlock__visit__label l-FacebookPost__textBlock__visit__label">{{:linkLabel}}</span>' +
                    '</a>' +
                  '</div>' +
                '</div>' +
              '</div>';

})(window, window.kaoAPI || (window.kaoAPI = {}));
