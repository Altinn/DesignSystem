// test/errors.js
////////////////////////////////////////////////////////////
// NPM Modules
////////////////////////////////////////////////////////////
var assert = require('chai').assert
var File   = require('gulp-util').File
var path   = require('path')
var fs     = require('fs')

////////////////////////////////////////////////////////////
// Local Modules
////////////////////////////////////////////////////////////
var rename = require('../')

////////////////////////////////////////////////////////////
// Logic
////////////////////////////////////////////////////////////
describe('errors', function() {
  it('should emit error if file is a stream', function(done) {
    var stream = rename()
    var error
    stream.on('error', function(err) {
      error = err.message
    })
    var file = new File({
      // grabs index.js but any file will do
      contents: fs.createReadStream('../')
    })
    stream.write(file)
    assert.equal(error, 'Streaming not supported')
    done()
  })
  it('should emit error if passed incorrect params', function(done) {
    // var stream = rename('param', 'param') // wouldn't error
    var stream = rename()
    var error
    stream.on('error', function(err) {
      error = err.message
    })
    stream.write(new File())
    assert.equal(error, 'Incorrect params')
    done()
  })
})
