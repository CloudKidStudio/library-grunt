module.exports = function(grunt, options)
{
	// The root plugin directory
	var path = require('path'),
		loader = require('load-grunt-config'),
		options = options || {};

	// We need to load the local grunt plugins
	var cwd = process.cwd();
	process.chdir(path.dirname(__dirname));
	
	// Separate grunt config files
	var config = loader(grunt, {
		
		// Path to tasks
		configPath: path.join(path.dirname(__dirname), 'tasks'),

		// project specific overrides
		overridePath: path.join(cwd, 'tasks/overrides'),

		// auto grunt.initConfig()
		init: typeof options.autoInit !== "undefined" ? options.autoInit : true,

		// Load the grunt tasks
		loadGruntTasks : { pattern: [ 'grunt-*' ] },

		// Data based into config
		data: {

			// The name of the library from the build file
			build: require(__dirname + '/build-file.js')(grunt, { cwd: cwd }),

			// The deploy folder is the content that actually is for distribution
			distFolder: path.join(cwd, 'dist'),

			// Save the current working directory
			cwd: cwd
		}
	});
	process.chdir(cwd);

	return config;
};
