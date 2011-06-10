"use strict"

var JSONQuery = require('jsonquery').JSONQuery
  , _ = require('underscore')

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
module.exports = function(settings) {
  
  return function transform(options) {
    var dataStructure = options.data_structure

    return function transform(message, callback) {
      console.warn('transform: ', message)

      var transformMessage = function(jsonObj, message) {
        console.warn('transform jsonObj: ', jsonObj)
        for (var key in jsonObj) {
          var current = jsonObj[key]
          if (_.isArray(current)) {
            var elements = []
            current.forEach(function(element) {
              elements.push(transformMessage(element, message))
            })
            jsonObj[key] = elements
          } else if (typeof current === 'object') {
            jsonObj[key] = transformMessage(current, message)
          } else if (current.charAt(0) === '$') {
            // If the string value doesn't start with $, leave it
            var result = JSONQuery(current, message)
            console.warn('tranform result: ', result)
            jsonObj[key] = result
          }
        }

        // super hacky, in order to get the arrays of strings working
        if (typeof jsonObj === 'string' && jsonObj.charAt(0) === '$') {
          jsonObj = JSONQuery(jsonObj, message)
        }
        return jsonObj
      }

      return callback(null, transformMessage(dataStructure, message))
    }
  }
}
