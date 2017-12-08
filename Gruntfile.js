

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks 
    paths = {
        "bootstrap": "bower_components/bootstrap/"

    }
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            gruntConfigFiles: {
                files: ['Gruntfile.js', 'config/*.js'],
                options: {
                    reload: true
                }
            },
            configFiles: {
                files: ['package.json', 'bower.json'],
                tasks: ['auto_install'],
                options: {
                    reload: true
                }
            },
            scripts: {
                files: ['source/js/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: 'source/scss/*.scss',
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            }
        },
        copy: {
            main: {
                expand: true,
                flatten: true,
//                filter: 'isFile',
                src: ["bower_components/bootstrap/dist/js/*"],
                dest: 'js/'
            },
            test: {
                expand: true,
                src: 'Gruntfile.js',
                dest: 'js/'
            },
            samplecode: {
                files: [
                    // includes files within path 
//                    {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},

                    // includes files within path and its sub-directories 
//                    {expand: true, src: ['path/**'], dest: 'dest/'},

                    // makes all src relative to cwd 
//                    {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

                    // flattens results to a single level 
//                    {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
                ]
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'css/bootstrap.css': 'source/scss/bootstrap.scss'
                }
            }
        },
//        uglify: {
//            options: {
//                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//            },
//            build: {
//                src: 'src/<%= pkg.name %>.js',
//                dest: 'build/<%= pkg.name %>.min.js'
//            }
//        },

//        shell: {
//            options: {
//                stderr: false
//            },
//            target: {
//                command: 'ls'
//            },
//            another: 'ls ./src' // shorthand 
//        },
        auto_install: {
            subdir: {
                options: {
                    cwd: '',
                    stderr: true,
                    failOnError: true,
                    npm: '--production',
                    bower: '--production'
                }
            }
        }
    });

    //grunt npm & bower auto install
//    grunt.loadNpmTasks('grunt-auto-install');

    // Load the plugin that provides the "uglify" task.
//    grunt.loadNpmTasks('grunt-contrib-uglify');



    // Default task(s).
//    grunt.registerTask('cmd param', ['task1 name', 'task2 name']);
    grunt.registerTask('default', ['auto_install','copy','sass', 'watch']);
    grunt.registerTask('c', ['copy']);
    grunt.registerTask('setup', ['auto_install', "copy", 'sass']);
//    grunt.registerTask('shellcommands', ['shell']);
//    grunt.registerTask('alloptions', ['auto_install', 'uglify']);

    grunt.log.write(paths.bootstrap + 'js/*');
};