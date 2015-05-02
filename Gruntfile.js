var path = require('path'),
    fs = require('fs'),
    packageJson = require(__dirname + '/package.json'),
    merge = require('deepmerge'),
    registerFuncs = [],
    gruntConfig = {};

/**
 * Helper function to load grunt task configuration objects and register tasks
 * @param  {String} taskNames the names of the tasks you want to load
 */
function loadGruntConfigs(taskNames, skipTasks) {
    rootPath = __dirname;

    taskNames.forEach(function (taskName) {
        var skip = false;
        if (skipTasks != undefined) {
            for (var i = 0; i < skipTasks.length; i++) {
                if (taskName === skipTasks[i] + ".js") {
                    skip = true;
                    break;
                }
            }
        }
        if (!skip) {
            var gruntTask = require(path.resolve(path.join(rootPath, 'tasks', 'grunt', taskName))),
                hasRegister = gruntTask.config && gruntTask.register,
                taskConfig = {};

            // Extend the main grunt config with this tasks config
            taskConfig[taskName.replace('.js', '')] = !!hasRegister ? gruntTask.config : gruntTask;
            gruntConfig = merge(gruntConfig, taskConfig);

            // Allow registration of grunt tasks
            if (!!hasRegister) {
                registerFuncs.push(gruntTask.register);
            }
        }
    });
}

module.exports = function (grunt) {
    //Create modules directory if it does not exist
    grunt.file.mkdir(__dirname + "/modules/");

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var utils = require(path.join(__dirname, 'lib', 'utils'));
    var helpers = utils.helpers;
    var config = require(path.join(__dirname, 'config'));

    // Clean and set the NODE_PATH for magic modules
    process.env.NODE_PATH = helpers.nodePath();


    // Load the grunt task config files
    loadGruntConfigs(helpers.getFilesForFolder(path.resolve(path.join(__dirname, 'tasks', 'grunt'))));

    // Load all modules Gruntfiles.js
    utils.getModulePaths().forEach(function (modulePath) {

        // Allow modules to use new style of task loading/registering
        loadGruntConfigs(helpers.getFilesForFolder(path.join(__dirname, modulePath, 'tasks', 'grunt')), path.join(__dirname, modulePath));

        // Support the modules having their own Gruntfile.js
        var moduleGruntfile = [__dirname, modulePath, 'Gruntfile.js'].join(path.sep);
        if (fs.existsSync(moduleGruntfile)) {
            var gruntfile = require(moduleGruntfile)(grunt);

            // Merge (deep) the grunt config objects
            gruntConfig = merge(gruntConfig, gruntfile[0]);

            // Add the register function to our callbacks
            registerFuncs.push(gruntfile[1]);
        }
    });

    // Initialize the config
    grunt.initConfig(gruntConfig);

    // Fire the callbacks and allow the modules to register their tasks
    registerFuncs.forEach(function (registerTasks) {
        registerTasks(grunt);
    });
};