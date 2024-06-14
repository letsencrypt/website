---
title: Upcoming Features
slug: upcoming-features
lastmod: 2024-06-14
show_lastmod: 1
---

For announcements of upcoming changes, please see the [API Announcements](https://community.letsencrypt.org/c/api-announcements/18) category on the Let's Encrypt community forum.

# Completed Features

## ECDSA Root and Intermediates

* Enabled: June 06, 2024

We are issuing certificates from our production ECDSA intermediates to ECDSA leaf certificates. See the [Chains of Trust](/certificates/) documentation for full details on our PKI hierarchy.

## ACME Renewal Information (ARI)

* Enabled: March 23, 2023

We now run [ARI](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari.html), a system that allows us to notify subscribers via API when they need to renew.

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
