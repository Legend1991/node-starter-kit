'use strict';

const CallInterceptor = require('../call-interceptor');

class RoleChecker extends CallInterceptor {
  constructor(source) {
    super(source);
  }

  before(methodName, userId) {
    let userRole = this.getUserRole(userId);
    let sourceType = this.getSourceType();
  }

  getUserRole(id) {

  }
}

module.exports = RoleChecker;