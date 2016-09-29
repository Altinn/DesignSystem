'use strict';

var exec = require('child_process').exec;
var rm = require('rimraf');
var tempfile = require('tempfile');

/**
 * Initialize new `BinBuild`
 *
 * @api public
 */

function BinBuild() {
    if (!(this instanceof BinBuild)) {
        return new BinBuild();
    }

    this._cmd = [];
}

/**
 * Define the source archive to download
 *
 * @param {String} str
 * @api public
 */

BinBuild.prototype.src = function (str) {
    if (!arguments.length) {
        return this._src;
    }

    this._src = str;
    return this;
};

/**
 * Add a command to run
 *
 * @param {String} str
 * @api public
 */

BinBuild.prototype.cmd = function (str) {
    if (!arguments.length) {
        return this._cmd;
    }

    this._cmd.push(str);
    return this;
};

/**
 * Build
 *
 * @param {Function} cb
 * @api public
 */

BinBuild.prototype.build = function (cb) {
    var download = require('download');
    var str = this.cmd().join(' && ');
    var tmp = tempfile();

    download(this.src(), tmp, { strip: 1, extract: true })
        .on('error', cb)
        .on('close', function () {
            exec(str, { cwd: tmp }, function (err) {
                if (err) {
                    return cb(err);
                }

                rm(tmp, cb);
            });
        });
};

/**
 * Module exports
 */

module.exports = BinBuild;
