# Your Fort Awesome Kit

You've downloaded the kit named altinn.no. Included are all the files
you need to use your kit on the web or as you're designing.

- - -

## How this Zip is organized

What's included?

### README.md

*You are here*

### demo.html

Gives an example of your icons and typefaces in action!

### icons/

Directory containing anything related to your kits icons.

### icons/svgs

Directory containing SVG versions of all of your icons.

### images/original

Directory containing the original images that you uploaded to Fort Awesome.

### images/optimized

Directory containing the optimized, smaller images that are based off of the original.

### css/

Directory containing CSS that references your icons and typefaces.

### css/less

Convenient Less mixins and variables.

### css/scss

Convenient SASS mixins and variables.

### css/ie-only.css

CSS that references the icons.eot font file (this is useful if you need to
support older versions of Internet Explorer 8 or below)

### css/embedded.css

CSS that includes the WOFF version of your icons and typefaces embedded using
data URIs and base64 encoding. By using this file the browser will not have
to make additional requests to your server to get the individual font files. The
only downside is that you can't use alternative font formats like EOT.

### css/external.css

CSS that includes all formats (including EOT for Internet Explorer) referenced as
additional requests the browser can make.

### typefaces/

Individual woff files representing your optimized typefaces. These files only
include the character sets that you requested.

- - -

## How to use these files

### In a Web Project
Fort Awesome tries to be as friendly to the directory structures and front end asset workflows you prefer as possible. With that said, here are some simple steps to get started using them:

1. Move the icons (icons/) and typefaces (/typefaces) you want to use into your project's directory structure.
2. Then move the CSS files (/css) you need (read above for descriptions of what each file contains) into your project's directory structure.
3. Double-check that the paths to your icons and typefaces are still correct (given where you've moved things to). Adjust the paths as needed.

See our How-to article for a deeper walkthrough - https://articles.fortawesome.com/how-to-serve-fort-awesome-assets-yourself-5419b88ee2d4

### On the Desktop
Using your operating system's font management app (e.g. Font Book in Mac OSX), you can install the font version of your icons. Import/open either the icons.otf or icons.ttf file. Remember to activate your newly imported font as well.

Alternatively, you can find SVG versions of each icon in icons/svg. These can be opened and edited using your favorite graphics editor (Illustrator, Sketch, etc.).

See our How-to article for a deeper walkthrough - https://articles.fortawesome.com/how-to-fort-awesome-assets-on-the-desktop-e3fd15df6f43
