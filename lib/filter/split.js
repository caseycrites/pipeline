var Step = require('Step')
  , filter = require('filter')

module.exports = function split(settings) {
  var pipeline1 = filter.createPipeline(settings.filter_1)
    , pipeline2 = filter.createPipeline(settings.filter_2)

  return function split(message, callback) {
    var incomingMessage = message

    Step(
      function runPipelines() {
        pipeline1(message, this.parallel())
        pipeline2(message, this.parallel())
      },
      function (err, pipeline1Results, pipeline2Results) {
        callback(pipeline1Results, pipeline2Results)
      }
    )
  }
}