var childProcess, tableParser, _;

childProcess = require('child_process');

_ = require('lodash');

tableParser = require('table-parser');

exports.list = function(callback) {
  return childProcess.exec('diskutil list', {}, function(error, stdout, stderr) {
    var result;
    if (error != null) {
      return callback(error);
    }
    if (!_.isEmpty(stderr)) {
      return callback(new Error(stderr));
    }
    result = tableParser.parse(stdout);
    result = _.map(result, function(row) {
      return _.compact(_.flatten(_.values(row)));
    });
    result = _.filter(result, function(row) {
      return row[0] === '0:';
    });
    result = _.map(result, function(row) {
      return _.rest(row);
    });
    result = _.map(result, function(row) {
      var device, size, sizeMeasure;
      device = row.pop();
      sizeMeasure = row.pop();
      size = row.pop();
      return {
        device: "/dev/" + device,
        size: "" + size + " " + sizeMeasure,
        description: row.join(' ')
      };
    });
    return callback(null, result);
  });
};
