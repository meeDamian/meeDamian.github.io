---
layout: post
title: Signing git commits using Keybase
date: 2016-04-11
tags: [keybase, git, commit, pgp, security]
category: guide
---

![screenshot-main](/post-content/keybase-signed-github/signed-commits.png)

##### Signing git commits has been a great idea since forever. A  great _unpopular_ idea. Luckily, that changes with the recent Github [announcement][gh-gpg-signatures]. This is a quick guide on how to set it up with your [keybase.io][keybase] account.

## Keybase

> [**Jump to the git stuff**<small>, I already have Keybase.</small>][git-setup]

### Create [keybase.io][keybase] account

Keybase is still not publicly available, but you can [ask me][email] or anyone on Keybase for an invite.

#### Add a PGP key

After you create the account, you'll have an option to either generate the key via the online interface or just add your already existing key. If you choose the former make sure to **add at least one of the emails you have confirmed on your Github account**. It will save you time later.

#### Add identities <small>(optional)</small>

The more of your online identities you add the more trustworthy your profile becomes. I suggest adding as many as possible, but you can also add them later and/or via the app or terminal client.

#### Track people <small>(optional)</small>

Tracking people makes their profiles more trustworthy, by providing an auditable proof of the authenticity of their identity. To understand more how it works, head [here][tracking].

_"But whom should I track?"_, you might ask. and if you do, scroll down to [the handy list][keybase-list] that can get you started.

### Keybase app

Keybase really shines only when you also utilize its command line interface. GUI app is still in works.

#### Install <small>[mac][install-mac], [linux][install-linux] & [other][install-more].</small>

```shell
# OSX
$ brew install keybase

# 64-bit Debian:
$ curl -O https://dist.keybase.io/linux/deb/keybase-latest-amd64.deb \
&& sudo dpkg -i keybase-latest-amd64.deb

# Other
## All contributions welcome ;)
```

#### Login

```shell
$ keybase login
```

Follow the steps and make sure to **save your _paper wallet_ somewhere safe**.

## Git

Once you're all set with your Keybase stuff, you need to teach your git how to crypto.

### Get your key ID

![screenshot-main](/post-content/keybase-signed-github/key-id.png)

Either go to `https://keybase.io/<your-username>` and copy 8 last characters of your key fingerprint from there.

Alternatively, run `gpg --list-keys`, and locate your keybase key on the list there, ex:

```shell
$ gpg --list-keys
[…]

pub   4096R/A809CB18 2014-05-09
uid       [ultimate] Damian Mee (https://meedamian.com) <mee.damian@gmail.com>
uid       [ultimate] keybase.io/meedamian <meedamian@keybase.io>
sub   2048R/6560B337 2014-05-09 [expires: 2022-05-07]
sub   2048R/15276EF8 2014-05-09 [expires: 2022-05-07]

[…]
```

From there, copy your key ID (in the example above, it's `A809CB18`).

### Add email to your key <small>(optional)</small>

If your key, for any reason, doesn't have any overlapping email addresses with your Github account, this step is necessary.

First, run:

```shell
$ gpg --edit-key <your-username>@keybase.io
```

You'll be presented with an interactive prompt, there:

* type `adduid` followed by **enter**,
* provide your publicly recognizable name,
* input any of the email addresses you have on Github,
* a "**Comment**" field can hold your website address,
* press `o` (as in "**okay**"), followed by **enter**,
* type `trust`, select `5` and confirm with `y` to grant ultimate trust to your identity,
* Finally type `save` and confirm with **enter**.

Once you're done, re-sync your key with Keybase, with:

```shell
# for newer keybase cli
$ keybase pgp select --multi

# for older keybase cli
$ keybase push --update
```

You might be asked to choose the key to be synced. Make sure to select the Keybase one.

When it finishes you might want to wait a short while, before proceeding to the next step.

### Add public key to Github

Copy everything from `https://keybase.io/<your-username>/key.asc` and paste it as a new "**GPG key**" in [here][github-keys].

### Set git defaults

```shell
# Use `git commit -S` by default for all commits
$ git config --global commit.gpgsign true

# Set default key
$ git config --global user.signingkey <key-id>
```

### Go on the committing spree

All you commit now should be automagically signed with your Keybase key. If everything went well, you should see a "**Verified**" badge by all your new commits on Github.

![](/post-content/keybase-signed-github/gh-tooltip.png)


## People worth stalking <small>order by random</small>

id|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|reason
:- | -- | :-
[koush][@koush]                 | | Brilliant Android engineer, who [blocked his mom's number][koush-mom]
[chris][@chris] & [max][@max]   | | Keybase is their baby. They met on [OkCupid][okcupid] (they also made it)
[vitalik][@vitalik]             | | The founder of [Ethereum][ethereum]
[moot][@moot]                   | | All [4chan][4chan] posts are by him
[codinghorror][@codinghorror]   | | Has a cool blog and founded [Stack Exchange][stack]
[aikordek][@ai]                 | | Bitcoin & Startup girl
[mpj][@mpj]                     | | Shares great [tweets][@mpj-twitter] and [videos][@mpj-yt]
[authy][@authy]                 | | The 2FA app you should be using instead of Google Authenticator
[robpike][@rob]                 | | Co-creator of [Go][go]
[sindresorhus][@sindresorhus]   | | He wrote [**all** npm packages][all-npm]
[jakewharton][@jakewharton]     | | Cool Android dev
[matthewdgreen][@matthewdgreen] | | He knows a lot of security thingies
[oleganza][@oleganza]           | | Shares good UX and security content
[meedamian][@meedamian]         | | best guy, ever


## Cool future feature

kbfs

# TODO

* write about kbfs
* organize links neatly
* improve stalk-list descriptions


[gh-gpg-signatures]: https://github.com/blog/2144-gpg-signature-verification
[git-setup]: #git
[email]: mailto:keybase@meedamian.com?subject=Keybase+invite
[keybase]: https://keybase.io
[tracking]: https://keybase.io/docs/server_security/tracking
[keybase-list]: #people-worth-stalking

[install-mac]: https://keybase.io/docs/the_app/install_osx
[install-linux]: https://keybase.io/docs/the_app/install_linux
[install-more]: https://keybase.io/download

[github-keys]: https://github.com/settings/keys


[@koush]: https://keybase.io/koush
[koush-mom]: https://goo.gl/kOqc68

[@chris]: https://keybase.io/chris
[@max]: https://keybase.io/max
[okcupid]: https://www.okcupid.com

[@vitalik]: https://keybase.io/vbuterin
[ethereum]: https://ethereum.org/

[@moot]: https://keybase.io/moot
[4chan]: https://www.4chan.org/

[@codinghorror]: https://keybase.io/codinghorror
[stack]: http://stackexchange.com

[@ai]: https://keybase.io/aikordek

[@mpj]: https://keybase.io/mpj
[@mpj-yt]: https://www.youtube.com/c/mpjmevideos
[@mpj-twitter]: https://twitter.com/mpjme

[@authy]: https://keybase.io/authy

[@rob]: https://keybase.io/robpike
[go]: https://golang.org/

[@sindresorhus]: https://keybase.io/sindresorhus
[all-npm]: https://www.npmjs.com/~sindresorhus

[@jakewharton]: https://keybase.io/jakewharton

[@matthewdgreen]: https://keybase.io/matthewdgreen

[@oleganza]: https://keybase.io/oleganza

[@meedamian]: https://keybase.io/meedamian
