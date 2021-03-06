/**
*  Encapsulate the library.json format functionality
*  this converts the library.json file into useable file lists
*  for running tasks on.
*/
module.exports = function(grunt, options)
{	
	// Use underscore utilities
	var _ = require('lodash');

	// Filter an array of files and only return CSS and LESS files
	var isCSS = function(file){ return /\.(less|css)$/.test(file); };
	var isJS = function(file){ return /\.js$/.test(file); };

	// The name of the build file
	var filename = options.cwd + '/' + (options.buildFile || 'library.json');

	// Check for build file
	if (!grunt.file.exists(filename))
		grunt.fail.fatal('no ' + filename + ' file is found');

	// Load the build file which contains the list of 
	// library and game files to build
	var file = grunt.file.readJSON(filename);

	// Error checking for required fields and types
	if (_.isUndefined(file.name) || !_.isString(file.name)) 
		grunt.fail.fatal('"name" is a required field in ' + filename);

	if (_.isUndefined(file.description) || !_.isString(file.description))
		grunt.fail.fatal('"description" is a required field in ' + filename);

	if (_.isUndefined(file.output) || !_.isString(file.output))
		grunt.fail.fatal('"output" is a required field in ' + filename);

	if (_.isUndefined(file.version) || !_.isString(file.version)) 
		grunt.fail.fatal('"version" is a required field in ' + filename);

	if (_.isUndefined(file.main) || !_.isArray(file.main))
		grunt.fail.fatal('"main" is a required field in ' + filename);

	if (!_.isUndefined(file.mainDebug) && !_.isArray(file.mainDebug))
		grunt.fail.fatal('"mainDebug" needs to be an array in ' + filename);

	// The js list of files
	var main = _.filter(file.main, isJS);

	// Get the css files
	file.css = _.filter(file.main, isCSS);
	file.cssDebug = _.filter(file.mainDebug || file.main, isCSS);

	// Only populate main with JS files
	file.main = main;

	// Check for modules
	if (file.modules)
	{
		_.each(file.modules, function(module, name){
			
			// If the module is a list of files
			// then conform is to the more verbose format
			if (Array.isArray(module))
			{
				module = {
					output: name,
					main: module
				};
			}

			// Filter the list of files
			module.css = _.filter(module.main, isCSS);
			module.cssDebug = _.filter(module.mainDebug || module.main, isCSS);
			module.js = _.filter(module.main, isJS);
			module.jsDebug = _.filter(module.mainDebug || module.main, isJS);

			// Update module
			file.modules[name] = module;
		});
	}

	// Default to debug
	file.mainDebug = _.filter(file.mainDebug || file.main, isJS);

	// The library.json file to the output
	file.file = filename;

	return file;
};