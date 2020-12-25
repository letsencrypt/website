---
title: lencr.org
slug: lencr.org
top_graphic: 1
date: 2020-12-04
lastmod: 2020-12-04
untranslated: 1
---

{{< lastmod >}}

# What's lencr.org?

`lencr.org` is a domain owned by Let's Encrypt. We use it to host OCSP, CRLs,
and issuer certificates: all the URLs that show up in certificates.

We used to use longer URLs like `http://ocsp.int-x3.letsencrypt.org/`. However,
when we issued our [new root and intermediate certificates][1], we wanted to
make them as small as possible. Every HTTPS connection on the web (billions per
day) has to send a copy of a certificate, so every byte matters. We chose
`lencr.org` because of its similarity with our name: **L**et's **ENCR**ypt. We
pronounce it much like the fictional region of [Lancre] in Terry Pratchett's
_Discworld_ novels.

[1]: https://letsencrypt.org/2020/09/17/new-root-and-intermediates.html
[Lancre]: https://discworld.fandom.com/wiki/Lancre
