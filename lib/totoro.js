'use strict';

require('shelljs/global')

module.exports = function(src, callback) {
  console.info('src--->', src)
    cd(src)
    var spmResult = exec('spm doc build', {silent:true}).output;
    if (/time:[\s\d\.]+s/.test(spmResult)) {
        cd('_site')
        var totoroResult = exec('totoro', {silent: true}).output
        var result = /Passed on all/.test(totoroResult)
        console.info('result---->', result)
        callback(result, totoroResult)
    } else {
        console.info('error')
  }
}

// module.exports('/Users/kanghui/projects/arale/base')
