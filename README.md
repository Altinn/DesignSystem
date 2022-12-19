# Altinn Design System

⚠️⚠️⚠️ _**DEPRECATED**_ ⚠️⚠️⚠️  
**The [design system v2](https://github.com/Altinn/altinn-design-system) ([npm](https://www.npmjs.com/package/@altinn/altinn-design-system)) supersedes this project. Consider moving your project to rely on the newer design system instead of this one.**

<hr>

This design system is based on [Pattern Lab](https://patternlab.io/) code and [atomic design principles](http://bradfrost.com/blog/post/atomic-web-design/).
The [repo](https://github.com/Altinn/DesignSystem) contains the source code and configuration for building and running the design system locally and for creating distribution files.

You can always test the [live version](https://altinn.github.io/DesignSystem) of the latest build, or download the [altinn-designsystem](https://www.npmjs.com/package/altinn-designsystem) npm package.


## Dependencies

Make sure that [Node.js](https://nodejs.org) (version 14 or newer) is installed. The package manager [npm](https://www.npmjs.com/) will be included.

## Setup
```shell
git clone https://github.com/Altinn/DesignSystem.git
```

Navigate to the root of the code and run:
```shell
npm install
```

## Run

The design system is divided into three projects: Altinn.no (Infoportal and Portal), Altinn Digital and common.

To run the design system for altinn.no

```shell
npm run start:altinn
```

To run the design system for Altinn Digital

```shell
npm run start:altinndigital
```

To run the design system for components that are common to all projects

```shell
npm run start:common
```

The command will build and run the design system locally on <http://127.0.0.1:3000> and automatically rebuild if the source code is changed.

## Distribution

The /dist folder contains css, javascript, fonts and images for distribution via the [npm package](https://www.npmjs.com/package/altinn-designsystem).

To update the /dist folder

```shell
npm run dist
```

## GitHub pages

To update the [live version](https://altinn.github.io/DesignSystem/) of the design system

```shell
npm run update:gh-pages
```
then commit and push the changes to git.

## Source code

The source code is structured as follows:

###/_patternlab
PatternLab specific files: patterns, meta, data and config.

Each project has its own folder. Common components should only be changed in the /common folder, where they will automatically be copied to all other projects. Changes to common components anywhere else will be automatically overwritten.

###/css
Changes to css should be made in the scss files under /css/scss. The css files will be automatically updated.

###/fonts

###/images

###/js
JavaScript files are divided into /production and /prototype and bundled automatically. To add new files to a bundle update the config under /scripts/build-config.json