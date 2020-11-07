module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		concat: {
			dist: {
				src: ["app/renderer/*.js", "!app/renderer/build/*.js"],
				dest: "app/assets/build/index.js"
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
						"app/assets/build/style.min.css": ["app/assets/css/renderer.css"]
					}
				]
			}
		},
		insert: {
			main: {
				src: "app/assets/build/style.min.css",
				dest: "<%= concat.dist.dest %>",
				match: /\/\/ RENDERER.CSS INSERT HERE ON BUILD \/\//
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks("grunt-contrib-uglify-es");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-insert");

	// Default task(s).
	grunt.registerTask("prod", ["concat", "uglify", "cssmin", "insert"]);
	grunt.registerTask("dev", ["concat", "cssmin", "insert"]);
};
