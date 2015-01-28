module.exports = function(grunt)
{
	grunt.registerTask(
		'default', 
		'Default task to build all the library in minified concat modes', [
			'clean:all',
			'build-debug', 
			'build'
		]
	);

	grunt.registerTask(
		'build',
		'Build the library in release mode', [
			'jshint',
			'uglify',
			'less'
		]
	);

	grunt.registerTask(
		'build-debug',
		'Build the library in dev mode', [
			'jshint',
			'concat',
			'replace'
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
		'test', 
		'Run the unit tests', [
			'bower-install-simple:dev', 
			'qunit'
		]
	);

	grunt.registerTask(
		'test-live',
		'Run the unit tests in the browser', [
			'bower-install-simple:dev', 
			'connect:test'
		]
	);

	grunt.registerTask(
		'examples',
		'Install bower libraries', [
			'bower-install-simple:dev', 
			'connect:examples'
		]
	);
};