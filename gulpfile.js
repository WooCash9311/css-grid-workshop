var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var watch = require('gulp-watch')
var flatten = require('gulp-flatten')

var browserSync = require('browser-sync').create()

gulp.task('watchapp', ['sass'], function() {
    browserSync.init({
        port: process.env.PORT || 4500,
        server: './',
    });

    gulp.watch('scss/**/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('sass', function () {   // definicja taska kompilującego sass
  return gulp.src('scss/**/*.scss') // wzorzec plików ktore mają być skompilowane (pliki z rozszerzeniem *.scss ze wszystkich podfolderów i folderu Content/app)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['> 0%'], grid: true }))
        .pipe(flatten())
        .pipe(gulp.dest('.')) // ścieżka gdzie zapisać wynik taska czyli skompilowane pliki css
})

gulp.task('default', ['watchapp'])
