var browserSync = require('browser-sync').create();
var fs = require('fs');
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var gulp_concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var gulp_rename = require('gulp-rename');
var purify = require('gulp-purifycss');
var pjson = require('./package.json');
var sass = require('gulp-sass');
var version = pjson.version;
var argv = require('minimist')(process.argv.slice(2));
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var buildConfig = require('./config/gulp/config');
var config = require('./patternlab-config.json');
var patternlab = require('patternlab-node')(config);
var htmltidy = require('gulp-htmltidy');

var path = require('path');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var chalk = require('chalk');
var copy = require('gulp-copy');
var rename = require('gulp-rename');
var regexRename = require('gulp-regex-rename');
var gulpRemoveHtml = require('gulp-remove-html');
var replace = require('gulp-string-replace');
var unzip = require('gulp-unzip');

function paths () { return config.paths }

// tasks for deleting files in build-folders
gulp.task('pl-clean:dist', function() {
  return del([
    'dist/**/*',
  ]);
});

gulp.task('pl-clean:public', function() {
  return del([
    'public/*', '!public/fonts', '!public/patternlab-components'
  ]);
});

// Copy data files from source into public folder:
gulp.task('pl-copy:data', function () {
  return gulp.src('source/data/*.json')
    .pipe(gulp.dest(paths().public.root + '/data'));
});

// Copy jQuery distribution from installed package into public JS folder:
gulp.task('pl-copy:jq', function () {
  return gulp.src('node_modules/jquery/dist/jquery.min.js')
  .pipe(gulp.dest(paths().public.js))
});

// Copy image files from source into public images folder:
gulp.task('pl-copy:img', function () {
  return gulp.src(
    ['**/*.gif', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
    { cwd: paths().source.images }
  ).pipe(gulp.dest(paths().public.images));
});

// Copy favicon file from source into public folder:
gulp.task('pl-copy:favicon', function() {
  return gulp.src('favicon.ico', { cwd: paths().source.root })
    .pipe(gulp.dest(paths().public.root));
});

// Create flat designsystem CSS file and put into public CSS folder:
gulp.task('pl-copy:css', function(done) {
  buildConfig.production.forEach(function(element) {
    console.log('element: ', element)
    return gulp.src(paths().source.css + element.scssFilename + '.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    // We will add this line after removing most of the unused css.
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    // .pipe(purify(['./public/**/*.js', './public/**/*.html']))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths().public.css))
    .pipe(browserSync.stream());
  });
  done();
});

// Copy Styleguide distribution folder from installed package into public
// styleguide folder:
gulp.task('pl-copy:styleguide', function() {
  return gulp.src(paths().source.styleguide + '**/*')
    .pipe(gulp.dest(paths().public.root))
    .pipe(browserSync.stream()).on('end', function() {
      gulp.src('./source/images/lab5.png')
        .pipe(gulp.dest('./public/styleguide/images'))
    });
});

// Unzip fortawesone iconfonts and put them in the correct folder for the npm package
gulp.task('pl-copy:distribution-fonts', function(done){
  gulp.src("./source/fortAwesome/kit-altinn-no-ed31cded.zip")
    .pipe(unzip())
    .pipe(gulp.dest('./dist/fonts/icons/ai/'))

  gulp.src("./source/fortAwesome/kit-altinn-reg-no-df832575.zip")
    .pipe(unzip())
    .pipe(gulp.dest('./dist/fonts/icons/reg/'))
  done();
});

// Create flat distribution CSS file (no Patternlab CSS or styleguide UI CSS)
// and copy into distribution folder:
gulp.task('pl-copy:distribution-css', function(done) {
  buildConfig.production.forEach(function(element) {
    console.log('element: ', element)
  fs.readFile('./source/css/' + element.scssFilename + '.scss', 'utf-8',
    function(err, custom) {
      if (err) {
        console.log(err);
      }

      var src = custom.replace('@import "scss/episerver/profile-presentation";',
        '// Automatically removed');
      src = src.replace('@import "scss/episerver/episerver";',
        '// Automatically removed');
      fs.writeFileSync('./source/css/' + element.scssFilename + '-temp.scss', src);
      gulp.src(paths().source.css + element.scssFilename + '-temp.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp_rename(element.scssFilename + '.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(cleanCSS())
        .pipe(gulp_rename(element.scssFilename + '.min.css'))
        .pipe(gulp.dest('dist/css'));
        del('./source/css/' + element.scssFilename + '-temp.scss');
      done();
    }
  );
  });
});

// Create distribution CSS file for EPI and copy into distribution folder:
gulp.task('pl-copy:distribution-epi', function(done) {;
  fs.readFile('./source/css/scss/episerver/_episerver.scss', 'utf-8',
    function(err, src) {
      if (err) {
        console.log(err);
      }
      fs.writeFileSync('./source/css/scss/episerver/epi-temp.scss', src);
      gulp.src(paths().source.epi + 'epi-temp.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp_rename('epi.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(cleanCSS())
        .pipe(gulp_rename('epi.min.css'))
        .pipe(gulp.dest('dist/css'));
      done();
    }
    // TODO: Delete epi-temp.scss from source folder.
  );
});

// Create distribution CSS file for "Profilmanual" and copy into distribution folder:
gulp.task('pl-copy:distribution-profile', function(done) {
  fs.readFile('./source/css/scss/episerver/_profile-presentation.scss', 'utf-8',
    function(err, src) {
      if (err) {
        console.log(err);
      }
      fs.writeFileSync('./source/css/scss/episerver/profile-temp.scss', src);
      gulp.src(paths().source.epi + 'profile-temp.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp_rename('profile.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(cleanCSS())
        .pipe(gulp_rename('profile.min.css'))
        .pipe(gulp.dest('dist/css'));
      done();
    }
    // TODO: Delete profile-temp.scss from source folder. Again, Ivar????
  );
});

// Create distribution JS (bundles all JS resources for production, except for
// jQuery) and copy into distribution folder:
gulp.task('pl-copy:distribution-infoportal-js', function() {
  return gulp.src(buildConfig.infoportal.jsFiles.files)
    .pipe(gulp_concat('concat.js'))
    .pipe(gulp_rename(buildConfig.infoportal.jsFiles.filename))
    .pipe(gulp.dest('dist/js'));
});

// Create distribution JS (bundles all JS resources for production, except for
// jQuery) and copy into distribution folder:
gulp.task('pl-copy:distribution-infoportal-vendor-js', function() {
  return gulp.src(buildConfig.infoportal.vendorJsFiles.files)
    .pipe(gulp_concat('concat.js'))
    .pipe(gulp_rename(buildConfig.infoportal.vendorJsFiles.filename))
    .pipe(gulp.dest('dist/js'));
});

// Create vendor distibution for Portal. Custom js will be in a different file
gulp.task('pl-copy:distribution-portal-vendor-js', function() {
  return gulp.src(buildConfig.portal.vendorJsFiles.files)
    .pipe(gulp_concat('concat.js'))
    .pipe(gulp_rename(buildConfig.portal.vendorJsFiles.filename))
    .pipe(gulp.dest('dist/js'));
});

// Create custom js distibution for Portal.
gulp.task('pl-copy:distribution-portal-js', function() {
  return gulp.src(buildConfig.portal.jsFiles.files)
    .pipe(sourcemaps.init())
    .pipe(gulp_concat('concat.js'))
    .pipe(gulp_rename(buildConfig.portal.jsFiles.filename))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/js'));
});

// Flatten development JS and copy into public JS folder:
gulp.task('pl-copy:designsystemdev-js', function() {
  return gulp.src(buildConfig.altinnDev.jsFiles.files)
    .pipe(gulp_concat('concat.js')).pipe(gulp_rename(buildConfig.altinnDev.jsFiles.filename))
    .pipe(gulp.dest('public/js'));
});

// Flatten development JS and copy into public JS folder:
gulp.task('pl-copy:designsystemdev-vendor-js', function() {
  return gulp.src(buildConfig.altinnDev.vendorJsFiles.files)
    .pipe(gulp_concat('concat.js')).pipe(gulp_rename(buildConfig.altinnDev.vendorJsFiles.filename))
    .pipe(gulp.dest('public/js'));
});

// Create custom js distibution for Portal.
gulp.task('pl-copy:distribution-patterns', function() {
  return gulp.src('public/patterns/**')
    .pipe(gulp.dest('dist/patterns'));
});

// Copy the images folder
gulp.task('pl-copy:distribution-images', function() {
  return gulp.src('public/images/**')
    .pipe(gulp.dest('dist/images'));
});

// Create custom js distibution for Portal.
gulp.task('pl-copy:distribution-portal-js-modules', function() {
  return gulp.src(buildConfig.portal.jsFiles.files)
    .pipe(gulp.dest('dist/js/modules'));
});

function getConfiguredCleanOption () {
  return config.cleanPublic
}

function build (done) {
  patternlab.build(done, getConfiguredCleanOption());
}

gulp.task('pl-assets', gulp.series(
  gulp.parallel(
    'pl-copy:designsystemdev-js',
    'pl-copy:designsystemdev-vendor-js'
  ),
    function(done) {
      done();
    }
  )
);

// See quick ref for Tidy params: http://api.html-tidy.org/tidy/quickref_5.4.0.html
gulp.task('tidy-fragments', function() {
  return gulp.src([paths().public.patterns + '**/*markup-only.html'])
    .pipe(htmltidy({
      dropEmptyElements: false,
      dropProprietaryAttributes: false,
      forceOutput: true,
      hideComments: true,
      indent: true,
      indentSpaces: 2,
      mergeDivs: false,
      mergeEmphasis: false,
      mergeSpans: false,
      outputHtml: true,
      preserveEntities: true,
      showBodyOnly: true,
      strictTagsAttributes: false,
      tidyMark: false,
      verticalSpace: true,
      wrap: 260}))
    .pipe(gulp.dest(paths().public.patterns));
});

gulp.task('tidy-pages', function() {
  return gulp.src([paths().public.root + '**/*.html', '!' + paths().public.root + '**/*markup-only.html'])
    .pipe(htmltidy({
      doctype: 'html5',
      dropEmptyElements: false,
      dropProprietaryAttributes: false,
      forceOutput: true,
      hideComments: true,
      indent: true,
      indentSpaces: 2,
      mergeDivs: false,
      mergeEmphasis: false,
      mergeSpans: false,
      outputHtml: true,
      preserveEntities: true,
      showBodyOnly: false,
      strictTagsAttributes: false,
      tidyMark: false,
      verticalSpace: false,
      wrap: 260}))
    .pipe(gulp.dest(paths().public.root));
});

gulp.task('patternlab:version', function(done) {
  patternlab.version();
  done();
});

gulp.task('patternlab:help', function(done) {
  patternlab.help();
  done();
});

gulp.task('patternlab:patternsonly', function(done) {
  patternlab.patternsonly(done, getConfiguredCleanOption());
});

gulp.task('patternlab:liststarterkits', function(done) {
  patternlab.liststarterkits();
  done();
});

gulp.task('patternlab:loadstarterkit', function(done) {
  patternlab.loadstarterkit(argv.kit, argv.clean);
  done();
});

gulp.task('patternlab:build', gulp.series('pl-assets', build, function(done) {
  done();
}));

gulp.task('patternlab:prebuild',
  gulp.series(
    'pl-copy:jq',
    'pl-copy:img',
    'pl-copy:favicon',
    'pl-copy:css',
    'pl-copy:styleguide',
    'pl-copy:data',
    function(done) { done(); }
  )
);

function getSupportedTemplateExtensions () {
  var engines =
    require('./node_modules/patternlab-node/core/lib/pattern_engines');
  return engines.getSupportedFileExtensions();
}

function getTemplateWatches (projectFolders) {
  var templateWatches = [];
  getSupportedTemplateExtensions().forEach(function(dotExtension) {
    if(projectFolders && projectFolders.length > 0) {
      templateWatches = templateWatches.concat(projectFolders.map(function(folder) {
        return paths().source.patterns + folder + '/**/*' + dotExtension;
      }));
    } else {
      templateWatches.push(paths().source.patterns + '**/*' + dotExtension);
    }
  });
  console.log(templateWatches);
  return templateWatches;
}

function reload () {
  browserSync.reload();
}

function watch () {
  gulp.watch(paths().source.css + '**/*.scss', { awaitWriteFinish: true })
    .on('change', gulp.series('pl-copy:css', reload));
  gulp.watch(paths().source.styleguide + '**/*.*', { awaitWriteFinish: true })
    .on('change', gulp.series('pl-copy:styleguide', reload));
  gulp.watch([paths().source.js + 'production/**/*.js', paths().source.js + 'development/**/*.js'])
    .on('change', gulp.series('pl-copy:designsystemdev-js', reload));
  // gulp.watch(paths().source.js + 'development/**/*.js')
  //   .on('change', gulp.series('pl-copy:distribution-js', 'pl-copy:distribution-vendor-portal-js','pl-copy:distribution-portal-js', 'pl-copy:designsystemdev-js', reload));

  var patternWatches = [
    paths().source.patterns + '**/*.json',
    paths().source.patterns + '**/*.md',
    paths().source.data + '*.json',
    paths().source.images + '/*',
    paths().source.meta + '*',
    paths().source.annotations + '/*'
  ].concat(getTemplateWatches());

  gulp.watch(patternWatches, { awaitWriteFinish: true }).on('change', gulp.series(build, reload));
}

var commonPatternPaths = [
  paths().source.patterns + '00-atomer/**/*.json',
  paths().source.patterns + '00-atomer/**/*.md',
  paths().source.patterns + '01-molekyler/**/*.json',
  paths().source.patterns + '01-molekyler/**/*.md',
  paths().source.patterns + '02-organismer/**/*.json',
  paths().source.patterns + '02-organismer/**/*.md'
];

function watchProject (projectName) {
  gulp.watch(paths().source.css + '**/*.scss', { awaitWriteFinish: true })
    .on('change', gulp.series('pl-copy:css', reload));
  gulp.watch(paths().source.styleguide + '**/*.*', { awaitWriteFinish: true })
    .on('change', gulp.series('pl-copy:styleguide', reload));
  gulp.watch([paths().source.js + 'production/**/*.js', paths().source.js + 'development/**/*.js'])
    .on('change', gulp.series('pl-copy:designsystemdev-js', reload));
  // gulp.watch(paths().source.js + 'development/**/*.js')
  //   .on('change', gulp.series('pl-copy:distribution-js', 'pl-copy:distribution-vendor-portal-js','pl-copy:distribution-portal-js', 'pl-copy:designsystemdev-js', reload));

  var patternWatches = commonPatternPaths.concat([
    paths().source.patterns + '03-maler-' + projectName + '/**/*.json',
    paths().source.patterns + '03-maler-' + projectName + '/**/*.md',
    paths().source.patterns + '04-sider-' + projectName + '/**/*.json',
    paths().source.patterns + '04-sider-' + projectName + '/**/*.md',
    paths().source.data + '*.json',
    paths().source.images + '*',
    paths().source.meta + '*'
  ]).concat(getTemplateWatches(['03-maler-' + projectName, '04-sider-' + projectName]));

  gulp.watch(patternWatches, { awaitWriteFinish: true }).on('change', gulp.series(build, reload));
}

gulp.task('patternlab:connect', gulp.series(function(done) {
  browserSync.init({
    server: { baseDir: paths().public.root },
    snippetOptions: { blacklist: ['/index.html', '/', '/?*'] },
    notify: {
      styles: [
        'display: none', 'padding: 15px', 'font-family: sans-serif',
        'position: fixed', 'font-size: 1em', 'z-index: 9999', 'bottom: 0px',
        'right: 0px', 'border-top-left-radius: 5px',
        'background-color: #1B2032', 'opacity: 0.4', 'margin: 0',
        'color: white', 'text-align: center'
      ]
    }
  }, function() { console.log('PATTERN LAB NODE WATCHING FOR CHANGES') });
  done();
}));

gulp.task('patternlab:watch', gulp.series('patternlab:build', watch));

function serve(projectName) {
  return gulp.series(
    'pl-clean:public',
    'patternlab:prebuild',
    'patternlab:build',
    /*gulp.parallel(
      'tidy-pages',
      'tidy-fragments'
    ),*/
    'patternlab:connect',
    projectName === 'all' ? watch : function() { watchProject(projectName) }
  )
}

gulp.task('patternlab:serve-all', serve('all'));
gulp.task('patternlab:serve-altinnett', serve('altinnett'));
gulp.task('patternlab:serve-infoportal', serve('infoportal'));
gulp.task('patternlab:serve-portal', serve('portal'));

gulp.task('dist',
  gulp.series(
    'pl-clean:dist',
    'patternlab:prebuild',
    'patternlab:build',
    'pl-copy:distribution-fonts',
    'pl-copy:distribution-css',
    'pl-copy:distribution-images',
    'pl-copy:distribution-epi',
    'pl-copy:distribution-profile',
    'pl-copy:distribution-patterns',
    'pl-copy:distribution-portal-js',
    'pl-copy:distribution-portal-vendor-js',
    'pl-copy:distribution-infoportal-js',
    'pl-copy:distribution-infoportal-vendor-js',
    'pl-copy:distribution-portal-js-modules'
  )
);
gulp.task('default', gulp.series('patternlab:serve-all'));

/******************************************************
 * COPY TASKS - stream assets from source to destination
******************************************************/

// This is the task that exports the results from Pattern Lab
// into the Jekyll style guide that lives outside of this repository
gulp.task('copy:export-to-styleguide', function(done) {

  // Export public/patterns directory to style guide's includes
  // This is used to include the actual code into the code samples
  gulp.src(['public/patterns/**/*', '!public/patterns/**/*.rendered.html'])
    .pipe(regexRename(/♺-/g, ''))
    .pipe(regexRename(/atomer/g, 'atoms'))
    .pipe(regexRename(/molekyler/g, 'molecules'))
    .pipe(regexRename(/organismer/g, 'organisms'))
    .pipe(replace('<body class=""', '<body class="a-bgWhite p-1"'))
    .pipe(gulp.dest('../designsystem-styleguide/_includes/patterns'));

    // Export public/patterns directory to style guide patterns directory
    // This is used to pipe the live patterns into the iframe
  gulp.src(['public/patterns/**/*.html'])
    .pipe(rename(function(path) {
      path.basename += '.rendered';
      path.extname = '.html';
    }))
  .pipe(regexRename(/♺-/g, ''))
  .pipe(regexRename(/atomer/g, 'atoms'))
  .pipe(regexRename(/molekyler/g, 'molecules'))
  .pipe(regexRename(/organismer/g, 'organisms'))
  .pipe(replace('<body class=""', '<body class="a-bgWhite p-1"'))
  .pipe(gulp.dest('../designsystem-styleguide/patterns'));

  // Export css directory to style guide css directory
  gulp.src('public/css/**/*')
  .pipe(gulp.dest('../designsystem-styleguide/css'));

  // Export js directory to style guide js directory
  gulp.src('public/js/**/*')
  .pipe(gulp.dest('../designsystem-styleguide/js'));

  // Export icons to style guide root directory
  // gulp.src('public/icons.svg')
  // .pipe(gulp.dest('../designsystem-styleguide'));

  // Export images directory to style guide images directory
  gulp.src('public/images/**/*')
  .pipe(gulp.dest('../designsystem-styleguide/images'));

  // Export images directory to style guide images directory
  gulp.src('public/images/**/*')
  .pipe(gulp.dest('../designsystem-styleguide/images'));

  done();
});

/******************************************************
 * COMPOUND TASKS
******************************************************/
gulp.task('style-guide-export', gulp.series('copy:export-to-styleguide'));
