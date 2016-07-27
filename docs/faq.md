---
layout: page
title: FAQ
permalink: /docs/faq/
top_graphic: 1
---

[<- Back to Documentation List](/docs/)

## When can I get a certificate from Let's Encrypt?

Today! [Visit this page to get started](https://letsencrypt.org/getting-started/).

## Are certificates from Let’s Encrypt trusted by my browser?

For most browsers and operating systems, yes. See the [compatibility list](/docs/certificate-compatibility/) for more detail.

## Will Let’s Encrypt issue certificates for anything other than SSL/TLS for websites?

Let’s Encrypt certificates will be standard Domain Validation certificates, so you can use them for any server that uses a domain name, like web servers.

## Can I use certificates from Let’s Encrypt for code signing or email encryption?

No. Email encryption and code signing require a different type of certificate than Let’s Encrypt will be issuing.

## Will Let’s Encrypt generate or store the private keys for my certificates on Let’s Encrypt’s servers?

No. Never.

The private key is always generated and managed on your own servers, not by the Let's Encrypt certificate authority.

## Will Let’s Encrypt issue Organization Validation (OV) or Extended Validation (EV) certificates?

We have no plans to issue OV or EV certificates.

## Can I get a certificate for multiple domain names (SAN certificates)?

Yes, the same certificate can apply to several different names using the Subject Alternative Name (SAN) mechanism. The resulting certificates will be accepted by browsers for any of the domain names listed in them.

## Will Let’s Encrypt issue wildcard certificates?

We currently have no plans to do so, but it is a possibility in the future. Hopefully wildcards aren’t necessary for the vast majority of our potential subscribers because it should be easy to get and manage certificates for all subdomains.

## Is there a Let's Encrypt (ACME) client for my operating system?

There are a large number of [client implementations](/docs/client-options/) available. Chances are something works well on your operating system. We recommend starting with [CertBot](https://certbot.eff.org/).

## Can I use an existing private key or Certificate Signing Request (CSR)?

Yes, but not all clients support this feature. [CertBot](https://certbot.eff.org/) does.

## What IP addresses will Let's Encrypt use to validate my web server?

We don't publish a list of IP addresses we use to validate, because they may change at any time. In the future we may validate from multiple IP addresses at once.

## What signing algorithms does Let's Encrypt support in a Certificate Signing Request (CSR)?

We currently support RSA signatures and ECDSA signatures using the NIST curves P-256 and P-384. We do not support P-521.
