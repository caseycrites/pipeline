var filter = require('filter')

module.exports = function union(settings) {
  var pipeline = filter.createPipeline(settings.filter)
    , leftName = settings.left_name
    , rightName = settings.right_name

  return function union(message, callback) {
    var unionOutput = function(response1, response2) {
      var unionedResponse = {leftName: response1, rightName: response2}
      callback(unionedResponse)
    }
    pipeline(message, unionOutput)
  }
}