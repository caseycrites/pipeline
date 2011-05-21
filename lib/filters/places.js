var Filter = require('./filter').Filter
  , util = require('util')
  , SimpleGeo = require('simplegeo-client').SimpleGeo

function Places(properties) {
  this.radius = 25
  this.categories = []
  this.q = ''

  for (var key in properties) {
    this[key] = properties[key]
  }
}

util.inherits(Places, Filter)

Places.prototype.process = function(message, callback) {

}
