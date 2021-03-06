'use strict'

const CallInterceptor = require('../call-interceptor')
// const ForbiddenError = require('../errors/forbidden-error')
// const UnauthorizedError = require('../errors/unauthorized-error')

class RequestHandler extends CallInterceptor {
  async _before (methodName, req, res, next) {
    let args = []

    args = args.concat(Object.values(req.params || {}))
    args = args.concat(Object.values(req.query || {}))

    req.body && args.push(req.body)

    return args
  }

  async _after (methodName, targetResult, req, res, next, ...args) {
    return res.json(targetResult)
  }
}

module.exports = RequestHandler
