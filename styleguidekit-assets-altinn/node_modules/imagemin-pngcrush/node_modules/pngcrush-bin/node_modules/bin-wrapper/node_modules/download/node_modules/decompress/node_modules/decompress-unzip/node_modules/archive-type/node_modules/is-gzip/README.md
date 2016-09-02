# is-gzip [![Build Status](https://travis-ci.org/kevva/is-gzip.svg?branch=master)](https://travis-ci.org/kevva/is-gzip)

> Check if a Buffer/Uint8Array is a GZIP file

## Install

```bash
$ npm install --save is-gzip
```

```bash
$ component install kevva/is-gzip
```

```bash
$ bower install --save is-gzip
```

## Usage

```js
var fs = require('fs');
var isGzip = require('is-gzip');
var buf = fs.readFileSync('foo.tar.gz');

isGzip(buf);
// => true
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License) © [Kevin Mårtensson](https://github.com/kevva)
