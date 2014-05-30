'use strict';

var help = require('./_help');

var shelljs = require('shelljs');

module.exports = function(cwd, options, callback) {

  var cmd = 'totoro ' + options.join(' ');
  console.info('cmd---> ' + cmd);
  var totoroResult = shelljs.exec(cmd, {silent: false}).output;
  var result = /Passed on all/.test(totoroResult);
  console.info('totoro check result:' + result);
  totoroResult = help.generateTotoroReport(totoroResult);
  callback(!result, totoroResult, 'totoro.html');
}
