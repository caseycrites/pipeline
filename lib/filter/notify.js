var request = require('request')
  , DJSON = require('decimaljson')

/*
* {
*   type: 'notify',
*   input_name: 'incomingMessage',
*   output_name: '',
*   uri: 'http://starbucks.com/campaigns/frappucino.json',
*   httpMethod: 'POST'
* }
* Perhaps uri and httpMethod should be in a properties object
*/
module.exports = function notify(settings) {
  var uri = settings.uri
    , httpMethod = settings.http_method

  return function notify(message, callback) {
    request(
      {method: httpMethod, uri: uri, headers: {'content-type': 'application/json'}, body: DJSON.stringify(message)}
      , function (error, response, body) {
        callback(error, response, body)
      }
    )
  }
}
