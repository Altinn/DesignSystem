// index.js
////////////////////////////////////////////////////////////
// NPM Modules
////////////////////////////////////////////////////////////
var path = require('path')
var PluginError = require('gulp-util').PluginError
var through = require('through2')

////////////////////////////////////////////////////////////
// Setup
////////////////////////////////////////////////////////////
var myName = 'gulp-regex-rename'
function handleErr(err, handler, cb) {
  handler.emit('error', new PluginError(myName, err))
  return cb()
}

////////////////////////////////////////////////////////////
// Logic
////////////////////////////////////////////////////////////
module.exports = function(regex, str) {
  return through.obj(function(file, unused, cb) {
    if (file.isStream()) {
      return handleErr('Streaming not supported', this, cb)
    }
    if (
      regex instanceof RegExp === false ||
      typeof str !== 'string'
    ) {
      return handleErr('Incorrect params', this, cb)
    }
    try {
      file.path = path.join(
        file.base,
        file.relative.replace(regex, str)
      )
    } catch(err) {
      return handleErr(err, this, cb)
    }
    return cb(null, file)
  })
}
