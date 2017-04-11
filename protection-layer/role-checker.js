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

    if (this.checkPermission(this.permissionsScheme.unauthorized, sourceType, methodName)) {
      return;
    }

    throw new Error('Unauthorized');
  }

  getUserRole(id) {

  }

  checkPermission(permissions, sourceType, methodName) {
    if (Array.isArray(permissions[sourceType]) && ~permissions[sourceType].indexOf(methodName)) {
      return true;
    }

    return false;
  }
}

module.exports = RoleChecker;