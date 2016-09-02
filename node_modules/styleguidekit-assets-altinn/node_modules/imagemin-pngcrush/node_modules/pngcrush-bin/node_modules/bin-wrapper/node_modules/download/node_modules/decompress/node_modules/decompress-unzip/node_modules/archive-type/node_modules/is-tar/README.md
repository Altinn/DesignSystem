# is-tar [![Build Status](https://travis-ci.org/kevva/is-tar.svg?branch=master)](https://travis-ci.org/kevva/is-tar)

> Check if a Buffer/Uint8Array is a TAR file

## Install

```bash
$ npm install --save is-tar
```

```bash
$ component install kevva/is-tar
```

```bash
$ bower install --save is-tar
```

## Usage

```js
var fs = require('fs');
var isTar = require('is-tar');
var buf = fs.readFileSync('foo.tar');

isTar(buf);
// => true
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License) © [Kevin Mårtensson](https://github.com/kevva)
