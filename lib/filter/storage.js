var SimpleGeo = require('simplegeo').SimpleGeo

module.exports = function storage(settings) {
  var layer = settings.layer,
    , params = {radius: settings.radius || 25,
                start: settings.start,
                end: settings.end,
                bbox: settings.bbox}

  for (var key in params) {
    if (params[key] === undefined) {
      delete params[key]
    }
  }

  return function storage(message, callback) {
    var lat = message.lat
      , lon = message.lon
      , ip = message.ip
      , address = message.address
      , simplegeoClient = new SimpleGeo('', '')
      , nearbyRecordFunc
      , nearbyRecordFuncParams

    if (lat && lon) {
      nearbyRecordFunc = getNearbyRecordsByLatLng
      nearbyRecordFuncParams = [layer, lat, lon, params, callback]
    } else if (ip) {
      nearbyRecordFunc = getNearbyRecordsByIP
      nearbyRecordFuncParams = [layer, ip, params, callback]
    } else if (address) {
      nearbyRecordFunc = getNearbyRecordsByAddress
      nearbyRecordFuncParams = [layer, address, params, callback]
    }

    nearbyRecordFunc.apply(simplegeoClient, nearbyRecordFuncParams)

  }
}
