var filter = require('./filter')

/*
*{
*  type: 'map',
*  filter: [
*    {
*      type: 'split',
*      filter_1: [
*        {
*          type: 'context'
*        },
*        {
*          type: 'transform',
*          data_structure: ''
*        },
*        {
*          type: 'partial'
*        }
*      ],
*      filter_2: [
*        {
*          type: 'transform'
*          data_structure: ''
*        }
*      ]
*    }
*  ]
*}
*/
module.exports = function map(settings) {
  var pipeline = filter.createPipeline(settings.filter)

  return function map(message, callback) {
    var mapOutput = function(mapFunction, list) {
      var outputList = []
      list.forEach(function(item) {
        outputList.push(mapFunction(item))
      })
      callback(outputList)
    }
    pipeline(message, mapOutput)
  }

}
