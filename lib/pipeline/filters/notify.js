"use strict"

var request = require('request')
  , DJSON = require('decimaljson')

/*
* {
*   type: 'notify',
*   uri: 'http://starbucks.com/campaigns/frappucino.json',
*   httpMethod: 'POST'
*   headers: {Authorization: 'Basic kljfsdlkfjfjslkfjs'},
*   payloadType: 'json|form'
* }
*/
module.exports = function(settings) {

  return function notify(options) {
    var uri = options.uri
      , httpMethod = options.http_method
      , headers = options.headers || {}
      , payloadType = options.payloadType

    return function notify(message, callback) {
      console.warn('notify: ', message)
      var body
      if (payloadType === 'json') {
        body = DJSON.stringify(message)
        headers['Content Type'] = 'application/json'
      } else {
        // loop through the object and build a url encoded string
        var parts = []
        Object.keys(message).forEach(function(name) {
          parts.push(encodeURIComponent(name) + '=' + encodeURIComponent(message[name]))
        })
        body = parts.join('&')
        headers['Content Type'] = 'application/x-www-form-urlencoded'
      }

      request(
        {method: httpMethod, uri: uri, headers: headers, body: body}
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
