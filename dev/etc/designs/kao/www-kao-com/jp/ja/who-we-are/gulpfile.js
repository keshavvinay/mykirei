const gulp = require('gulp');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const watch = require('gulp-watch');
const concat = require('gulp-concat');
const notify = require('gulp-notify');
const sassGlob = require("gulp-sass-glob");

const BASE_DIR = '../../../../../../../'; // dev/
const START_PATH = 'content/kao/sites/kao/www-kao-com/jp/ja/who-we-are';
const config = require('./config').sass;


gulp.task('sass', function () {
  return gulp.src(config.src)
    .pipe(plumber({                           // エラー出たら通知
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(sassGlob())                         // Sassの@importにおけるglobを有効にする
    .pipe(sass())
    .pipe(concat(config.output))              // 1つのファイルに固める
    .pipe(autoprefixer(config.autoprefixer))  // vendor-prefixつける
    .pipe(gulp.dest(config.dest))             // 出力
    .pipe(browserSync.reload({                // ブラウザリロード
      stream: true
    }));
});

gulp.task('watch', function () {
  return watch(config.src, function () {
    return gulp.start(['sass']);
  });
});

// browser-sync
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: BASE_DIR,
      directory: true, // trueの場合、ファイル一覧を表示
    },
    startPath: START_PATH // ブラウザ表示時のpath
  });
});

/**
* default task
* 第2引数はdefaultタスク実行時に実行するタスク
*/
gulp.task('default', ['sass', 'browser-sync', 'watch']);