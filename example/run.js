'use strict';

const config = require('./../src/config');
const LayerCollector = require('./../src/layer-collector');

let server = LayerCollector.assemble(config.serverBuildScheme);
// server.run();