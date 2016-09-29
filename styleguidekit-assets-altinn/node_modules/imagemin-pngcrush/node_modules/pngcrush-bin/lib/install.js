'use strict';

var bin = require('./');
var BinBuild = require('bin-build');
var logSymbols = require('log-symbols');
var path = require('path');

/**
 * Install binary and check whether it works.
 * If the test fails, try to build it.
 */

var args = [
  '-reduce',
  '-brute',
  path.join(__dirname, '../test/fixtures/test.png'),
  path.join(__dirname, '../test/fixtures/test-optimized.png')
];

bin.run(args, function (err) {
  if (err) {
    console.log(logSymbols.warning + ' pre-build test failed, compiling from source...');

    var builder = new BinBuild()
      .src('http://downloads.sourceforge.net/project/pmt/pngcrush/' + bin.v + '/pngcrush-' + bin.v + '.zip')
      .cmd('make && mkdir -p ' + bin.dest() + ' && mv ./pngcrush ' + bin.path());

    return builder.build(function (err) {
      if (err) {
        return console.log(logSymbols.error, err);
      }

      console.log(logSymbols.success + ' pngcrush built successfully!');
    });
  }

  console.log(logSymbols.success + ' pre-build test passed successfully!');
});
