"use strict"

var cfgFile = process.env.PIPELINE_CONFIG || "pipeline.cfg"
  , settings = require('./settings').load(cfgFile)
  , connect = require('connect')
  , url = require('url')
  , _ = require('underscore')
  , DJSON = require('decimaljson')
  , middleware = require('sgutil').middleware(settings)

module.exports = connect.createServer(
  middleware.behindGate(),
  connect.logger(),
  middleware.bodyDecoder(),
  connect.router(require('./routes')(settings)),
  middleware.behindGateErrorHandler()
)

if (module === process.mainModule) {
  module.exports.listen(3000)
}
