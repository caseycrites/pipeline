"use strict"

/*
*{
* type: 'loop',
* filter: [
*   {
*     type: 'notify',
*     url: 'http://starbucks.com/campaigns/frappucino.json',
*     http_method: 'POST'
*   }
* ]
*/
module.exports = function(settings) {

  return function loop(options) {
    var pipeline = require('./pipeline')(settings)(options.filter)

    return function loop(message, callback) {
      console.warn('loop: ', message)
      var index = 0
        , output = []

      var next = function(err, results) {
        if (err) {
          console.log(err.toString())
          return callback(err)
        }
        output.push(results)
        ++index
        if (message[index]) {
          pipeline(message[index], next)
        } else {
          return callback(null, output)
        }
      }

      return pipeline(message[index], next)
    }
  }
}
