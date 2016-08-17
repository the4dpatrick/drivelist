os = require('os')
parse = require('./parse')
scripts = require('./scripts')

exports.list = (callback) ->
	operatingSystem = os.platform()
	script = scripts.paths[operatingSystem]

	if not script?
		throw new Error("Your OS is not supported by this module: #{operatingSystem}")

	scripts.run script, (error, output) ->
		return callback(error) if error?
		parsed = parse(output)
		filtered = parsed.filter((drive) -> drive.mountpoint != null)
		return callback(null, filtered)
