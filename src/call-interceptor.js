'use strict'

class CallInterceptor {
  constructor (source) {
    const self = this
    this._source = source

    return new Proxy(source, {
      get: async (target, property, receiver) => {
        if (typeof target[property] === 'function') {
          return async (...args) => {
            let newArgs = await self.before.apply(self, [property].concat(args))
            let afterArgs = (Array.isArray(newArgs) && args.concat[newArgs]) || args
            args = (Array.isArray(newArgs) && newArgs) || args

            typeof self[property] === 'function' && await async () => self[property].apply(self, args)
            let targetResult = await async () => target[property].apply(target, args)

            return (await self.after.apply(self, [property, targetResult].concat(afterArgs))) && targetResult
          }
        }

        return target[property]
      }
    })
  }

  async before (methodName, ...args) {

  }

  async after (methodName, targetResult, ...args) {

  }

  get source () {
    return this._source
  }

  getSourceType () {
    if (typeof this._source['getSourceType'] === 'function') {
      return this._source.getSourceType()
    }

    return this._source.constructor.name
  }
}

module.exports = CallInterceptor
