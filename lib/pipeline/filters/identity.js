"use strict"

module.exports = function identity(options) {
  return function identity(message, callback) {
    callback(message)
  }
}
