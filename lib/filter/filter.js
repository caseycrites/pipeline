var pipeline = require('./pipeline')

module.exports = createPipeline

function createPipeline(settings) {
  return pipeline(settings)
}
