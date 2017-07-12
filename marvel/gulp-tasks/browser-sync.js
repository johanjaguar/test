var browserSync = require('browser-sync');
var gulp = require('gulp');

// Static server.
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('browser-sync', function() {
  browserSync.init(['build/css/*.css', 'build/js/*.js'], {
    server: {
      baseDir: './'
    },
		browser: "firefox"
  });
});
