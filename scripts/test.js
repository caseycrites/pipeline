#!/usr/bin/env node
// vim: filetype=javascript

var settings = require('pipeline/settings').autoload()
  , Pipeline = require('pipeline/Pipeline')
  , penelope = require('sgutil').penelope(settings)

var pipeline = new Pipeline({
  name: 'test.pipeline',
  owner: 2270,
  'public': true,
  body: {this: 'is', sample: 'pipeline'},
  created: penelope.makeTimestamp()
})

penelope.save('Pipelines', pipeline.name, pipeline.toCassandra(), penelope.makeTimestamp(), function(err) {
  if (err) throw err
  console.log('created pipeline: ', JSON.stringify(pipeline))
  penelope.load('Pipelines', pipeline.name, function(err, data) {
    if (err) throw err
    console.log('retrieved pipeline: ', data)
    process.exit(0)
  })
})
