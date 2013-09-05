#!/usr/bin/env node

'use strict'

var fs = require('fs');
var path = require('path');
var async = require('async');

var args = process.argv.slice(2);
var cwd = process.cwd()

async.eachSeries(args, function(arg, cb) {
  try {
    var plugin = require('../lib/' + arg)
    plugin(cwd, function(err, result, filename) {
      output(arg, result, filename)
      if (!err) {
        cb(err)
      } else {
        cb()
      }
    })
  }catch(e) {
    console.error('error plugin ' + arg, e)
    cb('load plugin ' + arg + ' error!')
  }

}, function(err) {
    if (err) {
      console.info('totoro check error!' + err)
      process.exit(1)
    } else {
      process.exit(0)
    }
})

function output(name, result, filename) {
  mkdir('-p', '../target')
  if (filename) {
    name = filename
  } else {
    name = name + '.txt'
  }
  fs.writeFileSync('../target/' + name, result)
}
