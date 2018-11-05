# ftp-promise-client
[![Build Status](https://travis-ci.org/easy-tools/ftp-promise-client.svg?branch=master)](https://travis-ci.org/easy-tools/ftp-promise-client)
[![codecov](https://codecov.io/gh/easy-tools/ftp-promise-client/branch/master/graph/badge.svg)](https://codecov.io/gh/easy-tools/ftp-promise-client)
[![NPM version][npm-image]][npm-url]

> still developing, promise ftp client base on ftp

## Installation

`$ yarn add ftp-promise-client`

## How To Use

```javascript
var fs = require('fs')
var path = require('path')

var FtpClientPromise = require('ftp-promise-client')

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
```

## License

  [MIT](./LICENSE)


[npm-image]: https://img.shields.io/npm/v/ftp-promise-client.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ftp-promise-client
