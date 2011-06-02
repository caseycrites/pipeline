"use strict"

module.exports = function(settings) {

  return function pipeline(options) {
    var filters = []

    options.forEach(function(filter) {
      filters.push(require('./'+filter.type)(settings)(filter))
    })

    return function pipeline(message, callback) {
      var incomingMessage = message
        , index = 0

      var next = function(err, results) {
        if (err) {
          console.log(err.toString())
        }
        ++index
        if (filters[index]) {
          filters[index](results, next)
        } else {
          callback(results)
        }
      }

      filters[index](message, next)
    }
  }
}
