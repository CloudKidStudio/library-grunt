module.exports = {

	// Remove all the build files
	all: [
		'<%= distFolder %>/*.js',
		'<%= distFolder %>/*.map'
	],

	// Clean the documentation
	docs: ['<%= docsPath %>']
};