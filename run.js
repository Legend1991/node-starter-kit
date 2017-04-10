'use strict';

const config = require('./config');
const LayerCollector = require('./layer-collector');

let server = LayerCollector.assemble(config.serverBuildScheme);
// server.run();