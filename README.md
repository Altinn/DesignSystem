# designsystem-styleguide

This repository contains the code for our "storefront" of the Design System. It is made  using Brad Frost's [Style Guide Guide](https://github.com/bradfrost/style-guide-guide). Altinn is using [Pattern Lab](https://github.com/pattern-lab/patternlab-node) to develop frontend-code for web components. You can find our Design System repository [here](https://github.com/Altinn/DesignSystem).

Pattern Lab serves as our "workshop" for frontend developers (based on atomic design), while the “Style Guide Guide” is our "storefront".

A gulp-task is exporting all the components from Pattern Lab to this storefront, and creates a better display of the final components.

## Setup
1. Download or clone the files.
2. In the command line, navigate to the root of the project and run the `jekyll serve` command. This will build the static site and watch for changes.
3. Visit `http://127.0.0.1:4000/` in your browser to see the style guide.

## Export Patterns from Pattern Lab
To import the latest components from Pattern Lab into the storefront, go to the repository “Designsystem” (Pattern Lab), run `gulp style-guide-export` in console. All the patterns will show up in “designsystem-styleguide” > “patterns”.

If you are going to include a new component, create a new md-file in the folder “components”. The new md-file must be updated with correct path to the pattern.
