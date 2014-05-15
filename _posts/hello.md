{{{
  "title" : "Beginning...",
  "date": "2014-05-13",
  "tags": ["web", "coffeescript", "heroku", "nodejs", "npm"],
  "category": "junk"
}}}

Several days ago I was casually browsing awesomness of [Github](http://github.com) when I saw [this project](https://github.com/koush/koush.com) 
by [koush](https://github.com/koush), and instantly understood that's the blogging flow I could use - write in sublime and 
publish/deploy from terminal.

I had to do some cleanup there, update & fix some dependencies and rewrite parts of it to [a better language](http://coffeescript.org/).
Later, I've created a new [Heroku](https://www.heroku.com/) instance, moved my domain to a heroku Add-on called [pointDNS](https://addons.heroku.com/pointdns),
did `git push heroku`, and it worked great :). I still have some styling to do, though...

So let's go through it step by step (`WARNING` that may be boring if you don't like details):


### Cleanup
There was quite a bunch of code I wasn't going to use.

#### package.json
I have moved dependencies from being hardcoded in `node_modules` folder to a proper `dependencies` section in `package.json`
file. I prefer stuff on CDN's, so I had to re-link some things, like [Bootstrap](http://getbootstrap.com/) or [jQuery](http://jquery.com)
(required by, but not budled with **Bootstrap**).

I've restructured some view files, removed almost all styles and left only two **.less** files with very small changes to
a default **Bootstrap** theme.


### Upgrades
From the start I wanted to use only the newest packages, and as it usually is, some things weren't yet compatible...

#### poet
First _problem_ I've encountered was an instant crash [poet](https://github.com/jsantell/poet) was experiencing when I 
tried _friending_ it with [express](http://expressjs.com/) v4.x, where `app.locals` 
[is no longer a function](https://github.com/visionmedia/express/wiki/Migrating-from-3.x-to-4.x#reslocals), and I had to
handle it [like this](https://github.com/jsantell/poet/pull/88/files) (I've used [underscore](http://underscorejs.org/), 
only because it was already `require`d there). As I didn't wanted to wait for someone to merge my PR, I decided to 
[link to own repo](https://github.com/chester1000/meeDamian.com/blob/cf8c24355dce30b395ca790718fcd84815b4323b/package.json#L12) 
in `package.json`.

After that express hit me with a lot of structure changes - they've [decided to move a lot of stuff out](https://github.com/senchalabs/connect#middleware) 
of the main repo. So I had to add dependencies in `package.json`, and require them accordingly in my `app.coffee` file.

#### markdown + highlighting
Originally [markdown](https://github.com/evilstreak/markdown-js) was used, but it had no proper **highlighting** hooks 
(some crazy regular expression was being used), it didn't have support for [GFC](https://help.github.com/articles/github-flavored-markdown) 
(empty lines in code blocks were breaking formatting of an entire post) and actual formatting was happening in a [python-pygments](http://pygments.org/) 
library, that was accessed by some other python files, and... Yeah, I simplified this by using a suprisingly great [marked](https://github.com/chjj/marked)
npm module, that was insanely easy to integrate with [highlight.js](http://highlightjs.org/):

```coffeescript
marked.setOptions
  highlight: (code, lang) ->
    hljs.highlight(lang, code).value
```

Obviously it couldn't be that easy and some problems had to emerge: code block background was always **white**, and if I 
wrapped code with a div with `.hljs` class, background had wrong shape. But [one quick PR](https://github.com/chjj/marked/pulls) 
solved that isse for me.


### Heroku
Deploying on Heroku, was way easier than I expected. Basically the only two things I had to do was, to create a `Procfile`
containing only: `web: npm start`. And add `coffee-script` dependency to my `package.json` file, since I prefer running 
**coffeescript** directly than compiling it to **js**, and then running it.


### Little Things
I hate when things annoy me with their little warnigs, and so was [html-to-text](https://github.com/werk85/node-html-to-text) 
module:

`npm WARN package.json html-to-text@0.0.8 No repository field.`

Luckily [one little PR](https://github.com/werk85/node-html-to-text/pull/19) solved this issue.

![Awesome mustache](/images/mustache512_short.png)