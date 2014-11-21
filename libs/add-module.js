/**
*  Dynamically add modules listed in the build file
*  @param {object} config The reference to the config object
*  @param {string} name The name of the module
*  @param {object} module The module object
*  @param {array} module.main The list of files in the module
*  @param {string} module.output The name of the outputfile
*/
module.exports = function(config, name, module)
{
	var _ = require('lodash');

	// The path to the files
	var main = '<%= build.modules.' + name + '.main %>';
	var css = '<%= build.modules.' + name + '.css %>';

	// The paths to output files
	var output = '<%= modulesPath %>/' + module.output + '.min.js';
	var outputCSS = '<%= modulesPath %>/' + module.output + '.css';
	var outputDebug = '<%= modulesPath %>/' + module.output + '.js';
	var outputSourceMap = '<%= modulesPath %>/' + module.output + '.js.map';

	// Add the replacement tasks
	config.replace[name] = {
		src: [outputDebug],
		overwrite: true,
		replacements: '<%= replace.development.replacements %>'
	};

	// Add jshint for modules files
	config.jshint.all.push(main);

	// Add uglify task
	config.uglify.release.files[output] = main;

	// Watch files
	config.watch.js.files.push(main);

	// Concat for the debug release
	config.concat[name] = {
		src: [main],
		dest: outputDebug
	};

	// Add files to clean
	config.clean.all.push(output, outputDebug, outputSourceMap);

	// If there's corresponding CSS for this module
	// then add the less task
	if (module.css.length)
	{
		// The list of files
		config.less.release.files[outputCSS] = css;
		config.clean.all.push(outputCSS);
	}
};