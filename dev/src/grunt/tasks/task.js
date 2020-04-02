/* ------------------- */
//
// daisenタスク
//
/* ------------------- */
'use strict';

module.exports = function(grunt) {


    // var util = require('../lib/myutil').MyUtil;
    var content = '../../content/';
    var etc = '../../etc/';


    /* -----------------------*/
    // 監視テスト
    /* -----------------------*/
    grunt.config('esteWatch', {

        options: {
            dirs: [content + '**/', etc + '**/'],
            livereload: {
                enabled: true,
                extensions: ['js', 'css', 'html']
            }
        },

        '*': function(filepath) {

        }

    });


    // content以外のhtdocsをpjにアップロード
    // （testディレクトリも含める）
    /*-----------------------*/
    // grunt.registerTask('pj_front_with_test', ['logstart', 'copy:export_htdocs_test', 'replace:export_htdocs', 'ftp-deploy:pj_front', 'logfinish']);
    grunt.registerTask('ftp_kao53', ['logstart', 'ftps_deploy:kao53', 'logfinish']);

};
