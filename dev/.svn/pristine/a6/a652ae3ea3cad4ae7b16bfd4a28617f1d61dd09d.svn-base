'use strict';

/*-----------------------*/
// グーグルドライブに
// OAuth2認証API経由でアクセスするライブラリ
//
// 認証通ったらトークンをファイル保存、以降使い回し。
//
/*-----------------------*/

(function(exports) {

    var MyUtil = require('./myutil').MyUtil;
    var fs = require('fs');
    // var path = require("path");

    /*-----------------------*/
    // GAPI
    /*-----------------------*/
    var GAPI = (function() {

        var google = require('googleapis');
        var readline = require('readline');

        /*-----------------------*/
        // 許可を問い合わせる
        /*-----------------------*/
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        /*-----------------------*/
        // コンストラクタ
        /*-----------------------*/
        function Klass(option) {

            this.retryCount = 0;
            this.CLIENT_ID = option.CLIENT_ID;
            this.CLIENT_SECRET = option.CLIENT_SECRET;
            this.REDIRECT_URL = option.REDIRECT_URL;
            this.SCOPE = option.SCOPE;
            this.PAGE_KEY = option.PAGE_KEY;
            this.TOKENS_FILEPATH = './gapi_tokens.json';
            if (option.TOKENS_FILEPATH) {
                this.TOKENS_FILEPATH = option.TOKENS_FILEPATH;
            }

            //oauth2Client
            var oauth2Client = this.oauth2Client = new google.auth.OAuth2(this.CLIENT_ID, this.CLIENT_SECRET, this.REDIRECT_URL);

            var tokens = this.readToken();
            if (tokens) {
                oauth2Client.setCredentials(tokens);
            }

        }
        var P = Klass.prototype;

        /*-----------------------*/
        // トークンを保存
        /*-----------------------*/
        P.saveToken = function(tokens) {

            fs.writeFileSync(this.TOKENS_FILEPATH, JSON.stringify(tokens));

        };

        /*-----------------------*/
        // トークンを読み込み
        /*-----------------------*/
        P.readToken = function() {

            if (!fs.existsSync(this.TOKENS_FILEPATH)) return null;

            var tokenstr = fs.readFileSync(this.TOKENS_FILEPATH, 'utf-8');
            var token = JSON.parse(tokenstr);

            return token;
        };

        /*-----------------------*/
        // トークンを読み込み
        /*-----------------------*/
        P.checkToken = function() {
            return this.oauth2Client.credentials.access_token;
        };

        /*-----------------------*/
        // アクセストークン取得
        /*-----------------------*/
        P.getAccessToken = function(callback) {

            var me = this;
            var oauth2Client = me.oauth2Client;
            var url = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: me.SCOPE
            });

            me.retryCount++;

            console.log('右記のURLをブラウザで開いてください: ', url);

            rl.question('表示されたコードを貼り付けてください:', function(code) {

                console.log('にゃお？', code);
                oauth2Client.getToken(code, function(err, tokens) {
                    if (err) {
                        console.log('アクセストークン取得失敗', err);
                    } else {
                        console.log('アクセストークン取得に成功！');
                        console.dir(tokens);

                        /*-----------------------*/
                        // ファイル保存
                        /*-----------------------*/
                        me.saveToken(tokens);
                        /*-----------------------*/
                        // トークンをセット
                        /*-----------------------*/
                        oauth2Client.setCredentials(tokens);
                    }

                    if (callback) callback();
                });
            });
        };

        /*-----------------------*/
        // シートのリストを取得
        /*-----------------------*/
        P.getSpreadSheetList = function(callback) {

            var me = this;
            var oauth2Client = me.oauth2Client;
            /*-----------------------*/
            // トークンチェック
            /*-----------------------*/
            if (!me.checkToken()) {

                if (me.retryCount > 0) {
                    console.log('ギブアップ');
                    callback(null);
                    return;
                }
                //トークンがないので再度取得
                me.getAccessToken(function() {
                    me.getSpreadSheetList(callback);
                });
                return;
            }

            var opts = {
                url: 'https://spreadsheets.google.com/feeds/worksheets/' + me.PAGE_KEY + '/private/full?alt=json'
            };
            oauth2Client.request(opts, function(err, res) {

                if (err) {
                    console.log('getSpreadSheetListエラー', err);
                } else {
                    console.log('getSpreadSheetList 成功');

                    var feed = res.feed;
                    var entry = feed.entry;

                    var sheetLinks = [];
                    for (var i = 0, len = entry.length; i < len; i++) {
                        var d = entry[i];
                        sheetLinks.push(d.id.$t);
                    }

                    // console.log('dataList', dataList);
                    //getDownloadUrl

                    // console.log(JSON.stringify(entry));
                    if (callback) callback(sheetLinks);
                }
            });
        };

        /*-----------------------*/
        // シートIDからシート情報を取得
        // 返却データは、シート名と、セルの位置情報を意味する配列データ
        //
        // 行の配列内に、列データとしての配列が入っている
        /*-----------------------*/
        P.getSpreadSheetData = function(sheetID, callback) {
            console.log('シートIDからシート情報を取得', sheetID);
            var me = this;
            var oauth2Client = me.oauth2Client;
            /*-----------------------*/
            // トークンチェック
            /*-----------------------*/
            if (!me.checkToken()) {
                if (me.retryCount > 0) {
                    console.log('ギブアップ');
                    callback(null);
                    return;
                }
                //トークンがないので再度取得
                me.getAccessToken(function() {
                    me.getSpreadSheetData(sheetID, callback);
                });
                return;
            }

            //https://docs.google.com/spreadsheets/d/1vwe5wHm3Ui5VA7MBp_GKpqpULRluYCX-uKmruSoNPHc/edit#gid=0
            //https://docs.google.com/spreadsheets/d/1HEGLrdidM_QOnXgiwLYdGGrcUexT5UWTX06dRPuyDtw/edit#gid=0

            var opts = {
                // url: 'https://spreadsheets.google.com/feeds/list/' + key + '/od6/private/basic?alt=json'
                url: 'https://spreadsheets.google.com/feeds/cells/' + me.PAGE_KEY + '/' + sheetID + '/private/basic?alt=json'
            };
            oauth2Client.request(opts, function(err, res) {

                if (err) {
                    console.log('getSpreadSheetエラー', err);
                } else {
                    console.log('getSpreadSheet成功');

                    var dataList = [];
                    var feed = res.feed;
                    var sheetname = feed.title.$t;
                    var entry = feed.entry;
                    // var list = [];
                    for (var i = 0, len = entry.length; i < len; i++) {

                        var cell = entry[i];
                        var cellname = cell.title.$t;
                        var str = cell.content.$t;

                        // console.dir(cell);
                        // console.log('cellname', cellname);
                        var colnum = (+MyUtil.col_to_num(cellname.slice(0, 1))) - 1;
                        var rownum = (+cellname.slice(1)) - 1;
                        // console.log('行', rownum, '列', colnum);

                        if (!dataList[rownum]) {
                            dataList[rownum] = [];
                        }
                        dataList[rownum][colnum] = str;

                    }

                    if (callback) callback(sheetname, dataList);
                }
            });

        };

        return Klass;

    })();

    exports.GAPI = GAPI;

})(exports);
