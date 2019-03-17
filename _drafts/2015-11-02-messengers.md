---
layout: post
title: Messengers [Cool/Dull Series]
date: 2015-11-02
tags: [cooldull, facebook, hangouts, google, opinion]
category: review
---

This is a series of posts that highlights _The Great_ and _The Not-So-Great_ parts of the IT industry.

### [Cool] <small>Facebook</small> [Messenger][fb_web] <small>[<i class="mdi mdi-google-play"></i>][fb_play] [<i class="mdi mdi-apple"></i>][fb_apple]</small>

Let's get it out of the picture first: I don't like Facebook. I don't like it at all, okay? I hate their stance on privacy. I think that [facebook.com][fb] interface looks like it wasn't updated for a decade now. I frequently don't agree with choices they've made (in their [techno][hhvm]-[logies][react], [purchases][fb_buys_oculus] or even [the vision itself][fb_privacy]). On top of that you can frequently hear me ~~bitching~~ expressing my opinion on how awful it is.


### [Dull] [Hangouts][hangouts_web] <small>[<i class="mdi mdi-google-play"></i>][hangouts_play] [<i class="mdi mdi-apple"></i>][hangouts_apple] [<i class="mdi mdi-google-chrome"></i>][hangouts_app] [<i class="mdi mdi-google-chrome"></i>][hangouts_ext]</small>

I remember times when Hangouts (then Google Talk) was **the way** to communicate online. I remember when it was handling the vast majority of my communication. However, as the times kept changing and messengers kept evolving, Hangouts stayed far behind. Even though Hangouts was continuously worked on, the majority of changes I remember actually brought more bad than good. Material <small>re</small>Design brought better looks, but made the app unusably slow. Half-assed SMS integration only brought frustration, ex: still no SMS sync. Ditching XMPP haven't brought us much magic - still only one photo at the time, but hey, we have stickers now... And the _"recently"_ added drawing function is still available through some interfaces.

I'm really unable to see any sense in it all. With Google seemingly investing heavily in Android, Project Fi, Hangouts on Air, Google Voice it seems like Hangouts should be the backbone and a glue holding all those products together. It's obviously not the case and I'll do my best to remind you why.


#### Sooooo slooooow

Even after couple of updates focused on performance, this product is still so awfully slow, that I frequently forget what I was going to do there before it even launches.

When I say slow I mean it in two ways: real elapsed time and the time perceived.

Assuming a, purely hypothetical, scenario where I want to send a message using Hangouts, here are the steps:

* **Wait** for Splash Screen¹
* **Wait** for contacts list to load and become usable
* Be distracted by useless "Signed as [...]" SnackBar
* Tap the contact & see a ripple
* **Wait** for anything to happen
* Conversation loads
* **Wait** a little bit more until you can actually type

<small>¹ - I sincerely [dislike those][splash].</small>


#### Notifications

Hangouts being an app made by Google, one would expect it would have notifications polished to perfection, but nope - they suck really bad. First of all, **why on earth** would you group conversations from different people into one notification? There's exactly zero fun in finding the person on the messages list after I already tapped the notification, especially when your app loads so terribly slow.


#### One image at a time

Need to send 10 pictures? Well, you're out of luck. You can either send them some other way or relax practice slow-tapping sending them one-by-one, that _shouldn't_ take you _much_ more than 15 minutes.


#### Zero video at a time

Yes, it's 2015 and not only we don't have hoverboards, we also don't have Hangouts with a _futuristic_ feature of sending a video file.


#### `[to-fix]` Email-based

There are two facts I should start with:

1. The majority of people is completely not _"technical"_,
2. Most _"technical"_ people use more than one email.

As I belong to group #2 I do have multiple email addresses, some private, some for clients, some for strangers etc. But I only


The reason I want someone on Hangouts is so they **don't send me emails**. If I wanted them to send me emails, I would give them one of my emails. I don't want people to send me emails to the address I have hangouts on. And then I end up having people added on different accounts, just so they don't get confused and


#### Confusing voice call button

**Q:** What happens when you click the voice call button above the conversation?<br>
**A:** Randomly calls the other person either on their hangouts or their cell phone number. No way to set it, no way to change it, no way to even guess.


#### Separate _incognito_ chat for video calls

Hangouts video calls are great, m'kay. I love them and use them all the time, **but** there's one really annoying thing about them: internal chat. It's in no way integrated with anything, there's no notifications about messages there and its history is lost once the conversation finishes. It's always a disruption and confusion when someone has to send a link and where-did-you-send-it?-ping-pong begins.


#### SMS

Honestly, I stopped using it couple of versions before, and never even thought about enabling it again. It made Hangouts slow beyond belief and lack of even the simplest sync, made merging hangouts and sms threads only confusing and inconvenient. Perhaps it's fixed now, but I'm afraid to check.


#### _"Signed as [email]"_ snackbar

I get it, [Snackbar][snackbar] is a cool Material Design element, but there's really no point in shoving it in my face every single time I finish my Splash Screen indoctrination.


#### _"Widget no longer available"_

![](/post-content/messengers/hangouts-android-widget.png)

This is not a joke. It's what actually happens when you add a widget to your homescreen - it will just sit there telling you that it's not available.


#### Stickers

I know it's a matter of taste, but those stickers are just plain ugly, they neither carry emotions nor meaning, none of them are "cute", you really can't identify with them and you can't add custom packs. It's just better to never use them. And I never had anyone send me a sticker on Hangouts (unlike FB messenger).


#### No API

Remember times when we were able to use Google Talk via XMPP/Jabber in all those funny little messengers? Some of them even being CLI-based? I do too, and I guess that's why seeing what happens to Hangouts now is so sad and disappointing.


### Broken consistently everywhere

I get it Google, you offer us have plenty choices, and you don't want us to have a broken experience. BUT all the choices you give us are broken in the first place.

Don't get me wrong, those points don't only refer to Hangouts for Android, most of them can be applied to Hangouts in general. Here are some examples for other _interfaces_:


#### Chrome OSX [App][hangouts_app]

I get it, it's really hard to implement _"chat-heads"_-like esthetic on OSX, but if you can give me an OK experience I'd be fine, but...

I've heard you like checking checkboxes, so new you can un-check your "Always On Top"² checkbox after every app reload?

<small>² - Nope, I don't know why every word is capitalized either.</small>


#### Chrome OSX [Extension][hangouts_ext]

As the extension is definately the best way to experience Hangouts, it still has many drawbacks.

##### The invisible, low-resolution icon

Can you spot the icon here?

![Hangouts icon the same color as Upper OSX bar](/post-content/messengers/hangouts-ext-invisible.png)

![Hangouts icon visible after selecting](/post-content/messengers/hangouts-ext-selected.png)

##### Upside down graphics

It's upside down

![](/post-content/messengers/hangouts-ext-hidden.png)

![](/post-content/messengers/hangouts-ext-peek.png)

##### Low resolution

High-resolution (aka. Retina) devices are on the market for millions of years now. Is it really that hard to update couple of graphics here and there?


#### Dedicated [web interface][hangouts_web]

Facebook Messenger has a [great web interface][fb_web]³ I'm using, I would be totally fine with one more pinned tab, but...

It opens conversations in those teeny tiny windows. WHY‽

<small>³ - Seriously, check it out it's great!</small>


### Other:
* iOS first/better
* Ctrl+T on extension


### Good

* Video conferences
* Emoji
* **Form***att*~~ing~~
* "Where are you"


[splash]: https://plus.google.com/+DamianMee/posts/81jQC4rcRTb
[snackbar]: http://developer.android.com/intl/ru/reference/android/support/design/widget/Snackbar.html

[fb]: https://facebook.com
[fb_web]: https://www.messenger.com
[fb_play]: https://play.google.com/store/apps/details?id=com.facebook.orca
[fb_apple]: https://itunes.apple.com/us/app/messenger/id454638411?mt=8
[hhvm]: http://hhvm.com/
[react]: https://facebook.github.io/react/
[fb_buys_oculus]: https://www.facebook.com/zuck/posts/10101319050523971
[fb_privacy]: http://www.theguardian.com/technology/2010/jan/11/facebook-privacy

[hangouts_app]: https://chrome.google.com/webstore/detail/google-hangouts/knipolnnllmklapflnccelgolnpehhpl?hl=en "Chrome App"
[hangouts_ext]: https://chrome.google.com/webstore/detail/google-hangouts/nckgahadagoaajjgafhacjanaoiihapd "Chrome Extension"
[hangouts_web]: https://hangouts.google.com/
[hangouts_play]: https://play.google.com/store/apps/details?id=com.google.android.talk
[hangouts_apple]: https://itunes.apple.com/us/app/hangouts/id643496868?mt=8
