---
author: Josh Aas
date: 2025-01-14T00:00:00Z
slug: 6-day-and-IP-certs
title: "Announcing Six Day and IP Address Certificate Options in 2025"
excerpt: "In addition to our standard certificates, Let’s Encrypt will introduce new short-lived certificates to improve security and agility for the Web PKI."
display_default_footer: true
---

This year we will continue to pursue our commitment to improving the security of the Web PKI by introducing the option to get certificates with six-day lifetimes ("short-lived certificates"). We will also add support for IP addresses in addition to domain names. Our longer-lived certificates, which currently have a lifetime of 90 days, will continue to be available alongside our six-day offering. Subscribers will be able to opt in to short-lived certificates via a certificate profile mechanism being added to our ACME API.

## Shorter Certificate Lifetimes Are Good for Security

When the private key associated with a certificate is compromised, the recommendation has always been to have the certificate revoked so that people will know not to use it. Unfortunately, certificate revocation doesn't work very well. This means that certificates with compromised keys (or other issues) may continue to be used until they expire. The longer the lifetime of the certificate, the longer the potential for use of a problematic certificate.

The primary advantage of short-lived certificates is that they greatly reduce the potential compromise window because they expire relatively quickly. This reduces the need for certificate revocation, which has historically been unreliable. Our six-day certificates will not include OCSP or CRL URLs. Additionally, short-lived certificates practically require automation, and we believe that automating certificate issuance is important for security.

## IP Address Support For Securing Additional Use Cases

We will support including IP addresses as Subject Alternative Names in our six-day certificates. This will enable secure TLS connections, with publicly trusted certificates, to services made available via IP address, without the need for a domain name.

Validation for IP addresses will work much the same as validation for domain names, though validation will be restricted to the [http-01 and tls-alpn-01 challenge types](https://letsencrypt.org/docs/challenge-types/). The dns-01 challenge type will not be available because the DNS is not involved in validating IP addresses. Additionally, there is no mechanism to check CAA records for IP addresses.

## Timeline

We expect to issue the first valid short-lived certificates to ourselves in February of this year. Around April we will enable short-lived certificates for a small set of early adopting subscribers. We hope to make short-lived certificates generally available by the end of 2025.

The earliest short-lived certificates we issue may not support IP addresses, but we intend to enable IP address support by the time short-lived certificates reach general availability.

## How To Get Six-Day and IP Address Certificates

Once short-lived certificates are an option for you, you'll need to use an ACME client that supports [ACME certificate profiles](https://letsencrypt.org/2025/01/09/acme-profiles/) and select the short-lived certificate profile (the name of which will be published at a later date).

Once IP address support is an option for you, requesting an IP address in a certificate will automatically select a short-lived certificate profile.

## Looking Ahead

The best way to prepare to take advantage of short-lived certificates is to make sure your ACME client is reliably renewing certificates in an automated fashion. If that's working well then there should be no costs to switching to short-lived certificates.

If you have questions or comments about our plans, feel free to let us know on our [community forums](https://community.letsencrypt.org/).