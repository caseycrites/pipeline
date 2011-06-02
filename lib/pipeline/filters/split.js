"use strict"

var Step = require('Step')
  , filter = require('filter')

module.exports = function(settings) {
  
  return function split(options) {
    var pipeline1 = filter.createPipeline({locals: options.locals.filter_1, globals: options.globals})
      , pipeline2 = filter.createPipeline({locals: options.locals.filter_2, globals: options.globals})

    return function split(message, callback) {
      var incomingMessage = message

      Step(
        function runPipelines() {
          pipeline1(message, this.parallel())
          pipeline2(message, this.parallel())
        },
        function combineResults(err, pipeline1Results, pipeline2Results) {
          callback(pipeline1Results, pipeline2Results)
        }
      )
    }
  }
}
