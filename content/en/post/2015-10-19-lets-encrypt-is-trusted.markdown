---
author: Josh Aas, ISRG Executive Director
date: 2015-10-19T00:00:00Z
excerpt: We’re pleased to announce that we’ve received cross-signatures from IdenTrust,
  which means that our certificates are now trusted by all major browsers. This is
  a significant milestone since it means that visitors to websites using Let's Encrypt
  certificates can enjoy a secure browsing experience with no special configuration
  required.
title: Let's Encrypt is Trusted
slug: lets-encrypt-is-trusted
---

We’re pleased to announce that we’ve received cross-signatures from <a href="https://identrustssl.com/">IdenTrust</a>, which means that our certificates are now trusted by all major browsers. This is a significant milestone since it means that visitors to websites using Let's Encrypt certificates can enjoy a secure browsing experience with no special configuration required.

Both Let’s Encrypt intermediate certificates, Let’s Encrypt Authority X1 and Let’s Encrypt Authority X2, received cross-signatures. Web servers will need to be configured to serve the appropriate cross-signature certificate as part of the trust chain. The Let’s Encrypt client will handle this automatically.

You can see an example of a server using a Let's Encrypt certificate under
a new cross-signed intermediate [here](https://helloworld.letsencrypt.org/).

Vital personal and business information is flowing over the Internet more frequently than ever, and it's time to encrypt all of it. That's why we created Let's Encrypt, and we're excited to be one <em>big</em> step closer to bringing secure connections to every corner of the Web.
