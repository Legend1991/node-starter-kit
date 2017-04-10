'use strict';

const fs = require('fs');

/**
 * Component that finds and loads a config file
 * @class
 */
class Config {
  /**
   * Load config file. Loaded from app/config.js or from path provided by CONFIG environment variable
   */
  load() {
    let configPath = `${process.cwd()}/config.json`;

    if (fs.existsSync(configPath)) {
      return require(configPath);
    }

    throw new Error('Config file was not found');
  }
}

module.exports = new Config().load();