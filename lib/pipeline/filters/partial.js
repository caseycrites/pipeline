"use strict"

/*
*{
*  type: 'partial'
*  filter: [
*    {
*      type: 'union',
*      filter: [
*        {
*          type: 'split',
*          filter_1: [
*            {
*              type: 'transform',
*              data_structure: ''
*            }
*          ],
*          filter_2: [
*            {
*              type: 'identity'
*            }
*          ]
*        }
*      ],
*      left_name: 'records',
*      right_name: 'weather'
*    }
*  ]
*}
* or:
*{
*  type: 'partial',
*  filter: [
*    {
*      type: 'identity'
*    }
*  ],
*}
*/
module.exports = function(settings) {
  
  return function partial(options) {
    var pipeline = require('./pipeline')(settings)(options.filter)

    return function partial(message, callback) {
      var partialCallback = function(_message, _callback) {
        return pipeline({message: message, _message: _message}, _callback)
      }

      return callback(null, partialCallback)
    }
  }
}
