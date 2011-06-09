"use strict"

var SimpleGeo = require('simplegeo-client').SimpleGeo

module.exports = function(settings) {

  return function storageAddOrUpdate(options) {
    var layer = options.layer
      , key = settings.simplegeo.oauth_key
      , secret = settings.simplegeo.oauth_secret

    return function storageAddOrUpdate(message, callback) {
      // TODO We need some way of gleaning this info better. Also, we need to
      // add the rest of what's in the message as the record.
      console.warn('storageAddOrUpdate: ', message)
      var id = message.event.id
        , simplegeoClient = new SimpleGeo(key, secret)

        if (!id) {
          return callback('Incorrect parameters sent to storageAddOrUpdate filter')
        }

        return simplegeoClient.putRecord(id, layer, {lat: message.event.lat, lon: message.event.lon}, callback)

    }

  }
}
