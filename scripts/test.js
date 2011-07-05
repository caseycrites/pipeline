var settings = require('pipeline/settings').autoload()
  , penelope = require('sgutil/penelope')(settings)

var pipeline = new Pipeline({
  name: 'test.pipeline',
  owner: 2270,
  'public': true,
  body: {this: 'is', sample: 'pipeline'}
})

penelope.save('Pipelines', pipeline.name, pipeline.toCassandra(), penelope.makeTimestamp(), function(err) {
  if (err) throw err
  console.log('created pipeline: ', JSON.stringify(pipeline))
}
