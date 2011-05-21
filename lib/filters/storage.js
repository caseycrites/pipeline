var Filter = require('./filter').Filter
  , util = require('util')
  , SimpleGeo = require('simplegeo').SimpleGeo

function Storage(properties) {
  this.layer = ''
  this.radius = 25
  this.start = undefined
  this.end = undefined
  this.bbox = undefined

  for (var key in properties) {
    this[key] = properties[key]
  }
}

util.inherits(Storage, Filter)

Storage.prototype.process = function(message, callback) {

}
