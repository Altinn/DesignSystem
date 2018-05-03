// test/regex.js
////////////////////////////////////////////////////////////
// NPM Modules
////////////////////////////////////////////////////////////
var assert = require('chai').assert
var File   = require('gulp-util').File
var path   = require('path')

////////////////////////////////////////////////////////////
// Local Modules
////////////////////////////////////////////////////////////
var rename = require('../')

////////////////////////////////////////////////////////////
// Logic
////////////////////////////////////////////////////////////
describe('regex', function() {
  var regex       = /\.es6\.js$/
  var replacement = '.js'
  it('should match and replace regex literal', function(done) {
    var filePath = path.join(process.cwd(), 'index.es6.js')
    var fileBase = process.cwd()
    var expected = 'index.js'
    var stream   = rename(regex, replacement)
    stream.on('data', function(file) {
      assert.equal(file.relative, expected)
      done()
    })
    stream.write(new File({
      path: filePath,
      base: fileBase
    }))
  })
  it('should not affect unmatched filenames', function(done) {
    var filePath = path.join(process.cwd(), 'index.html')
    var fileBase = process.cwd()
    var expected = 'index.html'
    var stream   = rename(regex, replacement)
    stream.on('data', function(file) {
      assert.equal(file.relative, expected)
      done()
    })
    stream.write(new File({
      path: filePath,
      base: fileBase
    }))
  })
})
