/**
*  Encapsulate the build.json format functionality
*  this converts the build.json file into useable file lists
*  for running tasks on.
*/
module.exports = function(grunt, options)
{	
	// Use underscore utilities
	var _ = require('underscore-contrib');

	// The name of the build file
	var filename = options.cwd + '/' + (options.buildFile || 'build.json');

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

	// The build.json file to the output
	file.file = filename;

	return file;
};