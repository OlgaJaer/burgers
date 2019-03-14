const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
//var watch = require('gulp-watch');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const mqpacker = require("css-mqpacker");
const sourcemaps = require('gulp-sourcemaps');
//var livereload = require('gulp-livereload');
//var gls = require('gulp-live-server');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const runSequence = require('run-sequence');
sass.compiler = require('node-sass');
const del = require("del");
const browserSync = require('browser-sync').create();

const plugins = [
  autoprefixer({browsers: ['last 2 version'],cascade: false}),
  //mqpacker(),
  //cssnano()
];

//css
function styles() {
  return gulp.src('./app/css/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    //.pipe(concatCss('main.css'))
    //.pipe(autoprefixer({
    //  browsers: ['last 2 versions'],
    //  cascade: false
    //}))
    .pipe(postcss(plugins))
    .pipe(rename('main.min.css'))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
}

/*gulp.task('default', function() {
  runSequence(
    'html',
    'css'
    );
});*/

//html
function html(){
  return gulp.src('./app/index.html')
    .pipe(gulp.dest('./dist'));
}

function scripts(){
  return gulp.src('./app/js/*.js')
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
}

function images() {
  return gulp.src('./app/images/**/*.*')
    .pipe(gulp.dest('./dist/images'));
}

function fonts(){
  return gulp.src('./app/fonts/*.*')
    .pipe(gulp.dest('./dist/fonts'));
}

function bxslider(){
  return gulp.src('./app/bxslider/**/*.*')
    .pipe(gulp.dest('./dist/bxslider'));
} 

//watch
function watch() {
  

  gulp.watch('./app/css/**/*.scss', styles);
  gulp.watch('./app/js/*.js', scripts);
  gulp.watch('app/index.html', html);
  gulp.watch('./app/fonts/*.*', fonts);
  gulp.watch('./app/images/**/*.*', images);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  browserSync.watch('./dist/**/*.*', browserSync.reload);
}

function clean(){
  return del(['dist/*']);
}


gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('images', images);
gulp.task('html', html);
gulp.task('fonts', fonts);
gulp.task('bxslider', bxslider);


gulp.task('build', gulp.series(clean,
                    gulp.parallel('bxslider', 'styles', 'html', 'images', 'fonts', 'scripts')
          ));
gulp.task('dev', gulp.series('build',
                    gulp.parallel('watch', serve)));
