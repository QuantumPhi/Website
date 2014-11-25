module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ['*.html', 'dist/*'],

        jade: {
            index: {
                files: {
                    'index.html' : ['templates/index.jade']
                }
            }
        },

        uglify: {
            options: {
                preserveComments: false
            },

            main: {
                src: 'js/index.js',
                dest: 'dist/index.min.js'
            },
        },

        watch: {
            html: {
                files: ['templates/*.jade', 'templates/*.layout.jade'],
                tasks: ['jade']
            },

            scripts: {
                files: ['js/index.js'],
                tasks: ['uglify:main']
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-jade')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-watch')

    grunt.registerTask('default', ['jade', 'uglify'])
}
