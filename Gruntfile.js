module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        clean: ["*.html", "dist/*"],

        concat: {
            options: {
                stripBanners: {
                    block: true,
                    line: true
                }
            },
            dist: {
                src: [
                    "bower_components/d3/d3.min.js",
                    "bower_components/jquery/dist/jquery.min.js",
                    "bower_components/require/build/require.min.js"
                ],
                dest: "dist/libs.js"
            }
        },

        jade: {
            compile: {
                files: {
                    "index.html" : ["templates/index.jade", "templates/index.layout.jade"]
                }
            }
        },

        uglify: {
            dist: {
                src: "js/index.js",
                dest: "dist/index.js"
            }
        },

        watch: {
            html: {
                files: ["*.jade", "*.layout.jade"],
                tasks: ["jade"]
            },

            scripts: {
                files: ["bower_components/**/*.min.js"],
                tasks: ["concat", "uglify"]
            }
        }
    })

    grunt.loadNpmTasks("grunt-contrib-clean")
    grunt.loadNpmTasks("grunt-contrib-concat")
    grunt.loadNpmTasks("grunt-contrib-jade")
    grunt.loadNpmTasks("grunt-contrib-uglify")
    grunt.loadNpmTasks("grunt-contrib-watch")

    grunt.registerTask("default", ["concat", "jade", "uglify"])
}
