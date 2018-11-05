var chai = require('chai')
var path = require('path')

var FtpClientPromise = require('../lib/client')
var MockClient = require('./mock')

var { expect, assert } = chai

var mockClient = new MockClient()
var autoMockClient = new MockClient(true)
var ftpClient = new FtpClientPromise({}, mockClient)
var ftpClientAuto = new FtpClientPromise({}, autoMockClient)

describe('should ftp works', function () {
  it('should put callback', function (done) {
    var source = Date.now()
    ftpClient.put(source, 'target').then(function(result) {
      expect(source).to.be.equal(result.request[0])
      done()
    })
    mockClient.emit('ready')
  })

  it('should put callback auto', function (done) {
    var source = Math.random()
    ftpClientAuto.put(source, 'target', function(err, result) {
      expect(source).to.be.equal(result.request[0])
      done()
    })
  })

  it('should put callback error', function (done) {
    ftpClient.put('error', 'target').catch(function(err) {
      expect(err.message).to.be.equal('fail')
      done()
    })
  })

  it('should put callback auto error', function (done) {
    ftpClientAuto.put('error', 'target', function(err) {
      expect(err.message).to.be.equal('fail')
      done()
    })
  })
})
