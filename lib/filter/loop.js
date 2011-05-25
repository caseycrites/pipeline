// Hmmm, this is really just a pipeline inside a loop.

module.exports = function loop(settings) {
  var filters = []

  for (filterSettings in settings.filters) {
    filters.push(require('./'+filterSettings.type.toLowerCase()).(filterSettings))
  }

  return function loop(message, callback) {
    var payloads = message.body
    for (var payload in payloads) {
      for (var filter in filters) {
      }
    }
  }
}
