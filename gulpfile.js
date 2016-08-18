/******************************************************
 * PATTERN LAB NODE
 * EDITION-NODE-GULP
 * The gulp wrapper around patternlab-node core, providing tasks to interact with the core library and move supporting frontend assets.
******************************************************/
var gulp = require('gulp'),
  gulp_concat = require('gulp-concat'),
  gulp_rename = require('gulp-rename'),
  path = require('path'),
  fs = require('fs'),
  pjson = require('./package.json'),
  version = pjson.version,
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  argv = require('minimist')(process.argv.slice(2));

/******************************************************
 * COPY TASKS - stream assets from source to destination
******************************************************/
// JS copy
gulp.task('pl-copy:js', function(){
  return gulp.src('**/*.js', {cwd: path.resolve(paths().source.js)} )
    .pipe(gulp.dest(path.resolve(paths().public.js)));
});

// Copy Bootstrap:
gulp.task('pl-copy:bs', function () {
  return gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest(path.resolve(paths().public.js)))
})
// Copy Tether:
gulp.task('pl-copy:th', function () {
  return gulp.src('node_modules/tether/dist/js/tether.min.js')
    .pipe(gulp.dest(path.resolve(paths().public.js)))
})
// Copy jQuery:
gulp.task('pl-copy:jq', function () {
  return gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(path.resolve(paths().public.js)))
})
// Copy Validator:
gulp.task('pl-copy:bv', function () {
  return gulp.src('node_modules/bootstrap-validator/dist/validator.min.js')
    .pipe(gulp.dest(path.resolve(paths().public.js)))
})
// Copy SmoothState:
gulp.task('pl-copy:ss', function () {
  return gulp.src('node_modules/smoothstate/jquery.smoothState.min.js')
    .pipe(gulp.dest(path.resolve(paths().public.js)))
})
// Copy Anchor:
gulp.task('pl-copy:an', function () {
  return gulp.src('node_modules/anchor-js/anchor.min.js')
    .pipe(gulp.dest(path.resolve(paths().public.js)))
})

// Images copy:
gulp.task('pl-copy:img', function () {
  return gulp.src(
    ['**/*.gif', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
    {cwd: path.resolve(paths().source.images)}
  )
    .pipe(gulp.dest(path.resolve(paths().public.images)))
})

// Favicon copy
gulp.task('pl-copy:favicon', function(){
  return gulp.src('favicon.ico', {cwd: path.resolve(paths().source.root)} )
    .pipe(gulp.dest(path.resolve(paths().public.root)));
});

// Fonts copy
gulp.task('pl-copy:font', function(){
  return gulp.src('*/**', {cwd: path.resolve(paths().source.fonts)})
    .pipe(gulp.dest(path.resolve(paths().public.fonts)));
});

// CSS Copy
gulp.task('pl-copy:css', function(){
  return gulp.src(path.resolve(paths().source.css, 'style.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.resolve(paths().public.css)))
    .pipe(browserSync.stream());
});

// Styleguide Copy everything but css
gulp.task('pl-copy:styleguide', function(){
  return gulp.src(path.resolve(paths().source.styleguide, '**/!(*.css)'))
    .pipe(gulp.dest(path.resolve(paths().public.root)))
    .pipe(browserSync.stream())
    .on('end', function () {
      gulp.src('./source/images/lab5.svg')
        .pipe(gulp.dest('./public/styleguide/images'));
    });
});

// Styleguide Copy and flatten css
gulp.task('pl-copy:styleguide-css', function(){
  return gulp.src(path.resolve(paths().source.styleguide, '**/*.css'))
    .pipe(gulp.dest(function(file){
      //flatten anything inside the styleguide into a single output dir per http://stackoverflow.com/a/34317320/1790362
      file.path = path.join(file.base, path.basename(file.path));
      return path.resolve(path.join(paths().public.styleguide, 'css'));
    }))
    .pipe(browserSync.stream());
});

// Create distribution CSS (no Patternlab or styleguide UI)
gulp.task('pl-copy:distribution-css', function () {
  fs.readFile('./source/css/style.scss', 'utf-8',
    function (err, custom) {
      if (err) console.log(err)
      var src = custom.replace('@import "scss/base/profile-presentation"; ', '// Automatically removed')
      src = src.replace('@import "scss/patternlab/_presentation"; ', '// Automatically removed')
      // To remove further css:
      // src = src.replace('Text to remove', '// Automatically removed')
      fs.writeFileSync('./source/css/style.min.scss', src)
      return gulp.src(path.resolve(paths().source.css, 'style.min.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/distributions/v' + version))
        .pipe(browserSync.stream())
    }
    // TODO: Delete style.min.scss from source folder
  )
});

// Create distribution JS (bundles JS resources, EXCEPT FOR JQUERY)
gulp.task('pl-copy:distribution-js', function () {
  return gulp.src([
    'node_modules/tether/dist/js/tether.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/bootstrap-validator/dist/validator.min.js',
    'node_modules/smoothstate/jquery.smoothState.min.js',
    'source/js/altinn.js'])
    .pipe(gulp_concat('concat.js'))
    .pipe(gulp_rename('plugins.min.js'))
    .pipe(gulp.dest('public/distributions/v' + version))
})

/******************************************************
 * PATTERN LAB CONFIGURATION - API with core library
******************************************************/
//read all paths from our namespaced config file
var config = require('./patternlab-config.json'),
  patternlab = require('patternlab-node')(config);

function paths() {
  return config.paths;
}

function getConfiguredCleanOption() {
  return config.cleanPublic;
}

function build(done) {
  patternlab.build(done, getConfiguredCleanOption());
}

gulp.task('pl-assets', gulp.series(
  gulp.parallel(
    'pl-copy:js',
    'pl-copy:bs',
    'pl-copy:th',
    'pl-copy:jq',
    'pl-copy:bv',
    'pl-copy:ss',
    'pl-copy:an',
    'pl-copy:img',
    'pl-copy:favicon',
    'pl-copy:font',
    'pl-copy:css',
    'pl-copy:styleguide',
    'pl-copy:styleguide-css'
  ),
  function(done){
    done();
  })
);

gulp.task('pl-distr', gulp.series(
  gulp.parallel(
    'pl-copy:distribution-css',
    'pl-copy:distribution-js'
  ),
  function(done){
    done();
  })
);

gulp.task('patternlab:version', function (done) {
  patternlab.version();
  done();
});

gulp.task('patternlab:help', function (done) {
  patternlab.help();
  done();
});

gulp.task('patternlab:patternsonly', function (done) {
  patternlab.patternsonly(done, getConfiguredCleanOption());
});

gulp.task('patternlab:liststarterkits', function (done) {
  patternlab.liststarterkits();
  done();
});

gulp.task('patternlab:loadstarterkit', function (done) {
  patternlab.loadstarterkit(argv.kit, argv.clean);
  done();
});

gulp.task('patternlab:build', gulp.series('pl-assets', build, function(done){
  done();
}));

/******************************************************
 * SERVER AND WATCH TASKS
******************************************************/
// watch task utility functions
function getSupportedTemplateExtensions() {
  var engines = require('./node_modules/patternlab-node/core/lib/pattern_engines');
  return engines.getSupportedFileExtensions();
}
function getTemplateWatches() {
  return getSupportedTemplateExtensions().map(function (dotExtension) {
    return path.resolve(paths().source.patterns, '**/*' + dotExtension);
  });
}

function reload() {
  browserSync.reload();
}

function watch() {
  gulp.watch(path.resolve(paths().source.css, '**/*.scss')).on('change', gulp.series('pl-copy:css', reload));
  gulp.watch(path.resolve(paths().source.styleguide, '**/*.*')).on('change', gulp.series('pl-copy:styleguide', 'pl-copy:styleguide-css', reload));

  var patternWatches = [
    path.resolve(paths().source.patterns, '**/*.json'),
    path.resolve(paths().source.patterns, '**/*.md'),
    path.resolve(paths().source.data, '*.json'),
    path.resolve(paths().source.fonts + '/*'),
    path.resolve(paths().source.images + '/*'),
    path.resolve(paths().source.meta, '*'),
    path.resolve(paths().source.annotations + '/*')
  ].concat(getTemplateWatches());

  gulp.watch(patternWatches).on('change', gulp.series(build, reload));
}

gulp.task('patternlab:connect', gulp.series(function(done) {
  browserSync.init({
    server: {
      baseDir: path.resolve(paths().public.root)
    },
    snippetOptions: {
      // Ignore all HTML files within the templates folder
      blacklist: ['/index.html', '/', '/?*']
    },
    notify: {
      styles: [
        'display: none',
        'padding: 15px',
        'font-family: sans-serif',
        'position: fixed',
        'font-size: 1em',
        'z-index: 9999',
        'bottom: 0px',
        'right: 0px',
        'border-top-left-radius: 5px',
        'background-color: #1B2032',
        'opacity: 0.4',
        'margin: 0',
        'color: white',
        'text-align: center'
      ]
    }
  }, function(){
    console.log('PATTERN LAB NODE WATCHING FOR CHANGES');
  });
  done();
}));

/******************************************************
 * COMPOUND TASKS
******************************************************/
gulp.task('default', gulp.series('patternlab:build'));
gulp.task('patternlab:watch', gulp.series('patternlab:build', watch));
gulp.task('patternlab:serve', gulp.series('patternlab:build', 'patternlab:connect', 'pl-distr', watch));
