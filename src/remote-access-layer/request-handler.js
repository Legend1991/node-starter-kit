'use strict';

const CallInterceptor = require('../call-interceptor');
const ForbiddenError = require('../errors/forbidden-error');
const UnauthorizedError = require('../errors/unauthorized-error');

class RequestHandler extends CallInterceptor {
  constructor(source) {
    super(source);
  }

  async before(methodName, req, res, next) {

  }

  async after(methodName, targetResult, req, res, next, ...args) {
    return res.json(targetResult);
  }
}

module.exports = RequestHandler;
