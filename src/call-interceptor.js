'use strict';

class CallInterceptor {
  constructor(source) {
    const self = this;
    this.source = source;

    return new Proxy(source, {
      get: async (target, property, receiver) => {
        if (typeof target[property] === 'function') {
          return async (...args) => {
            let newArgs = await self.before.apply(self, [property].concat(args));
            let afterArgs = Array.isArray(newArgs) && args.concat[newArgs] || args;
            args = Array.isArray(newArgs) && newArgs || args;

            typeof self[property] === 'function' && await async () => self[property].apply(self, args);
            let targetResult = await async () => target[property].apply(target, args);

            return (await self.after.apply(self, [property, targetResult].concat(afterArgs))) && targetResult;
          }
        }

        return target[property];
      }
    });
  }

  async before(methodName, ...args) {

  }

  async after(methodName, targetResult, ...args) {

  }

  getSource() {
    return this.source;
  }

  getSourceType() {
    if (typeof this.source['getSourceType'] === 'function') {
      return this.source.getSourceType();
    }

    return this.source.constructor.name;
  }
}

module.exports = CallInterceptor;
