module.exports = {
	release: {
		options: {
			banner: '/*! <%= build.name %> <%= build.version %> */',
			sourceMap: '<%= sourceMaps %>',
			compress: true
		},
		files: {}
	},
	development: {
		options: {
			banner: '/*! <%= build.name %> <%= build.version %> */'
		},
		files: {}
	}
};