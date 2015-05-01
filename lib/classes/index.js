var path = require('path'),
    appRoot = path.resolve(path.join(__dirname, '..', '..')),
    utilsPath = path.resolve(path.join(appRoot, 'lib', 'utils'));

module.exports = require(utilsPath).magicModule('classes');