/**
 * Gulp String Replace
 * https://github.com/tomaszczechowski/gulp-string-replace
 *
 * Copyright (c) 2016 Tomasz Czechowski
 * MIT license.
 */

'use strict';

var through = require('through2')
  , rs = require('replacestream')
  , gutil = require('gulp-util')
  , extend = require('extend');

var defaultOptions = {
  logs: {
    enabled: true,
    notReplaced: false
  }
};

module.exports = function (replaceFrom, replaceTo, userOptions) {
  var options = extend(true, {}, defaultOptions, userOptions);

  var log = function (result, from, to, fileName) {
    if (!options.logs.enabled || (!options.logs.notReplaced && !result)) return;

    var _result = result ? 'Replaced' : 'Not Replaced';

    gutil.log(_result + ' ' + gutil.colors.cyan(from) + (to ? (' to ' + gutil.colors.cyan(to)) : '') + ' in file: ' + gutil.colors.magenta(fileName));

    return true;
  };

  return through.obj(function (file, enc, callback) {
    var fileName = file.path.split('/')[file.path.split('/').length - 1];

    var _replaceTo = function (replacement) {
      if (typeof replaceTo === 'function') {
        var replaceFunctionResult = replaceTo.apply(replaceTo, arguments);

        log(true, replacement, replaceFunctionResult, fileName);

        return replaceFunctionResult;
      }

      log(true, replacement, replaceTo, fileName);

      return replaceTo;
    };

    if (file.isStream()) {
      file.contents = file.contents.pipe(rs(search, replacement));
      return callback(null, file);
    }

    if (file.isBuffer()) {
      try {
        var contents = String(file.contents);
        var regex = replaceFrom instanceof RegExp
          ? replaceFrom
          : new RegExp(replaceFrom, 'g');

        if (regex.test(contents)) {
          contents = contents.replace(regex, _replaceTo);
        } else {
          log(false, regex, false, fileName);
        }

        file.contents = new Buffer(contents);
      } catch (e) {
        return callback(new gutil.PluginError('gulp-string-replace', e));
      }
    }

    callback(null, file);
  });
};
