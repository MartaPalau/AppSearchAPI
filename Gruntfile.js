module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        wiredep: {
            task: {
                src: [
                    'src/index.html'
                ]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-wiredep');

    // Default task(s).
    grunt.registerTask('default', ['wiredep']);

};