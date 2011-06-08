"use strict"

module.exports = function(settings) {
  return function(app) {
    require('./handlers/pipeline')(app, settings)

    app.all('*', function(req, res, next) {
      next({code: 404, message: 'Invalid Endpoint'})
    })
  }
}
