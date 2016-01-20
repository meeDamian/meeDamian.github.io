---
layout: post
title: Flashing an OTA update onto your Nexus
date: 2015-10-16
tags: [android, adb, sideload, ota, nexus]
category: guide
---

#### Mandatory intro

OTA stands for _Over The Air_. Those update files are usually delivered wirelessly directly to your device, but as it usually happens gradually, you might get your update couple of days, weeks or even months after the rollout starts. Luckily there are ways to accelerate that process. Among all the people who get OTAs first there usually is couple of people willing to manually extract them from their device, and share with others on websites like  [Android Police](https://goo.gl/pdM99T).


#### Before you start

You need to figure out 4 things:

* How to [enable adb debbuging](https://developer.android.com/tools/help/adb.html#Enabling) on your handheld,
* How to [install adb](https://goo.gl/G46pWq) on your computer,
* What's [your **Device Name**](https://goo.gl/ck5t1y) and
* What's the Build number you're currently on (Settings ⇨ About Phone/Tablet ⇨ **Build number**).


### Make sure everything matches

After you [download your OTA](https://goo.gl/FWDKvO) you'll have a file like that:

```bash
$ <irrelevant-characters>.signed-<DeviceName>-<yourBuildNumber>-from-<newBuildNumber>.zip
```

Example, for Nexus 6 <small>(aka **shamu**)</small> running on Android 5.1.1 <small>(**MRA58K**)</small>, an OTA upgrading it to Android 6 <small>(**LMY48T**)</small> would be:

```bash
$ 6035ff8ac2acfe9017a7dc2e7ae4bbc926bddfb4.signed-shamu-MRA58K-from-LMY48T.zip
```


### Reboot to recovery

Plug your phone into your computer and

#### "N00b" way

If everything checks out, then:

1. switch off your phone,
2. press and hold Power and Volume Down buttons until things happen,
3. use volume buttons to select "Recovery Mode",
4. press Power button to confirm,

#### "Hacker" way

```bash
$ adb reboot recovery
```

### Do some more button squeezing

When you see a cracked open Android with a red exclamation point above it and it says "No command." below, then your phone is completely bricked.

It isn't actually. Just press Power and Volume Up simultaneously and then use Volume buttons to select "apply update from ADB".

### Run the command

`cd` to your Downloads directory (or wherever `.zip` file is) and run `adb sideload <file name>`, example:

```bash
# replace "Downloads" and file name accordingly
$ cd ~/Downloads
$ adb sideload 6035ff8ac2acfe9017a7dc2e7ae4bbc926bddfb4.signed-shamu-MRA58K-from-LMY48T.zip
```

### Wait and enjoy

After approximately one infinity, updating and _app optimizing_ should conclude, and you'll be able to enjoy your new, updated system.
