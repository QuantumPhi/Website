module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        clean: ["*.html", "dist/*"],

        copy: {
            main: {
                expand: true,
                flatten: true,
                src: ["bower_components/require/build/require.min.js"],
                dest: "dist/"
            }
        },

        jade: {
            compile: {
                files: {
                    "index.html" : ["templates/index.jade"]
                }
            }
        },

        uglify: {
            dist: {
                src: "js/index.js",
                dest: "dist/index.min.js"
            }
        },

        watch: {
            html: {
                files: ["templates/*.jade", "templates/*.layout.jade"],
                tasks: ["jade"]
            },

            scripts: {
                files: ["js/index.js"],
                tasks: ["uglify"]
            }
        }
    })

    grunt.loadNpmTasks("grunt-contrib-clean")
    grunt.loadNpmTasks("grunt-contrib-copy")
    grunt.loadNpmTasks("grunt-contrib-jade")
    grunt.loadNpmTasks("grunt-contrib-uglify")
    grunt.loadNpmTasks("grunt-contrib-watch")

    grunt.registerTask("default", ["copy", "jade", "uglify"])
}
