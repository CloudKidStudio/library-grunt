module.exports = function(grunt, options)
{
	// The root plugin directory
	var _ = require('lodash'),
		path = require('path'),
		loader = require('load-grunt-config'),
		addModule = require(path.join(__dirname, 'add-module.js')),
		buildFile = require(path.join(__dirname, 'build-file.js'));
	
	// Default options to be an object
	options = options || {};

	// Path to the main library-grunt folder
	var pluginFolder = path.dirname(__dirname);

	// We need to load the local grunt plugins
	var libraryDir = process.cwd();
	process.chdir(pluginFolder);

	// Get the build file
	var build = buildFile(grunt, { cwd: libraryDir });

	// The deploy folder is the content that actually is for distribution
	var distFolder = options.distFolder || path.join(libraryDir, 'dist');

	// The path to the modules output folder
	var modulesPath = options.modulesPath || path.join(distFolder, 'modules');

	// The data arguments
	var data = _.extend({

			// The name of the library from the build file
			build: build,

			// The deploy folder is the content that actually is for distribution
			distFolder: distFolder,

			// The path to the theme
			themePath: options.themePath || '../CloudKidTheme',

			// The path to the docs output folder
			docsPath: options.docsPath || 'docs',

			// The path to the modules output folder
			modulesPath: modulesPath,

			// The source path
			sourcePath: options.sourcePath || 'src',

			// Path to the QUnit tests
			testPath: options.testPath || 'test',

			// Path to the examples folder
			examplesPath: options.examplesPath || 'examples',

			// Path to the bower components checkout (used for tests and examples)
			bowerPath: options.bowerPath || 'components',

			// If we should generate source maps
			sourceMaps: _.isUndefined(options.sourceMaps) ? false : options.sourceMaps,

			// Save the current working directory
			cwd: libraryDir
		},
		options.data || {}
	);
	
	// Separate grunt config files
	var baseConfig = loader(grunt, {
		
		// Path to tasks
		configPath: path.join(pluginFolder, 'tasks'),

		// project specific overrides
		overridePath: path.join(libraryDir, 'tasks/overrides'),

		// Don't auto init
		init: false,

		// Load the grunt tasks
		loadGruntTasks : { pattern: [ 'grunt-*' ] },

		// Data based into config
		data: data
	});

	// Change back to the library so we can loadNpmTasks locally
	process.chdir(libraryDir);

	// Project specific configuration
	var libraryConfig = loader(grunt,{

		// The path for the tasks
		configPath: path.join(libraryDir, options.tasksPath || 'tasks'),

		// Don't auto init
		init: false,

		// We don't want to reload builder
		loadGruntTasks:	{
			pattern: [ 'grunt-*' ]
		}, 

		// Add data options for project tasks
		data: data
	});

	// If we should called initConfig right away
	var autoInit = _.isUndefined(options.autoInit) ? true : !!options.autoInit;

	// Merge the configs
	var config = _.extend(baseConfig, libraryConfig);

	// Dynamically add the CSS
	if (build.css)
	{
		config.less.release.files['<%= distFolder %>/<%= build.output %>.min.css'] = 
			'<%= build.css %>';
	}

	if (build.cssDebug)
	{
		config.less.development.files['<%= distFolder %>/<%= build.output %>.css'] = 
			'<%= build.cssDebug %>';
	}
	
	// Process the modules
	if (build.modules)
	{
		_.each(build.modules, function(module, name){
			addModule(config, name, module);
		});
	}

	if (autoInit)
	{
		grunt.initConfig(config);
	}
	return config;
};