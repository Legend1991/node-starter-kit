const assert = require('assert')
const {describe, it} = require('mocha')
const CallInterceptor = require('../src/call-interceptor')

class CallInterceptorTest {
  constructor (Type) {
    this._Type = Type
  }

  run () {
    describe('CallInterceptor', () => {
      this._checkGetSourceType()
    })
  }

  _checkGetSourceType () {
    it('Getting right source type', () => {
      let ci = new this._Type(new Array(0))

      assert.equal(ci.getSourceType(), 'Array', 'It is expected that the source type from CallInterceptor match the source type passed to CallInterceptor constructor')
    })
  }
}

let callInterceptorTest = new CallInterceptorTest(CallInterceptor)
callInterceptorTest.run()

console.log('adf')

module.exports = CallInterceptorTest
