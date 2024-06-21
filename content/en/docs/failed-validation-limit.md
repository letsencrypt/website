---
title: Failed Validation Limit
slug: failed-validation-limit
lastmod: 2024-06-21
show_lastmod: false
---


# Description
All issuance requests are subject to a *Failed Validation* limit of 5 failures
per account, per hostname, per hour. You should receive the following error
message from your ACME client when you’ve exceeded the Failed Validation limit:

```
too many failed authorizations recently: see https://letsencrypt.org/docs/failed-validation-limit/
```

The ‘authorizations’ that this error refers to are the result of authorization
requests, sent by your ACME client, to validate control over a domain name
before we can issue or renew a certificate. This error indicates that the
multiple requests for validation were sent successfully but all attempts to
validate have failed.

# Common Causes

Subscribers who hit the Failed Validation limit often do so due to a
misconfiguration in their environment.

## HTTP-01 or TLS-ALPN-01

For ACME clients requesting authorization via the HTTP-01 or TLS-APLN-01
validation methods, the problem usually stems from a network or firewall
configuration which makes it impossible for our validation servers to reach the
server that the request was sent from.

## DNS-01

ACME clients requesting authorization via the DNS-01 validation method usually
require that you create a CNAME record in your main DNS zone which allows the
ACME client to set the required DNS records during the validation process.
Failed DNS-01 validations are usually the result of missed steps or typos during
this initial setup process.

When troubleshooting or testing the deployment of your applications we encourage
you to configure your ACME client to use our [staging
environment](/docs/staging-environment/). Rate limits for our staging
environment are [significantly higher](/docs/staging-environment/#rate-limits).

# Requesting Help

If you’re not sure how to configure your ACME client to use our staging
environment or you need some help debugging, we encourage you to [request help
on our community forum](https://community.letsencrypt.org/c/help/13).

# Requesting an Override

Overrides are **not** available for the Failed Validation limit.