module.exports = function(grunt) {
  'use strict';

  //var pkg = grunt.file.readJSON('package.json');
  var clientlibsPath = '../../etc/clientlibs/common/';
  var foundationPath = '../../etc/designs/_foundation/';

  /* -----------------------*/
  // モジュールをロード
  /* -------------------4----*/
  //require('load-grunt-tasks')(grunt);

  /* ------------------- */
  //  initConfig
  /* ------------------- */
  grunt.initConfig({

    clean: {
      options: {
        'force': true
      },
      release: [foundationPath + '*']
    },

    copy: {
      clientlibs: {
        files: [{
          expand: true,
          cwd: clientlibsPath,
          src: [
            'config.rb',
            '_scss/**',
            '**/css.txt',
            '!**/authoring/**',
            '!**/layout/**',
            '!**/slick.scss',
            '!**/libs/pattern/**',
            '!lib/**'
          ],
          dest: foundationPath,
          dot: false
        }]
      }
    },

    replace: {
      principles: {
        //cwd: foundationPath,
        src: [
          foundationPath + '**/*.scss',
        ],
        overwrite: true,
        replacements: [{
          from: '.g-',
          to: '.l-'
        }]
      },
      ignore_css: {
        src: [
          foundationPath + 'component/css.txt',
        ],
        overwrite: true,
        replacements: [{
            from: 'slick.css',
            to: ''
        }]
      }
    },

    compass: {
      compile: {
        options: {
          config: foundationPath + 'config.rb'
        }
      }
    }

  });

  /* ------------------- */
  //  loadTasks
  /* ------------------- */
  //grunt.task.loadTasks('tasks');

  //plubins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-compass');

  //tasks
  grunt.registerTask('foundation', ['clean', 'copy', 'replace']);

};
