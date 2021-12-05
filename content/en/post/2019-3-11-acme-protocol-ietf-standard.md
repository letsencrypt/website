---
author: Josh Aas, ISRG Executive Director
date: 2019-03-11T00:00:00Z
excerpt: "It has long been a dream of ours for there to be a standardized protocol for certificate issuance and management. That dream has become a reality now that the IETF has standardized the ACME protocol as RFC 8555."
title: "The ACME Protocol is an IETF Standard"
slug: acme-protocol-ietf-standard
---

It has long been a dream of ours for there to be a standardized protocol for certificate issuance and management. That dream has become a reality now that the IETF has standardized the ACME protocol as [RFC 8555](https://tools.ietf.org/html/rfc8555). I’d like to thank everyone involved in that effort, including Let’s Encrypt staff and other IETF contributors.

Having a standardized protocol for certificate issuance and management is important for two reasons. First, it improves the quality of the software ecosystem because developers can focus on developing great software for a single protocol, instead of having many pieces of less well maintained software for bespoke APIs. Second, a standardized protocol makes switching from one CA to another easier by minimizing technical dependency lock-in.

We consider the standardized version of the ACME protocol to be the second major version of ACME, so we refer to it as ACMEv2. The first version, which we call ACMEv1, is the version of ACME that Let’s Encrypt has used since our launch in 2015. Now that ACMEv2 is standardized, [we are announcing an end-of-life plan for our ACMEv1 support](https://community.letsencrypt.org/t/end-of-life-plan-for-acmev1/88430).

Let’s Encrypt is currently providing certificates for more than 150 million websites. We look forward to being able to serve even more websites as efforts like this make deploying HTTPS with Let’s Encrypt even easier. If you’re as excited about the potential for a 100% HTTPS Web as we are, please consider [getting involved](https://letsencrypt.org/getinvolved/), [making a donation](https://letsencrypt.org/donate/), or [sponsoring Let’s Encrypt](https://letsencrypt.org/become-a-sponsor/).
