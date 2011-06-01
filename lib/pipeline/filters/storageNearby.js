"use strict"

var SimpleGeo = require('simplegeo').SimpleGeo

/*
* {
*   type: 'storageNearby',
*   layer: 'com.testing.layer',
*   radius: .25,
*   start: 134145,
*   end: 1235235345,
*   bbox: [lat, lon, lat, lon]
* }
*/
module.exports = function storageNearby(options) {
  var layer = options.locals.layer,
    , params = {
        radius: options.locals.radius || 25,
        start: options.locals.start,
        end: options.locals.end,
        bbox: options.locals.bbox
      }
    , key = options.globals.simplegeo.oauth_key
    , secret = options.globals.simplegeo.oauth_secret

  for (var key in params) {
    if (params[key] === undefined) {
      delete params[key]
    }
  }

  return function storageNearby(message, callback) {
    var lat = message.lat
      , lon = message.lon
      , ip = message.ip
      , address = message.address
      , simplegeoClient = new SimpleGeo(key, secret)
      , nearbyRecordFunc
      , nearbyRecordFuncParams

    if (lat && lon) {
      nearbyRecordFunc = simplegeoClient.getNearbyRecordsByLatLng
      nearbyRecordFuncParams = [layer, lat, lon, params, callback]
    } else if (ip) {
      nearbyRecordFunc = simplegeoClient.getNearbyRecordsByIP
      nearbyRecordFuncParams = [layer, ip, params, callback]
    } else if (address) {
      nearbyRecordFunc = simplegeoClient.getNearbyRecordsByAddress
      nearbyRecordFuncParams = [layer, address, params, callback]
    }

    nearbyRecordFunc.apply(simplegeoClient, nearbyRecordFuncParams)

  }
}
