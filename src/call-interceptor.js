'use strict'

class CallInterceptor {
  constructor (source) {
    const self = this
    this._source = source

    return new Proxy(source, {
      get: (target, property, receiver) => {
        return self[property]
          ? self[property]
          : self._get(target, property, receiver)
      }
    })
  }

  async _get (target, property, receiver) {
    if (typeof target[property] === 'function') {
      return async (...args) => {
        let newArgs = await this._before.apply(this, [property].concat(args))
        let afterArgs = (Array.isArray(newArgs) && args.concat[newArgs]) || args
        args = (Array.isArray(newArgs) && newArgs) || args

        if (typeof this[property] === 'function') {
          await (async () => this[property].apply(this, args))()
        }

        let targetResult = await (async () => target[property].apply(target, args))()

        return (await this._after.apply(this, [property, targetResult].concat(afterArgs))) && targetResult
      }
    }

    return target[property]
  }

  async _before (methodName, ...args) {

  }

  async _after (methodName, targetResult, ...args) {

  }

  get source () {
    return this._source
  }

  get sourceTypeName () {
    /*
     *  We want to get the true source type name if CallInterceptors
     *  are included in each other
     */
    return this._source.sourceTypeName
      ? this._source.sourceTypeName
      : this._source.constructor.name
  }

  _hasGetter (target, property) {
    let targetProto = Object.getPrototypeOf(target)
    let propDesc = Object.getOwnPropertyDescriptor(targetProto, property)

    return !!(propDesc && propDesc['get'])
  }
}

module.exports = CallInterceptor
