---
---
'use strict'

# Get stats from Github
mee = 'chester1000'

console.info "It's a lot easier to see the source code here:", "https://github.com/" + mee + "/" + mee + ".github.io"

window[mee] ?= {}

setText = (elId, newValue) ->
  document.getElementById(elId).textContent = newValue

getApiUrl = (endpoint, callbackFn) ->
  url = [
    'https://api.github.com/repos'
    mee
    mee + '.github.io'
  ]

  if endpoint
    url.push endpoint

  url = url.join '/'

  url + '?callback=' + mee + '.' + callbackFn

showStuff = ->
  unless @firstDownloaded
    @firstDownloaded = true
  else
    document.getElementById('github-repo-info').style.display = 'block'

setupNode = (endpoint, callbackFn, cb) ->
  loadScript getApiUrl endpoint, callbackFn
  window[mee][callbackFn] = (data) ->
    cb data
    showStuff.call window[mee]

setupNode null, 'processStars', (data) ->
  setText 'stargazers', data.data.stargazers_count

setupNode 'contributors', 'processCommits', (data) ->
  for contributor in data.data when contributor.login is mee
    setText 'history', contributor.contributions
    return

  setText 'history', 0


# trigger a popup on share
window.newTab = (url, delay=300) ->
  if url is 'refresh'
    location.reload()
    return

  setTimeout (-> window.open(url, '_blank').focus()), delay


window.properShare = (url, height, width) ->
  if not height or not width
    newTab url, 0
  else
    window.open url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=' + height + ',width=' + width

# handle clicks on `video` elements properly
for v in document.getElementsByTagName 'video'
  v.addEventListener 'play', (-> @play()), false
  v.onclick = ->
    if @paused then @play() else @pause()
    return false
