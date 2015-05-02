var utils = require(__dirname + '../../../lib/utils/'),
    path = require('path'),
    getModulePaths = require(path.resolve(path.join(__dirname + '../../../lib/utils/', 'getModulePaths')))

module.exports = {
    options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        ignores: [
      './modules/**/test*/**/*.js'
    ]
    },
    all: [
    './Gruntfile.js',
    './app.js',
    './cluster.js',
    './lib/**/*.js',
    './modules/**/*.js',
    './tasks/**/*.js',
    './schema/**/*.js',
    getModulePaths('*.js')
  ]
};