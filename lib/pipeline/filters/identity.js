"use strict"

module.exports = function(settings) {
  return function identity(options) {
    return function identity(message, callback) {
      console.warn('identity: ', message)
      return callback(null, message)
    }
  }
}
