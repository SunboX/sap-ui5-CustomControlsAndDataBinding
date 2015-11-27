'use strict';

// url config
var urlConfig = {
    protocol: 'http',
    host: 'localhost',
    port: '8080',
    urlPath: '/sap-ui5-custom-list-item-control'
}

module.exports = function (grunt) {

    // load tasks from plugins
    grunt.loadNpmTasks('grunt-openui5');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // config
    grunt.initConfig({
        openui5_preload: {
            dev: {
                options: {
                    resources: {
                        cwd: 'www',
                        src: [
                            'app/**/*.js',
                            'app/!Component-preload.js'
                        ]
                    },
                    dest: 'www',
                    compress: true
                },
                components: true
            }
        },
        watch: {
            express: {
                files: [
                    'www/index.html',
                    'www/app/**/*.js',
                    'www/app/**/*.css'
                ],
                tasks: [
                    'openui5_preload:dev',
                    'express:dev'
                ],
                options: {
                    livereload: true
                }
            }
        },
        open: {
            dev: {
                path: urlConfig.protocol + '://' + urlConfig.host + ':' + urlConfig.port + urlConfig.urlPath
            }
        },
        express: {
            options: {
                // Override defaults here, see more at: https://npmjs.org/package/grunt-express-server
                args: [
					urlConfig.protocol,
					urlConfig.host,
					urlConfig.port,
					urlConfig.urlPath
				]
            },
            dev: {
                options: {
                    script: 'dev_server.js',
                    delay: 100
                }
            }
        }
    });

    // events
    grunt.event.on('watch', function (action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

    // tasks
    grunt.registerTask('server:dev', ['openui5_preload:dev', 'express:dev', 'open:dev', 'watch']);
    grunt.registerTask('server', ['server:dev']); // alias for "server:dev"
    grunt.registerTask('default', ['server:dev']); // default points to "server:dev" task

};