"use strict"

module.exports = function(app, settings) {
  var emptyPipeline = require('../filters/pipeline')(settings)
    , handlers = require('../handlers')(settings)
    , respond = handlers.respond
    , PIPELINE = handlers.PIPELINE
    , penelope = require('sgutil').penelope(settings)

  // creating and/or updating pipelines
  app.post('/1.0/events/'+PIPELINE+'.json', function(req, res, next) {
  })

  app.post('/1.0/events/', function(req, res, next) {
    var message = req.body
      , pipelineName = message.pipeline
    
    var start = function(err, data, timestamp) {
      if (err) { return respond(res, 404, {status: "pipeline not found"}) }
      var pipeline = emptyPipeline(data)

      var finished = function(err, response) {
        if (err) { return next(err) }
        console.log('finished...\n' + response)
      }

      pipeline(message, finished)

      respond(res, {status: "ok"})
    }

    penelope.load('Pipelines', pipelineName, start)

  })

}
