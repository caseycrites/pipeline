"use strict"

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
module.exports = function(settings) {

  return function map(options) {
    var pipeline = require('./pipeline')(settings)(options)

    return function map(message, callback) {
      var mapOutput = function(err, mapFunction, list) {
        if (err) {
          return callback(err)
        }
        var outputList = []
        list.forEach(function(item) {
          outputList.push(mapFunction(item))
        })
        return callback(null, outputList)
      }
      return pipeline(message, mapOutput)
    }
  }
}
