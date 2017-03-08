# Altinn Design System

This design system is based on [Pattern Lab](https://github.com/pattern-lab/edition-node-gulp/blob/master/README.md) code and [atomic design principles](http://bradfrost.com/blog/post/atomic-web-design/).
The [repo](https://github.com/Altinn/DesignSystem) contains the source code and configuration for building and running the design system locally and for creating distribution files.

You can always test the [live version](https://altinn.github.io/DesignSystem) of the latest build, or download the [altinn-designsystem](https://www.npmjs.com/package/altinn-designsystem) npm package.


## Dependencies

Make sure that [Node.js](https://nodejs.org) (version 6 or newer) is installed. The package manager [npm](https://www.npmjs.com/) will be included.

Install [bower](https://bower.io/) and [gulp](http://gulpjs.com/):

```shell
npm install -g bower
npm install -g gulpjs/gulp-cli
```

## Setup

Navigate to the root of the code and run `npm install`.  
Also make sure the project in _styleguidekit-assets-altinn_ is built:

```shell
cd styleguidekit-assets-altinn
npm install
bower install
gulp
cd ..
```

## Run

This will take a couple of minutes...

```shell
gulp patternlab:serve
```

The command will build and run the design system locally on <http://localhost:3000> and automatically rebuild if the source code is changed.
