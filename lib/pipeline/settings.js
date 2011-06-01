"use strict";

var sgutil = require('sgutil')

exports.load = function(file) {
  return sgutil.config_parser.readSync(file)
}
