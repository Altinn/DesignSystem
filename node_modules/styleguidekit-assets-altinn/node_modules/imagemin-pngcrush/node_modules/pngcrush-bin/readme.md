# [node-pngcrush-bin](https://npmjs.org/package/pngcrush-bin)

[pngcrush](http://pmt.sourceforge.net/pngcrush/) Node.js wrapper that optimize PNG images.

> Pngcrush is an optimizer for PNG (Portable Network Graphics) files. It can be run from a commandline in an MSDOS window, or from a UNIX or LINUX commandline.
> Its main purpose is to reduce the size of the PNG IDAT datastream by trying various compression levels an PNG filter methods. It also can be used to remove unwanted ancillary chunks, or to add certain chunks including gAMA, tRNS, iCCP, and textual chunks.

[![Build Status](https://travis-ci.org/1000ch/node-pngcrush-bin.svg?branch=master)](https://travis-ci.org/1000ch/node-pngcrush-bin)
[![NPM version](https://badge.fury.io/js/pngcrush-bin.svg)](http://badge.fury.io/js/pngcrush-bin)
[![Dependency Status](https://david-dm.org/1000ch/node-pngcrush-bin.svg)](https://david-dm.org/1000ch/node-pngcrush-bin)
[![devDependency Status](https://david-dm.org/1000ch/node-pngcrush-bin/dev-status.svg)](https://david-dm.org/1000ch/node-pngcrush-bin#info=devDependencies)

## Install

```sh
$ npm install --save pngcrush-bin
```

## Usage

```js
var execFile = require('child_process').execFile;
var pngcrush = require('pngcrush-bin').path;

execFile(pngcrush, ['-reduce', '-brute', 'input.png', 'output.png'], function (error) {
  if (error) {
    throw error;
  }

  console.log('Image minified');
});
```

## License

This is licensed under BSD.

[pngcrush](http://pmt.sourceforge.net/pngcrush/) is licensed under OSI Approved License.
