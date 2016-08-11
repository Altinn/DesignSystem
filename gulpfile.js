var pkg = require('./package.json')
var gulp = require('gulp')
var gulp_concat = require('gulp-concat')
var gulp_rename = require('gulp-rename')
var path = require('path')
var fs = require('fs')
var eol = require('os').EOL
var del = require('del')
var strip_banner = require('gulp-strip-banner')
var header = require('gulp-header')
var nodeunit = require('gulp-nodeunit')
var eslint = require('gulp-eslint')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()
var pjson = require('./package.json');
var version = pjson.version
require('gulp-load')(gulp)
var banner = [
  '/** ',
  ' * <%= pkg.name %> - v<%= pkg.version %> - <%= today %>',
  ' * ',
  ' * <%= pkg.author %>, and the web community.',
  ' * Licensed under the <%= pkg.license %> license.',
  ' * ',
  ' * Many thanks to Brad Frost and Dave Olsen for inspiration, ' +
    'encouragement, and advice.',
  ' * ',
  ' **/'
].join(eol)
function paths () { return require('./patternlab-config.json').paths }
// Load Pattern Lab tasks
gulp.loadTasks(__dirname + '/core/lib/patternlab_gulp.js')
// Clean patterns directory
gulp.task('clean', function (cb) {
  del.sync([path.resolve(paths().public.patterns, '*')], { force: true }); cb()
})
// Build the banner
gulp.task('banner', function () {
  return gulp.src([
    './core/lib/patternlab.js',
    './core/lib/object_factory.js',
    './core/lib/lineage_hunter.js',
    './core/lib/media_hunter.js',
    './core/lib/patternlab_grunt.js',
    './core/lib/patternlab_gulp.js',
    './core/lib/parameter_hunter.js',
    './core/lib/pattern_exporter.js',
    './core/lib/pattern_assembler.js',
    './core/lib/pseudopattern_hunter.js',
    './core/lib/list_item_hunter.js',
    './core/lib/style_modifier_hunter.js'
  ])
  .pipe(strip_banner())
  .pipe(header(banner, {
    pkg: pkg,
    today: new Date().getFullYear()
  }))
  .pipe(gulp.dest('./core/lib')) })
// Spawn a core folder and add custom modification to styleguide.mustache & index.mustache, as well as creating a base for rewriting styleguide.mustache
gulp.task('cp:pl', function () {
  return gulp.src('node_modules/patternlab-node/core/**')
    .pipe(gulp.dest('./core'))
    .on('end', function () {
      fs.readFile('./patternlab_gulp.js', 'utf-8',
        function (err, origin) {
          if (err) console.log(err)
          fs.writeFile('./core/lib/patternlab_gulp.js', origin)
        })
      fs.readFile('./core/lib/pattern_engines.js', 'utf-8',
        function (err, origin) {
          if (err) console.log(err)
          var src = origin.replace('recursive: false', 'recursive: true')
          fs.writeFile('./core/lib/pattern_engines.js', src)
        })
    })
    .on('end', function () {
    //   fs.readFile('./core/templates/styleguide.mustache', 'utf-8',
    //     function (err, origin) {
    //       if (err) console.log(err)
    //       fs.writeFile('./core/templates/styleguide_base.mustache', origin)
    //     })
    //   fs.readFile('./core/templates/styleguide.mustache', 'utf-8',
    //     function (err, origin) {
    //       if (err) console.log(err)
    //       fs.readFile('./patternlab-all-wrapper.mustache', 'utf-8',
    //         function (err, custom) {
    //           if (err) console.log(err)
    //           var src = custom + origin + '</div><!-- End container -->'
    //           fs.writeFile('./core/templates/styleguide.mustache', src)
    //         })
    //     })
    //   var anchor1 = '<link rel="stylesheet" href="styleguide/css/styleguide.css?{{ cacheBuster }}" media="all" />'
    //   var newRef = '<link rel="stylesheet" href="styleguide/css/styleguide-edit.css" media="all" />'
    //   var anchor2 = '<header class="sg-header" role="banner">'
    //   var header = '<div class="a-sg-header-top"><a href="/" class="a-sg-header-title">Pattern Lab</a><div class="a-sg-header-links"><a href="https://github.com/Altinn/DesignSystem">Åpne i Github </a><a href="#">Om designsystemet</a></div></div>'
    //   fs.readFile('./core/templates/index.mustache', 'utf-8',
    //     function (err, origin) {
    //       if (err) console.log(err)
    //       var src = origin.replace(anchor1, anchor1 + newRef)
    //       src = src.replace(anchor2, anchor2 + header)
    //       fs.writeFileSync('./core/templates/index.mustache', src)
    //     })
    })
})
// Support continuous modification to styleguide.mustache
gulp.task('cp:sm', function () {
  fs.readFile('./core/templates/styleguide_base.mustache', 'utf-8',
    function (err, origin) {
      if (err) console.log(err)
      fs.readFile('./patternlab-all-wrapper.mustache', 'utf-8',
        function (err, custom) {
          if (err) console.log(err)
          var src = custom + origin + '</div><!-- End container -->'
          fs.writeFile('./core/templates/styleguide.mustache', src)
        })
    })
})
// Copy JavaScript
gulp.task('cp:js', function () {
  return gulp.src('**/*.js', {cwd: path.resolve(paths().source.js)})
    .pipe(gulp.dest(path.resolve(paths().public.js)))
})
// Copy Bootstrap
gulp.task('cp:bs', function () {
  return gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest(path.resolve(paths().public.js)))
})
// Copy Tether
gulp.task('cp:th', function () {
  return gulp.src('node_modules/tether/dist/js/tether.min.js')
    .pipe(gulp.dest(path.resolve(paths().public.js)))
})
// Copy jQuery
gulp.task('cp:jq', function () {
  return gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(path.resolve(paths().public.js)))
})
// Copy Validator
gulp.task('cp:bv', function () {
  return gulp.src('node_modules/bootstrap-validator/dist/validator.min.js')
    .pipe(gulp.dest(path.resolve(paths().public.js)))
})
// Copy SmoothState
gulp.task('cp:ss', function () {
  return gulp.src('node_modules/smoothstate/jquery.smoothState.min.js')
    .pipe(gulp.dest(path.resolve(paths().public.js)))
})
// Copy Anchor
gulp.task('cp:an', function () {
  return gulp.src('node_modules/anchor-js/anchor.min.js')
    .pipe(gulp.dest(path.resolve(paths().public.js)))
})
// Copy images
gulp.task('cp:img', function () {
  return gulp.src(
    ['**/*.gif', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
    {cwd: path.resolve(paths().source.images)}
  )
    .pipe(gulp.dest(path.resolve(paths().public.images)))
})
// Copy Fonts
gulp.task('cp:font', function () {
  return gulp.src('**/*', {cwd: path.resolve(paths().source.fonts)})
    .pipe(gulp.dest(path.resolve(paths().public.fonts)))
})
// Copy data
gulp.task('cp:data', function () {
  return gulp.src('annotations.js', {cwd: path.resolve(paths().source.data)})
    .pipe(gulp.dest(path.resolve(paths().public.data)))
})
// Copy CSS
gulp.task('cp:css', function () {
  return gulp.src(path.resolve(paths().source.css, 'style.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.resolve(paths().public.css)))
    .pipe(browserSync.stream())
})
// Create distribution CSS (no Patternlab or styleguide UI)
gulp.task('cp:dcss', function () {
  fs.readFile('./source/css/style.scss', 'utf-8',
    function (err, custom) {
      if (err) console.log(err)
      var src = custom.replace('@import "scss/base/profile-presentation"; ', '// Automatically removed')
      src = src.replace('@import "scss/base/pattern-presentation"; ', '// Automatically removed')
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
})
// Create distribution JS (bundles JS resources, EXCEPT FOR JQUERY)
gulp.task('cp:djs', function () {
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
// Create styleguide-edit.css
gulp.task('cp:sge', function () {
  return gulp.src(path.resolve(paths().source.css, 'styleguide-edit.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/styleguide/css'))
    .pipe(browserSync.stream())
})
// Create patternlab-presentation.css
gulp.task('cp:pp', function () {
  return gulp.src(path.resolve(paths().source.css, 'patternlab-presentation.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream())
})
// Copy styleguide
gulp.task('cp:styleguide', function () {
  return gulp.src(
    ['**/*'],
    { cwd: path.resolve(paths().source.styleguide, 'styleguide') }
  )
    .pipe(gulp.dest(path.resolve(paths().public.styleguide)))
    .pipe(browserSync.stream())
})
// Server and watch tasks
gulp.task('connect', ['lab'], function () {
  browserSync.init({
    server: { baseDir: path.resolve(paths().public.root) },
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
  })
  gulp.watch(path.resolve(paths().source.css, '**/*.scss'), ['cp:css'])
  gulp.watch(path.resolve('.', 'patternlab-all-wrapper.mustache'), ['cp:sm'])
  gulp.watch(path.resolve(paths().source.css, '**/*.scss'), ['cp:sge'])
  gulp
    .watch(path.resolve(paths().source.styleguide, '**/*.*'), ['cp:styleguide'])
  gulp.watch(
    [
      path.resolve(paths().source.patterns, '**/*.mustache'),
      path.resolve(paths().source.patterns, '**/*.json'),
      path.resolve(paths().source.data, '*.json'),
      path.resolve(paths().source.fonts + '/*'),
      path.resolve(paths().source.images + '/*'),
      path.resolve(paths().source.data + '*.json'),
      path.resolve(paths().source.data + '*.js'),
      path.resolve(paths().source.patternlabFiles + '**/*.*')
    ],
    ['lab-pipe'],
    function () { browserSync.reload() }
  )
})
// Lint
gulp.task('eslint', function () {
  return gulp.src(['./core/lib/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})
// Unit test
gulp.task('nodeunit', function () {
  return gulp.src('./test/**/*_tests.js')
    .pipe(nodeunit())
})
gulp.task('lab-pipe', ['lab'], function (cb) { cb(); browserSync.reload() })
gulp.task('default', ['lab'])
gulp.task('assets', [
  'cp:js', 'cp:bs', 'cp:th', 'cp:jq', 'cp:bv', 'cp:ss', 'cp:an', 'cp:img',
  'cp:font', 'cp:data', 'cp:css', 'cp:djs', 'cp:dcss', 'cp:sge', 'cp:pp', 'cp:styleguide'
])
gulp.task('prelab', ['clean', 'assets'])
gulp.task('lab', ['prelab', 'patternlab'], function (cb) {
  var custom = fs.readFileSync('./public/index.html', 'utf-8')
  custom = custom.replace('</body>',
    '<script>' +
      '$("#sg-viewport").on("load", function () {' +
        '$("#sg-switchtheme-blue",' +
          '$("iframe").contents()[0]).change(function () {' +
          '$("body", $("iframe").contents()[0]).toggleClass("business");' +
          '$("body", $("iframe").contents()[0]).toggleClass("private-person");' +
          '$("html", $("iframe").contents()[0]).toggleClass("business");' +
          '$("html", $("iframe").contents()[0]).toggleClass("private-person");' +
        '});' +
        '$("#sg-switchtheme-grey",' +
          '$("iframe").contents()[0]).change(function () {' +
          '$("body", $("iframe").contents()[0]).toggleClass("business");' +
          '$("body", $("iframe").contents()[0]).toggleClass("private-person");' +
          '$("html", $("iframe").contents()[0]).toggleClass("business");' +
          '$("html", $("iframe").contents()[0]).toggleClass("private-person");' +
        '});' +
        '$("#sg-switchtheme-grey", $("iframe").contents()[0]).prop("checked", true)' +
      '})' +
    '</script></body>')
  fs.writeFile('./public/index.html', custom)
  cb()
})
gulp.task('patterns', ['patternlab:only_patterns'])
gulp.task('serve', ['lab', 'connect'])
gulp.task('build', ['eslint', 'nodeunit', 'banner'])
gulp.task('version', ['patternlab:version'])
gulp.task('help', ['patternlab:help'])
gulp.task('setup', ['cp:pl'])
