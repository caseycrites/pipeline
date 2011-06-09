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
          console.error(err.toString())
          // terminate the process
          return callback(err)
        }
        ++index
        if (filters[index]) {
          filters[index](results, next)
        } else {
          return callback(null, results)
        }
      }

      return filters[index](message, next)
    }
  }
}
