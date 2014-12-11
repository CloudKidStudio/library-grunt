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

		// The paths to output js files
		var outputJS = '<%= modulesPath %>/' + module.output + '.min.js';
		var outputJSDebug = '<%= modulesPath %>/' + module.output + '.js';
		var outputSourceMap = '<%= modulesPath %>/' + module.output + '.js.map';

		// Add the replacement tasks
		config.replace[name] = {
			src: [outputJSDebug],
			overwrite: true,
			replacements: '<%= replace.development.replacements %>'
		};

		// Add jshint for modules files
		config.jshint.all.push(js);

		// Add uglify task
		config.uglify.release.files[outputJS] = js;

		// Watch files
		config.watch.js.files.push(js);

		// Concat for the debug release
		config.concat[name] = {
			src: [js],
			dest: outputJSDebug
		};

		// Add files to clean
		config.clean.all.push(outputJS, outputJSDebug, outputSourceMap);
	}

	// If there's corresponding CSS for this module
	// then add the less task
	if (module.css.length)
	{
		// The Grunt property for the CSS files
		var css = '<%= build.modules.' + name + '.css %>';

		// The path to output the CSS
		var outputCSS = '<%= modulesPath %>/' + module.output + '.css';

		// The list of files
		config.less.release.files[outputCSS] = css;
		config.clean.all.push(outputCSS);
	}
};