var gulp = require('gulp');
var gutil = require('gulp-util');

var jade = require('gulp-jade');
var less = require('gulp-less');
var coffee = require('gulp-coffee');
var bower = require('main-bower-files');
var flatten = require('gulp-flatten');
var uglify = require('gulp-uglify');
var cond = require('gulp-if');

var isRelease = gutil.env.release;

gulp.task('jade', function(){
  gulp.src('./src/jade/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dest/'))
});

gulp.task('less', function(){
  gulp.src('./src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./dest/css/'))
});

gulp.task('coffee', function(){
  gulp.src('./src/coffee/*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('./dest/js/'))
});

gulp.task('bower', function(){
  gulp.src(bower())
    .pipe(cond(isRelease, uglify({preserveComments:'some'})))
    .pipe(flatten())
    .pipe(gulp.dest('./dest/lib/'))
});

gulp.task('c', ['jade', 'less', 'coffee']);
