'use strict';

const Joi = require('joi');
const joiBuilder = require('joi-json').builder();

const CallInterceptor = require('../call-interceptor');

class InputDataChecker extends CallInterceptor {
  constructor(source, validationScheme) {
    super(source);
    this.validationScheme = validationScheme;
  }

  before(methodName, ...args) {
    let sourceType = this.getSourceType();

    if (this.validationScheme[sourceType] && this.validationScheme[sourceType][methodName]) {
      this.checkInputData(this.validationScheme[sourceType][methodName], args);
    }
  }

  checkInputData(argsValidationScheme, ...args) {
    Object.keys(argsValidationScheme).forEach((key, index) => {
        const schema = joiBuilder.build(argsValidationScheme[key]);
        const result = Joi.validate(args[index], schema);

        if (!result.error) {
          throw new TypeError(result.error.message);
        }
    });
  }
}

module.exports = InputDataChecker;
