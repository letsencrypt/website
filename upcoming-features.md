---
layout: page
title: Upcoming Features
permalink: /upcoming-features/
top_graphic: 1
---

## IDN Support

* ETA: Before November 30, 2016

Let's Encrypt does not currently support IDN issuance. We will be adding support.

## ECDSA Intermediates

* ETA: Before March 31, 2017

Let's Encrypt only signs end-entity certificates with RSA intermediates. We will add the ability to have end-entity certs signed by an ECDSA intermediate.

# Completed Features

## Full IPv6 Support

* Enabled: July 26, 2016

Initially, only parts of the Let's Encrypt API infrastructure could communicate via IPv6. This prevented IPv6-only systems from being able to fully interact with Let's Encrypt. This has been resolved - IPv6 support has been enabled for all functionality.

## Windows XP Certificate Compatibility

* Enabled: March 25, 2016

Resolved an issue with our certificate chain that prevented Let's Encrypt certificates from being accepted by browsers on Windows XP.

## ECDSA Signing Support

* Enabled: February 10, 2016

Added the ability for Let's Encrypt to sign ECDSA keys with Let's Encrypt's RSA intermediates. Support for signing ECDSA keys with a full ECDSA cert chain will be added later.

## ACME DNS Challenge Support

* Enabled: January 20, 2016

Let's Encrypt allows validation via DNS records as defined in the ACME specification.
