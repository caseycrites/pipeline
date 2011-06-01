"use strict"

var DJSON = require('decimaljson')
  , JSONQuery = require('jsonquery')

/*
*{
*  type: 'transform',
*  data_structure: {
*    something: '$.some.value.to.extract',
*    something_else: '$.some.other.value.to.extract',
*    something_else_else: {
*      something_else_else_else: '$.some.other.other.value.to.extract'
*    }
*  }
*}
*/
module.exports = function transform(options) {
  var dataStructure = DJSON.parse(options.locals.data_structure)

  var transformMessage = function(jsonObj, message) {
    jsonObj.forEach(function(key) {
      if (typeof jsonObj[key] === 'object') {
        jsonObj[key] = transformMessage(jsonObj[key], message)
      } else {
        jsonObj[key] = JSONQuery(jsonObj[key], message)
      }
    })
    return jsonObj
  }

  return function transform(message, callback) {
    callback(transformMessage(dataStructure, message))
  }
}
