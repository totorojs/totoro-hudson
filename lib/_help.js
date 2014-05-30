'use strict';

exports.generateTotoroReport = function(result) {
  result = result.split('\n')
  result = result.filter(function(line) {
      return !/^info handle|\.\./.test(line) && !/^info/.test(line) &&
             !/\'(?:chrome|firefox|safari|ie)/.test(line);
  })

  console.info('---->', result);
  result = result.join('\n').split(/^$/m)

  result = result.map(function(bInfo) {
    return renderBrowserInfo(bInfo)
  })

  var tpl = []
  var style = []
  style.push('<style>')
  style.push('div {margin: 1px}')
  style.push('.error {color:grey;}')
  style.push('.info {color:green;}')
  style.push('.m31 {color:green;}')
  style.push('.m32 {color:grey;}')
  style.push('</style>')

  tpl.push('<!doctype html><html lang="en"> <head> <meta charset="utf-8">')
  tpl.push(style.join('') + '</head><body>')
  tpl.push('<div>本次构建时间:' + getNow() + '</div>')
  tpl.push('<div>-----------------------------------------------------------</div>')
  tpl.push(result.join(''))
  tpl.push('</body></html>')
  return tpl.join('')
}

function renderBrowserInfo(info) {
    info = info.replace(/^( +)(\w)/mg, function(m, g, w) {
        return getSpace(g.length) + w
    })
    info = info.replace(/\n/g, '<br/>') //replace('/\s/g', '&nbsp;')

    var regLogBegin = /\[3(\d{1,2})m/g;
    var regLogEnd = /\[0m/g;
    info = info.replace(regLogBegin, '<span class="m3$1">').replace(regLogEnd, '</span>');


    if (info.trim() && info.indexOf('Passed all of') < 0 && info.indexOf('Passed on all') < 0) {
        return '<div class="error">' + info + '</div>'
    } else {
        return '<div class="info">' + info + '</div>'
    }
}

function getSpace(length) {
    return new Array(length + 1).join('&nbsp;')
}

function getNow() {
    var date = new Date()

    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' +
           date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}
