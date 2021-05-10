'use strict';

//
// Packages
//

const gulp = require('gulp');
const del = require('del');
const svgsprite = require('gulp-svg-sprite');
const imagemin = require('gulp-imagemin');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sasslint = require('gulp-sass-lint');
const ext = require('gulp-ext-replace');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const mustache = require("gulp-mustache");

//
// Processes
//

// Clean
function clean() {
  return del([
    './dist/theme/assets',
    './dist/theme/layouts'
  ]);
}

//
// JS
//

function javascript() {
  gulp
    .src([
      './src/js/scripts.js'
    ], { allowEmpty: true })
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
  return gulp
    .src([
      'node_modules/@popperjs/core/dist/umd/popper.js',
      'node_modules/bootstrap/dist/js/bootstrap.js',
      './src/js/scripts.js'
    ], { allowEmpty: true })
    .pipe(uglify({
      mangle: true,
      compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: false
      }}
    ))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./dist/theme/assets/js/'));
}


//
// CSS
//

function styles() {
  gulp
    .src('./src/scss/*.scss', { allowEmpty: true })
    .pipe(sasslint({'configFile': './.sass-lint.yml'}))
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError());
  return gulp
    .src('./src/scss/styles.scss', { allowEmpty: true })
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./dist/theme/assets/css/'));
}


//
// Assets
//


function fonts() {
  return gulp
    .src('./src/fonts/*', { allowEmpty: true })
    .pipe(gulp.dest('./dist/theme/assets/fonts/'));
}


function sprite() {
  return gulp
    .src('./src/sprite/**/**/*.svg', { allowEmpty: true })
    .pipe(
      svgsprite({
        shape: {
          spacing: {
            padding: 5
          }
        },
        mode: {
          symbol: true
        },
        svg: {
          xmlDeclaration: false,
          doctypeDeclaration: false,
          namespaceIDs: false,
          namespaceClassnames: false
        }
      })
    )
    .pipe(concat('sprite.mustache'))
    .pipe(gulp.dest('./src/mustache/partials/'));
}


function images() {
  return gulp
    .src('./src/img/**/**/*', { allowEmpty: true })
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest('./dist/theme/assets/img/'));
}


//
// HTML
//

// HTML
function html() {
  return gulp
    .src('./src/mustache/*.mustache', { allowEmpty: true })
    .pipe(mustache())
    .pipe(ext('.html'))
    .pipe(gulp.dest('./dist/theme/layouts/'));
}


//
// Watch and build scripts
//

const watch =
  gulp.series(
    clean,
    gulp.parallel(
      sprite,
      fonts,
      images,
      styles,
      javascript
    ),
    html,
    watchFiles
  );

const spritewatch =
  gulp.series(
    sprite,
    html
  );

function watchFiles() {
  gulp.watch('./src/scss/**/*.scss', styles);
  gulp.watch('./src/js/**/*.js', javascript);
  gulp.watch('./src/mustache/**/*.mustache', html);
  gulp.watch('./src/fonts/*', spritewatch);
  gulp.watch('./src/sprite/**/*', sprite);
  gulp.watch('./src/img/**/*', images);
}


//
// Export tasks
//

exports.default = watch;
