var debug = require('debug')('cleverstack:utils');
debug.log = console.log.bind(console);
debug.log("Parsing utils");

module.exports = require('./magicModule')('utils');