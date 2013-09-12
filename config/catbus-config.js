var config = {
  options: {
    "html-doctype": false,
    "html-hard-code": true, 
    "html-https-warning": true, 
    "html-id-duplicate": false, 
    "html-inline-script": true,
    "html-meta-charset": false, 
    "html-quote-value": false,
    "html-tag-close": false, 
    "html-unsafe-resource": true, 
    "js-bitwise": true,
    "js-debug": true,
    "js-loopfunc": true,
    "js-newcap": false,
    "js-undef": false,
    "js-unused": false
  }, 
  ignore: [
    '\\.html',
    '\\.htm',
    '\\.txt',
    '\\/\\w*\\-?dalgen'
  ],
  require: [
    'catbus-html-typos'
  ]
}

exports.config = config;