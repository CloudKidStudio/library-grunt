#!/usr/bin/env node

// The root library folder
var base = "../../";
var fs = require('fs');

/**
*  Create a directory if it doesn't exist
*  @method scaffoldDir
*  @param {String} dir The directory path to create
*/
function scaffoldDir(dir)
{
	if (!fs.existsSync(base + dir))
	{
		fs.mkdirSync(base + dir);
		console.log("  " + dir + " ... added");
	}
}

/**
*  Create a file if it doesn't exist
*  @method create
*  @param {String} file The file path
*  @param {String|Object} content The default content for file
*  @param {function} callback The callback function when done
*/
function scaffold(file, content, callback)
{
	fs.exists(base + file, function(exists){
		if (!exists)
		{
			if (!content && !fs.existsSync("scaffold/" + file))
			{
				throw "File doesn't exist " + "'scaffold/" + file + "'";
			}
			fs.writeFile(base + file, content || fs.readFileSync("scaffold/" + file), function(){
				console.log("  " + file + " ... added");
				if (callback) callback(base + file);
			});
		}
	});
}

// Only scaffold the project if no Gruntfile is available
scaffold("Gruntfile.js", null, function(file){
	
	// Create the required folders
	scaffoldDir("src"); 
	scaffoldDir("dist"); 

	// Copy the required files
	scaffold("build.json");
	scaffold("bower.json");
	scaffold("package.json");
	scaffold("src/main.js");
	scaffold(".gitignore", "node_modules\ndocs");

	// Add a build the build file to let the post
	fs.writeFileSync('.buildFile', file);
});
