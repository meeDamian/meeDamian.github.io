{{{
  "title" : "Publishing with Gradle",
  "date": "2014-05-16",
  "tags": ["android", "gradle", "android studio", "apk"],
  "category": "advice"
}}}


#### Redundant intro

As I started my [Android](http://d.android.com) journey with [Eclipse](http://www.eclipse.org/) I was used to wizards
like this:

![Android Studio generate wizard](/publishing-with-gradle/generate-wizard.png)

So, you can imagine my surprise when [this happened](https://plus.google.com/+MaurycyDamianWasilewski/posts/hD7BhwN1cH5).
It was unexpected, but pushed me to learn more about [Gradle](http://www.gradle.org/) build system. At first **gradle**
docs seemed really overwhelming, because they were covering so much more than only publishing production builds (more 
about that in some other posts).


### Step 1 - Know what to click

That's something extreamly simple **and** crucial to make anything else work, yet it took me quite some time to find out.

![Change build to release](/publishing-with-gradle/where-to-click.png)

In your **Android Studio** press `1` to reveal **Build Variants** menu, then from a dropdown list `2` choose **release**
variant. If those _border tabs_ are not visible you can reveal them by pressing `3`. 

**NOTE: don't worry if you don't have `release` there yet - it will show up once we write our script.**


### Step 2 - Know _"the code"_

I have _evolved_ through 3 different [flows](#flows) until I've found the one I like the most. As the last one is also
the most complex I'll cover all 3 of them, so you can choose the one you like to most:

* [Convenient flow](#convenient-flow) - keep credentials in `build.gradle` file,
* [Shared Repo flow](#shared-repo-flow) - input credentials in console,
* [Awesome flow](#awesome-flow) - keep credentials in a separate and `.gitignore`d file.


### Step 3 - Know where to look

Another, and last, thing you must do is to actually retrieve your awesome `.apk` file. This is quite straight forward,
but you have to leave your IDE and point your file manager to:

```bash
cd MyProject/MyApp/build/apk/
```

You can see multiple files there, but the one that interests you the most is called: `MyApp-release.apk`.

I usually copy that file to some external directory, and rename it to sth like: `MyApp-<versionName>.apk`


## Flows

### Convenient flow

This flow is really simple all you have to do is to just input your credentials directly into `MyApp/build.gradle` file. 
You can do it like this:

```gradle
apply plugin 'android'

android {

  // some other gradle magic

  signingConfigs {
    release {
      storeFile     file("path/to/your/keystore.release")
      storePassword "**********"
      keyAlias      "******"
      keyPassword   "**********"
    }    
  }

  buildTypes {
    release {
      signingConfig signingConfigs.release
    }
  }
  
}
```

**WARN: If you've made ANY COMMITS while using this flow, IT IS NOT SAVE FOR YOU TO EVER OPEN-SOURCE THIS REPOSITORY!!!**


### Shared Repo flow

This flow is basically the same, but instead of hard-coding values in a `MyApp/build.gradle` 

```gradle
apply plugin 'android'

android {

  // some other gradle magic

  signingConfigs {
    release {
      storeFile     file( System.console().readLine("\n\$ Enter keystore path: "))
      storePassword       System.console().readPassword("\n\$ Enter keystore password: ")
      keyAlias            System.console().readLine("\n\$ Enter key alias: ")
      keyPassword         System.console().readPassword("\n\$ Enter key password: ")
    }    
  }

  buildTypes {
    release {
      signingConfig signingConfigs.release
    }
  }
  
}
```

### Awesome flow



### Other things to remember

* before build increase both `versionCode` and `versionName` in your `MyApp/build.gradle` file





--------------------
### Notes for later

add `signing.properties` to `.gitignore`
create `signing.properties.template`


### Notes

#### Steps

##### Know what to click
##### Know _"the code"_
##### Know where to search


#### Flows

##### Flow 1 - simple - input creditentials in console
##### Flow 2 - convenient - creds hard-coded in build.gradle
##### Flow 3 - perfect (almost¹) - creds in signing.properties

¹ - change output directory/name


Have any ideas on how to improve my flow even further?