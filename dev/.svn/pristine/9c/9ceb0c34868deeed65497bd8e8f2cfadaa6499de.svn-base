/**
 * TwitterPostItem.
 */
(function(window, kaoAPI) {
  var isAuthorring;
  /*-----------------------*/
  // ready
  /*-----------------------*/
  $(document).ready(function() {
    isAuthorring = $.fn.isAuthorring();

    initTwitterPost();
  });


  /**
   * initialize TwitterPostItem
   *
   */

  function initTwitterPost() {
    var $target = $('.js-TwitterPost');
    var tweet;
    var cache_expire = 300000;  // キャッシュ有効期限(ms)

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
            renderTwitterPost($me, json);
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
      common.twitter.utils.getLatestData(document.URL, cachePath, function(json) {
        if(!checkIsError(json)) {
          renderTwitterPost($target, json);
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
    return json.length == null;
  }

  /**
   * show error
   *
   * @param $
   * @return none
   *
   */

  function showError($target) {
    $target.find('.g-TwitterPost__error').show();
  }

  /**
   * Render TwitterPostItem
   *
   * @param $
   * @param json
   *
   */

  function renderTwitterPost($target, json) {
    var tmpl, mediaTmpl, tweetData = [];
    var tweetLength = $target.data('number');
    var dateFormat = $target.data('date-format');
    var linkLabel = $target.data('link-label');
    var $componentDom = $target.find('.g-TwitterPost__inner');

    tweetData = formatTwitterPost($target, json, tweetLength, dateFormat, linkLabel);

    mediaTmpl = '{{if hasMedia}}' +
                  '<div class="g-TwitterPost__contentsBlock__image l-TwitterPost__contentsBlock__image">' +
                    '<div class="g-TwitterPost__contentsBlock__image__inner l-TwitterPost__contentsBlock__image__inner">' +
                      '{{if type == "image"}}' +
                        '<img src="{{:mediaUrl}}" width="100%" alt="">' +
                      '{{else}}' +
                        '<video width="100%" controls poster="{{:mediaUrl}}">' +
                        '{{for variants}}' +
                          '<source src="{{:url}}" type="{{:content_type}}">' +
                        '{{/for}}' +
                      '</video>' +
                      '{{/if}}' +
                    '</div>' +
                  '</div>' +
                '{{/if}}';

    tmpl  = '<div class="g-TwitterPostUnit l-TwitterPostUnit {{if !hasMedia}}is-none-media{{/if}}">' +
              '<div class="g-TwitterPost__contentsBlock l-TwitterPost__contentsBlock">' +
                '{{if smallViewTop}}' +
                  '{{include tmpl="mediaTmpl"/}}' +
                '{{/if}}' +
                '<div class="g-TwitterPost__contentsBlock__text l-TwitterPost__contentsBlock__text">' +
                  '<div class="g-TwitterPost__contentsBlock__date l-TwitterPost__contentsBlock__date">{{:date}}</div>' +
                  '<div class="g-TwitterPost__contentsBlock__tweet l-TwitterPost__contentsBlock__tweet">' +
                    '<p class="g-TwitterPost__contentsBlock__tweet__text l-TwitterPost__contentsBlock__tweet__text">{{:text}}</p>' +
                  '</div>' +
                  '<div class="g-TwitterPost__contentsBlock__links__wrapper l-TwitterPost__contentsBlock__links__wrapper">' +
                    '<ul class="g-TwitterPost__contentsBlock__links l-TwitterPost__contentsBlock__links">' +
                      '<li class="g-TwitterPost__contentsBlock__links__item l-TwitterPost__contentsBlock__links__item g-TwitterPost__contentsBlock__links__item--reply l-TwitterPost__contentsBlock__links__item--reply">' +
                        '<a href="http://twitter.com/intent/tweet?in_reply_to={{:id}}" target="_blank" class="g-TwitterPost__contentsBlock__links__item__link l-TwitterPost__contentsBlock__links__item__link" onclick="window.open(this.href, \'TWwindow\', \'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes\'); return false;">' +
                          '<span class="cmn-icon cmn-icon--reply g-TwitterPost__contentsBlock__links__item__icon l-TwitterPost__contentsBlock__links__item__icon"></span>' +
                          '<span class="g-TwitterPost__contentsBlock__links__item__label l-TwitterPost__contentsBlock__links__item__label">Reply</span>' +
                        '</a>' +
                      '</li>' +
                      '<li class="g-TwitterPost__contentsBlock__links__item l-TwitterPost__contentsBlock__links__item g-TwitterPost__contentsBlock__links__item--rt l-TwitterPost__contentsBlock__links__item--rt">' +
                        '<a href="http://twitter.com/intent/retweet?tweet_id={{:id}}" target="_blank" class="g-TwitterPost__contentsBlock__links__item__link l-TwitterPost__contentsBlock__links__item__link" onclick="window.open(this.href, \'TWwindow\', \'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes\'); return false;">' +
                          '<span class="cmn-icon cmn-icon--retweet g-TwitterPost__contentsBlock__links__item__icon l-TwitterPost__contentsBlock__links__item__icon"></span>' +
                          '<span class="g-TwitterPost__contentsBlock__links__item__label l-TwitterPost__contentsBlock__links__item__label">{{:rtCount}}</span>' +
                        '</a>' +
                      '</li>' +
                      '<li class="g-TwitterPost__contentsBlock__links__item l-TwitterPost__contentsBlock__links__item g-TwitterPost__contentsBlock__links__item--fav l-TwitterPost__contentsBlock__links__item--fav">' +
                        '<a href="http://twitter.com/intent/favorite?tweet_id={{:id}}" target="_blank" class="g-TwitterPost__contentsBlock__links__item__link l-TwitterPost__contentsBlock__links__item__link" onclick="window.open(this.href, \'TWwindow\', \'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes\'); return false;">' +
                          '<span class="cmn-icon cmn-icon--heart g-TwitterPost__contentsBlock__links__item__icon l-TwitterPost__contentsBlock__links__item__icon"></span>' +
                          '<span class="g-TwitterPost__contentsBlock__links__item__label l-TwitterPost__contentsBlock__links__item__label">{{:favCount}}</span>' +
                        '</a>' +
                      '</li>' +
                    '</ul>' +
                  '</div>' +
                  '<div class="g-TwitterPost__contentsBlock__visit l-TwitterPost__contentsBlock__visit opt-hide-sm">' +
                    '<a href="https://twitter.com/{{:screenName}}/status/{{:id}}" target="_blank" class="g-TwitterPost__contentsBlock__visit__link l-TwitterPost__contentsBlock__visit__link">' +
                      '<span class="cmn-icon cmn-icon--window g-TwitterPost__contentsBlock__visit__icon l-TwitterPost__contentsBlock__visit__icon"></span>' +
                      '<span class="g-TwitterPost__contentsBlock__visit__label l-TwitterPost__contentsBlock__visit__label">{{:linkLabel}}</span>' +
                    '</a>' +
                  '</div>' +
                '</div>' +
                '{{if !smallViewTop}}' +
                  '{{include tmpl="mediaTmpl"/}}' +
                '{{/if}}' +
                '<div class="g-TwitterPost__contentsBlock__visit l-TwitterPost__contentsBlock__visit opt-hide-lg opt-hide-md">' +
                  '<a href="https://twitter.com/{{:screenName}}/status/{{:id}}" target="_blank" class="g-TwitterPost__contentsBlock__visit__link l-TwitterPost__contentsBlock__visit__link">' +
                    '<span class="cmn-icon cmn-icon--window g-TwitterPost__contentsBlock__visit__icon l-TwitterPost__contentsBlock__visit__icon"></span>' +
                    '<span class="g-TwitterPost__contentsBlock__visit__label l-TwitterPost__contentsBlock__visit__label">{{:linkLabel}}</span>' +
                  '</a>' +
                '</div>' +
              '</div>' +
            '</div>';

    var html;
    $.templates('mediaTmpl', mediaTmpl);
    $.templates('tweetTmpl', tmpl);
    html = $.render.tweetTmpl(tweetData);
    $componentDom.html(html);

    // オーサリング画面
    if(isAuthorring) {
      showError($target);
    }

    // 動画のvideo.js化
    kaoAPI.initAddedVideo();
  }


  /**
   * format TwitterPostItem
   *
   * @param $target
   * @param json
   * @param jsonLength
   * @param dateFormat
   * @param linkLabel
   * @return Array
   *
   */

  function formatTwitterPost($target, json, jsonLength, dateFormat, linkLabel) {
    var tweetData = [];

    if(json.length == null) {
      return tweetData;
    }

    for(var i = 0; i < json.length && i < jsonLength; i++) {
      var tweet = {};

      // 本文
      tweet.text = $.fn.replaceLink(json[i].text, '_blank');
      tweet.text = tweet.text.replace(/(?:^|[^ーー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9&_/>]+)[#＃]([ー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9_]*[ー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z]+[ー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9_]*)/ig, ' <a href="http://twitter.com/search?q=%23$1" target="_blank">#$1</a>');
      tweet.text = tweet.text.replace(/(^|\s)(@|＠)(\w+)/g,'$1<a href="http://www.twitter.com/$3" target="_blank">@$3</a>');

      // 日付
      tweet.date = moment(json[i].created_at, 'ddd MMM DD HH:mm:ss Z YYYY').format(dateFormat);

      // media
      if(json[i].extended_entities) {
        tweet.hasMedia = true;
        if(json[i].extended_entities.media[0].type == 'video') {
          // 動画
          tweet.type = 'video';
          tweet.variants = json[i].extended_entities.media[0].video_info.variants;
        } else {
          // 画像
          tweet.type = 'image';
        }
        tweet.mediaUrl = json[i].extended_entities.media[0].media_url_https;
      } else {
        tweet.hasMedia = false;
      }

      // ID
      tweet.id = json[i].id_str;

      // screen name
      tweet.screenName = json[i].user.screen_name;

      // rt
      tweet.rtCount = json[i].retweet_count;

      // favorite
      tweet.favCount = json[i].favorite_count;

      // label
      tweet.linkLabel = linkLabel;

      // media position
      tweet.smallViewTop = $target.hasClass('is-smallViewTop');

      tweetData.push(tweet);
    }

    return tweetData;
  }

})(window, window.kaoAPI || (window.kaoAPI = {}));
