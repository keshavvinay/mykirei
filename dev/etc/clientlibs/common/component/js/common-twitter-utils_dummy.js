var common = common || {};
common.twitter = common.twitter || {};

/**
 * Twitter用ダミーFunction
 */
(function (utils, pagePath, cachePath) {
  "use strict";

  utils.getLatestData = function (pagePath, cachePath, callback) {
    console.log(cachePath);
    //本来は引数チェックを実施
    //サーバ上のダミーデータを取得
    $.getJSON(cachePath, function (json) {
      //コールバックへデータを渡す
      callback(json);
    });
  };
}(common.twitter.utils = common.twitter.utils || {}));
