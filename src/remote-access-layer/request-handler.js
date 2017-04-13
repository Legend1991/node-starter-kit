'use strict';

const CallInterceptor = require('../call-interceptor');
const ForbiddenError = require('../errors/forbidden-error');
const UnauthorizedError = require('../errors/unauthorized-error');

class RequestHandler extends CallInterceptor {
  constructor(source) {
    super(source);
  }

  before(methodName) {

  }
}

module.exports = RequestHandler;
