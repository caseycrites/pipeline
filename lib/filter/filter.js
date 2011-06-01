"use strict"

var pipeline = require('./pipeline')

module.exports = createPipeline

function createPipeline(options) {
  return pipeline(options)
}
