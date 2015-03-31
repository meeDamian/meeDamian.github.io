{{{
  "title" : "Publishing with Gradle (Revisited)",
  "date": "2015-04-01",
  "tags": ["android", "gradle", "android studio", "apk"],
  "category": "advice"
}}}

> **tl;wr:** use [this](https://goo.gl/LNyhfj).

#### Paragraph that everybody will ignore

Since [my last post](/post/publishing-with-gradle) a lot has changed and, apart from previous flow not working with newer versions of Android Studio and Gradle, [new things](https://developers.google.com/android-publisher/#publishing) are now possible. Not to mention that previous flow was not versatile and flexible enough. Let's fix that.


### Configuration

#### Handling missing variables

Previously signing configuration for each project was kept in a `gradle.properties` file. Since it contained sensitive info (key and store passwords) it had to be `.gitignore`'d, and that caused _`Could not find property`_ errors after fresh repo clone and [was unusable](/post-content/gradle-revisited/ship.io-screenshot.png) on CI systems. It can be fixed easily, by just adding a `safeGet` function:

```gradle
// returns value of requested variable or default (as a fallback)
String safeGet(String name, String defaultValue = '') {
  hasProperty(name) ? project[name] : defaultValue
}
```

and then, replacing all `project.VARIABLE` occurunces with `safeGet('VARIABLE')`.

**NOTE:** Variable name is **quoted** in a function call.

That little trick **should** prevent `debug` builds failling due to the lack of `gradle.properties` file (or in fact any missing variable).


#### Extracting _secret_ variables

Now, let's focus on getting **local** `gradle.properties` file back to the repo. To do that we need to move all _super-secret variables_ some place safe and outside of the repo. Luckily, there's another file gradle reads by default - its **global** properties file: **`~/.gradle/gradle.properties`**.

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

The only required variable in a local `gradle.properties` is `KEY_ALIAS`.

```bash
# Override name of the folder created in RELEASES_PARENT_DIR;
#   default is project name
FOLDER_NAME=designAdvice

# Name of the key used to sign APK in this project
KEY_ALIAS=myKeyAlias
```

**NOTE:** Remember to remove `gradle.properties` exclusion from `.gitignore` file.

If you use the same password for store and keys you can [skip to the next section](#signing-release-builds), otherwise there's one more thing we should do.


#### Setting key-specific password

The easiest way I've found was to create `secret.properties` file in the project root. Say:

```bash
# Key-specific password
KEY_PASSWORD=AnotherSuperSecretPass
```
**NOTE:** remember to add this file to `.gitignore`!!!

Then create a function to safely attach properties to the `project` object:

```gradle
// loads variables from a file to `project` so they can be `safeGet`-ed later
def safeLoad(String name, Object value, Boolean override = false) {
  if (!hasProperty(name) || override)
    project.set name, value
}
```

And finally load properties from a file:

```gradle
// read secret variables
File secretPropsFile = file('../secret.properties')
if (secretPropsFile.exists()) {
  Properties p = new Properties()
  p.load(new FileInputStream(secretPropsFile))
  p.each { name, value ->
    safeLoad name as String, value
  }
}
```

**IMPORTANT:** must be **above** `android {}` declaration

### Signing and getting release builds

#### Release APK

Once that is setup, let's take care of output apk file

```gradle
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

If you'd also want to move mappings file replace `// <here>` with:

```gradle
// copy mappings.txt (JIC)
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

### (Optional) Auto-inrementing `versionCode`

I know it's nasty, ond I would love to see suggestions on how this can be done better.

```gradle
task('increaseVersionCode') << { getBuildVersion(null, true) }

tasks.whenTaskAdded { task ->
  if (task.name == 'generateReleaseBuildConfig')
    task.dependsOn 'increaseVersionCode'
}

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

And that's it. **Here's a [complete version](https://goo.gl/LNyhfj) again.**