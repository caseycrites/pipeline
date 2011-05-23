var request = require('request')

module.exports = function notify(settings) {
  var url = settings.url
    , httpMethod = settings.http_method

  return function notify(message, callback) {
  }
}
