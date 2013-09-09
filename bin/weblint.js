#!/usr/bin/env node

'use strict'

var fs = require('fs');
var path = require('path');
var async = require('async');

var args = process.argv.slice(2);
var cwd = process.cwd()

if (args.indexOf('--version') > -1 || args.indexOf('-V') > -1 || args.indexOf('-v') > -1) {
    console.info(require('../package.json').version)
    process.exit(0)
}

console.info('working directory:' + cwd)

async.eachSeries(args, function(arg, cb) {
  try {
    var plugin = require('../lib/' + arg)
    plugin(cwd, function(err, result, filename) {
      output(arg, result, filename)
      cb(err, result)
    })
  }catch(e) {
    cb('Not found plugin ' + arg + '!')
  }
}, function(err) {
    if (err) {
      console.info('totoro check error: ' + err)
      process.exit(1)
    } else {
      console.info('weblint check succ!')
      process.exit(0)
    }
})


function output(name, result, filename) {
  var target = cwd + '/target/'
  mkdir('-p', target)
  if (filename) {
    name = filename
  } else {
    name = name + '.txt'
  }
  fs.writeFileSync(target + name, result)
}
