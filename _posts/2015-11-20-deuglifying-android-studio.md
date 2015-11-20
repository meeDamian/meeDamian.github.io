---
layout: post
title: Making Android Studio pretty
thumbnail: /post-content/deuglifying-android-studio/prettyAS-2-small.png
date: 2015-11-20
tags: [android, android studio, theme]
category: guide
---

Today, during a glorious transition from **1.5 rc1** to **1.5** Android Studio decided to keep all of my settings completely intact, with the honorable exception of **GUI** and **syntax themes** and **LogCat** <b style="color:#BBB">c</b><b style="color:#33B5E5">o</b><b style="color:#9C0">l</b><b style="color:#A6C">o</b><b style="color:#F44">r</b><b style="color:#FB3">s</b>, which were just gone. Being me, I had not the slightest recollection on how the previous combo have gotten into my editor and I had to search for everything again. Not particularly enjoying the process of rediscovery, I decided to keep it stashed somewhere, both for the future me and maybe for some curious souls that happen to bump onto my blog.

#### Final appearance <small>More [below](#screenshots)</small>

![AS-screenshot-main][as2]

#### 1. [GUI Theme][gui] <small>manual from [here][gui-inst]</small>

1. [Open the Settings/Preferences dialog][settings] (OSX/Unix: `⌘+,`, Windows: `Ctrl+Alt+S`)
1. In the left-hand pane, select **Plugins**.
1. Click **Browse repositories...** and search for <kbd>Material Theme UI</kbd>
1. Click **Install plugin** and confirm your intention to download and install the plugin.
1. Click **OK** in the **Settings** dialog and restart for the changes to take effect.

** tl;dr: `⌘⇧a → "Plugins" → ↩ → ⌃⌥b → <search> → "Material Theme UI" → [Install plugin] → ⌃⌥c → ⎋ → <restart>`**

**`NOTE:`** No need to set schema as we'll be using a different one.


#### 2. [Editor Schema][editor] <small>manual from [here][editor-inst]</small>

###### Find plugin

 1. Open IDE and locate `File >> Settings >> Plugins` and click **Browse Repositories...**
 1. Search for and click <kbd>ChroMATERIAL</kbd> and click **Install plugin**

###### Use Color Scheme

 1. Locate `File >> Settings >> Editor >> Colors & Fonts >> Scheme`
 1. Choose <kbd>ChroMATERIAL</kbd> and click **Apply**/**OK**.

** tl;dr: `⌘⇧a → "Plugins" → ↩ → ⌃⌥b → <search> → "ChroMATERIAL" → [Install plugin] → ⌃⌥c → ⎋ → <restart> → ⌘⇧a → "Color Scheme" → [3. ChroMATERIAL] → ↩`**


#### 3. [HOLO Logcat][holo-logcat]
>>
|     Type | Color                                           |
|---------:|:------------------------------------------------|
| verbose: | <kbd><b style="color:#BBB">#BBB</b></kbd>       |
|   debug: | <kbd><b style="color:#33B5E5">#33B5E5</b></kbd> |
|    info: | <kbd><b style="color:#9C0">#9C0</b></kbd>       |
|  assert: | <kbd><b style="color:#A6C">#A6C</b></kbd>       |
|   error: | <kbd><b style="color:#F44">#F44</b></kbd>       |
| warning: | <kbd><b style="color:#FB3">#FB3</b></kbd>       |


1. Go to `Preferences → Editor → Colors & Fonts → Android Logcat`,
1. Make sure that <kbd>ChroMATERIAL</kbd> is selected in dropdown, and click **Save as...**,
1. Choose a name <small>ex. <kbd>ChroMATERIAL + HOLO</kbd></small> and confirm with **OK**,
1. Click on each item from the list in the center and change their **Foreground** color to the one from table above,
1. Click **Apply**/**OK**.


** tl;dr: `⌘⇧a → "Android Logcat" → [Save as...] → "ChroMATERIAL + HOLO"¹ → ↩ → <set foreground colors as in the table ↑> → ⎋`**

<small>`¹` - any other name is fine too</small>


#### Screenshots <small>they open in the same tab - sorry…</small>

| [![AS-screenshot][as1-sm]][as1] | [![AS-screenshot][as2-sm]][as2] |
|--------------------------------:|:--------------------------------|
| [![AS-screenshot][as3-sm]][as3] | [![AS-screenshot][as4-sm]][as4] |

<br>

<!-- URLs -->
[gui]: https://github.com/ChrisRM/material-theme-jetbrains
[gui-inst]: https://github.com/ChrisRM/material-theme-jetbrains#installation
[settings]: https://www.jetbrains.com/idea/help/accessing-settings.html#openIdeSettings

[editor]: https://github.com/ciscorucinski/ChroMATERIAL
[editor-inst]: https://github.com/ciscorucinski/ChroMATERIAL#installation

[holo-logcat]: https://plus.google.com/+Matou%C5%A1Sk%C3%A1la/posts/VJhgiXmTM3f

<!-- Images -->
[as1]: /post-content/deuglifying-android-studio/prettyAS-1.png
[as1-sm]: /post-content/deuglifying-android-studio/prettyAS-1-small.png "Android Studio in Distraction Free mode w/⌘⇧a menu open on a .gradle file"
[as2]: /post-content/deuglifying-android-studio/prettyAS-2.png
[as2-sm]: /post-content/deuglifying-android-studio/prettyAS-2-small.png "Android Studio in Distraction Free mode w/just Logcat opened"
[as3]: /post-content/deuglifying-android-studio/prettyAS-3.png
[as3-sm]: /post-content/deuglifying-android-studio/prettyAS-3-small.png "Android Studio in Distraction Free mode w/Logcat, Project opened on a .java file"
[as4]: /post-content/deuglifying-android-studio/prettyAS-4.png
[as4-sm]: /post-content/deuglifying-android-studio/prettyAS-4-small.png "Android Studio in Cluttered Mode™ on a .gradle file"
