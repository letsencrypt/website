---
author: Jacob Hoffman-Andrews
date: 2021-10-01T00:00:00Z
excerpt: "Information related to DST CA Root X3 expiration"
title: "Resources for Certificate Chaining Help"
slug: cert-chaining-help
---

As planned, the DST Root CA X3 has [expired](https://letsencrypt.org/docs/dst-root-ca-x3-expiration-september-2021/) and we're now using our own ISRG Root X1 for trust. We used a cross-sign with DST Root CA X3 to gain broad trust for our certificates when we were just starting out. Now our own root is widely trusted.

For most websites, it was just another day on the Internet, but inevitably with such a big change some sites and configurations have issues. Our [overview of the planned expiration](https://letsencrypt.org/docs/dst-root-ca-x3-expiration-september-2021/) is here. You can read about [what we've done to make the process smoother](https://letsencrypt.org/2020/12/21/extending-android-compatibility.html). Most problems can be solved by updating the software on the machine that is having trouble.

You may also find these links helpful:

[Our certificate compatibility page.](https://letsencrypt.org/docs/certificate-compatibility/)

[Workarounds for OpenSSL 1.0.2.](https://www.openssl.org/blog/blog/2021/09/13/LetsEncryptRootCertExpire/)

Whenever there is a significant change to our API, we post in the [API Announcements](https://community.letsencrypt.org/c/api-announcements/18) category in our community forum. Sign in and click the bell for notifications to be sent to your email! If you want to hear even more from Let’s Encrypt and the nonprofit team behind it, [subscribe to our newsletter](https://mailchi.mp/letsencrypt.org/fjp6ha1gad). You’ll only receive a handful of emails each year.

We (and our community) are here for you! If you have any questions about this change, search on our community forum or post on the [thread](https://community.letsencrypt.org/t/help-thread-for-dst-root-ca-x3-expiration-september-2021/149190/361) we have to help you with this very topic.

## Supporting Let’s Encrypt
As a nonprofit project, 100% of our funding comes from contributions from our community of users and supporters. We depend on their support in order to provide our services for the public benefit. If your company or organization would like to [sponsor](https://www.abetterinternet.org/sponsor/) Let’s Encrypt please email us at [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org). If you can support us with a [donation](https://letsencrypt.org/donate/), we ask that you make an individual contribution.
