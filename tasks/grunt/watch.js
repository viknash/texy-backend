var utils = require('utils'),
    path = require('path'),
    getModulePaths = require(path.resolve(path.join(__dirname + '../../../lib/utils/', 'getModulePaths')))

module.exports = {
    tests: {
        tasks: ['mochaTest:ci'],
        files: ['lib/**/*.js', 'modules/**/*.js']
    },
    schema: {
        tasks: ['jsonlint', 'db'],
        files: [
      'schema/seedData.json',
      getModulePaths('schema', 'seedData.json')
    ]
    },
    docs: {
        tasks: ['jsdoc:docs'],
        files: ['./*.js', './lib/**/*.js'].concat(getModulePaths('**', '*.js'))
    }
};