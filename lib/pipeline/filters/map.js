"use strict"

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
*          filter: [
*            {
*              type: 'union'
*              filter_1: [
*                {
*                  type: 'transform',
*                  data_structure: ''
*                }
*              ],
*              filter_2: [
*                {
*                  type: 'identity'
*                }
*              ]
*            }
*          ]
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
module.exports = function map(options) {
  var pipeline = filter.createPipeline(options.filter)

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
