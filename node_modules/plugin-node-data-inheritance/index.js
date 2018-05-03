var pluginName = 'plugin-node-data-inheritance';
var path = require('path');
var fs = require('fs-extra');
var glob = require('glob');

function getPatternByName (patternlab, patternName) {
  for (var i = 0; i < patternlab.patterns.length; i++) {
    if (patternlab.patterns[i].name === patternName) {
      return patternlab.patterns[i];
    }
  }

  return null;
}

function arrayReplaceRecursive (arr) {
  var i = 0
  var p = ''
  var argl = arguments.length
  var retObj

  if (argl < 2) {
    throw new Error('There should be at least 2 arguments passed to arrayReplaceRecursive()')
  }

  if (Object.prototype.toString.call(arr) === '[object Array]') {
    retObj = [];
    for (p in arr) {
      retObj.push(arr[p]);
    }
  } else {
    retObj = {};
    for (p in arr) {
      retObj[p] = arr[p];
    }
  }

  for (i = 1; i < argl; i++) {
    for (p in arguments[i]) {
      if (retObj[p] && typeof retObj[p] === 'object') {
        if (arguments[i][p] === false) {
          retObj[p] = false;
        } else {
          retObj[p] = arrayReplaceRecursive(retObj[p], arguments[i][p]);
        }
      } else {
        retObj[p] = arguments[i][p];
      }
    }
  }

  return retObj;
}

function generatePatternJson (patternlab, pattern, patternLimit) {
  var existingData;
  if (!fs.existsSync(path.resolve(patternlab.config.paths.public.root + 'inheritedData'))){
    fs.mkdirSync(path.resolve(patternlab.config.paths.public.root + 'inheritedData'));
  }

  try {
    existingData = JSON.parse(fs.readFileSync(path.resolve(patternlab.config.paths.public.root + 'inheritedData/' + pattern.name + '.json'),'utf8'));
  } catch(e){
  }

  if (pattern.patternLineages) {
    for (var i = 0; i < pattern.patternLineages.length; i++) {
    
      var regex = new RegExp(/\//, 'g');
      var thePart = pattern.patternLineages[i].lineagePath.replace(regex, '\\').split('\\').pop().split('.')[0];
      var currentPattern = getPatternByName(patternlab, thePart);

      if (currentPattern) {
        if (patternLimit > 0) {
          patternLimit--;
        } else {
          return;
        }

        if (!pattern.jsonFileData) {
          pattern.jsonFileData = currentPattern.jsonFileData;
        } else {
          pattern.jsonFileData = arrayReplaceRecursive(currentPattern.jsonFileData, pattern.jsonFileData);
        }
      }
    }
  }

  if (existingData) {
    pattern.jsonFileData = arrayReplaceRecursive(existingData, pattern.jsonFileData);
  }

  fs.writeFileSync(path.resolve(patternlab.config.paths.public.root + 'inheritedData/' + pattern.name + '.json'), JSON.stringify(pattern.jsonFileData))
}

function entryMethod(patternlab, pattern) {
  var patternLimit = 500;
  generatePatternJson(patternlab, pattern, patternLimit);
}

function registerEvents (patternlab) {
  patternlab.events.on('patternlab-pattern-before-data-merge', entryMethod);
}

function getPluginFrontendConfig () {
  return {
    'name': 'pattern-lab\/' + pluginName, 'templates': [],
    'stylesheets': [],
    'javascripts': ['patternlab-components\/pattern-lab\/' + pluginName +
      '\/js\/' + pluginName + '.js'],
    'onready': '',
    'callback': ''
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
    for (var i = 0; i < pluginFiles.length; i++) {
      try {
        var fileStat = fs.statSync(pluginFiles[i]);
        if (fileStat.isFile()) {
          var relativePath = path.relative(__dirname, pluginFiles[i]).replace('dist', '');
          var writePath = path.join(patternlab.config.paths.public.root,
            'patternlab-components', 'pattern-lab', pluginName, relativePath);
          var tabJSFileContents = fs.readFileSync(pluginFiles[i], 'utf8');
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

  //setup listeners if not already active. we also enable and set the plugin as initialized
  if (!patternlab.config.plugins) {
    patternlab.config.plugins = {};
  }

  //attempt to only register events once
  if (patternlab.config.plugins[pluginName] !== undefined &&
     patternlab.config.plugins[pluginName].enabled &&
     !patternlab.config.plugins[pluginName].initialized) {

    //register events
    registerEvents(patternlab);

    //set the plugin initialized flag to true to indicate it is installed and ready
    patternlab.config.plugins[pluginName].initialized = true;
  }
}

module.exports = pluginInit
