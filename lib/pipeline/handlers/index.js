"use strict"

module.exports = function(settings) {
  var handlers = {
    EVENT: '',

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
