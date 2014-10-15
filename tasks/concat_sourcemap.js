module.exports = {
	options: {
		sourcesContent: true
	},
	development: {
		files: {
			'<%= distFolder %>/<%= build.output %>.js' : ['<%= build.mainDebug %>']
		}
	}
};
