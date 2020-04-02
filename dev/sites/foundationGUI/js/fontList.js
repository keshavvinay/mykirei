/**
 * Foundation GUI Common use.
 */
(function (window, foundationAPI) {
  'use strict';

  var fontList = {};
  var FONTPLUS_LOAD_LIMIT = 50;

  // Initialize
  (function () {
    // フォントデータをfetchする
    $.getJSON('./data/font-list.json', function (data) {
      fontList = formatFontList(data);
      renderTabMenu(fontList);
      bindTabEvent(fontList);
    });
  }());

  // fontデータを加工し、配列にストックする
  function formatFontList(data) {
    for (var i = 0, len = data.length; i < len; i++) {
      var maker = data[i].maker;
      fontList[maker] = data[i].font;
    }
    return fontList
  }

  // JSRenderを使用してtabメニューをレンダリング
  function renderTabMenu(fontList) {
    var makers = [];
    var _makers = Object.keys(fontList);
    var displayNames = _makers.map(function(maker) {
      return maker.replace(/[\n]/g, "<br>");
    });

    // JSRenderで描画するため、オブジェクトにmaker名を格納
    for (var i = 0, len = _makers.length; i < len; i++) {
      makers[i] = {};
      makers[i]["name"] = displayNames[i];
      makers[i]["maker"] = _makers[i];
    }
    var html = $('#tabMenu-template').render(makers);
    $('.tabMenu__inner').append(html);
  }

  // タブメニュークリック時のイベントをbind
  function bindTabEvent(fontList) {
    var $tabMenu = $('.tabMenu__button a');

    $tabMenu.on('click', function () {
      var maker = $(this).data('maker');
      var makerFontList = fontList[maker];
      renderPagination(maker, makerFontList);
      renderFontList(maker, 0);
      $tabMenu.removeClass("active");
      $(this).toggleClass("active");
    });
    $tabMenu.first().trigger('click'); // 先頭のメーカーを初期表示する
    return false;
  }

  var currentPage = 1;
  var pageLength = 0
  // ページネーションをレンダリング
  function renderPagination(maker, makerFontList) {
    var $pagenationWrapper = $('.fontList__pagenation');
    $pagenationWrapper.empty();

    pageLength = parseInt(makerFontList.length / FONTPLUS_LOAD_LIMIT);
    if (makerFontList.length <= FONTPLUS_LOAD_LIMIT) return; // ページネーション0の場合は表示しない
    // 最終ページの表示調整
    if (0 != makerFontList.length % FONTPLUS_LOAD_LIMIT) {
      pageLength += 1;
    }

    currentPage = 1; // 初期値に戻す

    var pagenationDOM = '';

    var prevLink = '<a href="#" class="fontList__pagenation__link link--prev js-pagenation-prevLink" data-maker="' + maker + '" data-fontListIndex=""><span class="cmn-icon cmn-icon--left fontList__pagenation__link__icon prev"></span>前へ</a>';
    var pageNav = '<p class="fontList__pagenation__text js-pageNav">' + 1 + '/' + pageLength + '</p>';
    var nextLink = '<a href="#" class="fontList__pagenation__link link--next js-pagenation-nextLink" data-maker="' + maker + '" data-fontListIndex="">次へ<span class="cmn-icon cmn-icon--right fontList__pagenation__link__icon next"></span></a>';

    pagenationDOM += '<li class="fontList__pagenation__item">' + prevLink + '</li>';
    pagenationDOM += '<li class="fontList__pagenation__item">' + pageNav + '</li>';
    pagenationDOM += '<li class="fontList__pagenation__item">' + nextLink + '</li>';

    $pagenationWrapper.append(pagenationDOM);
    updatePagenation(currentPage, pageLength);
    onClickPagenation();
  }

  // ページネーションクリック時のイベント
  function onClickPagenation() {
    $("[class*='js-pagenation']").on('click', function () {
      var maker = $(this).data('maker');
      var index = $(this).data('fontListIndex');
      var tag = $(this)[0].className;
      if (tag.match(/prev/)) {
        currentPage--;
      } else {
        currentPage++;
      }
      updatePagenation(currentPage, pageLength);
      renderFontList(maker, index);
    });
  }

  function updatePagenation(currentPage, pageLength) {
    var $prevLink = $('.js-pagenation-prevLink');
    $('.js-pageNav').text(currentPage + '/' + pageLength);
    var $nextLink = $('.js-pagenation-nextLink');
    var prev = currentPage - 1;
    var next = currentPage + 1;

    if (prev === 0) {
      $prevLink.addClass('disabled');
    } else {
      $prevLink.removeClass('disabled');
    }
    if (pageLength < next) {
      $nextLink.addClass('disabled');
    } else {
      $nextLink.removeClass('disabled');
    }

    $prevLink.data('fontListIndex', prev - 1);
    $nextLink.data('fontListIndex', next - 1);
  }

  // フォント一覧をレンダリング
  function renderFontList(maker, index) {
    var start = index * FONTPLUS_LOAD_LIMIT;
    var pageFontList = fontList[maker].slice(start, start + FONTPLUS_LOAD_LIMIT);

    $('.fontList').empty();
    var html = $('#fontList-template').render(pageFontList);
    $('.fontList').append(html);
    setCopyTooltip();

    var fontfamilies = [];
    for (var i = 0, len = pageFontList.length; i < len; i++) {
      var fontdata = {};
      var family = pageFontList[i].family;
      family = family.match(/^'(.)*$/)[0].split(', ')[0];
      family = family.substr(1, family.length - 2);
      fontdata.fontname = family;
      fontdata.nickname = 'loadname' + i;
      fontdata.text = '美しい文字あいうアイウABCabc123';

      fontfamilies.push(fontdata);
    }

    if (document.location.hostname != "localhost") {
      FONTPLUS.load(fontfamilies, null, 'loadname');
    }
  }

  // [クリップボードにコピー]ボタンのイベント追加
  function setCopyTooltip() {
    new Clipboard('.copyButton');
    $('.copyButton').on('click', function () {
      $(this).prev().fadeIn(function () {
        $(this).fadeOut();
      });
    });
  }

})(window, window.foundationAPI || (window.foundationAPI = {}));
