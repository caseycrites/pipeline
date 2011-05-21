var Filter = require('./filter').Filter
  , util = require('util')
  , SimpleGeo = require('simplegeo-client').SimpleGeo

function Context(properties) {

}

util.inherits(Context, Filter)

Context.prototype.process = function(message, callback) {

}
