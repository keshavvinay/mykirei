/**
 * KAO WCM YouTube Video Item
 */
(function(window, kaoAPI) {
  "use strict";
  var isAuthorring;
  /*-----------------------*/
  // ready
  /*-----------------------*/
  $(document).ready(function() {
    isAuthorring = $.fn.isAuthorring();
    var $js_youtubeVideo = $('.js-YouTubeVideo');
    if (!$js_youtubeVideo[0]) return;

    var apiKey = $('#area-Contents').attr('data-yt-key');
    var videoIds = [];

    var fetchYouTubeData = function($target, url) {
      var defferd = new $.Deferred();
      $.getJSON(url, null)
        .done(function(json) {
          if (json.items.length === 0) {
            $target.find('.g-YouTubeVideo__inner').hide();
            showError($target);
          } else {
            var yt = formatYouTubeData($target, json);
            renderYouTubeDescription($target, yt);
          }
        })
        .fail(function(error) {
          $target.find('.g-YouTubeVideo__inner').hide();
          showError($target);
        })
        .always(function() {
          defferd.resolve();
        })
      kaoAPI.onloadAsyncDOM(defferd.promise());
    };

    for (var i = 0; i < $js_youtubeVideo.length; i++) {
      var $me = $js_youtubeVideo.eq(i);
      var videoURL = $me.data("video-url") || "";
      var videoId = videoURL.split("?v=")[1];
      var url = 'https://www.googleapis.com/youtube/v3/videos?id=' + videoId + '&key=' + apiKey + '&fields=items(id,snippet(title,description,publishedAt),statistics(viewCount))&part=snippet,statistics';

      renderContentsBlock($me, videoId);
      fetchYouTubeData($me, url);

      videoIds.push(videoId);
    }

    // youtube playerのロード
    kaoAPI.loadPlayer(videoIds);
  });


  function renderContentsBlock($target, videoId) {
    var isSmallViewTop = $target.hasClass('is-smallViewTop');
    var data = {
      'isSmallViewTop': isSmallViewTop
    };

    $.templates('movieWrapperTmpl', movieWrapperTmpl);
    $.templates('textWrapperTmpl', textWrapperTmpl);
    $.templates('contentsWrapper', wrapperTmpl);
    var contentsWrapper = $.render.contentsWrapper(data);
    $target.children('.g-YouTubeVideo__inner').html(contentsWrapper);

    // オーサリング画面
    if (isAuthorring) {
      showError($target);
    }
  }


  function formatYouTubeData($target, json) {
    var yt = {};
    var videoData = json.items[0];
    var dateFormat    = $target.data("date-format");
    // YouTubeのURL
    yt.videoURL       = $target.data('video-url');
    // YouTubeChannelのURL(optional)
    yt.channelURL     = $target.data("channel-url");
    // リンクラベル
    yt.linkLabel      = $target.data("link-label");
    // video ID
    yt.videoId        = videoData.id;
    // 投稿日時
    yt.date           = moment(videoData.snippet.publishedAt, 'YYYY-MM-DD hh:mm:ss').format(dateFormat);
    // 動画タイトル
    yt.title          = videoData.snippet.title;
    // 動画説明文
    yt.description    = $.fn.replaceLink(videoData.snippet.description, '_blank');
    // 閲覧数(3桁でカンマ区切り)
    yt.viewCount      = String(videoData.statistics.viewCount).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    return yt;
  }


  /**
   * YouTube Desctiptionをレンダリング
   */
  function renderYouTubeDescription($target, ytData) {
    var $textBlock = $target.find('.g-YouTubeVideo__textBlock');

    $.templates('descriptionTmpl', descriptionTmpl);
    var ytDescription = $.render.descriptionTmpl(ytData);
    $textBlock.html(ytDescription);

    initShareModal($target);

    if (ytData.channelURL !== undefined) {
      $.templates('visitTmpl', visitTmpl);
      var visitArea = $.render.visitTmpl(ytData);
      var $contentsBlock = $target.find('.g-YouTubeVideo__contentsBlock');
      $contentsBlock.append(visitArea);
    }
  }


  function initShareModal($target) {
    var $js_ytModal = $target.find('.js-youtubeModal');
    var url = encodeURI($target.data('video-url'));
    var title = encodeURI($target.find('.g-YouTubeVideo__textBlock__title__link').text());

    $js_ytModal.on('click', function() {
      var data = {
        'url': url,
        'title': title
      };
      renderShareModal(data);
    });
  }

  function renderShareModal(shareData) {
    $.templates('ytShareModal', modalInnerTmpl);
    var ytShareModal = $.render.ytShareModal(shareData);
    kaoAPI.Overlay.show(ytShareModal);
  }


  function showError($target) {
    $target.find('.g-YouTubeVideo__error').show();
  }


  var wrapperTmpl = '<div class="g-YouTubeVideoUnit l-YouTubeVideoUnit">' +
                      '<div class="g-YouTubeVideo__contentsBlock l-YouTubeVideo__contentsBlock">' +
                      '{{if isSmallViewTop}}' +
                        '{{include tmpl="movieWrapperTmpl"/}}' +
                        '{{include tmpl="textWrapperTmpl"/}}' +
                      '{{else}}' +
                        '{{include tmpl="textWrapperTmpl"/}}' +
                        '{{include tmpl="movieWrapperTmpl"/}}' +
                      '{{/if}}' +
                      '</div>' +
                    '</div>';

  var movieWrapperTmpl =  '<div class="g-YouTubeVideo__movieBlock l-YouTubeVideo__movieBlock">' +
                            '<div class="g-YouTubeVideo__movieBlock__outer l-YouTubeVideo__movieBlock__outer">' +
                              '<div class="g-YouTubeVideo__movieBlock__inner l-YouTubeVideo__movieBlock__inner">' +
                              '</div>' +
                            '</div>' +
                          '</div>';

  var textWrapperTmpl = '<div class="g-YouTubeVideo__textBlock l-YouTubeVideo__textBlock"></div>';

  var descriptionTmpl = '<div class="g-YouTubeVideo__textBlock__date l-YouTubeVideo__textBlock__date">{{:date}}</div>' +
                          '<h2 class="g-YouTubeVideo__textBlock__title l-YouTubeVideo__textBlock__title">' +
                            '<a href="{{:videoURL}}" class="g-YouTubeVideo__textBlock__title__link l-YouTubeVideo__textBlock__title__link" target="_blank">{{:title}}</a>' +
                          '</h2>' +
                          '{{if description !== undefined}}' +
                          '<div class="g-YouTubeVideo__textBlock__description l-YouTubeVideo__textBlock__description">' +
                            '<p class="g-YouTubeVideo__textBlock__description__text l-YouTubeVideo__textBlock__description__text">{{:description}}</p>' +
                          '</div>' +
                          '{{/if}}' +
                          '<div class="g-YouTubeVideo__textBlock__list__wrapper l-YouTubeVideo__textBlock__list__wrapper">' +
                            '<ul class="g-YouTubeVideo__textBlock__list l-YouTubeVideo__textBlock__list">' +
                              '<li class="g-YouTubeVideo__textBlock__listItem l-YouTubeVideo__textBlock__listItem g-YouTubeVideo__textBlock__listItem--viewCount l-YouTubeVideo__textBlock__listItem--viewCount">' +
                                '<span class="g-YouTubeVideo__textBlock__listItem__label l-YouTubeVideo__textBlock__listItem__label">{{:viewCount}} views</span>' +
                              '</li>' +
                              '<li class="g-YouTubeVideo__textBlock__listItem l-YouTubeVideo__textBlock__listItem g-YouTubeVideo__textBlock__listItem--share l-YouTubeVideo__textBlock__listItem--share">' +
                                '<a href="javascript:void(0);" class="g-YouTubeVideo__textBlock__listItem__link l-YouTubeVideo__textBlock__listItem__link js-modalTrigger js-youtubeModal">' +
                                  '<span class="cmn-icon cmn-icon--share g-YouTubeVideo__textBlock__listItem__icon l-YouTubeVideo__textBlock__listItem__icon"></span>' +
                                  '<span class="g-YouTubeVideo__textBlock__listItem__label l-YouTubeVideo__listItem__label">Share</span>' +
                                '</a>' +
                              '</li>' +
                            '</ul>' +
                          '</div>' +
                          '{{if channelURL !== undefined}}' +
                          '<div class="g-YouTubeVideo__textBlock__visit l-YouTubeVideo__textBlock__visit opt-hide-md opt-hide-sm">' +
                            '<a href="{{:channelURL}}" target="_blank" class="g-YouTubeVideo__textBlock__visit__link l-YouTubeVideo__textBlock__visit__link">' +
                              '<span class="cmn-icon cmn-icon--window g-YouTubeVideo__textBlock__visit__icon l-YouTubeVideo__textBlock__visit__icon"></span>' +
                              '<span class="g-YouTubeVideo__textBlock__visit__label l-YouTubeVideo__textBlock__visit__label">{{:linkLabel}}</span>' +
                            '</a>' +
                          '</div>' +
                          '{{/if}}' +
                        '</div>';

  var visitTmpl = '<div class="g-YouTubeVideo__textBlock__visit l-YouTubeVideo__textBlock__visit opt-hide-lg">' +
                      '<a href="{{:channelURL}}" target="_blank" class="g-YouTubeVideo__textBlock__visit__link l-YouTubeVideo__textBlock__visit__link">' +
                        '<span class="cmn-icon cmn-icon--window g-YouTubeVideo__textBlock__visit__icon l-YouTubeVideo__textBlock__visit__icon"></span>' +
                        '<span class="g-YouTubeVideo__textBlock__visit__label l-YouTubeVideo__textBlock__visit__label">{{:linkLabel}}</span>' +
                      '</a>' +
                  '</div>';

  var modalInnerTmpl   = '<div class="g-modal__contents l-modal__contents g-modal--share l-modal--share">' +
                          '<h2 class="g-modal__contents__title l-modal__contents__title">Share</h2>' +
                          '<ul class="g-modal__contents__shareList">' +
                            '<li class="g-modal__contents__shareList__item l-modal__contents__shareList__item">' +
                              '<input type="text" name="youtube-url" value="{{:url}}" class="g-modal__contents__shareList__input l-modal__contents__shareList__input">' +
                            '</li>' +
                            '<li class="g-modal__contents__shareList__item l-modal__contents__shareList__item">' +
                              '<a href="http://www.facebook.com/share.php?u={{:url}}" onclick="window.open(this.href, \'FBwindow\', \'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes\'); return false;" class="g-modal__contents__button l-modal__contents__button"><span>Facebook</span></a>' +
                            '</li>' +
                            '<li class="g-modal__contents__shareItems l-modal__contents__shareItems">' +
                              '<a href="http://twitter.com/share?url={{:url}}&text={{:title}}" onclick="window.open(this.href, \'TWwindow\', \'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes\'); return false;" class="g-modal__contents__button l-modal__contents__button"><span>Twitter</span></a>' +
                            '</li>' +
                          '</ul>' +
                        '</div>';


})(window, window.kaoAPI || (window.kaoAPI = {}));
