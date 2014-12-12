/**
*  Dynamically add modules listed in the build file
*  @param {object} config The reference to the config object
*  @param {string} name The name of the module
*  @param {object} module The module object
*  @param {array} module.js The list of JS files in the module
*  @param {array} module.css The list of CSS files in the module
*  @param {string} module.output The name of the outputfile
*/
module.exports = function(config, name, module)
{
	var _ = require('lodash');

	// If there's correspond JS for this module, then add the 
	// javascript tasks
	if (module.js.length)
	{
		// The Grunt property for the js files
		var js = '<%= build.modules.' + name + '.js %>';
		var jsDebug = '<%= build.modules.' + name + '.jsDebug %>';

		// The paths to output js files
		var jsFile = '<%= modulesPath %>/' + module.output + '.min.js';
		var jsDebugFile = '<%= modulesPath %>/' + module.output + '.js';
		var sourceMapFile = '<%= modulesPath %>/' + module.output + '.js.map';

		// Add the replacement tasks
		config.replace[name] = {
			src: [jsDebugFile],
			overwrite: true,
			replacements: '<%= replace.development.replacements %>'
		};

		// Add jshint for modules files
		config.jshint.all.push(js);

		// Add uglify task
		config.uglify.release.files[jsFile] = js;

		// Watch files
		config.watch.js.files.push(js);

		// Concat for the debug release
		config.concat[name] = {
			src: [jsDebug],
			dest: jsDebugFile
		};

		// Add files to clean
		config.clean.all.push(jsFile, jsDebugFile, sourceMapFile);
	}

	// If there's corresponding CSS for this module
	// then add the less task
	if (module.css.length)
	{
		// The Grunt property for the CSS files
		var css = '<%= build.modules.' + name + '.css %>';
		var cssDebug = '<%= build.modules.' + name + '.cssDebug %>';

		// The path to output the CSS
		var cssFile = '<%= modulesPath %>/' + module.output + '.min.css';
		var cssDebugFile = '<%= modulesPath %>/' + module.output + '.css';

		// Add to the list of tasks
		config.less.release.files[cssFile] = css;
		config.less.development.files[cssDebugFile] = cssDebug;
		config.clean.all.push(cssFile);
		config.clean.all.push(cssDebugFile);
	}
};