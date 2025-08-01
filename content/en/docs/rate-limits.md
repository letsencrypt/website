---
title: Rate Limits
slug: rate-limits
lastmod: 2025-06-12
show_lastmod: true
---

Let's Encrypt provides rate limits to ensure fair usage by as many people as
possible. We believe these rate limits are high enough to work for most people
by default. We've also designed them so that renewing a certificate almost never
hits a rate limit, and so that large organizations can gradually increase the
number of certificates they can issue without requiring intervention from Let's
Encrypt.

If you're actively developing or testing a Let's Encrypt client, please utilize
our [staging environment](/docs/staging-environment) instead of the production
API. If you're working on integrating Let's Encrypt as a provider or with a
large website please review our [Integration Guide](/docs/integration-guide).

# How Our Rate Limits Work

Limits are calculated, per request, using a [token
bucket](https://en.wikipedia.org/wiki/Token_bucket) algorithm. This
approach provides flexibility in how you use your allotted requests. You can
either make requests in bursts—up to the full limit—or space out your requests
to avoid the risk of being limited.

If you've hit a rate limit, we don't have a way to temporarily reset it. Don't
worry, your capacity for that limit will gradually refill over time, allowing
you to make more requests without any additional action on your part. Revoking
certificates does **not** reset rate limits, because the resources used to issue
those certificates have already been consumed. For more information please see
[Retrying After Hitting Rate Limits](#retrying-after-hitting-rate-limits).

# Account Registration Limits

The following limits apply when subscribers request a new account using the
new-account API endpoint. Exceeding these limits is very rare. We recommend that
large integrators prefer a design which [uses one account for many
customers](/docs/integration-guide).

<div class="boxed">

## New Registrations per IP Address

Up to 10 accounts can be created from a single IP address every 3 hours. The
ability to create new accounts refills at a rate of 1 account every 18 minutes.

### Overrides

We do **not** offer overrides for this limit.

</div>
<div class="boxed">

## New Registrations per IPv6 Range

Up to 500 accounts can be created from a single /48 IPv6 subnet every 3 hours.
The ability to create new accounts refills at a rate of 1 account every 22
seconds.

### Overrides

We do **not** offer overrides for this limit.

</div>

# Certificate Issuance Limits

The following limits apply when subscribers request a new certificate using the
`new-order` API endpoint. Exceeding these limits is more common, especially for
large hosting providers or organizations issuing certificates for many
hostnames.

<div class="boxed">

## New Orders per Account

Each time you request a certificate from Let's Encrypt, a new order is created.
A single certificate can include up to 100 identifiers (DNS names or IP
addresses). For performance reasons, it's better to use fewer identifiers per
certificate whenever you can.

### Limit

Up to 300 new orders can be created by a single account every 3 hours. The
ability to create new orders refills at a rate of 1 order every 36 seconds.

### Overrides

To exceed this limit, you must [request an
override](https://isrg.formstack.com/forms/rate_limit_adjustment_request) for a
specific account.

</div>
<div class="boxed">

## New Certificates per Registered Domain

A registered domain is, generally speaking, the part of the domain you purchased
from your domain name registrar. For instance, in `www.example.com`, the
registered domain is `example.com`. In `new.blog.example.co.uk`, the registered
domain is `example.co.uk`. We use the [Public Suffix
List](https://publicsuffix.org/) to identify registered domains.

If you're requesting a certificate for an IP address, we also try to treat the
most common allocation (what you'd get from your ISP or hosting provider) as the
"registered domain." For IPv4 addresses, we treat the exact address as the
registered domain. For IPv6 addresses, we treat the containing /64 range as the
registered domain.

### Limit

Up to 50 certificates can be issued per registered domain (or IPv4 address, or
IPv6 /64 range) every 7 days. This is a global limit, and all new order
requests, regardless of which account submits them, count towards this limit.
The ability to issue new certificates for the same registered domain refills at
a rate of 1 certificate every 202 minutes.

### Overrides

To exceed this limit, you must [request an
override](https://isrg.formstack.com/forms/rate_limit_adjustment_request) for
the specific registered domain or an account.

</div>
<div class="boxed">

## New Certificates per Exact Set of Identifiers

If you request a certificate for `192.168.1.1`, `example.com` and
`login.example.com`, the "exact set of identifiers" is `[192.168.1.1,
example.com, login.example.com]`. If you request a certificate for only 1
identifier, such as `example.co.uk`, then the exact set of identifiers would be
`[example.co.uk]`.

### Limit

Up to 5 certificates can be issued per exact same set of identifiers every 7
days. This is a global limit, and all new order requests, regardless of which
account submits them, count towards this limit. The ability to request new
certificates for the same exact set of identifiers refills at a rate of 1
certificate every 34 hours.

### Common Causes

Reinstalling your client multiple times to troubleshoot an unknown error, or
deleting your ACME client's configuration data each time you deploy your
application, are common ways to hit this limit. We have intentionally set this
limit relatively low to prevent buggy systems or software under development from
rapidly consuming the capacity of other rate limits.

When testing or troubleshooting your applications, we recommend configuring your
client to use our [staging environment](/docs/staging-environment), which has
[significantly higher](/docs/staging-environment/#rate-limits) limits.

### Workaround

If you've hit this limit, you can change the set of identifiers by adding
`blog.example.com`, to request additional certificates. Be aware that these new
orders would not be considered renewals. Therefore, they would be subject to the
[New Orders per Account](#new-orders-per-account) and [New Certificates per
Registered Domain](#new-certificates-per-registered-domain) rate limits.

### Overrides

We do **not** offer overrides for this limit.

</div>
<div class="boxed">

## Authorization Failures per Identifier per Account

An authorization is generated for each identifier (DNS name or IP address)
included in an order. Before a certificate can be issued, all authorizations in
the order must be successfully validated. A failed authorization means that,
although the requests for validation were sent successfully, all of Let's
Encrypt's attempts to validate control of the identifier have failed.

### Limit

Up to 5 authorization failures per identifier can be incurred by one account
every hour. The ability to incur authorization failures refills at a rate of 1
per identifier every 12 minutes. Once exceeded, this limit is enforced by
preventing any new orders for the same identifier, by the same account until the
limit resets.

### Common Causes

Before you begin troubleshooting, we recommend you set your client to use our
[staging environment](/docs/staging-environment). This environment has
[significantly higher](/docs/staging-environment/#rate-limits) limits, which can
help you identify and resolve issues without consuming your production limits.

- Validation failures when using the `HTTP-01` and `TLS-ALPN-01` methods usually
  stem from network or firewall configurations that prevent Let's Encrypt
  validation servers from reaching your server.

- Validation failures when using the `DNS-01` method often result from missed
  steps or typos during the initial setup process. Typically, this validation
  method requires you to create a CNAME record in your main DNS zone, enabling
  your client to set the necessary DNS records during the validation process.

### Overrides

We do **not** offer overrides for this limit.

</div>
<div class="boxed">

## Consecutive Authorization Failures per Identifier per Account

Similar to [Authorization Failures per Identifier per
Account](#authorization-failures-per-identifier-per-account) but only applies to
consecutive failures. This limit is designed to prevent clients from getting
stuck forever in a loop of failed validations.

### Limit

Up to 1,152 consecutive authorization failures per identifier can be incurred by
one account. The ability to incur authorization failures refills at a rate of 1
per identifier every day and resets to zero if an authorization for that
identifier is successfully validated. Once exceeded, the account is prevented
from requesting new certificates for that identifier. Each time the subscriber
attempts to request a certificate they will receive an error containing a link
to our Self-Service Portal where they can unpause issuance for the paused
identifier and up to 49,999 additional paused identifiers associated with their
account.

| Failures per Day             | Time to Pause           |
|------------------------------|-------------------------|
| 1                            | ∞ (never paused)        |
| 2                            | 1,152 days (3.16 years) |
| 5                            | 288 days (9.46 months)  |
| 10                           | 128 days (4.21 months)  |
| 15                           | 82 days (2.70 months)   |
| 20                           | 61 days (1.99 months)   |
| 30                           | 40 days                 |
| 40                           | 30 days                 |
| 120                          | 10 days                 |

### Common Causes

Before you begin troubleshooting, we recommend you set your client to use our
[staging environment](/docs/staging-environment). This environment has
[significantly higher](/docs/staging-environment/#rate-limits) limits, which can
help you identify and resolve issues without consuming your production limits.

- Validation failures when using the `HTTP-01` and `TLS-ALPN-01` methods usually
  stem from network or firewall configurations that prevent Let's Encrypt
  validation servers from reaching your server.

- Validation failures when using the `DNS-01` method often result from missed
  steps or typos during the initial setup process. Typically, this validation
  method requires you to create a CNAME record in your main DNS zone, enabling
  your client to set the necessary DNS records during the validation process.

### Overrides

We do **not** offer overrides for this limit.

</div>

# Overall Requests Limit

In addition to our [account registration](#account-registration-limits) and
[certificate issuance](#certificate-issuance-limits) limits, there are
per-endpoint overall request limits that apply per-IP address. These are
enforced by our load balancers and are designed to protect the ACME API from
being overwhelmed by clients that make too many requests at once.

| Endpoint           | Requests per IP (per second) | Burst Capacity |
|--------------------|------------------------------|----------------|
| /acme/new-nonce    | 20                           | 10             |
| /acme/new-account  | 5                            | 15             |
| /acme/new-order    | 300                          | 200            |
| /acme/revoke-cert  | 10                           | 100            |
| /acme/renewal-info | 1000                         | 100            |
| /acme/*            | 250                          | 125            |
| /directory         | 40                           | 40             |

Subscribers who exceed these limits will receive a `503 Service Unavailable`
HTTP response code. The response will include a `Retry-After` header.

# Limit Exemptions for Renewals

Let's Encrypt recognizes a new certificate order as a "renewal" in two ways: the
preferred method is through ACME Renewal Info (ARI), which is exempt from all
rate limits, and the other relies on older renewal detection logic that
considers orders with the exact same set of identifiers as renewals but may
still be subject to certain rate limits.

## ARI Renewals

Renewals coordinated by ARI offer the unique benefit of being exempt from all
rate limits. Clients that support ARI periodically check with Let's Encrypt
servers to determine if your existing certificate should be renewed. When the
optimal renewal window is reached the client requests a new order explicitly
indicating the certificate it replaces. If the new order includes at least one
identifier matching the certificate it intends to replace and the certificate
has not been previously replaced using ARI, the order will not be subject to any
rate limits.

## Non-ARI Renewals

If your client or hosting provider has yet to add support for ARI, your order
can still be considered a renewal of an earlier certificate if it contains the
exact same set of identifiers, ignoring capitalization and the order of
identifiers. For example, if you requested a certificate for the identifiers
`[192.168.1.1, www.example.com, example.com]`, you could request four more
certificates for `[192.168.1.1, www.example.com, example.com]` before hitting
the [New Certificates per Exact Set of
Identifiers](#new-certificates-per-exact-set-of-identifiers) rate limit. Each of
these new orders would be considered renewals and would be exempt from the [New
Orders per Account](#new-orders-per-account) and [New Certificates per
Registered Domain](#new-certificates-per-registered-domain) rate limits.
However, unlike ARI renewals, these orders would still be subject to
[Authorization Failures per Identifier per
Account](#authorization-failures-per-identifier-per-account) and [New Certificates
per Exact Set of Identifiers](#new-certificates-per-exact-set-of-identifiers).

# Retrying After Hitting Rate Limits

All of our rate limit error messages follow the same format. For example:

```
too many new registrations (10) from this IP address in the last 3h0m0s,
retry after 1970-01-01 00:18:15 UTC.
```

You should be able to successfully make the same request after the provided date
and time. If your request exceeds the capacity of more than one of our limits,
we will always return the error message for the limit that resets furthest in
the future.

## Retry-After Header

We include a `Retry-After` header in all rate limit error responses, indicating
the duration your client should wait before retrying.

You can get a list of certificates issued for your registered domain by
searching [crt.sh](https://crt.sh/) or [Censys](https://search.censys.io/#),
which use the public [Certificate
Transparency](https://www.certificate-transparency.org/) logs.

# Requesting an Override

If you are a large hosting provider or organization working on a Let's Encrypt
integration, we have a [rate limiting
form](https://isrg.formstack.com/forms/rate_limit_adjustment_request) that can
be used to request higher rate limits. It takes a few weeks to process requests,
so this form is not suitable if you just need to reset a rate limit faster than
it resets on its own.
