/**
 * Contains gulp build tasks. Following are the files that are supported:
 * 
 *      Any client library folder (folder which are direct children of 'currentFolderpath')
 *      which contains one of following: 1) .js / .css files directly under it, 2) .js file(s)
 *      under a folder named 'js' which is directly under it, 3) .css file(s)
 *      under a folder named 'css' which is directly under it.
 * 
 * Following are the environments supported (Usage with gulp command: --env <environment>):
 * 1) sit - Supports watch; no minification
 * 2) prod - No support for watch; minification enabled
 * 
 * Following are the tasks:
 * 
 * watch-deploy - Watches for changes in JS / CSS and files and pushes them to corresponding AEM
 * environment; supported in only 'sit' and 'dev' environments
 * clean - Cleans both temp & target folders
 * build - Full build of all CSS & JS files and files are moved to target folder; by default, minfication
 * is disabled; enable by setting environment to 'prod'
 * 
 * By default 'build' task is triggered.
 * 
 * Setup Steps:
 * 
 * 1) Install node, npm and gulp globally; make sure npm and gulp commands work globally from command line.
 * 2) Install npm modules using npm install --save-dev <module name>: gulp, compass, readdir, run-sequence, gulp-clean,
 * gulp-clean-css, yargs, fs, gulp-uglify, gulp-sourcemaps, gulp-rename, gulp-concat, merge-stream,
 * gulp-run, fancy-log, gulp-if.
 * 
 * (or)
 * 
 * 2) Use the package.json in this folder to identify and install all dependencies.
 * 3) Make sure curl command line tool is installed and works globally from command line.
 */
const gulp = require('gulp');
const compass = require('gulp-compass');
const readDir = require('readdir');
const run = require('gulp-run');
const runSequence = require('run-sequence');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const gulpif = require('gulp-if');
const argv = require('yargs').argv
const log = require('fancy-log');
const fs = require('fs');

/**
 * Following are the configurations:
 * 
 * currentFolderpath - Base folder for all JS & CSS files to include in build
 * tempFolder - Temp folder for build intermittent results
 * targetFolder - Output base folder
 * clientLibsToMinify - Only the client libs mentioned in this array will be minified 
 * when minification is enabled; give name of folder right under currentFolderpath
 * designPath - Design path in AEM for the brand.
 */
let currentFolderpath = '';
let tempFolder = 'temp/etc/designs/kaousa/www-mykirei-com/';
let targetFolder = 'target/etc/designs/kaousa/www-mykirei-com/';
let designPath = 'etc/designs/kaousa/www-mykirei-com/';
let subDesignPath = 'etc/designs/kaousa/www-mykirei-com/sub/';
let clientLibsToMinify = ['component','contactus','signup'];

/**
 * Reads environment and sets configurations. Following are the configurations:
 * 
 * target - Url for auto-deploy of files on change; applies only to SIT & DEV and 
 * affects only the 'watch-deploy' task
 * 
 * minificationRequired - Controls if minification of JS & CSS are required; affects only 
 * 'build' task.
 */
let target = '';
let env = argv.env;
let sub = argv.sub;
let brandName = 'www-mykirei-com/';
//let brandFolder = '/etc/designs/kaousa/'+brandName+'/';
//let targettedFolder = 'jcr_root';
let minificationRequired = false;

if (env == 'sit'){
    target = 'https://sit1dig001:RBWvhFxk3K5w@vrf-auth.sites.kao.wcm-ecm.com/';
}else if(env == 'prod'){
	minificationRequired = true;
}
/*
contains multiple tasks for deploying scss files
*/
gulp.task('run-seq-for-css', function() {
    runSequence('compass','copy-css','deploy-css','cleanCSSTarget', function() {
    });
});

/*
converts scss files into cs files
*/
gulp.task('compass', function(){
    return gulp.src('./component/scss/*.scss')
	  .pipe(compass({
		config_file: 'config.rb',
		comments: false,
        cache : false,
		css: '.',
		sass: 'component/scss/'
	  }))
});

/*
copies to the root folder
*/
gulp.task('copy-css',function(){
    return gulp.src('./component/css/*.css')
    .pipe(gulp.dest('./'));
});

/*
deploy the corresponding css files which are changed by using curl command to the corresponding enviironment
*/
gulp.task('deploy-css',function(){
    var cssFileNamesArray = readDir.readSync( './', ['*.css'] );
	cssFileNamesArray = cssFileNamesArray.toString();
    if(!target.startsWith("http")) {
        throw "Environment not defined!";
    }
    if(sub == undefined || sub == null || sub == ""){
       return run('curl --fail -T {'+cssFileNamesArray+'} ' + target + designPath + 'component/css/').exec();
       }
    else{
        return run('curl --fail -T {'+cssFileNamesArray+'} ' + target + subDesignPath + sub + '/component/css/').exec();
    }
    
});

/*
cleans all the css files from root folder
*/
gulp.task('cleanCSSTarget', function(){
    return gulp.src(['*.css'], {read: false})
        .pipe(clean());
});

/**
 * Copies all JS, JS txt, CSS txt & CSS files from base folder path to temp folder.
 * 
 * Depends on 'clean-temp' task.
 */
gulp.task('copy-files-to-temp', ['clean-temp'], function() {
    return gulp.src(['./*/*.css','./*/css/*.css','./*/css/*/*.css',
        './*/*.js','./*/js/*.js','./*/js/*/*.js',
        './*/css.txt','./*/js.txt'])
        .pipe(gulp.dest(tempFolder));
});

/**
 * Copies all output JS, minified JS, map & CSS files from temp folder path to target folder.
 * 
 * Depends on 'clean-target' task.
 */

gulp.task('copy-files-to-target', ['clean-target'], function() {
    return gulp.src([tempFolder + '*/*.css', tempFolder + '*/css/*.css', tempFolder + '*/css/*/*.css',
        tempFolder + '*/*.js', tempFolder + '*/js/*.js', tempFolder + '*/js/*/*.js',
        tempFolder + '*/*.js.map', tempFolder + '*/js/*.js.map'])
        .pipe(gulp.dest(targetFolder));
});

/**
 * Minifies all CSS files and puts them in the same folder as the original file.
 * Minified files are suffixed with '.min.css'.
 */
gulp.task('minify-css', function() {
    let cssFilesForMinification = [];
    clientLibsToMinify.forEach(function(clientLib) {
        cssFilesForMinification.push(tempFolder + clientLib + '/**/*.css');
    });
    return gulp.src(cssFilesForMinification)
        .pipe(cleanCSS())
        .pipe(gulp.dest(function(file) {
            return file.base;
        }));
});

/**
 * Minifies all JS files and puts them in the same folder as the original file(s).
 * Supports either of the two formats based upon below condition:
 * 
 * If client library has js.txt, 
 * 
 * 1) all files mentioned there will be concatenated and then
 * minified; minified file and map file will be generated including all the files in this list.
 * As client libraries with js.txt are referred using a path different from the absolute path within AEM,
 * map files are placed in a dummy path e.g. clientlibs/js/clientlibs/js/clientlibs.min.js.map.
 * 
 * (or)
 * 
 * 2) All JS files are minified individually and minified file and map file are generated one
 * per JS file
 * 
 * Minified files are suffixed with '.min.js' and map files are suffixed with '.js.map'.
 */
gulp.task('minify-js', function() {
    let minifyJsTasks = [];
    clientLibsToMinify.forEach(function(clientLib) {
        let jsTxtFiles = [];
        if(fs.existsSync( tempFolder + clientLib + '/js.txt' )) {
            let jsTxtFile = fs.readFileSync( tempFolder + clientLib + '/js.txt', 
                { encoding: "utf8" });
            let jsTxtLines = jsTxtFile.split(/\r?\n/);
            if(jsTxtLines && jsTxtLines.length > 0) {
                jsTxtLines.forEach(function(jsTxtLine) {
                    if(jsTxtLine && jsTxtLine.trim() != '' && !jsTxtLine.startsWith('#')) {
                        jsTxtFiles.push( tempFolder + clientLib + '/js/' + jsTxtLine );
                    }
                });
            }
        }
        
        // if there are files included in js.txt
        if(jsTxtFiles.length > 0) {
            minifyJsTasks.push(
                gulp.src(jsTxtFiles)
                    .pipe(sourcemaps.init())
                        .pipe(concat(clientLib + '.js'))
                        .pipe(uglify())
                        .pipe(rename({
                            suffix: '.min'
                        }))
                    .pipe(sourcemaps.write('./' + clientLib + '/js'))
                    .pipe(gulp.dest(function(file) {
                        return file.base;
                    }))
            );
        // if not;  excluding the ones processed above
        } else {
            minifyJsTasks.push(
                gulp.src([tempFolder + clientLib + '/**/*.js'])
                    .pipe(sourcemaps.init())
                        .pipe(uglify())
                        .pipe(rename({
                            suffix: '.min'
                        }))
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest(function(file) {
                            return file.base;
                        }))
                );
        }
    });
    return merge(minifyJsTasks);
});

 //Moves map files from dummy path to the actual path e.g. 

gulp.task('move-map-files', function() {
    let mapFilesForMove = [];
    clientLibsToMinify.forEach(function(clientLib) {
        mapFilesForMove.push(tempFolder + '/**/*.js.map');
    });

    return gulp.src(mapFilesForMove)
        .pipe(rename(function (path) {
            path.dirname += "/../../"
        }))
        .pipe(gulp.dest(tempFolder));
});

/**
 * Cleans temp folder.
 */
gulp.task('clean-temp', function() {
    return gulp.src(tempFolder, {read: false})
        .pipe(clean());
});

/**
 * Cleans target folder.
 */
gulp.task('clean-target', function() {
    return gulp.src(targetFolder, {read: false})
        .pipe(clean());
});

/**
 * Build task. Copies files from original source path to temporary path,
 * triggers minification if required and them copies output files to target path. 
 */
gulp.task('build', function() {
    if(minificationRequired) {
        runSequence('compass','copy-files-to-temp', 'minify-css', 'minify-js', 'move-map-files', 'copy-files-to-target',
            function() {
                // do nothing
            }
        );
    } else {
        runSequence('copy-files-to-temp', 'copy-files-to-target',
            function() {
                // do nothing
            }
        );
    }
});


/**
 * Cleans temp & target folders.
 */
gulp.task('clean', function() {
    runSequence('clean-temp', 'clean-target',
        function() {
            // do nothing
        }
    );
});

/**
 * Watches for file changes in JS files and deploys them to corresponding
 * environment directly using curl command.
 */
// for changes in scss file the 'run-seq-for-css' is triggered
//have to make changes
gulp.task('watch-deploy', function () {
    gulp.watch('component/scss/**/*.scss',['run-seq-for-css']);
    gulp.watch(['*/*.js','*/js/*.js','*/js/*/*.js']).on('change',function(file) {

        // get target path
        let path = file.path;
        let contextPath = path.replace(/\\/g, "/").split(brandName)[1];
        let targetPath = target + designPath + contextPath;
        if(!targetPath.startsWith("http")) {
            throw "Environment not defined!";
        }
        log(contextPath);
        if(sub == undefined || sub == null || sub == ""){
            return run('curl --fail -T ' + path + ' ' + targetPath).exec();
        }
        else{
            return run('curl --fail -T ' + path + ' ' + target + subDesignPath + sub + '/component/js/').exec();
        }
    });
});

/**
 * Triggers build task by default.
 */
gulp.task('default', function() {
    runSequence('build',
        function() {
            // do nothing
        }
    );
});