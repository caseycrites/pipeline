"use strict"

var cfgFile = process.env.PIPELINE_CFG || 'pipeline.cfg'
  , settings = require('./settings').load(cfgFile)
  , pipeline = require('./filters/pipeline')(settings)

module.exports = function(options) {
  return pipeline(options)
}
