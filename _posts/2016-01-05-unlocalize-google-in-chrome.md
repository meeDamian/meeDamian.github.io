---
layout: post
title: Unlocalize Google Chrome Omnibar
thumbnail: /post-content/unlocalize-google/google-cn.png
date: 2016-01-05
tags: [google, trick, chrome]
category: tricks
---

If you travel a lot or use a VPN, then at some point, Google  might start to, wrongfully, think that you'd rather use some outdated local domain.

### Steps to fix it:

1. Go to `chrome://settings/searchEngines` (copy-paste it into your address bar)
1. In the `Default search settings` section find "Google"
  * Rename `Google` to ex. `Google (Annoying)` in the 1st field
  * Change `google.com` to ex. `Google.annoying` in the 2nd field
  * Copy URL¹ from the 3rd field
1. Scroll to the bottom of the `Other search engines` section
1. Add a new search engine:
  * Put `Google` into the 1st field
  * Put `google.com` into the 2nd field
  * Paste the ¹URL from your clipboard into the 3rd field
  * In the pasted URL replace `{google:baseURL}` with `https://google.com/`
1. Set this search engine as a default
1. Close & Enjoy


#### Redirect examples:

| **Thailand** | **Taiwan** |
|:-:|:-:|
| [![screenshot][google-th]][google-th] | [![screenshot][google-tw]][google-tw] |

<br />

| **China** |
|:-:|
| [![screenshot-main][google-cn]][google-cn] |


[google-th]: /post-content/unlocalize-google/google-th.png
[google-cn]: /post-content/unlocalize-google/google-cn.png
[google-tw]: /post-content/unlocalize-google/google-tw.png
