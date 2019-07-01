var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  del = require('del'),
  browserSync = require('browser-sync'),
  fileinclude = require('gulp-file-include');

sass.compiler = require('node-sass'); 
function scss() {
  return gulp.src('./src/scss/main.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.reload({ stream: true }))
}


function fonts() {
  return gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./build/fonts'))
    .pipe(browserSync.reload({ stream: true }))
}

function img() {
  return gulp.src('./src/image/*')
    .pipe(gulp.dest('./build/img'))
    .pipe(browserSync.reload({ stream: true }))
}
function clean() {
  return del(['./build/*'])
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });
  //Следить за SCSS файлами
  gulp.watch('./src/scss/**/*.scss', scss)
  //Следить за JS файлами
  gulp.watch('./src/js/*.js', js)
  //Следить за Img файлами
  gulp.watch('./src/image/*', img)
  //При изменении HTML запустить синхронизацию
  gulp.watch([
    "./src/html/components/*.html",
    "./src/html/pages/*.html"
  ], html).on('change', browserSync.reload);
}

gulp.task('scss', scss);
gulp.task('html', html);
gulp.task('fonts', fonts);
gulp.task('img', img);
gulp.task('watch', watch);

//Запуск buld проекта
gulp.task('build', gulp.series(clean, gulp.parallel(scss, js, html, fonts, img)))
//Запуск dev проекта
gulp.task('dev', gulp.series('build', 'watch'));