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
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const mustache = require("gulp-mustache");
const browsersync = require('browser-sync').create();

//
// Processes
//

// Clean
function clean() {
  return del('./dist');
}

//
// JS
//

function javascript() {
  gulp
    .src([
      './src/js/*/js',
      './gulpfile.babel.js'
    ], { allowEmpty: true })
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(browsersync.stream());
  return gulp
    .src([
      'node_modules/@popperjs/core/dist/umd/popper.js',
      'node_modules/bootstrap/js/dist/alert.js',
      'node_modules/bootstrap/js/dist/button.js',
      'node_modules/bootstrap/js/dist/carousel.js',
      'node_modules/bootstrap/js/dist/collapse.js',
      'node_modules/bootstrap/js/dist/dropdown.js',
      'node_modules/bootstrap/js/dist/modal.js',
      'node_modules/bootstrap/js/dist/popover.js',
      'node_modules/bootstrap/js/dist/scrollspy.js',
      'node_modules/bootstrap/js/dist/tab.js',
      'node_modules/bootstrap/js/dist/toast.js',
      'node_modules/bootstrap/js/dist/tooltip.js',
      './src/js/*/js'
    ], { allowEmpty: true })
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
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
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browsersync.stream());
}


//
// CSS
//

function styles() {
  gulp
    .src('./src/scss/*.scss', { allowEmpty: true })
    .pipe(sasslint({'configFile': './.sass-lint.yml'}))
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError())
    .pipe(browsersync.stream());
  return gulp
    .src('./src/scss/styles.scss', { allowEmpty: true })
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browsersync.stream());
}


//
// Assets
//

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
    .pipe(gulp.dest('./src/mustache/partials/'))
    .pipe(browsersync.stream());
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
    .pipe(gulp.dest('./dist/img/'))
    .pipe(browsersync.stream());
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
    .pipe(gulp.dest('./dist/'))
    .pipe(browsersync.stream());
}


//
// Testing environment
//

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./dist"
    },
    port: 3000
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}


//
// Watch and build scripts
//

const watch =
  gulp.series(
    clean,
    gulp.parallel(
      sprite,
      images,
      styles,
      javascript
    ),
    html,
    browserSync,
    watchFiles
  );

const csswatch =
  gulp.series(
    styles,
    html
  );

const jswatch =
  gulp.series(
    javascript,
    html
  );

function watchFiles() {
  gulp.watch('./src/scss/**/*.scss', csswatch);
  gulp.watch('./src/js/**/*.js', jswatch);
  gulp.watch('./src/mustache/**/*.mustache', html);
  gulp.watch('./src/sprite/**/*', sprite);
  gulp.watch('./src/img/**/*', images);
}


//
// Export tasks
//

exports.default = watch;
