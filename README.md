## Om Altinn Designsystem

Designsystemet er bygget med [Pattern Lab](http://patternlab.io/). Dette repositoriet inneholder source-mappen, gulp configurations, og en config-fil. 

### Prerequisites

Make sure Node and npm are installed. A great guide can be found here: [https://docs.npmjs.com/getting-started/installing-node](https://docs.npmjs.com/getting-started/installing-node)

### Download 

* Download the [latest release of patternlab-node](https://github.com/pattern-lab/patternlab-node/releases/latest) from Github
* Via npm, run `npm install patternlab-node` (Note this will auto install the grunt version currently. see below)
* **NOTE** Node version 4.X and 5.X have tentative support, citing [a lot of Windows issues](https://github.com/nodejs/node-gyp/issues/629), including [mine](https://github.com/pattern-lab/patternlab-node/issues/162). Upgrade node at your own risk until otherwise stated. I've tried to catalog some issues and troubleshooting steps on the [wiki](https://github.com/pattern-lab/patternlab-node/wiki/Windows-Issues).

### Getting Started - Gulp

To run patternlab-node using gulp, you need to swap out the default grunt configuration. Do the following in the directory you downloaded and extracted the zipped release:

1. Rename `package.json` to `package.grunt.json` or delete it if you don't intend on going back
2. Rename `package.gulp.json` to `package.json`
3. Run `npm install` from the command line
4. Run `gulp` or `gulp serve` from the command line

This creates all patterns, the styleguide, and the pattern lab site. It's strongly recommended to run `gulp serve` to have BrowserSync spin up and serve the files to you.

### Upgrading

You can find instructions on how to upgrade from version to version of Pattern Lab Node here: [https://github.com/pattern-lab/patternlab-node/wiki/Upgrading](https://github.com/pattern-lab/patternlab-node/wiki/Upgrading)
 