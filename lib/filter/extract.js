var JSONSelect = require('JSONSelect')
  , JSONQuery = require('jsonquery')

module.exports = function extract(settings) {
  var compiledJsonQuery = JSONQuery(settings.json_query)

  return function extract(message, callback) {
    return compiledJsonQuery(message)
  }
}
