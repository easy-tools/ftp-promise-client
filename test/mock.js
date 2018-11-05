var EventEmitter = require('events').EventEmitter

class MockClient extends EventEmitter {
  constructor(autoConnect) {
    super()
    this.handlers = {}
    this.init()
    this.isReady = false
    this.isEnd = false
    this.autoConnect = autoConnect || false
  }

  init() {
    var that = this
    this.on('put', function () {
      that.handlers.callback.call(null, null)
    })

    this.on('error', function () {
      that.handlers.callback.call(null, new Error('fail'))
    })

    this.on('ready', function () {
      that.isReady = true
      console.log("I'm Ready!")
    })
  }

  connect() {
    console.log('connect')
    var that = this

    if (this.autoConnect) {
      setTimeout(function(){
        that.emit('ready')
      }, 1)
    }
  }

  end() {
    this.isEnd = true
  }

  put(source, target, callback) {
    console.log('start put')
    this.handlers = {
      args: {
        source,
        target,
      },
      callback,
    }

    if (!this.isReady) {
      return
    }

    if (source === 'error' || this.isEnd) {
      this.emit('error')
    } else {
      this.emit('put')
    }
  }
}

module.exports = MockClient
