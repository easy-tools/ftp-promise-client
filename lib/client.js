
function FtpClientPromise(options, client) {
  this.options = options
  this.client = client
  this.isReady = false
  this.pendingList = []

  this.connect()
}

FtpClientPromise.prototype.connect = function () {
  var that = this
  this.client.on('ready', function () {
    that.isReady = true
    for (var i = 0; i < that.pendingList.length; i++) {
      var pending = that.pendingList.shift()
      that.client[pending.method].apply(that.client, [].concat(pending.args, pending.callback))
    }
  })
  this.client.connect(this.options)
}

FtpClientPromise.bind = function (target, source) {
  var FTP_METHODS = ['list', 'put', 'mkdir']
  for (var i in FTP_METHODS) {
    var method = FTP_METHODS[i]
    target.prototype[method] = FtpClientPromise.composeCall(method)
  }
}

FtpClientPromise.prototype.applyCall = function(eventMethod, callArgs, callback) {
  if (this.isReady) {
    this.client[eventMethod].apply(this.client, [].concat(callArgs, callback))
  } else {
    this.pendingList.push({
      args: callArgs,
      method: eventMethod,
      callback,
    })
  }
}

FtpClientPromise.composeCall = function (eventMethod) {
  return function () {
    var target = this

    var args = Array.prototype.slice.call(arguments)
    if (args instanceof Array && args.length && typeof args.slice(-1)[0] === 'function') {
      let callArgs = args.slice(0, -1)
      var callback = function (err) {
        if (err) {
          args.slice(-1)[0].call(target, err)
        } else {
          args.slice(-1)[0].apply(target, [null, callArgs])
        }
      }

      target.applyCall(eventMethod, callArgs, callback)
      return
    }

    return new Promise(function (resolve, reject) {
      var callback = function (err) {
        if (err) {
          reject(err)
        } else {
          resolve(args)
        }
      }

      target.applyCall(eventMethod, args, callback)
    })
  }
}

FtpClientPromise.bind(FtpClientPromise)

module.exports = FtpClientPromise
