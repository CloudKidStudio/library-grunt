module.exports = {
	release: {
		files: {
			'<%= distFolder %>/<%= build.output %>.min.js': '<%= build.main %>'
		},
		options: {
			compress: {
				global_defs: {
					"DEBUG": false,
					"RELEASE": true
				},
				dead_code: true
			},
			banner: '/*! <%= build.name %> <%= build.version %> */\n'
		}
	}
};