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
    totoroResult = generateTotoroReport(totoroResult)
    callback(!result, totoroResult, 'totoro.html')
  } else {
    callback('spm build doc result:' + spmResult)
  }
}

function isSpmBuildSucc(txt) {
    return /time:[\s\d\.]+s/.test(txt)
}

function generateTotoroReport(result) {
    result = result.split('\n')
    result = result.filter(function(line) {
        return !/^info handle|\.\./.test(line)
    })

    result = result.join('\n').split(/^$/m)
    result = result.map(function(bInfo) {
        return renderBrowserInfo(bInfo)
    })

    var tpl = []
    var style = []
    style.push('<style>')
    style.push('div {margin: 20px}')
    style.push('.error {color:#C00;}')
    style.push('.info {color:green;}')
    style.push('</style>')

    tpl.push('<!doctype html><html lang="en"> <head> <meta charset="utf-8">')
    tpl.push(style.join('') + '</head><body>')
    tpl.push(result.join(''))
    tpl.push('</body></html>')
    return tpl.join('')
}

function renderBrowserInfo(info) {
    if (info.trim() && info.indexOf('Passed all of') < 0 && info.indexOf('Passed on all') < 0) {
        return '<div class="error">' + info + '</div>'
    } else {
        return '<div class="info">' + info + '</div>'
    }
}
