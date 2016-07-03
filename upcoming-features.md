---
layout: page
title: Upcoming Features
permalink: /upcoming-features/
top_graphic: 1
---

## Full IPv6 Support

* ETA: Before June 30, 2016

Parts of the Let's Encrypt infrastructure can communicate via IPv6 but some parts, notably our validation infrastructure, cannot. We'll be enabling full IPv6 support for all of our infrastructure.

## IDN Support

* ETA: Before August 30, 2016

Let's Encrypt does not currently support IDN issuance. We will be adding support.

## ECDSA Intermediates

* ETA: Before August 30, 2016

Let's Encrypt only signs end-entity certificates with RSA intermediates. We will add the ability to have end-entity certs signed by an ECDSA intermediate.

# Completed Features

## Windows XP Certificate Compatibility

* Enabled: March 25, 2016

Resolved an issue with our certificate chain that prevented Let's Encrypt certificates from being accepted by browsers on Windows XP.

## ECDSA Signing Support

* Enabled: February 10, 2016

Added the ability for Let's Encrypt to sign ECDSA keys with Let's Encrypt's RSA intermediates. Support for signing ECDSA keys with a full ECDSA cert chain will be added later.

## ACME DNS Challenge Support

* Enabled: January 20, 2016

Let's Encrypt allows validation via DNS records as defined in the ACME specification.
