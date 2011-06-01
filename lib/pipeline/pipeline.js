"use strict"

var cfgFile = process.env.PIPELINE_CFG || 'pipeline.cfg'
  , settings = require('./settings').load(cfgFile)
  , pipeline = require('./pipeline')

module.exports = createPipeline

function createPipeline(options) {
  var pipelineSettings = {locals: options, globals: settings}
  return pipeline(pipelineSettings)
}
