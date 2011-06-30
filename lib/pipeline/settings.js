"use strict";

var _ = require('underscore')
  , sgutil = require('sgutil')
  , readPoolConfig = sgutil.settings.readPoolConfig

var baseConfig = {
  simplegeo: {},
  cassandra: {
    Pipelines: {}
  }
}

exports.load = function(file) {
  var cfgFile = sgutil.config_parser.readSync(file)

  var cfg = _.clone(baseConfig)
    , cfg.simplegeo = cfgFile.simplegeo

  var cassandraDefaults = cfgFile.CassandraPools || {}

  Object.keys(baseConfig.cassandra).forEach(function(pool) {
    cfg.cassandra[pool] = readPoolConfig(cfgFile, pool, cassandraDefaults)
  })

  return cfg
}
