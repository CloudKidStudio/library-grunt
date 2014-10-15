module.exports = {
	development: {
		src: ['<%= distFolder %>/<%= build.output %>.js'],
		overwrite: true,
		replacements: [
			{ from: "DEBUG", to: "true" },
			{ from: "RELEASE", to: "false" },
			{ from: "VERSION", to: '"<%= build.version %>"'}
		]
	}
};