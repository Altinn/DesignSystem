# gulp-remove-html
Remove HTML code when the html files go into production.
## Usage

First, install `gulp-remove-html` as a development dependency:

```shell
npm install --save-dev gulp-remove-html
```

Then, add it to your `gulpfile.js`:

```javascript
var gulp = require('gulp');
var gulpRemoveHtml = require('gulp-remove-html');

gulp.task('build-prod', function () {
  return gulp.src('files/index.html')
    .pipe(gulpRemoveHtml())
    .pipe(gulp.dest('dist/views'));
});
```
In your html file surround the code you want removed with the `<!--<Deject>-->` tag.
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <p>
      Important content!!!
    </p>
    <!--<Deject>-->
        <p>Shouldn't be here!!!!!</p>
    <!--</Deject>-->
  </body>
</html>
```

## Options
- `dejectPatternRegex`

      Pass in a new regex expression to override `<!--<Deject>-->`
- `keyword`

      Pass in a new keyword to override `Deject`. ie `<!--<RemoveWhatIsBetweenThisTags-->`

## Changelog

#####1.0.0
- initial release

#####1.0.2
- added tests

#####1.1.0
- supports the deject tag being used more than once

#####1.2.0
- regex pattern is now configurable
