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
module.exports = function(settings) {
  
  return function places(options) {
    var params = {
        q: options.q,
        category: options.category,
        radius: options.radius
      }
      , key = settings.simplegeo.oauth_key
      , secret = settings.simplegeo.oauth_secret

    for (var paramKey in params) {
      if (params[paramKey] === undefined) {
        delete params[paramKey]
      }
    }

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
        nearbyPlacesFuncParams = [lat, lon, params, callback]
      } else if (ip) {
        nearbyPlacesFunc = simplegeoClient.getNearbyPlacesByIp
        nearbyPlacesFuncParams = [ip, params, callback]
      } else if (address) {
        nearbyPlacesFunc = simplegeoClient.getNearbyPlacesByAddress
        nearbyPlacesFuncParams = [address, params, callback]
      } else {
        return callback("Incorrect parameters sent to places filter.")
      }

      return nearbyPlacesFunc.apply(simplegeoClient, nearbyPlacesFuncParams)

    }
  }
}
