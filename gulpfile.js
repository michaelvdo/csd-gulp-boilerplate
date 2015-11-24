'use strict';

// requires
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var inject = require('gulp-inject');
var normalize = require('node-normalize-scss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

//
// directory variables
//

// project name
var projectName = 'project_gulp';

// serve folder
var baseDir = 'dist/'+ projectName + '/' + projectName + '.ui.apps/src/main/content/jcr_root/etc/designs/' + projectName;

// dist directories
var htmlDistFiles = baseDir + '/frontend/';
var cssDistFiles = baseDir + '/clientlibs_base/css/';
var jsDistFiles = baseDir + '/clientlibs_body/js/';
var fontsDistFiles = baseDir + '/clientlibs_base/fonts/';
var imgDistFiles = baseDir + '/clientlibs_base/img/';

// source directories
var htmlFiles = 'app/html/*.html';
var sassFiles = 'app/styles/**/*.scss';
var jsFiles = 'app/js/**/*.js';

//
// gulp tasks
//

// gulp static server task (start server on port 8080)
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: baseDir,
      directory: true
    },
    port: 8080,
    notify: false
  });
});

// gulp html task (move html files to dist and refresh browser)
gulp.task('html', function() {
  return gulp.src(htmlFiles)
  .pipe(gulp.dest(htmlDistFiles))
  .pipe(browserSync.stream());
});

// gulp sass task (process sass files, add sourcemap and prefixes, refresh browser)
gulp.task('sass', function() {
  return gulp.src(sassFiles)
  .pipe(sourcemaps.init())
  .pipe(sass({
    includePaths: normalize.includePaths // add normalize to compiled css
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['not ie <= 8', 'last 3 versions']
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(cssDistFiles))
  .pipe(browserSync.stream());
});

// gulp js task (move js files to dist and refresh browser)
gulp.task('js', function() {
  return gulp.src(jsFiles)
  .pipe(gulp.dest(jsDistFiles))
  .pipe(browserSync.stream());
});

// gulp inject:libs task (inject link/script elements in dist html files)
gulp.task('inject:libs', function() {
  return gulp.src(htmlFiles)
  .pipe(inject(gulp.src([cssDistFiles + '*.css', jsDistFiles + '*.js'], {read: false}), {
    relative: false,
    ignorePath: baseDir,
    addPrefix: '..',
    addRootSlash: false
  }))
  .pipe(gulp.dest(htmlDistFiles));
});

// gulp serve task (setup server, watch for file changes)
gulp.task('serve', ['sass', 'browser-sync'], function() {
  gulp.watch( htmlFiles, ['html', 'inject:libs']);
  gulp.watch( sassFiles, ['sass']);
  gulp.watch( jsFiles, ['js']);
});

// gulp default task
gulp.task('default', ['serve']);

// gulp init task (run once on project init for file/folder creation)
gulp.task('init', ['html', 'sass', 'js']);
