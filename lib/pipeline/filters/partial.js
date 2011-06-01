"use strict"

var pipeline = require('./pipeline')

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
*/
module.exports = function partial(options) {
  var pipeline = filter.createPipeline({locals: options.locals.filter, globals: options.globals})

  return function partial(message, callback) {
    callback(pipeline)
  }
}
