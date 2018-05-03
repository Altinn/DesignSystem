# Custom Output Plugin for Pattern Lab Node

**NOTE: :boom: Plugin support is currently in alpha (Pattern Lab 2.6.0)**

The Custom Output Plugin allows Pattern Lab Node to generate customized markup snippet files. The plugin adds support for additional keys in the metadata of components, allowing for custom modification of output, as well as (TODO) automatically maintaining dependency-graph based versioning across all components.

## Installation

To add the Custom Output Plugin to your project using [npm](http://npmjs.com/):

    npm install git+https://github.com/MikaeI/plugin-node-custom-output.git

Or add it directly to your project's `package.json` file and run `npm install`.

## Usage

### Overview

The plugin will look for the following metadata keys in a component's Markdown file: `prepend`, `append` (strings of text or markup) and `version` (string). If omitted, fallback values for these are just empty strings.


Example:

    prepend: This markup will be <b>prepended</b> to the outputted custom file
    append: This markup will be <b>appended</b> to the outputted custom file
    version: 4.8.15


Upon build, the plugin will process the metadata and generate markup files in the `public/patterns` folder. They will contain any prepended/appended markup. File names are prefixed with: `custom-`, and suffixed with the version number.

### TODO: Auto-versioning

TODO: The plugin should enable the bumping of a component's version number to "bubble up" in the dependency tree. How do we accomplish this?
