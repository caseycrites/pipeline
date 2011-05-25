var JSONSelect = require('JSONSelect')
  , JSONQuery = require('jsonquery')

/*
* {
*   type: 'extract',
*   input_name: 'incomingMessage',
*   output_name: 'extractOutput',
*   json_query: '$.weather.temperature>60'
* }
* Perhaps json_query should be in a properties object
*/
module.exports = function extract(settings) {
  var compiledJsonQuery = JSONQuery(settings.json_query)

  return function extract(message, callback) {
    return compiledJsonQuery(message)
  }
}
