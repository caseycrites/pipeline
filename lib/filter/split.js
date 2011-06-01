"use strict"

var Step = require('Step')
  , filter = require('filter')

module.exports = function split(options) {
  var pipeline1 = filter.createPipeline(options.filter_1)
    , pipeline2 = filter.createPipeline(options.filter_2)

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
