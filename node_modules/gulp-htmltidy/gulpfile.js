var gulp = require('gulp'),
    htmltidy = require('./index.js');

gulp.task('default', function() {
  return gulp.src('./test/fixtures/test.html')
        .pipe(htmltidy({doctype: 'html5',
					   hideComments: true,
					   indent: false,
					   clean:true}))
        .pipe(gulp.dest('test/expected/'));;
});
