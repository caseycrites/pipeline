var SimpleGeo = require('simplegeo-client').SimpleGeo

/*
* {
*  type: 'places', 
*  input_name: 'incomingMessage', 
*  output_name: 'placesOutput',
*  q: 'starbucks',
*  category: 'coffee',
*  radius: .25
* }
* Perhaps q, category and radius should be in a properties object
*/
module.exports = function places(settings) {
  var q = settings.q
    , category = settings.category
    , radius = settings.radius

  return function places(message, callback) {
    var lat = message.lat
      , lon = message.lon
      , address = message.address
      , ip = message.ip
      , simplegeoClient = new SimpleGeo('', '')
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
