var Step = require('Step')

module.exports = function pipeline(settings) {
  var filters = []
    , messages = {unnamed_outputs: []}

  for (filterSettings in settings.filters) {
    filters.push(require('./'+filterSettings.type.toLowerCase()).(filterSettings))
  }

  return function pipeline(message, callback) {
    // The first filter's input_name should always be incomingMessage
    messages['incomingMessage'] = message
    for (var filter in filters) {
      nextMessage = messages[filter.input_name]
      Step(
        filter(nextMessage, this),
        function collect(err, output) {
          if (filter.output_name) {
            messages[filter.output_name] = output
          } else {
            messages.unnamed_outputs.push(output)
          }
        }
      )
    }
  }
}
