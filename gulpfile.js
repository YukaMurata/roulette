'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cached = require('gulp-cached'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace');


//------------------------------------------------------------------------------
// sass / scss / css
//------------------------------------------------------------------------------

gulp.task('sass', function () {
    return gulp.src(
        __dirname + '/scss/**/*.scss'
    )
        .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
        .pipe(cached('sass'))
        .pipe(
            sass({
                outputStyle: 'expanded'
            }).on('error', sass.logError)
        )
        .pipe(
            autoprefixer({
                browsers: [
                    'last 2 versions',
                    'Firefox >= 20',
                    'ie >= 11',
                    'Android >= 4.2',
                    'iOS >= 9'
                ],
            })
        )
        .pipe(
            gulp.dest(__dirname + '/css/')
        );
});

//------------------------------------------------------------------------------
// watch
//------------------------------------------------------------------------------

gulp.task('watch', function () {
    watch(__dirname + '/scss/**/*.scss', function () {
        return gulp.start('sass');
    });

});

