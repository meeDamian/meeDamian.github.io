---
layout: post
title: Publishing with Gradle (Revisited)
date: 2015-03-31
tags: [android, gradle, android studio, apk]
category: advice
---

> **tl;wr:** use [this](https://goo.gl/LNyhfj).

#### Paragraph that everybody will ignore

Since [my last post](/post/publishing-with-gradle) a lot has changed, broken down and [new things](https://developers.google.com/android-publisher/#publishing) are possible. Let's see what can be done now.


### Configuration

#### Handling missing variables

Previously `gradle.properties` contained sensitive info (passwords, duh), so it had to be `.gitignore`'d, that caused _`Could not find property`_ errors just after repo clone and [was unusable](/post-content/gradle-revisited/ship.io-screenshot.png) on CI systems. It can be fixed by adding:

```groovy
// returns value of requested variable or default (as a fallback)
String safeGet(String name, String defaultValue = '') {
  hasProperty(name) ? project[name] : defaultValue
}
// returns file from a path provided in properties file
File safeGetFile(String name) {
    String fileName = safeGet(name, null)
    fileName != null ? file(fileName) : null
}
```

And replacing all `project.VARIABLE` occurunces with `safeGet('VARIABLE')`. Use `safeGetFile('VARIABLE')` to get files.

**NOTE:** Variable name is **quoted** in a function call.

That little trick disables [instacrash™](https://www.urbandictionary.com/define.php?term=Instacrash) functionality on the gradle part.


#### Extracting _secret_ variables

Now, let's get **local** `gradle.properties` file back to the repo. To do that we need to move all _super-secret variables_ somewhere safe and outside of the repo. Luckily, gradle by default also reads its **global** properties file: **`~/.gradle/gradle.properties`**.

```bash
# release builds dir
# That's the default releases dir, you can override it
# for a specific project in its local gradle.properties file.
RELEASES_PARENT_DIR=/Users/mee/dev/android/binaries/

# release build signing
STORE_FILE=/Users/mee/dev/android/keys/keyname
STORE_PASSWORD=superSecretKeyPassword

# if you use one (or default) key for all apps you can include
# KEY_ALIAS and KEY_PASSWORD here. I discourage it though.
```

#### Setting local properties

The only _required_ variable in a local `gradle.properties` is `KEY_ALIAS`.

```bash
# Override name of the folder created in RELEASES_PARENT_DIR;
#   default is project name
FOLDER_NAME=designAdvice

# Name of the key used to sign APK in this project
KEY_ALIAS=myKeyAlias
```

**NOTE:** Remember to remove `gradle.properties` exclusion from `.gitignore` file.

If you use the same password for store and its keys you can [skip to the next section](#signing-and-getting-release-builds), otherwise there's one more thing to do.


#### Setting key-specific password

Create `secret.properties` file in the **project root**:

```bash
# Key-specific password
KEY_PASSWORD=AnotherSuperSecretPass
```
**IMPORTANT:** remember to add this file to `.gitignore`!!!

Then create a function to safely attach properties to the `project` object:

```groovy
// attach new global property to the `project`. Will not override by default
def safeLoad(String name, Object value, Boolean override = false) {
  if (!hasProperty(name) || override)
    project.set name, value
}
```

And finally load properties from a file:

```groovy
// loads variables from a file to `project` so they can be `safeGet`-ed later
File secretPropsFile = file('../secret.properties')
if (secretPropsFile.exists()) {
  Properties p = new Properties()
  p.load(new FileInputStream(secretPropsFile))
  p.each { name, value ->
    safeLoad name as String, value
  }
}
```

**IMPORTANT:** this last snippet **must be above** `android {}` declaration.

### Signing and getting release builds

#### Release APK

Once that is setup, let's take care of output APK file:

```groovy
  buildTypes {
    release {
      proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
      signingConfig signingConfigs.release as Object
      minifyEnabled true
      zipAlignEnabled true

      /* construct releases dir.
        Default is `~/APKs/<projectName>`
      */
      File releasesDir = new File(
        safeGet('RELEASES_PARENT_DIR', '~/APKs'),
        safeGet('FOLDER_NAME', project.group as String)
      )

      // create path if doesn't exist
      if (!releasesDir.exists())
        releasesDir.mkdirs()

      android.applicationVariants.all { variant ->
        variant.outputs.each { output ->
          if (output.name == "release") {

            /* base file name in a form of:
              [package]-[versionType]-[versionName]-[versionCode]
              ex. com.meedamian.testApp-release-1.0.0-1111
            */
            String fileName = [
              defaultConfig.applicationId,
              project.name,
              defaultConfig.versionName,
              defaultConfig.versionCode
             ].join('-')

            // set desired path and name of the output APK file
            output.outputFile = new File(releasesDir, fileName + '.apk')

            // mapping.txt file code
          }
        }
      }
    }
  }
```

#### Proguard's `mappings.txt` file

If you'd also want to move mappings file replace `// mapping.txt file code` with:

```groovy
// copy mappings.txt
if (variant.getBuildType().isMinifyEnabled()) {

  File mappingDir = new File(releasesDir, 'mappings')
  if (!mappingDir.exists())
    mappingDir.mkdirs()

  assemble << {
    copy {
      from variant.mappingFile
      into mappingDir
      rename 'mapping.txt', "mapping-${fileName}.txt"
    }
  }
}
```

### (Optional) Auto-incrementing `versionCode`

I know it's nasty, and **I would love to see suggestions on how this can be done better :)**.

#### Put this anywhere in `build.gradle`:

```groovy
Integer getBuildVersion(defaultVersion, Boolean increment = false) {
  File verFile = file('../version.properties')

  if (!verFile.canRead())
    verFile.createNewFile()

  Properties props = new Properties()

  props.load new FileInputStream(verFile)
  String currentCodeVersion = props['VERSION_CODE']

  if (currentCodeVersion == null)
    currentCodeVersion = defaultVersion ?: android.defaultConfig.versionCode

  if (increment) {
    Integer bumpedCodeVersion = currentCodeVersion.toInteger() + 1
    android.defaultConfig.versionCode = bumpedCodeVersion

    props['VERSION_CODE'] = bumpedCodeVersion.toString()

    props.store verFile.newWriter(), "Build version updated with each release build"
    currentCodeVersion = bumpedCodeVersion
  }

  currentCodeVersion as Integer
}
```

#### Replace all `versionCode` references with calls to `getBuildVersion()`:

First one is `defaultConfig` definition:

```groovy
defaultConfig {
  applicationId "com.yourPackage.someMore"
  minSdkVersion 15 // because #minSDK15
  targetSdkVersion 22
  versionCode getBuildVersion(1)
  versionName "0.0.1"
}
```

Second one is `fileName` construction:

```groovy
String fileName = [
  defaultConfig.applicationId,
  project.name,
  defaultConfig.versionName,
  getBuildVersion(android.defaultConfig.versionCode, true)
].join('-')
```


### Publishing to the [Play Store](https://play.google.com/apps/publish/)

It appears that it's a wider topic and I'll address it in a next post. (But if you don't feel like waiting - use [this awesome plugin](https://github.com/Triple-T/gradle-play-publisher)).


### Edits

Since originally published this article was edited:

1. [Auto-increment improvements](https://github.com/chester1000/meeDamian.com/commit/c50aad0a72dfef23e2f5cac6bef6ff3cd4f39f2b)

2. [`safeGetFile()` fn introduced and `getBuildVersion()` calls fixed](https://github.com/chester1000/meeDamian.com/commit/f0c5ddf2efa7e4c6b5c16aa7d5ae91feed3e03d2)


> And that's it. **Here's a [complete version](https://goo.gl/LNyhfj) again.**
