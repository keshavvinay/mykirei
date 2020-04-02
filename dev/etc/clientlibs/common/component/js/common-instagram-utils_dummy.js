var common = common || {};
common.instagram = common.instagram || {};

/**
 * instagram用ダミーFunction
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
}(common.instagram.utils = common.instagram.utils || {}));
