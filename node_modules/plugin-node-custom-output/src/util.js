var fs = require('fs-extra');
var path = require('path');
var matter = require('gray-matter');

module.exports = {
  getPatternMarkdownObject: function (patternlab, pattern) {
    var markdownFile = ''
    if (pattern.relPath.indexOf('.mustache') !== -1
      && fileExists(path.resolve(patternlab.config.paths.source.patterns
        + pattern.relPath.replace('.mustache', '.md')))) {
      markdownFile = fs.readFileSync(path.resolve(patternlab.config.paths.source.patterns
        + pattern.relPath.replace('.mustache', '.md')), 'utf8');
    }

    return matter(markdownFile);
  },

  setPatternMarkdownObject: function (patternlab, pattern, markdownObject) {
    return fs.outputFileSync(path.resolve(patternlab.config.paths.source.patterns + pattern.relPath.replace('.mustache', '.md')),
      matter.stringify(markdownObject.content.replace(/^[\r\n]+|[\r\n]+$/g, ""), markdownObject.data));
  },

  getPatternByName: function (patternlab, patternName) {
    for (var i = 0; i < patternlab.patterns.length; i++) {
      if (patternlab.patterns[i].name === patternName) {
        return patternlab.patterns[i];
      }
    }

    return null;
  }
}

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile()
  } catch (err) { return false }
}