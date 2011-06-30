var JSONSelect = require('JSONSelect')
  , _ = require('underscore')

/*
* {
*   type: 'extract',
*   json_query: '$.weather.temperature'
* }
*/
module.exports = function(settings) {
  return function extract(options) {
    var jsonSelect = options.json_query

    return function extract(message, callback) {
      console.warn('extract: ', message)
      var result = JSONSelect.match(jsonSelect, message)
      console.warn('extract result: ', result)
      return callback(null, result)
    }
  }
}
