'use strict';

const path = require('path');

class LayerCollector {
  static assemble(buildScheme) {
    return LayerCollector.getInstance(buildScheme, buildScheme.type, buildScheme.injections);
  }

  static getInstance(buildScheme, type, injections, tailArgs) {
    if (!injections) {
      injections = tailArgs;
      tailArgs = null;
    }

    if (typeof type === 'string') {
      if (buildScheme.types[type]) {
        let resultType = require(path.resolve(buildScheme.types[type]));
        let resultArgs = Array.isArray(injections) ?
          LayerCollector.getArguments(buildScheme, injections, tailArgs) :
          [];

        return new resultType(...resultArgs);
      } else if (buildScheme.compositions[type]) {
        return LayerCollector.getInstance(buildScheme,
          buildScheme.compositions[type].type, buildScheme.compositions[type].injections, injections);
      } else if (buildScheme.configs[type]) {
        return require(path.resolve(buildScheme.configs[type]));
      }
    } else if (typeof type === 'object') {
      return LayerCollector.getInstance(buildScheme, type.type, type.injections, injections);
    }

    throw new Error('Unknown type: ' + type);
  }

  static getArguments(buildScheme, args, tailArgs) {
    return args.map((arg) => {
      return LayerCollector.getInstance(buildScheme, arg, tailArgs);
    });
  }
}

module.exports = LayerCollector;
