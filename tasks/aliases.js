module.exports = function(grunt)
{
	grunt.registerTask(
		'default', 
		'Default task to build all the library in minified concat modes', [
			'clean:all',
			'build-dev', 
			'build'
		]
	);

	grunt.registerTask(
		'build',
		'Build the library in release mode', [
			'jshint',
			'uglify:release',
			'sync-version'
		]
	);

	grunt.registerTask(
		'build-dev',
		'Build the library in dev mode', [
			'jshint',
			'concat:development',
			'replace:development'
		]
	);

	grunt.registerTask(
		'dev',
		'Development mode to build the library',
		['watch']
	);

	grunt.registerTask(
		'clean-all',
		'Remove all build files',
		['clean:all']
	);

	grunt.registerTask(
		'docs',
		'Auto generate the documentation', [
			'clean:docs',
			'yuidoc'
		]
	);

	grunt.registerTask(
		'docs-live',
		'Generate documentation and push to gh-pages branch', [
			'clean:docs',
			'yuidoc',
			'gh-pages'
		]
	);

	grunt.registerTask(
		'sync-version',
		'Update the bower file with the build version',
		function()
		{	
			// Get the paths and files
			var bowerPath = process.cwd() + '/bower.json',
				bower = grunt.file.readJSON(bowerPath),
				build = grunt.file.readJSON(process.cwd() + '/build.json');

			// Update the bower output
			bower.main = 'dist/' + build.output + '.min.js';

			// Update the bower version
			bower.version = build.version;

			// Write the bower file
			grunt.file.write(bowerPath, JSON.stringify(bower, null, "\t"));
		}
	);
};