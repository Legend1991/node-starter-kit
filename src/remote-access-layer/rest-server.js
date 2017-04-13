'use strict';

const {Router} = require('express');

const CallInterceptor = require('../call-interceptor');
const ForbiddenError = require('../errors/forbidden-error');
const UnauthorizedError = require('../errors/unauthorized-error');

class RestServer {
  constructor(serverConfig, ...args) {

  }

  buildApiRoute(apiScheme, sources) {
    let apiRouter = Router();

      sources.forEach((source) => {
        let sourceType = new CallInterceptor(source).getSourceType();
        let sourceApiScheme = apiScheme[sourceType];

        if (sourceApiScheme) {
          for (let methodName of Object.keys(sourceApiScheme)) {
            if (typeof source[methodName] === 'function') {
                let sourceRouter = Router();
                let methodScheme = sourceApiScheme[methodName];

                sourceRouter[methodScheme.method](methodScheme.path, source[methodName]);

                apiRouter.use('/api', sourceRouter);
            }
          }
        }
      });

      return apiRouter;
  }
}

module.exports = RestServer;