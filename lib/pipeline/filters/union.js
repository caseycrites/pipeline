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
      var unionOutput = function(err, response) {
        if (err) {
          return callback(err)
        }
        console.warn('union response1: ', response[0])
        console.warn('union response2: ', response[1])
        var unionedResponse = {}
        unionedResponse[leftName] = response[0]
        unionedResponse[rightName] = response[1]
        return callback(null, unionedResponse)
      }
      return pipeline(message, unionOutput)
    }
  }
}
