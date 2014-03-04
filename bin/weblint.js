#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');
var async = require('async');
var shelljs = require('shelljs');

var args = process.argv.slice(2);
var cwd = process.cwd()
var version = require('../package.json').version

console.info('weblint version: ' + version)

var plugins = [];
var options = [];
args.forEach(function(arg) {
  if (/^--/.test(arg)) {
    options.push(arg);
  } else {
    plugins.push(arg)
  }
});

console.info('working directory:' + cwd)
async.eachSeries(plugins, function(plugin, cb) {
  try {
    plugin = require('../lib/' + plugin)
    plugin(cwd, options, function(err, result, filename) {
      output(plugin, result, filename)
      cb(err, result)
    })
  }catch(e) {
    // cb('Not found plugin ' + arg + '!')
    cb(e.message)
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
  shelljs.mkdir('-p', target)
  if (filename) {
    name = filename
  } else {
    name = name + '.txt'
  }
  fs.writeFileSync(target + name, result)
}
