# Library Grunt [![Dependency Status](https://david-dm.org/CloudKidStudio/library-grunt.svg)](https://david-dm.org/CloudKidStudio/library-grunt) [![Build Status](https://travis-ci.org/CloudKidStudio/library-grunt.svg)](https://travis-ci.org/CloudKidStudio/library-grunt) [![npm version](https://badge.fury.io/js/library-grunt.svg)](http://badge.fury.io/js/library-grunt)

Library Grunt is a Node plugin which provides initial project scaffolding and common build tasks for creating JavaScript libraries. The plugin requires [Grunt](http://gruntjs.com/) to be installed on the local system in order to build. 

## Requirements

There are a couple of tools that you'll need to install before we can create our project. Please make sure the following items are available on your machine:

* Install [Node JS](http://nodejs.org/)
* Install [Grunt](http://gruntjs.com/getting-started) `npm install -g grunt-cli`

## Getting Started

### 1. Create Project

Start by creating an empty project folder and changing the working directory to that folder.

```shell
mkdir MyProject && cd MyProject
```

### 2. Install Plugin

The installation of the plugin requires installing Grunt first and then the plugin. This will create an empty project template structure which you can start to customize.

```shell
npm install grunt library-grunt
```

### 3. Scaffolding Project

Create the initial project scaffolding needed to setup a project.

```shell
npm run-script library-grunt scaffold
```

### 4. Change Project Information

Edit the **build.json** file to update the project name, output file name, URL, description and list of files.

## Adding Dependencies

Library Grunt is designed to easily include define dependencies for your library.

Modify the **bower.json** file to include additional libraries into your project. For more information about using Bower please visit the [website](http://bower.io). For instance, if you wanted to include [CreateJS](http://createjs.com), **bower.json** might look like this. Note that the _version_ and _main_ fields are updated automatically from the **build.json**, no need to change these manually.

```js
{
	"name": "MyLibrary",
	"version": "1.0.0",
	"main": "dist/my-library.min.js",
	"dependencies": {
		"jquery" : "~1",
		"normalize-css" : "*",
		"EaselJS" : "*",
		"TweenJS" : "*",
		"PreloadJS" : "*",
		"SoundJS" : "*"
	}
}
```

Then, update **build.json** to list the files you'd like to include from the libraries.

```js
{
	"name" : "MyLibrary",
	"version" : "1.0.0",
	"description": "My library does this",
	"output" : "my-library"
	"main" : [
		"src/main.js"
	]
}
```

## Grunt Tasks

These are the list of grunt tasks for building the project.

Task | Description
---|---
**default** | Builds the minified and combined versions of the library
**build** | Release build of the library
**build-dev** | Build the combined version of the library
**dev** | This watches source files and auto-rebuilds whenever there's a change
**clean-all** | Delete all generated build files and delete components directory
**docs** | Generate the documentation (recommended theme [CloudKidTheme](http://github.com/CloudKidStudio/CloudKidTheme)
**docs-live** | Generate the documentation and commit it to _gh-pages_ branch of this the current Git repository
**sync-version** | Automatically updates the version and main fields in **bower.json**

## Build File

The **build.json** file contains the list of all required JavaScript files in order to build the project. Below describes the different fields of this file.

Property | Type | Description
---|---|---
**name** | string | The name of the project or game 
**version** | string | The [semantic versioning](http://semver.org/) number
**description** | string | Used for generating the documentation
**output** | string | The base output file name for the library
**url** | string | The URL homepage for the library, used by the documentation
**main** | array | The list of files to use to build the library. Note: the order of the files is how the output is built.
**mainDebug** _(optional)_ | array | The same as `main` except that this file list is only used when building in `dev` task.

## Conditional Compiling

The main JavaScript source building supports conditional compiling with global constants. These constants can be use to specify an inline block of code that should be use for development or release builds of the library. The booleans `DEBUG` and `RELEASE` are supported. 

### Example

```js
if (DEBUG)
{
	// This code is only visible when built using the 'dev' task
	alert('Debug code here!');
}

if (RELEASE)
{
	// This code is only visible when built using the 'default' task
}
```

## Project Structure

Structure | Description
--- | ---
**./dist/** | Contains the distribution builds of the library
**./node_modules/** | The Node plugins required for the build process; this directory should be ignored by the versioning system
**./src/** | The source JavaScript needed to build the library
**./bower.json** | The list of Bower dependencies
**./build.json** | See above, the list of source files to build and meta information about the project
**./Gruntfile.js** | Contains the Grunt automation tasks
**./package.json** | The list of Node dependencies

## Plugin Options

The Library Grunt plugin can accept additional options. Here's an example to add additional arguments:

```js
module.exports = function(grunt)
{
	var config = require('library-grunt')(grunt, {
		autoInit : false
	});

	grunt.initConfig(config);
};
```

### options.autoInit

A _boolean_ defaults to true. If grunt.initConfig() is automatically called. 

### options.themePath

_string_ defaults to "../CloudKidTheme" The path to the YUI docs theme.

### options.docsPath

_string_ defaults to "docs" The path to the docs output folder.

### options.sourcePath

_string_ defaults to "src" The path to the source file for documentation.

### options.sourceMaps

_boolean_ defaults to false Generate sourcemaps for the built libraries.
