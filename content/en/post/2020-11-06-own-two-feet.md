---
author: Jacob Hoffman-Andrews
date: 2020-11-06T00:00:00Z
excerpt: "When a new Certificate Authority (CA) comes on the scene, it faces a conundrum: In order to be useful to people, it needs its root certificate to be trusted by a wide variety of operating systems (OSes) and browsers. However, it can take years for the OSes and browsers to accept the new root certificate, and even longer for people to upgrade their devices to the newer versions that include that change."
title: "Standing on Our Own Two Feet [Updated]"
slug: own-two-feet
---

> **Update, December 21 2020**
>
> Thanks to community feedback and our wonderful partners at IdenTrust, [we will be able to continue to offer service without interruption](/2020/12/21/extending-android-compatibility.html) to people using older Android devices.  We flagged the content of this blog post that is no longer accurate.

When a new Certificate Authority (CA) comes on the scene, it faces a conundrum: In order to be useful to people, it needs its root certificate to be trusted by a wide variety of operating systems (OSes) and browsers. However, it can take years for the OSes and browsers to accept the new root certificate, and even longer for people to upgrade their devices to the newer versions that include that change. The common solution: a new CA will often ask an existing, trusted CA for a cross-signature, to quickly get it into being trusted by lots of devices.

Five years ago, when Let’s Encrypt launched, that’s exactly what we did. [We got a cross-signature from IdenTrust](https://letsencrypt.org/2015/10/19/lets-encrypt-is-trusted.html). Their “DST Root X3” had been around for a long time, and all the major software platforms trusted it already: Windows, Firefox, macOS, Android, iOS, and a variety of Linux distributions. That cross-signature allowed us to start issuing certificates right away, and have them be useful to a lot of people. Without IdenTrust, Let’s Encrypt may have never happened and we are grateful to them for their partnership. Meanwhile, we issued our own root certificate (“ISRG Root X1”) and applied for it to be trusted by the major software platforms. 

**[This section out of date]** Now, those software platforms have trusted our root certificate for years. ~~And the DST Root X3 root certificate that we relied on to get us off the ground is going to expire - on September 1, 2021.~~ Fortunately, we’re ready to stand on our own, and rely solely on our own root certificate.

However, this does introduce some compatibility woes. Some software that hasn’t been updated since 2016 (approximately when our root was accepted to many root programs) still doesn’t trust our root certificate, ISRG Root X1. Most notably, this includes versions of Android prior to 7.1.1. That means those older versions of Android will no longer trust certificates issued by Let’s Encrypt.

Android has a long-standing and well known issue with operating system updates. There are [lots of Android devices in the world running out-of-date operating systems](https://www.theverge.com/2019/9/4/20847758/google-android-update-problem-pie-q-treble-mainline). The causes are complex and hard to fix: for each phone, the core Android operating system is commonly modified by both the manufacturer and a mobile carrier before an end-user receives it. When there’s an update to Android, both the manufacturer and the mobile carrier have to incorporate those changes into their customized version before sending it out. Often manufacturers decide that’s not worth the effort. The result is bad for the people who buy these devices: many are stuck on operating systems that are years out of date.

Google no longer provides version numbers on its [Distribution Dashboard](https://developer.android.com/about/dashboards), but you can still get some data by downloading [Android Studio](https://www.xda-developers.com/android-version-distribution-statistics-android-studio/). Here’s what the numbers looked like as of September 2020:

![Android Version Distribution as of September 2020](/images/2020.11.06-android-version-distribution.png "Android Version Distribution as of September 2020")

Currently, 66.2% of Android devices are running version 7.1 or above. The remaining 33.8% of Android devices will eventually start getting certificate errors when users visit sites that have a Let’s Encrypt certificate. In our communications with large integrators, we have found that this represents around 1-5% of traffic to their sites. Hopefully these numbers will be lower by the time DST Root X3 expires next year, but the change may not be very significant.

What can we do about this? Well, while we’d love to improve the Android update situation, there’s not much we can do there. We also can’t afford to buy the world a new phone. Can we get another cross-signature? We’ve explored this option and it seems unlikely. It’s a big risk for a CA to cross-sign another CA’s certificate, since they become responsible for everything that CA does. That also means the recipient of the cross-signature has to follow all the procedures laid out by the cross-signing CA. It’s important for us to be able to stand on our own. Also, the Android update problem doesn’t seem to be going away. If we commit ourselves to supporting old Android versions, we would commit ourselves to seeking cross-signatures from other CAs indefinitely.

It’s quite a bind. We’re committed to everybody on the planet having secure and privacy-respecting communications. And we know that the people most affected by the Android update problem are those we most want to help - people who may not be able to buy a new phone every four years. Unfortunately, we don’t expect the Android usage numbers to change much prior to DST Root X3’s expiration. By raising awareness of this change now, we hope to help our community to find the best path forward. 

## [This section out of date] If You Are a Site Owner

As of ~~January 11, 2021~~, [we’re planning to make a change to our API](https://community.letsencrypt.org/t/transition-to-isrgs-root-delayed-until-jan-11-2021/125516) so that ACME clients will, by default, serve a certificate chain that leads to ISRG Root X1. However, it will also be possible to serve an alternate certificate chain for the same certificate that leads to DST Root X3 and offers broader compatibility. This is implemented via the [ACME “alternate” link relation](https://tools.ietf.org/html/rfc8555#section-7.4.2). This is [supported by Certbot from version 1.6.0 onwards](https://community.letsencrypt.org/t/certbot-users-preparing-for-the-isrg-root-transition-january-11-2021/138059). If you use a different ACME client, please check your client’s documentation to see if the “alternate” link relation is supported.

There will be site owners that receive complaints from users and we are empathetic to that being not ideal. We’re working hard to alert site owners so you can plan and prepare. We encourage site owners to deploy a temporary fix (switching to the alternate certificate chain) to keep your site working while you evaluate what you need for a long-term solution: whether you need to run a banner asking your Android users on older OSes to install Firefox, stop supporting older Android versions, drop back to HTTP for older Android versions, or switch to a CA that is installed on those older versions.

## [This section out of date] If You Get Let’s Encrypt Certificates Through Your Hosting Provider 

Your hosting provider may be serving the DST Root X3 until ~~September 2021~~, or they may decide to switch to the certificate chain that leads to ISRG Root X1 after ~~January 11, 2021~~. Please contact them if you have any questions!

## If You Use an Older Version of Android

If you're on an older version of Android, we recommend you [install Firefox Mobile](https://www.mozilla.org/en-US/firefox/mobile/), which supports Android 5.0 and above as of the time of writing.

Why does installing Firefox help? For an Android phone’s built-in browser, the list of trusted root certificates comes from the operating system - which is out of date on these older phones. However, Firefox is currently unique among browsers - it ships with its own list of trusted root certificates. So anyone who installs the latest Firefox version gets the benefit of an up-to-date list of trusted certificate authorities, even if their operating system is out of date.

We appreciate your understanding and support both now and over the years as we continue to grow as a CA, making sure people everywhere have access to encryption. We will provide any future updates on how this root transition affects Android devices via [our community forum post](https://community.letsencrypt.org/t/transition-to-isrgs-root-delayed-until-jan-11-2021/125516). Our community is always ready to help should you have any questions about this change: [community.letsencrypt.org](https://community.letsencrypt.org). 

We depend on contributions from our supporters in order to provide our services. If your company or organization would like to [sponsor](https://letsencrypt.org/become-a-sponsor/) Let’s Encrypt please email us at [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org). We ask that you make an [individual contribution](https://letsencrypt.org/donate/) if it is within your means.

## If You Are an App Developer

If you develop an Android app, you can ship an update that adds ISRG Root X1 as a trusted root within the context of your app. There is a discussion about ways to do so in [this forum thread](https://community.letsencrypt.org/t/mobile-client-workarounds-for-isrg-issue/137807), and [this GitHub issue](https://github.com/square/okhttp/issues/6403) (on a third-party repository).
