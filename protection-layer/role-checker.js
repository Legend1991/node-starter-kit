'use strict';

const CallInterceptor = require('../call-interceptor');

class RoleChecker extends CallInterceptor {
  constructor(source, permissionsScheme) {
    super(source);
    this.permissionsScheme = permissionsScheme;
  }

  before(methodName, userId) {
    let sourceType = this.getSourceType();

    if (userId) {
      let userRole = this.getUserRole(userId);

      throw new Error('Forbidden');
    }

    throw new Error('Unauthorized');
  }

  getUserRole(id) {

  }
}

module.exports = RoleChecker;