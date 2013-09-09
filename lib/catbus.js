var fs = require('fs')
var path = require('path')
require('shelljs/global')

module.exports = function(src, callback) {
    var config = path.resolve(__dirname, '../config') + '/catbus-config.js'
    exec('cp ' + config + ' .', {silent:true})

    cd(src)
    var logfile = 'temp.json'
    exec('catbus -r -L ' + logfile + ' .', {silent:true})
    var result = fs.readFileSync(logfile, 'utf-8')
    
    // console.log(result)
    fs.unlinkSync(logfile)
    callback(false, result, 'catbus.json')
}
