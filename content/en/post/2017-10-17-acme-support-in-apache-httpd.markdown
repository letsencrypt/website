---
author: Josh Aas, ISRG Executive Director
date: 2017-10-17T00:00:00Z
excerpt: We’re excited that support for getting and managing TLS certificates via
  the ACME protocol is coming to the Apache HTTP Server Project (httpd).
title: ACME Support in Apache HTTP Server Project
slug: acme-support-in-apache-httpd
---

We’re excited that support for getting and managing TLS certificates via the [ACME protocol](https://tools.ietf.org/html/draft-ietf-acme-acme-07) is coming to the [Apache HTTP Server Project (httpd)](https://httpd.apache.org/). ACME is the protocol used by Let’s Encrypt, and hopefully other Certificate Authorities in the future. We anticipate this feature will significantly aid the adoption of HTTPS for new and existing websites.

We created Let’s Encrypt in order to make getting and managing TLS certificates as simple as possible. For Let’s Encrypt subscribers, this usually means obtaining an ACME client and executing some simple commands. Ultimately though, we’d like for most Let’s Encrypt subscribers to have ACME clients built in to their server software so that obtaining an additional piece of software is not necessary. The less work people have to do to deploy HTTPS the better!

ACME support being built in to one of the world’s most popular Web servers, Apache httpd, is great because it means that deploying HTTPS will be even easier for millions of websites. It’s a huge step towards delivering the ideal certificate issuance and management experience to as many people as possible.

The Apache httpd ACME module is called mod_md. It’s currently in the [development version of httpd](https://svn.apache.org/viewvc/httpd/httpd/trunk/modules/md/) and a plan is being formulated to backport it to an httpd 2.4.x stable release. The mod_md code is also [available on GitHub](https://github.com/icing/mod_md).

<div style="text-align: center;"><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/gNJUpzNNWMw?rel=0" style="border: none;" allowfullscreen></iframe></div>

It’s also worth mentioning that the development version of Apache httpd now includes support for an [SSLPolicy directive](https://httpd.apache.org/docs/trunk/mod/mod_ssl.html#sslpolicy). Properly configuring TLS has traditionally involved making a large number of complex choices. With the SSLPolicy directive, admins simply select a modern, intermediate, or old TLS configuration, and sensible choices will be made for them.

Development of mod_md and the SSLPolicy directive has been [funded by Mozilla](https://blog.mozilla.org/blog/2017/10/03/mozilla-awards-half-million-open-source-projects/) and carried out primarily by Stefan Eissing of [greenbytes](https://www.greenbytes.de/). Thank you Mozilla and Stefan!

Let’s Encrypt is currently providing certificates for more than 55 million websites. We look forward to being able to serve even more websites as efforts like this make deploying HTTPS with Let’s Encrypt even easier. If you’re as excited about the potential for a 100% HTTPS Web as we are, please consider [getting involved](https://letsencrypt.org/getinvolved/), [making a donation](https://letsencrypt.org/donate/), or [sponsoring](https://www.abetterinternet.org/sponsor/) Let’s Encrypt.
