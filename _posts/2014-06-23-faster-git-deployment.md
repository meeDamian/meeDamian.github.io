---
layout: post
title: Faster git deployment
date: 2014-06-23
tags: [git, vcs, heroku, PaaS]
category: tricks
---

**This trick let's you push to two repositories with one command.** It is great for projects that need really rapid development and aren't yet populated by many users. Before using make sure that **deploying with every `git push`** will not result with _catastrophic consequences_.

I assume [Github](https://github.com) for version control and [Heroku](https://heroku.com) for hosting, but it works with any remote [Git](https://git-scm.com/) repository and [Cloud Platform](https://goo.gl/O6ikUq) offering deployment by git.

First, repo needs to be created:

```bash
$ git init
$ git remote add origin git@github.com:chester1000/meeDamian.com.git
```

**or** cloned:

```
$ git clone git@github.com:chester1000/meeDamian.com.git
```

Second, add heroku remote:

```bash
$ git remote set-url origin --push --add git@heroku.com:meedamian-com.git
```

Previous command **replaces Github's push remote**. To re-add it:

```bash
$ git remote set-url origin --push --add git@github.com:chester1000/meeDamian.com.git
```

If everything went well you should get something like this:

```bash
$ git remote -v
origin  git@github.com:chester1000/meeDamian.com.git (fetch)
origin  git@heroku.com:meedamian-com.git (push)
origin  git@github.com:chester1000/meeDamian.com.git (push)

```

Done :)

To push&deploy, after some commits, just:

```bash
$ git push
```

Let me know if you think this trick is awesome, terrible or you know how to improve it even further!

![Just a random Octocat image](/images/octocat_adventure-cat.png)
