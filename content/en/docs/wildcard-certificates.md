---
title: Certificates for localhost
permalink: /docs/wildcard-certificates
top_graphic: 1
date: 2018-06-30
lastmod: 2018-06-30
---

{{< lastmod >}}

Wildcard certificates, instead of being valid for a specific hostname, are valid
for all subdomains of a given domain name, one level deep. For instance, a
certificate for "*.example.com" would be valid for "a.example.com",
"b.example.com", and so on. You can get wildcard certificates from Let's
Encrypt.

This type of certificate is usually useful if you have a lot of subdomains that
all point to the same set of servers, and you have a wildcard DNS entry. For
instance, a software-as-a-service provider that hosts each customer on a
different subdomain would probably want to use a wildcard certificate. If you
don't have wildcard DNS, or you have a variety of different server types as
neighboring subdomains, wildcard certificates are likely not the best choice.
Instead, in such situations, it's easier and safer to automate issuance of
single-hostname certificates on each subdomain.

## Validation methods

For non-wildcard certificates, Let's Encrypt can validate your control of
domain names using either the HTTP or the DNS challenge from the ACME spec.
For wildcard certificates, we accept only the DNS challenge. This provides a
higher level of confidence that you control all the subdomains vouched for in
the certificate.

As always, it's important to automate revalidation and renewal, so that your
site doesn't go offline due to an expired certificate. This is harder for the
DNS challenge than for the HTTP challenge: Your DNS provider needs to support an
API for automatically updating TXT records. Many do; check with your DNS
provider to see if they do.

Besides the validation requirements, Let's Encrypt requires that you use an ACME
client that supports ACMEv2 in order to issue wildcard certificates. You can check our
[client options](/docs/client-options) page to see which clients support ACMEv2.

## Risks

There are two main risks to using wildcard certificates instead of regular
certificates: if someone breaks into your server, they could steal your
certificate private key, or they could steal your DNS API credentials.

Having your DNS API credentials stolen is the highest risk, because it can be
used to change the IP address of your server to point at an attacker's server,
allowing them to intercept all requests meant for your site from anywhere on the
Internet. If someone steals your certificate private key, that can be used to
intercept requests, but only if they also have a way to make sure those requests
travel through networks they control.

To mitigate this risk, we recommend choosing one of two approaches: narrowed DNS API
credentials or centralized issuance.

# Tricky bits

- make sure all authoritative name servers are in sync before starting
- scoping credentials to update DNS
- validating base domain and wildcard at the same time.
