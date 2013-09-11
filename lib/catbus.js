var fs = require('fs')
var path = require('path')
require('shelljs/global')

module.exports = function(src, callback) {
    var config = path.resolve(__dirname, '../config') + '/catbus-config.js'
    exec('cp ' + config + ' .', {silent:true})
    console.log('[catbus plugin]copy catbus config done.')

    cd(src)
    var logfile = 'temp.json'
    exec('catbus -r -L ' + logfile + ' .', {silent:true})
    var result = fs.readFileSync(logfile, 'utf-8')
    if (result) {
        console.log('[catbus plugin]read scan result done.')
    } else {
        console.log('[catbs plugin] read scan result failed.')
    }
    
    // console.log(result)
    fs.unlinkSync(logfile)
    callback(false, result, 'catbus.json')
}
