"use strict"

module.exports = function(app, settings) {
  var emptyPipeline = require('../filters/pipeline')(settings)
    , handlers = require('../handlers')(settings)
    , respond = handlers.respond
    , PIPELINE = handlers.PIPELINE
    , penelope = require('sgutil').penelope(settings)
    , makeTimestamp = penelope.makeTimestamp
    , pipelines = require('../pipelines')
    , Pipeline = pipelines.Pipeline

  // creating and/or updating pipelines
  app.post('/1.0/pipelines/'+PIPELINE+'.json', function(req, res, next) {
    var name = req.params.pipeline
      , pipelineOpts = req.body || JSON.parse(req.rawBody)
      , pipelineJSON = {}

    pipelineJSON['body'] = pipelineOpts
    pipelineJSON['name'] = name
    pipelineJSON['owner'] = req.user.id
    pipelineJSON['public'] = true

    var timestamp = makeTimestamp()
    pipelineJSON['created'] = timestamp

    var pipeline = Pipeline.fromJSON(pipelineJSON)

    pipelines.save(pipeline, timestamp, function(err, data) {
      if (err) return next(err)
      respond(res, {status: 'ok'})
    })
  })

  app.post('/1.0/events/', function(req, res, next) {
    var message = req.body.event
      , pipelineName = req.body.pipeline
    
    var start = function(err, data, timestamp) {
      if (err) { return respond(res, 404, {status: "pipeline not found"}) }
      var pipeline = emptyPipeline(data.body)

      var finished = function(err, response) {
        if (err) { return next(err) }
        console.log('finished...\n' + response)
      }

      pipeline(message, finished)

      respond(res, {status: 'ok'})
    }

    pipelines.load(pipelineName, start)

  })

}
