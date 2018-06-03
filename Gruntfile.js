module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        wiredep: {
            task: {
                src: [
                    'src/index.html'
                ]
            }
        },
        sass: {
            dist: {
                files: {
                    'src/css/main.css': 'src/sass/main.sass'
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('compilesass', function () {
        grunt.task.run('sass');
        grunt.file.copy('src/sass/main.sass', 'src/css/main.css');
    });

    grunt.loadNpmTasks('grunt-wiredep');

    grunt.registerTask('default', ['wiredep']);

};