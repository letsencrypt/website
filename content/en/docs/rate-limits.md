---
title: Rate Limits
slug: rate-limits
top_graphic: 1
date: 2018-01-04
lastmod: 2018-03-12
---

{{< lastmod >}}

Let's Encrypt provides rate limits to ensure fair usage by as
many people as possible. We believe these rate limits are high enough to work
for most people by default. We've also designed them so renewing a
certificate almost never hits a rate limit, and so that large
organizations can gradually increase the number of certificates they can issue
without requiring intervention from Let's Encrypt.

If you're actively developing or testing a Let's Encrypt client, please utilize
our [staging environment](/docs/staging-environment/) instead of the production API.
If you're working on integrating Let's Encrypt as a provider or with a large
website please [review our Integration Guide](/docs/integration-guide).

The main limit is <a name="certificates-per-registered-domain"></a>**Certificates per Registered Domain**, (20 per week). A
registered domain is, generally speaking, the part of the domain you purchased
from your domain name registrar. For instance, in the name `www.example.com`,
the registered domain is `example.com`. In `new.blog.example.co.uk`,
the registered domain is `example.co.uk`. We use the
[Public Suffix List](https://publicsuffix.org) to calculate the registered
domain.

If you have a lot of subdomains, you may want to combine them into a single
certificate, up to a limit of 100 <a name="names-per-certificate"></a>**Names per Certificate**. Combined with the
above limit, that means you can issue certificates containing up to 2,000 unique
subdomains per week. A certificate with multiple names is often called a SAN
certificate, or sometimes a UCC certificate.

We also have a <a name="duplicate-certificate"></a>**Duplicate Certificate** limit of 5 certificates per week. A
certificate is considered a duplicate of an earlier certificate if they contain
the exact same set of hostnames, ignoring capitalization and ordering of
hostnames.  For instance, if you requested a certificate for the names
[`www.example.com`, `example.com`], you could request four more certificates for
[`www.example.com`, `example.com`] during the week. If you changed the set of names
by adding [`blog.example.com`], you would be able to request additional
certificates.

To make sure you can always renew your certificates when you need to, we have a
<a name="renewal-exemption"></a>**Renewal Exemption** to the Certificates per Registered Domain limit. Even if
you've hit the limit for the week, you can still issue new certificates that
count as renewals. An issuance request counts as a renewal if it contains the
exact same set of hostnames as a previously issued certificate. This is the same
definition used for the Duplicate Certificate limit described above. Renewals
*are* still subject to the Duplicate Certificate limit. Also note: the order of
renewals and new issuances matters. To get the maximum possible number of
certificates, you must perform all new issuances before renewals during a given
time window.

The Duplicate Certificate limit and the Renewal Exemption ignore the public key
and extensions requested. A certificate issuance can be considered a renewal even if
you are using a new key.

Note that the Renewal Exemption also means you can gradually increase the number
of certificates available to your subdomains. You can issue 20 certificates in
week 1, 20 more certificates in week 2, and so on, while not interfering with
renewals of existing certificates.

Revoking certificates does not reset rate limits, because the resources used to
issue those certificates have already been consumed.

There is a <a name="failed-validations"></a>**Failed Validation** limit of 5 failures
per account, per hostname, per hour. This limit is higher on our
<a href="/docs/staging-environment/">staging environment</a>, so you
can use that environment to debug connectivity problems.

The "new-reg", "new-authz" and "new-cert" endpoints have an <a
name="overall-requests"></a>**Overall
Requests** limit of 20 per second. The "/directory" endpoint and the "/acme" 
directory & subdirectories have an Overall Requests limit of 40 requests per second.

We have two other limits that you're very unlikely to run into.

You can create a maximum of 10 <a name="accounts-per-ip-address"></a>**Accounts per IP Address** per 3 hours. You can
create a maximum of 500 **Accounts per IP Range** within an IPv6 /48 per
3 hours. Hitting either account rate limit is very rare, and we recommend that
large integrators prefer a design [using one account for many customers](/docs/integration-guide).

You can have a maximum of 300 <a name="pending-authorizations"></a>**Pending Authorizations** on your account. Hitting
this rate limit is rare, and happens most often when developing ACME clients. It
usually means that your client is creating authorizations and not fulfilling them.
Please utilize our [staging environment](/docs/staging-environment/) if you’re
developing an ACME client.

For users of the ACME v2 API you can create a maximum of 300 <a
name="new-orders"></a>**New Orders** per account per 3 hours.

# <a name="overrides"></a>Overrides

If you've hit a rate limit, we don't have a way to temporarily reset it. You'll
need to wait until the rate limit expires after a week. We use a sliding window,
so if you issued 10 certificates on Monday and 10 more certificates on Friday,
you'll be able to issue again starting Monday. You can get a list of certificates
issued for your registered domain by [searching on crt.sh](https://crt.sh), which
uses the public [Certificate Transparency](https://www.certificate-transparency.org)
logs.

Revoking certificates does not reset rate limits, because the resources involved
in issuing the certificates have already been used.

If you are a large hosting provider or organization working on a Let's Encrypt
integration, we have a [rate limiting
form](https://goo.gl/forms/plqRgFVnZbdGhE9n1)
that can be used to request a higher rate limit. It takes a few weeks to process
requests, so this form is not suitable if you just need to reset a rate limit
faster than it resets on its own.

Note that most hosting providers don't need rate limit increases, because
there's no limit on the number of distinct registered domains for which you can issue.
So long as most of your customers don't have more than 2,000 subdomains on a
registered domain, you most likely do not need an increase. See our [Integration
Guide](/docs/integration-guide/) for more advice.

# <a name="clearing-pending"></a>Clearing Pending Authorizations

If you have a large number of pending authorization objects and are getting a
rate limiting error, you can trigger a validation attempt for those
authorization objects by submitting a JWS-signed POST to one of its challenges, as
described in the
[ACME spec](https://github.com/ietf-wg-acme/acme/blob/master/draft-ietf-acme-acme.md#responding-to-challenges).
The pending authorization objects are represented by URLs of the form
https://acme-v01.api.letsencrypt.org/acme/authz/XYZ, and should show up in your
client logs. Note that it doesn't matter whether validation succeeds or fails.
Either will take the authorization out of 'pending' state. If you do not
have logs containing the relevant authorization URLs, you need to wait for the
rate limit to expire. As described above, there is a sliding window, so this may
take less than a week depending on your pattern of issuance.

Note that having a large number of pending authorizations is generally the
result of a buggy client. If you're hitting this rate limit frequently you
should double-check your client code.
