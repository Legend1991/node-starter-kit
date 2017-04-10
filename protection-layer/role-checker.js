'use strict';

const CallInterceptor = require('../call-interceptor');

class RoleChecker extends CallInterceptor {
  constructor(source) {
    super(source);
  }

  before(methodName) {

  }
}

module.exports = RoleChecker;