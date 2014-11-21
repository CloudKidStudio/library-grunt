module.exports = {
	release: {
		options: {
			banner: '/*! <%= build.name %> <%= build.version %> */',
			sourceMap: '<%= sourceMaps %>',
			cleancss: true
		},
		files: {}
	}
};