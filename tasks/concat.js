module.exports = {
	options: {
		sourceMap: '<%= sourceMaps %>',
		banner: '/*! <%= build.name %> <%= build.version %> */\n'
	},
	development: {
		src: ['<%= build.mainDebug %>'],
		dest: '<%= distFolder %>/<%= build.output %>.js',
		nonull: true
	}
};
