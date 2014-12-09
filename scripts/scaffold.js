#!/usr/bin/env node

// Include modules
var fs = require('fs'),
	path = require('path'),
	prompt = require('prompt'),
	_ = require('lodash'),
	base = path.resolve(__dirname, '..', '..', '..'),
	bowerFile = path.join(base, 'bower.json'),
	packageFile = path.join(base, 'package.json'),
	buildFile = path.join(base, 'build.json');

// The root project folder
var scaffoldBase = path.join(__dirname, '..', 'scaffold');

/**
*  Create a directory if it doesn't exist. 
*  We use the synchronous API because async was failing after a certain # of folders
*  @method scaffoldDir
*  @param {String} dir The directory path to create
*/
function scaffoldDir(dir)
{
	var target = path.join(base, dir);
	if (!fs.existsSync(target))
	{
		fs.mkdirSync(target);
		console.log("  " + dir + " ... added");
	}
}

/**
*  Create a file if it doesn't exist
*  @method create
*  @param {String} file The file path
*  @param {String|Object} [srcFile=null] The default content for file
*  @param {function} callback The callback function when done
*/
function scaffold(targetFile, srcFile, callback)
{
	srcFile = srcFile || targetFile;
	var source = path.join(scaffoldBase, srcFile);
	var target = path.join(base, targetFile);

	if (!fs.existsSync(target))
	{
		if (!fs.existsSync(source))
		{
			throw "Source file doesn't exist '" + source + "'";
		}
		fs.writeFileSync(target, fs.readFileSync(source));
		console.log("  " + targetFile + " ... added");
		if (callback) callback(target);
	}
}

/**
*  Do a default grunt build
*  @method gruntDefault
*/
function gruntRun()
{
	var isWindows = process.platform === 'win32';
	var spawn = require('child_process').spawn;
	var grunt = isWindows ?
		spawn(process.env.comspec, ['/c', 'grunt'], { cwd: base }):
		spawn('grunt', [], { cwd: base });

	grunt.stdout.on('data', function (data) {
		process.stdout.write(data);
	});

	grunt.stderr.on('data', function (data) {
		process.stdout.write(data);
	});

	grunt.on('error', function(err){
		console.log("Grunt run error", err);
	});
}

/**
*  Write a JSON file
*  @method  writeJSON
*  @param  {string} file Path to a file
*  @param  {object} obj  JSON object to encode
*/
function writeJSON(file, obj)
{
	fs.writeFileSync(file, JSON.stringify(obj, null, "\t"));
}

// Only scaffold the project if no Gruntfile is available
scaffold("Gruntfile.js", null, function(file){
	
	// Create the required folders
	scaffoldDir("src"); 
	scaffoldDir("dist");
	scaffoldDir("test");
	scaffoldDir("examples");

	// Copy the required files
	scaffold("build.json");
	scaffold("bower.json");
	scaffold("package.json");
	scaffold(".travis.yml", "travis.yml");
	scaffold("src/main.js");
	scaffold("test/index.html");
	scaffold(".gitignore", "gitignore");

	prompt.start();
	prompt.get([{
			name : 'name',
			description: 'The human-readable name of the library',
			required: true
		}, {
			name: 'description',
			description: 'A description of the library',
			required: true
		}, {
			name : 'version',
			description: 'The starting version of the library',
			default: '0.0.1',
			pattern: /^\d+\.\d+(\.\d+)?$/,
			message: "Version must be in the format #.#.#",
			required: true
		}, {
			name : 'output',
			description: 'The output file name (e.g., my-library)',
			default: '',
			required: true
		}, {
			name : 'url',
			description: 'The URL homepage for this library',
			required: false
		}
	], function(err, result){
		if (!err)
		{
			// Get the build file as an object
			var build = JSON.parse(fs.readFileSync(buildFile));
			writeJSON(buildFile, _.extend(build, result));

			// Get the bower file as an object
			var bower = JSON.parse(fs.readFileSync(bowerFile));
			bower.name = result.name;
			bower.version = result.version;
			bower.main = 'dist/'+result.output+'.min.js';
			writeJSON(bowerFile, bower);

			var pack = JSON.parse(fs.readFileSync(packageFile));
			pack.version = result.version;
			writeJSON(packageFile, pack);
		}
		// Build the library
		gruntRun();
	});
});