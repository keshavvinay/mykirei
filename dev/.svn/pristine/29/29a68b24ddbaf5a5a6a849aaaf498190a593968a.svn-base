'use strict';

(function(exports) {



    // var path = require("path");

    /*-----------------------*/
    // MyUtil
    /*-----------------------*/
    var MyUtil = (function() {
        var RADIX = 26;
        var A = 'A'.charCodeAt(0);

        return {
            /*-----------------------*/
            // アルファベットを数値に変換
            /*-----------------------*/
            col_to_num: function(string_col_index) {
                var s = string_col_index.toUpperCase();
                var n = 0;
                for (var i = 0, len = s.length; i < len; i++) {
                    n = (n * RADIX) + (s.charCodeAt(i) - A + 1);
                }
                return n;
            },
            /*-----------------------*/
            // 数値をアルファベットに変換
            /*-----------------------*/
            num_to_col: function(numeric_col_index) {
                var n = numeric_col_index;
                var s = '';
                while (n >= 1) {
                    n--;
                    s = String.fromCharCode(A + (n % RADIX)) + s;
                    n = Math.floor(n / RADIX);
                }
                return s;
            },

            /*-----------------------*/
            // 桁をそろえてストリングに変換
            /*-----------------------*/
            keta: function(num, ketanum) {
                var str = num + '';
                while (str.length < ketanum) {
                    str = '0' + str;
                }
                return str;
            },

            /*-----------------------*/
            // システムコマンド実行
            /*-----------------------*/
            execcommand: function(command) {
                var exec = require('child_process').exec;
                exec(command);
            },

            /*-----------------------*/
            // ファイル名を取得
            // @noextension true:拡張子除く
            /*-----------------------*/
            basename: function(path, noextension) {
                var tmp = path.split('/');
                var ret = tmp.pop();
                if(noextension && ret.indexOf('.') != -1){
                    ret = ret.split('.')[0];
                }
                return ret;
            },

            /*-----------------------*/
            // パスを取得
            /*-----------------------*/
            dirname: function(path) {
                var tmp = path.split('/');
                tmp.pop();
                var ret = tmp.join('/');

                return ret;
            },
        };
    })();



    exports.MyUtil = MyUtil;

})(exports);
