module.exports = {
    config: {
        servers: {
            tasks: ['watch:schema', 'nodemon:cluster'],
            options: {
                logConcurrentOutput: true
            }
        },
        debug: {
            tasks: ['exec:debugApp', 'node-inspector:app'],
            options: {
                logConcurrentOutput: true
            }
        },
        dummy: {}
    },
    register: function (grunt) {
        grunt.registerTask('server', ['concurrent:servers']);
        grunt.registerTask('server:debug', ['concurrent:debug']);
        grunt.registerTask('server:web', ['server']);
        grunt.registerTask('serve:debug', ['server:debug']);
        grunt.registerTask('serve', ['server:web']);
        if (process.env.NODE_ENV == undefined || process.env.NODE_ENV.toUpperCase() !== 'TEST') {
            grunt.registerTask('default', ['serve']);
        } else {
            grunt.registerTask('default', ['concurrent:dummy']);
        }
    }
};