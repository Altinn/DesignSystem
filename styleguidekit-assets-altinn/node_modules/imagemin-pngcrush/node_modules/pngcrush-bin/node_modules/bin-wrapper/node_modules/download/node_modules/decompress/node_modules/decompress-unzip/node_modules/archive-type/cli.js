#!/usr/bin/env node
'use strict';

var archiveType = require('./');
var input = process.argv.slice(2);
var pkg = require('./package.json');
var readChunk = require('read-chunk');
var stdin = require('get-stdin');

/**
 * Help screen
 */

function help() {
    console.log(pkg.description);
    console.log('');
    console.log('Usage');
    console.log('  $ cat <file> | archive-type');
    console.log('');
    console.log('Example');
    console.log('  $ cat foo.tar.gz | archive-type');
}

/**
 * Show help
 */

if (input.indexOf('-h') !== -1 || input.indexOf('--help') !== -1) {
    return help();

}

/**
 * Show package version
 */

if (input.indexOf('-v') !== -1 || input.indexOf('--version') !== -1) {
    return console.log(pkg.version);
}

/**
 * Run
 */

function run(data) {
    var type = archiveType(new Buffer(data));

    if (type) {
        return console.log(type);
    }

    console.error('Not a recognized archive');
    process.exit(1);
}

/**
 * Get stdin
 */

if (process.stdin.isTTY) {
    if (!input) {
        help();
        return;
    }

    run(readChunk.sync(input, 0, 261));
} else {
    stdin(function (data) {
        run(data);
    });
}
