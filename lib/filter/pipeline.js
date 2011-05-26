module.exports = function pipeline(settings) {
  var filters = []

  settings.forEach(function(filter) {
    filters.push(require('./'+filter.type).(filter))
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
