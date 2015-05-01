var path = require('path'),
    appRoot = path.resolve(path.join(__dirname, '..', '..')),
    utilsPath = path.resolve(path.join(appRoot, 'lib', 'utils'));

module.exports = require(utilsPath).magicModule('exceptions');


/*
var path = require('path'),
    appRoot = path.resolve(path.join(__dirname, '..', '..')),
    utilsPath = path.resolve(path.join(appRoot, 'lib', 'utils')),
    requireDir = require('require-dir');

requireDir(utilsPath);
console.log(utilsPath);
module.exports = magicModule('exceptions');
*/