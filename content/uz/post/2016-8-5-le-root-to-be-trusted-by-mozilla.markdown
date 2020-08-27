---
author: Josh Aas, ISRG Executive Director
date: 2016-08-05T00:00:00Z
excerpt: The Let’s Encrypt root key (ISRG Root X1) will be trusted by default in Firefox
  50, which is scheduled to ship in Q4 2016.
title: Let's Encrypt Root to be Trusted by Mozilla
slug: le-root-to-be-trusted-by-mozilla
---

The Let’s Encrypt root key (ISRG Root X1) will be trusted by default in Firefox 50, which is scheduled to ship in Q4 2016. Acceptance into the Mozilla root program is a major milestone as we aim to rely on our own root for trust and have greater independence as a certificate authority (CA).

Public CAs need their certificates to be trusted by browsers and devices. CAs that want to issue independently under their own root accomplish this by either buying an existing trusted root, or by creating a new root and working to get it trusted. Let’s Encrypt chose to go the second route.

Getting a new root trusted and propagated broadly can take 3-6 years. In order to start issuing widely trusted certificates as soon as possible, we partnered with another CA, IdenTrust, which has a number of existing trusted roots. As part of that partnership, an IdenTrust root “vouches for” the certificates that we issue, thus making our certificates trusted. We’re incredibly grateful to IdenTrust for helping us to start carrying out our mission as soon as possible.

<p class="text-center"><img src="/images/le-firefox-chain-of-trust.png" alt="Chain of trust between Firefox and Let's Encrypt certificates." style="width: 650px; margin-bottom: 17px;"/><br><em>Chain of Trust Between Firefox and Let's Encrypt Certificates</em></p>

However, our plan has always been to operate as an independently trusted CA. Having our root trusted directly by the Mozilla root program represents significant progress towards that independence.

We have also applied to the Microsoft, Apple, Google, Oracle and Blackberry root programs. We look forward to acceptance into these programs as well.

Let’s Encrypt depends on industry and community support. Please consider [getting involved](https://letsencrypt.org/getinvolved/), and if your company or organization would like to sponsor Let’s Encrypt please email us at [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org).
