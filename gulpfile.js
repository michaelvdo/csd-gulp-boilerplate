(function() {

  'use strict';

  // requires
  var gulp            = require('gulp'),
      autoprefixer    = require('gulp-autoprefixer'),
      browserSync     = require('browser-sync').create(),
      concat          = require('gulp-concat'),
      include         = require('gulp-include'),
      normalize       = require('node-normalize-scss'),
      sass            = require('gulp-sass'),
      sourcemaps      = require('gulp-sourcemaps');

  //
  // directory variables
  //

  // project name
  var projectName = 'project_gulp';

  // serve folder
  // var baseDir = 'dist/'+ projectName + '/' + projectName + '.ui.apps/src/main/content/jcr_root/etc/designs/' + projectName;

  var baseDir = 'dist';

  // dist directories
  var htmlDistFiles   = baseDir + '/frontend/',
      cssDistFiles    = baseDir + '/clientlibs_base/css/',
      jsDistFiles     = baseDir + '/clientlibs_body/js/',
      fontsDistFiles  = baseDir + '/clientlibs_base/fonts/',
      imgDistFiles    = baseDir + '/clientlibs_base/img/';

  // source directories
  var htmlFiles = 'app/html/**/*.html',
      sassFiles = 'app/styles/**/*.scss',
      jsFiles   = 'app/js/**/*.js';

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
    gulp.src(htmlFiles)
    .pipe(include())
      .on('error', console.log)
    .pipe(gulp.dest(htmlDistFiles));
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
    .pipe(concat('app.js'))
    .pipe(gulp.dest(jsDistFiles))
    .pipe(browserSync.stream());
  });

  // gulp serve task (setup server, watch for file changes)
  gulp.task('serve', ['sass', 'browser-sync'], function() {
    gulp.watch( htmlFiles, ['html']);
    gulp.watch( sassFiles, ['sass']);
    gulp.watch( jsFiles, ['js']);
  });

  // gulp default task
  gulp.task('default', ['serve']);

  // gulp init task (run once on project init for file/folder creation)
  gulp.task('init', ['html', 'sass', 'js']);

})();
