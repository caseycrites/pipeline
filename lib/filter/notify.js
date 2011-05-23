var request = require('request')

module.exports = function notify(settings) {
  var uri = settings.uri
    , httpMethod = settings.http_method

  return function notify(message, callback) {
    request(
      {method: httpMethod , uri: uri , json: message}
      , function (error, response, body) {
        callback(error, response, body)
      }
    )
  }
}
