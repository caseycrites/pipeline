var filter = require('filter')

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
  var pipeline = filter.createPipeline(options.filter)

  return function partial(message, callback) {
    callback(pipeline)
  }
}
