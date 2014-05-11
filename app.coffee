querystring = require 'querystring'
{highlight} = require './pygmentize'
{markdown}  = require 'markdown'
html2text   = require 'html-to-text'
express     = require 'express'
request     = require 'request'
async       = require 'async'
http        = require 'http'
path        = require 'path'
url         = require 'url'

app         = express()
Poet        = require 'poet'

String::startsWith    ?= (str) -> 0 is @indexOf str
String::startsWithAny  = (lst) -> return true for str in lst when @startsWith str; false
String::endsWith      ?= (str) -> str is @slice -str.length

markdown.Markdown.dialects.Gruber.inline['`'] = (text) ->
  m = text.match /(`+)(\w*?[\n])(([\s\S]*?)\1)/
  if m and m[3]
    lang = m[2].trim()
    [ m[1].length + m[2].length + m[3].length, [ "pygmentize", lang, m[4] ] ]

  else [ 1, "`" ]

renderMarkdown = (string, callback) ->
  data = markdown.parse string
  snippets = []

  recurse = (entry) ->
    if entry[0] is 'pygmentize'
      snippets.push (cb) ->
        highlight entry[2], entry[1], null, (data) ->
          entry[0] = 'pre'
          entry[1] =           
            'data-contents': data
            lang: entry[1]

          entry.pop()
          cb()

    else if entry[0] is 'img' and entry.length is 2
      img = entry[1]
      if img.href.startsWith "http://www.youtube.com"
        entry[0] = 'center'
        q = querystring.parse url.parse(img.href).query 
        entry.pop()
        yt =
          width: '420'
          height: '315'
          src: 'http://www.youtube.com/embed/' + q.v
          frameborder: '0'
          allowfullscreen: 'true'
        entry.push ['iframe', yt]

      else 
        img.href = '/post-content/' + img.href unless img.href.startsWith 'http'
        entry[0] = 'center'
        entry[1] = ['img', img]
        return

    recurse child for _, child of entry when typeof child is "object"

  recurse data
  async.parallel snippets, -> callback null, markdown.toHTML data

app.configure ->
  app.set 'port', process.env.PORT or 3000
  app.set 'views', __dirname + '/views'
  app.set 'view engine', 'jade'

  app.set 'github name', 'chester1000'

  app.use (req, res, next) ->
    if req.path.startsWithAny ['/post', '/stylesheets', '/bootstrap', '/images', '/github', '/javascripts']
      res.header 'Cache-Control', 'max-age=300'
    next()

  app.use (req, res, next) ->
    unless req.is 'text/*' then next()
    else
      req.text = ''
      req.setEncoding 'utf8'
      req.on 'data', (chunk) -> req.text += chunk
      req.on 'end', next

  app.use express.favicon path.join process.cwd(), 'public/favicon.ico'
  app.use express.logger 'dev'
  # app.use require('less-middleware') src: __dirname + '/public'
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use app.router
  app.use express.static path.join(__dirname, 'public'), maxAge:300


app.get '/post-content/*', (req, res) ->
  res.header 'Cache-Control', 'max-age=300'
  res.sendfile path.join __dirname, '_posts', req.params[0]

app.configure 'development', ->
  app.use express.errorHandler()

poet = Poet app, 
  posts: './_posts'
  postsPerPage: 3

.addTemplate
  ext: ['markdown', 'md']
  fn: renderMarkdown

poet.init ->

  app.get '/rss', (req, res) ->
    posts = poet.helpers.getPosts 0, 5

    posts.forEach (post) ->
      post.rssDescription = html2text.fromString post.preview

    res.render 'rss', posts: posts

  attachGithubRepo = (name) ->
    getGithub = (type, callback) ->
      urls =
        repo:   'api.github.com/repos/%s'
        readme: 'raw.github.com/%s/master/README.md'

      request
        headers: 'User-Agent': 'node.js'
        url: "https://" + urls[type].replace /%s/g, app.get("github name") + "/" + name
      , callback

    app.get '/' + name.replace(/-/g, ""), (req, res) ->
      res.header 'Cache-Control', 'max-age=300'

      async.parallel [
        (cb) -> getGithub 'repo',   (err, resp, body) -> cb null, JSON.parse body
        (cb) -> getGithub 'readme', (err, resp, body) -> renderMarkdown body, cb

      ], (err, results) ->
        return res.send err if err?

        info = results[0]

        res.render 'github',
          name: app.get("github name") + "/" + name
          markdown: results[1]
          project:
            owner: info.owner
            title: info.name
            description: info.description

  app.get '/', (req, res) -> res.render 'index', posts: poet.helpers.getPosts 0, 3

  attachGithubRepo "Pretty-Binary-Clock"
  attachGithubRepo "BitcoinMonitor"

  server = http.createServer app
    .listen app.get('port'), ->
      console.log "Express server listening on port " + app.get 'port'

