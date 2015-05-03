gulp  = require 'gulp'
g     = require('gulp-load-plugins')()

g.del = require 'del'

gulp.task 'build', ->
  gulp.src 'less/**/*.less'
    .pipe g.sourcemaps.init()
    .pipe g.less().on 'error', g.util.log
    .pipe g.minifyCss()
    .pipe g.sourcemaps.write 'maps'
    .pipe gulp.dest 'public/stylesheets'