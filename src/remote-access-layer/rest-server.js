'use strict';

const {Router} = require('express');

const RequestHandler = require('./request-handler');
const ForbiddenError = require('../errors/forbidden-error');
const UnauthorizedError = require('../errors/unauthorized-error');

class RestServer {
  constructor(serverConfig, ...args) {

  }

  buildApiRoute(apiScheme, sources) {
    let apiRouter = Router();

      sources.forEach((source) => {
        let requestHandler = new RequestHandler(source);
        let sourceType = requestHandler.getSourceType();
        let sourceApiScheme = apiScheme[sourceType];

        if (sourceApiScheme) {
          for (let methodName of Object.keys(sourceApiScheme)) {
            if (typeof requestHandler[methodName] === 'function') {
                let sourceRouter = Router();
                let methodScheme = sourceApiScheme[methodName];

                sourceRouter[methodScheme.method](methodScheme.path, requestHandler[methodName]);

                apiRouter.use('/api', sourceRouter);
            }
          }
        }
      });

      return apiRouter;
  }
}

module.exports = RestServer;
