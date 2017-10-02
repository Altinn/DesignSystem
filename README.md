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

If you are going to work on the design system, you'll need to install these packages too:
```shell
npm install -g gifsicle
npm install -g optipng-bin
npm install -g pngquant-bin
```

## Setup

Navigate to the root of the code and install the dependencies.  

```shell
cd DesignSystem
npm install
```

Also make sure the project in _styleguidekit-assets-altinn_ is built. This requires Ruby to be installed in order to install the [sass](http://sass-lang.com/install) gem. For Windows users, see [Ruby](https://rubyinstaller.org/)

```shell
cd styleguidekit-assets-altinn
gem install sass # run with sudo if you get an error
npm install
bower install
gulp
cd ..
```

## Run

This will take a couple of minutes...

```shell
npm start
```

The command will build and run the design system locally on <http://localhost:3000> and automatically rebuild if the source code is changed.
