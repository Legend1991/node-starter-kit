const assert = require('assert')
const {describe, it} = require('mocha')

class CallInterceptorTest {
  constructor (Type) {
    this._Type = Type
  }

  run () {
    describe('CallInterceptor', () => {
      this._checkSourceGetter()
      this._checkSourceTypeNameGetter()
    })
  }

  _checkSourceGetter () {
    it('Getting true source', async () => {
      let id = Date.now()
      let ci = new this._Type({id})

      assert.equal(ci.source.id, id, 'It is expected that the source from CallInterceptor object match the source passed to CallInterceptor constructor')
    })
  }

  _checkSourceTypeNameGetter () {
    it('Getting true source type name', async () => {
      let ci = new this._Type(new Array(0))

      assert.equal(ci.sourceTypeName, 'Array', 'It is expected that the source type name from CallInterceptor object match the source type name passed to CallInterceptor constructor')
    })
  }
}

module.exports = CallInterceptorTest
