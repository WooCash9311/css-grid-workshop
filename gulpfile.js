var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var flatten = require('gulp-flatten')
var wait = require('gulp-wait')
var watch = require('gulp-watch')
var sourcemaps = require('gulp-sourcemaps')

var browserSync = require('browser-sync').create()

gulp.task('watchapp', ['sass'], function () {
  browserSync.init({
    port: process.env.PORT || 4500,
    server: './'
  })

  watch('scss/**/*.scss', ['sass']).on('change', browserSync.reload)
  watch('./*.html').on('change', browserSync.reload)
})

gulp.task('sass', function () {   // definicja taska kompilującego sass
  return gulp.src('scss/**/*.scss') // wzorzec plików ktore mają być skompilowane (pliki z rozszerzeniem *.scss ze wszystkich podfolderów i folderu Content/app)
    .pipe(wait(100))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['> 0%'], grid: true }))
    .pipe(sourcemaps.write())
    .pipe(flatten())
    .pipe(gulp.dest('.')) // ścieżka gdzie zapisać wynik taska czyli skompilowane pliki css
})

gulp.task('default', ['watchapp'])
