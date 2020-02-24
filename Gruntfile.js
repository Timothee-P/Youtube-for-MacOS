module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		concat: {
			dist: {
				src: ["app/renderer/*.js", "!app/renderer/build/*.js"],
				dest: "app/renderer/build/index.js"
			}
		},
		uglify: {
			dist: {
				files: {
					"app/renderer/build/index.min.js": ["<%= concat.dist.dest %>"]
				}
			}
		},
		jshint: {
			files: ["app/renderer/*.js", "!app/renderer/build/*.js"],
			options: {
				esversion: 6
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks("grunt-contrib-uglify-es");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-concat");

	// Default task(s).
	grunt.registerTask("default", ["jshint", "concat", "uglify"]);
};
