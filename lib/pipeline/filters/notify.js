"use strict"

var request = require('request')
  , DJSON = require('decimaljson')

/*
* {
*   type: 'notify',
*   uri: 'http://starbucks.com/campaigns/frappucino.json',
*   httpMethod: 'POST'
* }
*/
module.exports = function notify(options) {
  var uri = options.uri
    , httpMethod = options.http_method

  return function notify(message, callback) {
    request(
      {method: httpMethod, uri: uri, headers: {'content-type': 'application/json'}, body: DJSON.stringify(message)}
      , function (error, response, body) {
        callback(error, response, body)
      }
    )
  }
}
