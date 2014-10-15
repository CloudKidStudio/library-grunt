module.exports = {
	options: {
		reload: true,
		atBegin: true
	},
	js: {
		files: [
			'Gruntfile.js',
			'<%= build.main %>',
			'<%= build.file %>'
		],
		tasks: ['build-dev']
	}
};