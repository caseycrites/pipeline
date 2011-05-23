var JSONSelect = require('JSONSelect')

module.exports = function extract(settings) {
  var compiledJsonQuery = JSONSelect.compile(settings.json_query)

  return function extract(message, callback) {
    return compiledJsonQuery.match(message)
  }
}
