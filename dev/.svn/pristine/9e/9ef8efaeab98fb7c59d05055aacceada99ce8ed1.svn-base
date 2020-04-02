/* ------------------- */
//
// ftps
//
/* ------------------- */
'use strict';

module.exports = function(grunt) {

  var host = 's1.p.concentinc.jp';

  /* ------------------- */
  //  kao53
  /* ------------------- */
  grunt.config('ftps_deploy.kao53', {

    options: {
      auth: {
        host: host,
        port: 21,
        authKey: 'kao53',
        authPath: 'tasks/ftppass.json',
        secure: true
      },
      exclusions: ['.DS_Store', '.htaccess', '.png']
    },
    files: [{
      expand: true,
      cwd: '../../',
      // src: ['apps','content','etc','!**/*.png', '!**/.DS_Store', '!**/src', '!**/node_modules'],
      src: ['etc/**','content/**', 'etc/**', '!**/.DS_Store', '!**/www-kao-com', '!**/src', '!**/node_modules', '!**/_scss', '!**/config.rb'],
      dest: '/htdocs/'
    }]

  });

};
