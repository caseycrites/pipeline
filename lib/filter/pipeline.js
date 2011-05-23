var Step = require('Step')

module.exports = function pipeline(settings) {
  var filters = []

  for (filterSettings in settings.filters) {
    filters.push(require('./'+filterSettings.name.toLowerCase()).(filterSettings.name))
  }

  return function pipeline(message, callback) {
    // How do I step through this shit?
  }
}
