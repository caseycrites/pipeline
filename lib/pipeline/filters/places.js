"use strict"

var SimpleGeo = require('simplegeo-client').SimpleGeo

/*
* {
*  type: 'places', 
*  q: 'starbucks',
*  category: 'coffee',
*  radius: .25
* }
*/
module.exports = function places(options) {
  var q = options.locals.q
    , category = options.locals.category
    , radius = options.locals.radius
    , key = options.globals.simplegeo.oauth_key
    , secret = options.globals.simplegeo.oauth_secret

  return function places(message, callback) {
    var lat = message.lat
      , lon = message.lon
      , address = message.address
      , ip = message.ip
      , simplegeoClient = new SimpleGeo(key, secret)
      , nearbyPlacesFunc
      , nearbyPlacesFuncParams

    if (lat && lon) {
      nearbyPlacesFunc = simplegeoClient.getNearbyPlacesByLatLng
      nearbyPlacesFuncParams = [lat, lon, callback]
    } else if (ip) {
      nearbyPlacesFunc = simplegeoClient.getNearbyPlacesByIp
      nearbyPlacesFuncParams = [ip, callback]
    } else if (address) {
      nearbyPlacesFunc = simplegeoClient.getNearbyPlacesByAddress
      nearbyPlacesFuncParams = [address, callback]
    }

    nearbyPlacesFunc.apply(simplegeoClient, nearbyPlacesFuncParams)

  }
}
