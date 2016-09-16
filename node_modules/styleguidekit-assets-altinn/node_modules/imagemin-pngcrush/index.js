'use strict';

var execFile = require('child_process').execFile;
var fs = require('fs');
var imageType = require('image-type');
var path = require('path');
var pngcrush = require('pngcrush-bin').path;
var tempfile = require('tempfile');
var rm = require('rimraf');

/**
 * pngcrush image-min plugin
 *
 * @param {Object} opts
 * @api public
 */

module.exports = function (opts) {
    opts = opts || {};

    return function (file, imagemin, cb) {
        if (imageType(file.contents) !== 'png') {
            return cb();
        }

        fs.exists(pngcrush, function (exists) {
            if (!exists) {
                pngcrush = path.dirname(pngcrush);
            }

            var args = ['-brute', '-q'];
            var src = tempfile('.png');
            var dest = tempfile('.png');

            if (opts.reduce) {
                args.push('-reduce');
            }

            fs.writeFile(src, file.contents, function (err) {
                if (err) {
                    return cb(err);
                }

                execFile(pngcrush, args.concat([src, dest]), function (err) {
                    if (err) {
                        return cb(err);
                    }

                    fs.readFile(dest, function (err, buf) {
                        rm(src, function (err) {
                            if (err) {
                                return cb(err);
                            }

                            rm(dest, function (err) {
                                if (err) {
                                    return cb(err);
                                }

                                file.contents = buf;

                                cb();
                            });
                        });
                    });
                });
            });
        });
    };
};
