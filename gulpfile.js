// Dependencies:
var browserSync = require('browser-sync').create();
var fs = require('fs');
var gulp = require('gulp');
var gulp_concat = require('gulp-concat');
var gulp_rename = require('gulp-rename');
var pjson = require('./package.json');
var sass = require('gulp-sass');
var version = pjson.version;
var argv = require('minimist')(process.argv.slice(2));
var config = require('./patternlab-config.json');
var patternlab = require('patternlab-node')(config);
var sourcemaps = require('gulp-sourcemaps');

function paths () { return config.paths }
// Copy Foundation Navigation file from source into public JS folder:
gulp.task('pl-copy:js', function () {
  return gulp.src('source/js/production/00-modules/foundationNavigation.min.js')
    .pipe(gulp.dest(paths().public.js));
});

// Copy Anchor distribution from installed package into public JS folder:
gulp.task('pl-copy:an', function () {
  return gulp.src('node_modules/anchor-js/anchor.min.js')
  .pipe(gulp.dest(paths().public.js));
});

// Copy Bootstrap distribution from installed package into public JS folder:
gulp.task('pl-copy:bs', function () {
  return gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest(paths().public.js));
});

// Copy jQuery distribution from installed package into public JS folder:
gulp.task('pl-copy:jq', function () {
  return gulp.src('node_modules/jquery/dist/jquery.min.js')
  .pipe(gulp.dest(paths().public.js))
});

// Copy SmoothState distribution from installed package into public JS folder:
gulp.task('pl-copy:ss', function () {
  return gulp.src('node_modules/smoothstate/jquery.smoothState.min.js')
  .pipe(gulp.dest(paths().public.js))
});

// Copy Tether distribution from installed package into public JS folder:
gulp.task('pl-copy:th', function () {
  return gulp.src('node_modules/tether/dist/js/tether.min.js')
    .pipe(gulp.dest(paths().public.js))
});

// Copy Validator distribution from installed package into public JS folder:
gulp.task('pl-copy:bv', function () {
  return gulp.src('node_modules/bootstrap-validator/dist/validator.min.js')
    .pipe(gulp.dest(paths().public.js))
});

// Copy Datepicker distribution from installed package into public JS folder:
gulp.task('pl-copy:dp', function () {
  return gulp.src('node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js')
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
gulp.task('pl-copy:favicon', function () {
  return gulp.src('favicon.ico', { cwd: paths().source.root })
    .pipe(gulp.dest(paths().public.root));
});

// Create flat designsystem CSS file and put into public CSS folder:
gulp.task('pl-copy:css', function () {
  return gulp.src(paths().source.css + 'style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths().public.css))
    .pipe(browserSync.stream());
});

// Copy Styleguide distribution folder from installed package into public
// styleguide folder:
gulp.task('pl-copy:styleguide', function () {
  return gulp.src(paths().source.styleguide + '**/*')
    .pipe(gulp.dest(paths().public.root))
    .pipe(browserSync.stream()).on('end', function () {
      gulp.src('./source/images/lab5.svg')
        .pipe(gulp.dest('./public/styleguide/images'))
    });
});

// Flatten production JS and copy into public JS folder:
gulp.task('pl-copy:designsystemprod-js', function () {
  return gulp.src(['source/js/production/00-modules/*',
      'source/js/production/*'])
    .pipe(gulp_concat('concat.js')).pipe(gulp_rename('altinnProd.js'))
    .pipe(gulp.dest('public/js'));
});

// Flatten development JS and copy into public JS folder:
gulp.task('pl-copy:designsystemdev-js', function () {
  return gulp.src(['source/js/development/00-modules/*',
      'source/js/development/*']).pipe(gulp_concat('concat.js'))
    .pipe(gulp_rename('altinnDev.js')).pipe(gulp.dest('public/js'));
});

// Create flat distribution CSS file (no Patternlab CSS or styleguide UI CSS)
// and copy into distribution folder:
gulp.task('pl-copy:distribution-css', function (done) {
  fs.readFile('./source/css/style.scss', 'utf-8',
    function (err, custom) {
      if (err) {
        console.log(err);
      }

      var src = custom.replace('@import "scss/base/profile-presentation"; ',
        '// Automatically removed');
      src = src.replace('@import "scss/patternlab/_presentation"; ',
        '// Automatically removed');
      fs.writeFileSync('./source/css/style.min.scss', src);
      gulp.src(paths().source.css + 'style.min.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/distributions/v' + version))
        .pipe(browserSync.stream());
      done();
    }
    // TODO: Delete style.min.scss from source folder
  );
});

// Create distribution JS (bundles all JS resources for production, except for
// jQuery) and copy into distribution folder:
gulp.task('pl-copy:distribution-js', function () {
  return gulp.src(
      ['node_modules/tether/dist/js/tether.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/anchor-js/anchor.min.js',
      'source/js/production/00-modules/foundationNavigation.min.js',
      'node_modules/bootstrap-validator/dist/validator.min.js',
      'node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
      'node_modules/smoothstate/jquery.smoothState.min.js',
      'source/js/production/*']
    ).pipe(gulp_concat('concat.js')).pipe(gulp_rename('plugins.min.js'))
    .pipe(gulp.dest('public/distributions/v' + version));
});

function getConfiguredCleanOption () {
  return config.cleanPublic
}

function build (done) {
  patternlab.build(done, getConfiguredCleanOption())
}

gulp.task('pl-assets', gulp.series(
  gulp.parallel('pl-copy:designsystemdev-js',
    'pl-copy:designsystemprod-js'),
    function (done) {
      done();
    }
  )
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
})

gulp.task('patternlab:liststarterkits', function (done) {
  patternlab.liststarterkits();
  done();
})

gulp.task('patternlab:loadstarterkit', function (done) {
  patternlab.loadstarterkit(argv.kit, argv.clean);
  done();
})

gulp.task('patternlab:build', gulp.series('pl-assets', build, function (done) {
  done();
}));

gulp.task('patternlab:prebuild', gulp.series(
  'pl-copy:js', 'pl-copy:bs', 'pl-copy:th', 'pl-copy:jq', 'pl-copy:bv',
  'pl-copy:dp', 'pl-copy:ss', 'pl-copy:an', 'pl-copy:img', 'pl-copy:favicon',
  'pl-copy:css', 'pl-copy:styleguide', function (done) { done(); })
);

function getSupportedTemplateExtensions () {
  var engines =
    require('./node_modules/patternlab-node/core/lib/pattern_engines');
  return engines.getSupportedFileExtensions();
}

function getTemplateWatches () {
  return getSupportedTemplateExtensions().map(function (dotExtension) {
    return paths().source.patterns + '**/*' + dotExtension;
  });
}

function reload () { browserSync.reload(); }

function watch () {
  gulp.watch(paths().source.css + '**/*.scss')
    .on('change', gulp.series('pl-copy:css', reload));
  gulp.watch(paths().source.styleguide + '**/*.*')
    .on('change', gulp.series('pl-copy:styleguide', reload));
  gulp.watch(paths().source.js + '**/*.js')
    .on('change', gulp.series('pl-copy:designsystemprod-js', reload));
  gulp.watch(paths().source.js + '**/*.js')
    .on('change', gulp.series('pl-copy:designsystemdev-js', reload));

  var patternWatches = [
   paths().source.patterns + '**/*.json',
    paths().source.patterns + '**/*.md',
    paths().source.data + '*.json',
    paths().source.images + '/*',
    paths().source.meta + '*',
    paths().source.annotations + '/*'
  ].concat(getTemplateWatches());

  gulp.watch(patternWatches).on('change', gulp.series(build, reload));
}

gulp.task('patternlab:connect', gulp.series(function (done) {
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
  }, function () { console.log('PATTERN LAB NODE WATCHING FOR CHANGES') });
  done();
}));

gulp.task('patternlab:watch', gulp.series('patternlab:build', watch));
gulp.task('patternlab:serve', gulp.series('patternlab:prebuild', 'patternlab:build', 'patternlab:connect', watch));
gulp.task('default', gulp.series('patternlab:serve'));
gulp.task('dist', gulp.series('pl-copy:distribution-js', 'pl-copy:distribution-css'));
