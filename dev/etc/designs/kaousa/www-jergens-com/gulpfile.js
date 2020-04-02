const gulp = require('gulp');
//const browserSync = require('browser-sync');
const compass = require('gulp-compass');
//const csso = require('gulp-csso');
const readDir = require('readdir');
const run = require('gulp-run');
const runSequence = require('run-sequence');
//const aemSync = require('gulp-aemsync'); 
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');
//var gutil = require('gulp-util');
//var ftp = require('gulp-ftp');
//const webdav = require( 'gulp-webdav-sync' )
const argv = require('yargs').argv

const log = require('fancy-log');

var target = '';
var uglifyType='';
var deployJSType='';
var env = argv.env;
var brandName = 'www-jergens-com';
var brandFolder = '/etc/designs/kaousa/'+brandName+'/';
var targettedFolder = 'jcr_root';
var prodFiles = targettedFolder+'';

var sourceFolder='';
var sourceFiles='';
var targetFilename='';
var filesArray='';
var filenames='';
var clPath='';

if(env == 0){
	target = 'http://sit1dig001:RBWvhFxk3K5w@elb-ver-wcm-auth-472389826.ap-northeast-1.elb.amazonaws.com';
	uglifyType = 'doNothing';
	deployJSType = 'deploy-js';
}else{
	uglifyType = 'uglifyJS';
	deployJSType = 'doNothing';
}


//CSS
gulp.task('run-seq-for-css', function() {
    runSequence('compass','minifyCSS','deploy-css','cleanCSSTarget', function() {
    });
});

gulp.task('compass', function() {
  return gulp.src('./component/_scss/*.scss')
  .pipe(compass({
    config_file: 'config.rb',
    comments: false,
    css: './component/css/',
    sass: 'component/_scss/'
  }))
});
gulp.task('minifyCSS', function () {
	if(env == 0){
		return gulp.src('./component/css/*.css')
		.pipe(gulp.dest('./'));
	}else{
		return gulp.src('./component/css/*.css')
		.pipe(cleanCSS())
		.pipe(gulp.dest('./'+prodFiles+'/'+brandName+'/component/css'));
	}
});
gulp.task( 'deploy-css', function () {
	var cssFileNamesArray = readDir.readSync( './', ['*.css'] );
	cssFileNamesArray = cssFileNamesArray.toString();
	log('curl -T {'+cssFileNamesArray+'} ' + target + brandFolder + 'component/css/');
  return run('curl -T {'+cssFileNamesArray+'} ' + target + brandFolder + 'component/css/').exec();
});
gulp.task('cleanCSSTarget', function(){
    return gulp.src(['*.css'], {read: false})
        .pipe(clean());
});


//JS
gulp.task('run-seq-for-js', function() {
    runSequence('copy-js',uglifyType,deployJSType,'cleanTarget', function() {
    });
});

gulp.task('copy-js', function() {
    return gulp.src(sourceFiles)
        .pipe(gulp.dest('.'));
});
gulp.task('doNothing', function() {
  return ;
});
gulp.task('uglifyJS', function() {
  return run('uglifyjs '+filenames+' -cmo '+targetFilename+'.min.js --source-map url='+sourceFolder+targetFilename+'.min.js.map').exec();
});
gulp.task('deploy-js', function () {
  return run('curl -T {'+filesArray+'} ' + target + brandFolder + sourceFolder).exec();
});
gulp.task('deploy-min-js', function () {
  return run('curl -T {'+filesArray+','+targetFilename+'.min.js,'+targetFilename+'.min.js.map} ' + target + brandFolder + sourceFolder).exec();
});

gulp.task('cleanTarget', function(){
    return gulp.src(['*.js','*.map','!gulpfile.js'], {read: false})
        .pipe(clean());
});

gulp.task('cleanRootFolder', function() {
    return gulp.src(['./jcr_root'], {read: false})
        .pipe(clean());
});
gulp.task('productionCSS', function() {
    runSequence('compass','minifyCSS','cleanCSSTarget', function() {
    });
});
gulp.task('productionJS',function(){
	var folderNamesArray = readDir.readSync( './', ['*/'], readDir.INCLUDE_DIRECTORIES );
	var folderNames = folderNamesArray.toString().split('/').join('');
	folderNames = folderNames.split(',');
	
	var count = 0;
	var copyOfFolderNames = folderNames;
	
	folderNames.forEach(function(newFolderName) {
		if(newFolderName!='.sass-cache' && newFolderName!='node_modules' && newFolderName!='jcr_root'){
			var jsFileNamesArray = readDir.readSync( newFolderName+'/', ['**.js'] );
			var file_path = jsFileNamesArray.toString().split(',')[0];
			if(file_path != undefined && file_path != ''){
				count++;
				file_path = brandName+'\\'+newFolderName+'\\'+file_path.split('/').join('\\');
				initPathVariables(file_path);
				
				gulp.task(targetFilename, function() {
					return gulp.src(sourceFiles)
					.pipe(gulp.dest('.'))
					.pipe(gulp.dest('./'+prodFiles+'/'+brandName+'/'+newFolderName+clPath))
					.pipe(run('uglifyjs '+filenames+' -cmo '+targetFilename+'.min.js --source-map url='+sourceFolder+targetFilename+'.min.js.map').exec('one',function(){
						count--;
						copyOfFolderNames.forEach(function(copyFolderNames) {
							if(copyFolderNames!='.sass-cache' && copyFolderNames!='node_modules' && copyFolderNames!='jcr_root'){
								var clbPath='';
								if(copyFolderNames == 'component'){
									clbPath='/js';
								}
								gulp.src('./'+copyFolderNames+'.*')
								.pipe(gulp.dest('./'+prodFiles+'/'+brandName+'/'+copyFolderNames+clbPath));
							}
						});	
					}));
				});
				
				runSequence(targetFilename,function(){
					
					if(count == 0){
						
						gulp.src(['./*.js','./*.map','!./gulpfile.js'])
						.pipe(clean());
					}
				});
			}
		}
	});	
});

gulp.task('production',function(){
	runSequence('productionJS','productionCSS', function() {
    });
});

/**
* default task
* 第2引数はdefaultタスク実行前に実行するタスク
*/
gulp.task('default',['cleanRootFolder'], function() {
	if(env == 0){
		gulp.watch('./component/_scss/**/*.scss', ['run-seq-for-css']);
		gulp.watch(['./**/*.js','!./gulpfile.js']).on('change',function(file){
			var file_path = file.path;
			initPathVariables(file_path);
			runSequence('run-seq-for-js', function() {	
			});
		});
	}else{
		runSequence('production', function() {	
		});
	}
});

function initPathVariables(file_path){
	sourceFolder='';
	sourceFiles='';
	targetFilename='';
	filesArray='';
	filenames='';
	clPath='';
	var sourcePath = file_path.toString().split(''+brandName+'\\')[1].split('\\');
	for(var i=0;i<sourcePath.length-1;i++){
	  sourceFolder = sourceFolder + sourcePath[i]+'/';
	  if(i==0){
		  targetFilename = sourcePath[i];
	  }
	}
	sourceFiles = sourceFolder+'*.js';
	filesArray = readDir.readSync( sourceFolder, ['*.js'] );
	filesArray = filesArray.toString();
	filenames = filesArray.split(',').join(' ');
	if(sourcePath.length == 2){
	  sourceFolder='';
	  clPath='';
	}else{
		clPath='/js';
	}
};
