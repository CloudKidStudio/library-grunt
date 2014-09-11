module.exports = {
	development: {
		src: ['<%= distFolder %>/<%= build.output %>.js'],
		overwrite: true,
		replacements: [
			{ from: "DEBUG", to: "true" },
			{ from: "RELEASE", to: "false" },
			{ from: "${version}", to: "<%= build.version %>"}
		]
	},
	release : {
		src: ['<%= distFolder %>/<%= build.output %>.min.js'],
		overwrite: true,
		replacements: [
			{ from: "${version}", to: "<%= build.version %>"}
		]
	}
};