{spawn} = require "child_process"

class Options

  # defaults, and only available keys
  opts:
    f: 'html'
    l: 'js'
    O: 'encoding=utf-8'

  constructor: (opts) -> 
    @set key, value for key, value of opts

  set: (key, value) -> 
    if @opts[key]? then @opts[key] = value

  getAll: ->
    "-" + key + val for key, val of @opts


class Pygmentize

  @bin: 'pygmentize'

  @highlight: (code, lexer, format, cb, options) ->

    options = new Options options
    options.set 'l', lexer  if lexer?
    options.set 'f', format if format?

    Pygmentize._execute code, options, cb

  @_execute: (code, options, cb) ->
    pyg = spawn @bin, options.getAll()

    out = ""
    pyg.stdout.on 'data', (chunk) -> out += chunk
    pyg.stderr.on 'data', (data) ->
      console.log "pyg ERR:", data

    pyg.on 'exit', -> cb? out

    pyg.stdin.write code
    pyg.stdin.end()

module.exports = Pygmentize