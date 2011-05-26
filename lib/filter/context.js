var SimpleGeo = require('simplegeo-client').SimpleGeo

/*
* {
*   type: 'context',
*   context_filters: 'weather,demographics'
* }
*/
module.exports = function context(settings) {
  var contextFilters = settings.context_filters

  return function context(message, callback) {
    // TODO Use the contextFilters once the node client is modified
    var lat = message.lat
      , lon = message.lon
      , ip = message.ip
      , address = message.address
      , simplegeoClient = new SimpleGeo('', '')
      , contextFunc
      , contextFuncParams

    if (lat && lon) {
      contextFunc = simplegeoClient.getContextByLatLng
      contextFuncParams = [lat, lon, callback]
    } else if (ip) {
      contextFunc = simplegeoClient.getContextByIP
      contextFuncParams = [ip, callback]
    } else if (address) {
      contextFunc = simplegeoClient.getContextByAddress
      contextFuncParams = [address, callback]
    }

    contextFunc.apply(simplegeoClient, contextFuncParams)
  }
}
