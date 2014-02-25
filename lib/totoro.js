'use strict';

var help = require('./_help.js');
require('shelljs/global');

module.exports = function(src, opts, callback) {
  cd(src)
  var spmResult = exec('spm doc build', {silent:true}).output;

  if (isSpmBuildSucc(spmResult)) {
    cd('_site')
    var totoroResult = exec('totoro', {silent: true}).output
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
