var fs = require('fs')
require('shelljs/global')

module.exports = function(src, callback) {
    cd(src)
    var logfile = 'temp.json'
    exec('catbus -r -L ' + logfile + ' .', {silent:true})
    var result = fs.readFileSync(logfile, 'utf-8')
    console.log(result)
    fs.unlinkSync(logfile)
    callback(false, result, 'catbus.json')
}
