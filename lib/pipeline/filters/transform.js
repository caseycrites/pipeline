"use strict"

var JSONQuery = require('jsonquery').JSONQuery
  , JSONSelect = require('JSONSelect')
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

    function deepObjCopy(dupeObj) {
      var retObj = new Object();
      if (typeof(dupeObj) == 'object') {
        if (typeof(dupeObj.length) != 'undefined')
          var retObj = new Array();
          for (var objInd in dupeObj) {	
            if (typeof(dupeObj[objInd]) == 'object') {
            retObj[objInd] = deepObjCopy(dupeObj[objInd]);
          } else if (typeof(dupeObj[objInd]) == 'string') {
            retObj[objInd] = dupeObj[objInd];
          } else if (typeof(dupeObj[objInd]) == 'number') {
            retObj[objInd] = dupeObj[objInd];
          } else if (typeof(dupeObj[objInd]) == 'boolean') {
            ((dupeObj[objInd] == true) ? retObj[objInd] = true : retObj[objInd] = false);
          }
        }
      }
      return retObj
    }

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
          } else {
            try {
              var result = JSONSelect.match(current, message)
            } catch (err) {
              // It didn't match, leave it untouched
              console.warn(err)
              continue
            }
            console.warn('tranform result: ', result)
            jsonObj[key] = result
          }
        }

        // super hacky, in order to get the arrays of strings working
        if (typeof jsonObj === 'string') {
          try {
            jsonObj = JSONSelect.match(jsonObj, message)
          } catch (err) {
            // It didn't match, leave it untouched
          }
        }
        return jsonObj
      }

      return callback(null, transformMessage(deepObjCopy(dataStructure), message))
    }
  }
}
