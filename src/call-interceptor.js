'use strict';

class CallInterceptor {
  constructor(source) {
    const self = this;
    this.source = source;

    return new Proxy(source, {
      get: function(target, property, receiver) {
        if (typeof target[property] === 'function') {
          return function(...args) {
            let newArgs = self.before.apply(self, [property].concat(args));
            args = Array.isArray(newArgs) && newArgs || args;

            typeof self[property] === 'function' && self[property].apply(self, args);
            let targetResult = target[property].apply(target, args);

            return self.after.apply(self, [property, targetResult].concat(args)) && targetResult;
          }
        }

        return target[property];
      }
    });
  }

  before(methodName, ...args) {

  }

  after(methodName, targetResult, ...args) {

  }

  getSource() {
    return this.source;
  }

  getSourceType() {
    if (typeof this.source.__proto__['getSourceType'] === 'function') {
      return this.source.getSourceType();
    }

    return this.source.constructor.name;
  }
}

module.exports = CallInterceptor;
