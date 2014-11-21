module.exports = {
	release: {
		files: {
			'<%= distFolder %>/<%= build.output %>.min.js': '<%= build.main %>'
		},
		options: {
			compress: {
				global_defs: {
					"DEBUG": false,
					"RELEASE": true,
					"VERSION": "<%= build.version %>"
				},
				dead_code: true
			},
			sourceMap: '<%= sourceMap %>',
			banner: '/*! <%= build.name %> <%= build.version %> */\n!function(){"use strict";',
			footer: '}();'
		}
	}
};