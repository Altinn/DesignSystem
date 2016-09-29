# is-rar [![Build Status](https://travis-ci.org/kevva/is-rar.svg?branch=master)](https://travis-ci.org/kevva/is-rar)

> Check if a Buffer/Uint8Array is a RAR file

## Install

```bash
$ npm install --save is-rar
```

```bash
$ component install kevva/is-rar
```

```bash
$ bower install --save is-rar
```

## Usage

```js
var fs = require('fs');
var isRar = require('is-rar');
var buf = fs.readFileSync('foo.rar');

isRar(buf);
// => true
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License) © [Kevin Mårtensson](https://github.com/kevva)
