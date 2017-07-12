var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var util = require('gulp-util');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('scripts', function(){
  return gulp.src( [
    'getData.js',
    'md5.js',
    'custom.js'
  ], {cwd: 'src/javascript'} )
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['babili']}))
    .pipe(concat('final.js'))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('build/js'))
    .on('error', function (err) {
      util.log(util.colors.red('[Error]'),
      err.toString());
    })
    .pipe(reload({stream:true}))
});


