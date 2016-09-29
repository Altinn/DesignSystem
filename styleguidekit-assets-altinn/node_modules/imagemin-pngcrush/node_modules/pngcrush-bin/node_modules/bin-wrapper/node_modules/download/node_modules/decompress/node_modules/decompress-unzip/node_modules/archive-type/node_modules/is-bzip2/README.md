# is-bzip2 [![Build Status](https://travis-ci.org/kevva/is-bzip2.svg?branch=master)](https://travis-ci.org/kevva/is-bzip2)

> Check if a Buffer/Uint8Array is a BZIP2 file

## Install

```bash
$ npm install --save is-bzip2
```

```bash
$ component install kevva/is-bzip2
```

```bash
$ bower install --save is-bzip2
```

## Usage

```js
var fs = require('fs');
var isBzip = require('is-bzip2');
var buf = fs.readFileSync('foo.bz2');

isBzip(buf);
// => true
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License) © [Kevin Mårtensson](https://github.com/kevva)
