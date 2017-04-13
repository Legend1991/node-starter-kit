'use strict';

const {Router} = require('express');

const RequestHandler = require('./request-handler');
const ForbiddenError = require('../errors/forbidden-error');
const UnauthorizedError = require('../errors/unauthorized-error');

class RestServer {
  constructor(config, ...args) {
      this.init(config, args);
  }

  init(config, sources) {
      let server = this.buildServer();
      let apiRouter = this.buildApiRouter(config.apiScheme, sources);
      this.configureServer(server, apiRouter);
      this.runServer(server, config.runConfig);
  }

  buildServer() {
      return express();
  }

  configureServer(server, apiRouter) {
      server.use(morgan('dev'));
      server.use(bodyParser.urlencoded({extended: true}));
      server.use(bodyParser.json({limit: '100mb'}));
      server.use(compression({threshold: 0}));
      server.use(express.static(path.resolve('./frontend/public/')));
      server.engine('html', consolidate['swig']);
      server.set('view engine', 'html');
      server.set('views', path.resolve('./frontend/src/'));
      server.use('/', apiRouter);
      server.use((error, req, res, next) => {
          let err = {
              message: error.toString()
          };

          if (error.name === 'ValidationError') {
              err = {
                  message: error.name,
                  errors:  error.errors
              }
          } else {
              console.error('Error: ', error);
          }

          res.status(500).json(err);
      });
  }

  runServer(server, runConfig) {
      server.listen(runConfig.port, () => console.log('Server started on port: ', runConfig.port));
  }

  buildApiRouter(apiScheme, sources) {
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
