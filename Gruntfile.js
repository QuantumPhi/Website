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

        shell: {
            'gh-pages': {
                command: [
                    'git checkout gh-pages',
                    'git rebase master',
                    'grunt',
                    'git add -A',
                    'git commit -m \"grunt:gh-pages\"',
                    'git push origin gh-pages',
                    'git checkout master'
                ].join(' && ')
            },

            'serve': {
                command: [
                    'git checkout gh-pages',
                    'git rebase master',
                    'grunt',
                    'jekyll serve'
                ].join(' && ')
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

            libs: {
                files: grunt.file.expandMapping(['bower_components/**/*.js'], 'dist/', {
                    flatten: true,
                    rename: function(destBase, destPath) {
                        return destBase + destPath.replace('.js', '.min.js')
                    }
                })
            }
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
    grunt.loadNpmTasks('grunt-shell')

    grunt.registerTask('default' , ['jade', 'uglify'])
    grunt.registerTask('gh-pages', ['shell:gh-pages'])
    grunt.registerTask('serve'   , ['shell:serve'])
}
