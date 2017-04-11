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
      if (this.checkPermission(this.permissionsScheme.authorized.permissions, sourceType, methodName)) {
        return;
      }

      let userRole = this.getUserRole(userId);

      if (this.checkRole(this.permissionsScheme.authorized.roles, userRole, sourceType, methodName)) {
        return;
      }

      throw new Error('Forbidden');
    }

    if (this.checkPermission(this.permissionsScheme.unauthorized.permissions, sourceType, methodName)) {
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

  checkRole(roles, userRole, sourceType, methodName) {
    if (roles[userRole] && roles[userRole].permissions) {
      return this.checkPermission(roles[userRole].permissions, sourceType, methodName);
    }

    return false;
  }
}

module.exports = RoleChecker;