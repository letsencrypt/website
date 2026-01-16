---
author: Matthew McPherrin
date: 2026-01-15T00:00:00Z
slug: IP-and-6day-general-availability
title: "6-day and IP Address Certificates are Generally Available"
excerpt: "Short certificates are good for security and now available to all Let's Encrypt subscribers."
display_default_footer: true
display_inline_newsletter_embed: false
---

Short-lived and IP address certificates are now generally available from Let's Encrypt. These certificates are valid for 160 hours, just over six days. In order to get a short-lived certificate subscribers simply need to select the 'shortlived' [certificate profile](https://letsencrypt.org/docs/profiles/) in their ACME client.

Short-lived certificates improve security by requiring more frequent validation and reducing reliance on unreliable revocation mechanisms. If a certificate's private key is exposed or compromised, revocation has historically been the way to mitigate damage prior to the certificate's expiration. Unfortunately, revocation is an unreliable system so many relying parties continue to be vulnerable until the certificate expires, a period as long as 90 days. With short-lived certificates that vulnerability window is greatly reduced.

Short-lived certificates are opt-in and we have no plan to make them the default at this time. Subscribers that have fully automated their renewal process should be able to switch to short-lived certificates easily if they wish, but we understand that not everyone is in that position and generally comfortable with this significantly shorter lifetime. We hope that over time everyone moves to automated solutions and we can demonstrate that short-lived certificates work well.

Our default certificate lifetimes will be going from 90 days down to 45 days over the next few years, [as previously announced](https://letsencrypt.org/2025/12/02/from-90-to-45).

IP address certificates allow server operators to authenticate TLS connections to IP addresses rather than domain names. Let's Encrypt supports both IPv4 and IPv6. IP address certificates must be short-lived certificates, a decision we made because IP addresses are more transient than domain names, so validating more frequently is important. You can learn more about our IP address certificates and the use cases for them from our [post announcing our first IP Certificate](https://letsencrypt.org/2025/07/01/issuing-our-first-ip-address-certificate).

We'd like to thank the Open Technology Fund and Sovereign Tech Agency, along with our [Sponsors](https://www.abetterinternet.org/sponsors/) and Donors, for supporting the development of this work.