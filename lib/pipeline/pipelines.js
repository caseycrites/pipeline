"use strict";

var sgutil = require('sgutil')
  , Pipeline = require('./Pipeline')

var pipelines = function(settings) {
  var logger = sgutil.logger('pipelines', settings)
    , penelope = sgutil.penelope(settings)

  return {
    Pipeline: Pipeline,

    save: function(pipeline, timestamp, callback) {
      penelope.save('Pipelines', pipeline.name, pipeline.toCassandra(), timestamp, function(err, data) {
        callback(err, data)
      })
    },

    load: function(name, callback) {
      penelope.load('Pipelines', name, function(err, data, timestamp) {
        if (err) return callback(err)

        callback(null, data && Pipeline.fromCassandra(data), timestamp)
      })
    },

    loadMulti: function(names, callback) {
      penelope.multiGetSliceAll('Pipelines', names, function(err, dataMap) {
        if (err) return callback(err)

        var recs = names.map(function(name) {
          var data = dataMap[name]
          if (data && data.length !== 0) {
            var cassandraMap = {}
            data.forEach(function(e) {
              var column = e.column
              cassandraMap[column.name.toString('utf8')] = column.value.toString('utf8')
            })

            return Pipeline.fromCassandra(cassandraMap)
          }
          return null
        })

        callback(null, recs)
      })
    },
  }
}

module.exports = pipelines

