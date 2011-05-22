var Filter = require('./filter').Filter
  , util = require('util'),
  , JSONQuery = require('jsonquery').JSONQuery

function Notify(settings) {

}

util.inherits(Notify, Filter)
module.exports = Notify

Notify.prototype.process(message, callback) {

}
