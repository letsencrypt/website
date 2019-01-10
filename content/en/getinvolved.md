---
title: Get Involved
slug: getinvolved
top_graphic: 5
menu:
  main:
    weight: 60
    parent: donate
---

## Community

We can always use help answering questions at [Let's Encrypt Community Support](https://community.letsencrypt.org/). See [this blog post](https://letsencrypt.org/2015/08/13/lets-encrypt-community-support.html) about why community support contributions are so important.

## Code

We can also use help with software development. All of our code is on [GitHub](https://github.com/letsencrypt/).

### Client Software

[Certbot](https://github.com/certbot/certbot) is a Python-based utility that works alongside your webserver to automatically obtain a certificate and convert a website to HTTPS. Certbot is the client we recommend that most people start with. Many other [third party client options](https://letsencrypt.org/docs/client-options/) are available.

### Server-side CA Software

[Boulder](https://github.com/letsencrypt/boulder) is the Let's Encrypt CA implementation. It's based on the [ACME](https://github.com/ietf-wg-acme/acme) protocol, and written primarily in Go. A great place to start is with the list of ['help wanted' issues](https://github.com/letsencrypt/boulder/issues?q=is%3Aopen+is%3Aissue+label%3Astatus%2Fhelp-wanted) and the [contributors guide](https://github.com/letsencrypt/boulder/blob/master/CONTRIBUTING.md).

### letsencrypt.org

You can improve this website and the documentation [here](https://github.com/letsencrypt/website) or help with its [translations](https://github.com/letsencrypt/website/blob/master/TRANSLATION.md)

## Protocol

The Let's Encrypt CA talks to certificate management software running on web servers.  The protocol for this is called ACME, for "Automated Certificate Management Environment." The draft ACME spec is [available on Github](https://github.com/ietf-wg-acme/acme). Work is underway within the IETF to finalize ACME as a truly open standard. You can join the ACME protocol development discussion on [this IETF mailing list](https://www.ietf.org/mailman/listinfo/acme).
