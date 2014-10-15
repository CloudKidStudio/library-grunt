module.exports = {
	compile: {
		name: '<%= build.name %>',
		description: '<%= build.description %>',
		version: '<%= build.version %>',
		url: '<%= build.url %>',
		options: {
			linkNatives: true,
			attributesEmit: true,
			helpers: ["<%= themePath %>/path.js"],
			paths: '<%= sourcePath %>',
			themedir: '<%= themePath %>',
			outdir: '<%= docsPath %>'
		}
	}
};