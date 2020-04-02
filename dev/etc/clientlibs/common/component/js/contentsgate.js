/**
 * KAO WCM Contents Gate.
 */
(function(window, kaoAPI) {
  'use strict';

  $(document).ready(function() {
    var isAuthorring = $.fn.isAuthorring();
    var $contentsGate = $("[class*='js-contentsGate']");
    if (!$contentsGate[0]) return;
    if (isAuthorring) return;

    var cookieName = function() {
      var allclass = $contentsGate.attr('class');
      var arr = allclass.split(/js-contentsGate-/)[1];
      return arr.split(' ')[0];
    }();

    // cookieの名前がセットされていない場合、アラートを出す
    if (isNotsetCookieName(cookieName)) {
      alert('コンテンツゲートの名前を入力してください。(例)js-contentsGate—healthyamaltstyle');
      return;
    }

    // cookieの有無でcontentsGateを閉じる
    if (checkExistCookie(cookieName)) {
      $contentsGate.remove();
      return;
    }

    var $contentsGateWrapper = $('<div class="g-Area" id="area-GateContents">');
    var height = function() {
      var minHeight = $contentsGate.height();
      var _height = window.innerHeight - ($('#area-GlHeader').outerHeight() + $('#area-GlFooter').outerHeight());
      if (_height <= minHeight) {
        return minHeight;
      }
      return _height;
    }
    $contentsGateWrapper.height(height);
    $('#area-GlHeader').after($contentsGateWrapper);
    $contentsGate.appendTo('#area-GateContents');

    var notList = '#area-GlHeader, #area-GateContents, #area-GlFooter';
    $('.g-Area').not(notList).hide();

    var $allowLink = $contentsGate.find('.js-allowContentsGate'); // 承認リンク
    // 承認リンクを押したらcookieを書き込む
    $allowLink.on('click', function() {
      // cookieに承認情報を保存。期限はブラウザを閉じるまで
      document.cookie = (cookieName + '=true; path=/');
      location.reload();
    });
  });

  /**
   * cookie名がセットされているか返却する
   * @param {String} cookieName
   * @return {boolean}
   */
  function isNotsetCookieName(cookieName) {
    return (cookieName === 'xxx');
  }

  /**
   * cookieが存在するかチェックする
   * @param {String} cookieName
   * @return {boolean}
   */
  function checkExistCookie(cookieName) {
    var cookieStr = document.cookie;
    var cookies = cookieStr.split('; ');
    var regexp = new RegExp(cookieName + '(.*)');
    for (var i = 0, len = cookies.length; i < len; i++) {
      if (cookies[i].match(regexp)) return true;
    }
    return false;
  }

})(window, window.kaoAPI || (window.kaoAPI = {}));