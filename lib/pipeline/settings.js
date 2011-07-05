"use strict";

var _ = require('underscore')
  , sgutil = require('sgutil')
  , readPoolConfig = sgutil.settings.readPoolConfig

var baseConfig = {
  simplegeo: {},
  cassandra: {
    Pipelines: {},
    PipelinesIndex: {}
  }
}

exports.load = function(file) {
  var cfgFile = sgutil.config_parser.readSync(file)

  var cfg = _.clone(baseConfig)

  cfg.simplegeo = cfgFile.simplegeo

  var cassandraDefaults = cfgFile.CassandraPools || {}

  Object.keys(baseConfig.cassandra).forEach(function(pool) {
    cfg.cassandra[pool] = readPoolConfig(cfgFile, pool, cassandraDefaults)
  })

  return cfg
}

exports.autoload = function(overrides) {
  var fs = require('fs')
    , cfgFiles = [process.env.PIPELINE_CONFIG, "pipeline.cfg", "/etc/pipeline/pipeline.cfg"]
    , cfgFile

  var found = cfgFiles.some(function(file) {
    try {
      if (file && fs.statSync(file).isFile()) {
        cfgFile = file
        console.log(" * Using config: " + cfgFile)
        return true
      }
    } catch (err) {
    }
  })

  if (!found) {
    throw Error("Could not find pipeline.cfg, tried: $PIPELINE_CONFIG," + cfgFiles.slice(1))
  }

  return exports.load(cfgFile)
}
