var Filter = require('./filter').Filter
  , step = require('Step')
  , util = require('util')

function Pipeline(settings) {

}

util.inherits(Pipeline, Filter)

Pipeline.prototype.process = function(message, callback) {
  // Pipeline needs to know an order of filters
}
