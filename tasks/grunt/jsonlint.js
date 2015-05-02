var utils = require(__dirname + '../../../lib/utils/'),
    path = require('path'),
    getModulePaths = require(path.resolve(path.join(__dirname + '../../../lib/utils/', 'getModulePaths')))

module.exports = {
    all: {
        src: ['./schema/seedData.json'].concat(getModulePaths('schema', 'seedData.json'), ['./package.json'])
    }
};