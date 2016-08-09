---
layout: page
title: Get Involved
permalink: /getinvolved/
top_graphic: 5
---

## Community

We can always use help answering questions at [Let's Encrypt Community Support](https://community.letsencrypt.org/). See [this blog post](https://letsencrypt.org/2015/08/13/lets-encrypt-community-support.html) about why community support contributions are so important.

## Code

We can also use help with software development. All of our code and protocol specifications are on [GitHub](https://github.com/letsencrypt/).

### Client Software

[Certbot](https://github.com/certbot/certbot) is a Python-based utility that works alongside Apache to automatically obtain a certificate and convert a website to HTTPS.

Certbot software development can be discussed via IRC chat on [OFTC](https://webchat.oftc.net/?channels=%23certbot).

### Server-side CA Software

[Boulder](https://github.com/letsencrypt/boulder) is the primary Let's Encrypt CA implementation. It's based on the [ACME](https://github.com/letsencrypt/acme-spec) protocol, and written primarily in Go.

## Protocol

The Let's Encrypt CA talks to certificate management software running on web servers.  The protocol for this is called ACME, for "Automated Certificate Management Environment." You can [view the draft ACME spec](https://github.com/letsencrypt/acme-spec) now.  We plan to propose work on this protocol in the IETF soon, to make it a truly open standard.

ACME protocol development can be discussed on [this IETF mailing list](https://www.ietf.org/mailman/listinfo/acme).
