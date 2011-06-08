"use strict"

module.exports = function(app, settings) {
  var emptyPipeline = require('../filters/pipeline')(settings)
    , handlers = require('../handlers')(settings)
    , respond = handlers.respond
    , EVENT = handlers.EVENT

  // In the future, this should do a db lookup to find the pipeline
  // options, but for now let's just pass the options and message in
  // with the request.
  app.post('/1.0/event/'+EVENT+'.json', function(req, res, next) {
    var pipelineOptions = req.body.options
      , pipeline = emptyPipeline(options)
      , message = req.body.message

      var finished = function(err, response) {
        if (err) {
          return next(err)
        }
        console.log('finished...\n' + response)
      }

      pipeline(message, finished)

      respond(res, {status: "ok"})
  })
}
