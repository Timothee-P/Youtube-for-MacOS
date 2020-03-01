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
					"<%= concat.dist.dest %>": ["<%= concat.dist.dest %>"]
				}
			}
		},
		cssmin: {
			target: {
				files: [
					{
						"app/renderer/build/style.min.css": ["app/css/style.css"]
					}
				]
			}
		},
		insert: {
			main: {
				src: "app/renderer/build/style.min.css",
				dest: "<%= concat.dist.dest %>",
				match: /\/\/ STYLE.CSS INSERT HERE ON BUILD \/\//
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks("grunt-contrib-uglify-es");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-insert");

	// Default task(s).
	grunt.registerTask("prod", ["concat", "uglify"]);
	grunt.registerTask("dev", ["concat", "cssmin", "insert"]);
};
