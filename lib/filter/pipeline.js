var Step = require('Step')

module.exports = function pipeline(settings) {
  var filters = []

  for (filterSettings in settings.filters) {
    filters.push(require('./'+filterSettings.type.toLowerCase()).(filterSettings))
  }

  return function pipeline(message, callback) {
    var collector = function(output) {
    }

    var processor = function(message, callback) {
    }

    Step(

    )
  }
}
