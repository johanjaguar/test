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
    'md5.js',
    'getMarvelUrl.js',
    'main.js',
    //'route.js',
    'angular/dist/angular-local-storage.js',
    'angular/services/factory-marvel.js',
    'angular/services/factory-comic.js',
    'angular/controllers/mainController.js',
    'angular/controllers/searchCharacterController.js',
    'angular/controllers/moreResultsController.js',
    'angular/controllers/favouriteController.js',
  ], {cwd: 'src/javascript'} )
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['babili']}))
    .on('error', function(e) {
      console.log('>>> ERROR', e);
      // emit here
      this.emit('end');
    })
    .pipe(concat('final.js'))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('build/js'))
    .on('error', function (err) {
      util.log(util.colors.red('[Error]'),
      err.toString());
    })
    .pipe(reload({stream:true}))
});


