---
title: Challenge Types
slug: challenge-types
top_graphic: 1
date: 2019-02-25
lastmod: 2019-02-25
---

When you get a certificate from Let’s Encrypt, our servers validate that
you control the domain names in that certificate using “challenges,”
as defined by the ACME standard. Most of the time, this validation
is handled automatically by your ACME client, but if you need to make
some more complex configuration decisions, it’s useful to know more
about them. If you’re unsure, go with your client’s defaults or
with HTTP-01.

# HTTP-01 challenge

This is the most common challenge type today. Let’s Encrypt gives a
token to your ACME client, and your ACME client puts a file on your web
server at `http://<YOUR_DOMAIN>/.well-known/acme-challenge/<TOKEN>`. That
file contains the token, plus a thumbprint of your account key. Once
your ACME client tells Let’s Encrypt that the file is ready, Let’s
Encrypt tries retrieving it. If our validation server gets the right
response from your web server, the validation is considered successful
and you can go on to issue your certificate. If the validation fails,
you’ll have to try again with a new certificate.

Our implementation of the HTTP-01 challenge follows redirects, up to 10
redirects deep. It only accepts redirects to “http:” or “https:”,
and only to ports 80 or 443. When redirected to an HTTPS URL, it does
not validate certificates (since this challenge is intended to bootstrap
valid certificates, it may encounter self-signed or expired certificates
along the way).

The HTTP-01 challenge can only be done on port 80. Allowing clients to
specify arbitrary ports would make the challenge less secure, and so it
is not allowed by the ACME standard.

Pros:

 - It’s easy to automate without extra knowledge about a domain’s configuration.
 - It allows hosting providers to issue certificates for domains CNAMEd to them.
 - It works with off-the-shelf web servers.

Cons:

 - It doesn’t work if your ISP blocks port 80 (this is rare, but some residential ISPs do this).
 - Let’s Encrypt doesn’t let you use this challenge to issue wildcard certificates.
 - If you have multiple web servers, you have to make sure the file is available on all of them.

# DNS-01 challenge

This challenge asks you to prove that you control the DNS for your
domain name by putting a specific value in a TXT record under that domain
name. It is harder to configure than HTTP-01, but can work in scenarios
that HTTP-01 can’t. It also allows you to issue wildcard certificates.
After Let’s Encrypt gives your ACME client a token, your client
will create a TXT record derived from that token and your account key,
and put that record at `_acme-challenge.<YOUR_DOMAIN>`. Then Let’s
Encrypt will query the DNS system for that record. If it finds a match,
you can proceed to issue a certificate!

Since automation of issuance and renewals is really important, it only
makes sense to use DNS-01 challenges if your DNS provider has an API you
can use to automate updates. Our community has started a [list of such DNS
providers here][dns-api-providers]. Your DNS provider may be the same as
your registrar (the company you bought your domain name from), or it
might be different. If you want to change your DNS provider, you just
need to make some small changes at your registrar. You don’t need to
wait for your domain to be close to expiration to do so.

Note that putting your fully DNS API credentials on your web server
significantly increases the impact if that web server is hacked. Best
practice is to use [more narrowly scoped API
credentials][securing-dns-credentials], or perform DNS
validation from a separate server and automatically copy certificates
to your web server.

Since Let’s Encrypt follows the DNS standards when looking up TXT
records for DNS-01 validation, you can use CNAME records or NS records to
delegate answering the challenge to other DNS zones. This can be used to
[delegate the `_acme-challenge` subdomain][securing-dns-credentials]
to a validation-specific server or zone. It can also be used if your DNS
provider is slow to update, and you want to delegate to a quicker-updating
server.

Most DNS providers have a “propagation time” that governs how long it
takes from the time you update a DNS record until it’s available on all
of their servers. It can be hard to measure this because they often also
use [anycast], which means multiple servers can have the same IP address,
and depending on where you are in the world you might talk to a different
server (and get a different answer) than Let’s Encrypt does. The best
DNS APIs provide a way for you to automatically check whether and update
is fully propagated. If your DNS provider doesn’t have this, you just
have to configure your client to wait long enough (often as much as an
hour) to ensure the update is propagated before triggering validation.

You can have multiple TXT records in place for the same name. For
instance, this might happen if you are validating a challenge for a
wildcard and a non-wildcard certificate at the same time. However, you
should make sure to clean up old TXT records, because if the response
size gets too big Let’s Encrypt will start rejecting it.

Pros:

 - You can use this challenge to issue certificates containing wildcard domain names.
 - It works well even if you have multiple web servers.

Cons:

 - Keeping API credentials on your web server is risky.
 - Your DNS provider might not offer an API.
 - Your DNS API may not provide information on propagation times.

# TLS-SNI-01

This challenge was defined in draft versions of ACME. It did a TLS
handshake on port 443 and sent a specific [SNI] header, looking for
certificate that contained the token. It [will be disabled in March
2019][tls-sni-disablement]
because it was not secure enough.

# TLS-ALPN-01

This challenge was developed after TLS-SNI-01 became deprecated, and is
being developed as [a separate standard][tls-alpn]. Like TLS-SNI-01, it is performed
via TLS on port 443. However, it uses a custom ALPN protocol to ensure
that only servers that are aware of this challenge type will respond
to validation requests. This also allows validation requests for this
challenge type to use an SNI field that matches the domain name being
validated, making it more secure.

This challenge is not suitable for most people. It is best suited
to authors of TLS-terminating reverse proxies that want to perform
host-based validation like HTTP-01, but want to do it entirely at the
TLS layer in order to separate concerns. Right now that mainly means
large hosting providers, but mainstream web servers like Apache and
Nginx could someday implement this (and [Caddy already does][caddy-tls-alpn]).

Pros:

 - It works if port 80 is unavailable to you.
 - It can be performed purely at the TLS layer.

Cons:

 - It’s not supported by Apache, Nginx, or Certbot, and probably won’t be soon.
 - Like HTTP-01, if you have multiple servers they need to all answer with the same content.

[dns-api-providers]: https://community.letsencrypt.org/t/dns-providers-who-easily-integrate-with-lets-encrypt-dns-validation/86438
[securing-dns-credentials]: https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation
[anycast]: https://en.wikipedia.org/wiki/Anycast
[SNI]: https://en.wikipedia.org/wiki/Server_Name_Indication
[tls-sni-disablement]: https://community.letsencrypt.org/t/march-13-2019-end-of-life-for-all-tls-sni-01-validation-support/74209
[tls-alpn]: https://tools.ietf.org/html/draft-ietf-acme-tls-alpn-01
[caddy-tls-alpn]: https://caddy.community/t/caddy-supports-the-acme-tls-alpn-challenge/4860
