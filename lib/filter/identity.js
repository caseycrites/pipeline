module.exports = function identity(settings) {

  return function identity(message, callback) {
    return callback(message)
  }
}
