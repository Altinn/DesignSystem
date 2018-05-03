var pluginName = 'plugin-node-custom-output';
var path = require('path');
var fs = require('fs-extra');
var glob = require('glob');
var util = require('./src/util');
var stringExtensions = require('./src/extensions/stringExtensions');
var snippetTemplate = require('./src/templates/snippetTemplate');

function appendPatternDetails(patternlab) {

  for (var i = 0; i < patternlab.patterns.length; i++) {
    var markdownObject = util.getPatternMarkdownObject(patternlab, patternlab.patterns[i]);

    var jsData = "";
    if(markdownObject.data["js"] !== undefined && markdownObject.data["js"].length > 0) {
      jsData = " JS doc: " + markdownObject.data["js"];
    }
    patternlab.patterns[i].template = '<!-- START: '
      + patternlab.patterns[i].name
      + jsData
      + ' -->\n'
      + patternlab.patterns[i].template
      + '\n<!-- END: '
      + patternlab.patterns[i].name
      + ' -->\n';
  }
}

function onPatternIterate (patternlab, pattern) {
  if (pattern.relPath.indexOf('probably-not-needed') === -1 &&
    pattern.relPath.indexOf('.mustache') !== -1) {

    var markdownObject = util.getPatternMarkdownObject(patternlab, pattern);

    if (markdownObject.data.version == patternlab.config.releaseVersion) {
      updateVersionDependentPatterns(patternlab, pattern, markdownObject.data.version);
    }

    snippetTemplate.generateOutput(patternlab, pattern);
  }
}

function updateVersionDependentPatterns(patternlab, pattern, newVersion)  {
  for (var i = 0; i < pattern.lineageR.length; i++) {
    var currentPattern = pattern.lineageR[i];
    var lineagePathParts = currentPattern.lineagePath.split('\\');
    var lastPartParts = lineagePathParts[lineagePathParts.length - 1].split('.');
    var actualPattern = util.getPatternByName(patternlab, lastPartParts[0]);

    if (actualPattern) {
      var currentPatternMarkdown = util.getPatternMarkdownObject(patternlab, actualPattern);
      currentPatternMarkdown.data["version"] = newVersion;
      util.setPatternMarkdownObject(patternlab, actualPattern, currentPatternMarkdown);

      updateVersionDependentPatterns(patternlab, actualPattern, newVersion);
    } else {
      console.log('Could not find pattern with name: ' + lastPartParts[0]);
    }
  }
}

function registerEvents (patternlab) {
  patternlab.events.on('patternlab-pattern-iteration-end', appendPatternDetails);
  // patternlab.events.on('patternlab-pattern-write-end', onPatternIterate);
}

function getPluginFrontendConfig () {
  return {
    'name': 'pattern-lab\/' + pluginName, 'templates': [],
    'stylesheets': [],
    'javascripts': ['patternlab-components\/pattern-lab\/' + pluginName +
      '\/js\/' + pluginName + '.js'],
    'onready': '', 'callback': ''
  }
}

function pluginInit (patternlab) {
  if (!patternlab) {
    console.error('patternlab object not provided to plugin-init');
    process.exit(1);
  }

  var pluginConfig = getPluginFrontendConfig();
  var pluginConfigPathName = path.resolve(patternlab.config.paths.public.root,
    'patternlab-components', 'packages');

  try {
    fs.outputFileSync(pluginConfigPathName + '/' + pluginName + '.json',
      JSON.stringify(pluginConfig, null, 2));
  } catch (ex) {
    console.trace(
      'plugin-node-tab: Error occurred while writing pluginFile configuration');
    console.log(ex);
  }

  if (!patternlab.plugins) {
    patternlab.plugins = []
  }

  patternlab.plugins.push(pluginConfig);
  var pluginFiles = glob.sync(__dirname + '/dist/**/*');
  if (pluginFiles && pluginFiles.length > 0) {
    var tab_frontend_snippet =
      fs.readFileSync(path.resolve(__dirname + '/src/snippet.js'), 'utf8');
    for (var i = 0; i < pluginFiles.length; i++) {
      try {
        var fileStat = fs.statSync(pluginFiles[i]);
        if (fileStat.isFile()) {
          var relativePath = path.relative(__dirname, pluginFiles[i]).replace('dist', '');
          var writePath = path.join(patternlab.config.paths.public.root,
            'patternlab-components', 'pattern-lab', pluginName, relativePath);
          var tabJSFileContents = fs.readFileSync(pluginFiles[i], 'utf8');
          tabJSFileContents = tabJSFileContents.replace('/*SNIPPETS*/', tab_frontend_snippet);

          fs.outputFileSync(writePath, tabJSFileContents);
        }
      } catch (ex) {
        console.trace(
          'plugin-node-tab: Error occurred while copying pluginFile',
          pluginFiles[i]);
        console.log(ex);
      }
    }
  }

  registerEvents(patternlab); patternlab.config[pluginName] = true;
}

module.exports = pluginInit
