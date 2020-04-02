const gulp = require('gulp');
const minifycss = require('gulp-minify-css');
const minify = require('gulp-minify');
const uglify = require('gulp-uglify');
const BASE_DIR = '../../../../'; // dev/
const START_PATH = 'content/kao/sites/kaousa/www-johnfrieda-com/elements/';

// compass watchと同時にブラウザリロード

//clientlibs(/etc/clientlibs/kaousa/www-johnfrieda-com/component/css) scripts minification
gulp.task('clientlibs-styles', function() {
  	//.pipe(rename({ suffix: '.min' }))
	return gulp.src('./www-johnfrieda-com/src/css/*.css')
	.pipe(minifycss())
  //.pipe(browserSync.reload({stream:true}));
  .pipe(gulp.dest('www-johnfrieda-com/component/css'));
});

//clientlibs(/etc/clientlibs/kaousa/www-johnfrieda-com/component/js) scripts minification
gulp.task('clientlibs-scripts', function() {
	return gulp.src('./www-johnfrieda-com/src/js/*.js')
		//.pipe(plumber(plumberErrorHandler))
		//.pipe(concat('main.js'))
		//.pipe(gulp.dest('html/js'))
		//.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest('www-johnfrieda-com/component/js'));
});

/**
* default task
* 第2引数はdefaultタスク実行前に実行するタスク
*/
gulp.task('default', ['clientlibs-scripts','clientlibs-styles'], function() {
  gulp.watch('./www-johnfrieda-com/src/css/*.css', ['clientlibs-styles']);
  gulp.watch('./www-johnfrieda-com/src/js/*.js', ['clientlibs-scripts']);

});
