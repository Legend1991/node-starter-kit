'use strict';

const ExtendableError = require('es6-error');

class UnauthorizedError extends ExtendableError {

}

module.exports = UnauthorizedError;
