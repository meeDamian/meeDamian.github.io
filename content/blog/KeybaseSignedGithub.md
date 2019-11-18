---
title: Signing git commits using Keybase
slug: keybase-signed-github
date: 2016-04-14
tags: [keybase, git, commit, gpg, security]
category: guide
draft: true
---

![screenshot-main][img-signed-commits]

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

Tracking people makes their profiles more trustworthy, by providing an auditable authenticity proof of their identity. To understand more how it works, head [here][tracking].

_"But whom should I track?"_, you might ask puzzled. And if you do, scroll down to [the handy list][keybase-list] that can get you started.

### Keybase app

Keybase really shines only when you also utilize its command line interface. GUI app is still in works.

#### Install <small>[mac][install-mac], [linux][install-linux] & [other][install-more].</small>

```shell
# OSX
$ brew install keybase

# 64-bit Debian:
$ curl -O https://dist.keybase.io/linux/deb/keybase-latest-amd64.deb && \
  sudo dpkg -i keybase-latest-amd64.deb

# Other
## All contributions welcome ;)
```

#### Login

```shell
$ keybase login
```

Follow the steps and make sure to **save your _paper wallet_ somewhere safe**.

## Keys

To make any of it possible you need your Keybase keys locally.

### Public

To import your public key just run:

```shell
# replace with your username where appropriate
$ curl https://keybase.io/<your-username>/key.asc | gpg --import
```

### Private

Now it's time for the private key. Open your Keybase profile, and…

![screenshot-main][img-export-key]

Confirm password, copy everything from the popup and save it as ex. `keybase-private.key`.

Then:

```shell
$ gpg --allow-secret-key-import --import keybase-private.key
```

## Git

Once you're all set with your Keybase stuff, you need to teach your git how to crypto.

### Get your key ID

Go to `https://keybase.io/<your-username>` and copy 8 last characters of your key fingerprint from there.

![screenshot-main][img-key-id]

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

If your key, for any reason¹, doesn't have any overlapping email addresses with your Github account, this step is necessary.

¹<small> - Ex. you forgot to add it during key generation, or you have an old key that has `<your-username>@keybase.io` as an email</small>

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

![Signed commit tooltip][img-gh-tooltip]


## People worth stalking

||||
:-- | --- | :--
[koush][@koush]                 | | Brilliant Android engineer, who [blocked his mom's number][koush-mom]
[chris][@chris] & [max][@max]   | | They're to blame for Keybase and [OkCupid][okcupid]
[vitalik][@vitalik]             | | The founder of [Ethereum][ethereum]
[moot][@moot]                   | | All [4chan][4chan] posts are by him
[codinghorror][@codinghorror]   | | Has a cool blog and founded [Stack Exchange][stack]
[aikordek][@ai]                 | | Bitcoin & Startup girl
[mpj][@mpj]                     | | Shares great [tweets][mpj-twitter] and [videos][mpj-yt]
[authy][@authy]                 | | The 2FA app you should be using instead of Google Authenticator
[robpike][@rob]                 | | Co-creator of [Go][go]
[sindresorhus][@sindresorhus]   | | The guy who wrote [**all** npm packages][all-npm]
[jakewharton][@jakewharton]     | | Cool Android dev
[matthewdgreen][@matthewdgreen] | | He knows a lot of security thingies
[oleganza][@oleganza]           | | Shares good UX and security content
[meedamian][@meedamian]         | | The original creator of this list


## KeyBase File System

This one is quite off-topic, but I think it's amazing and worth including here. Keybase is working on a seamless, fully encrypted and synced `/keybase/{public,private}/` folder. Make sure to [check it out][kbfs]. If you need an invite [hit me up][email].


<!-- images -->
[img-signed-commits]: /post-content/keybase-signed-github/signed-commits.png
[img-export-key]:     /post-content/keybase-signed-github/export-key.png
[img-key-id]:         /post-content/keybase-signed-github/key-id.png
[img-gh-tooltip]:     /post-content/keybase-signed-github/gh-tooltip.png

<!-- anchors-->
[git-setup]:    #git
[keybase-list]: #people-worth-stalking

<!-- URLs -->
[gh-gpg-signatures]:  https://github.com/blog/2144-gpg-signature-verification
[keybase]:            https://keybase.io
[tracking]:           https://keybase.io/docs/server_security/tracking
[install-mac]:        https://keybase.io/docs/the_app/install_osx
[install-linux]:      https://keybase.io/docs/the_app/install_linux
[install-more]:       https://keybase.io/download
[github-keys]:        https://github.com/settings/keys
[kbfs]:               https://keybase.io/docs/kbfs

<!-- other -->
[email]: mailto:keybase@meedamian.com?subject=Keybase+invite

<!-- recommended users -->
[@koush]:         https://keybase.io/koush
[@chris]:         https://keybase.io/chris
[@max]:           https://keybase.io/max
[@vitalik]:       https://keybase.io/vbuterin
[@moot]:          https://keybase.io/moot
[@codinghorror]:  https://keybase.io/codinghorror
[@ai]:            https://keybase.io/aikordek
[@mpj]:           https://keybase.io/mpj
[@authy]:         https://keybase.io/authy
[@rob]:           https://keybase.io/robpike
[@sindresorhus]:  https://keybase.io/sindresorhus
[@jakewharton]:   https://keybase.io/jakewharton
[@matthewdgreen]: https://keybase.io/matthewdgreen
[@oleganza]:      https://keybase.io/oleganza
[@meedamian]:     https://keybase.io/meedamian

<!-- recommended user's links-->
[koush-mom]:  https://goo.gl/kOqc68
[okcupid]:    https://www.okcupid.com
[ethereum]:   https://ethereum.org/
[4chan]:      https://www.4chan.org/
[mpj-twitter]:https://twitter.com/mpjme
[mpj-yt]:     https://www.youtube.com/c/mpjmevideos
[stack]:      https://stackexchange.com
[go]:         https://golang.org/
[all-npm]:    https://www.npmjs.com/~sindresorhus
