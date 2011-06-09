var JSONSelect = require('JSONSelect')
  , JSONQuery = require('jsonquery').JSONQuery
  , _ = require('underscore')

/*
* {
*   type: 'extract',
*   json_query: '$.weather.temperature'
* }
*/
module.exports = function(settings) {
  return function extract(options) {
    var compiledJsonQuery = JSONQuery(options.json_query)

    return function extract(message, callback) {
      if (!_.isArray(message)) {
        message = [message]
      }
      console.warn('extract: ', message)
      var result = compiledJsonQuery(message)
      console.warn('extract result: ', result)
      return callback(null, result)
    }
  }
}
