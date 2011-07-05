"use strict";

var _ = require('underscore')
  , sgutil = require('sgutil')

/**
 * Properties:
 *  - name
 *  - owner
 *  - public
 *  - body
 * @class Pipeline
 */
var Pipeline = module.exports = function Pipeline(attrs) {
  var self = this
  if (attrs) {
    Object.keys(attrs).forEach(function(k) {
      self[k] = attrs[k]
    })
  }
}

Pipeline.fromJSON = function(json) {
  if (!json.name) {
    throw {code: 400, message: "Pipeline must have a 'name' field"}
  }

  if (typeof(json.name) !== 'string') {
    throw {code: 400, message: "'name' field must be a string"}
  }

  if (json.name.length > 50) {
    throw {code: 400, message: "Pipeline name must be 50 characters or less"}
  }

  return new Pipeline({
    name: json.name,
    owner: json.owner,
    'public': json.public === true,
    body: json.body
  })
}

Pipeline.fromCassandra = function(cassandraMap) {
  return new Pipeline({
    name: cassandraMap.name,
    owner: parseInt(cassandraMap.owner),
    'public': !!parseInt(cassandraMap.public || 0),
    body: JSON.parse(cassandraMap.body),
    created: cassandraMap.created && parseInt(cassandraMap.created)
  })
}

Pipeline.prototype.toCassandra = function() {
  return {
    name: this.name,
    owner: this.owner.toString(),
    'public': (this.public ? '1' : '0'),
    body: JSON.stringify(this.body),
    created: this.created.toString()
  }
}

Pipeline.prototype.toResponse = function(isOwner) {
  return {
    name: this.name,
    'public': this.public,
    body: this.body,
    created: this.created
  }
}
