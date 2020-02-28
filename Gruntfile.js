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
					"app/renderer/build/index.js": ["<%= concat.dist.dest %>"]
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks("grunt-contrib-uglify-es");
	grunt.loadNpmTasks("grunt-contrib-concat");

	// Default task(s).
	grunt.registerTask("prod", ["concat", "uglify"]);
	grunt.registerTask("dev", ["concat"]);
};
