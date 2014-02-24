'use strict';

var help = require('./_help');

require('shelljs/global');

module.exports = function(cwd, runner, callback) {
  var totoroResult = exec('totoro --runner=' + runner, {silent: true}).output;
  var result = /Passed on all/.test(totoroResult);
  console.info('totoro check result:' + result);
  totoroResult = help.generateTotoroReport(totoroResult);
  callback(!result, totoroResult, 'totoro.html');
}
