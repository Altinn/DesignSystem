# imagemin-pngcrush [![Build Status](https://travis-ci.org/kevva/imagemin-pngcrush.svg?branch=master)](https://travis-ci.org/kevva/imagemin-pngcrush)

> pngcrush image-min plugin

## Install

```bash
$ npm install --save imagemin-pngcrush
```

## Usage

```js
var Imagemin = require('image-min');
var pngcrush = require('imagemin-pngcrush');

var imagemin = new Imagemin()
    .src('foo.png')
    .dest('foo-optimized.png')
    .use(pngcrush({ reduce: true }));

imagemin.optimize();
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License) © [Kevin Mårtensson](https://github.com/kevva)
