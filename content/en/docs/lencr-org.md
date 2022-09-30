---
title: lencr.org
slug: lencr.org
top_graphic: 1
date: 2021-11-30
lastmod: 2022-09-30
show_lastmod: 1
---


# What's `lencr.org`?

`lencr.org` is a domain name owned by Let's Encrypt. We use it to host data
that is referenced inside the certificates we issue.

# Why is my computer fetching this data? Is it malicious?

No, the data on `lencr.org` is never malicious. When a device connects to
`lencr.org`, it's because client software on that device (like a web browser or
an app) connected to another site, saw a Let's Encrypt certificate, and is
trying to verify that it's valid. This is routine for many clients.

We can't speak to whether the *other site* being connected to is malicious. If
you're investigating network activity that seems unusual, then you may want to
focus on the connection that started just before the connection to `lencr.org`.

The pattern of clients' connections to `lencr.org` might look unusual or
intermittent. Clients might never retrieve this data; only retrieve subsets of
it; or "cache" some data for efficiency, so they'll only access it sometimes
(the first time they need it, and when the data may have expired).

# What exactly is this data for?

When client software (like a web browser or an app) connects to a site, and that
site presents a certificate, the client should verify that the certificate is
authentic and valid. This data helps clients do that in several ways.

* Under `o.lencr.org`, we provide Online Certificate Status Protocol (OCSP) data.
A client may use this data to confirm whether an individual unexpired
certificate that we issued is still valid, or was revoked. (This is only for
"end-entity" or "leaf" certificates, which we've issued to subscribers from one
of our intermediate certificates.)

* Under `c.lencr.org`, we provide Certificate Revocation Lists (CRLs) listing
all the unexpired certificates that we issued and later revoked.

* Under `i.lencr.org`, we provide copies of our intermediate "issuer"
certificates, which are either signed by one of our root certificates or
"cross-signed" by another Certificate Authority (CA). A client may use this
data to confirm the "chain of trust" from the end-entity certificate it's
verifying, via one or more intermediate steps, to a root CA certificate that it
recognizes and trusts.

# Why are connections to `o.lencr.org` over insecure HTTP?

OCSP responses are always served over HTTP. If they were served over HTTPS,
there would be an "infinite loop" problem: in order to verify the OCSP server's
certificate, the client would have to use OCSP.

The OCSP response itself is timestamped and cryptographically signed, so the
anti-tampering properties of TLS aren't needed in this case.

# Why "`lencr.org`"?

We used to use longer URLs like `http://ocsp.int-x3.letsencrypt.org/`. However,
when we issued our [new root and intermediate certificates][1], we wanted to
make them as small as possible. Every HTTPS connection on the web (billions per
day) has to send a copy of a certificate, so every byte matters. We chose
`lencr.org` because of its similarity with our name: **L**et's **ENCR**ypt. We
pronounce it much like the fictional region of [Lancre] in Terry Pratchett's
_Discworld_ novels.

[1]: https://letsencrypt.org/2020/09/17/new-root-and-intermediates.html
[Lancre]: https://wiki.lspace.org/Lancre
