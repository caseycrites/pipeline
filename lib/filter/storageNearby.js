var SimpleGeo = require('simplegeo').SimpleGeo

/*
* {
*   type: 'storageNearby',
*   input_name: 'incomingMessage',
*   output_name: '',
*   layer: 'com.testing.layer',
*   radius: .25,
*   start: 134145,
*   end: 1235235345,
*   bbox: [lat, lon, lat, lon]
* }
* Perhaps layer, radius, start, end, bbox should be in a properties object
*/
module.exports = function storageNearby(settings) {
  var layer = settings.layer,
    , params = {
        radius: settings.radius || 25,
        start: settings.start,
        end: settings.end,
        bbox: settings.bbox
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
