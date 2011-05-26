var filter = require('./filter')

/*
*{
*  type: 'map',
*  filter: [
*    {
*      type: 'split',
*      filter_1: [
*        {
*          type:
*        }
*      ]
*    }
*  ]
*}
*/
module.exports = function map(settings) {
  var pipeline = filter.createPipeline(settings.filter)

  return function map(message, callback) {
    var mapOutput = function(function, list) {
      var outputList = []
      list.forEach(function(item) {
        outputList.push(function(item))
      })
      callback(outputList)
    }
    pipeline(message, mapOutput)
  }

}
