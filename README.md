# Altinn Design System

This design system is based on [Pattern Lab](https://github.com/pattern-lab/edition-node-gulp/blob/master/README.md) code and [atomic design principles](http://bradfrost.com/blog/post/atomic-web-design/).
The [repo](https://github.com/Altinn/DesignSystem) contains the source code and configuration for building and running the design system locally and for creating distribution files.

You can always test the [live version](https://altinn.github.io/DesignSystem) of the latest build, or download the [altinn-designsystem](https://www.npmjs.com/package/altinn-designsystem) npm package.


## Dependencies

Make sure that [Node.js](https://nodejs.org) (version 6 or newer) is installed. The package manager [npm](https://www.npmjs.com/) will be included. 

You need npm version >5 to make use of the package-lock.json file. 

check version:
```shell
npm -v
```

Update npm:
 ```shell
 npm update -g npm
```

## Setup
```shell
git clone https://github.com/Altinn/DesignSystem.git
```

Navigate to the root of the code and run:
```shell
npm install
```

## Run

This will take a couple of minutes...

```shell
npm start
```

The command will build and run the design system locally on <http://localhost:3000> and automatically rebuild if the source code is changed.
