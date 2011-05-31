var JSONSelect = require('JSONSelect')
  , JSONQuery = require('jsonquery')

/*
* {
*   type: 'extract',
*   json_query: '$.weather.temperature>60'
* }
* Perhaps json_query should be in a properties object
*/
module.exports = function extract(options) {
  var compiledJsonQuery = JSONQuery(options.json_query)

  return function extract(message, callback) {
    return compiledJsonQuery(message)
  }
}
