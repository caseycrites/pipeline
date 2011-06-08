"use strict"

var cfgFile = process.env.PIPELINE_CONFIG || "pipeline.cfg"
  , settings = require('./settings').load(cfgFile)
  , connect = require('connect')
  , url = require('url')
  , _ = require('underscore')
  , DJSON = require('decimaljson')

module.exports = connect.createServer(
  function(req, res, next) {
    var start = Date.now()
    req.stats = {}
    req.profile = function(name) {
      var start = Date.now()
      return function(name2) {
        var now = Date.now()
        name2 = name2 || name
        req.stats[name2] = (req.stats[name2] || 0) + (now - start)
        start = now
      }
    }

    res.writeHead = (function(writeHead) {
      return function(code, headers) {
        headers['X-Response-Time'] = Date.now() - start
        headers['X-Timing-Stats'] = JSON.stringify(req.stats)
        res.writeHead = writeHead
        writeHead.apply(res, arguments)
      }
    })(res.writeHead)

    req.urlObj = url.parse(req.url, true) 

    req.uuid = req.headers['x-request-id']
    if (!req.headers['x-simplegeo-user']) {
      return next({code: 400, message: "User not authenticated"})
    }
    req.user = {
      id: parseInt(req.headers['x-simplegeo-user'])
    }

    next()
  },

  connect.logger(),

  function bodyDecoder(req, res, next) {
    // TODO assumes the body is JSON
    var data = ''
      , len = 0
    req.setEncoding('utf8')
    req.on('data', function(chunk) {
      len += chunk.length
      // TODO is 10MB enough?
      if (len > 10485760) {
        next({code: 400, message: "POST body must be under 10MB"})
      }
      data += chunk
    })
    req.on('end', function() {
      req.rawBody = data
      try {
        req.body = (data
          ? DJSON.parse(data)
          : {})
      } catch (err) {
        err.code = 400
        err.message = "Error parsing request body: " + err.message
        return next(err)
      }
      next()
    })
  },

  connect.router(require('./routes')(settings)),

  function(err, req, res, next) {
    var niceError
    if (err.code && _.isNumber(err.code)) {
      niceError = err
      logger.error(err.code, ':', err.message)
    } else {
      niceError = {code: 500, message: 'Internal Server Error'}
      if (err.stack) {
        logger.error(err.stack)
      } else if (err.message) {
        logger.error(err.message)
      } else {
        logger.error(err)
      }
    }
    res.writeHead(niceError.code, {
      "X-Error-Info": err.message || err.toString(),
      "Content-Type": "application/json"
    })
    res.end(JSON.stringify(niceError)+"\n")
  }
)

if (module === process.mainModule) {
  module.exports.listen(3000)
}
