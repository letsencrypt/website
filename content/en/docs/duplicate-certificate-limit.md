---
title: Duplicate Certificate Limit
slug: duplicate-certificate-limit
top_graphic: 1
date: 2022-06-16
lastmod: 2022-06-16
show_lastmod: 1
---


# Description
All issuance requests are subject to a *Duplicate Certificate* limit of 5 per
week. You should receive an error message like the following from your ACME
client when you’ve exceeded the Duplicate Certificate limit:
```
too many certificates (5) already issued for this exact set of domains in the
last 168 hours: example.com login.example.com: see https://letsencrypt.org/docs/duplicate-certificate-limit
```
The "exact set" that this error refers to is the set of hostnames requested for
this certificate: in this example, `example.com` and `login.example.com`. If
your certificate is issued for only 1 name, such as example.com, then the "exact
set" of hostnames for your certificate would be `[example.com]`. This rate limit
is exceeded when a subscriber requests a certificate for the same "exact set" of
hostnames more than 5 times in a single week.

# Common Causes

Subscribers who hit the Duplicate Certificate limit often do so while attempting
to troubleshoot the deployment of an application or service. Some examples:

If you encounter an error from your ACME client that you do not recognize and
attempt to remove and reinstall your ACME client multiple times in the process
of troubleshooting the error, you may exceed the Duplicate Certificate limit.

If you delete the configuration data for your ACME client after each failed
attempt at installing a certificate, you will hit this rate limit after five
failed attempts. It's best to make a copy of configuration data before deleting
it, so you can access previously issued certificates and private keys if you
need to.

When troubleshooting or testing the deployment of your applications we encourage
you to configure your ACME client to use our [staging
environment](/docs/staging-environment/). Rate limits for our staging
environment are[ significantly higher](/docs/staging-environment/#rate-limits).

# Requesting Help

If you’re not sure how to configure your ACME client to use our staging
environment or you need some help debugging, we encourage you to [request help
on our community forum](https://community.letsencrypt.org/c/help/13).

# Requesting an Override

Overrides are **not** available for the Duplicate Certificate limit.

# Workaround

Revoking the previously issued certificates will not reset the Duplicate
Certificate limit. However, if you find that you’ve exceeded the limit and you
still require another certificate for the same hostnames you can always request
a certificate for a different “exact set” of hostnames. For example, if you’ve
exceeded the Duplicate Certificate limit for `[example.com]` then requesting a
certificate for `[example.com, login.example.com]` will succeed. Similarly, if
you’ve exceeded the Duplicate Certificate limit for `[example.com,
login.example.com]` then requesting a separate certificate for `[example.com]`
and another for `[login.example.com]` will succeed.

# Monitoring Rate Limits

We do not offer a way to monitor subscriber rate limits at this time.
