# gulp-regex-rename

Gulp-regex-rename is a [gulp](http://gulpjs.com/) plugin for renaming files by matching a regular expression.

## Usage

Gulp-regex-rename requires two parameters:

* A [regex literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
* A string to replace the matched regex

Note that the replacement string can be an empty string.

```js
var babel  = require('gulp-babel')
var gulp   = require('gulp')
var rename = require('gulp-regex-rename')

// Example 1
gulp.task('scripts', function() {
  gulp.src('js/**/*.es6.js')
    .pipe(babel())
    .pipe(rename(/\.es6\.js$/, '.js'))
    .pipe(gulp.dest('dist'))
})

// Example 2
gulp.task('scripts', function() {
  gulp.src('js/**/*.es6.js')
    .pipe(babel())
    .pipe(rename(/\.es6/, ''))
    .pipe(gulp.dest('dist'))
})
```

Both examples produce equivalent results. Example 1 uses a typical replacement string, while Example 2 uses an empty string, deleting the matched regex.

## License

MIT. See license.
