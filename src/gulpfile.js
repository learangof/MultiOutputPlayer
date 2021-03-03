var gulp = require('gulp');
var sass = require('gulp-sass');
 
sass.compiler = require('node-sass');

const root_input = './static_/';
const root_output = './static/';
 
gulp.task('sass', function () {
  return gulp.src(root_input + 'sass/base.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(root_output));
});