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
*              type: 'extract',
*              json_query: '$.weather.temperature'
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
module.exports = function partial(settings) {
  var pipeline = filter.createPipeline(settings.filter)

  return function partial(message, callback) {

  }
}
