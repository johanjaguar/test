var gulp = require('gulp');
var imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

//optimizacion de imagenes
gulp.task('imagesmin', function(){
  gulp.src([
    'src/images/**/*.gif',
    'src/images/**/*.png',
    'src/images/**/*.jpg',
    'src/images/**/*.jpeg'
  ])
  	.pipe(imagemin(
      {
        progressive: true,
        use: [pngquant()]
      }
    ))
  	.pipe(gulp.dest('build/images-op'))
});
