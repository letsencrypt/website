---
author: Josh Aas, ISRG Executive Director
date: 2018-08-06T00:00:00Z
excerpt: As of the end of July 2018, the Let’s Encrypt root, ISRG Root X1, is directly trusted by Microsoft products. Our root is now trusted by all major root programs, including Microsoft, Google, Apple, Mozilla, Oracle, and Blackberry.
title: "Let's Encrypt Root Trusted By All Major Root Programs"
slug: trusted-by-all-major-root-programs
---

As of the end of July 2018, the Let’s Encrypt root, [ISRG Root X1](https://letsencrypt.org/certificates/), is directly trusted by Microsoft products. Our root is now trusted by all major root programs, including Microsoft, Google, Apple, Mozilla, Oracle, and Blackberry.

Today’s announcement that we’re trusted by all major root programs represents a major milestone for us, but it’s not the conclusion of our journey towards being directly trusted everywhere.

Certificates from Let’s Encrypt have been widely trusted [since our first issuance](https://letsencrypt.org/2015/10/19/lets-encrypt-is-trusted.html) because of a cross-signature from another CA called IdenTrust. Browsers and operating systems have not, by default, directly trusted Let’s Encrypt certificates, but they trust IdenTrust, and IdenTrust trusts us, so we are trusted indirectly. IdenTrust is a critical partner in our effort to secure the Web, as they have allowed us to provide widely trusted certificates from day one.

While Let’s Encrypt is now directly trusted by almost all newer versions of operating systems, browsers, and devices, there are still many older versions in the world that do not directly trust Let’s Encrypt. Some of those older systems will eventually be updated to trust Let’s Encrypt directly. Some will not, and we’ll need to wait for the vast majority of those to cycle out of the Web ecosystem. We expect this will take at least five more years, so we plan to use a cross signature until then.

As a subscriber of Let’s Encrypt, today’s milestone does not require any action on your part.  Just continue to use best practices, including making sure that your ACME client (e.g. Certbot or an alternative) is regularly receiving software updates.

Let’s Encrypt is currently providing certificates for more than 115 million websites. We look forward to being able to serve even more websites as efforts like this make deploying HTTPS with Let’s Encrypt even easier. If you’re as excited about the potential for a 100% HTTPS Web as we are, please consider [getting involved](https://letsencrypt.org/getinvolved/), [making a donation](https://letsencrypt.org/donate/), or [sponsoring Let’s Encrypt](https://letsencrypt.org/become-a-sponsor/).
