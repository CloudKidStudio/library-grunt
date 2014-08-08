module.exports = function(grunt) {

	// The root plugin directory
	var path = require('path');

	// We need to load the local grunt plugins
	var cwd = process.cwd();
	process.chdir(path.dirname(__dirname));
	
	// Separate grunt config files
	require('load-grunt-config')(grunt, {
		
		// Path to tasks
		configPath: path.join(__dirname, 'tasks'),

		// auto grunt.initConfig()
		init: true,

		// Data based into config
		data: {

			// The name of the library from the build file
			build: require(__dirname + '/build-file.js')(grunt, { cwd: cwd }),

			// The deploy folder is the content that actually is for distribution
			distFolder: path.join(cwd, '/dist'), 

			// Save the current working directory
			cwd: cwd
		}
	});
	process.chdir(cwd);
};
