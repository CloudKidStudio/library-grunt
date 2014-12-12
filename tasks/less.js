module.exports = {
	release: {
		options: {
			banner: '/*! <%= build.name %> <%= build.version %> */',
			sourceMap: '<%= sourceMaps %>',
			cleancss: true
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