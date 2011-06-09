"use strict"

var Step = require('Step')

module.exports = function(settings) {
  
  return function split(options) {
    var pipeline = require('./pipeline')(settings)
      , pipeline1 = pipeline(options.filter_1)
      , pipeline2 = pipeline(options.filter_2)

    return function split(message, callback) {
      Step(
        function runPipelines() {
          pipeline1(message, this.parallel())
          pipeline2(message, this.parallel())
        },
        function combineResults(err, pipeline1Results, pipeline2Results) {
          return callback(err, pipeline1Results, pipeline2Results)
        }
      )
    }
  }
}
