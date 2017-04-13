'use strict';

class CallInterceptor {
  constructor(source) {
    const self = this;
    this.source = source;

    return new Proxy(source, {
      get: function(target, property, receiver) {
        if (typeof target[property] === 'function') {
          return function(...args) {
            self.before.apply(self, [property].concat(args));

            typeof self[property] === 'function' && self[property].apply(self, args);
            let result = target[property].apply(target, args);

            self.after.apply(self, [property].concat(args));

            return result;
          }
        }

        return target[property];
      }
    });
  }

  before(methodName) {

  }

  after(methodName) {

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