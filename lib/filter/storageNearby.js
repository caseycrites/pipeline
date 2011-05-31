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
  var layer = options.layer,
    , params = {
        radius: options.radius || 25,
        start: options.start,
        end: options.end,
        bbox: options.bbox
      }

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
      , simplegeoClient = new SimpleGeo('', '')
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
