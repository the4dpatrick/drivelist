_ = require('lodash')
_.str = require('underscore.string')
child_process = require('child_process')
path = require('path')
os = require('os')

extensionPath = require('./extensionPath')()
packagePath = path.join(extensionPath, 'node_modules', 'drivelist')
scriptsPath = path.join(packagePath, 'scripts')

exports.paths =
	win32: path.join(scriptsPath, 'win32.bat')
	darwin: path.join(scriptsPath, 'darwin.sh')
	linux: path.join(scriptsPath, 'linux.sh')

exports.run = (script, callback) ->
	child_process.execFile script, (error, stdout, stderr) ->
		return callback(error) if error?

		if not _.str.isBlank(stderr)
			return callback(new Error(stderr))

		return callback(null, stdout)
