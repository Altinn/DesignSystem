'use strict';

var BinWrapper = require('bin-wrapper');
var path = require('path');
var pkg = require('../package.json');

/**
 * Variables
 */

var BIN_VERSION = '1.7.73';
var BASE_URL = 'https://raw.github.com/1000ch/node-pngcrush-bin/v' + pkg.version + '/vendor/';

/**
 * Initialize a new BinWrapper
 */

var bin = new BinWrapper()
  .src(BASE_URL + 'osx/pngcrush', 'darwin')
  .src(BASE_URL + 'linux/pngcrush', 'linux')
  .src(BASE_URL + 'win/x64/pngcrush.exe', 'win32', 'x64')
  .src(BASE_URL + 'win/x86/pngcrush.exe', 'win32', 'x86')
  .dest(path.join(__dirname, '../vendor'))
  .use(process.platform === 'win32' ? 'pngcrush.exe' : 'pngcrush');

/**
 * Module exports
 */

module.exports = bin;
module.exports.v = BIN_VERSION;
