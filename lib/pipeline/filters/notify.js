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
module.exports = function(settings) {

  return function notify(options) {
    var uri = options.uri
      , httpMethod = options.http_method

    return function notify(message, callback) {
      console.warn('notify: ', message)
      request(
        {method: httpMethod, uri: uri, headers: {'content-type': 'application/json'}, body: DJSON.stringify(message)}
        , function (err, response, body) {
          console.warn('notify err: ', err)
          console.warn('notify response: ', response)
          console.warn('notify body: ', body)
          return callback(err, [response, body])
        }
      )
    }
  }
}
