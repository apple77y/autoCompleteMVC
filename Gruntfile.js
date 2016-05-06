module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');
    var buildname = pkg.name + '-' + pkg.version;

    grunt.initConfig({
        pkg: pkg,
        buildname: buildname,
        watch: {
            scripts: {
                files: 'src/**/*.js',
                tasks: ['default']
            }
        },
        jshint: {
            all: [
                'src/js/*.js'
            ],
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: '.jshintrc'
            }
        },
        clean: {
            src: ['static/*.js', 'static/*.map']
        },
        jsdoc: {
            dist: {
                src: ['README.md'],
                options: {
                    template: "node_modules/jaguarjs-jsdoc",
                    encoding: "utf8",
                    destination: "doc",
                    recurse: true,
                    private: true,
                    configure: 'jsdoc.conf.json'
                }
            }
        },
        concat: {
            dist: {
                src: [
                    'src/namespace.js',
                    'src/**/*.js'
                ],
                dest: 'static/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
        uglify: {
            options: {
                sourceMap: true,
                sourceMapName: 'static/sourcemap.map'
            },
            dist: {
                files: {
                    'static/<%= pkg.name %>-<%= pkg.version %>.min.js': [
                        'static/<%= pkg.name %>-<%= pkg.version %>.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', [
        'jshint', 'jsdoc', 'clean', 'concat', 'uglify'
    ]);
};
