var gulp = require('gulp');
const { src, dest } = require('gulp');
var sass = require('gulp-sass');

function styles() {
  return src('app/**/*.js')
    .pipe(dest('dist/js'));
}

gulp.task('copy', function(){
  return gulp.src('js/*.js')
  .pipe(gulp.dest('dist/js'));
});