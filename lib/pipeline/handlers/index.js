"use strict"

var DJSON = require('decimaljson')

module.exports = function(settings) {
  var handlers = {
    PIPELINE: ':pipeline([A-Za-z0-9.]+)',

    respond: function(res, code, body) {
      if (!body) {
        body = code
        code = 200
      }

      res.writeHead(code, {"Content-Type": "application/json"})
      res.end(DJSON.stringify(body)+"\n")
    }
  }
  return handlers
}
