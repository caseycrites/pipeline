var Filter = require('./filter').Filter
  , util = require('util'),
  , JSONQuery = require('jsonquery').JSONQuery

function Extract(settings) {

}

util.inherits(Extract, Filter)
module.exports = Extract

Extract.prototype.process(message, callback) {

}
