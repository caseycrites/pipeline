"use strict"

/*
*
*{
*  'type': 'union',
*  'filter': [
*    {
*      'type': 'split',
*      'filter_1': [
*        {
*          'type': 'storageNearby',
*          'layer': 'com.testing.layer',
*          'radius': '.25',
*        }
*      ],
*      'filter_2': [
*        {
*          'type': 'context'
*        }
*      ]
*    }
*  ],
*  'left_name': 'records',
*  'right_name': 'context'
*}
*/
module.exports = function(settings) {
  
  return function union(options) {
    var pipeline = require('./pipeline')(settings)(options.filter)
      , leftName = options.left_name
      , rightName = options.right_name

    return function union(message, callback) {
      var unionOutput = function(err, response1, response2) {
        if (err) {
          return callback(err)
        }
        console.warn('union response1: ', response1)
        console.warn('union response2: ', response2)
        var unionedResponse = {}
        unionedResponse[leftName] = response1
        unionedResponse[rightName] = response2
        return callback(null, unionedResponse)
      }
      return pipeline(message, unionOutput)
    }
  }
}
