function Filter(properties) {

}

module.exports = Filter

Filter.prototype.process = function(message, callback) {
  return callback(message)  
}
