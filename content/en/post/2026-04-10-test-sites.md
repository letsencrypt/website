---
author: Matthew McPherrin
date: 2026-04-10T00:00:00Z
slug: test-sites
title: "The difficulty of making sure your website is broken"
excerpt: "Building automation to ensure having reliably invalid test certificates."
display_support_us_footer: true
display_inline_newsletter_embed: false
---

Have you ever needed to make sure your website has a broken certificate? While many tools exist to help run an HTTPS server with valid certificates, there aren't tools to make sure your certificate is revoked or expired. This is not a problem most people have. Tools to help manage certificates are always focused on avoiding those problems, not creating them.

Let's Encrypt is a Certificate Authority, and so we have unusual problems we need to solve.

One of the requirements for publicly trusted Certificate Authorities is to host websites with test certificates, some of which need to be revoked or expired. This [gets](https://bugzilla.mozilla.org/show_bug.cgi?id=1730291) [messed](https://bugzilla.mozilla.org/show_bug.cgi?id=1904038) [up](https://bugzilla.mozilla.org/show_bug.cgi?id=1947207) more than you might expect, but it's a bit tricky to get right. Test certificate sites exist to allow developers to test their clients, so it's important that they're done right.

We'd previously used certbot, nginx, and some shell scripts, but the shell scripts were getting a bit too complicated. So we wrote a Go program tailored to the specific needs of a CA's test certs site.

## The websites

We need to host three sites per root certificate:

- A **valid** certificate, like any other website.
- An **expired** certificate, past its expiry date.
- A **revoked** certificate, but it can't be expired.

Valid is easy enough; it's the normal case of any other website. This is a solved problem.

Expired, too, is pretty easy. Issue one certificate, wait until it expires, and then you can use it forever. Not a normal feature, but so long as your webserver doesn't get upset at it being expired, it's easy to set up once and leave it.

Revoked, though, is where it's easiest to slip up. You could fail to revoke a certificate and serve a perfectly valid one, or you could let your revoked certificate expire. Making sure your website is serving a non-expired but revoked certificate is not something any of the off-the-shelf tools support.

## The ingredients to bake a cake

In order to implement our program, we need a few different ingredients to mix together.

First and foremost, we need to be able to get certificates. Because we're writing this in Go, we're using [Lego](https://go-acme.github.io/lego/) as a library to request the certificates. Obtaining a certificate requires completing a domain validation challenge. We can hook Lego up to the Go webserver we're using to complete TLS-ALPN-01 validation. We use that challenge type because it doesn't require any more setup beyond exposing our webserver to the internet.

To get a revoked certificate, we request a certificate and then revoke it. That's something we can do with Lego and ACME too: The account which issued a certificate can request it be revoked. We then need a way to check that the certificate is revoked. Certificates contain an HTTP URL pointing to the Certificate Revocation List (CRL) which we poll until our certificate's serial number appears in it.

> Let's Encrypt implements the [ACME standard](https://datatracker.ietf.org/doc/html/rfc8555/), which defines how clients can get certificates. In general, we think ACME clients integrated into webservers are often the best way to get certificates for websites. They can automatically handle challenges, managing and reloading certificates, and overall minimizing the amount of work and reducing problems.

We also need a way to wait until a certificate is in the right state. The valid certificate is ready to use right away, but that's not true for the revoked and expired certificates. The revoked certificate needs to wait at least until it appears in a CRL, which can be up to an hour. Expired certificates need to wait even longer: Even if we request the shortest-lived certificates we offer, that's still six days. To handle this, our program stores a "next" certificate instead of immediately overwriting the current one. We wait at least 24 hours for the revoked certificate to make sure any CRL caches or push-based CRL infrastructure have time to process the revocation. The expired certificate has to wait until it passes its expiration date. After the program decides a certificate is ready, it replaces the current certificate and passes it off to the webserver. Normal ACME tools don't support this because they can usually start using a certificate as soon as it's obtained.

And finally, we need a webserver to host the certificates. We're using Go, which has a great built-in TLS and HTTP serving stack we can use. The Go TLS server takes a GetCertificate callback function that decides what certificate to use for each new connection. We have all our certificates in-memory and select the right one to serve based on the request's [SNI](/docs/glossary/#def-SNI). This function is also where we hook up Lego to serve the challenge certificates required for TLS-ALPN-01. Because we prioritize serving the correct certificate over uptime, we refuse to handle a connection if the corresponding certificate is expired (unless it should be expired!).

## Visiting the sites

If you visit one of our revoked sites, you might not get an error message. Revocation checking in browsers varies pretty widely, and has historically not worked great. Today's state-of-the-art is [Firefox's CRLite](https://hacks.mozilla.org/2025/08/crlite-fast-private-and-comprehensive-certificate-revocation-checking-in-firefox/), which is efficient and reliable. Ubuntu is deploying [upki](https://discourse.ubuntu.com/t/an-update-on-upki/77063), a Rustls project based on CRLite. We hope other browsers and operating systems follow suit. The upki project is a great example of a project [making use of](https://github.com/rustls/upki/tree/main/revoke-test) these revoked test certificates, too.

The actual content of the website isn't terribly important: We just have a little HTML page explaining what the site is. But since this website is meant for testing clients, there's more than just browsers connecting. In particular, it's pretty routine that I try connecting with `curl` or some other terminal http client, and getting a bunch of HTML spewed to your terminal isn't very nice.

As a small Easter egg, we added a plain text version of the website with an ASCII art version of our logo that we serve if your HTTP client doesn't include text/html in its `Accept` HTTP header. You can pass a ?txt or ?html URL parameter to specifically request one or the other version of the content, if you just want to [see the ASCII art](https://valid.x2.test-certs.letsencrypt.org/?txt).

Let's Encrypt has four root certificates right now. Each of them have test sites linked both here and from [our documentation](/certificates/).

<div class="sites-tables">
<table class="sites-table">
<tbody>
<tr><td>Root X1</td><td><a href="https://valid.x1.test-certs.letsencrypt.org">valid</a></td><td><a href="https://expired.x1.test-certs.letsencrypt.org">expired</a></td><td><a href="https://revoked.x1.test-certs.letsencrypt.org">revoked</a></td></tr>
<tr><td>Root X2</td><td><a href="https://valid.x2.test-certs.letsencrypt.org">valid</a></td><td><a href="https://expired.x2.test-certs.letsencrypt.org">expired</a></td><td><a href="https://revoked.x2.test-certs.letsencrypt.org">revoked</a></td></tr>
<tr><td>Root YE</td><td><a href="https://valid.ye.test-certs.letsencrypt.org">valid</a></td><td><a href="https://expired.ye.test-certs.letsencrypt.org">expired</a></td><td><a href="https://revoked.ye.test-certs.letsencrypt.org">revoked</a></td></tr>
<tr><td>Root YR</td><td><a href="https://valid.yr.test-certs.letsencrypt.org">valid</a></td><td><a href="https://expired.yr.test-certs.letsencrypt.org">expired</a></td><td><a href="https://revoked.yr.test-certs.letsencrypt.org">revoked</a></td></tr>
</tbody>
</table>
</div>

## The code

As with a lot of Let's Encrypt, the code for this project is open-source. You can find it at <https://github.com/letsencrypt/test-certs-site/>. Other Certificate Authorities who need to run similar test certificate sites are welcome to use it. If you need any features that would make using our test certs site easier for your TLS/HTTPS client testing, please feel free to create an issue on that repository.
