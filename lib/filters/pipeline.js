var Filter = require('./filter').Filter
  , step = require('Step')
  , util = require('util')

function Pipeline(properties) {
  this.steps = [],
  this.properties = properties

  for (filterProps in properties.filters) {
    var NewFilter = require('./'+filterProps.name.toLowerCase()).(filterProps.name)
      , filterInstance = new NewFilter(filterProps)
    this.steps.push(filterInstance)
  }
}

util.inherits(Pipeline, Filter)

Pipeline.prototype.process = function(message, callback) {
  // Need to create a Step process that goes through pipeline.steps
}
