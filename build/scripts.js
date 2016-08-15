var child_process, extensionPath, os, packagePath, path, scriptsPath, _;

_ = require('lodash');

_.str = require('underscore.string');

child_process = require('child_process');

path = require('path');

os = require('os');

extensionPath = window.__dirname;

packagePath = path.join(extensionPath, 'node_modules', 'drivelist');

scriptsPath = path.join(packagePath, 'scripts');

exports.paths = {
  win32: path.join(scriptsPath, 'win32.bat'),
  darwin: path.join(scriptsPath, 'darwin.sh'),
  linux: path.join(scriptsPath, 'linux.sh')
};

exports.run = function(script, callback) {
  return child_process.execFile(script, function(error, stdout, stderr) {
    if (error != null) {
      return callback(error);
    }
    if (!_.str.isBlank(stderr)) {
      return callback(new Error(stderr));
    }
    return callback(null, stdout);
  });
};
