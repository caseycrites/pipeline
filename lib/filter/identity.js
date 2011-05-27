module.exports = function identity(settings) {

  return function identity(message, callback) {
    callback(message)
  }
}
