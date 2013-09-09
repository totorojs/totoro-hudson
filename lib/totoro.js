'use strict';

require('shelljs/global')

module.exports = function(src, callback) {
  cd(src)
  var spmResult = exec('spm doc build', {silent:true}).output;

  if (isSpmBuildSucc(spmResult)) {
    cd('_site')
    var totoroResult = exec('totoro', {silent: true}).output
    var result = /Passed on all/.test(totoroResult)
    console.info('totoro check result:' + result)
    callback(!result, totoroResult)
  } else {
    callback('spm build doc result:' + spmResult)
  }
}

function isSpmBuildSucc(txt) {
    return /time:[\s\d\.]+s/.test(txt)
}

// module.exports('/Users/kanghui/projects/arale/base')
