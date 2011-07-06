"use strict"

var JSONSelect = require('JSONSelect')
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

 function deepObjCopy(dupeObj) {
    var retObj = new Object()
    if (typeof(dupeObj) == 'object') {
      if (typeof(dupeObj.length) != 'undefined')
        var retObj = new Array()
        for (var objInd in dupeObj) {	
          if (typeof(dupeObj[objInd]) == 'object') {
          retObj[objInd] = deepObjCopy(dupeObj[objInd])
        } else if (typeof(dupeObj[objInd]) == 'string') {
          retObj[objInd] = dupeObj[objInd]
        } else if (typeof(dupeObj[objInd]) == 'number') {
          retObj[objInd] = dupeObj[objInd]
        } else if (typeof(dupeObj[objInd]) == 'boolean') {
          ((dupeObj[objInd] == true) ? retObj[objInd] = true : retObj[objInd] = false)
        }
      }
    }
    return retObj
  }

  // TODO Someone who understands regex better than me should make use of that
  // This will take a string with many mustached off areas, transform them and send
  // the string back.
  function transformString(str, message) {
    // If there are no mustaches, it's just plain text...send it back
    if (str.indexOf('{{') === -1) {
      return str
    }
    var strParts = new Array()
      , offset = 0
    while (true) {
      // find the start of the query
      var mustaches = str.indexOf('{{', offset)
      if (mustaches !== -1) {
        // find the end of the query
        var endMustaches = str.indexOf('}}', offset)
        // grab the query from inbetween
        var query = str.substring(mustaches+2, endMustaches)
        // if there's something before the query, grab it and push it into the parts
        if (offset !== mustaches) {
          strParts.push(str.substring(offset, mustaches))
        }
        // Grab what we're looking for and push it onto the array
        strParts.push(JSONSelect.match(query, message))
        // update the offset to start after the end mustaches
        offset = endMustaches+2
      } else {
        // if we're not at the end of the string, grab the rest of it
        if (offset !== str.length) {
          strParts.push(str.substring(offset))
        }
        break
      }
      return strParts.join('')
    }
    
  }

  return function transform(options) {
    var dataStructure = options.data_structure

    return function transform(message, callback) {
      console.warn('transform: ', message)

      var transformMessage = function(jsonObj, message) {
        console.warn('transform jsonObj: ', jsonObj)
        for (var key in jsonObj) {
          var current = jsonObj[key]
          if (_.isArray(current) || typeof current === 'object') {
            jsonObj[key] = transformMessage(current, message)
          } else {
            jsonObj[key] = transformString(current)
            console.warn('tranform result: ', jsonObj[key])
          }
        }
        return jsonObj
      }

      return callback(null, transformMessage(deepObjCopy(dataStructure), message))
    }
  }
}
