---
layout: page
title: FAQ
permalink: /docs/faq/
top_graphic: 1
date: 2016-07-07T00:00
---

Last updated: {{ page.date | date: "%B %d, %Y" }} \| [See all Documentation](/docs/)

## Are certificates from Let’s Encrypt trusted by my browser?

For most browsers and operating systems, yes. See the [compatibility list](/docs/certificate-compatibility/) for more detail.

## Does Let's Encrypt issue certificates for anything other than SSL/TLS for websites?

Let’s Encrypt certificates are standard Domain Validation certificates, so you can use them for any server that uses a domain name, like web servers, mail servers, FTP servers, and many more.

Email encryption and code signing require a different type of certificate that Let’s Encrypt does not issue.

## Does Let’s Encrypt generate or store the private keys for my certificates on Let’s Encrypt’s servers?

No. Never.

The private key is always generated and managed on your own servers, not by the Let's Encrypt certificate authority.

## Will Let’s Encrypt issue Organization Validation (OV) or Extended Validation (EV) certificates?

We have no plans to issue OV or EV certificates.

## Can I get a certificate for multiple domain names (SAN certificates or UCC certificates)?

Yes, the same certificate can contain several different names using the Subject Alternative Name (SAN) mechanism.

## Will Let’s Encrypt issue wildcard certificates?

We currently have no plans to do so, but it is a possibility in the future. Hopefully wildcards aren’t necessary for the vast majority of our potential subscribers because it should be easy to get and manage certificates for all subdomains.

## Is there a Let's Encrypt (ACME) client for my operating system?

There are a large number of [ACME clients](/docs/client-options/) available. Chances are something works well on your operating system. We recommend starting with [Certbot](https://certbot.eff.org/).

## Can I use an existing private key or Certificate Signing Request (CSR)?

Yes, but not all clients support this feature. [Certbot](https://certbot.eff.org/) does.

## What IP addresses does Let's Encrypt use to validate my web server?

We don't publish a list of IP addresses we use to validate, because they may change at any time. In the future we may validate from multiple IP addresses at once.
