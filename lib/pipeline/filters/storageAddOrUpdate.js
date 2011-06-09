"use strict"

var SimpleGeo = require('simplegeo').SimpleGeo

module.exports = function(settings) {

  return storageAddOrUpdate(options) {
    var layer = options.layer
      , key = settings.simplegeo.oauth_key
      , secret = settings.simplegeo.oauth_secret

    return storageAddOrUpdate(message, callback) {
      // TODO We need some way of gleaning this info better. Also, we need to
      // add the rest of what's in the message as the record.
      var id = message.id
        , simplegeoClient = new SimpleGeo(key, secret)

        simplegeoClient.putRecord(id, layer, {lat: message.lat, lon: message.lon}, callback)

    }

  }
}
