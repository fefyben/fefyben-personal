'use strict';
 
const gulp = require('gulp'),
      sass = require('gulp-sass'),
      useref = require('gulp-useref'),
      uglify = require('gulp-uglify'),
      gulpIf = require('gulp-if'),
      cssnano = require('gulp-cssnano'),
      del = require('del'),
      runSequence = require('run-sequence');

/* Task to compile and convert SCSS to CSS
------------------------------------------------------------------------------*/
function css() {
  return gulp .src('app/scss/**/*.scss')
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(gulp.dest('app/css'));
}

/* Task to watch files
------------------------------------------------------------------------------*/
function watch() {
  gulp.watch('app/scss/**/*.scss', css);
}

/* Task to concatenate files located in two different directories
------------------------------------------------------------------------------*/
function useRef() {
  return gulp.src(['app/*.html', 'app/**/*.json'])
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
}

/* Task to clean the dist folder
------------------------------------------------------------------------------*/
function clean() {
  return del('dist');
}

/* Complex tasks to build the project
------------------------------------------------------------------------------*/
const build = gulp.series(clean, gulp.parallel(css, useRef));

// Public Tasks
exports.watch = watch;
exports.build = build;
