---
title: Upcoming Features
slug: upcoming-features
top_graphic: 1
lastmod: 2021-09-16
show_lastmod: 1
---

## ACME Renewal Information (ARI)

We are working on a system that will allow us to notify subscribers via API when they need to renew. This system will allow us to signal to subscribers that they need to renew prior to, for example, a revocation event.

## ECDSA Root and Intermediates

We are issuing certificates from our production ECDSA intermediate to [allow-listed accounts](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679). There is no planned date for removing the allow-list.

# Completed Features

## Multi-Perspective Validation

* Enabled: February 19, 2020

We now validate domain control from [multiple network perspectives](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html).

## Certificate Transparency Log

* Enabled: May 15, 2019

We now operate a [Certificate Transparency log](/docs/ct-logs).

## TLS ALPN Challenge Support

* Enabled: July 12, 2018

We've specified and implemented a [replacement](https://tools.ietf.org/html/rfc8737) for the TLS-SNI validation method, which was [discontinued for security reasons](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811). Introducing a replacement was important for subscribers who only want to use port 443 for validation.

## Wildcard Certificates

* Enabled: March 13, 2018

## ACME v2 API

* Enabled: March 13, 2018

## Full IPv6 Support

* Enabled: July 26, 2016
