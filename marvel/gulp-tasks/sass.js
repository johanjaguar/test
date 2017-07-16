var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sassLint = require('gulp-sass-lint');

//tarea sass
gulp.task('sass', function(){
    //fuente de los archivos
    gulp.src('**/*.s+(a|c)ss', {cwd: 'src/scss'})
    .pipe(sourcemaps.init())
    .pipe(
        sass({ 
            sourceComments: 'map',
            sourceMap: 'sass',
            outputStyle: 'expanded'
        }).on('error', sass.logError)
    )
    .pipe(sassLint({
      options: {
        formatter: 'stylish',
        'merge-default-rules': false
      },
      rules: {
        'no-ids': 1,
        'no-mergeable-selectors': 0
      },
      configFile: '/.sass-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(sourcemaps.write('maps'))
    //.pipe(autoprefixer())
    //destino de los archivos
    .pipe( gulp.dest('build/css/' ))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/css/'))
    .pipe(reload({stream:true}))
});
  