# gulp-decompress [![Build Status](http://img.shields.io/travis/kevva/gulp-decompress.svg?style=flat)](https://travis-ci.org/kevva/gulp-decompress)

> Extract TAR, TAR.BZ2, TAR.GZ and ZIP archives using [decompress](https://github.com/kevva/decompress)


## Install

```
$ npm install --save gulp-decompress
```


## Usage

```js
const decompress = require('gulp-decompress');
const gulp = require('gulp');

gulp.task('default', () => {
	return gulp.src('*.{tar,tar.bz2,tar.gz,zip}')
		.pipe(decompress({strip: 1}))
		.pipe(gulp.dest('dist'));
});
```


## Options

See the [decompress options](https://github.com/kevva/decompress#options).


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
