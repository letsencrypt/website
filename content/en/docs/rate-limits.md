---
title: Rate Limits
slug: rate-limits
top_graphic: 1
date: 2018-01-04
lastmod: 2020-12-22
---

{{< lastmod >}}

# Foreword

Although Let's Encrypt offers SSL/TLS certificates free of charge, unfortunately
those certificates are not free to produce. Considerable resources are needed to operate,
maintain, and improve the hardware and software necessary to satisfy growing demand.
As a non-profit, we greatly appreciate the generous [support](/become-a-sponsor) and
[donations](/donate) that enable us to continue fulfilling our mission of furthering a
secure and privacy-respecting Web for everyone. To that end, we endeavor to ensure that we
leverage the resources with which we have been blessed as best we can.

To ensure fair usage, Let's Encrypt enforces rate limits that we believe to be
reasonable for most scenarios. Our rate limits were designed to facilitate unhampered
certificate renewals and increasing certificate usage by growing organizations. If you
are integrating Let's Encrypt into your operations, please review our [Integration Guide](/docs/integration-guide)
to ensure smooth operation. In particular, we recommend using one ACME account for many
customers. If you are developing an ACME client, debugging the usage of one, or configuring
an automated system, please take advantage of our [staging environment](/docs/staging-environment),
which is governed by higher rate limits and issues disposable certificates.

**We have no way of temporarily overriding the rate limits.** For very large providers who are
encountering rate limits due to sheer volume, we provide a [rate limiting form](https://goo.gl/forms/plqRgFVnZbdGhE9n1)
that can be used to request higher rate limits. Since these requests require strong justification
for higher rate limits and can take several weeks to process, the rate limiting form is not suitable
for addressing temporary situations that will automatically be resolved when any encountered
rate limits no longer apply.

**Revoked certificates still count against our rate limits and remain in the public record.**
All issued certificates can be found using [crt.sh](https://crt.sh/), which uses public
[Certificate Transparency](https://www.certificate-transparency.org) logs. In general,
certificate revocation should only be considered under very particular circumstances, such as the
compromise of a certificate's private key or the loss of control over a certified domain name.
Revocation of a certificate only invalidates its trust for future use. If an unexpired certificate
is no longer needed, securely deleting the certificate's private key is usually sufficient to
decommission the certificate.

# Rate Limits

Message: too many certificates already issued for exact set of domains

Limit: 5 <a href="#duplicate-certificate">duplicate certificates</a> / 7 days

Hitting this limit is often the result of using the following practices that should be avoided:
* Deleting valid certificates (and their private keys) when attempting to resolve webserver configuration problems
* Spinning-up ephemeral instances or containers that acquire new certificates from the CA rather
than utilizing an existing certificate
* Having each worker in a load-balancing scheme acquire its own certificate rather than
terminating SSL/TLS at the load-balancer or distributing a common certificate to each worker

***

Message: too many failed authorizations recently

Limit: 5 failed validation attempts / <a href="#FQDN">FQDN</a> / ACME account / hour

Hitting this limit is often the result of:
* Improper webserver, DNS, and/or firewall configuration
* Misunderstanding of an [ACME challenge](/docs/challenge-types)

***

Message: too many certificates already issued

Limit: 50 certificates / <a href="#apex-domain-name">apex domain name</a> / week

<a href="#duplicate-certificate">Duplicate certificates</a> do **not** count against this limit.

***

Limit: 100 <a href="#SAN">SANs</a> / certificate

Note that there is usually no need (and it is usually inadvisable) to include every
<a href="#FQDN">FQDN</a> served by the same webserver in a single certificate. Most modern
webserver software distributions support <a href="#SNI">SNI</a> to select the correct
certificate.

***

Message: too many new orders recently

Limit: 300 new orders / ACME account / 3 hours

Hitting this limit is often the result of:
* Large-scale operations attempting to acquire too many certificates in parallel
* A malfunctioning ACME client

If a new order is requested and there already exists a pending order covering the exact same
<a href="#FQDN">FQDNs</a>, the pending order will be returned and a new order will **not**
be created.

***

Message: too many registrations for this IP

Limit: 10 ACME account registrations / IP address / 3 hours

***

Message: too many registrations for this IP range

Limit: 500 ACME account registrations / IPv6/48 range / 3 hours

***

Message: too many currently pending authorizations

Limit: 300 pending authorizations / ACME account

Hitting this limit is usually the result of a malfunctioning ACME client.
If you know the URL of a pending authorization of the form `/acme/authz/XYZ`, which can likely
be found in the log of your ACME client, you can trigger a validation attempt for that
authorization by submitting a JWS-signed POST request to any of its challenges as described in
the [ACME specification](https://tools.ietf.org/html/rfc8555#section-7.5.1). Regardless of the
outcome of the validation attempt, the authorization will no longer be pending.

***

Limit: 20 requests / second

Hitting this limit is usually the result of a malfunctioning ACME client.
This limit applies collectively to requests for the "new-reg", "new-authz", and "new-cert"
ACMEv1 API endpoints and the "new-nonce", "new-account", "new-order", and "revoke-cert"
ACMEv2 API endpoints.

***

Limit: 40 requests / second

Hitting this limit is usually the result of a malfunctioning ACME client.
This limit applies collectively to requests for the "/directory" endpoint and the "/acme" 
directory and subdirectories.

# Definitions

<span id="apex-domain-name">Apex Domain Name</span>

An apex domain name is usually the trailing part of an <a href="#FQDN">FQDN</a> registered through
a registrar. For instance, `example.com` is the apex domain name of `www.example.com`.
We use the [Public Suffix List](https://publicsuffix.org) to determine the apex domain
name for any given <a href="#FQDN">FQDN</a>.

***

<span id="duplicate-certificate">Duplicate Certificate</span>

A certificate is considered a duplicate if it contains the exact same <a href="#SAN">SANs</a>
as another certificate, regardless of order. A renewal certificate is a duplicate certificate
that has been acquired to replace a certificate near expiry.

***

<span id="FQDN">Fully Qualified Domain Name (FQDN)</span>

An FQDN is a complete domain name consisting of any subdomain names and an
<a href="#apex-domain-name">apex domain name</a>.

***

<span id="SAN">Subject Alternative Name (SAN)</span>

Each <a href="#FQDN">FQDN</a> that a certificate covers is listed as a SAN in the certificate.
A certificate with multiple SANs is sometimes called a unified communications certificate (UCC).
Reducing the number of SANs in a certificate reduces the operational complexity associated with
using the certificate, resulting in increased performance and reliability.

***

<span id="SNI">Server Name Indication (SNI)</span>

Extension to the TLS protocol by which a webserver discerns which certificate to send to a client
based on the hostname requested by the client.
