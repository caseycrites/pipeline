"use strict"

/*
* This was completely wrong before...apologies.
* I'll add in a correct version later
*/
module.exports = function(settings) {

  return function map(options) {
    var pipeline = require('./pipeline')(settings)(options.filter)

    return function map(message, callback) {
      console.warn('map: ', message)
      var mapOutput = function(err, response) {
        var mapFunction = response[0]
          , list= response[1]
        console.warn('map err: ', err)
        console.warn('map mapFunction: ', mapFunction)
        console.warn('map list: ', list)
        if (err) {
          return callback(err)
        }

        var outputList = []
        var compileResults = function(err, result) {
          if (err) {
            return callback(err)
          }
          outputList.push(result)
          if (list.length === outputList.length) {
            return callback(null, outputList)
          }
        }

        list.forEach(function(item) {
          mapFunction(item, compileResults)
        })

      }
      return pipeline(message, mapOutput)
    }
  }
}
