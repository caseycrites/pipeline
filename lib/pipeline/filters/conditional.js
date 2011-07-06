"use strict"

var JSONSelect = require('JSONSelect')
  , _ = require('underscore')

/*
* {
*    left_hand_side: '.weather .temperature',
*    right_hand_side: '55',
*    operator: '>='
* }
*/
module.exports = function(settings) {

  var operatorMap = {
    '=': function(lhs, rhs) { return lhs === rhs },
    '>': function(lhs, rhs) { return lhs > rhs },
    '<': function(lhs, rhs) { return lhs < rhs },
    '>=': function(lhs, rhs) { return lhs >= rhs },
    '<=': function(lhs, rhs) { return lhs <= rhs },
    '!=': function(lhs, rhs) { return lhs !== rhs }
  }

  return function conditional(options) {
    var lhsQuery = options.left_hand_side
      , rhsQuery = options.right_hand_side
      , operator = options.operator

    return function conditional(message, callback) {
      var lhsQueryResult = JSONSelect.match(lhs, message)
        , rhsQueryResult = JSONSelect.match(rhs, message)
        , lhs
        , rhs

      console.warn('conditional lhsQueryResult: ', lhsQueryResult)
      console.warn('conditional rhsQueryResult: ', rhsQueryResult)

      function determineOperand(query, queryResult) {
        if (_.isArray(queryResult) && queryResult.length === 0) {
          return query
        } else {
          return queryResult
        }
      }

      lhs = determineOperand(lhsQuery, lhsQueryResult)
      rhs = determineOperand(rhsQuery, rhsQueryResult)

      console.warn('conditional lhs: ', lhs)
      console.warn('conditional rhs: ', rhs)

      if (operatorMap[operator](lhs, rhs)) {
        return message
      } else {
        // Figure out if this should be undefined or something else when we address error processing
        return undefined
      }
    }
  }
}
