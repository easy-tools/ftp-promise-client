var fs = require('fs')
var path = require('path')

var FtpClientPromise = require('../lib')

var rawPath = './app.json'
var configPath = path.join(__dirname, rawPath)
if (!fs.existsSync(configPath)) {
  throw new Error('app.json Config is not exist')
}
let appConfig = require(rawPath)

var ftpClient = FtpClientPromise.Factory(appConfig.ftp)
ftpClient.list().then(function (result) {
  console.log(result.response)
  ftpClient.close()
})
