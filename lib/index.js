
var Client = require('ftp')

var FtpClientPromise = require('./client')

FtpClientPromise.Factory = function (options) {
  return new FtpClientPromise(options, new Client())
}

module.exports = FtpClientPromise
