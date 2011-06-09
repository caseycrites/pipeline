var JSONSelect = require('JSONSelect')
  , JSONQuery = require('jsonquery')

/*
* {
*   type: 'extract',
*   json_query: '$.weather.temperature>60'
* }
*/
module.exports = function(settings) {
  return function extract(options) {
    var compiledJsonQuery = JSONQuery(options.json_query)

    return function extract(message, callback) {
      return compiledJsonQuery(message)
    }
  }
}
