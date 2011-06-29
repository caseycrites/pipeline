"use strict"

var SimpleGeo = require('simplegeo-client').SimpleGeo

/*
* {
*   type: 'storageGet',
*   layer: 'com.testing.layer',
* }
*/
module.exports = function(settings) {
  
  return function storageGet(options) {
    var layer = options.layer
      , key = settings.simplegeo.oauth_key
      , secret = settings.simplegeo.oauth_secret

    return function storageGet(message, callback) {
      var id = message.id
        , simplegeoClient = new SimpleGeo(key, secret)

      console.warn('storageGet layer: ', layer)
      console.warn('storageGet id: ', id)

      return simplegeoClient.getRecord(id, layer, callback)
    }
  }
}
