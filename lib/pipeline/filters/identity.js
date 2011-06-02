"use strict"

module.exports = function(settings) {
  return function identity(options) {
    return function identity(message, callback) {
      callback(message)
    }
  }
}
