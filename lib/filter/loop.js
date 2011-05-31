var filter = require('filter')

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
module.exports = function loop(options) {
  var pipeline = filter.createPipeline(options.filter)

  return function loop(message, callback) {
    var index = 0
      , output = []

    var next = function(err, results) {
      if (err) {
        console.log(err.toString())
      }
      output.push(results)
      ++index
      if (message[index]) {
        pipeline(message[index], next)
      } else {
        callback(output)
      }
    }

    pipeline(message[i], next)
  }
}
