'use strict';

var help = require('./_help.js');
var shelljs = require('shelljs');

module.exports = function(src, opts, callback) {
  shelljs.cd(src)
  var spmResult = shelljs.exec('spm doc build', {silent:true}).output;

  if (isSpmBuildSucc(spmResult)) {
    shelljs.cd('_site')
    var totoroResult = shelljs.exec('totoro', {silent: true}).output
    var result = /Passed on all/.test(totoroResult)
    console.info('totoro check result:' + result)
    totoroResult = help.generateTotoroReport(totoroResult)
    callback(!result, totoroResult, 'totoro.html')
  } else {
    callback('spm build doc result:' + spmResult)
  }
}

function isSpmBuildSucc(txt) {
  return /time:[\s\d\.]+s/.test(txt)
}
