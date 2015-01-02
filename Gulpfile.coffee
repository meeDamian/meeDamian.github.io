gulp  = require 'gulp'
g     = require('gulp-load-plugins')()

g.del = require 'del'

WORK_DIR = './'
DEST_DIR = 'dist/'

gulp.task 'clean', (cb) ->
  g.del [
    DEST_DIR + '*'
    '!' + DEST_DIR + '.git'
    '!' + DEST_DIR + '.gitignore'
  ], cb


gulp.task 'bump', ->
  gulp.src 'package.json'
    .pipe g.bump()
    .pipe gulp.dest WORK_DIR
    .pipe gulp.dest DEST_DIR


gulp.task 'copy', ->
  gulp.src [
      'package.json'
      'Procfile'
      'public/**'
      'views/**'
      '_posts/**'
    ], base: WORK_DIR
    .pipe gulp.dest DEST_DIR


gulp.task 'compile', ->
  gulp.src [
      '*.coffee'
      '!Gulpfile.coffee'
    ]
    .pipe g.coffee(bare: true).on 'error', g.util.log
    .pipe gulp.dest DEST_DIR

  gulp.src 'less/**/*.less'
    .pipe g.sourcemaps.init()
    .pipe g.less().on 'error', g.util.log
    .pipe g.sourcemaps.write 'maps'
    .pipe gulp.dest DEST_DIR + 'public/stylesheets'


gulp.task 'test', ->
  undefined


gulp.task 'lint', ->
  gulp.src '**.coffee'
    .pipe g.coffeelint()
    .pipe g.coffeelint.reporter()


gulp.task 'check', [
  'lint'
  'test'
]

gulp.task 'createDist', [
  'check'
  'copy'
  'compile'
]

gulp.task 'release', [
  'check'
  'bump'
  'copy'
  'compile'
]

gulp.task 'default', ['createDist']

# TODO:
# * add WATCH
# * add tests
# * add Heroku

###
Doable things:
  * serve
    * lint
    * test
    * watch
    * coffee
      * restart on each changing save

    * less
      * recompile on each changing save
      * if no errors:
        * reload resource in browser

  * build
    * copy do dist/
    * get rid of all build stuff
      * devDependencies
      * .git*
      * lint
      * coffee-script

    * compile:
      * coffee -> js
      * less -> css
      * markdown -> html
      * !jade


  * deployOnly
    * testBuild
    *

  * deploy



  * bump



  * jslint pre-commit

###